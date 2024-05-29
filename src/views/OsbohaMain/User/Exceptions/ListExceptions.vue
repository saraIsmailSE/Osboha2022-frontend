<template>
    <div>
        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card">
                <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                    <h3 class="text-center mt-3 mb-3">{{week_title}}</h3>
                </div>
                <div class="iq-card-body p-3">
                    <div class="d-flex align-items-center mt-3">
                        <div class="col-12">
                            <div class="card card-block card-stretch card-height blog">
                                <div class="card-header">
                                    <h2>الاجازات</h2>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <select class="form-select" @change="filter($event)" data-trigger
                                            name="choices-single-default" id="choices-single-default">
                                            <option value="">فلترة حسب</option>
                                            <option value="oldest">
                                                الأقدم </option>
                                            <option value="latest">
                                                الأحدث
                                            </option>
                                            <option value="freez">
                                                تجميد فقط
                                            </option>
                                            <option value="exceptional_freez">
                                                تجميد استثنائي فقط
                                            </option>
                                            <option value="exams">
                                                امتحانات فقط
                                            </option>
                                            <option value="accepted">
                                                مقبول
                                            </option>
                                            <option value="pending">
                                                بانتظار الموافقة
                                            </option>
                                            <option value="rejected">
                                                مرفوض
                                            </option>
                                            <option value="finished">
                                                منتهي
                                            </option>

                                        </select>
                                    </div>

                                    <div class="blog-description">
                                        <table class="table w-100">
                                            <thead>
                                                <tr>
                                                    <th scope="col">نوع الاجازة</th>
                                                    <th scope="col">الحالة</th>
                                                    <th scope="col">الانتهاء</th>

                                                </tr>
                                            </thead>
                                            <tbody v-if="exceptions && exceptions.length>0">
                                                <tr v-for="exception in exceptions" :key="exception.id">
                                                    <td> {{ exception.type.type }}</td>
                                                    <td> {{ STATUS[exception.status] }}</td>
                                                    <td v-if="exception.end_at"> {{ exception.end_at }}</td>
                                                    <td v-else>------</td>
                                                    <router-link
                                                        :to="{ name: 'exceptions.listException', params: { exception_id: exception.id } }">
                                                        <td>
                                                            <i role="button"
                                                                class="material-symbols-outlined md-18 me-1 text-primary">
                                                                visibility
                                                            </i>
                                                        </td>
                                                    </router-link>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                            <tr colspan="4">
                                                <td>لا يوجد بيانات لعرضها</td>
                                            </tr>
                                            </tbody>

                                        </table>
                                        <hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center mt-3 row">
                        <div class="d-inline-block w-100 text-center col-12">
                            <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                عودة للملف الشخصي
                            </button>
                        </div>
                    </div>
                </div>
            </iq-card>
        </div>
    </div>
</template>
<script>
import UserExceptionService from '@/API/services/user-exception.service';

export default {
    name: "List Exceptions",
    async created() {

        try {
            const response = await UserExceptionService.getAllUserExceptions(this.user_id);
            this.exceptions = response.exceptions
            this.week_title=response.week.title
        }
        catch (error) {
            console.log(error);
        }
    },

    data() {
        return {
            exceptions: null,
            group_title:'',
            week_title:'',
            user_id: this.$route.params.user_id,
            STATUS:{
                "pending": "قيد المراجعة",
                "accepted": "مقبول",
                "rejected":"مرفوض",
                "cancelled":"ملغي",
                "finished":"منتهي"
            }
        };
    },
    methods: {
        back() {
            this.$router.push({ name: 'user.profile', params: { user_id: this.user_id } })
        },
        async filter($event) {
            this.exceptions = await UserExceptionService.exceptionsFilter($event.target.value, this.user_id)
        }

    },
};
</script>
