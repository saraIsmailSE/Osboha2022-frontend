<template>
  <div class="d-flex justify-content-between align-items-center">
    <!--Like Button-->
    <button
      type="button"
      class="btn flex-grow-1"
      :class="post.reacted_by_user ? 'text-primary' : 'text-gray-600'"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="إعجاب"
      @click.prevent="reactOnPost(selectedReaction.id)"
      :disabled="pendingRequest"
    >
      <span class="me-1 bold-600"> إعجاب </span>
      <font-awesome-icon
        :icon="[`${post.reacted_by_user ? 'fas' : 'far'}`, 'thumbs-up']"
        size="xl"
      />
      <!-- <div class="like-data flex-grow-1">
      <div class="dropdown">
        <span
          class="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          role="button"
          :style="{
            color:
              selectedReaction.type === 'like'
                ? isLiked
                  ? selectedReaction.text_color
                  : '#555770'
                : selectedReaction.text_color,
          }"
        >
          <span class="me-1 bold-600"> {{ selectedReaction.title }} </span>
          <font-awesome-icon
            v-if="selectedReaction.type === 'like'"
            :icon="[`${isLiked ? 'fas' : 'far'}`, 'thumbs-up']"
            size="xl"
          />
          <img
            v-if="selectedReaction.type !== 'like'"
            :src="selectedReaction.media.path"
            :alt="selectedReaction.type"
            class="reaction-img"
            height="20"
            width="20"
          />
        </span>
        <div class="dropdown-menu py-2 reactions" style="border-radius: 9999px">
          <div class="d-flex align-items-center justify-content-around">
            <div
              v-for="reaction in reactions"
              :key="reaction.id"
              class="dropdown-item p-0 m-0 mx-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="reaction.title"
              @click.prevent="selectReaction(reaction)"
            >
              <div
                v-if="reaction.type === 'like'"
                class="reaction-icon"
                :style="{
                  backgroundColor: reaction.text_color,
                }"
                style="
                  color: #fff;
                  border-radius: 50%;
                  width: 22px;
                  height: 22px;
                  position: relative;
                  padding: 5px;
                  margin: auto;
                  display: block;
                "
              >
                <font-awesome-icon
                  v-if="reaction.type === 'like'"
                  :icon="['fas', 'thumbs-up']"
                  style="
                    margin: auto;
                    display: block;
                    color: #fff;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  "
                />
              </div>

              <img
                v-if="reaction.type !== 'like'"
                :src="reaction.media.path"
                :alt="reaction.type"
                class="reaction-img"
                height="20"
                width="20"
                style="margin: auto; display: block"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->
    </button>

    <!--Comment Button-->
    <button
      type="button"
      class="btn flex-grow-1 text-gray-600"
      title="تعليق"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      @click.prevent="$emit('showCommentModel')"
    >
      <span class="me-1 bold-600"> تعليق </span>
      <font-awesome-icon :icon="['far', 'comment']" size="xl" />
    </button>

    <!--Share Button-->
    <!-- <button
              type="button"
              class="btn flex-grow-1 text-gray-600"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="مشاركة"
            >
              <span class="me-1 bold-600"> مشاركة </span>
              <font-awesome-icon :icon="['fas', 'share']" size="xl" />
            </button> -->
  </div>
</template>

<script>
import ReactionService from "@/API/services/reaction.service";
import helper from "@/utilities/helper";

export default {
  name: "ActionButtons",
  inject: ["reactToPost"],
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  emits: ["showCommentModel"],
  data() {
    return {
      reactions: [],
      selectedReaction: {
        id: 1,
        title: "إعجاب",
        type: "like",
        text_color: "#278036",
      },
      pendingRequest: false,
    };
  },
  computed: {},
  created() {
    // this.reactions = ReactionService.getStoredReactions();
    // this.selectedReaction = this.reactions[0];
  },
  methods: {
    selectReaction(reaction) {
      this.selectedReaction = reaction;
      console.log(this.selectedReaction);
    },

    async reactOnPost(reactionId) {
      if (this.pendingRequest) return;

      this.pendingRequest = true;
      try {
        const response = await ReactionService.reactOnPost(
          this.post.id,
          reactionId
        );

        if (response.statusCode !== 200) {
          helper.toggleToast("حدث خطأ ما, يرجى المحاولة لاحقاً", "error");
          return;
        }

        this.reactToPost(this.post.id, response.data);
      } catch (e) {
        console.log("[reaction]", e.response);
        helper.toggleToast("حدث خطأ ما, يرجى المحاولة لاحقاً", "error");
      } finally {
        this.pendingRequest = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.reactions {
  background-color: #fff !important;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1);
}

.reactions .dropdown-item {
  color: #fff !important;
}

.reactions .dropdown-item:focus,
.reactions .dropdown-item:hover {
  background-color: #fff !important;
}

.reaction-data {
  .dropdown-toggle {
    &::after {
      display: none;
    }
  }
}

.reaction-data {
  .dropdown {
    &:hover {
      > .dropdown-menu {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .dropdown-menu {
    display: block;
    visibility: hidden;
    opacity: 0;
    width: 280px;
    top: -3.125rem;
    border: none;
  }
}
</style>
