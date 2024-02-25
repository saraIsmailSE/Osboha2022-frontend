<template>
  <div class="col-12">
    <div class="card card-block card-stretch card-height blog">
      <div class="card-header">
        <h2>الانجاز</h2>
      </div>
      <div class="card-body">
        <div class="blog-description" v-for="(day, index) in theses" :key="index">
          <h3 class="book-title mb-2">{{ DAYS[index] }}</h3>
          <table class="table w-100">
            <thead>
              <tr>
                <th scope="col">الصفحات</th>
                <th scope="col">نوعه</th>
                <th scope="col">وقته</th>
                <th scope="col">الكتاب</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(thesis, index) in day" :key="index">

                <td>
                  {{
                    thesis.end_page - thesis.start_page > 0
                    ? thesis.end_page - thesis.start_page + 1
                    : 0
                  }}
                </td>

                <!-- نوع الانجاز [قراءة فقط -  اطروحة -  اطروحة واقتباسات] -->
                <td v-if="thesis.max_length > 0 && thesis.total_screenshots > 0">
                  أطروحة واقتباسات
                </td>
                <td v-else-if="thesis.max_length > 0">أطروحة</td>
                <td v-else-if="thesis.total_screenshots > 0">اقتباسات</td>
                <td v-else>قراءة فقط</td>
                <td>{{ format_date(thesis.created_at) }}</td>
                <td>{{ BOOK_TYPES[thesis.book.type.type] }}</td>
                <td>
                  <router-link :to="{
                    name: 'group.listOneMarathoAmbassadorThesis',
                    params: { thesis_id: thesis.id },
                  }">
                    <i role="button" class="material-symbols-outlined md-18 me-1 text-primary">
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
    <div class="d-flex align-items-center mt-3 row">
      <div class="d-inline-block w-100 text-center col-12">
        <a role="button" @click="$router.go(-1)" class="d-block mt-3 mb-3 w-75 mx-auto">
          <span>عودة</span>
          <span class="align-middle material-symbols-outlined">
            keyboard_return
          </span>
        </a>
      </div>
    </div>

  </div>
</template>
<script>
import moment from "moment";
import helper from "@/utilities/helper";
import { DAYS, BOOK_TYPES } from "@/utilities/constants";

export default {
  name: "marathon check thesis",
  props: {
    theses: { type: Object },
    can_edit: { type: Boolean, default: true },
  },
  data() {
    return {
      DAYS,
      BOOK_TYPES,
    };
  },
  methods: {
    ...helper,
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
