<template>
  <div class="mt-3">
    <p style="white-space: pre-wrap; direction: rtl;" v-html="processText(shortPostText)"></p>
    <a dir="ltr" role="button" class="load-btn" v-on:click="loadMoreBriefText" v-if="isMore">...قراءة المزيد</a>
    <a dir="ltr" role="button" class="load-btn" v-on:click="loadLessBriefText" v-if="isLess">قراءة أقل</a>

  </div>

  <!--Polls-->
  <div v-if="post.pollOptions?.length" class="mt-3">
    <div class="progress my-2 border border-light rounded bg-transparent" v-for="option in post.pollOptions"
      :key="option.id">
      <progressbar :style="{ width: getOptionVotesPercentage(option.id) }" class="progress-bar" className="rounded"
        aria-valuemin="0" aria-valuemax="100">
      </progressbar>

      <div class="poll-input d-flex justify-content-around align-items-center w-100 h-100">
        <input type="radio" :id="option.id" :value="option.id" v-model="choosedOption" class="ms-1 mt-0" @change="vote"
          :disabled="!post.allow_comments" />
        <label :for="option.id" class="form-check-label flex-grow-1 text-truncate ms-2 align-right">{{ option.option
        }}</label>
        <span class="me-2 text-primary bold-600">
          {{ getOptionVotesPercentage(option.id) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import VoteService from "@/API/services/vote.service";
import helper from "@/utilities/helper";

export default {
  name: "PostBody",
  inject: {
    voteOnPost: {
      default: () => { },
    },
    post: {
      required: true,
    },
  },
  data() {
    return {
      choosedOption: "",
      errorMessage: "",
      fullPostText: "",
      shortPostText: "",

    };
  },
  mounted() {
    if (this.post.pollOptions.length > 0) {
      this.choosedOption = this.getSelectedOptionId();
    }
  },
  created() {
    this.fullPostText = this.post?.body;
    this.shortPostText = this.fullPostText?.slice(0, 200);
  },
  methods: {
    async vote() {
      const voteData = {
        option_id: this.choosedOption,
        post_id: this.post.id,
      };
      try {
        const response = await VoteService.create(voteData);

        if (response.statusCode !== 200) {
          helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
          return;
        }

        const data = response.data;
        //same vote
        if (!data) {
          return;
        }

        const old_option_id = this.getSelectedOptionId();

        this.voteOnPost({
          option_id: this.choosedOption,
          post_id: this.post.id,
          old_option_id,
          status: data,
        });
      } catch (error) {
        console.log("[vote error]", error);
        this.choosedOption = "";
        if (error.response?.data?.message) {
          helper.toggleToast(error.response.data.message, "error");
          return;
        } else {
          helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
          return;
        }
      }
    },

    getOptionVotesPercentage(option_id) {
      const all_votes_count = this.post.votes_count;
      const option_votes_count = this.post.pollOptions.find(
        (option) => option.id === option_id
      ).votes_count;

      if (all_votes_count === 0) {
        return "0%";
      }
      const percentage = Math.round(
        (option_votes_count / all_votes_count) * 100
      );

      return `${percentage}%`;
    },

    getSelectedOptionId() {
      const optionSelectedByUser = this.post.pollOptions.find(
        (option) => option.selected_by_user === true
      );

      return optionSelectedByUser ? optionSelectedByUser.id : "";
    },
    urlifyFn(text) {
      if (text) {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
          return '<a href="' + url + '"  target="_blank" direction: rtl;">' + url + '</a>';
        })
      }
    },
    stylizeHashtags(text) {
      if (text) {
        let hashtagRegex = /#([\u0600-\u06FF\w]+)/g;
        return text.replace(hashtagRegex, function (hashtag) {
          return '<span style="font-weight: bold; color: #1d1a55;">' + hashtag + '</span>';
        });
      }
    },
    processText(text) {
      text = this.urlifyFn(text); // First, turn URLs into hyperlinks
      text = this.stylizeHashtags(text); // Then, style hashtags
      return text;
    },
    loadMoreBriefText() {
      this.shortPostText = this.fullPostText;
    },
    loadLessBriefText() {
      this.shortPostText = this.fullPostText?.slice(0, 200);
    },
  },
  computed: {
    isMore() {
      return this.shortPostText?.length < this.fullPostText?.length;
    },
    isLess() {
      return (
        this.shortPostText?.length >= this.fullPostText?.length &&
        this.fullPostText?.length > 200
      );
    },

  },
};
</script>

<style scoped>
input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #2780364d;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  outline: none;
  position: relative;
  cursor: pointer;
}

input[type="radio"]:checked::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #278036;
}

input[type="radio"]:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
}

.progress {
  height: 30px;
  position: relative;
}

.progress>.poll-input {
  position: absolute;
  top: 0;
  right: 0;
}

.poll-input>label {
  font-size: 0.9rem;
}

.bold-600 {
  font-weight: 600;
}

.align-right {
  text-align: right;
}

.progress-bar {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(39, 128, 54, 0.3);
}

.hashtag {
  font-weight: bold;
  color: blue;
}
</style>
