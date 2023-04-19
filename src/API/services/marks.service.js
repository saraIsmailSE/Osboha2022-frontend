import { api } from "../Intercepter";

class Marks {
  /**
   * get user month Achievement.
   *  @param  user_id , filter
   * @return month Achievement
   */
  async userMonthAchievement(user_id,filter) {
    try {
      const response = await api.get(`marks/user-month-achievement/${user_id}/${filter}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
   * get user week Achievement.
   *  @param  user_id , filter
   * @return week Achievement
   */
  async userWeekAchievement(user_id,filter) {
    try {
      const response = await api.get(`marks/user-week-achievement/${user_id}/${filter}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
    /**
     * get user mark with theses => list only for group administrators
   *  @param  user_id
   * @return week Achievement
   */
    async ambassadorMark(user_id) {
      try {
        const response = await api.get(`marks/ambassador-mark/${user_id}`);
        return response.data.data;
      } catch (error) {
        return error;
      }
    }
}

export default new Marks();