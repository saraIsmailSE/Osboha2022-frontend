<template>
  <table :class="`table w-100 table-bordered ${appendClass}`">
    <thead>
      <tr class="py-3">
        <th scope="col">الاسم</th>
        <th scope="col">التحويلات</th>
        <th scope="col">التحويلات الفعالة</th>
        <th scope="col">التحويلات المجابة بعد 12س</th>
        <th scope="col">التحويلات المجابة</th>
        <th scope="col">التحويلات المرفوعة</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="statistic in statistics" :key="statistic.id">
        <td>{{ statistic.user.name }}</td>
        <td>{{ statistic.total_questions }}</td>
        <td>
          {{ statistic.total_active_questions }}
        </td>
        <td>
          {{ statistic.total_late_questions }}
        </td>
        <td>
          {{ statistic.total_solved_questions }}
        </td>
        <td>
          {{ statistic.total_questions_assigned_to_parent }}
        </td>
      </tr>
      <tr v-if="showTotals">
        <td>
          <strong>المجموع</strong>
        </td>
        <td>
          <strong>
            {{ totals.total_questions }}
          </strong>
        </td>
        <td>
          <strong>
            {{ totals.total_active_questions }}
          </strong>
        </td>
        <td>
          <strong>
            {{ totals.total_late_questions }}
          </strong>
        </td>
        <td>
          <strong>
            {{ totals.total_solved_questions }}
          </strong>
        </td>
        <td>
          <strong>
            {{ totals.total_questions_assigned_to_parent }}
          </strong>
        </td>
      </tr>
      <tr v-if="statistics?.length == 0">
        <td colspan="6" class="text-center">لا يوجد إحصائيات</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  statistics: {
    type: Array,
    default: () => [],
  },
  showTotals: {
    type: Boolean,
    default: true,
  },
  appendClass: {
    type: String,
    default: "",
  },
});

const totals = computed(() => {
  const totals = {
    total_questions: 0,
    total_active_questions: 0,
    total_late_questions: 0,
    total_solved_questions: 0,
    total_questions_assigned_to_parent: 0,
  };

  if (!props.statistics || props.statistics.length == 0) return totals;

  props.statistics.forEach((stats) => {
    totals.total_questions += stats.total_questions;
    totals.total_active_questions += stats.total_active_questions;
    totals.total_late_questions += stats.total_late_questions;
    totals.total_solved_questions += stats.total_solved_questions;
    totals.total_questions_assigned_to_parent +=
      stats.total_questions_assigned_to_parent;
  });

  return totals;
});
</script>
