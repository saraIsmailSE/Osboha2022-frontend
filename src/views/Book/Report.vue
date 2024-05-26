<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
        <h1 class="text-center mt-3 mb-3">ابلاغ كتاب مخالف</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center mt-3">
          <img class="img-fluid rounded w-75" src="@/assets/images/main/book_report.png" alt="book_report" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2" v-if="book">
        <h3 class="text-center mb-3">{{ book.name }}</h3>
        <h5 class="text-center p-3">
          هنا بإمكانك مراسلة فريق (جودة الكتب) المخصص للاعتناء بمنهج أصبوحة 180، حيث أننا نجتهد بقدر الاستطاعة في انتخاب
          كتب مفيدة للقراء، مدركين أن أساس فكرة التعلم هو أخذ ما ينفع، وانتقاد ما يضر. غير أننا نحاول جاهدين عدم توفير
          كتب ضارة للقارئ على المستوى الديني والقيمي.
          <br>
          هنا نستقبل ملاحظاتكم

        </h5>
        <div class="sign-in-from">
          <form class="mt-2" @submit.prevent="onSubmit()">

            <!-- Book violation type -->
            <div class="form-group">
              <label for="book_violation_type">نوع المخالفة</label>
              <select v-model="v$.reportForm.violation_type.$model" class="form-select" data-trigger
                name="book_violation_type" id="choices-book_violation_type-default">
                <option value="" selected>اختر نوع المخالفة</option>
                <option v-for="(type, index) in violation_type" :key="index" :value="type">
                  {{ type }}
                </option>
              </select>
              <small style="color: red" v-if="v$.reportForm.violation_type.$error">نوع المخالفة مطلوب</small>
            </div>
            <!-- description -->
            <div class="form-group">
              <label for="book_violation_description">اشرح بأسلوبك المخالفة</label>
              <textarea type="text" v-model="v$.reportForm.description.$model" class="form-control mb-0"
                id="book_violation_description" placeholder="اشرح بأسلوبك المخالفة " :style="{
                  'padding-right': '1rem !important',
                }" style="
                  direction: rtl;
                  max-height: 120px;
                  resize: none;
                  overflow: auto;
                " :rows="1" ref="bodyRef" />
              <small style="color: red" v-if="v$.reportForm.description.$error">وصف المخالفة مطلوب</small>
            </div>


            <!-- ########## page ########## -->
            <div class="form-group" v-for="(page, index) in reportForm.violated_pages" :key="index">
              <label for="page">
                الصفحة المخالفة -
                {{ index + 1 }}
              </label>
              <div class="d-flex">
                <input v-model="page.number" type="number" class="align-middle form-control mb-0" :id="index"
                  :min="book.start_page" :max="book.end_page" placeholder="ادخل الصفحة المخالفة" />
                <small class=" material-symbols-outlined" role="button" @click="removeField(index)">
                  close
                </small>
              </div>
              <template v-if="v$.reportForm.violated_pages.$error">
                <small style="color: red">
                  يجب ادخال صفحة واحدة على الاقل
                </small>

                <small style="color: red" v-if="v$.page.number.minLength.$invalid">

                  صفحة البداية غير متوافقة
                </small>
                <small style="color: red" v-if="v$.page.number.maxLength.$invalid">
                  صفحة النهاية غير متوافقة
                </small>

              </template>
            </div>
            <div class="ms-2 mb-2">
              <button type="button" class="btn btn-info" @click="addField">
                <span class="align-middle material-symbols-outlined">
                  note_add
                </span>
                اضافة صفحة
              </button>

            </div>


            <!-- Book Media -->
            <div class="form-group col-12">
              <h4>صورة المخالفة (اختياري
                )</h4>
              <input class="form-control mt-2" type="file" name="report_media" id="report_media" ref="report_media"
                accept="image/*" @change="uploadFile" />
            </div>

            <p class="text-center my-2" style="color: red" v-if="message">
              {{ message }}
            </p>
            <router-link class="mb-3 text-center d-block w-100" :to="{
              name: 'book.book-details',
              params: { book_id: this.$route.params.book_id },
            }">
              عرض الكتاب
              <span class="align-middle material-symbols-outlined">
                keyboard_return
              </span>
            </router-link>
            <div class="col-sm-12 text-center" v-if="loading">
              <p class="text-center">جاري الارسال</p>
              <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                ارسال
              </button>
            </div>
          </form>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, minLength, maxLength } from "@vuelidate/validators";
import bookService from "@/API/services/book.service";

export default {
  name: "Report a Book",
  setup() {
    return { v$: useVuelidate() };
  },

  async created() {
    const response = await bookService.showBasicInfo(this.$route.params.book_id);
    this.book = response.book

  },
  watch: {
    bookdescription() {
      this.$refs.bodyRef.style.height = "auto";
      this.$nextTick(() => {
        this.$refs.bodyRef.style.height =
          this.$refs.bodyRef.scrollHeight + "px";
      });
    },
  },
  computed: {
    bookdescription() {
      return this.reportForm.description;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },

  data() {
    return {
      book: null,
      violation_type: [
        'مخالفات دينية داخل الكتاب',
        'مخالفات أخلاقية داخل الكتاب',
        'ترجمة سيئة للكتاب',
        'جودة الكتاب سيئة',
        'عدم موافقة المؤلف  على نشره إلكترونيًا',

      ],
      reportForm: {
        book_id: this.$route.params.book_id,
        report_media: null,
        violation_type: "",
        description: "",
        violated_pages: [{ number: 0 }],
      },
      message: "",
      loading: false,
    };
  },

  validations() {
    return {
      reportForm: {
        violation_type: {
          required,
        },
        description: {
          required
        },
        violated_pages: {
          required,
          minLength: minLength(1),
          // $each: {
          //   number: {

          //     minLength: minLength(
          //       function () {
          //         if (this.book.start_page)
          //           return this.book.start_page;
          //         else
          //           return 1;
          //       }
          //     ),
          //     maxLength: maxLength(
          //       function () {
          //         if (this.book.end_page)
          //           return this.book.end_page;
          //         else
          //           return 1;
          //       }
          //     ),
          //   }
          // }
        },
      },
    };
  },
  methods: {
    addField() {
      this.reportForm.violated_pages.push({ number: 0 });
    },
    removeField(index) {
      this.reportForm.violated_pages.splice(index, 1);
    },
    uploadFile(event) {
      this.reportForm.report_media = event.target.files[0];
    },

    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.reportForm.$invalid) {
        this.loading = true;
        try {
          await bookService.report(this.reportForm);
          this.message = "شكرا لك لمساعدتنا، سيتم النظر في ملاحظات من فريق التفتيش.";
          setTimeout(() => {
            this.$router.push({ name: "osboha.book" });
          }, 3000);
        } catch (error) {
          this.message = "حصل خطأ - لم يتم الارسال!";
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>