import { api } from "../../Intercepter"

export const getByStatus = async (status) => {
 
    const thesis = await api.get(`thesises/status/${status}`);
    (thesis.data)
    return thesis.data.data;
}


