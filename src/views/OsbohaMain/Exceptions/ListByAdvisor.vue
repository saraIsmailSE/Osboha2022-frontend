<template>
  <div>
    <div class="col-sm-12 mt-3">
      <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
          <h3 class="text-center mt-3 mb-3">
            {{ group_title }}
          </h3>
        </div>
        <div class="iq-card-body p-3">
          <div class="d-flex align-items-center mt-3">
            <div class="col-12">

              <list-exceptions :exception_type="exception_type" :exceptions="exceptions" />

            </div>
          </div>

        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>
import exceptionService from "@/API/services/user-exception.service";
import { EXCEPTION_STATUS, EXCEPTION_TYPES } from "@/utilities/constants";
import { watchEffect } from "vue";
import ListExceptions from "@/components/exceptions/ListExceptions";

export default {
  name: "List Exceptions",
  components:{ListExceptions},
  async created() {
    try {
      watchEffect(async () => {
        if (this.$route.params.exception_type) {
          this.exception_type = this.$route.params.exception_type;
          await this.getExceptions(this.exception_type);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      exceptions: null,
      group_title: "",
      week_title: "",
      exception_type: '',
      EXCEPTION_STATUS,
      EXCEPTION_TYPES,
      length: 10,
    };
  },
  methods: {
    loadMore() {
      this.length += 10;
    },
    async getExceptions(exception_type) {
      const response = await exceptionService.ListByAdvisor(exception_type, this.user.id);
      this.exceptions = response.exceptions;
      this.group_title = response.advisingGroup;

    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  }
};
</script>