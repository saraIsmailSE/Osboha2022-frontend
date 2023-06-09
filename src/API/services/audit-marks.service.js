import { api, handelErrors } from "../Intercepter";

class AuditMarks {

  constructor() {
    this.prefix = 'audit-marks'
  }

  /**
   * get audit marks with group exceptions => list only for group administrators
 *  @param  group_id
 * @return mark with Achievement
 */
  async groupAuditMarks(group_id) {
    try {
      const response = await api.get(`${this.prefix}/group-audit-marks/${group_id}`)
        .catch((error) => { // error is handled in catch block
          if (error.response) {
            handelErrors(error.response.status)

          } else if (error.request) { // The request was made but no response was received
            console.log(error.request);
          } else {// Error on setting up the request
            console.log('Error', error.message);
          }
        });
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
      const response = await api.get(`${this.prefix}/mark-for-audit/${mark_for_audit_id}`)
        .catch((error) => { // error is handled in catch block
          if (error.response) {
            handelErrors(error.response.status)

          } else if (error.request) { // The request was made but no response was received
            console.log(error.request);
          } else {// Error on setting up the request
            console.log('Error', error.message);
          }
        });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
* Update Mark for Audit Status.
*
* @param  status, mark_for_audit_id
*/
  async updateMarkForAuditStatus(status, id) {
    try {
      const response = api.patch(`${this.prefix}/update-mark-for-audit-status/${id}`, {
        status: status,
      }).catch((error) => { // error is handled in catch block
        if (error.response) {
          handelErrors(error.response.status)

        } else if (error.request) { // The request was made but no response was received
          console.log(error.request);
        } else {// Error on setting up the request
          console.log('Error', error.message);
        }
      });
      return response.data.data;
    } catch (error) {
      return error;
    }

  }

  /**
  * Add Note.
  *  @param  noteForm
  * @return response
  */
  async addNote(noteForm) {
    try {
      const response = await api.post(`/${this.prefix}/add-note`, noteForm, {
        headers: { "Content-type": "multipart/form-data" },
      }).catch((error) => { // error is handled in catch block
        if (error.response) {
          handelErrors(error.response.status)

        } else if (error.request) { // The request was made but no response was received
          console.log(error.request);
        } else {// Error on setting up the request
          console.log('Error', error.message);
        }
      });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }


  /**
  * get all groups audit for supervisor.
  * @return response
  */
  async groupsAudit(supervisor_id) {
    try {
      const response = await api.get(`/${this.prefix}/groups-audit/${supervisor_id}`)
        .catch((error) => { // error is handled in catch block
          if (error.response) {
            handelErrors(error.response.status)

          } else if (error.request) { // The request was made but no response was received
            console.log(error.request);
          } else {// Error on setting up the request
            console.log('Error', error.message);
          }
        })
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
  * get all groups audit for supervisor.
  * @return response
  */
  async supervisorsAudit(advisor_id) {
    try {
      const response = await api.get(`/${this.prefix}/supervisors-audit/${advisor_id}`)
        .catch((error) => { // error is handled in catch block
          if (error.response) {
            handelErrors(error.response.status)

          } else if (error.request) { // The request was made but no response was received
            console.log(error.request);
          } else {// Error on setting up the request
            console.log('Error', error.message);
          }
        })
      return response.data.data;
    } catch (error) {
      return error;
    }
  }


  /**
  * get notes for specific audit.
  * @return response
  */
  async getNotes(mark_for_audit_id) {
    try {
      const response = await api.get(`/${this.prefix}/get-notes/${mark_for_audit_id}`)
        .catch((error) => { // error is handled in catch block
          if (error.response) {
            handelErrors(error.response.status)

          } else if (error.request) { // The request was made but no response was received
            console.log(error.request);
          } else {// Error on setting up the request
            console.log('Error', error.message);
          }
        })
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

}

export default new AuditMarks();