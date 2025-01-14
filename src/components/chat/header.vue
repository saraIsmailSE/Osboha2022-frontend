<template lang="">
  <div class="iq-top-navbar mt-2">
    <nav class="nmt-4 av navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
      <div class="container-fluid p-auto">
        <router-link :to="{ name: 'osboha.list' }" class="navbar-brand p-0">
          <img src="@/assets/images/main/osboha-logo.png" alt="logo" class="" />
        </router-link>
        <div class="social-media">
          <p class="mb-0 d-flex">
            <i
              class="d-flex align-items-center justify-content-center ms-2 me-3 position-relative"
            >
              <i class="material-symbols-outlined">chat_bubble</i>
              <span
                v-if="unreadMessages"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
              >
                {{ unreadMessages }}
              </span>
            </i>
            <i
              class="d-flex align-items-center justify-content-center ms-2 me-1 position-relative"
            >
              <router-link
                :to="{ name: 'osboha.list' }"
                class="material-symbols-outlined"
                >home</router-link
              >
            </i>
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "ChatHeader",
  props: {
    unreadMessages: { type: Number },
  },
};
</script>
<style lang=""></style>
