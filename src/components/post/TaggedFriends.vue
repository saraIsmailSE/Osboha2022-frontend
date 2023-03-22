<template>
  <div class="d-flex align-items-start">
    <div class="user-img">
      <img
        class="avatar-60 rounded-circle"
        src="../../assets/images/user/user-1.jpg"
      />
    </div>
    <div class="mx-2 flex-grow-1">
      <span class="author-name">Asmaa Hamid</span>
      <span v-if="selectedFriends.length" class="mx-1"> مع </span>
      <span v-for="(friend, index) in slicedTaggedFriends" :key="friend.id">
        <span class="author-name hover-undelined" role="button">{{
          friend.name
        }}</span>
        <span
          class="mx-1"
          v-if="
            index !== slicedTaggedFriends.length - 1 ||
            selectedFriends.length > slicedTaggedFriends.length
          "
          >و</span
        >
        <span v-if="index === slicedTaggedFriends.length - 1">
          <span
            v-if="selectedFriends.length > slicedTaggedFriends.length"
            class="author-name hover-undelined"
            role="button"
            @click.prevent="getFriends"
            >{{
              selectedFriends.length - slicedTaggedFriends.length
            }}
            أكثر</span
          >
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaggedFriends",
  props: {
    selectedFriends: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    slicedTaggedFriends() {
      return this.selectedFriends.slice(0, 3);
    },
  },
};
</script>

<style scoped>
.author-name {
  font-size: 1rem;
  font-weight: 600;
}
.hover-undelined:hover {
  text-decoration: underline;
}
</style>
