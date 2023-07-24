import { api } from "../Intercepter";

class BookType {
    async getAllBookTypes(){
        try {
            const bookTypes = await api.get('/book-type');
            return bookTypes.data.data;
        } catch(error){
            return error;
        }
    }

    async create(type){
        try {
            return await api.post('/book-type/create', {type});
        }catch(error){
            return error;
        }
    }

    async getBookTypeById(id){
        try{
            const bookType = await api.post('/book-type/show', {id});
            return bookType.data;
        }catch(error){
            return error;
        }
    }

    async updateBookTypeById(id, type){
        try{
            return await api.post('/book-type/update', {id, type});
        }catch(error){
            return error;
        }
    }

    async deleteBookTypeById(id){
        try{
            return await api.post('/book-type/delete', {id});
        }catch(error){
            return error;
        }
    }
}

export default new BookType();