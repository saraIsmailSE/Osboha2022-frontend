import { api } from "../Intercepter"

export default {
  getUnactive() {
    const users = api.get(`users/list/un-active`);
    return users;

  },

  getUnactiveReviwers() {
    const users = api.get(`users/list/un-active-reviwers-auditors`);
    return users;

  },
  updateInfo: async (info) => {
    let formData = new FormData();
    formData.append("name", info.name); 
    formData.append("image", info.file[0]);

    const response = await api.post("users/update-info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch(error => {

      console.log(error)
    }
    ) 
    console.log(response)
    return response;
  },



  updateName: async (info) => {
    let formData = new FormData();
    formData.append("name", info.name); 
    formData.append("id", info.id);

    const response = await api.post("users/update-name", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch(error => {

      console.log(error)
    }
    ) 
    console.log(response)
    return response;
  },


  async getUser(id) {
    const user = await api.get(`users/${id}`);
    return user.data.data;

  },


  async searchByName(name) {
    try {
      const users = await api.get(`users/search-by-name/${name}`);
      return await users.data.data;
    } catch (error) {
      return error;
    }
  },

  async getAll() {
    const user = await api.get(`users/`);
    return user.data.data;

  },

  deActiveUser: async (id, rejectNote) => {
    try {
      const response = await api.post("users/deactive-user", {
        id: id,
        rejectNote: rejectNote,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  acceptUser(id) {
    const user = api.patch(`users/activate/${id}`);
    return user;

  },
  async getUserStatistics() {
    const user = await api.get(`users/statistics`);
    return user.data.data;

  },

  acceptThesis(id) {
    return true;

  }
}

