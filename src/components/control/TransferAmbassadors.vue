<template>

    <div class="sign-in-from">
        <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group" v-for="(ambassador, index) in form.ambassadors" :key="index">
                <label for="ambassador">
                    البريد الالكتروني للسفير
                    {{ index + 1 }}
                </label>
                <div class="d-flex">
                    <input v-model="ambassador.ambassador_email" type="email" class="align-middle form-control mb-0"
                        id="ambassador" placeholder="ادخل البريد الالكتروني للسفير" />
                    <small class=" material-symbols-outlined" role="button" @click="removeField(index)">
                        close
                    </small>
                </div>
                <template v-if="v$.form.ambassadors.$error">
                    <small style="color: red" v-if="v$.ambassador.ambassador_email.required.$invalid">البريد
                        الالكتروني
                        للسفير
                        مطلوب</small>
                    <small style="color: red" v-if="v$.ambassador.ambassador_email.email.$invalid">البريد
                        الالكتروني
                        للسفير غير
                        صحيح</small>
                </template>
            </div>
            <div class="ms-2 mb-2" v-if="selectedAmbassadors.length >= 0">
                <button type="button" class="btn btn-info" @click="addField">
                    <span class="align-middle material-symbols-outlined">
                        person_add
                    </span>

                </button>
            </div>

            <div class="form-group" v-if="selectedAmbassadors.length > 0">
                <label for="leader_email">القائد الجديد</label>
                <input v-model="v$.form.leader_email.$model" type="email" class="form-control mb-0" id="leader_email"
                    placeholder="ادخل بريد القائد الجديد" />
                <template v-if="v$.form.leader_email.$error">
                    <small style="color: red" v-if="v$.form.leader_email.required.$invalid">البريد الالكتروني
                        للقائد الجديد
                        مطلوب</small>
                    <small style="color: red" v-if="v$.form.leader_email.email.$invalid">البريد الالكتروني
                        للقائد الجديد غير
                        صحيح</small>
                </template>
            </div>

            <div class="form-group text-center" v-if="message">
                <small style="color: red">
                    {{ message }}
                </small>
            </div>

            <div class="form-group text-center" v-if="not_exists.length > 0">
                <h4> سفراء غير موجودون </h4>
                <h5 style="color: red" v-for="ambassador in not_exists" :key="ambassador">
                    - {{ ambassador }}
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
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import RolesService from "@/API/services/roles.service";

export default {
    name: "Transfer Ambassadors",
    setup() {
        return { v$: useVuelidate() };
    },
    created() {
        this.form.ambassadors = this.selectedAmbassadors;
    },
    props: {
        selectedAmbassadors: {
            type: [Array]
        },
    },
    data() {
        return {
            loader: false,
            form: {
                ambassadors: [
                    { ambassador_email: '' }
                ],
                leader_email: '',
            },
            message: "",
            not_exists: [],

        };
    },
    validations() {
        return {
            form: {
                ambassadors: {
                    required,
                    minLength: minLength(1),
                    $each: {
                        ambassador_email: {
                            email
                        }
                    }
                },
                leader_email: { required, email },
            },
        };
    },
    methods: {
        addField() {
            this.form.ambassadors.push({ ambassador_email: '' });
        },
        removeField(index) {
            this.form.ambassadors.splice(index, 1);
        },


        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                    const response = await RolesService.transferAmbassador(this.form);
                    this.not_exists = response.not_exists;
                    this.message = response.message;

                    this.resetForm();

                    setTimeout(() => {
                        this.message = "";
                    }, 3000);

                    this.$emit('ambassadors_transferred')

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
                ambassador_email: "",
                leader_email: "",
            };

        },
    },
};
</script>