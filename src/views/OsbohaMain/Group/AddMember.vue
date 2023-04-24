<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">مجموعة جديد</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
          
            class="img-fluid rounded w-25"
            alt="blog-img"
          />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <h1 class="mb-0">اضافة مجموعة</h1>
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="exampleInputEmail1">الاسم</label>
              <input
                type="text"
                v-model="v$.form.name.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="ادخال اسم المجموعة هنا"
              />
              <small style="color: red" v-if="v$.form.name.$error"
                >الرجاء قم بادخال المجموعة</small
              >
            </div>
         
          
      
         

          

            <div class="form-group" v-if="regError">
              <small style="color: red">
                {{ regError }}
              </small>
            </div>
     
            <div class="d-inline-block w-100">
              <button type="submit" class="btn btn-primary float-end">
                اضافة المجموعة
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
import GroupService from "@/API/services/group.service";
import {api} from '@/API/Intercepter.js'
export default {
  name: "AddBook",
  setup() {
    return { v$: useVuelidate() };
  },

  async created() {
      await this.getGroup();
  },

  data() {
    return {
      loader: false,
      group_id:this.$route.params.group_id,
     types:[],
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
        email:''
      },
      regError: "",
    };
  },
  methods: {
    

    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.form.$invalid) {
        this.loader = true;
       
        try {
        
        const group = await GroupService.addMember({email:this.form.email,group_id:this.group_id})
       
          console.log(group)
          this.loader = false;
        } catch (error) {
          this.loader = false;

          console.log(error.data);
        }
      }
    },
  },
  validations() {
    return {
      form: {
          email: {
          required,
        },
      
      
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
