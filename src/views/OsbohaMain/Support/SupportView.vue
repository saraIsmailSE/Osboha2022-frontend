<template>
  <div class="row">
    <div class="col-lg-8 row m-0 p-0">

      <!-- ##### <AddPost> ##### -->
      <div class="col-sm-12" v-if="isAuthorized && !lastSupportPost">
        <AddPost @add-post="addPost" type="support" :timeline_id="1" />
      </div>
      <div class="col-sm-12" v-if="isAuthorized">
        <button class="btn btn-primary mb-3" v-if="!showReason" @click="showReason = true">اعتماد العلامة للكل</button>
        <button class="btn btn-danger mb-3" v-if="showReason" @click="showReason = false">تراجع</button>
        <form @submit.prevent="setSupportMarkForAll" class="post-text ml-3 w-100 row" v-if="showReason">

          <div class="form-group">
            <textarea rows="3" placeholder="سبب الاعتماد" class="rounded form-control mt-2 col-12" id="reason"
              v-model="v$.setMarkForm.reason.$model" name="bio">
                </textarea>
            <small style="color: red" v-if="v$.setMarkForm.reason.$error">
              قم بادخال سبب عدد حروفه بين 10 و 500
            </small>
          </div>
          <div class="form-group">
            <button type="submit" :disabled="message" class="btn d-block btn-primary mt-1 mb-3 w-75 mx-auto">
              اعتماد
            </button>
          </div>

          <div class="col-sm-12 text-center" v-if="loader">
            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
          </div>
          <h4 class="text-center mt-3 mb-3" v-if="message">{{ message }}</h4>


        </form>

      </div>
      <!-- ##### Display Posts ##### -->
      <LazyLoadedPosts ref="lazyLoadedPostsRef" type="support" :displayEmpty="true" />
    </div>
  </div>
</template>

<script>
import AddPost from "@/components/post/add/AddPost.vue";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";
import UserInfoService from "@/Services/userInfoService";
import PostService from "@/API/services/post.service";
import MarkService from "@/API/services/marks.service";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";


export default {
  name: "Support",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AddPost,
    LazyLoadedPosts,
  },
  data() {
    return {
      lastSupportPost: {},
      showReason: false,
      setMarkForm: {
        reason: '',
      },
      loader: false,
      message: null,
    };
  },
  validations() {
    return {
      setMarkForm: {
        reason: {
          required,
          maxLength: maxLength(500),
          minLength: minLength(10),
        },
      },
    };
  },
  computed: {
    isAuthorized() {
      const user = this.$store.getters.getUser;
      return UserInfoService.hasRoles(user, ["admin", "consultant"]);
    },
  },
  created() {
    PostService.getLastSupportPost()
      .then((response) => {
        this.lastSupportPost = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
    async setSupportMarkForAll() {
      this.v$.$touch();
      if (!this.v$.setMarkForm.$invalid) {
        this.message = "";
        this.loader = true;
        try {
          const response = await MarkService.setSupportMarkForAll(this.setMarkForm);
          this.loader = false;
          this.message = response;
          this.v$.setMarkForm.$reset();
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
