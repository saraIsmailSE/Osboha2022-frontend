import { api } from "../Intercepter";

class Notifications {
  
  constructor(){
    this.prefix = 'notifications'
}

  /**
   * list all Unread Notifications.
   * @return Unread Notifications
   */
  async listUnreadNotification() {
    try {
      const response = await api.get(`${this.prefix}/un-read`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
   * list all Notifications.
   * @return Unread Notifications
   */
  async listAllNotification(page) {
    try {
      const response = await api.get(`${this.prefix}/list-all?page=${page}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
   * mark one notification as read
   * @param notification_id
   */
  async markAsRead(notification_id) {
    try {
      const response = await api.get(`${this.prefix}/mark-as-read/${notification_id}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * mark ALL notifications as read
   * @param notification_id
   */
  async markAllAsRead() {
    try {
      const response = await api.get(`${this.prefix}/mark-all-as-read`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

}

export default new Notifications();