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
      const response = await api.get(`${this.prefix}/unRead`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

}

export default new Notifications();