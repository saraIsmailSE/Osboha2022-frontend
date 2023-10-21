<template>
  <div class="col-12">
    <div class="card card-block card-stretch card-height blog">
      <div class="card-header">
        <h2>اعرف مشروعك</h2>
      </div>
      <div class="card-body">
        <div class="blog-description">
          <table class="table w-100" v-if="!noSupportPost">
            <thead>
              <tr class="text-center">
                <th scope="col">التفاعل</th>
                <th scope="col">التصويت</th>
                <th scope="col">المنشور</th>
                <th scope="col">العلامة</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center">
                <td>
                  <span v-if="noReaction">لا يوجد</span>
                  <font-awesome-icon v-else-if="support.reaction.type === 'like'" :icon="['fas', 'thumbs-up']" size="xl"
                    class="text-primary" />
                  <img v-else :src="support.reaction.media.path" :alt="support.reaction.type" class="reaction-img"
                    height="20" width="20" />
                </td>
                <td>
                  {{ noVote ? "لا يوجد" : support.vote.option }}
                </td>
                <td>
                  <router-link :to="{
                    name: 'osboha.post',
                    params: {
                      post_id: support.post_id,
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
                  {{ supportMark }}
                </td>
                <td :rowspan="managementRowSpan" class="align-middle" v-if="noReaction && noVote && noComments">
                  <span class="text-danger-modified font-weight-600">لا يوجد دعم بعد</span>
                </td>
                <td v-else :rowspan="managementRowSpan" class="align-middle">
                  <img v-if="loading" :src="require('@/assets/images/gif/page-load-loader.gif')
                    " alt="loader" style="height: 50px" />
                  <template v-else>
                    <button class="btn btn-success" @click="handleSupport" v-if="(supportMark === 0)"  :disabled="expired">
                      قبول
                    </button>
                    <button v-else class="btn btn-danger-modified" @click="handleSupport(false)" :disabled="expired">
                      رفض
                    </button>

                    <!-- <span
                    v-if="supportMark === 0"
                      class="material-symbols-outlined text-primary"
                      role="button"
                      @click.prevent="handleSupport"
                      >done</span
                    >
                    <span
                      v-else
                      class="material-symbols-outlined text-danger-modified"
                      role="button"
                      @click.prevent="handleSupport(false)"
                      >close</span
                    > -->
                  </template>
                </td>
              </tr>
              <tr>
                <th colspan="4">التعليقات</th>
              </tr>
              <tr v-for="comment in support.comments" :key="comment.id">
                <td colspan="4">
                  {{ comment.body }}
                  <span v-if="comment.comment_id > 0" class="rounded-pill badge bg-info px-2 ms-1">رد
                  </span>
                </td>
              </tr>
              <tr class="text-center" v-if="noComments">
                <td colspan="3">لا يوجد تعليقات</td>
              </tr>
            </tbody>
          </table>
          <p class="text-danger-modified font-weight-600" style="direction: rtl !important">
            {{ support?.supportError }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkService from "@/API/services/marks.service";
import helper from "@/utilities/helper";

export default {
  name: "Support",
  props: {
    support: {
      type: Object,
      required: true,
    },
    week: {
      type: Object,
      required: true,
    },
    supportMark: {
      type: Number,
      default: 0,
    },
    expired:{
      type: Boolean,
      required:true,
    },
  },
  emits: ["updateSupportMark"],
  data() {
    return {
      ambassador_id: this.$route.params.ambassador_id,
      loading: false,
    };
  },
  created() {

  },
  computed: {
    noSupportPost() {
      return this.support?.supportError !== null;
    },
    noReaction() {
      return this.support?.reaction === null;
    },
    noVote() {
      return this.support?.vote === null;
    },
    noComments() {
      return this.support?.comments?.length === 0;
    },
    managementRowSpan() {
      return this.noComments ? 3 : this.support?.comments?.length + 2;
    },
  },
  methods: {
    async handleSupport(status = true) {
      if (this.loading) return;

      const alertText = status
        ? "سيتم قبول انجاز اعرف مشروعك وإضافة العلامة للسفير"
        : "سيتم رفض انجاز اعرف مشروعك وخصم العلامة من السفير";
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
                response = await MarkService.acceptSupport(this.ambassador_id, this.week.id);
              else
                response = await MarkService.rejectSupport(this.ambassador_id, this.week.id);

              if (response.statusCode === 200) {
                const statusText = status ? "قبول" : "رفض";
                helper.toggleToast(`تم ${statusText} انجاز اعرف مشروعك بنجاح`, "success");
                this.$emit("updateSupportMark", status ? 10 : 0);
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
