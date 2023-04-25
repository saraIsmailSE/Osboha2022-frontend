import setting from "./setting/index";
import Vuex from "vuex";
import axios from "axios";
import { api } from "../API/Intercepter";

export default new Vuex.Store({
  modules: {
    setting,
  },
  state: {
    user: null,
    isNewUser: true,
    reactions: [],
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData.user;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    LOGOUT() {
      localStorage.removeItem("user");
      location.reload();
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser;
    },
    SET_REACTIONS(state, reactions) {
      state.reactions = reactions;
      localStorage.setItem("reactions", JSON.stringify(reactions));
    },
  },
  actions: {
    register({ commit }, credentials) {
      let formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("gender", credentials.gender);
      return api
        .post('register', formData)
        .then((response) => {
          console.log(response)
          commit('SET_USER_DATA', response.data)
        })

      // // //get all reactions
      // // api.get("reactions/types").then((reactions) => {
      // //   commit("SET_REACTIONS", reactions.data.data);
      // });
    },
    login({ commit }, credentials) {
      return api.post("login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data.data);
        //get all reactions
        api.get("reactions/types").then((reactions) => {
          commit("SET_REACTIONS", reactions.data.data);
        });
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    isNewUser({ commit }, isNewUser) {
      commit("IS_NEW_USER", isNewUser);
    },
  },
});
