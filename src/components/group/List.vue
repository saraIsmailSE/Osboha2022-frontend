<template>
  <div ref="listContainer">
    <div class="row">
      <div class="col-sm-12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title" v-if="groups && groups.length > 0">قائمة المجموعات - {{ groups.length }}</h4>
            <h4 class="card-title" v-else>قائمة المجموعات - 0</h4>
          </template>

          <template v-slot:body>
            <div class="mt-3 inputs mb-3">
              <i class="material-symbols-outlined">
                search
              </i>
              <input type="text" class="form-control" placeholder=" ... ابحث عن مجموعة" v-model.trim="searchModel"
                @keyup="debouncedSearch" />
            </div>
            <router-link class="mb-3 btn btn-primary float-end" :to="{
              name: 'group.addGroup',
            }">
              اضافة مجموعة
            </router-link>
            <div class="masonary-menu filter-button-group" v-if="retrieveType == 'all'">
              <nav>
                <div className="nav nav-tabs justify-content-start" id="portfolio-tab" role="tablist">
                  <button :className="`nav-link ${retrieveType == 'all' ? 'active' : ''}`" id="nav-all-tab"
                    data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all"
                    aria-selected="true" @click="loadGroups('all')">الكل</button>

                  <button :className="`nav-link ${retrieveType == 'advising' ? 'active' : ''}`" id="nav-trending-tab"
                    data-bs-toggle="tab" data-bs-target="#nav-trending" type="button" role="tab"
                    aria-controls="nav-trending" aria-selected="false" @click="loadGroups('advising')">
                    توجيه
                  </button>

                  <button :className="`nav-link ${retrieveType == 'supervising' ? 'active' : ''}`"
                    id="nav-popularity-tab" data-bs-toggle="tab" data-bs-target="#nav-popularity" type="button"
                    role="tab" aria-controls="nav-popularity" aria-selected="false" @click="loadGroups('supervising')">
                    رقابة
                  </button>

                  <button :className="`nav-link ${retrieveType == 'followup' ? 'active' : ''}`" id="nav-featured-tab"
                    data-bs-toggle="tab" data-bs-target="#nav-featured" type="button" role="tab"
                    aria-controls="nav-featured" aria-selected="false" @click="loadGroups('followup')">
                    متابعة
                  </button>

                </div>
              </nav>

            </div>


            <div class="table-responsive" v-if="groups && groups.length > 0">
              <table id="datatable" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>اسم المجموعة</th>
                    <th>نوع المجموعة</th>
                    <th>عدد الاعضاء</th>
                    <th>حالة المجموعة</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="(group, index) in groups" :key="index">
                    <td>
                      <router-link class="text-center" :to="{
                        name: 'group.group-detail',
                        params: { group_id: group.id },
                      }">
                        {{ group.name }}
                      </router-link>
                    </td>
                    <td>
                      {{ GROUP_TYPE[group.type.type] }}
                    </td>
                    <td>
                      {{ group.users_count }}
                    </td>
                    <td>
                      <span class="rounded-pill badge bg-success mt-2 px-2" v-if="group.is_active">
                        فعالة
                      </span>
                      <span class="rounded-pill badge bg-danger mt-2 px-2" v-else>
                        تم التفريغ
                      </span>
                    </td>

                    <td v-if="group.group_administrators">
                      <span role="button" @click="groupAdministrators(group.group_administrators, group.name)"
                        class="text-danger material-symbols-outlined ms-1 me-1">
                        shield_person
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div v-else>
              <h4>
                {{ emptyMessage }}
                <span class="material-symbols-outlined align-middle">
                  info
                </span>
              </h4>
            </div>

            <div class="col-sm-12 text-center" v-if="loading">
              <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 100px" />
            </div>

          </template>
        </iq-card>

      </div>
    </div>
  </div>
</template>
<script>
import GroupService from "@/API/services/group.service";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";
import axios from "axios";
import { ARABIC_ROLES, GROUP_TYPE } from "@/utilities/constants";

