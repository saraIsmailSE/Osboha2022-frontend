import { api } from "./Intercepter";

export const login = async (data) => {
    let error = null;
    const res = await api
        .post("/login", data)
        .catch((error) => {
            error = error.response.data.message;
            (error)
        });
    return { data: res.data, error }
};