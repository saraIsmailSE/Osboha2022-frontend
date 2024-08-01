<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px">
                <div class="inner-page-title">
                    <h3 class="text-white"> البحث عن المسؤول عنهم</h3>
                </div>
            </div>
        </div>
        <form @submit.prevent="getUser">
            <input type="text" class="form-control mb-0 w-75 mx-auto" id="emailInput"
                placeholder="  ادخل البريد الالكتروني " v-model="email">
            <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                بحث
            </button>
        </form>
        <div class="table-responsive" v-if="user">

            <div class="mt-3 mb- text-center">
                <BaseAvatar :profileImg="user.user_profile.profile_picture" :profile_id="user.user_profile.id"
                    :title="user.gender" :gender="user.gender" avatarClass="avatar-130 img-fluid rounded-circle"
                    containerClass="profile-img" :imageStyle="{ border: '4px solid #1d1a55' }" dimensions="150x150" />
            </div>
            <router-link :to="{
                name: 'user.profile',
                params: { user_id: user.id },
            }">
                <h2 class="mb-2 text-center">{{ user.name + " " + user.last_name }}</h2>
            </router-link>

            <hr class="mb-1"/>
            <table id="datatable" class="table table-striped table-bordered" v-if="in_charge_of.length > 0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">الاسم</th>
                        <th scope="col">الايميل</th>
                        <th scope="col">من</th>
                        <th scope="col">إلى</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="childInfo in in_charge_of" :key="childInfo.id">
                        <td>
                            <p v-if="childInfo.is_active"> 🟢</p>
                            <p v-else> 🔴</p>
                        </td>
                        <td scope="col">
                            <router-link :to="{ name: 'user.profile', params: { user_id: childInfo.user_id } }">
                                <p>
                                    {{ childInfo.child.name + " " + childInfo.child.last_name }}
                                </p>
                            </router-link>
                        </td>
                        <td scope="col">{{ childInfo.child.email }}</td>
                        <td scope="col">
                            <p>{{ getFormatedDate(childInfo.created_at) }}</p>
                        </td>
                        <td>
                            <p v-if="childInfo.is_active"> الوقت الحالي</p>
                            <p v-else> {{ getFormatedDate(childInfo.updated_at) }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-sm-12" v-else>
                <h3 class="text-center mt-2">لا يوجد مسؤول عنهم</h3>
            </div>
            <Pagination :page="currentPage" :total="totalPages" :perPage="usersPerPage"
                :routeName="`user.in-charge-of-search`" v-if="in_charge_of.length > 0" />


        </div>
        <div class="col-sm-12 text-center" v-if="loader">
            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 100px" />
        </div>
        <div class="col-sm-12" v-if="message">
            <iq-card class="iq-card">
                <h3 class="text-center mt-2">{{ message }}</h3>
                <div class="iq-card-body p-0">
                    <div class="image-block text-center mt-3">
                        <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-75 mb-2" alt="blog-img">
                    </div>
                </div>
            </iq-card>
        </div>
    </div>
</template>
<script>

import userService from "@/API/services/user.service";
import Pagination from '@/components/common/Pagination';
import helper from "@/utilities/helper";
import { watchEffect, watch } from "vue";
import { getFormatedDate } from "@/utilities/commonFunctions";

export default {
    name: "In Charge Of Search",
    props: ["page"],
    components: {
        Pagination,
    },
    created() {
        this.currentPage = this.page;
        watchEffect(() => {
            this.currentPage = this.page;
        });
        watch(
            () => this.page,
            (newPage) => {
                this.in_charge_of = [];
                this.currentPage = newPage;
                this.getUser();
            },
            { deep: true },
            { immediate: true }
        );
    },
    data() {
        return {
            in_charge_of: [],
            user: null,
            loader: false,
            email: '',
            message: 'ابحث عن مستخدم',
            usersPerPage: 25,
            totalPages: 1,
            currentPage: this.page,
            hasMore: true,

        };
    },
    methods: {
        getFormatedDate,
        async getUser() {
            this.loader = true;
            this.user =null;
            this.in_charge_of = [];
            this.message = ''

            try {
                const response = await userService.inChargeOfSearch(this.email, this.currentPage);
                if (response) {
                    if (response.statusCode === 200 && (!response.data || !response.data.in_charge_of)) {
                        this.message = "لا يوجد بيانات";
                        this.hasMore = false;
                        return;
                    }

                    this.user = response.data.user;
                    this.in_charge_of = response.data.in_charge_of.data;
                    this.totalPages = response.data?.total ?? 1;
                }
                else {
                    this.message = 'المستخدم غير موجود';
                }


            }
            catch (error) {
                console.log(error);
                helper.toggleToast(
                    "حدث خطأ أثناء تحميل البيانات, حاول مرة أخرى",
                    "error"
                );
            } finally {
                this.loader = false;
            }
        },
    },
};
</script>
<style scoped>
#top-tab-list {
    margin-bottom: 0;
}
</style>