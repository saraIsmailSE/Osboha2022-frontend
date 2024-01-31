<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title">مارثون أصبوحة - {{ participants.length ? participants.length : 0 }} أفرقة
                        </h4>
                    </template>

                    <template v-slot:body>
                        <router-link class="mb-3 btn btn-primary float-end" :to="{
                            name: 'roles.upgradeMarathonRole',
                        }" v-if="isMarathonCoordinator || isAdmin">
                            اضافة مشارك
                        </router-link>


                        <div class="card-body" v-if="participants">
                            <div class="blog-description" v-for="(group, index) in participants" :key="index">
                                <h3 class="book-title mb-2">
                                    <router-link class="text-center" :to="{
                                        name: 'group.group-detail',
                                        params: { group_id: group.id },
                                    }">
                                        {{ group.name }}
                                        <i class="icon material-symbols-outlined align-middle"> sprint </i>
                                    </router-link>
                                </h3>
                                <div class=" me-3 col-6 d-flex align-items-center" v-if="group.users.length > 0">
                                    <router-link class="me-3" v-for="user in group.users" :key="user.id"
                                        :to="{ name: 'user.profile', params: { user_id: user.id } }">
                                        <BaseAvatar :profileImg="user.user_profile.profile_picture"
                                            :profile_id="user.user_profile.id" :title="user.name" :gender="user.gender"
                                            :dimensions="'100x100'" avatarClass="rounded-circle " />
                                        <br />
                                        <div>
                                            <p>{{ user.name }}</p>
                                        </div>

                                    </router-link>
                                </div>
                                <div class="iq-media-group me-3 col-6" v-else>
                                    <p>لا يوجد أعضاء</p>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div v-else>
                            <h4>
                                {{ emptyMessage }}
                                <span class="material-symbols-outlined align-middle">
                                    info
                                </span>
                            </h4>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loading">
                            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader"
                                style="height: 100px" />
                        </div>

                    </template>
                </iq-card>

            </div>
        </div>
    </div>
</template>
<script>
import groupService from "@/API/services/group.service";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";
import axios from "axios";
import { ARABIC_ROLES, GROUP_TYPE } from "@/utilities/constants";

export default {
    name: "List",
    created() {
        this.debouncedSearch = this.debounce(this.loadParticipants, 300);
    },
    props: {
        retrieveType: {
            type: [String],
            required: true,
        },
    },

    async mounted() {
        this.loadParticipants();
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        this.cancelToken.cancel();
    },

    data() {
        return {
            participants: [],
            GROUP_TYPE,
            searchModel: "",
            page: 1,
            totalPages: 1,
            loading: false,
            pendingRequest: false,
            hasMore: true,
            emptyMessage: "",
            ARABIC_ROLES,
            cancelToken: axios.CancelToken.source(),

        };
    },

    methods: {
        async loadParticipants() {
            if (this.pendingRequest) {
                return;
            }

            if (this.searchModel == '' && this.participants.length == 0) {
                this.page = 1;
            }
            if (this.searchModel != '') {
                this.page = 1;
                this.participants = []
            }

            this.pendingRequest = true;
            this.loading = true;
            this.emptyMessage = ""
            try {
                let response;
                response = await groupService.getMarathonParticipants(this.page);
                if (response.statusCode !== 200) {
                    helper.toggleToast(
                        "حدث خطأ أثناء تحميل المشاركين, حاول مرة أخرى",
                        "error"
                    );
                    return;
                }

                if (response.statusCode === 200 && !response.data) {
                    this.emptyMessage = "لا يوجد مشاركين";
                    this.hasMore = false;
                    return;
                }
                console.log("🚀 ~ loadParticipants ~ this.participants:", response)

                this.participants = [...this.participants, ...response.data.participants.data];
                this.totalPages = response.data?.last_page ?? 1;
                this.page++;
            } catch (error) {
                console.log(error)
                helper.toggleToast(
                    "حدث خطأ أثناء تحميل المشاركين, حاول مرة أخرى",
                    "error"
                );
            } finally {
                this.loading = false;
                this.pendingRequest = false;

            }
        },
        /**
         * Check if the user has scrolled to the bottom of the page
         * @returns {boolean}
         */
        isAtBottomOfPage() {
            const containerRect = this.$refs.listContainer.getBoundingClientRect();
            const containerBottom = containerRect.bottom;
            const windowHeight = window.innerHeight;
            return containerBottom >= windowHeight;
        },
        /*
         * Load more participants when the user scrolls to the bottom of the page
         */
        handleScroll() {
            if (this.hasMoreToLoad && this.isAtBottomOfPage()) {
                this.loadParticipants();
            }
        },
        debounce(func, wait) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(this, args);
                }, wait);
            };
        }

    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        hasMoreToLoad() {
            return this.page <= this.totalPages && this.hasMore;
        },
        isMarathonCoordinator() {
            return UserInfoService.hasRole(this.user, "marathon_coordinator");
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },

    }
};


</script>
