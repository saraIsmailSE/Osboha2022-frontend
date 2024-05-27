import setting from "./setting/index";
import Vuex from "vuex";
import { api } from "../API/Intercepter";
import { handleError } from "vue";
import router from "../router";
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

export const strict = false;

export default new Vuex.Store({
  modules: {
    setting,
  },
  state: {
    user: null,
    token: null,
    isNewUser: true,
    reactions: [],
    unreadNotifications: 0,
    current_week: null,
    echo: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser;
    },
    SET_REACTIONS(state, reactions) {
      state.reactions = reactions;
      localStorage.setItem("reactions", JSON.stringify(reactions));
    },
    SET_TOKEN(state, token) {
      state.token = token;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    SET_UNREAD_NOTIFICATIONS(state, count) {
      state.unreadNotifications = count;
    },
    SET_PROFILE_PICTURE(state, profilePicture) {
      state.user.user_profile.profile_picture = profilePicture;
      localStorage.setItem("osboha__user", JSON.stringify(state.user));
    },
    SET_ALLOWED_TO_ELIGIBLE(state, value) {
      state.user.allowed_to_eligible = value;
      localStorage.setItem("osboha__user", JSON.stringify(state.user));
    },
    SET_CURRENT_WEEK(state, week) {
      state.current_week = week;
    },
    SET_ECHO(state, echo) {
      state.echo = echo;
    },
  },
  actions: {
    register({ commit }, credentials) {
      let formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("gender", credentials.gender);
      return api.post("register", formData).then((response) => {
        localStorage.setItem("osboha__token", response.data.data.token);
        localStorage.setItem(
          "osboha__user",
          JSON.stringify(response.data.data.user),
        );
        commit("SET_USER_DATA", response.data.data.user);
        commit("SET_TOKEN", response.data.data.token);
      });

      // // //get all reactions
      // // api.get("reactions/types").then((reactions) => {
      // //   commit("SET_REACTIONS", reactions.data.data);
      // });
    },
    new_register({ commit }, credentials) {
      let formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("last_name", credentials.last_name);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("gender", credentials.gender);
      return api.post("new_register", formData).then((response) => {
        localStorage.setItem("osboha__token", response.data.data.token);
        localStorage.setItem(
          "osboha__user",
          JSON.stringify(response.data.data.user),
        );
        commit("SET_USER_DATA", response.data.data.user);
        commit("SET_TOKEN", response.data.data.token);
      });
    },
    login({ commit }, user_info) {
      localStorage.setItem("osboha__token", user_info.token);
      localStorage.setItem("osboha__user", JSON.stringify(user_info.user));
      commit("SET_USER_DATA", user_info.user);
      commit("SET_TOKEN", user_info.token);
    },
    logout({ commit }) {
      localStorage.removeItem("osboha__user");
      localStorage.removeItem("osboha__token");

      sessionStorage.removeItem("AuthSessionData");
      sessionStorage.removeItem("AuthSessionExpiry");

      commit("SET_TOKEN", null);
      commit("SET_USER_DATA", null);
      router.push({ name: "auth.sign-in" });
    },
    isNewUser({ commit }, isNewUser) {
      commit("IS_NEW_USER", isNewUser);
    },
    listUnreadNotifications({ commit }) {
      return api
        .get(`notifications/un-read`)
        .then(({ data }) => {
          commit("SET_UNREAD_NOTIFICATIONS", data.data.length);
        })
        .then((error) => handleError(error));
    },
    initEcho({ commit }) {
      if (!this.state.echo) {
        window.Echo = new Echo({
          broadcaster: "pusher",
          key: "0098112dc7c6ed8e4777180",
          cluster: "mt1",
          wsHost: process.env.VUE_APP_WEBSOCKET_BASE_URL,
          wsPort: 6001,
          wssPort: 6001,
          forceTLS: process.env.VUE_APP_WEBSOCKET_FORCE_TLS === 'true',
          disableStats: true,
          authEndpoint: `${process.env.VUE_APP_WEBSOCKET_BASE_URL}/broadcasting/auth`,
          auth: {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("osboha__token"),
            },
          },
          enabledTransports: ["ws", "wss"],
        });

        window.Echo.connector.pusher.connection.bind("error", (err) => {
          console.error("Error connecting to Pusher:", err);
        });

        window.Echo.connector.pusher.connection.bind(
          "state_change",
          (states) => {
            console.log("Connection state change:", states);
          },
        );

        commit("SET_ECHO", window.Echo);
      }
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
    getUserProfile(state) {
      return state.user.user_profile;
    },
    getRoles(state) {
      return state.user.roles;
    },
    getEcho: (state) => {
      return state.echo;
    },
  },
});
