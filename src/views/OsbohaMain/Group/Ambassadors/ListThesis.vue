<template>
  <div class="col-sm-12 mt-3 text-center">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">تدقيق أطروحة</h3>
      </div>
      <div class="iq-card-body p-3">
        <div class="image-block text-center">
          <img src="@/assets/images/main/update-forms.png" class="img-fluid rounded w-50" alt="blog-img" />
        </div>

        <div class="d-flex align-items-center mt-3" v-if="thesis">
          <form @submit.prevent="submitAudit" class="post-text ml-3 w-100 row">
            <div class="form-group row">
              <div class="col-4 form-group">
                <label class="form-label">صفحة البداية</label>
                <label class="form-control-plaintext">{{
                  thesis.start_page
                }}</label>
              </div>
              <div class="col-4 form-group">
                <label class="form-label">صفحة النهاية</label>
                <label class="form-control-plaintext">{{
                  thesis.end_page
                }}</label>
              </div>
              <div class="col-4 form-group">
                <label class="form-label">العدد الكلي </label>
                <label class="form-control-plaintext">{{ totalPages }}</label>
              </div>

              <div class="form-group row">
                <div class="col-12">
                  <label class="form-control-plaintext">
                    <span class="me-2">
                      {{ thesisType }}
                    </span>
                    <span class="rounded-pill px-2 py-1 text-white" :class="thesisStatus.className">
                      {{ thesisStatus.status }}
                    </span>
                  </label>
                </div>
              </div>

              <!--Thesis body-->
              <div class="col-md-12 form-group" v-if="thesis.comment.body">
                <p style="white-space: pre-wrap; direction: rtl;" class="form-control-plaintext">
                  {{ thesis.comment.body }}
                </p>
              </div>

              <!--Thesis media-->
              <ExpandedCard title="الاقتباسات" :defaultExpanding="media.length <= 3" v-if="media.length > 0">
                <div class="col-12 row justify-content-center">
                  <div class="col-lg-3 col-md-6 col-sm-12 mb-2" v-for="(mediaFile, index) in media" :key="index">
                    <a :href="mediaFile.path" target="_blank">
                      <img class="img-fluid rounded w-100 h-100" :src="mediaFile.path" alt="thesis screenshot"
                        style="object-fit: cover" />
                    </a>
                  </div>
                </div>
              </ExpandedCard>
            </div>
            <hr />

            <div class="form-group row w-75 m-auto" v-if="!expired && pending && authUserAllowed && !readOnly">
              <div class="col-12 col-md-6">
                <select class="form-select w-100 mt-2" v-model="status">
                  <option class="bg-white text-dark" value="" selected>
                    الحالة
                  </option>
                  <option class="bg-white text-dark" value="accepted">
                    مقبولة
                  </option>
                  <option class="bg-white text-dark" value="rejected">
                    خصم علامة الأطروحة كاملة
                  </option>
                  <option class="bg-white text-dark" value="one_thesis">
                    حساب علامة أطروحة واحدة
                  </option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <select class="form-select w-100 mt-2" v-model="reason" :disabled="status === 'accepted'">
                  <option class="bg-white text-dark" value="" selected>
                    السبب
                  </option>
                  <option class="bg-white text-dark" v-for="reason in reasons" :key="reason.id" :value="reason.id">
                    {{ reason.reason }}
                  </option>
                </select>
              </div>

              <div class="col-12 mt-2 text-center" v-if="loader">
                <img :src="require('@/assets/images/page-img/page-load-loader.gif')
                  " alt="loader" style="height: 50px" />
              </div>
              <div class="col-12 mt-2" v-else>
                <button type="submit" class="btn btn-primary w-100" :disabled="message.length > 0">
                  اعتماد
                </button>
              </div>

              <div class="col-12" v-if="message">
                <p class="form-control-plaintext text-center" style="color: #ff0000">
                  {{ message }}
                </p>
              </div>
            </div>
            <div class="alert alert-danger d-flex align-items-center justify-content-center" v-else>
              <div class="me-2">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="lg" />
              </div>
              <div v-if="expired">لقد انتهت فترة التدقيق</div>
              <div v-else-if="readOnly">الأطروحة لا تحتاج إلى تدقيق</div>
              <div v-else-if="!pending">لقد تمت المراجعة من قبل</div>
              <div v-else-if="!authUserAllowed">غير مسموح لك بالتدقيق</div>
            </div>
          </form>
        </div>
        <div class="d-flex align-items-center mt-3 row">
          <div class="d-inline-block w-100 text-center col-12">
            <a role="button" @click="$router.go(-1)" class="d-block mt-3 mb-3 w-75 mx-auto">
              <span>انجاز القارىء</span>
              <span class="align-middle material-symbols-outlined">
                keyboard_return
              </span>
            </a>
          </div>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import ThesisService from "@/API/services/thesis.service";
