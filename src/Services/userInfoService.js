class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getRoles() {
    return JSON.parse(localStorage.getItem("user")).user.roles;
  }

  //asmaa
  hasRole(role_name) {
    let roles = this.getRoles();
    let found = false;
    roles.forEach((role) => {
      if (role.name === role_name) {
        found = true;
      }
    });

    return found;
  }

  //asmaa
  getRolePermissions(role_name) {
    return this.getRoles().find((role) => role.name === role_name).permissions;
  }

  //asmaa
  hasPermission(permission_name) {
    //search among all roles
    let roles = this.getRoles();
    let found = false;
    roles.forEach((role) => {
      if (
        role.permissions.find(
          (permission) => permission.name === permission_name
        )
      ) {
        found = true;
      }
    });

    return found;
  }

  hasPermissions(permissions) {
    let hasPermissions = false;
    permissions.forEach((permission) => {
      if (this.hasPermission(permission)) {
        hasPermissions = true;
      }
    });
    return hasPermissions;
  }

  getPermissions() {
    return JSON.parse(localStorage.getItem("user")).user.permissions;
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem("user")).user.user_profile;
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
