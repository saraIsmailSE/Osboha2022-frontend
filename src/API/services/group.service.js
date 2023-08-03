import { handleError } from "vue";
import { api } from "../Intercepter";
import { customHandleError } from "../../utilities/errors";

class GroupService {
  async createGroup(groupForm) {
    try {
      const response = await api.post(`/group/create`, groupForm, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  /**
   * Get all groups.
   *
   * @return groups;
   */
  async getAll(name,page) {
    try {
      const groups = await api.get(`/group?page=${page}&name=${name}`);
      return await groups.data;
    } catch (error) {
      return error;
    }
  }
  /**
   * Get groups by name.
   *
   * @param  group name
   * @return groups;
   */
  async searchGroupByName(name) {
    try {
      const groups = await api.get(`group/search-group-by-name/${name}`);
      return await groups.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Find an existing group by its id and display it.
   *
   * @param  $group_id
   * @return group info [users , administrators] - posts;
   */

  async getById(group_id) {
    try {
      const group = await api.get(`group/show/${group_id}`);
      return group.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Find an existing group by its id and display its basic information.
   *
   * @param  $group_id
   * @return group info;
   */

  async showBasicInfo(group_id) {
    try {
      const group = await api.get(`group/show-basic-info/${group_id}`);
      return group.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get all books belongs to group users.
   *
   * @param  $group_id
   * @return group books;
   */

  async getBooks(group_id) {
    try {
      const books = await api.get(`group/books/${group_id}`);
      return books.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * List all exceptions in a group by group Administrators
   *
   * @param $group_id
   * @return group exceptions
   */

  async getAllGroupExceptions(group_id) {
    try {
      const groupExceptions = await api.get(
        `group/group-exceptions/${group_id}`
      );
      return groupExceptions.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Filter group exceptions.
   *
   * @param  exception filter , group _id
   * @return filterd group exceptions
   */

  async exceptionsFilter(filter, group_id) {
    try {
      const exceptions = await api.get(
        `group/exceptions-filter/${filter}/${group_id}`
      );
      return exceptions.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Basic group marks.
   *
   * @param  group _id
   * @return group info , week satistics [100 - 0 -incomplete - most read]
   */

  async BasicMarksView(group_id,week_id) {
    try {
      const BasicMarksView = await api.get(`group/basic-mark-view/${group_id}/${week_id}`);
      return BasicMarksView.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * all ambassadors achievments.
   *
   * @param  group _id , week filter [current - previous ]
   * @return ambassadors achievments
   */
  async AllAchievements(group_id, week_id) {
    try {
      const response = await api.get(
        `group/all-achievements/${group_id}/${week_id}`
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * all ambassadors achievments as pages, order by total pages desc.
   *
   * @param  group _id , week filter [current - previous ]
   * @return ambassadors achievments as total pages
   */
  async AchievementAsPages(group_id, week_id) {
    try {
      const response = await api.get(
        `group/achievement-as-pages/${group_id}/${week_id}`
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * ambassador achievment in a week
   *
   * @param  ambassador_name, group _id , week filter [current - previous ]
   * @return ambassador achievment
   */

  async searchForAmbassadorAchievement(ambassador_name, group_id, week_filter) {
    try {
      const response = await api.get(
        `group/search-for-ambassador-achievement/${ambassador_name}/${group_id}/${week_filter}`
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * search for ambassador in group
   *
   * @param  ambassador_name, group _id
   * @return ambassador achievment
   */

  async searchForAmbassador(ambassador_name, group_id) {
    try {
      const response = await api.get(
        `group/search-for-ambassador/${ambassador_name}/${group_id}`
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Add a new leader request (“create RequestAmbassador” permission is required)
   *
   * @param  request information [gender - number of requested members]
  
   */
  async createLeaderRequest(request) {
    try {
      const response = await api.post(`/group/create-leader-request`, request, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * get last leader ambassador request
   *
   * @param  $group id
   * @return last request;
   */

  async lastLeaderRequest(group_id) {
    try {
      const response = await api.get(`group/last-leader-request/${group_id}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  async deleteById(group_id) {
    try {
      return await api.delete(`/group/delete/${group_id}`);
    } catch (error) {
      return error;
    }
  }

  async update(groupForm) {
    try {
      const response = await api.post(`/group/update`, groupForm, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getGroupByType(typeId) {
    try {
      const groups = await api.post("/group/GroupByType", { type_id: typeId });
      return groups.data;
    } catch (error) {
      return error;
    }
  }
  async userGroups(name,page) {
    try {
      const groups = await api.get(`/group/user-groups?page=${page}&name=${name}`);
      return groups.data;
    } catch (error) {
      return error;
    }
  }

  /*
    **** Need to discuss ****
    async addMember(body) {
        try {
            const groups = await api.post('/user-group/', body);
            return groups.data
        } catch (error) {
            return error.response.data.data
        }
    }
    */
  /**
   * get group week statistics
   *
   * @param  $group_id
   * @return statistics;
   */

  async statistics(group_id) {
    try {
      const response = await api.get(`group/statistics/${group_id}`);
      return response.data.data;
    } catch (error) {
      customHandleError(error, "statistics");
    }
  }
  /**
   * get screenshots and screens by week
   *
   * @param  $group_id,$filter
   * @return number of theses and screenshots;
   */
  async thesesAndScreensByWeek(group_id, filter) {
    try {
      const response = await api.get(
        `group/theses-and-screens-by-week/${group_id}/${filter}`
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  /**
   * get avg in a month
   *
   * @param  $group_id,$filter
   * @return month achievement;
   */
  async monthAchievement(group_id, filter) {
    try {
      const response = await api.get(
        `group/month-achievement/${group_id}/${filter}`
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new GroupService();