import ReasonService from "@/API/services/reason.service";
import ModifiedThesisService from "@/API/services/modified-thesis.service";
import helper from "@/utilities/helper";
import userInfoService from "@/Services/userInfoService";
import ExpandedCard from "@/components/card/ExpandedCard.vue";

export default {
  name: "List One Thesis",
  components: {
    ExpandedCard,
  },
  async created() {
    const response = await ThesisService.getThesisById(
      this.$route.params.thesis_id
    );
    this.reasons = await ReasonService.getReasonsForLeader();
    this.thesis = response;
    this.week = response.mark?.week;
    this.expired = new Date(this.week?.modify_timer) < new Date();

  },
  data() {
    return {
      thesis: null,
      reasons: [],
      loader: false,
      status: "",
      reason: "",
      week: null,
      expired: false,
      expand: false,
    };
  },
  computed: {
    authUserAllowed() {
      return userInfoService.hasRoles(this.$store.getters.getUser, [
        "leader",
        "supervisor",
        "advisor",
        "admin",
        "consultant"
      ]);
    },
    thesisStatus() {
      let status = "";
      let className = "bg-primary";
      if (
        this.thesis.status === "pending" ||
        this.thesis.status === "" ||
        this.thesis.status === null
      ) {
        status = "بحاجة للمراجعة";
        className = "bg-warning";
      } else if (this.thesis.status === "accepted") {
        status = "مقبول";
        className = "bg-success";
      } else if (this.thesis.status === "rejected") {
        status = "مرفوض";
        className = "bg-danger";
      } else if (this.thesis.status === "one_thesis") {
        status = "علامة أطروحة واحدة";
        className = "bg-info";
      }
      return { status, className };
    },
    pending() {
      return (
        this.thesis.status === "pending" ||
        this.thesis.status === null ||
        this.thesis.status === ""
      );
    },
    readOnly() {
      return (
        this.thesis.status === "accepted" &&
        this.thesis.max_length == 0 &&
        this.thesis.total_screenshots == 0
      );
    },
    message() {
      return this.status !== "accepted" && !this.reason
        ? "لا يمكنك الاعتماد بدون اختيار السبب والحالة في حالة الرفض"
        : "";
    },
    //extract media recursively from thesis
    media() {
      let mediaFiles = [];

      const getMedia = (replies) => {
        replies.forEach((reply) => {
          if (reply.media && reply.type === "screenshot") {
            mediaFiles.push(reply.media);
          }
          if (reply.replies?.length > 0) {
            getMedia(reply.replies);
          }
        });
      };

      if (this.thesis) {
        if (this.thesis.comment.media) {
          mediaFiles.push(this.thesis.comment.media);
        }

        if (this.thesis.comment.replies?.length > 0) {
          getMedia(this.thesis.comment.replies);
        }
      }
      return mediaFiles;
    },
    thesisType() {
      let type = "";

      if (this.thesis.max_length > 0 && this.thesis.max_length > 400) {
        type = "شاملة";
      } else if (this.thesis.max_length > 0 && this.thesis.max_length < 400) {
        type = "غير شاملة";
      } else if (
        this.thesis.max_length == 0 &&
        this.thesis.total_screenshots > 0
      ) {
        type = "اقتباسات";
      } else if (
        this.thesis.max_length == 0 &&
        this.thesis.total_screenshots == 0
      ) {
        type = "قراءة فقط";
      }

      return type;
    },
    totalPages() {
      const total = this.thesis.end_page - this.thesis.start_page;
      return total > 0 ? total + 1 : 0;
    },
  },
  methods: {
    async submitAudit() {
      if (this.message.length > 0) return;

      const swalAlert = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-danger btn-lg ms-2",
        },
        buttonsStyling: false,
      });

      swalAlert
        .fire({
          title: "هل أنت متأكد؟",
          text: "لن تتمكن من التراجع عن هذا الإجراء!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم، قم بالإعتماد!",
          cancelButtonText: "تراجع",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loader = true;
            try {
              const response = await ModifiedThesisService.create({
                thesis_id: this.thesis.id,
                reason_id: this.reason ? parseInt(this.reason) : null,
                status: this.status,
                week_id: this.week.id
              });

              if (response.statusCode === 200) {
                helper.handleSuccessSwal(response.data);

                setTimeout(() => {
                  this.$router.push({
                    name: "group.listOneAmbassadorReading",
                    params: { ambassador_id: this.thesis.comment.user.id, week_id:this.week.id },
                  });
                }, 1800);
              }
            } catch (e) {
              if (e.response.data.statusCode === 406) {
                helper.handleErrorSwal(e.response.data.data);
              } else {
                helper.handleErrorSwal("حدث خطأ ما، حاول مرة أخرى");
              }
              console.log("[Modify thesis error]", e);
            } finally {
              this.loader = false;
            }
          }
        });
    },
  },
};
</script>
