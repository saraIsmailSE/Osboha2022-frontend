<template>
  <div>
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
                v-on:keyup="searchGroupByName(searchModel)" />
            </div>
            <router-link class="mb-3 btn btn-primary float-end" :to="{
              name: 'group.addGroup',
            }">
              اضافة مجموعة
            </router-link>
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
                  <tr v-for="(group, index) in groups.slice(0, length)" :key="index">
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
              <span class="w-100 text-center me-3 btn" role="button" @click="loadMore()" v-if="groups.length > length">
                عرض المزيد
              </span>

            </div>

            <div v-else>
              <h4>
                لا يوجد مجموعات
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


export default {
  name: "Groups List",
  async created() {
    const groups = await GroupService.getAll();
    this.groups = groups.data;
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
      length: 10,
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
    async searchGroupByName(name) {
      let groups = null;
      if (name != '') {
        groups = await GroupService.searchGroupByName(name);
      }
      else {
        groups = await GroupService.getAll();
      }
      this.groups = groups.data;
    },
    loadMore() {
      this.length += 10;
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
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
