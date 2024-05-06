<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card" v-if="group">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    طلب سفراء - {{ group.name }}
                </h3>
            </div>
            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/request_amb.png" class="img-fluid rounded w-50" alt="blog-img">
                </div>

                <!-- LAST REQUEST -->
                <h4 class="card-title" v-if="last_request"> الطلب الأخير</h4>
                <ambassadors-request-details v-if="last_request" :request="last_request" />

                <div class="d-flex align-items-center mt-3" v-if="numberToRequest > 0">
                    <form @submit.prevent="submitException" class="post-text ml-3 w-100 row">
                        <div class="form-group col-12">
                            <h4>جنس القائد</h4>
                            <select :disabled="message" v-model="v$.requestForm.leader_gender.$model"
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
                            <select :disabled="message" v-model="v$.requestForm.ambassadors_gender.$model"
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
                                <select :disabled="message" v-model="v$.requestForm.members_num.$model"
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
                        <div class="form-group">

                            <button type="submit" :disabled="message"
                                class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                طلب
                            </button>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                    </form>
                </div>
                <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-else>
                    <h6 class="text-center">
                        لا يمكنك طلب سفراء
                    </h6>
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
        <div class="col-sm-12 text-center" v-else>
            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 100px" />
        </div>

    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import helper from "@/utilities/helper";
import GroupService from "@/API/services/group.service";
import { required } from "@vuelidate/validators";
import AmbassadorsRequestDetails from '@/components/group/AmbassadorsRequestDetails';
export default {
    name: "New Ambassador Request",
    async created() {
        this.group = await GroupService.currentAmbassadorsCount(this.$route.params.group_id);
        this.last_request = await AmbassadorsRequest.latestGroupRequest(this.$route.params.group_id);
    },

    components: {
        AmbassadorsRequestDetails,
    },
    setup() {
        return {
            v$: useVuelidate()
        };
    },
    data() {
        return {
            group: null,
            loader: false,
            requestForm: {
                leader_gender: '',
                ambassadors_gender: '',
                members_num: 0,
                group_id: this.$route.params.group_id,
            },
            last_request: null,
            message: null,

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
        async submitException() {
            this.v$.$touch();
            if (!this.v$.requestForm.$invalid) {
                this.message = "";
                this.loader = true;
                try {
                    const response = await AmbassadorsRequest.create(this.requestForm);
                    this.last_request = response;
                    this.loader = false;
                    helper.toggleToast(
                        "تم الانشاء",
                        "success"
                    );
                    this.message = 'تم رفع الطلب - رقم الطلب هو: ' + response.id;
                    this.v$.requestForm.$reset()

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
        back() {
            this.$router.push({ name: 'group.group-detail' })
        }
    },
    computed: {
        numberToRequest() {
            if (this.last_request && this.last_request.is_done == 0) {
                return 0;
            }
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