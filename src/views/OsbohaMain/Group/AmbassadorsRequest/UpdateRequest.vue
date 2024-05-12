<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    طلب رقم - {{ requestForm.request_id }}
                </h3>
            </div>



            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/request_amb.png" class="img-fluid rounded w-50" alt="blog-img">
                </div>
                <div class="d-flex align-items-center mt-3">
                    <form @submit.prevent="updateRequest" class="post-text ml-3 w-100 row">
                        <div class="form-group col-12">
                            <h4>جنس القائد</h4>
                            <select :disabled="!allowedToUpdate" v-model="v$.requestForm.leader_gender.$model"
                                class="form-select mt-2" data-trigger name="leader_gender" id="leader_gender">
                                <option value='' selected>اختر جنس القائد</option>
                                <option value='female'>أنثى</option>
                                <option value='male'>ذكر</option>
                            </select>
                            <small style="color: red" v-if="v$.requestForm.leader_gender.$error"> يرجى اختيار جنس
                                السفراء</small>
                        </div>
                        <div class="form-group col-12">
                            <h4>جنس السفراء</h4>
                            <select :disabled="!allowedToUpdate" v-model="v$.requestForm.ambassadors_gender.$model"
                                class="form-select mt-2" data-trigger name="ambassadors_gender" id="ambassadors_gender">
                                <option value='' selected>اختر جنس السفراء</option>
                                <option value='any'>لا فرق</option>
                                <option value='female'>إناث</option>
                                <option value='male'>ذكور</option>
                            </select>
                            <small style="color: red" v-if="v$.requestForm.ambassadors_gender.$error"> يرجى اختيار جنس
                                السفراء</small>
                        </div>
                        <div class="form-group">
                            <h4>العدد المطلوب</h4>
                            <div class="form-group row">
                                <select :disabled="!allowedToUpdate" v-model="v$.requestForm.members_num.$model"
                                    class="form-select mt-2" data-trigger name="members_num" id="eceptionType">
                                    <option value=0 selected>اختر عدد السفراء</option>
                                    <option v-for="index in numberToRequest" :key="index" :value=index>{{ index }}
                                    </option>
                                </select>
                            </div>
                            <small style="color:red;" v-if="v$.requestForm.members_num.$error">
                                يرجى اختيار عدد السفراء
                            </small>
                        </div>
                        <hr>
                        <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-if="!allowedToUpdate">
                            <h6 class="text-center">تم توزيع سفراء لهذا الطلب - لا يمكنك تعديله</h6>
                        </div>

                        <div class="form-group">

                            <button type="submit" :disabled="!allowedToUpdate"
                                class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                تعديل
                            </button>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                    </form>
                </div>

            </div>
        </iq-card>

    </div>
</template>
<script>
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import useVuelidate from "@vuelidate/core";
import helper from "@/utilities/helper";
import GroupService from "@/API/services/group.service";
import { required } from "@vuelidate/validators";

export default {
    name: "Update Request",
    setup() {
        return {
            v$: useVuelidate()
        };
    },
    async created() {
        const response = await AmbassadorsRequest.show(this.$route.params.request_id);
        if (response.ambassadors.length == 0) {
            this.group = await GroupService.currentAmbassadorsCount(response.group.id);
            this.allowedToUpdate = true;
            this.requestForm.ambassadors_gender = response.ambassadors_gender ? response.ambassadors_gender : '';
            this.requestForm.leader_gender = response.leader_gender ? response.leader_gender : '';
            this.requestForm.members_num = response.members_num ? response.members_num : 0;
        }
        else {
            this.allowedToUpdate = false;
        }

    },
    data() {
        return {
            allowedToUpdate: false,
            group: null,
            message: null,
            loader: false,
            requestForm: {
                leader_gender: '',
                ambassadors_gender: '',
                members_num: 0,
                request_id: this.$route.params.request_id,
            },
            last_request: null,

        };
    },
    validations() {
        return {
            requestForm: {
                leader_gender: {
                    required,
                },
                ambassadors_gender: {
                    required,
                },
                members_num: {
                    required,
                }
            }
        };
    },
    methods: {
        async updateRequest() {
            this.v$.$touch();
            if (!this.v$.requestForm.$invalid) {
                this.message = "";
                this.loader = true;
                try {
                    const response = await AmbassadorsRequest.update(this.requestForm);
                    this.last_request = response;
                    this.loader = false;
                    helper.toggleToast(
                        "تم التحديث",
                        "success"
                    );
                    this.message = 'تم رفع الطلب - رقم الطلب هو: ' + response.id;
                    this.v$.requestForm.$reset()
                    setTimeout(() => {
                        this.$router.push({
                            name: 'ambassadors-request.request-details',
                            params: { request_id: this.requestForm.request_id },
                        })
                            ;
                    }, 3000);
                }
                catch (error) {
                    helper.toggleToast(
                        "حدث خطأ أثناء التحديث, حاول مرة أخرى",
                        "error"
                    );
                    console.log(error);
                }
            }
        },
    },

    computed: {
        numberToRequest() {
            if (this.group) {
                var maximum_to_request;
                if (this.group.type.type == 'special_care') {
                    maximum_to_request = 60 - this.group.user_ambassador_count;
                    if (maximum_to_request > 15) {
                        return 15;
                    }
                    else {
                        return maximum_to_request
                    }
                }
                if (this.group.type.type == 'followup') {
                    maximum_to_request = 30 - this.group.user_ambassador_count;
                    if (maximum_to_request > 10) {
                        return 10;
                    }
                    else {
                        return maximum_to_request
                    }
                }
            }
            return 0;
        },
    },
};
</script>