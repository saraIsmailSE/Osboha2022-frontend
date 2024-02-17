<template lang="">
  <div class="form-group">
    <label class="form-label" for="customFile"> اضافة اقتباس</label>
    <input
      class="form-control"
      type="file"
      id="customFile"
      multiple
      accept="image/jpeg, image/png, image/jpg, image/gif, image/svg"
      ref="screenshotsRef"
      @change="uploadImages"
    />
    <div class="help-block" v-if="v$.thesisForm.screenShots.$error">
      <small
        style="color: red"
        v-if="v$.thesisForm.screenShots.requiredIf.$invalid"
        >الرجاء ادخال اقتباس واحد على الاقل</small
      >
    </div>
    <div class="help-block" v-if="filesLimitError">
      <small style="color: red">{{ filesLimitError }}</small>
    </div>
    <ImagePreviewer
      v-if="thesisForm.screenShots.length"
      :media="thesisForm.screenShots"
      @remove-media="removeImage"
      ref="imagePreviewer"
    />
    <small class="text-center mt-2 text-danger">
      ⚠️ إن الاقتباسات المصورة لا يتم الاحتفاظ بها على المنصة. لأجل ذلك نحثك على
      كتابة الأطروحة أو التلخيص لتحفظ أفكارك التي انتفعت بها من الكتاب.</small
    >
  </div>
</template>
<script setup>
import ImagePreviewer from "@/components/media/ImagePreviewer.vue";
import { ref, computed, inject } from "vue";

const filesLimitError = ref("");
const screenshotsRef = ref(null);

const v$ = inject("v$");

const props = defineProps({
  thesisForm: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateThesisFormByKey"]);

const uploadImages = (event) => {
  const { files } = event.target;

  if (files.length > 5) {
    filesLimitError.value = "لا يمكن رفع اكثر من 5 اقتباسات";
    return;
  }
  filesLimitError.value = "";
  emit("updateThesisFormByKey", {
    key: "screenShots",
    value: files,
  });
};
const removeImage = (index) => {
  const files = [...props.thesisForm.screenShots];
  files.splice(index, 1);
  emit("updateThesisFormByKey", {
    key: "screenShots",
    value: files,
  });

  if (props.thesisForm.screenShots.length == 0) {
    screenshotsRef.value.value = "";
  }
};
</script>
<style lang=""></style>
