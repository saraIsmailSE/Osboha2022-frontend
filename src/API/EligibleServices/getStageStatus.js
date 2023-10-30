import { eligibleApi } from "../Intercepter";

export const getStageStatus = async (id) => {

    const res = await eligibleApi
        .get(`userbook/stage-status/${id}`);

    return res.data.data;
};