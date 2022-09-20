import { api } from "../Intercepter";

class UserProfile {
  async updateById(
    user_profile_id,
    first_name_ar,
    middle_name_ar,
    timeline_id,
    last_name_ar,
    country,
    resident,
    phone,
    occupation,
    religion,
    birthdate,
    bio,
    cover_picture,
    fav_writer,
    fav_book,
    fav_section,
    fav_quote,
    extraspace
  ) {
    const formData = new FormData();
    formData.append("user_profile_id", user_profile_id);
    formData.append("timeline_id", timeline_id);
    formData.append("first_name_ar", first_name_ar);
    formData.append("middle_name_ar", middle_name_ar);
    formData.append("last_name_ar", last_name_ar);
    formData.append("country", country);
    formData.append("resident", resident);
    formData.append("phone", phone);
    formData.append("occupation", occupation);
    formData.append("religion", religion);
    formData.append("birthdate", birthdate);
    formData.append("bio", bio);
    formData.append("cover_picture", cover_picture);
    formData.append("fav_writer", fav_writer);
    formData.append("fav_section", fav_section);
    formData.append("fav_book", fav_book);
    formData.append("fav_quote", fav_quote);
    formData.append("extraspace", extraspace);
    try {
      return await api.post("/user-profile/update", formData);
    } catch (error) {
      return error;
    }
  }

  async getUserProfileById(id) {
    try {
      const profile = await api.post("/user-profile/show", { user_id: id });
      return profile.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UserProfile();