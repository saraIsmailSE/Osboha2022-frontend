<template>
  <div class="mt-3">
    <p>{{ post.body }}</p>
  </div>

  <!--Polls-->
  <div v-if="post.pollOptions?.length" class="mt-3">
    <div
      class="progress my-2 border border-light rounded bg-transparent"
      v-for="option in post.pollOptions"
      :key="option.id"
    >
      <progressbar
        :style="{ width: getOptionVotesPercentage(option.id) }"
        class="progress-bar"
        className="rounded"
        aria-valuemin="0"
        aria-valuemax="100"
      >
      </progressbar>

      <div
        class="poll-input d-flex justify-content-around align-items-center w-100 h-100"
      >
        <input
          type="radio"
          :id="option.id"
          :value="option.id"
          v-model="choosedOption"
          class="ms-1 mt-0"
          @change="vote"
        />
        <label
          :for="option.id"
          class="form-check-label flex-grow-1 text-truncate ms-2 align-right"
          >{{ option.option }}</label
        >
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
      default: () => {},
    },
    post: {
      required: true,
    },
  },
  data() {
    return {
      choosedOption: "",
      errorMessage: "",
    };
  },
  mounted() {
    if (this.post.pollOptions.length > 0) {
      this.choosedOption = this.getSelectedOptionId();
    }
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
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
        return;
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

.progress > .poll-input {
  position: absolute;
  top: 0;
  right: 0;
}

.poll-input > label {
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
</style>
