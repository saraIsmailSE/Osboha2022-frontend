<template>
  <table class="table inline-grid w-100">
    <thead>
      <tr class="d-flex justify-content-around">
        <th scope="col">المجموعة</th>
        <th scope="col">دوره</th>
        <th scope="col">حالته</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="d-flex justify-content-around"
        v-for="group in groups"
        :key="group.id"
      >
        <td scope="col" class="align-middle text-center w-25">
          <router-link
            class="text-center"
            :to="{
              name: 'group.group-detail',
              params: { group_id: group.group.id },
            }"
          >
            <span> {{ group.group.name }} </span></router-link
          >
        </td>

        <td scope="col" class="align-middle text-center w-25">
          <span> {{ ARABIC_ROLES[group.user_type] }} </span>
        </td>
        <td scope="col" class="align-middle text-center w-50">
          <span v-if="group.termination_reason" style="color: darkred">
            {{ TERMINATION_REASONS[group.termination_reason] }}
          </span>
          <span v-else class="rounded-pill badge bg-primary px-2"> فعال </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { TERMINATION_REASONS, ARABIC_ROLES } from "@/utilities/constants";
export default {
  name: "UserGroups",
  props: {
    groups: { type: Array },
  },
  data() {
    return {
        TERMINATION_REASONS,
        ARABIC_ROLES,
    };
  },
};
</script>
