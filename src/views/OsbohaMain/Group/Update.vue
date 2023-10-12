<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3">تعديل مجموعة</h1>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img class="img-fluid rounded w-75" src="@/assets/images/main/request_amb.png" alt="add-group" />
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <label for="groupName">اسم المجموعة</label>
                            <input type="text" v-model="v$.groupForm.name.$model" class="form-control mb-0" id="groupName"
                                placeholder=" اسم المجموعة" />
                            <small style="color: red" v-if="v$.groupForm.name.$error">
                                اسم المجموعة مطلوب</small>
                        </div>
                        <div class="form-group">
                            <label for="groupType">نوع المجموعة</label>
                            <select v-model="v$.groupForm.type_id.$model" class="form-select" data-trigger
                                name="choices-single-default" id="choices-single-default">
                                <option value="0" selected>اختر نوع المجموعة</option>
                                <option v-for="(type, index) in types" :key="index" :value="type.id">
                                    {{ group_type[type.type] }}
                                </option>
                            </select>
                            <small style="color: red" v-if="v$.groupForm.type_id.$error">نوع المجموعة مطلوب</small>
                        </div>
                        <div class="form-group">
                            <label for="groupDescription">وصف المجموعة</label>
                            <textarea type="text" v-model="v$.groupForm.description.$model" class="form-control mb-0"
                                id="groupDescription" placeholder="وصف المجموعة " />
                            <small style="color: red" v-if="v$.groupForm.description.$error">وصف المجموعة مطلوب</small>
                        </div>
                        <p class="text-center my-2" style="color: red" v-if="message">
                            {{ message }}
                        </p>
                        <router-link class="mb-3 text-center d-block w-100" :to="{
                            name: 'group.group-detail',
                            params: { group_id: this.$route.params.group_id },
                        }">
                            عرض المجموعة
                            <span class="align-middle material-symbols-outlined">
                                keyboard_return
                            </span>
                        </router-link>
                        <div class="col-sm-12 text-center" v-if="loading">
                            <p class="text-center">جاري التعديل</p>
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                                تعديل
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
import { required, minLength, maxLength } from "@vuelidate/validators";
import GroupService from "@/API/services/group.service";
import groupType from "@/API/services/group-type.service";

const greaterThanZero = (value) => value > 0;

export default {
    name: "Update Group",
    setup() {
        return { v$: useVuelidate() };
    },

    async created() {
        this.setGroup();
        this.types = await groupType.getAllGroupTypes();

    },

    data() {
        return {
            types: [],
            group_type: {
                followup: "فريق متابعة",
                supervising: "فريق رقابة",
                advising: "فريق توجيه",
                consultation: "فريق الاستشارة",
                Administration: "الإدارة العليا",
            },
            groupForm: {
                group_id: this.$route.params.group_id,
                name: "",
                type_id: 0,
                description: "",
            },
            message: "",
            loading: false,
        };
    },

    validations() {
        return {
            groupForm: {
                name: {
                    required,
                },
                type_id: {
                    required,
                    maxValue: greaterThanZero,
                },
                description: {
                    required,
                },
            },
        };
    },
    methods: {
        async setGroup() {
            const group = await GroupService.showBasicInfo(this.$route.params.group_id);
            if (group) {
                this.groupForm.name = group.name
                this.groupForm.type_id = group.type_id
                this.groupForm.description = group.description
            }
        },
        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.groupForm.$invalid) {
                this.loading = true;
                try {
                    await GroupService.update(this.groupForm);
                    this.setGroup();
                    this.message = "تم التعديل";
                    setTimeout(() => {
                        this.message = "";
                    }, 1800);
                } catch (error) {
                    this.message = "حصل خطأ - لم يتم التعديل!";
                    //                    console.log(error.response.data);
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
    },
};
</script>