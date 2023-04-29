<template>
  <div
    class="support-checkbox mt-3"
    v-if="post.type.toLowerCase() === 'support'"
  >
    <div class="d-flex justify-content-start align-items-center">
      <input
        type="checkbox"
        id="support-checkbox"
        class="form-check-input"
        v-model="supported"
        @change="pledgeReadingPost"
        style="width: 18px; height: 18px; margin: 0"
      />
      <label for="support-checkbox" class="form-check-label text-primary">
        <span class="ms-1"> أتعهد بأنني قرأت المنشور كاملاً </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupportSection",
  inject: {
    post: {
      required: true,
    },
  },
  data() {
    return {
      supported: false,
    };
  },
  created() {
    const pledge = JSON.parse(localStorage.getItem("pledges"));
    this.supported = pledge
      ? pledge[this.post.id] === this.$store.getters.getUser.id
        ? true
        : false
      : false;
  },
  methods: {
    /**
     * @description: Save user pledge to local storage
     * @param e: the event object
     * @returns {void}
     */
    pledgeReadingPost(e) {
      const user_id = this.$store.getters.getUser.id;
      let storedPledge = localStorage.getItem(`pledges`);
      if (!e.target.checked) {
        if (storedPledge) {
          storedPledge = JSON.parse(storedPledge);
          if (
            storedPledge[this.post.id] &&
            storedPledge[this.post.id] === user_id
          ) {
            //remove user from pledge
            delete storedPledge[this.post.id];
            localStorage.setItem(`pledges`, JSON.stringify(storedPledge));
          }
        }
      } else {
        if (storedPledge) {
          storedPledge = JSON.parse(storedPledge);
          if (
            !storedPledge[this.post.id] ||
            storedPledge[this.post.id] !== user_id
          ) {
            //add user to pledge
            storedPledge[this.post.id] = user_id;
            localStorage.setItem(`pledges`, JSON.stringify(storedPledge));
          }
        } else {
          //create pledge
          localStorage.setItem(
            `pledges`,
            JSON.stringify({ [this.post.id]: user_id })
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
