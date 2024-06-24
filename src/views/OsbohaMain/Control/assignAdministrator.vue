<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/assign_on.jpg" class="img-fluid rounded w-75" alt="تعيين مسؤول" />
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <label for="user">المستخدم</label>
                            <input v-model="v$.form.user.$model" type="email" class="form-control mb-0" id="user"
                                placeholder="ادخل بريد المستخدم" />
                            <template v-if="v$.form.user.$error">
                                <small style="color: red" v-if="v$.form.user.required.$invalid">البريد الالكتروني للمستخدم
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.user.email.$invalid">البريد الالكتروني للمستخدم غير
                                    صحيح</small>
                            </template>
                        </div>
                        <div class="form-group">
                            <label for="head_user"> التوجيه المسؤول عنه</label>
                            <select v-model="v$.form.group_id.$model" class="form-select" data-trigger name="group_id"
                                id="group_id">
                                <option value='' selected>اختر التوجيه</option>
                                <option v-for="(group, index) in groups" :key="index" :value="group.id">
                                    {{ group.name }}
                                </option>
                            </select>
                            <small style="color: red" v-if="v$.form.group_id.$error">
                                يرجى اختيار التوجيه
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="role">دور المسؤول</label>
                            <select v-model="v$.form.user_type.$model" class="form-select" data-trigger name="user_type"
                                id="user_type">
                                <option value="" selected>اختر دور المسؤول</option>
                                <option value="advisor">موجه</option>
                                <option value="consultant">مستشار</option>
                                <option value="admin">ادارة</option>
                            </select>
                            <small style="color: red" v-if="v$.form.user_type.$error">
                                يرجى اختيار نوع الترقية
                            </small>
                        </div>

                        <div class="form-group text-center" v-if="message">
                            <small style="color: red">
                                {{ message }}
                            </small>
                        </div>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <p class="text-center">جاري الاضافة</p>
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                                اضافة
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
import { required, email } from "@vuelidate/validators";
import GroupService from "@/API/services/group.service";
const greaterThanZero = (value) => value > 0;

export default {
    name: "Assign Administrator",
    setup() {
        return { v$: useVuelidate() };
    },
    async created() {
        this.groups = await GroupService.getGroupByType('advising');
    },
    data() {
        return {
            loader: false,
            groups: [],
            form: {
                user: "",
                group_id: '',
                user_type: "",
            },
            message: "",
        };
    },
    validations() {
        return {
            form: {
                user: { required, email },
                group_id: { required, maxValue: greaterThanZero, },
                user_type: { required },
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
                    const response = await GroupService.assignAdministrator(this.form);
                    this.message = response;

                    this.v$.form.$reset();
                    this.form = {
                        user: "",
                        user_type: '',
                    };

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
