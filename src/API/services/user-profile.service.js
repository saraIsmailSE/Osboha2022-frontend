import { api } from "../Intercepter";

class UserProfile {
  /**
   * get profile for any user.
   *  @param  user_id
   * @return profile
   */
  async getUserProfileById(user_id) {
    try {
      const profile = await api.get(`user-profile/show/${user_id}`);
      return profile.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
   * get profile information.
   *  @param  user_id
   * @return profile
   */
  async getUserProfileToUpdate() {
    try {
      const profile = await api.get(`user-profile/show-to-update`);
      return profile.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
   * update profile information.
   *  @param  updateInfoForm
   * @return response
   */
  async update(updateInfoForm) {
    try {
      const response = await api.post(`/user-profile/update`, updateInfoForm, {
        headers: { "Content-type": "multipart/form-data" },
      });

      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
 * update profile picture.
 *  @param  profile_picture
 * @return updated profile
 */

  async updateProfilePic(profilePictureForm) {
    let formData = new FormData();
    formData.append("test", " profilePictureForm.profile_picture[0]");
    formData.append("profile_picture", profilePictureForm.profile_picture[0]);
    try {
      const response = await api.post("user-profile/update-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
 * update profile picture.
 *  @param  cover_picture
 * @return updated profile
 */
  async updateProfileCover(profilePictureForm) {
    let formData = new FormData();
    formData.append("test", " profilePictureForm.cover_picture[0]");
    formData.append("cover_picture", profilePictureForm.cover_picture[0]);

    try {
      const response = await api.post("user-profile/update-profile-cover", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * update profile picture.
   *  @param  fileName, profileID
   * @return image url
   */
  async getImages(fileName, profileID) {

    try {
      const response = await api.get(`user-profile/profile-image/${fileName}/${profileID}`);
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * update profile statistics.
   *  @param  user_id
   * @return statistics
   */
  async getProfileStatistics(user_id) {
    try {
      const statistics = await api.get(`user-profile/statistics/${user_id}`);
      return statistics.data.data;
    } catch (error) {
      return error;
    }
  }


}

export default new UserProfile();