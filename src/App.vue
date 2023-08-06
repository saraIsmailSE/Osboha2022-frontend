<template>
  <router-view />
</template>
<script>
export default {
  name: "App",
  created() {
    const token = localStorage.getItem("osboha__token");
    const user = localStorage.getItem("osboha__user");

    if (token && user) {
      this.$store.commit("SET_TOKEN", token);
      this.$store.commit("SET_USER_DATA", JSON.parse(user));
      // this.$store.dispatch("listUnreadNotifications");
    }
  },
};
</script>

<style lang="scss">
@import "./assets/scss/socialv.scss";
@import "./assets/scss/customizer.scss";
@import url("./plugins/Leaflet/leaflet.css");
@import url("./plugins/fullcalendar/core/main.css");
@import url("./plugins/fullcalendar/daygrid/main.css");
@import url("./plugins/fullcalendar/timegrid/main.css");
@import url("./plugins/fullcalendar/list/main.css");

.swal2-confirm {
  background-color: #1f662b !important;
}

.swal2-cancel {
  color: #b80606 !important;
  border-color: #b80606 !important;
}

.swal2-cancel:hover {
  color: #fff !important;
  border-color: #b80606 !important;
  background-color: #b80606 !important;
}
</style>
