<template>
    <listOne :exception="exception" />
</template>
<script>
import listOne from '@/components/exceptions/listOne'
import exceptionService from '@/API/services/user-exception.service';

export default {
    name: "List Exceptions",
    async created() {

        try {
            const response = await exceptionService.getExceptionById(this.exception_id);
            this.exception = response
        }
        catch (error) {
            console.log(error);
        }
    },
    components: {
        listOne,
    },

    data() {
        return {
            exception: null,
            exception_id: this.$route.params.exception_id,

        };
    },
};
</script>
