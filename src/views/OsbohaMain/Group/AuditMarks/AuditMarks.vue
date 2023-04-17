<template>
    <div class="row">
        <div class="col-12">
            <iq-card body-class="p-0">
                <template v-slot:body>
                    <div class="card position-relative inner-page-bg" style=" background-color: #cae0cd; height: 100px;">
                        <div class="inner-page-title">
                            <h3 class="text-dark" style="direction: rtl;">تدقيق العلامات || {{ group.name }}</h3>
                            <h4 class="text-dark" style="direction: rtl;">الأسبوع {{ week.title }}</h4>
                        </div>
                    </div>
                    <div v-if="audit">
                        <ul class="todo-task-lists m-2 p-0">
                            <div class="card position-relative" style=" background-color: #208040; height: 60px;">
                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="inner-page-title">
                                        <h3 class="text-light d-flex justify-content-between">
                                            انجاز كامل
                                            <span role="button" v-if="!show_full_audit"
                                                class="display-6 text-light material-symbols-outlined"
                                                @click="show_full_audit = !show_full_audit">
                                                expand_more
                                            </span>
                                            <span role="button" v-if="show_full_audit"
                                                class="display-6 text-light material-symbols-outlined"
                                                @click="show_full_audit = !show_full_audit">
                                                expand_less
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div v-show="show_full_audit">
                                <div v-if="fullAuditLoaded && fullAuditLoaded.length > 0">
                                    <template v-for="(audit, index) in fullAuditLoaded" :key="index">
                                        <AchievementProgress :audit="audit" />
                                    </template>
                                    <li class="d-block text-center mb-0 pb-0" v-if="fullAudit.length > fullAuditLength">
                                        <a class="me-3 btn" role="button" @click="loadMoreFullAudit()">عرض المزيد</a>
                                    </li>
                                </div>
                                <div v-else>
                                    <h4 class="text-center"> لا يوجد </h4>
                                </div>

                            </div>
                        </ul>

                        <ul class="todo-task-lists m-2 p-0">
                            <div class="card position-relative" style=" background-color: #831018; height: 60px;">
                                <div class="inner-page-title">
                                    <h3 class="text-light d-flex justify-content-between">
                                        انجازات متفرقة
                                        <span role="button" v-if="!show_variant_audit"
                                            class="display-6 text-light material-symbols-outlined"
                                            @click="show_variant_audit = !show_variant_audit">
                                            expand_more
                                        </span>
                                        <span role="button" v-if="show_variant_audit"
                                            class="display-6 text-light material-symbols-outlined"
                                            @click="show_variant_audit = !show_variant_audit">
                                            expand_less
                                        </span>

                                    </h3>
                                </div>
                            </div>
                            <div v-show="show_variant_audit">

                                <div v-if="variantAuditLoaded && variantAuditLoaded.length > 0">
                                    <template v-for="(audit, index) in variantAuditLoaded" :key="index">
                                        <AchievementProgress :audit="audit" />
                                    </template>
                                    <li class="d-block text-center mb-0 pb-0"
                                        v-if="variantAudit.length > variantAuditLength">
                                        <a class="me-3 btn" role="button" @click="loadMoreVariantAudit()">عرض المزيد</a>
                                    </li>
                                </div>
                                <div v-else>
                                    <h4 class="text-center"> لا يوجد </h4>
                                </div>

                            </div>
                        </ul>

                        <ul class="todo-task-lists m-2 p-0">
                            <div class="card position-relative" style=" background-color: #1D1A55; height: 60px;">
                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="inner-page-title">
                                        <h3 class="text-light d-flex justify-content-between">
                                            الاعفاءات
                                            <span role="button" v-if="!show_exceptions"
                                                class="display-6 text-light material-symbols-outlined"
                                                @click="show_exceptions = !show_exceptions">
                                                expand_more
                                            </span>
                                            <span role="button" v-if="show_exceptions"
                                                class="display-6 text-light material-symbols-outlined"
                                                @click="show_exceptions = !show_exceptions">
                                                expand_less
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div v-show="show_exceptions">
                                <div v-if="exceptions.length > 0">
                                    <template v-for="(exception, index) in exceptions" :key="index">
                                        <Exceptions :exception="exception" />
                                    </template>
                                </div>
                                <div v-else>
                                    <h4 class="text-center"> لا يوجد </h4>

                                </div>
                            </div>
                        </ul>

                        <iq-card class="iq-card">
                            <div class="iq-card-body p-0">
                                <div class="image-block text-center">
                                    <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-75 mt-3"
                                        alt="no-amb">
                                </div>
                            </div>
                        </iq-card>

                    </div>
                    <div v-else>
                        <iq-card class="iq-card">
                            <div class="iq-card-body p-0">
                                <div class="image-block text-center">
                                    <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-75 mt-3"
                                        alt="no-amb">
                                </div>
                                <h4 class="text-center mt-3 mb-3">لا يوجد تدقيق لهذا الاسبوع</h4>
                            </div>
                        </iq-card>

                    </div>
                </template>
            </iq-card>

        </div>
    </div>
</template>


<script>
import MarkService from '@/API/services/marks.service';
import profileImagesService from '@/API/services/profile.images.service';
import AchievementProgress from '@/components/group/audit/AchievementProgress.vue';
import Exceptions from '@/components/group/audit/Exceptions.vue';


export default {
    name: 'List All Group Ambassadors Achievement',
    async created() {
        try {
            const response = await MarkService.groupAuditMarks(this.group_id);
            this.audit = response.audit_mark
            this.week = response.week
            this.group = response.group
            this.fullAudit = response.fullAudit
            this.variantAudit = response.variantAudit
            this.exceptions = response.exceptions
        }
        catch (error) {
            console.log(error);
        }
    },
    components: {
        AchievementProgress,
        Exceptions
    },
    data() {
        return {
            week: [],
            group_id: this.$route.params.group_id,
            group: [],
            audit: null,
            fullAudit: [],
            fullAuditLength: 10,
            show_full_audit: false,
            variantAudit: [],
            variantAuditLength: 10,
            show_variant_audit: false,
            exceptions: null,
            show_exceptions: false,

        }
    },
    methods: {
        loadMoreFullAudit() {
            if (this.fullAuditLength > this.fullAudit.length) return;
            this.length = this.length + 10;
        },
        loadMoreVariantAudit() {
            if (this.variantAuditLength > this.variantAudit.length) return;
            this.length = this.length + 10;
        },
        /**
        * get profile picture or cover.
        *  @param  image size, image name, profile id
        * @return image url
        */
        resolve_porfile_img(size, imageName, profile_id) {
            return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
        },

    },
    computed: {
        fullAuditLoaded() {
            return this.fullAudit.slice(0, this.fullAuditLength);
        },
        variantAuditLoaded() {
            return this.variantAudit.slice(0, this.variantAuditLength);
        },
    },

}
</script>