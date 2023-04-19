import { api } from "../Intercepter";

class UserProfile {
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
    /**
     * get audit marks with group exceptions => list only for group administrators
   *  @param  group_id
   * @return mark with Achievement
   */
    async groupAuditMarks(group_id) {
      try {
        const response = await api.get(`marks/group-audit-marks/${group_id}`);
        return response.data.data;
      } catch (error) {
        return error;
      }
    }
    /**
     * get mark with theses by mark id => list only for group administrators
   *  @param  mark_for_audit_id
   * @return mark with Achievement
   */
    async markForAudit(mark_for_audit_id) {
      try {
        const response = await api.get(`marks/mark-for-audit/${mark_for_audit_id}`);
        return response.data.data;
      } catch (error) {
        return error;
      }
    }
}

export default new UserProfile();