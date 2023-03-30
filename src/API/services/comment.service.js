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
      return error;
    }
  }

  async getPostComments(post_id, page) {
    try {
      const comments = await api.get(
        `/comments/post/${post_id}?post_id=${page}`
      );
      return comments.data;
    } catch (error) {
      return error;
    }
  }

  async getPostCommentsUsers(post_id) {
    try {
      const users = await api.get(`/comments/post/${post_id}/users`);
      return users.data;
    } catch (error) {
      return error;
    }
  }

  async updateCommentById(body, comment_id, image, screenShots, total_pages) {
    const formData = new FormData();
    formData.append("comment_id", comment_id);
    formData.append("total_pages", total_pages);
    if (image) {
      formData.append("image", image);
    }
    if (screenShots) {
      formData.append("screenShots", screenShots);
    }
    if (body) {
      formData.append("body", body);
    }
    try {
      return await api.post("/comment/update", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
    } catch (error) {
      return error;
    }
  }

  async deleteById(comment_id) {
    try {
      return await api.post("/comment/delete", { comment_id });
    } catch (error) {
      return error;
    }
  }
}

export default new CommentService();
