<template>
  <div>
    <iq-card
      id="post-modal-data"
      body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
    >
      <template v-slot:headerTitle>
        <h4 class="card-title">منشور جديد</h4>
      </template>
      <template v-slot:body>
        <div class="d-flex align-items-center">
          <div class="user-img">
            <img
              class="avatar-60 rounded-circle"
              src="../../assets/images/user/user-1.jpg"
            />
          </div>
          <form class="post-text ml-3 w-100">
            <input
              type="text"
              placeholder="ماذا تريد أن تكتب..."
              class="rounded form-control"
              style="border: none"
              @click.prevent="showModal(postModal)"
            />
          </form>
        </div>
      </template>
      <modal
        ref="postModalRef"
        id="postModal"
        dialogClass="modal-fullscreen-sm-down"
        tabindex="-1"
        title="Create Post"
        aria-labelledby="modalsLabel"
        :aria-hidden="true"
      >
        <model-header>
          <h5 class="modal-title" id="modalsLabel">منشور جديد</h5>
          <a href="#" class="lh-1" @click.prevent="hideModal(postModal)">
            <span class="material-symbols-outlined">close</span>
          </a>
        </model-header>
        <model-body class="post-modal-body">
          <TaggedFriends :selectedFriends="selectedFriends" />
          <div>
            <form class="post-text ml-3 w-100">
              <textarea
                placeholder="ماذا تريد أن تكتب..."
                class="rounded form-control"
                style="border: none"
                v-model.trim="post.body"
                ref="bodyRef"
              >
              </textarea>

              <input
                type="file"
                @change="previewMedia($event)"
                multiple
                accept="image/*|video/*"
                class="d-none"
                ref="fileRef"
              />
            </form>
          </div>
          <PostPoll
            :showPoll="showPoll"
            :pollOptions="pollOptions"
            @closePoll="showPoll = false"
            @addPollOption="addPollOption"
            @removePollOption="removePollOption"
            @checkSimilarPollOptions="checkSimilarPollOptions"
          />
          <hr />
          <ul class="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
            <li class="me-2 mb-2">
              <button
                class="btn btn-soft-primary d-flex align-items-center"
                @click="openFilePicker"
                :disabled="!allowAddingMedia"
              >
                <span class="material-symbols-outlined me-2">photo_camera</span>
                صورة/فيديو
              </button>
            </li>
            <li class="me-2 mb-2">
              <button
                class="btn btn-soft-primary d-flex align-items-center"
                @click.prevent="showModal(friendsListModal)"
              >
                <span class="material-symbols-outlined me-2">person_add</span>
                إشارة إلى صديق
              </button>
            </li>
            <li class="me-2 mb-2">
              <button
                class="btn btn-soft-primary d-flex align-items-center"
                @click.prevent="openPoll"
              >
                <span class="material-symbols-outlined me-2">poll</span>
                إضافة استعلام
              </button>
            </li>
          </ul>
          <template v-if="post.media.length > 0">
            <hr />
            <ImagePreviewer :media="post.media" @remove-media="removeMedia" />
          </template>
        </model-body>
        <model-footer class="p-0 px-2">
          <div class="w-100 text-right" style="color: red" v-if="showPoll">
            ملاحظة: نص المنشور مطلوب مع الاستعلام!
          </div>
          <div
            class="w-100 text-center py-1"
            style="color: red"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </div>
          <div class="col-sm-12 text-center" v-if="loader">
            <img
              :src="require('@/assets/images/page-img/page-load-loader.gif')"
              alt="loader"
              style="height: 100px"
            />
          </div>
          <button
            v-else
            class="btn btn-primary btn-block my-3 w-100 flex-grow-1"
            @click="addNewPost()"
            :disabled="!allowPosting"
          >
            نشـــر
          </button>
        </model-footer>
      </modal>
      <modal
        ref="friendsListModalRef"
        id="friendsListModal"
        title="choose friend"
        tabindex="-1"
        aria-labelledby="friendsModalLabel"
        :aria-hidden="true"
      >
        <model-header>
          <h5 class="modal-title" id="friendsModalLabel">إشارة إلى صديق</h5>
          <a href="#" class="lh-1" @click.prevent="hideModal(friendsListModal)">
            <span class="material-symbols-outlined"> arrow_back_ios_new </span>
          </a>
        </model-header>
        <model-body>
          <div class="iq-search-bar device-search w-main my-2 d-flex">
            <form action="#" class="searchbox" style="width: 100% !important">
              <a class="search-link" href="#">
                <span class="material-symbols-outlined">search</span>
              </a>
              <input
                type="text"
                class="text search-input form-control bg-soft-primary"
                placeholder="ابحث هنا..."
                v-model.trim="searchQuery"
                @keyup="searchFriends"
              />
            </form>
            <a
              href="#"
              class="btn btn-primary ms-2"
              @click.prevent="hideModal(friendsListModal)"
            >
              اعتماد
            </a>
          </div>
          <hr />
          <FriendsList
            :friends="friends"
            :handleCheckboxChange="handleCheckboxChange"
          />
        </model-body>
      </modal>
    </iq-card>
  </div>
