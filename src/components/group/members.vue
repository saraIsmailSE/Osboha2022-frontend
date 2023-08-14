<template>
  <div class="group-member d-flex align-items-center mt-md-0 mt-3 w-100">
    <div class="iq-media-group me-3 col-6 d-flex align-items-center" v-if="members.length > 0">
      <router-link class="iq-media" :to="{ name: 'group.group-members', params: { group_id: group_id } }">
        <img src="@/assets/images/main/more_users.png" alt="profile-img" class="img-fluid avatar-40 rounded-circle"
          :title="`عرض الكل`" />
      </router-link>
      <router-link class="iq-media" v-for="member in members.slice(0, 5)" :key="member.id"
        :to="{ name: 'user.profile', params: { user_id: member.id } }">
        <BaseAvatar :profileImg="member.user_profile.profile_picture" :profile_id="member.user_profile.id"
          :title="member.name" :gender="member.gender" avatarClass="rounded-circle avatar-40 img-fluid" />
      </router-link>
    </div>
    <div class="iq-media-group me-3 col-6" v-else>
      <p>لا يوجد أعضاء</p>
    </div>

    <!-- DISPLAY FOR ADVISOR -->
    <div class="d-flex align-items-center mt-3 col-6"
      v-if="(authInGroup && authInGroup.user_type != 'ambassador') || isAdmin" v-click-outside="onClickOutside">
      <div class="d-inline-block w-100 text-center" @click="show = !show" role="button">
        <span class="align-middle material-symbols-outlined"> settings </span>
        <span>اعدادت المجموعة</span>
      </div>

      <div :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`" aria-labelledby="dropdownMenuButton"
        style="">
        <router-link v-if="groupType == 'فريق متابعة'" class="dropdown-item d-flex align-items-center" :to="{
          name: 'group.requestAmbassadors',
          params: { group_id: group_id },
        }">
          <span class="material-symbols-outlined me-2 md-18">
            diversity_1
          </span>
          طلب سفراء
        </router-link>

        <router-link class="dropdown-item d-flex align-items-center" :to="{
          name: 'group.addMemeber',
          params: { group_id: group_id },
        }">
          <span class="material-symbols-outlined me-2 md-18">
            person_add
          </span>
          اضافه عضو
        </router-link>
        <router-link v-if="isAdmin || isConsultant" class="dropdown-item d-flex align-items-center" :to="{
          name: 'group.update',
          params: { group_id: group_id },
        }">
          <span class="material-symbols-outlined me-2 md-18">
            edit
          </span>
          تعديل
        </router-link>
        <!-- <router-link v-if="isAdmin" class="dropdown-item d-flex align-items-center" :to="{
          name: 'group.update-leader',
          params: { group_id: group_id },
        }">
          <span class="material-symbols-outlined me-2 md-18">
            edit
          </span>
          تبديل القائد
        </router-link> -->
        <a role="button" v-if="isAdmin || isConsultant" class="dropdown-item d-flex align-items-center"
          @click="deleteGroup(group_id)">
          <span class="material-symbols-outlined me-2 md-18">
            delete
          </span>
          حذف
        </a>
      </div>
    </div>
    <!-- DISPLAY FOR ADVISOR -->
  </div>
</template>
<script>
import GroupService from "@/API/services/group.service";
import vClickOutside from "click-outside-vue3";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "card",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    members: {
      type: [Object],
      required: true,
    },
    authInGroup: {
      type: [Object],
      required: true,
    },
    groupType: {
      type: [String],
      required: true,
    }
  },
  data() {
    return {
      show: false,
      group_id: this.$route.params.group_id,
    };
  },
  methods: {
    onClickOutside() {
      this.show = false;
    },
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
                helper.toggleToast("تم الحذف", "success");
                this.$router.push({ name: 'osboha.groupsList' })
              })
              .catch((error) => {
                helper.toggleToast("حصل خطأ - لم يتم الحذف!", "danger");
                console.log(error);
              });
          }
        });
    },

  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
    isConsultant() {
      return UserInfoService.hasRole(this.user, "consultant");
    },
  },
};
</script>