export default {
  name: "List",
  created() {
    // Debounce the searchGroup method
    this.debouncedSearch = this.debounce(this.loadGroups, 300);
  },
  props: {
    retrieveType: {
      type: [String],
      required: true,
    },
  },

  async mounted() {
    this.loadGroups(this.retrieveType);
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.cancelToken.cancel();
  },

  data() {
    return {
      groups: [],
      GROUP_TYPE,
      searchModel: "",
      page: 1,
      totalPages: 1,
      loading: false,
      pendingRequest: false,
      hasMore: true,
      emptyMessage: "",
      ARABIC_ROLES,
      cancelToken: axios.CancelToken.source(),

    };
  },

  methods: {
    async groupAdministrators(group_administrators, groupName) {
      const tableHTML = this.createAdminTable(group_administrators);
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: groupName,
          html: tableHTML,
          icon: "info",
          confirmButtonText: "اغلاق",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
    },
    createAdminTable(groupAdministrators) {
      let tableHTML = '<table  class="table table-striped table-bordered">';
      tableHTML += '<tr><th colspan="2">المسؤولين في المجموعة</th></tr>';

      // Add a row for each administrator
      groupAdministrators.forEach(function (admin) {
        tableHTML += `<tr>`;
        tableHTML += `<td>${ARABIC_ROLES[admin.pivot.user_type]}</td>`;
        tableHTML += `<td>${admin.name}</td>`;
        tableHTML += `</tr>`;
      });

      tableHTML += '</table>';
      return tableHTML;
    },
    async loadGroups(retrieveType) {
      this.groups = [];

      if (this.pendingRequest) {
        return;
      }

      if (this.searchModel == '' && this.groups.length == 0) {
        this.page = 1;
      }
      if (this.searchModel != '') {
        this.page = 1;
        this.groups = []
      }

      this.pendingRequest = true;
      this.loading = true;
      this.emptyMessage = ""
      try {
        let response;
        response = await GroupService.getAll(this.searchModel,
          this.page,
          retrieveType,
          this.cancelToken
        );
        if (response.statusCode !== 200) {
          helper.toggleToast(
            "حدث خطأ أثناء تحميل المجموعات, حاول مرة أخرى",
            "error"
          );
          return;
        }

        if (response.statusCode === 200 && !response.data) {
          this.emptyMessage = "لا يوجد مجموعات";
          this.hasMore = false;
          return;
        }

        this.groups = [...this.groups, ...response.data.groups.data];
        this.totalPages = response.data?.last_page ?? 1;
        this.page++;
      } catch (error) {
        console.log(error)
        helper.toggleToast(
          "حدث خطأ أثناء تحميل المجموعات, حاول مرة أخرى",
          "error"
        );
      } finally {
        this.loading = false;
        this.pendingRequest = false;

      }
    },
    /**
     * Check if the user has scrolled to the bottom of the page
     * @returns {boolean}
     */
    isAtBottomOfPage() {
      const containerRect = this.$refs.listContainer.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;
      return containerBottom >= windowHeight;
    },
    /*
     * Load more groups when the user scrolls to the bottom of the page
     */
    handleScroll() {
      if (this.hasMoreToLoad && this.isAtBottomOfPage()) {
        this.loadGroups(this.retrieveType);
      }
    },
    debounce(func, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    }

  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
    hasMoreToLoad() {
      return this.page <= this.totalPages && this.hasMore;
    },
  }
};


</script>

<style lang="scss" scoped>
.inputs {
  position: relative;
}

.form-control {
  text-indent: 15px;
  border: none;
  height: 45px;
  border-radius: 0px;
  border-bottom: 1px solid #eee;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #eee;
  outline: 0;
  box-shadow: none;
  border-bottom: 1px solid blue;
}

.form-control:focus {
  color: blue;
}

.inputs i {
  position: absolute;
  top: 14px;
  left: 4px;
  color: #b8b9bc;
}
</style>