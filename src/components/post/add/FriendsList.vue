<template>
  <div v-if="!friends.length" class="text-center text-primary">
    لا يوجد أصدقاء لعرضهم
  </div>
  <div class="p-3 friends-list" v-if="friends.length">
    <div
      v-for="friend in friends"
      :key="friend.id"
      class="d-flex pb-3 align-items-center"
    >
      <div class="d-flex align-items-center flex-grow-1">
        <div class="user-img">
          <img
            class="avatar-40 rounded-circle"
            :src="
              friend.profile.profile_picture ??
              require('@/assets/images/avatar/avatar-01.jpg')
            "
          />
        </div>
        <div class="user-info ms-3 flex-grow-1">
          <h6 class="mb-0">{{ friend.name }}</h6>
        </div>
      </div>
      <input
        :id="friend.id"
        class="form-check-input"
        type="checkbox"
        :name="friend.name"
        @change="handleCheckboxChange"
        style="width: 1.5em !important; height: 1.5em !important"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendsList",
  props: {
    friends: {
      type: Array,
      default: () => [],
    },
    handleCheckboxChange: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.friends-list {
  max-height: 55vh;
  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .friends-list {
    height: 66vh;
    max-height: 66vh;
  }
}
</style>
