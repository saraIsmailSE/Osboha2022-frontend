<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title" v-if="Participants && Participants.length > 0">المشاركون في المارثون - {{ Participants.length }}</h4>
                        <h4 class="card-title" v-else>المشاركون في المارثون - 0</h4>
                    </template>

                    <template v-slot:body>
                        <router-link class="mb-3 btn btn-primary float-end" :to="{
                            name: 'group.addGroup',
                        }">
                            اضافة مشارك
                        </router-link>


                        <div class="table-responsive" v-if="Participants && Participants.length > 0">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>السفير</th>
                                        <th>فريق المارثون</th>
                                        <th>فريق المتابعة</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(group, index) in Participants" :key="index">
                                        <td>
                                            <router-link class="text-center" :to="{
                                                name: 'group.group-detail',
                                                params: { group_id: group.id },
                                            }">
                                                {{ group.name }}
                                            </router-link>
                                        </td>
                                        <td>
                                            {{ GROUP_TYPE[group.type.type] }}
                                        </td>
                                        <td>
                                            {{ group.users_count }}
                                        </td>

                                        <td v-if="group.group_administrators">
                                            <span role="button"
                                                @click="groupAdministrators(group.group_administrators, group.name)"
                                                class="text-danger material-symbols-outlined ms-1 me-1">
                                                shield_person
                                            </span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
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
import userService from "@/API/services/user.service";
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
            Participants: [],
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

            if (this.searchModel == '' && this.Participants.length == 0) {
                this.page = 1;
            }
            if (this.searchModel != '') {
                this.page = 1;
                this.Participants = []
            }

            this.pendingRequest = true;
            this.loading = true;
            this.emptyMessage = ""
            try {
                let response;
                response = await userService.getMarathonParticipants(this.page);
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

                this.Participants = [...this.Participants, ...response.data.Participants.data];
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
         * Load more Participants when the user scrolls to the bottom of the page
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
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },
        hasMoreToLoad() {
            return this.page <= this.totalPages && this.hasMore;
        },
    }
};


</script>

<style lang="scss" scoped>
.inputs {
    position: relative;
}

.form-control {
    text-indent: 15px;
    border: none;
    height: 45px;
    border-radius: 0px;
    border-bottom: 1px solid #eee;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #eee;
    outline: 0;
    box-shadow: none;
    border-bottom: 1px solid blue;
}

.form-control:focus {
    color: blue;
}

.inputs i {
    position: absolute;
    top: 14px;
    left: 4px;
    color: #b8b9bc;
}
</style>
  