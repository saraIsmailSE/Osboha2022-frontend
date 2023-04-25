class UserInfoService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("osboha__user"));
    return user?.refreshToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("osboha__user"));
    user.accessToken = token;
    localStorage.setItem("osboha__user", JSON.stringify(user));
  }

  //asmaa
  hasRole(user, role) {
    if (!user || !user.roles || !role) return false;
    let roles = user.roles;
    let found = false;
    roles.forEach((role) => {
      if (role.name === role) {
        found = true;
      }
    });

    return found;
  }

  hasRoles(user, roles) {
    let hasRoles = false;
    roles.forEach((role) => {
      if (this.hasRole(user, role)) {
        hasRoles = true;
      }
    });
    return hasRoles;
  }

  //asmaa
  hasPermission(user, permission) {
    if (!user || !user.roles || !permission) return false;
    //search among all roles
    let roles = user.roles;
    let found = false;
    roles.forEach((role) => {
      if (!role.permissions) {
        return;
      }
      if (
        role.permissions.find((permission) => permission.name === permission)
      ) {
        found = true;
        return;
      }
    });

    return found;
  }

  hasPermissions(user, permissions) {
    if (!user || !user.roles || !permissions) return false;
    let hasPermissions = false;
    permissions.forEach((permission) => {
      if (this.hasPermission(user, permission)) {
        hasPermissions = true;
      }
    });
    return hasPermissions;
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("osboha__user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("osboha__user");
  }
}

export default new UserInfoService();
