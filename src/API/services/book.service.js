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

    async getAll(page){
        try{
            const books = await api.get(`book?page=` + page);
            return books.data.data;
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

    async getBooksByLevel(level,page){
        try{
            const books =  await api.post(`/book/book-by-level?page=${page}`, {level});
            return books.data.data;
        }catch(error){
            return error;
        }
    }

    async getBooksByName(name,page){
        try{
            const books =  await api.post(`/book/book-by-name?page=${page}`, {name});
            return books.data.data;
        }catch(error){
            console.log(error)
            return '';
        }
    }

    async getBooksByLanguage(language,page){
        try{
            const books =  await api.post(`/book/book-by-language?page=${page}`, {language});
            return books.data.data;
        }catch(error){
            console.log(error)
            return '';
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

    async getRecentAddedBooks(){
        try{
            const books =  await api.get(`/book/recent-added-books`);
            return books.data.data;
        }catch(error){
            console.log(error)
            return '';
        }
    }

    async getMostReadableBooks(){
        try{
            const books =  await api.get(`/book/most-readable-books`);
            return books.data.data;
        }catch(error){
            console.log(error)
            return '';
        }
    }

    async getRandomBook(){
        try{
            const book =  await api.get(`/book/random-book`);
            return book.data.data;
        }catch(error){
            console.log(error)
            return '';
        }
    }
}

export default new BookService();