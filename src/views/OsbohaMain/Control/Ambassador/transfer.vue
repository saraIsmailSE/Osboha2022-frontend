<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/transfer_ambassador.png" class="img-fluid rounded w-75"
                        alt="نقل سفير" />
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