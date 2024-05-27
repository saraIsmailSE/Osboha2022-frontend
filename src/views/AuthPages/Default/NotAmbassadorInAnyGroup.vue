<template>
  <div class="col-sm-12 text-center" v-if="loader">
    <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
  </div>

  <div class="container-fluid p-0" v-else>
    <div class="row no-gutters">
      <div class="col-sm-12 text-center">
        <div class="iq-error position-relative mt-5">
          <img src="@/assets/images/main/no-team.png" class="img-fluid iq-error-img" alt="403" />
          <div v-if="is_ambassador && is_ambassador.termination_reason == null && is_ambassador.group" class="mt-3">
            <h2 class="mb-2 text-center">وصلت للصفحة عن طريق الخطأ</h2>
            <h5 class="text-center m-auto w-75">
              انت سفير في فريق {{ is_ambassador.group.name }}
            </h5>
            <router-link :to="{
              name: 'group.group-detail',
              params: { group_id: is_ambassador.group.id },
            }" class="btn btn-primary w-50 mt-3">
              عرض الفريق
            </router-link>

          </div>
          <allocate-ambassador
            v-if="!is_ambassador.user_group || (is_ambassador.user_group && is_ambassador.user_group.termination_reason != null)" />

          <a href="javascript:void(0);" class="d-flex align-items-center m-3" @click="logout">
            <i class="material-symbols-outlined">logout</i>
            <span class="mobile-text d-lg-none ms-3">تسجيل خروج</span>
          </a>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import helper from "@/utilities/helper";
import AllocateAmbassador from '@/components/group/AllocateAmbassador.vue';

export default {
  components: { AllocateAmbassador },
  name: "NotAmbassadorInAnyGroup",
  async created() {
    this.loader = true;
    this.is_ambassador = await AmbassadorsRequest.checkAmbassador(this.user.id);
    this.loader = false;

  },

  data() {
    return {
      is_ambassador: null,
      leader_gender: '',
      loader: false,
    };
  },
  methods: {
    async allocateAmbassador() {
      this.message = "";
      this.loader = true;
      try {
        const response = await AmbassadorsRequest.allocateAmbassador(this.leader_gender, this.user.id);
        switch (response.message) {
          case 'no group found':
            this.message = 'لا يوجد مجموعة'
            break;
          case 'group without leader':
            this.message = 'لا يوجد قائد'
            break;
          case 'done successfully':
            this.message = 'تم توزيعك لفريق ' + response.group.name + ' سيتم نقلك للصفحة الرئيسية '
            setTimeout(() => {
              this.$router.push({
                name: "osboha.list",
                params: {
                  tour: 1
                }

              });
            }, 3000);

            break;

        }
      }
      catch (error) {
        helper.toggleToast(
          "حدث خطأ أثناء التوزيع, حاول مرة أخرى أو تواصل مع صفحة الدعم لمساعدتك",
          "error"
        );
        console.log(error);
      }
      finally {
        this.loader = false;

      }

    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  }
};
</script>