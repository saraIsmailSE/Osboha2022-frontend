<template>
    <div class="d-inline-flex justify-content-center w-100" v-if="exception.user.id == auth.id &&
        (exception.status == 'accepted' || exception.status == 'pending')
        ">
        <button @click="cancelException(exception.id)" class="btn btn-danger d-block w-75">
            الغاء
        </button>
    </div>
</template>
<script>
import exceptionService from "@/API/services/user-exception.service";
import helper from "@/utilities/helper";

export default {
    name: "Cancel Exception",
    props: {
        exception: { type: Object },
    },
    data() {
        return {
        };
    },
    computed: {
        auth() {
            return this.$store.getters.getUser;
        },
    },
    methods: {
        ...helper,
        cancelException(exception_id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-primary btn-lg",
                    cancelButton: "btn btn-outline-primary btn-lg ms-2",
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: "هل أنت متأكد؟",
                    text: "موافقتك تعني الغاء هذا الاعفاء وحساب علامتك لهذا الاسبوع ",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "نعم قم بالالغاء",
                    cancelButtonText: "تراجع  ",
                    showClass: {
                        popup: "animate__animated animate__zoomIn",
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut",
                    },
                })
                .then((willDelete) => {
                    if (willDelete.isConfirmed) {
                        this.loader = true;
                        exceptionService
                            .cancelException(exception_id)
                            .then(() => {
                                this.loader = false;
                                helper.toggleToast("تم الغاء الاعفاء", "success");
                                this.$emit("update_exception");
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                });
        },
    },
};
</script>