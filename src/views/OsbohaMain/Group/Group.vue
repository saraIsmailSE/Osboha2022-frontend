<template>
  <div class="d-grid gap-3 d-grid-template-1fr-19">
    <card v-for="group in groups" :group="group" :key="group.id" />
  </div>
</template>
<script>
import card from "@/components/group/card.vue";
import GroupService from "@/API/services/group.service";

export default {
  components: { card },
  name: "Group",
  async created() {
    try {
      const response = await GroupService.userGroups();
      this.groups = response.groups;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      groups: null,
    };
  },
};
</script>
