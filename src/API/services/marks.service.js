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
        `marks/user-month-achievement/${user_id}/${filter}`,
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
        `marks/user-week-achievement/${user_id}/${filter}`,
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
  async ambassadorMark(user_id, week_id) {
    try {
      const response = await api.get(
        `marks/ambassador-mark/${user_id}/${week_id}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  async marathonAmbassadorMark(user_id, week_id) {
    try {
      const response = await api.get(
        `marks/marathon-ambassador-mark/${user_id}/${week_id}`,
      );
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
  async acceptSupport(user_id, week_id) {
    try {
      const response = await api.put(
        `marks/accept-support/user/${user_id}/${week_id}`,
      );
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
  async rejectSupport(user_id, week_id) {
    try {
      const response = await api.put(
        `marks/reject-support/user/${user_id}/${week_id}`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Set support mark for all active users
   * @param  form contain reason
   * @throws {object} error
   */

  async setSupportMarkForAll(reason) {
    try {
      const response = await api.post(`/marks/set-support-for-all`, reason, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async topUsersByMonth() {
    try {
      const response = await api.get(`marks/top-users-by-month`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async topUsersByWeek() {
    try {
      const response = await api.get(`marks/top-users-by-week`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new Marks();
