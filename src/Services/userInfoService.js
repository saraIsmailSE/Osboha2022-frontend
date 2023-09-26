class UserInfoService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("osboha__user"));
    return user?.refreshToken;
  }
  updateLocalAccessToken(token) {
    localStorage.setItem("osboha__token", token);
  }

  getLocalAccessToken() {
    return localStorage.getItem("osboha__token");
  }

  //asmaa
  hasRole(user, role_name) {
    if (!user || !user.roles || !role_name) return false;
    let roles = user.roles;
    let found = false;
    roles.forEach((role) => {
      if (role.name === role_name) {
        found = true;
      }
    });

    return found;
  }

  //return true if user has any of the roles
  hasRoles(user, roles) {
    let hasRoles = false;
    roles.forEach((role) => {
      if (this.hasRole(user, role)) {
        hasRoles = true;
        return;
      }
    });
    return hasRoles;
  }

  //asmaa
  hasPermission(user, permission_name) {
    if (!user || !user.roles || !permission_name) return false;
    //search among all roles
    let roles = user.roles;
    let found = false;
    roles.forEach((role) => {
      if (!role.permissions) {
        return;
      }
      if (
        role.permissions.find(
          (permission) => permission.name === permission_name
        )
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
        return;
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