</template>
<script>
import ImagePreviewer from "../custom/image-previewer/ImagePreviewer.vue";
import PostPoll from "@/components/post/PostPoll.vue";
import FriendsList from "@/components/post/FriendsList.vue";
import TaggedFriends from "@/components/post/TaggedFriends.vue";
import { Modal } from "bootstrap";
import postService from "../../API/services/post.service";
import friendService from "../../API/services/friend.service";
import UserInfo from "@/Services/userInfoService";

export default {
  name: "AddPost",
  components: {
    ImagePreviewer,
    PostPoll,
    FriendsList,
    TaggedFriends,
  },
  props: {
    type: {
      type: String,
      default: "normal",
    },
    timeline_id: {
      type: Number,
      required: true,
    },
  },
  emits: ["add-post"],
  data() {
    return {
      auth: null,
      postModal: null,
      friendsListModal: null,
      friends: [],
      friendsTemp: [],
      selectedFriends: [],
      pollOptions: [],
      post: {
        body: "",
        media: [],
        tags: [],
        votes: [],
      },
      showPoll: false,
      loader: false,
      errorMessage: "",
      searchQuery: "",
    };
  },
  computed: {
    allowAddingMedia() {
      return this.showPoll ? false : true;
    },
    allowPosting() {
      let allow = true;
      if (this.post.body === "" && this.post.media.length === 0) {
        allow = false;
      }

      if (this.post.body === "" && this.pollOptions.length > 0) {
        allow = false;
      }

      return allow;
    },
    postBody() {
      return this.post.body;
    },
  },
  watch: {
    postBody() {
      this.$refs.bodyRef.style.height = "auto";
      this.$nextTick(() => {
        this.$refs.bodyRef.style.height =
          this.$refs.bodyRef.scrollHeight + "px";
      });
    },
  },
  async created() {
    const userData = await UserInfo.getUser();
    this.auth = userData.user;
    await this.getFriends();
  },
  mounted() {
    this.postModal = new Modal(this.$refs.postModalRef.$el);
    this.friendsListModal = new Modal(this.$refs.friendsListModalRef.$el);
  },
  methods: {
    openFilePicker() {
      this.$refs.fileRef.click();
    },
    previewMedia(event) {
      const files = [...event.target.files];
      this.post.media = files;
    },
    removeMedia(index) {
      const files = [...this.post.media];
      files.splice(index, 1);
      this.post.media = files;

      if (this.post.media.length === 0) {
        this.$refs.fileRef.value = null;
      }
    },
    showModal(modal) {
      modal.show();
    },
    hideModal(modal) {
      modal.hide();
    },
    async getFriends() {
      try {
        const allFriends = await friendService.getAllFriends(this.auth.id);
        if (allFriends !== "No Friends") {
          this.friends = allFriends;
          this.friendsTemp = allFriends;
        } else {
          this.friends = [];
        }
      } catch (error) {
        this.friends = [];
        this.friendsTemp = [];
        return;
      }
    },
    handleCheckboxChange(event) {
      const { checked, id } = event.target;
      const friend = this.friends.find((friend) => friend.id === parseInt(id));
      if (checked) {
        this.post.tags.push(parseInt(id));
        this.selectedFriends.push(friend);
      } else {
        this.post.tags = this.post.tags.filter((tag) => tag !== parseInt(id));
        this.selectedFriends = this.selectedFriends.filter(
          (selectedFriend) => selectedFriend.id !== parseInt(id)
        );
      }
    },
    openPoll() {
      this.showPoll = true;
      this.addPollOption();
      this.post.media = [];
      this.$refs.fileRef.value = null;
    },
    addPollOption() {
      this.pollOptions.push({
        id: this.pollOptions.length + 1,
        value: "",
      });
    },
    checkSimilarPollOptions(id) {
      const option = this.pollOptions.find((opt) => opt.id === id);
      const similarOption = this.pollOptions.find(
        (opt) => opt.value === option.value && opt.id !== id
      );
      if (similarOption) {
        option.value = "";
      }
    },
    removePollOption(id) {
      const option = this.pollOptions.find((option) => option.id === id);
      const index = this.pollOptions.indexOf(option);
      this.pollOptions.splice(index, 1);
    },
    searchFriends() {
      if (this.searchQuery === "") {
        this.friends = this.friendsTemp;
        return;
      }

      this.friends = this.friendsTemp.filter((friend) => {
        return friend.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    async addNewPost() {
      const votes = this.pollOptions.filter((option) => option.value !== "");
      const newPost = {
        ...this.post,
        votes: votes.map((vote) => vote.value),
        timeline_id: this.timeline_id,
        type: this.type,
      };

      this.loader = true;
      try {
        const post = await postService.create(newPost);
        this.$emit("add-post", post.data);
        // this.post = {
        //   body: "",
        //   media: [],
        //   tags: [],
        //   votes: [],
        // };
        // this.pollOptions = [];
        // this.showPoll = false;
        // this.$refs.fileRef.value = null;
        // this.postModal.hide();
      } catch (err) {
        this.errorMessage = "Something went wrong, please try again later";
        return;
      }

      this.loader = false;
    },
  },
};
</script>
<style scoped>
.post-modal-body {
  max-height: 60vh;
  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .post-modal-body {
    height: auto;
    max-height: initial;
  }
}
</style>
