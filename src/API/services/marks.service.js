import { handleError } from "vue";
import { api } from "../Intercepter";

class Marks {
  /**
   * get user month Achievement.
   *  @param  user_id , filter
   * @return month Achievement
   */
  async userMonthAchievement(user_id, filter) {
    try {
      const response = await api.get(
        `marks/user-month-achievement/${user_id}/${filter}`
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  /**
   * get user week Achievement.
   *  @param  user_id , filter
   * @return week Achievement
   */
  async userWeekAchievement(user_id, filter) {
    try {
      const response = await api.get(
        `marks/user-week-achievement/${user_id}/${filter}`
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
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
      handleError(error);
    }
  }

  /**
   * Accept support done by user (ambassador) and update mark
   * @param  user_id
   * @return {object} response
   * @throws {object} error
   */
  async acceptSupport(user_id) {
    try {
      const response = await api.put(`marks/accept-support/user/${user_id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Reject support done by user (ambassador) and update mark
   * @param  user_id
   * @return {object} response
   * @throws {object} error
   */
  async rejectSupport(user_id) {
    try {
      const response = await api.put(`marks/reject-support/user/${user_id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new Marks();
