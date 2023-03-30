import { api } from "../Intercepter";

class PostService {
  async getAllPosts() {
    try {
      const posts = await api.get("/posts");
      return posts.data;
    } catch (error) {
      return error;
    }
  }

  async create(post) {
    const formData = new FormData();
    formData.append("body", post.body);
    formData.append("type", post.type);
    formData.append("timeline_id", post.timeline_id);

    if (post.media) {
      post.media.forEach((media) => {
        formData.append("media[]", media);
      });
    }
    if (post.tags) {
      post.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });
    }
    if (post.votes) {
      post.votes.forEach((vote) => {
        formData.append("votes[]", vote);
      });
    }

    try {
      const post = await api.post("/posts", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      // console.log("post", post);
      return post.data;
    } catch (error) {
      return error;
    }
  }

  async getPostById(post_id) {
    try {
      const post = await api.post("/post/show", { post_id });
      return post.data;
    } catch (error) {
      return error;
    }
  }

  async updatePostById(body, user_id, type, timeline_id, image) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("type", type);
    formData.append("timeline_id", timeline_id);
    formData.append("body", body);
    formData.append("user_id", user_id);
    try {
      return await api.post("/post/update", { formData });
    } catch (error) {
      return error;
    }
  }

  async deletePostById(post_id) {
    try {
      return await api.post("/post/delete", { post_id });
    } catch (error) {
      return error;
    }
  }

  async getPostsForMainPage($page) {
    try {
      const posts = await api.get(`/posts/home?page=${$page}`);
      return posts.data;
    } catch (error) {
      return error;
    }
  }

  async postsByTimelineId(timeline_id, $page) {
    try {
      const posts = await api.get(
        `/posts/timeline/${timeline_id}?page=${$page}`
      );
      return posts.data;
    } catch (error) {
      return error;
    }
  }
}

export default new PostService();
