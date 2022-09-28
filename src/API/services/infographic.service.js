import { api } from "../Intercepter"

class InfocraphicService {
    async getAllInfographic(){
        try{
            const infographics = await api.get('/infographic')
            return infographics.data
        }catch(error){
            return error
        }
    }

    async create(title, designer_id, section_id, image){
        const formData = new FormData();
        formData.append('title', title);
        formData.append('designer_id', designer_id);
        formData.append('section_id', section_id);
        formData.append('image', image);
        // formData.append('infographic_id', infographic_id);
        try{
            const infographics = await api.post('/infographic/create', formData);
            return infographics.data
        }catch(error){
            return error
        }
    }

    async update(title, designer_id, section_id, infographic_id, image){
        const formData = new FormData();
        formData.append('title', title);
        formData.append('designer_id', designer_id);
        formData.append('section_id', section_id);
        formData.append('image', image);
        formData.append('infographic_id', infographic_id);
        try{
            const infographics = await api.post('/infographic/update', formData);
            return infographics.data
        }catch(error){
            return error
        }
    }

    async getInfographicById(infographic_id){
        try{
            const infographics = await api.post('/infographic/show', {infographic_id})
            return infographics.data
        }catch(error){
            return error
        }
    }

    async deleteInfographicById(infographic_id){
        try{
            const infographics = await api.post('/infographic/delete', {infographic_id})
            return infographics.data
        }catch(error){
            return error
        }
    }

    async getInfographicBySectionId(section_id){
        try{
            const infographics = await api.post('/infographic/infographicBySection', {section_id})
            return infographics.data
        }catch(error){
            return error
        }
    }    
}

export default new InfocraphicService();