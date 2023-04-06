<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    تدقيق أطروحة
                </h3>
            </div>
            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/update-forms.png" class="img-fluid rounded w-50" alt="blog-img">
                </div>

                <div class="d-flex align-items-center mt-3" v-if="thesis">
                    <form @submit.prevent="submitException" class="post-text ml-3 w-100 row">
                        <div class="form-group row">
                            <div class="col-4 form-group">
                                <label class="form-label">صفحة البداية</label>
                                <label class="form-control-plaintext">{{ thesis.start_page }}</label>
                            </div>
                            <div class="col-4 form-group">
                                <label class="form-label">صفحة النهاية</label>
                                <label class="form-control-plaintext">{{ thesis.end_page }}</label>
                            </div>
                            <div class="col-4 form-group">
                                <label class="form-label">العدد الكلي </label>
                                <label class="form-control-plaintext">{{ thesis.end_page - thesis.start_page }}</label>
                            </div>

                            <div class="form-group row">
                                <div class="col-12 form-group">
                                    <label class="form-control-plaintext">نوع الأطروحة ||  شاملة - 30 صفحة </label>
                                </div>
                            </div>

                            <div class="col-md-12 form-group">
                                <div class="col-md-12 form-group">
                                    <p class="form-control-plaintext">{{ thesis.comment.body }}</p>
                                </div>
                            </div>
                        </div>
                        <hr>

                        <div class="form-group col-12">
                            <button type="button" class="btn btn-primary w-75">اعتماد</button>
                            <select class="form-select btn btn-danger w-75 mt-2">
                                <option class="bg-white text-dark" value="" selected>تعديل</option>
                                <option class="bg-white text-dark">خصم العلامة كاملة</option>
                                <option class="bg-white text-dark">حساب علامة أطروحة واحدة</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="d-flex align-items-center mt-3 row">
                    <div class="d-inline-block w-100 text-center col-12">
                        <a role="button" @click="$router.go(-1)" class=" d-block mt-3 mb-3 w-75 mx-auto">
                            <span>عودة</span>
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
import thesisTypeService from '@/API/services/thesis.service';

export default {
    name: "List One Thesis",
    async created() {
        this.thesis = await thesisTypeService.getThesisById(this.$route.params.thesis_id);
    },
    data() {
        return {
            thesis: null,
            loader: false,
            message: null,
        };
    },
    methods: {
        async submitException() {
        },
    },
};
</script>
