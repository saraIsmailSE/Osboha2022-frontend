<template>
  <div
    class="d-flex align-items-center mt-3 col-6"
    v-if="(authInGroup && authInGroup.user_type != 'ambassador') || isAdmin"
    v-click-outside="onClickOutside"
  >
    <div
      class="d-inline-block w-100 text-center"
      @click="show = !show"
      role="button"
    >
      <span class="align-middle material-symbols-outlined"> settings </span>
      <span>اعدادت المجموعة</span>
    </div>

    <div
      :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
      aria-labelledby="dropdownMenuButton"
      style=""
    >
      <!-- <router-link v-if="groupType == 'فريق متابعة'" class="dropdown-item d-flex align-items-center" :to="{
          name: 'group.requestAmbassadors',
          params: { group_id: group_id },
        }">
          <span class="material-symbols-outlined me-2 md-18">
            diversity_1
          </span>
          طلب سفراء
        </router-link> -->

      <router-link
        class="dropdown-item d-flex align-items-center"
        :to="{
          name: 'group.addMemeber',
          params: { add_type: groupCategory, group_id: group_id },
        }"
        v-if="allowedToAddMembers"
      >
        <span class="material-symbols-outlined me-2 md-18"> person_add </span>
        اضافه عضو
      </router-link>
      <router-link
        v-if="allowedToEdit"
        class="dropdown-item d-flex align-items-center"
        :to="{
          name: 'group.update',
          params: { group_id: group_id },
        }"
      >
        <span class="material-symbols-outlined me-2 md-18"> edit </span>
        تعديل
      </router-link>
      <router-link
        v-if="group.type.type == 'followup' && advisorAndAbove"
        class="dropdown-item d-flex align-items-center"
        :to="{
          name: 'control.leadersSwap',
          params: { group_id: group_id },
        }"
      >
        <span class="material-symbols-outlined me-2 md-18"> edit </span>
        تبديل القائد
      </router-link>
      <a
        role="button"
        v-if="advisorAndAbove && hasSupportLeader"
        class="dropdown-item d-flex align-items-center"
        @click="deleteSupportLeader(supportLeader?.pivot.id)"
      >
        <span class="material-symbols-outlined me-2 md-18"> delete </span>
        حذف قائد الدعم
      </a>
      <a
        role="button"
        v-if="isAdmin || isConsultant"
        class="dropdown-item d-flex align-items-center"
        @click="deleteGroup(group_id)"
      >
        <span class="material-symbols-outlined me-2 md-18"> delete </span>
        حذف
      </a>
    </div>
  </div>
</template>
<script>
import GroupService from "@/API/services/group.service";
import vClickOutside from "click-outside-vue3";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";
import UserGroup from "@/API/services/user-group.service";

export default {
  name: "card",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
    if (this.group.type.type == "marathon") {
      this.groupCategory = "marathon";
    }
  },
  props: {
    authInGroup: {
      type: [Object],
      required: true,
    },
    group: {
      type: [Object],
      required: true,
    },
    hasSupportLeader: {
      type: [Boolean],
      default: false,
    },
    supportLeader: {
      type: [Object],
      default: null,
    },
  },
  data() {
    return {
      groupCategory: "main",
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
                this.$router.push({ name: "osboha.groupsList" });
              })
              .catch((error) => {
                helper.toggleToast("حصل خطأ - لم يتم الحذف!", "danger");
                console.log(error);
              });
          }
        });
    },

    async deleteSupportLeader(user_group_id) {
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
          text: "سيتم حذف قائد الدعم ورتبته, لا يمكنك التراجع عن هذا الاجراء",
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
            const response = await UserGroup.delete(user_group_id)
              .then(async (response) => {
                helper.toggleToast("تم الحذف", "success");
              })
              .catch((error) => {
                helper.toggleToast("حصل خطأ - لم يتم الحذف!", "error");
                console.log(error);
              })
              .finally(() => {
                this.show = false;
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
    advisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
      ]);
    },
    allowedToAddMembers() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "supervisor",
        "leader",
        "marathon_coordinator",
        "marathon_verification_supervisor",
      ]);
    },
    allowedToEdit() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "marathon_coordinator",
        "marathon_verification_supervisor",
      ]);
    },
    supervisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "supervisor",
      ]);
    },
  },
};
</script>
