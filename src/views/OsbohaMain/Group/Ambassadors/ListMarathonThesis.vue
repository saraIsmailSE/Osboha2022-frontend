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

        <div class="post-text ml-3 w-100 row">
          <div class="align-items-center mt-3" v-if="thesis">
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
                      نوع الانجاز: {{ thesisType }}
                    </span>
                  </label>
                </div>
              </div>

              <!--Thesis body-->
              <div class="col-md-12 form-group" v-if="thesis.comment.body">
                <p style="white-space: pre-wrap; direction: rtl" class="form-control-plaintext">
                  {{ thesis.comment.body }}
                </p>
              </div>

              <!--Thesis media-->
              <ExpandedCard title="الاقتباسات" :defaultExpanding="media.length <= 3" v-if="media.length > 0">
                <div class="col-12 row justify-content-center">
                  <div class="col-lg-3 col-md-6 col-sm-12 mb-2" v-for="(mediaFile, index) in media" :key="index">
                    <a :href="`${getAssetsUrl()}/${mediaFile.media}`" target="_blank">
                      <img class="img-fluid rounded w-100 h-100" :src="`${getAssetsUrl()}/${mediaFile.media}`"
                        alt="thesis screenshot" style="object-fit: cover" />
                    </a>
                  </div>
                </div>
              </ExpandedCard>
            </div>
            <hr />
          </div>
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
import helper from "@/utilities/helper";
import ExpandedCard from "@/components/card/ExpandedCard.vue";

export default {
  name: "List One Marathon Thesis",
  components: {
    ExpandedCard,
  },
  async created() {
    const response = await ThesisService.getThesisById(
      this.$route.params.thesis_id,
    );
    this.thesis = response;
    this.week = response.mark?.week;
  },
  data() {
    return {
      thesis: null,
      loader: false,
      status: "",
      week: null,
      expand: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
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
        type = "أطروحة شاملة";
      } else if (this.thesis.max_length > 0 && this.thesis.max_length < 400) {
        type = "أطروحة غير شاملة";
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
    ...helper,

  },
};
</script>
