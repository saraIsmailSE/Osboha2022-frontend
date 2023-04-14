<template>
  <div class="container" style="background-color: #f1f9f5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-12 col-xl-4 mt-3 mb-3">
        <div class="card" style="border-radius: 15px">
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                class="rounded-circle img-fluid"
                style="width: 100px"
              />
            </div>
            <h4 class="mb-2 text-center">{{ mark.user.name }}</h4>
            <p class="text-center mb-4" style="direction: rtl">
              فريق المتابعة
              <span class="mx-2">|</span>
              <a href="#!">{{ group.name }}</a>
            </p>
            <div class="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p class="text-center mb-2 h5">
                  <strong>{{ mark_out_of_100 }}%</strong>
                </p>
                <p class="text-center mb-0">
                  العلامة
                  <br />
                  الكلية
                </p>
              </div>
              <div>
                <p class="text-center mb-2 h5">
                  <strong>{{ mark.total_thesis }}</strong>
                </p>
                <p class="text-center mb-0">
                  عدد
                  <br />
                  الأطروحات
                </p>
              </div>
              <div>
                <p class="text-center mb-2 h5">
                  <strong>{{ mark.total_pages }}</strong>
                </p>
                <p class="text-center mb-0">
                  عدد
                  <br />
                  الصفحات
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Achievement Card",
  created() {},

  props: {
    mark: {
      type: [Object],
      required: true,
    },
    group: {
      type: [Object],
      required: true,
    },
  },
  computed: {
    mark_out_of_100() {
      return (
        this.mark.reading_mark + this.mark.writing_mark + this.mark.support
      );
    },
  },
  data() {
    return {};
  },
};
</script>
