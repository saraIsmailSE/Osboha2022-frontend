 
import { api } from "../../Intercepter";

export const createThesis = async (thesis, userbook_id) => {
 
  let formData = new FormData();
  formData.append("thesis_text", thesis.text);
  formData.append("ending_page", thesis.pageEnd);
  formData.append("starting_page", thesis.pageStart);
  formData.append("user_book_id", userbook_id);
  const res = api.post("/thesises", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).catch(error => {
    
      
  }
  )
 
 
};
