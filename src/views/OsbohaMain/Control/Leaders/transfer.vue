<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/transfer-leader.jpg" class="img-fluid rounded w-75" alt="نقل قائد" />
                </div>
            </div>

            <div class="col-12 bg-white pt-2">

                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">

                        <!-- ########## leader ########## -->
                        <div class="form-group" v-for="(leader, index) in form.leaders" :key="index">
                            <label for="leader">
                                البريد الالكتروني للقائد
                                {{ index + 1 }}
                            </label>
                            <div class="d-flex">
                                <input v-model="leader.leader_email" type="email" class="align-middle form-control mb-0"
                                    id="leader" placeholder="ادخل البريد الالكتروني للقائد" />
                                <small class=" material-symbols-outlined" role="button" @click="removeField(index)">
                                    close
                                </small>
                            </div>
                            <template v-if="v$.form.leaders.$error">
                                <small style="color: red" v-if="v$.leader.leader_email.required.$invalid">البريد
                                    الالكتروني
                                    للقائد
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.leader.leader_email.email.$invalid">البريد
                                    الالكتروني
                                    للقائد غير
                                    صحيح</small>
                            </template>
                        </div>

                        <div class="ms-2 mb-2">
                            <button type="button" class="btn btn-info" @click="addField">
                                <span class="align-middle material-symbols-outlined">
                                    person_add
                                </span>

                            </button>

                        </div>
                        <div class="form-group">
                            <!-- ########## New Supervisor  => if newSupervisor_currentToAmbassador ########## -->
                            <label for="newSupervisor">المراقب الجديد</label>
                            <input v-model="v$.form.newSupervisor.$model" type="email" class="form-control mb-0"
                                id="newSupervisor" placeholder="ادخل بريد المراقب الجديد" />
                            <template v-if="v$.form.newSupervisor.$error">
                                <small style="color: red" v-if="v$.form.newSupervisor.required.$invalid">البريد
                                    الالكتروني
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
                        <div class="form-group text-center" v-if="need_promotion.length > 0">
                            <h4> قادة بحاجة لترقية </h4>
                            <h5 style="color: red" v-for="leader in need_promotion" :key="leader">
                                - {{ leader }}
                                <br />
                            </h5>
                        </div>
                        <div class="form-group text-center" v-if="not_exists.length > 0">
                            <h4> قادة غير موجودون </h4>
                            <h5 style="color: red" v-for="leader in not_exists" :key="leader">
                                - {{ leader }}
                                <br />
                            </h5>
                        </div>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <p class="text-center">جاري النقل</p>
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
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
import { required, email, minLength } from "@vuelidate/validators";
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
                leaders: [
                    { leader_email: '' }
                ],
                newSupervisor: '',
            },
            message: "",
            formOption: "",
            need_promotion: [],
            not_exists: [],
        };
    },
    validations() {
        return {
            form: {
                leaders: {
                    required,
                    minLength: minLength(1),
                    $each: {
                        leader_email: {
                            email
                        }
                    }
                },
                newSupervisor: { required, email }
            },
        };
    },
    methods: {

        addField() {
            this.form.leaders.push({ leader_email: '' });
        },
        removeField(index) {
            this.form.leaders.splice(index, 1);
        },

        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                    const response = await RolesService.transferLeader(this.form);
                    this.need_promotion = response.need_promotion;
                    this.not_exists = response.not_exists;
                    this.message = response.message;

                    //                    this.resetForm();

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
                leaders: [
                    { leader_email: '' }
                ],
                newSupervisor: "",
            };

        },
    },
};
</script>