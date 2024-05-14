<template>
    <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
            <form class="mt-2" @submit.prevent="onSubmit()">
                <div class="form-group" v-for="(supervisor, index) in form.supervisors" :key="index">
                    <label for="supervisor">
                        البريد الالكتروني للمراقب
                        {{ index + 1 }}
                    </label>
                    <div class="d-flex">
                        <input v-model="supervisor.supervisor_email" type="email" class="align-middle form-control mb-0"
                            id="supervisor" placeholder="ادخل البريد الالكتروني للمراقب" />
                        <small class=" material-symbols-outlined" role="button" @click="removeField(index)">
                            close
                        </small>
                    </div>
                    <template v-if="v$.form.supervisors.$error">
                        <small style="color: red" v-if="v$.supervisor.supervisor_email.required.$invalid">البريد
                            الالكتروني
                            للمراقب
                            مطلوب</small>
                        <small style="color: red" v-if="v$.supervisor.supervisor_email.email.$invalid">البريد
                            الالكتروني
                            للمراقب غير
                            صحيح</small>
                    </template>
                </div>
                <div class="ms-2 mb-2" v-if="selectedSupervisors.length == 0">
                    <button type="button" class="btn btn-info" @click="addField">
                        <span class="align-middle material-symbols-outlined">
                            person_add
                        </span>

                    </button>

                </div>

                <div class="form-group">
                    <label for="new_advisor"> الموجه المسؤول </label>
                    <input v-model="v$.form.new_advisor.$model" type="email" class="form-control mb-0" id="new_advisor"
                        placeholder="ادخل بريد الموجه المسؤول " />
                    <template v-if="v$.form.new_advisor.$error">
                        <small style="color: red" v-if="v$.form.new_advisor.required.$invalid">
                            البريد الالكتروني للموجه مطلوب</small>
                        <small style="color: red" v-if="v$.form.new_advisor.email.$invalid">
                            البريد الالكتروني للموجه غير صحيح</small>
                    </template>
                </div>
                <div class="form-group text-center" v-if="message">
                    <small style="color: red">
                        {{ message }}
                    </small>
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
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import rolesService from "@/API/services/roles.service";

export default {
    name: "Change Advising Team",
    setup() {
        return { v$: useVuelidate() };
    },
    created() {
        this.form.supervisors = this.selectedSupervisors;
    },
    props: {
        selectedSupervisors: {
            type: [Array]
        },
    },
    data() {
        return {
            loader: false,
            form: {
                supervisors: [
                    { supervisor_email: '' }
                ],
                new_advisor: "",
            },
            message: "",
        };
    },
    validations() {
        return {
            form: {
                supervisors: {
                    required,
                    minLength: minLength(1),
                    $each: {
                        supervisor_email: {
                            email
                        }
                    }
                },
                new_advisor: { required, email },
            },
        };
    },
    methods: {
        addField() {
            this.form.supervisors.push({ supervisor_email: '' });
        },
        removeField(index) {
            this.form.supervisors.splice(index, 1);
        },
        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                    const response = await rolesService.ChangeAdvisingTeam(this.form);
                    this.message = response;
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
    },
};
</script>