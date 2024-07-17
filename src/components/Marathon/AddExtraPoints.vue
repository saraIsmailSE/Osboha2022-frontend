<template>
    <div class="col-12 bg-white pt-2">
        <h3>
            اعتماد نقاط اضافية
            <span class="material-symbols-outlined align-middle">
                add_circle
            </span>
        </h3>
        <div class="sign-in-from">
            <form class="mt-2" @submit.prevent="onSubmit()">
                <div class="form-group">
                    <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default">
                        <option value="0" selected>choos one</option>
                        <option value="1" selected>مشاركة في نشاط</option>
                        <option value="2">دورة القادة</option>
                        <option value="3">توثيق كتاب </option>
                    </select>
                </div>
                <!-- <div class="form-group">
                    <input type="text" class="form-control mb-0" id="groupName" placeholder=" عدد الأنشطة" />
                </div> -->

                <div>
                    <div class="form-group">
                        <select class="form-control" name="gender" id="gender">
                            <option value="" selected>اختر تقييم الكتاب</option>
                            <option value="male">جيد جدا فما فوق</option>
                            <option value="female">اقل من جيد جدا </option>
                        </select>
                    </div>
                    <div class="form-group">

                        <input type="text" class="form-control mb-0" id="groupName" placeholder=" عدد الكتب " />
                    </div>
                </div>

                <p class="text-center my-2" style="color: red" v-if="message">
                    {{ message }}
                </p>
                <div class="col-sm-12 text-center" v-if="loading">
                    <p class="text-center">جاري الاعتماد</p>
                    <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <div class="d-inline-block w-100" v-else>
                    <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                        اعتماد
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
    name: "Add Extra Points",
    setup() {
        return { v$: useVuelidate() };
    },

    async created() {
    },

    data() {
        return {
            message: "",
            group_id: null,
            loading: false,
        };
    },
    methods: {

    },
    validations() {
        return {
        };
    },
};
</script>