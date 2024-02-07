import { api } from "../Intercepter";
import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";

class PostService {
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
      handleError(error);
    }
  }

  async delete(post_id) {
    try {
      const post = await api.delete(`/posts/${post_id}`);
      return post.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getPostById(post_id) {
    try {
      const post = await api.get(`/posts/${post_id}`);
      return post.data;
    } catch (error) {
      customHandleError(error, "PostService.getPostById");
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

  async getPostsForMainPage(page) {
    try {
      const posts = await api.get(`/posts/home?page=${page}`);
      return posts.data;
    } catch (error) {
      handleError(error);
    }
  }


  async getCurrentWeekSupportPost() {
    try {
      const posts = await api.get(`/posts/current-week-support`);
      return posts.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async postsByTimelineId(timeline_id, page) {
    try {
      const posts = await api.get(
        `/posts/timeline/${timeline_id}?page=${page}`
      );
      return posts.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getAnnouncements(page) {
    try {
      const posts = await api.get(`/posts/announcements?page=${page}`);
      return posts.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getSupportPosts(page) {
    try {
      const posts = await api.get(`/posts/support?page=${page}`);
      return posts.data;
    } catch (error) {
      handleError(error);
    }
  }
  async getFridayThesisPosts(page) {
    try {
      const posts = await api.get(`/posts/friday-thesis?page=${page}`);
      return posts.data;
    } catch (error) {
      handleError(error);
    }
  }

  async contolComments(post_id) {
    try {
      const response = await api.patch(`/posts/${post_id}/control-comments`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async pinPost(post_id) {
    try {
      const response = await api.patch(`/posts/pin/${post_id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getLastSupportPost() {
    try {
      const response = await api.get(`/posts/support/latest`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  async getLastFridayThesisPost() {
    try {
      const response = await api.get(`/posts/friday-thesis/latest`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getPendingPosts(timeline_id, post_id = "") {
    try {
      const response = await api.get(
        `/posts/pending/timeline/${timeline_id}/${post_id}`
      );
      return response.data;
    } catch (error) {
      customHandleError(error, "PostService.getPendingPosts");
    }
  }

  async acceptPost(post_id) {
    try {
      const response = await api.patch(`/posts/accept/${post_id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async declinePost(post_id) {
    try {
      const response = await api.patch(`/posts/decline/${post_id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new PostService();

export const getPostsTest = (page) => {
  return api.get(`/posts/home?page=${page}`).then((response) => response.data);
};
