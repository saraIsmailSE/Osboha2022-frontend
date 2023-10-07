<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">كتاب جديد</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/registration-admin.png"
            class="img-fluid rounded w-25"
            alt="blog-img"
          />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <h1 class="mb-0">اضافة كتاب</h1>
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="exampleInputEmail1">الاسم</label>
              <input
                type="text"
                v-model="v$.form.name.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="ادخال اسم الكتاب هنا"
              />
              <small style="color: red" v-if="v$.form.name.$error"
                >الرجاء قم بادخال الكتاب</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">الكاتب</label>
              <input
                type="text"
                v-model="v$.form.author.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="ادخال اسم الكاتب هنا"
              />
              <small style="color: red" v-if="v$.form.author.$error"
                >الرجاء قم بادخال الكاتب</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">دار النشر</label>
              <input
                type="text"
                v-model="v$.form.publisher.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="ادخال اسم دار النشر هنا"
              />
              <small style="color: red" v-if="v$.form.publisher.$error"
                >الرجاء قم بادخال دار النشر</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">الرابط</label>
              <input
                type="text"
                v-model="v$.form.link.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="ادخال الرابط هنا"
              />
              <small style="color: red" v-if="v$.form.link.$error"
                >الرجاء قم بادخال الرابط</small
              >
            </div>
    
            <div class="form-group">
              <label for="exampleInputEmail1">صفحة البداية</label>
              <input
                type="text"
                v-model="v$.form.start_page.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="ادخال عدد الصفحات هنا"
              />
              <small style="color: red" v-if="v$.form.start_page.$error"
                >الرجاء قم بادخال صفحة البداية</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">صفحة النهاية</label>
              <input
                type="text"
                v-model="v$.form.end_page.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="ادخال صفحة النهاية هنا"
              />
              <small style="color: red" v-if="v$.form.end_page.$error"
                >الرجاء قم بادخال صفحة النهاية</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputEmail2">مستوى الكتاب</label>
              <select
                v-model="v$.form.level.$model"
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
              >
                <option value="">اختر مستوى الكتاب</option>
                <option
                  v-for="(i, index) in book.level"
                  :key="index"
                  :value="i"
                >
                  {{ i.name }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.level.$error"
                >يجب ادخال مستوئ الكتاب</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputEmail2">قسم الكتاب</label>
              <select
                v-model="v$.form.section.$model"
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
              >
                <option value="">اختر قسم الكتاب</option>
                <option
                  v-for="(i, index) in book.section"
                  :key="index"
                  :value="i"
                >
                  {{ i.name }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.section.$error"
                >يجب ادخال قسم الكتاب</small
              >
            </div>
               <div class="form-group">
              <label for="exampleInputEmail2">نوع الكتاب</label>
              <select
                v-model="v$.form.type.$model"
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
              >
                <option value="">اختر نوع الكتاب</option>
                <option
                  v-for="(i, index) in book.type"
                  :key="index"
                  :value="i"
                >
                  {{ i.name }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.type.$error"
                >يجب ادخال نوع الكتاب</small
              >
            </div>

                <div class="form-group">
              <label for="exampleInputEmail2">لغة الكتاب</label>
              <select
                v-model="v$.form.language.$model"
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
              >
                <option value="">اختر لغة الكتاب</option>
                <option
                  v-for="(i, index) in book.languages"
                  :key="index"
                  :value="i"
                >
                  {{ i.name }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.type.$error"
                >يجب ادخال لغة الكتاب</small
              >
            </div>

            <div class="form-group" v-if="regError">
              <small style="color: red">
                {{ regError }}
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">ملخص</label>
              <textarea type="text" v-model="v$.form.brief.$model" class="form-control mb-0" id="exampleInputEmail1"
                placeholder="ادخال الملخص هنا" />
              <small style="color: red" v-if="v$.form.brief.$error">الرجاء قم بادخال الملخص</small>
            </div>
            <div class="d-inline-block w-100">
              <button type="submit" class="btn btn-primary float-end">
                اضافة الكتاب
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
import { required, numeric } from "@vuelidate/validators";
import { api } from "../../api/Intercepter";
import bookService from "../../api/bookServices";

export default {
  name: "AddBook",
  setup() {
    return { v$: useVuelidate() };
  },

  async created() {
    await this.getLevel();
    await this.getsection();
    await this.getType();
    await this.getLanguage();
  },

  data() {
    return {
      loader: false,
      book: {
        level: [],
        section: [],
        type:[],
        languages:[]
      },
      options: {
        centeredSlides: false,
        loop: false,
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
        },
        spaceBetween: 15,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // And if we need scrollbar
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      },
      form: {
        name: "",
        author:'',
        publisher:"",
        link:'',
        start_page:"",
        end_page:"",
        section:{},
        level: {},
        type:{},
        brief:'',
        language:{}
      },
      regError: "",
    };
  },
  methods: {
    async getLevel() {
      const level = await api.get("level");
      this.book.level = level.data.data;
    },
      async getType() {
      const type = await api.get("types");
      this.book.type = type.data.data;
      console.log(this.book.type)
    },
    async getsection() {
      const section = await api.get("section");
      this.book.section = section.data.data;
    },
     async getLanguage() {
      const languages = await api.get("languages");
      this.book.languages = languages.data.data;
    },
    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.form.$invalid) {
        this.loader = true;
        console.log(this.form)
        try {
          await bookService.addBook({
            name: this.form.name,
            writer:this.form.author,
            publisher: this.form.publisher,
            link:this.form.link,
            start_page:this.form.start_page,
            end_page:this.form.end_page,
            level_id: this.form.level.id,
            section_id: this.form.section.id,
            type_id: this.form.type.id,
            brief:this.form.brief,
            language_id:this.form.language.id
          });
          window.location.reload();

          this.loader = false;
        } catch (error) {
          this.loader = false;

          console.log(error);
        }
      }
    },
  },
  validations() {
    return {
      form: {
          name: {
          required,
        },
       
        author:{
          required
        },
          publisher:{
          required
        },
        link:{
          required
        },
        start_page:{
          required,
          numeric
        },
        end_page:{
          required,
          numeric
        },
        section: {
          required,
        },
         level: {
          required,
        },
        type:{
          required
        },
        brief:{
          required
        },
        language:{
          required
        }
      
      
      },
    };
  },
};
</script>

<style lang="scss" scoped>
h1,
h4,
p,
title,
form {
  direction: rtl;
}

.form-check {
  float: left;
}

a.float-end {
  margin-top: 10px;
}
</style>
