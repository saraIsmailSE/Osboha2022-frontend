import{api} from '../Intercepter'

class BookService {
    async create(name, writer, publisher, brief, startPage, endPage, link, sectionId, image, level, type_id){
        let formData = new FormData();
        formData.append('name', name);
        formData.append('writer', writer);
        formData.append('start_page', startPage);
        formData.append('end_page', endPage);
        formData.append('publisher', publisher);
        formData.append('brief', brief);
        formData.append('link', link);
        formData.append('type_id', type_id);
        formData.append('section_id', sectionId);
        formData.append('level', level);
        formData.append("image", image);
        try {
            const response = await api.post('/book', formData, {
                headers: {"Content-type": "multipart/form-data"},
            })
            return response.data
        }catch(error){
            return error;
        }
    }

    async getAll(){
        try{
            const books = api.get('/book');
            return books.data;
        }catch(error){
            return error;
        }
    }

    async getById(id) {
        try{
            const book =  await api.post(`/book/show`, {book_id: id});
            return book.data;
        }catch(error){
            return error;
        }
    }

    async deleteById(id) {
        try{
            return await api.post(`/book/delete`, {book_id: id});
        }catch(error){
            return error;
        }
    }

    async getBooksByType(typeId) {
        try{
            const books =  await api.post(`/book/book-by-type`, {type_id: typeId});
            return books.data;
        }catch(error){
            return error;
        }
    }

    async getBooksByLevel(level){
        try{
            const books =  await api.post(`/book/book-by-level`, {level});
            return books.data;
        }catch(error){
            return error;
        }
    }

    async getBooksBySection(sectionId){
        try{
            const books =  await api.post(`/book/book-by-section`, {section_id: sectionId});
            return books.data;
        }catch(error){
            return error;
        }
    }
}

export default new BookService();