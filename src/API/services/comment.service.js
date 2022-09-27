import { api } from "../Intercepter";

class CommentService {
    async create(post_id, comment_id, user_id ,type, image, screenShots, total_pages, body, thesis_type_id){
        const formData = new FormData();
        formData.append("post_id", post_id);
        formData.append("comment_id", comment_id);
        formData.append("type", type);
        formData.append("user_id", user_id);
        if(body){
            formData.append('body', body)
        }
        if(screenShots){
            formData.append('screenShots', screenShots);
        }
        if(total_pages){
            formData.append('total_pages', total_pages);
        }
        if(thesis_type_id){
            formData.append('thesis_type_id',thesis_type_id);
        }
        if(image){
            formData.append('image',image);
        }
        try{
            return await api.post('/comment/create', formData, {
                headers: {"Content-type": "multipart/form-data"},
            })
        }catch(error){
            return error;
        }

    }

    async getPostComments(post_id){
        try{
            const comments = await api.post('/comment/get-post-comments', {post_id});
            return comments.data;
        }catch(error){
            return error;
        }
    }

    async updateCommentById(body, comment_id, image, screenShots, total_pages){
        const formData = new FormData();
        formData.append("comment_id", comment_id);
        formData.append("total_pages", total_pages);
        if(image){
            formData.append("image", image);
        }
        if(screenShots){
            formData.append('screenShots', screenShots);
        }
        if(body){
            formData.append('body', body);
        }
        try{
            return await api.post('/comment/update', formData, {
                headers: {"Content-type": "multipart/form-data"},
            })
        }catch(error){
            return error
        }
    }

    async deleteById(comment_id){
        try {
            return await api.post('/comment/delete', {comment_id});
        }catch(error){
            return error
        }
    }
}

export default new CommentService()