<template>
  <div class="d-grid gap-3 d-grid-template-1fr-19">
    <div class="mt-3 inputs mb-3">
      <i class="material-symbols-outlined">
        search
      </i>
      <input type="text" class="form-control" placeholder=" ... ابحث عن مجموعة" v-model.trim="searchModel"
        v-on:keyup="loadGroups()" />
    </div>

    <card v-for="group in groups" :group="group" :key="group.id" />
    <div v-if="emptyMessage">
      <h4>
        {{ emptyMessage }}
        <span class="material-symbols-outlined align-middle">
          info
        </span>
      </h4>
    </div>

  </div>
</template>
<script>
import card from "@/components/group/card.vue";
import GroupService from "@/API/services/group.service";
import helper from "@/utilities/helper";
import axios from "axios";

export default {
  components: { card },
  name: "Group",
  async mounted() {
    this.loadGroups();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.cancelToken.cancel();
  },
  data() {
    return {
      groups: [],
      searchModel: "",
      page: 1,
      totalPages: 1,
      loading: false,
      pendingRequest: false,
      hasMore: true,
      emptyMessage: "",
      cancelToken: axios.CancelToken.source(),
    };
  },
  methods: {
    async loadGroups() {
      if (this.pendingRequest) {
        return;
      }

      if (this.searchModel == '' && this.groups.length == 0) {
        this.page = 1;
      }
      if (this.searchModel != '') {
        this.page = 1;
        this.groups = []
      }

      this.pendingRequest = true;
      this.loading = true;
      this.emptyMessage=""
      try {
        let response;
        response = await GroupService.userGroups(this.searchModel,
          this.page,
          this.cancelToken
        );
        if (response.statusCode !== 200) {
          helper.toggleToast(
            "حدث خطأ أثناء تحميل المجموعات, حاول مرة أخرى",
            "error"
          );
          return;
        }

        if (response.statusCode === 200 && !response.data) {
          this.emptyMessage = "لا يوجد مجموعات";
          this.hasMore = false;
          return;
        }

        this.groups = [...this.groups, ...response.data.groups.data];
        this.totalPages = response.data?.last_page ?? 1;
        this.page++;
      } catch (error) {
        console.log(error)
        helper.toggleToast(
          "حدث خطأ أثناء تحميل المجموعات, حاول مرة أخرى",
          "error"
        );
      } finally {
        this.loading = false;
        this.pendingRequest = false;

      }
    },
    /**
     * Check if the user has scrolled to the bottom of the page
     * @returns {boolean}
     */
    isAtBottomOfPage() {
      const containerRect = this.$refs.listContainer.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;
      return containerBottom >= windowHeight;
    },
    /*
     * Load more groups when the user scrolls to the bottom of the page
     */
    handleScroll() {
      if (this.hasMoreToLoad && this.isAtBottomOfPage()) {
        this.loadGroups();
      }
    },
  },
  computed: {
    hasMoreToLoad() {
      return this.page <= this.totalPages && this.hasMore;
    },
  }

};
</script>
<style lang="scss" scoped>
.inputs {
  position: relative;
}

.form-control {
  text-indent: 15px;
  border: none;
  height: 45px;
  border-radius: 0px;
  border-bottom: 1px solid #eee;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #eee;
  outline: 0;
  box-shadow: none;
  border-bottom: 1px solid blue;
}

.form-control:focus {
  color: blue;
}

.inputs i {
  position: absolute;
  top: 14px;
  left: 4px;
  color: #b8b9bc;
}
</style>
