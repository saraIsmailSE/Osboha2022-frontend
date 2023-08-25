<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar text-center align-items-center mx-auto">
                <h1 class="text-center mt-3">نقل قائد</h1>
                <h4 class="text-center mt-1 mb-3">إلى مراقب جديد</h4>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/supervisors-swap.png" class="img-fluid rounded w-75" alt="blog-img" />
                </div>
            </div>

            <div class="col-12 bg-white pt-2">

                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <!-- ########## leader ########## -->

                            <label for="leader">البريد الالكتروني للقائد</label>
                            <input v-model="v$.form.leader.$model" type="email" class="form-control mb-0" id="leader"
                                placeholder="ادخل البريد الالكتروني للقائد" />
                            <template v-if="v$.form.leader.$error">
                                <small style="color: red" v-if="v$.form.leader.required.$invalid">البريد
                                    الالكتروني
                                    للقائد
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.leader.email.$invalid">البريد الالكتروني
                                    للقائد غير
                                    صحيح</small>
                            </template>
                        </div>

                        <div class="form-group">
                            <!-- ########## New Supervisor  => if newSupervisor_currentToAmbassador ########## -->
                            <label for="newSupervisor">المراقب الجديد</label>
                            <input v-model="v$.form.newSupervisor.$model" type="email" class="form-control mb-0"
                                id="newSupervisor" placeholder="ادخل بريد المراقب الجديد" />
                            <template v-if="v$.form.newSupervisor.$error">
                                <small style="color: red" v-if="v$.form.newSupervisor.required.$invalid">البريد الالكتروني
                                    للمراقب الجديد
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.newSupervisor.email.$invalid">البريد الالكتروني
                                    للمراقب الجديد غير
                                    صحيح</small>
                            </template>
                        </div>

                        <div class="form-group text-center" v-if="message">
                            <small style="color: red">
                                {{ message }}
                            </small>
                        </div>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <p class="text-center">جاري النقل</p>
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                                نقل
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
    name: "Transfer Leader",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            form: {
                leader: "",
                newSupervisor: '',
            },
            message: "",
            formOption: "",
        };
    },
    validations() {
        return {
            form: {
                leader: { required, email },
                newSupervisor: { required, email }

            },
        };
    },
    methods: {


        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                    const response = await RolesService.transferLeader(this.form);

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
                leader: "",
                newSupervisor: "",
            };

        },
    },
};
</script>
