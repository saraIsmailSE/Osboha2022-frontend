import { api } from "../Intercepter";

export const getStageStatus = async (id) => {

    const res = await api
        .get(`userbook/stage-status/${id}`);

    return res.data.data;
};