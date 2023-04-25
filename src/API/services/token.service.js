class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("osboha__user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("osboha__user"));
    return user?.token;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("osboha__user"));
    user.accessToken = token;
    localStorage.setItem("osboha__user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("osboha__user"));
  }

  setUser(user) {
    localStorage.setItem("osboha__user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("osboha__user");
  }
}

export default new TokenService();
