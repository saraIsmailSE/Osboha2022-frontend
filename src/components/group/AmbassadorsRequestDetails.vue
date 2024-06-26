<template>
    <iq-card v-if="request">
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
                                <td> {{ request.id }}</td>
                            </tr>
                            <tr>
                                <td>حالة الطلب</td>
                                <td v-if="request.is_done == 0">
                                    <span class="badge bg-danger">غير مكتمل</span>
                                    <span if="request.high_priority" class="badge bg-primary m-2">
                                        أولوية
                                        <small class="material-symbols-outlined align-middle">
                                            verified
                                        </small>
                                    </span>

                                </td>
                                <td v-else>
                                    <span class="badge bg-primary">مكتمل</span>
                                </td>
                            </tr>

                            <tr>
                                <td>جنس القائد</td>
                                <td> {{ GENDER[request.leader_gender] }}</td>
                            </tr>
                            <tr>
                                <td>جنس السفراء</td>
                                <td> {{ GENDER[request.ambassadors_gender] }}</td>
                            </tr>
                            <tr>
                                <td>العدد المطلوب</td>
                                <td> {{ request.members_num }}</td>
                            </tr>

                        </tbody>
                    </table>
                </tab-content-item>
                <tab-content-item :active="false" id="pills-profile-fill" aria-labelled-by="pills-profile-tab-fill">
                    <table id="datatable" class="table table-striped table-bordered"
                        v-if="request.ambassadors && request.ambassadors.length > 0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">الاسم</th>
                                <th scope="col">الجنس</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ambassador, index) in request.ambassadors" :key="ambassador.id">
                                <td scope="col">{{ index + 1 }}</td>
                                <td scope="col">{{ ambassador.name + " " + ambassador.last_name }}</td>
                                <td scope="col">{{ GENDER[ambassador.gender] }}</td>
                                <td>
                                    <router-link :to="{ name: 'user.profile', params: { user_id: ambassador.id } }">
                                        <span class="material-symbols-outlined">
                                            visibility
                                        </span>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 v-else>لا يوجد</h4>
                </tab-content-item>
            </tab-content>
            <div v-if="(request.ambassadors && request.ambassadors.length == 0) || !request.ambassadors">
                <router-link :to="{
                    name: 'ambassadors-request.update-request',
                    params: { request_id: request.id },
                }">
                    <span class="material-symbols-outlined ms-2 me-2" role="button">
                        edit
                    </span>
                </router-link> <span class="material-symbols-outlined ms-2 me-2" role="button" @click="deleteRequest()">
                    delete
                </span>
            </div>
        </template>
    </iq-card>
</template>
<script>
import { GENDER } from "@/utilities/constants";
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import helper from "@/utilities/helper";

export default {
    name: "Ambassador Request Details",
    created() {
        this.group_id = this.request.group_id
    },
    props: {
        request: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            GENDER,
            group_id: 0,
        };
    },
    methods: {
        async deleteRequest() {

            try {
                const response = await AmbassadorsRequest.delete(this.request.id);
                helper.toggleToast(
                    "تم الحذف",
                    "success"
                );
                this.$emit('request-deleted')
                this.$router.push({
                    name: 'group.requestAmbassadors',
                    params: { group_id: this.group_id },
                })
            }
            catch (error) {
                helper.toggleToast(
                    "حدث خطأ أثناء الحذف, حاول مرة أخرى",
                    "error"
                );
                console.log(error);
            }
        }
    },
};
</script>