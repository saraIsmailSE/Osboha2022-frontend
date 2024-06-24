<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar text-center align-items-center mx-auto">
                <h1 class="text-center mt-3">نقل سفير</h1>
                <h4 class="text-center mt-1 mb-3">إلى فريق متابعة جديدة</h4>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/transfer-ambassador.png" class="img-fluid rounded w-75"
                        alt="blog-img" />
                </div>
            </div>

            <div class="col-12 bg-white pt-2">

                <transfer-ambassadors :selectedAmbassadors="ambassadors" @ambassadors_transferred="resetAmbassadors" />

            </div>
        </iq-card>
    </div>
</template>

<script>
import TransferAmbassadors from '@/components/control/TransferAmbassadors';

export default {
    name: "Transfer Ambassador",
    components: { TransferAmbassadors },
    data() {
        return {
            loader: false,
            ambassadors:
                [{
                    ambassador_email: ''
                }],
            message: "",

        };
    },

    methods: {
        resetAmbassadors() {
            this.ambassadors = [{ ambassador_email: '' }]
        }
    },
};
</script>