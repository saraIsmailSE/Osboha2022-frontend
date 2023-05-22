<template>
  <div class="container-fluid p-0">
    <div class="row no-gutters">
      <div class="col-sm-12 text-center">
        <div class="iq-error position-relative mt-5">
          <img
            src="@/assets/images/main/500.png"
            class="img-fluid iq-error-img"
            alt="500"
          />
          <div>
            <h2 class="mb-0 text-center">خطأ في الخادم</h2>
            <p class="text-center">
              لقد حدث خطأ في الخادم، يرجى المحاولة مرة أخرى
            </p>

            <router-link
              class="btn btn-primary w-75"
              :to="{
                name: 'osboha.list',
              }"
              >عودة للصفحة الرئيسية</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "500",
};
</script>

<style lang="scss" scoped></style>
