<template>
  <div>
    <div class="row">
      <div class="col-sm-12" ref="listContainer">
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
                v-on:keyup="loadGroups()" />
            </div>
            <router-link class="mb-3 btn btn-primary float-end" :to="{
              name: 'group.addGroup',
            }">
              اضافة مجموعة
            </router-link>

            <div class="col-sm-12 text-center" v-if="loading">
              <img :src="require('@/assets/images/page-img/page-load-loader.gif')" alt="loader" style="height: 100px" />
            </div>

            <div class="table-responsive" v-if="groups && groups.length > 0">
              <table id="datatable" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>اسم المجموعة</th>
                    <th>نوع المجموعة</th>
                    <th>عدد الاعضاء</th>
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
                      {{ group_type[group.type.type] }}
                    </td>
                    <td>
                      {{ group.users_count }}
                    </td>

                    <td v-if="isAdmin">
                      <router-link class="text-primary material-symbols-outlined ms-1 me-1" :to="{
                        name: 'group.update',
                        params: { group_id: group.id },
                      }">

                        edit
                      </router-link>
                      <span role="button" @click="deleteGroup(group.id)"
                        class="text-danger material-symbols-outlined ms-1 me-1">
                        delete
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


export default {
  name: "Groups List",
  async mounted() {
    this.loadGroups();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.cancelToken.cancel();
  },

  data() {
    return {
      groups: [],
      group_type: {
        followup: "فريق متابعة",
        supervising: "فريق رقابة",
        advising: "فريق توجيه",
        consultation: "فريق الاستشارة",
        Administration: "الإدارة العليا",
      },
      searchModel: "",
      page: 1,
      totalPages: 1,
      loading: false,
      pendingRequest: false,
      hasMore: true,
      emptyMessage: "",
      cancelToken: axios.CancelToken.source(),

    };
  },

  methods: {
    async deleteGroup(id) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "هل أنت متأكد؟",
          text: "لا يمكنك التراجع عن هذا الاجراء",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم، قم بالحذف",
          cancelButtonText: "تراجع  ",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then(async (willDelete) => {
          if (willDelete.isConfirmed) {
            const response = await GroupService.deleteById(id)
              .then(async (response) => {
                const groups = await GroupService.getAll();
                this.groups = groups.data;
                helper.toggleToast("تم الحذف", "success");
              })
              .catch((error) => {
                helper.toggleToast("حصل خطأ - لم يتم الحذف!", "danger");
                console.log(error);
              });
          }
        });
    },
    async loadGroups() {
      if (this.pendingRequest) {
        return;
      }

      if (this.searchModel == '' && this.groups.length == 0) {
        this.page = 1;
      }
      if (this.searchModel != '') {
        this.page = 1;
        this.groups=[]
      }

      this.pendingRequest = true;
      this.loading = true;
      this.emptyMessage=""
      try {
        let response;
        response = await GroupService.getAll(this.searchModel,
          this.page,
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
        this.loadGroups();
      }
    },
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
