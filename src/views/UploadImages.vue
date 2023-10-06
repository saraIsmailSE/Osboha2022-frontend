<template>
    <div class="mt-3 p-5">
        <form class="d-flex align-items-end mt-3" @submit.prevent="uploadImageToServer">
            <div class=" d-flex mb-1">
                <input type="file" ref="imageInput" @change="uploadImage" accept="image/*" />
                <button type="submit">UPLOAD</button>
            </div>

        </form>

    </div>
</template>
<script>
import mediaService from "@/API/services/media.services";
import helper from "@/utilities/helper";

export default {
    name: "Upload Images",
    data() {
        return {
            fileSrc: "",

            formData: {
                image: null,
            },

        };
    },
    methods: {
        uploadImage(e) {
            console.log("🚀 ~ file: UploadImages.vue:31 ~ uploadImage ~ e:", e.target.files)
            
            const file = e.target.files[0];
            this.formData.image = file;
        },
        removeMedia() {
            this.fileSrc = "";
            this.$refs.imageInput.value = null;
        },
        async uploadImageToServer() {
            try {
                console.log(this.formData)
                const response = await mediaService.upload(this.formData);

                if (response.statusCode !== 200) {
                    helper.handleErrorSwal("حدث خطأ ما, حاول مرة أخرى");
                    return;
                }
                this.image = null;
                this.$refs.imageInput.value = "";
                this.fileSrc = "";


                helper.toggleToast("تم التحميل ", "success");
            } catch (error) {
                console.log("[upload image error]", error);
                helper.handleErrorSwal("حدث خطأ ما, حاول مرة أخرى");
            }
        },

    },
};
</script>
