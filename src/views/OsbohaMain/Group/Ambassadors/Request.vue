<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    طلب سفراء
                </h3>
            </div>
            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/request_amb.png" class="img-fluid rounded w-50" alt="blog-img">
                </div>

                <div class="d-flex align-items-center mt-3">
                    <form @submit.prevent="submitException" class="post-text ml-3 w-100 row">
                        <div class="form-group col-12">
                            <h4>جنس السفراء</h4>
                            <select :disabled="message" v-model="v$.requestForm.amb_gender.$model" class="form-select mt-2"
                                data-trigger name="amb_gender" id="eceptionType">
                                <option value='' selected>اختر جنس السفراء</option>
                                <option value='any'>لا فرق</option>
                                <option value='female'>إناث</option>
                                <option value='male' >ذكور</option>
                            </select>
                            <small style="color: red" v-if="v$.requestForm.amb_gender.$error"> يرجى اختيار جنس
                                السفراء</small>
                        </div>
                        <div class="form-group">
                            <h4>العدد المطلوب</h4>
                            <div class="form-group row">
                                <select :disabled="message" v-model="v$.requestForm.amb_no.$model" class="form-select mt-2"
                                data-trigger name="amb_no" id="eceptionType">
                                <option value=0 selected>اختر عدد السفراء</option>
                                <option v-for="index in 10" :key="index" :value=index>{{index}}</option>
                            </select>
                            </div>
                            <small style="color:red;" v-if="v$.requestForm.amb_no.$error">
                                يرجى اختيار عدد السفراء 
                            </small>
                        </div>
                        <hr>
                        <div class="form-group">

                            <button type="submit" :disabled="message" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                طلب
                            </button>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                    </form>
                </div>
                <div class="d-flex align-items-center mt-3 row">
                    <div class="d-inline-block w-100 text-center col-12">
                        <a role="button" @click="back()" class=" d-block mt-3 mb-3 w-75 mx-auto">
                            <span>عودة للمجموعة</span>
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
import exceptionTypeService from '@/API/services/exception-type.service';
import exceptionService from '@/API/services/user-exception.service';
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
    name: "New Exception",
    async created() {
        this.exceptionTypes = await exceptionTypeService.getAllExceptionTypes()
    },
    components: {
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            requestForm: {
                amb_gender: '',
                amb_no: 0,
            },
            exceptionTypes: null,
            message: null,

        };
    },
    validations() {
        return {
            requestForm: {
                amb_gender: {
                    required,
                },
                amb_no: {
                    required,
                }
            }
        };
    },
    methods: {
        async submitException() {
            this.v$.$touch();
            if (!this.v$.requestForm.$invalid) {
                this.message = "";
                this.loader = true;
                try {
                    const response = await exceptionService.create(this.requestForm);
                    this.loader = false;
                    this.message = response;
                    this.v$.requestForm.$reset()

                }
                catch (error) {
                    console.log(error);
                }
            }


        },
        back() {
            this.$router.push({ name: 'group.group-detail' })
        }
    },
};
</script>