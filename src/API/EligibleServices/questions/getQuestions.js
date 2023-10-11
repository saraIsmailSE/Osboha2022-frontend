import { api } from "../../Intercepter"


export const getQuestions = async (id) => {
 
const questions = await api.get(`questions/user-book/${id}`);
 
  return questions.data.data;
}