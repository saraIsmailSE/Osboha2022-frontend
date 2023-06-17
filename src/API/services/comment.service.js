import { handleError } from "vue";
import { api } from "../Intercepter";

class CommentService {
  async create(data) {
    const formData = new FormData();
    formData.append("type", data.type);
    if (data.post_id) formData.append("post_id", data.post_id);
    if (data.book_id) formData.append("book_id", data.book_id);
    if (data.comment_id) formData.append("comment_id", data.comment_id);
    if (data.body) formData.append("body", data.body);
    if (data.screenShots && data.screenShots.length > 0) {
      for (let i = 0; i < data.screenShots.length; i++) {
        formData.append("screenShots[]", data.screenShots[i]);
      }
    }
    if (data.start_page) formData.append("start_page", data.start_page);
    if (data.end_page) formData.append("end_page", data.end_page);
    if (data.image) formData.append("image", data.image);

    try {
      const comment = await api.post("/comments", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return comment.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getPostComments(post_id, page, user_id = "") {
    try {
      const comments = await api.get(
        `/comments/post/${post_id}/${user_id}?page=${page}`
      );
      return comments.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getPostCommentsUsers(post_id) {
    try {
      const users = await api.get(`/comments/post/${post_id}/users`);
      return users.data;
    } catch (error) {
      handleError(error);
    }
  }

  async update(data) {
    const formData = new FormData();
    formData.append("u_comment_id", data.u_comment_id);
    if (data.body) formData.append("body", data.body);
    if (data.screenShots && data.screenShots.length > 0) {
      for (let i = 0; i < data.screenShots.length; i++) {
        formData.append("screenShots[]", data.screenShots[i]);
      }
    }
    if (data.start_page) formData.append("start_page", data.start_page);
    if (data.end_page) formData.append("end_page", data.end_page);
    if (data.image) formData.append("image", data.image);

    //print formdata values
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    try {
      const comment = await api.post("/comments/update", formData, {
        "Content-type": "multipart/form-data",
      });
      return comment.data;
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id) {
    try {
      return await api.delete(`/comments/${id}`);
    } catch (error) {
      handleError(error);
    }
  }
}

export default new CommentService();
