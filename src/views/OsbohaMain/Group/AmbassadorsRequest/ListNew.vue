<template>
    <div class="row p-1">
        <iq-card>
            <div class="d-flex justify-content-between flex-wrap">
                <h4 class="card-title mt-3">قائمة السفراء الجدد</h4>
                <div class="dropdown w-100 mb-3 p-2">
                    <select class="form-select" @change="getMembers()" v-model="monthFilter">
                        <option class="dropdown-item" value="current" selected>
                            هذا الشهر
                        </option>
                        <option class="dropdown-item" value="previous">
                            الشهر السابق
                        </option>
                    </select>
                </div>
            </div>

            <list-members :members="members" v-if="members && members.length > 0" />
            <div class="col-sm-12" v-else>
                <iq-card class="iq-card">
                    <div class="iq-card-body p-0">
                        <div class="image-block text-center">
                            <img src="@/assets/images/main/no-friends.png" class="img-fluid rounded w-50"
                                alt="blog-img" />
                        </div>
                        <h4 class="text-center mt-3 mb-3">لا يوجد أعضاء</h4>
                    </div>
                </iq-card>
            </div>
            <div class="text-center m-3" v-if="members && members.length > 0">
                <Pagination :page="current" :total="totalMembers" :perPage="membersPerPage"
                    :routeName="`group.new-ambassadors`" />

            </div>
        </iq-card>
    </div>
</template>
<script>
import UserGroup from "@/API/services/user-group.service";
import GroupService from "@/API/services/group.service";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";
import ListMembers from '@/components/group/ListMembers';
import Pagination from '@/components/common/Pagination';

export default {
    name: "Group New Members",
    components: {
        ListMembers,
        Pagination,
    },
    created() {
        this.getMembers()
    },
    props: ["page"],
    data() {
        return {
            controlList: [],
            members: [],
            ambassador_name: "",
            currentIndex: -1,
            group: null,
            monthFilter: 'current',
            totalMembers: 0,
            current: 1,
            membersPerPage: 9,

        };
    },
    methods: {
        ...helper,
        async getMembers() {
            this.members = [];
            const response = await UserGroup.membersByMonth(
                this.$route.params.group_id,
                this.monthFilter,
                this.page
            );
            if (response.data != null) {
                this.members = [...this.members, ...response.data.members.data];
                this.totalMembers = response.total;
                this.current = this.page;
            }

            else {
                this.emptyMessage = "لا يوجد سفراء";
                this.hasMore = false;
                return;

            }
        },
        /**
         * search for ambassador
         * @param  ambassador_name, group_id
         * @return ambassador
         */
        async searchForAmbassador() {
            const response = await GroupService.searchForAmbassador(
                this.ambassador_name,
                this.$route.params.group_id
            );
            this.users = response.users;
        },
    },
};
</script>