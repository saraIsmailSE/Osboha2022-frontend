<template>
  <div class="col-12">
    <div class="card card-block card-stretch card-height blog">
      <div class="card-header">
        <h2>الأنشطة</h2>
      </div>
      <div class="card-body">
        <div class="blog-description">
          <table class="table w-100" v-if="!noActivitiesPost">
            <thead>
              <tr class="text-center">
                <th scope="col">المنشور</th>
                <th scope="col">نوع النشاط</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>

            <tbody v-for="activity in activities" :key="activity.id">

              <tr class="text-center">
                <td>
                  <router-link :to="{
                    name: 'osboha.post',
                    params: {
                      post_id: activity.id,
                      user_id: $route.params.ambassador_id,
                    },
                  }" class="d-flex align-items-center justify-content-center">
                    <span class="material-symbols-outlined" style="font-size: 1rem">
                      link
                    </span>
                    عرض
                  </router-link>
                </td>
                <td>
                  {{ POST_TYPES[activity.type.type] }}
                </td>
                <td :rowspan="managementRowSpan" class="align-middle" v-if="!activity.comments">
                  <span class="text-danger-modified font-weight-600">لم يشارك بالنشاط</span>
                </td>
                <td v-else-if="!can_edit" :rowspan="managementRowSpan" class="align-middle">
                  <span class="text-danger-modified font-weight-600">غير مسموح لك بالتعديل</span>
                </td>
                <td v-else :rowspan="managementRowSpan" class="align-middle">

                  <img v-if="loading" :src="require('@/assets/images/gif/page-load-loader.gif')
                    " alt="loader" style="height: 50px" />
                  <template v-else>
                    <button class="btn btn-success" @click="handleActivity"
                      v-if="(!graded && activity.comments.length > 0)" :disabled="(graded || expired)">
                      قبول
                    </button>
                    <button v-else-if="(graded && activity.comments.length > 0)" class="btn btn-info"
                      :disabled="!graded || expired" @click="handleActivity(false)">
                      رفض
                    </button>
                    <button v-else class="btn btn-secondary" :disabled="activity.comments.length == 0">
                      لم يشارك
                    </button>
                  </template>
                </td>
              </tr>

              <tr colspan="3">
                <td> التعليقات </td>
              </tr>
              <tr colspan="3" class="text-center" v-if="activity.comments && activity.comments.length == 0">
                <td> لا يوجد تعليقات</td>
              </tr>
              <tr colspan="3" v-for="comment in activity.comments" :key="comment.id">
                <td colspan="3">
                  {{ comment.body }}
                  <span v-if="comment.comment_id > 0" class="rounded-pill badge bg-info px-2 ms-1">رد
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
          <p class="text-danger-modified font-weight-600" style="direction: rtl !important">
            {{ activities?.activitiesError }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkService from "@/API/services/marks.service";
import helper from "@/utilities/helper";
import { POST_TYPES } from "@/utilities/constants";

export default {
  name: "Activities",
  props: {
    activities: {
      type: Object,
      required: true,
    },
    week: {
      type: Object,
      required: true,
    },
    graded: {
      type: Boolean,
      default: false,
    },
    expired: {
      type: Boolean,
      required: true,
    },
    can_edit: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["updateMark"],
  data() {
    return {
      ambassador_id: this.$route.params.ambassador_id,
      loading: false,
      POST_TYPES,
    };
  },
  created() {
    console.log("🚀 ~ created ~ comments:", this.activities?.comments)
  },
  computed: {
    noActivitiesPost() {
      return this.activities?.activitiesError != null;
    },
    noComments() {
      return this.activities?.comments?.length === 0;
    },
    managementRowSpan() {
      return this.noComments ? 3 : this.activities?.comments?.length + 2;
    },
  },
  methods: {
    async handleActivity(status = true) {
      if (this.loading) return;

      const alertText = status
        ? "سيتم قبول المشاركة بالنشاط وإضافة علامة أطروحة واحدة للسفير"
        : "سيتم خصم علامة المشاركة بالنشاط";
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
          text: alertText,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم!",
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
            this.loading = true;
            try {
              let response;

              if (status)
                response = await MarkService.setActivityMark(
                  this.ambassador_id,
                  this.week.id,
                );
              else
                response = await MarkService.unsetActivityMark(
                  this.ambassador_id,
                  this.week.id,
                );

              if (response.statusCode === 200) {
                const statusText = status ? "قبول" : "رفض";
                helper.toggleToast(
                  `تم ${statusText} مشاركة السفير بنجاح`,
                  "success",
                );
                this.$emit("updateMark");
              }
            } catch (error) {
              console.log(error.response.data);
            } finally {
              this.loading = false;
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.text-danger-modified {
  color: #ff0000;
}

.font-weight-600 {
  font-weight: 600;
}

.btn-danger-modified {
  background-color: #ff0000;
  border-color: #ff0000;
  color: #fff;
}
</style>
