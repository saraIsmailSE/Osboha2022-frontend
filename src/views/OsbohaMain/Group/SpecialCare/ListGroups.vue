<template>
  <div class="main-content w-100">

    <div class="position-relative mb-3">
      <breadcrumb :img="require('@/assets/images/main/book-banner.png')" :title="'test'" />
    </div>
    <GroupList :retrieveType="'special_care'" />
  </div>
</template>
<script>
import Breadcrumb from "@/components/custom/Breadcrumb/Breadcrumb";
import GroupList from "@/components/group/List"
export default {
  name: "Groups List",
  components: {
    GroupList,
    Breadcrumb
  },

};
</script>