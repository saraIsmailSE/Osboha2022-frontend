<template>
  <div class="col-12 bg-white pt-2" v-if="weekDays?.length > 0">
    <div class="sign-in-from">
      <form class="mt-2" @submit.prevent="submit()">
        <div
          class="row"
          v-for="(day, index) in weekDays"
          :key="day.date"
          :id="day.date"
        >
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <label for="hours" class="d-block mb-1" style="font-weight: bold"
                >اليوم/التاريخ</label
              >
              <div class="input-group">
                <span
                  class="text-primary me-2"
                  style="font-weight: bold; min-width: 50px"
                  >{{ day.name }}</span
                >
                <input
                  type="string"
                  v-model="day.date"
                  :disabled="true"
                  class="form-control mb-0"
                  id="date"
                  placeholder="ادخل التاريخ"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <label
                class="d-block mb-1"
                for="minutes"
                style="font-weight: bold"
                >الدقائق</label
              >
              <input
                :value="day.minutes"
                type="number"
                class="form-control mb-0"
                id="minutes"
                placeholder="ادخل عدد الدقائق"
                :disabled="loader"
                @change="changeMinutes(index, $event.target.value)"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-end align-items-center">
            <button
              type="submit"
              class="btn btn-primary me-2"
              style="height: fit-content"
              :disabled="loader"
            >
              حفظ
            </button>
          </div>
        </div>

        <div class="form-group text-center" v-if="message">
          <small :class="`text-${variant}`">
            {{ message }}
          </small>
        </div>
        <hr />
      </form>
    </div>
  </div>
</template>
<script>
import WorkingHourService from "@/API/services/working-hour.service";

export default {
  name: "DaysForm",
  props: {
    weekDays: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loader: false,
      message: "",
      variant: "success",
    };
  },
  watch: {
    message() {
      setTimeout(
        () => {
          this.message = "";
        },
        this.variant === "success" ? 3000 : 5000,
      );
    },
  },
  methods: {
    changeMinutes(index, value) {
      this.$emit("changeMinutes", index, value);
    },
    async submit() {
      this.messages = "";
      this.loader = true;

      try {
        await WorkingHourService.addWorkingHours(this.weekDays);

        this.message = "تم إدخال الدقائق بنجاح";
        this.variant = "success";

        this.$emit("getWorkingHours");
      } catch (error) {
        this.message = "حدث خطأ أثناء إدخال الدقائق";
        this.variant = "danger";
      } finally {
        this.loader = false;
      }
    },
  },
};
</script>
