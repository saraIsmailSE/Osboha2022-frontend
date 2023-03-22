<template>
    <div>
        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card">
                <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                    <h3 class="text-center mt-3 mb-3">اسم المجموعة  - الأسبوع الرابع من يناير</h3>
                </div>
                <div class="iq-card-body p-3">
                    <div class="d-flex align-items-center mt-3">
                        <listAll :exceptions="exceptions" />
                    </div>
                    <div class="d-flex align-items-center mt-3 row">
                        <div class="d-inline-block w-100 text-center col-12">
                            <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                عودة للفريق
                            </button>
                        </div>
                    </div>
                </div>
            </iq-card>
        </div>
    </div>
</template>
<script>
import listAll from '@/components/exceptions/listAll'
import GroupService from '@/API/services/group.service';

export default {
    name: "List Exceptions",
    async created() {

try {
    const response = await GroupService.getAllGroupExceptions(this.group_id);
    this.exceptions = response
}
catch (error) {
    console.log(error);
}
},
components: {
        listAll,
    },

    data() {
        return {
            exceptions:null,
            group_id:this.$route.params.group_id,

        };
    },
    methods:{
        back() {
            this.$router.push({ name: 'group.group-detail', params: { group_id: this.group_id } })
        }

    },
};
</script>
