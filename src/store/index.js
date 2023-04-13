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
  },
  actions: {
    register({ commit }, credentials) {
      return api.post("register", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data.data);
      });
    },
    login({ commit }, credentials) {
      return api.post("login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data.data);
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
