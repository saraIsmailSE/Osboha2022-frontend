<template>
  <div class="card my-3 border-1 rounded poll" v-if="showPoll">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0 text-primary">إضافة استعلام</h5>
      <i
        class="material-symbols-outlined"
        role="button"
        @click.prevent="$emit('closePoll')"
        >close</i
      >
    </div>
    <div class="card-body">
      <div
        class="d-flex align-items-center my-2"
        v-for="(option, index) in pollOptions"
        :key="option.id"
      >
        <input
          type="text"
          class="form-control rounded"
          v-model="option.value"
          :placeholder="`خيار ${index + 1}`"
          @change="$emit('checkSimilarPollOptions', option.id)"
        />
        <i
          class="material-symbols-outlined ms-2"
          role="button"
          @click.prevent="$emit('removePollOption', option.id)"
          >close</i
        >
      </div>
      <button
        class="btn btn-secondary d-block w-100 mt-3 d-flex justify-content-center align-items-center"
        @click.prevent="$emit('addPollOption')"
        :disabled="!allowAddingPollOption"
      >
        <span class="material-symbols-outlined">add</span>

        <span>إضافة خيار</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPoll",
  props: {
    showPoll: {
      type: Boolean,
      default: false,
    },
    pollOptions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    allowAddingPollOption() {
      let allow = true;
      this.pollOptions.forEach((option) => {
        if (option.value === "") {
          allow = false;
        }
      });
      return allow;
    },
  },
};
</script>

<style scoped>
.poll {
  max-height: 230px;
  overflow-y: auto;
}
</style>
