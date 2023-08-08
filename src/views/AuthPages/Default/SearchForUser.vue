<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px">
                <div class="inner-page-title">
                    <h3 class="text-white">البحث عن المستخدمين</h3>
                </div>
            </div>
        </div>
        <form @submit.prevent="getUser">
            <input type="email" class="form-control mb-0 w-75 mx-auto" id="exampleInputEmail1"
                placeholder="  ادخل بريد المستخدم " v-model="v$.form.email.$model">
            <p style="color:red" v-if="v$.form.email.$error">بريد المستخدم مطلوب</p>
            <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                بحث
            </button>
        </form>
        <div class="col-sm-12" v-if="user">
            <InfoCard :user="user" :followup_team="followup_team" :roles="roles" />
        </div>
        <div class="col-sm-12" v-if="message">
            <iq-card class="iq-card">
                <h3 class="text-center mt-2">{{ message }}</h3>
                <div class="iq-card-body p-0">
                    <div class="image-block text-center mt-3">
                        <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-75" alt="blog-img">
                    </div>
                </div>
            </iq-card>
        </div>
    </div>
</template>
<script>
import InfoCard from "@/components/user/infoCard";
import userService from "@/API/services/user.service";
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'


export default {
    name: "Search For User",
    setup() {
        return { v$: useVuelidate() }
    },
    components: {
        InfoCard,
    },
    data() {
        return {
            user: null,
            groups: null,
            roles: null,
            followup_team: null,
            form: {
                email: '',
            },
            message: 'ابحث عن مستخدم',
        };
    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email
                },
            },
        }
    },
    methods: {
        async getUser() {
            this.user = null;
            this.groups = null;
            this.roles = null;
            this.followup_team = null;
            this.message = ''
            this.v$.$touch()
            if (!this.v$.form.$invalid) {

                const response = await userService.searchByEmail(this.form.email);
                console.log(response)
                if (response) {
                    this.user = response.user;
                    this.groups = response.groups;
                    this.roles = response.roles
                    this.followup_team = response.followup_team
                }
                else {
                    this.message = 'المستخدم غير موجود';
                }
            }
        },
        // checkActiveQuestions(item, active) {
        //     let className = ''
        //     if (this.currentQuestion > item) {
        //         className = 'active'
        //     }
        //     if (this.currentQuestion > active) {
        //         className = className + ' done'
        //     }
        //     return className
        // },
    },
};
</script>
<style scoped>
#top-tab-list {
    margin-bottom: 0;
}
</style>
  