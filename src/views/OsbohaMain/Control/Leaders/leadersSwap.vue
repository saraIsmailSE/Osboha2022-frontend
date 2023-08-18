<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar text-center align-items-center mx-auto">
                <h1 class="text-center mt-3">تبديل القادة</h1>
                <h4 class="text-center mt-1 mb-3">في فريق الرقابة نفسه</h4>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/supervisors-swap.png" class="img-fluid rounded w-75" alt="blog-img" />
                </div>
            </div>





            <div class="col-12 bg-white pt-2">

                <div class="sign-in-from">
                    <div class="form-group">
                        <label for="role">اختر نوع الاجراء</label>
                        <select v-model="formOption" class="form-select" data-trigger name="role" id="role"
                            @change="displayForm()">
                            <option value="" selected>اختر نوع الاجراء ...</option>
                            <!-- <option value="newSupervisor_currentToLeader">مراقب جديد - الحالي إلى قائد</option> -->
                            <option value="newLeader_currentToAmbassador">قائد جديد - الحالي إلى سفير</option>
                            <!-- <option value="supervisorsSwap">تبديل بين مراقبين</option> -->
                        </select>
                    </div>

                    <form v-if="formOption" class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <!-- ########## currentLeader ########## -->

                            <label for="currentLeader">القائد الحالي</label>
                            <input v-model="v$.form.currentLeader.$model" type="email" class="form-control mb-0"
                                id="currentLeader" placeholder="ادخل بريد القائد الحالي" />
                            <template v-if="v$.form.currentLeader.$error">
                                <small style="color: red" v-if="v$.form.currentLeader.required.$invalid">البريد
                                    الالكتروني
                                    للقائد الحالي
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.currentLeader.email.$invalid">البريد الالكتروني
                                    للقائد الحالي غير
                                    صحيح</small>
                            </template>
                        </div>

                        <div class="form-group">
                            <!-- ########## New Leader  => if newLeader_currentToAmbassador ########## -->
                            <label for="newLeader">القائد الجديد</label>
                            <input v-model="v$.form.newLeader.$model" type="email" class="form-control mb-0" id="newLeader"
                                placeholder="ادخل بريد القائد الجديد" />
                            <template v-if="v$.form.newLeader.$error">
                                <small style="color: red" v-if="v$.form.newLeader.required.$invalid">البريد الالكتروني
                                    القائد الجديد
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.newLeader.email.$invalid">البريد الالكتروني
                                    القائد الجديد غير
                                    صحيح</small>
                            </template>
                        </div>

                        <div class="form-group text-center" v-if="message">
                            <small style="color: red">
                                {{ message }}
                            </small>
                        </div>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <p class="text-center">جاري التبديل</p>
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                                تبديل
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
import { required, email, requiredIf } from "@vuelidate/validators";
import RolesService from "@/API/services/roles.service";

export default {
    name: "Assign Administrator",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            form: {
                currentLeader: "",
                newSupervisor: '',
                newLeader: '',
            },
            message: "",
            formOption: "",
            supervisorsSwap: false,
            newLeader_currentToAmbassador: false,
            newSupervisor_currentToLeader: false,

        };
    },
    validations() {
        return {
            form: {
                currentLeader: { required, email },
                newLeader: {
                    required: requiredIf(function () {
                        return this.newLeader_currentToAmbassador;
                    }),
                    email
                },

            },
        };
    },
    methods: {

        displayForm() {
            switch (this.formOption) {

                case "newLeader_currentToAmbassador":
                    this.newLeader_currentToAmbassador = true;
                    this.resetForm();
                    break;
                default:
                    this.newLeader_currentToAmbassador = false;
                    this.resetForm();
            }
        },

        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                    let response = null;
                    if (this.newLeader_currentToAmbassador) {
                        response = await RolesService.newLeader_currentToAmbassador(this.form);

                    }
                    else {
                        this.message = "يجب اختيار نوع الاجراء!";

                    }
                    this.message = response;

                    this.resetForm();

                    setTimeout(() => {
                        this.message = "";
                    }, 1800);
                } catch (error) {
                    this.message = "حدث خطأ, يرجى المحاولة لاحقاً";
                } finally {
                    this.loader = false;
                }
            }
        },

        resetForm() {
            this.v$.form.$reset();
            this.form = {
                currentLeader: "",
                newSupervisor: "",
            };

        },
    },
};
</script>
