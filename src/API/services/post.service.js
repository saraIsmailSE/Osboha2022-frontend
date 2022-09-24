import { api } from "../Intercepter";

class PostService {
    async getAllPosts() {
        try{
            const posts = await api.get('/post');
            return posts.data;
        }catch(error){
            return error;
        }
    }

    async create(body, type, timeline_id, image){
        const formData = new FormData()
        formData.append('image', image);
        formData.append('type', type);
        formData.append('timeline_id', timeline_id);
        formData.append('body', body);
        try{
            return await api.post('/post/create', {formData})
        }catch(error){
            return error;
        }
    }

    async getPostById(post_id){
        try{
            const post =  await api.post('/post/show', {post_id});
            return post.data;
        }catch(error){
            return error;
        }
    }

    async updatePostById(body, user_id, type, timeline_id, image){
        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', type);
        formData.append('timeline_id', timeline_id);
        formData.append('body', body);
        formData.append('user_id', user_id);
        try{
            return await api.post('/post/update', {formData});
        }catch(error){
            return error;
        }
    }

    async deletePostById(post_id){
        try{
            return await api.post('/post/delete', {post_id});
        }catch(error){
            return error;
        }
    }
}