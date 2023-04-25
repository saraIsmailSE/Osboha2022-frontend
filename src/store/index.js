import setting from "./setting/index";
import Vuex from "vuex";
import { api } from "../API/Intercepter";
import { handleError } from "vue";

export default new Vuex.Store({
  modules: {
    setting,
  },
  state: {
    user: null,
    token: null,
    isNewUser: true,
    reactions: [],
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
  },
  actions: {
    register({ commit }, credentials) {
      let formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("gender", credentials.gender);
      return api.post("register", formData).then((response) => {
        console.log(response);
        commit("SET_USER_DATA", response.data.user);
        commit("SET_TOKEN", response.data.token);
      });

      // // //get all reactions
      // // api.get("reactions/types").then((reactions) => {
      // //   commit("SET_REACTIONS", reactions.data.data);
      // });
    },
    login({ commit }, credentials) {
      return api
        .post("login", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data.data.user);
          commit("SET_TOKEN", data.data.token);

          // //get all reactions
          // api.get("reactions/types").then((reactions) => {
          //   commit("SET_REACTIONS", reactions.data.data);
          // });
        })
        .catch((error) => {
          handleError(error);
        });
    },
    logout({ commit }) {
      localStorage.removeItem("osboha__user");
      localStorage.removeItem("osboha__token");
      commit("SET_USER_DATA", null);
      commit("SET_TOKEN", null);
      location.reload();
    },
    isNewUser({ commit }, isNewUser) {
      commit("IS_NEW_USER", isNewUser);
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
  },
});
