<template>
  <GroupList :retrieveType="all" />
</template>
<script>
import GroupList from "@/components/group/List"
export default {
  name: "Groups List",
  components: {
    GroupList
  }

};
</script>