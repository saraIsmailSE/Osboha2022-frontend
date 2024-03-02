<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px">
                <div class="inner-page-title">
                    <h3 class="text-white"> البحث عن المستخدمين بالاسم</h3>
                </div>
            </div>
        </div>
        <form @submit.prevent="getUser">
            <input type="text" class="form-control mb-0 w-75 mx-auto" id="exampleInputEmail1"
                placeholder="  ادخل اسم المستخدم " v-model="v$.form.name.$model">
            <p style="color:red" v-if="v$.form.name.$error">اسم المستخدم مطلوب</p>
            <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                بحث
            </button>
        </form>
        <div class="table-responsive" v-if="users">
            <table id="datatable" class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">الاسم</th>
                        <th scope="col">الايميل</th>
                        <th scope="col">المسؤول عنه</th>
                        <th scope="col">عدد المسؤولين عنهم</th>
                        <th scope="col">فريق المتابعة</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td scope="col">#</td>
                        <td scope="col">{{ user.name }}</td>
                        <td scope="col">{{ user.email }}</td>
                        <td scope="col" v-if="user.parent_id"> {{ user.parent.name }} </td>
                        <td scope="col" v-else> لا يوجد </td>
                        <td scope="col">{{ user.children_count }}</td>
                        <div v-if="user.groups.length > 0">
                            <td v-for="group in user.groups" :key="group.id">
                                <p> {{ group.name }}</p>
                            </td>
                        </div>
                        <td scope="col" v-else> لا يوجد </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="col-sm-12 text-center" v-if="loader">
            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 100px" />
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

import userService from "@/API/services/user.service";
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'


export default {
    name: "Search For User",
    setup() {
        return { v$: useVuelidate() }
    },
    components: {

    },
    data() {
        return {
            users: null,
            loader: false,
            form: {
                name: '',
            },
            message: 'ابحث عن مستخدم',
        };
    },
    validations() {
        return {
            form: {
                name: {
                    required,
                },
            },
        }
    },
    methods: {
        async getUser() {
            this.loader = true;
            this.users = null;
            this.message = ''
            this.v$.$touch()
            if (!this.v$.form.$invalid) {

                const response = await userService.searchByName(this.form.name);
                if (response) {
                    this.users = response.users;
                }
                else {
                    this.message = 'المستخدم غير موجود';
                }

            }
            this.loader = false;
        },
    },
};
</script>
<style scoped>
#top-tab-list {
    margin-bottom: 0;
}
</style>
