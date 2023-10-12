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

                <iq-card v-if="last_request">
                    <template v-slot:headerTitle>
                        <h4 class="card-title"> الطلب الأخير</h4>
                    </template>
                    <template v-slot:headerAction>
                        <collapse class="text-primary float-right" href="#example-collapse6" data-bs-toggle="collapse">
                            <i class="ri-code-s-slash-line" />
                        </collapse>
                    </template>
                    <template v-slot:body>
                        <tab-nav :pills="true" class="nav-fill mb-3" id="pills-tab-1">
                            <tab-nav-items :active="true" id="pills-home-tab-fill" href="#pills-home-fill"
                                ariaControls="pills-home-fill" role="tab" :ariaSelected="true" title="تفاصيل الطلب" />
                            <tab-nav-items :active="false" id="pills-profile-tab-fill" href="#pills-profile-fill"
                                ariaControls="pills-profile-fill" role="tab" :ariaSelected="false" title="السفراء" />
                        </tab-nav>
                        <tab-content id="pills-tabContent-1" class="mt-0">
                            <tab-content-item :active="true" id="pills-home-fill" aria-labelled-by="pills-home-tab-fill">
                                <table class="table w-100">
                                    <tbody>
                                        <tr>
                                            <td>رقم الطلب</td>
                                            <td> {{ last_request.id }}</td>
                                        </tr>
                                        <tr>
                                            <td>حالة الطلب</td>
                                            <td v-if="last_request.is_done == 0"> 
                                                <span class="badge bg-danger">غير مكتمل</span>
                                            </td>
                                            <td v-else> 
                                                <span class="badge bg-primary">مكتمل</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>جنس السفراء</td>
                                            <td> {{ last_request.gender }}</td>
                                        </tr>
                                        <tr>
                                            <td>العدد المطلوب</td>
                                            <td> {{ last_request.members_num }}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </tab-content-item>
                            <tab-content-item :active="false" id="pills-profile-fill"
                                aria-labelled-by="pills-profile-tab-fill">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a type specimen book. It has
                                    survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged.</p>
                            </tab-content-item>
                        </tab-content>
                    </template>
                </iq-card>

                <div class="d-flex align-items-center mt-3">
                    <form @submit.prevent="submitException" class="post-text ml-3 w-100 row">
                        <div class="form-group col-12">
                            <h4>جنس السفراء</h4>
                            <select :disabled="message" v-model="v$.requestForm.gender.$model" class="form-select mt-2"
                                data-trigger name="gender" id="eceptionType">
                                <option value='' selected>اختر جنس السفراء</option>
                                <option value='any'>لا فرق</option>
                                <option value='female'>إناث</option>
                                <option value='male'>ذكور</option>
                            </select>
                            <small style="color: red" v-if="v$.requestForm.gender.$error"> يرجى اختيار جنس
                                السفراء</small>
                        </div>
                        <div class="form-group">
                            <h4>العدد المطلوب</h4>
                            <div class="form-group row">
                                <select :disabled="message" v-model="v$.requestForm.members_num.$model"
                                    class="form-select mt-2" data-trigger name="members_num" id="eceptionType">
                                    <option value=0 selected>اختر عدد السفراء</option>
                                    <option v-for="index in 10" :key="index" :value=index>{{ index }}</option>
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
import useVuelidate from "@vuelidate/core";
import GroupService from '@/API/services/group.service';

import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
    name: "New Ambassador Request",
    async created() {
        this.last_request = await GroupService.lastLeaderRequest(this.$route.params.group_id);
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
                gender: '',
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
                gender: {
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
                    const response = await GroupService.createLeaderRequest(this.requestForm);
                    this.loader = false;
                    this.message = 'تم رفع الطلب - رقم الطلب هو: ' + response.id;
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