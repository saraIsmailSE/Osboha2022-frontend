<template>
  <div class="group-member d-flex align-items-center mt-md-0 mt-3 w-100">
    <membersList :members="members" />
    <membersControl
      :authInGroup="authInGroup"
      :group="group"
      :hasSupportLeader="hasSupportLeader"
      :supportLeader="supportLeader"
    />
  </div>
</template>
<script>
import membersList from "./membersList";
import membersControl from "./membersControl";

export default {
  name: "members Header",
  components: {
    membersList,
    membersControl,
  },
  props: {
    members: {
      type: [Object],
      required: true,
    },
    authInGroup: {
      type: [Object],
      required: true,
    },
    group: {
      type: [Object],
      required: true,
    },
    hasSupportLeader: {
      type: [Boolean],
      default: false,
    },
  },
  computed: {
    supportLeader() {
      return this.hasSupportLeader
        ? this.members?.find(
            (member) => member.pivot.user_type == "support_leader",
          )
        : null;
    },
  },
};
</script>
