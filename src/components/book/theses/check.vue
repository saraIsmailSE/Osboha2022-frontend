<template>
  <div class="col-12">
    <div class="card card-block card-stretch card-height blog">
      <div class="card-header">
        <h2>الانجاز</h2>
      </div>
      <div class="card-body">
        <div
          class="blog-description"
          v-for="(book, index) in theses"
          :key="index"
        >
          <h5 class="book-title mb-2">الكتاب: {{ book.title }}</h5>
          <table class="table w-100">
            <thead>
              <tr>
                <th scope="col">الصفحات</th>
                <th scope="col">نوعه</th>
                <th scope="col">وقته</th>
                <th scope="col">حالته</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(thesis, index) in book" :key="index">
                <td>
                  {{
                    thesis.end_page - thesis.start_page > 0
                      ? thesis.end_page - thesis.start_page + 1
                      : 0
                  }}
                </td>

                <!-- نوع الانجاز [قراءة فقط -  اطروحة -  اطروحة واقتباسات] -->
                <td
                  v-if="thesis.max_length > 0 && thesis.total_screenshots > 0"
                >
                  أطروحة واقتباسات
                </td>
                <td v-else-if="thesis.max_length > 0">أطروحة</td>
                <td v-else-if="thesis.total_screenshots > 0">اقتباسات</td>
                <td v-else>قراءة فقط</td>
                <td>{{ format_date(thesis.updated_at) }}</td>
                <td v-if="thesis.status && thesis.status == 'accepted'">
                  <span class="rounded-pill badge bg-primary px-2">مقبول </span>
                </td>
                <td v-else-if="thesis.status && thesis.status == 'rejected'">
                  <span class="rounded-pill badge bg-danger px-2">مرفوض </span>
                </td>
                <td v-else-if="thesis.status && thesis.status == 'one_thesis'">
                  <span class="rounded-pill badge bg-info px-2"
                    >علامة أطروحة واحدة</span
                  >
                </td>
                <td v-else>
                  <span class="rounded-pill badge bg-warning px-2">
                    بحاجة لمراجعة
                  </span>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'group.listOneAmbassadorThesis',
                      params: { thesis_id: thesis.id },
                      query: { can_edit: can_edit },
                    }"
                  >
                    <i
                      role="button"
                      class="material-symbols-outlined md-18 me-1 text-primary"
                    >
                      visibility
                    </i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "CheckThesis",
  props: {
    theses: { type: Object },
    can_edit: { type: Boolean, default: true },
  },
  data() {
    return {};
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY hh:mm");
      }
    },
  },
};
</script>
<style scoped>
.book-title {
  background-color: #f1f9f5;
  width: fit-content;
  direction: rtl;
}
</style>
