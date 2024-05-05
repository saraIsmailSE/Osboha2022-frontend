<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card" v-if="request">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    طلب رقم - {{ request.id }}
                </h3>
            </div>
            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/request_amb.png" class="img-fluid rounded w-50" alt="blog-img">
                </div>

                <!-- REQUEST DETAILS -->
                <ambassadors-request-details v-if="request" :request="request" />
                <div class="d-flex align-items-center mt-3 row">
                    <div class="d-inline-block w-100 text-center col-12">
                        <a role="button" @click="back()" class=" d-block mt-3 mb-3 w-75 mx-auto">
                            <span>عودة للطلبات</span>
                            <span class="align-middle material-symbols-outlined">
                                keyboard_return
                            </span>
                        </a>

                    </div>
                </div>
            </div>
        </iq-card>
        <div class="col-sm-12 text-center" v-else>
            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 100px" />
        </div>

    </div>
</template>
<script>
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import AmbassadorsRequestDetails from '@/components/group/AmbassadorsRequestDetails';
export default {
    name: "Request Details",
    async created() {
        this.request = await AmbassadorsRequest.show(this.$route.params.request_id);
    },

    components: {
        AmbassadorsRequestDetails,
    },
    data() {
        return {
            group: null,
            request: null,
            message: null,

        };
    },
    methods: {

        back() {
            this.$router.push({ name: 'ambassadors-request.list-requests' })
        }
    },
};
</script>