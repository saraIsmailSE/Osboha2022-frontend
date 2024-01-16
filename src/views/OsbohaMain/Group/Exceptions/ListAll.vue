<template>
  <div>
    <div class="col-sm-12 mt-3">
      <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
          <h3 class="text-center mt-3 mb-3">
            {{ group_title }} - {{ week_title }}
          </h3>
        </div>
        <div class="iq-card-body p-3">
          <div class="d-flex align-items-center mt-3">
            <div class="col-12">
              <div class="card card-block card-stretch card-height blog">
                <div class="card-header">
                  <h2>الاجازات</h2>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <select
                      class="form-select"
                      @change="filter($event)"
                      data-trigger
                      name="choices-single-default"
                      id="choices-single-default"
                    >
                      <option value="">فلترة حسب</option>
                      <option value="oldest">الأقدم</option>
                      <option value="latest">الأحدث</option>
                      <option value="freez">تجميد فقط</option>
                      <option value="exceptional_freez">
                        تجميد استثنائي فقط
                      </option>
                      <option value="exams">امتحانات فقط</option>
                      <option value="accepted">مقبول</option>
                      <option value="pending">بانتظار الموافقة</option>
                      <option value="rejected">مرفوض</option>
                      <option value="finished">منتهي</option>
                    </select>
                  </div>

                  <div class="blog-description">
                    <table class="table w-100">
                      <thead>
                        <tr>
                          <th scope="col">اسم السفير</th>
                          <th scope="col">نوع الاجازة</th>
                          <th scope="col">الحالة</th>
                          <th scope="col">الانتهاء</th>
                        </tr>
                      </thead>
                      <tbody v-if="exceptions && exceptions.length > 0">
                        <tr
                          v-for="exception in exceptions.slice(0, length)"
                          :key="exception.id"
                        >
                          <td>{{ exception.user.name }}</td>
                          <td>{{ exception.type.type }}</td>
                          <td>{{ EXCEPTION_STATUS[exception.status] }}</td>
                          <td v-if="exception.end_at">
                            {{ exception.end_at }}
                          </td>
                          <td v-else>------</td>
                          <router-link
                            :to="{
                              name: 'exceptions.listException',
                              params: { exception_id: exception.id },
                            }"
                          >
                            <td>
                              <i
                                role="button"
                                class="material-symbols-outlined md-18 me-1 text-primary"
                              >
                                visibility
                              </i>
                            </td>
                          </router-link>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr colspan="4">
                          <td>لا يوجد بيانات لعرضها</td>
                        </tr>
                      </tbody>
                    </table>
                    <span
                      class="w-100 text-center mt-3 btn"
                      role="button"
                      @click="loadMore()"
                      v-if="exceptions && exceptions.length > length"
                    >
                      عرض المزيد
                    </span>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center mt-3 row">
            <div class="d-inline-block w-100 text-center col-12">
              <button
                type=""
                @click="back()"
                class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto"
              >
                عودة للفريق
              </button>
            </div>
          </div>
        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>
import GroupService from "@/API/services/group.service";
import { EXCEPTION_STATUS} from "@/utilities/constants";
export default {
  name: "List Exceptions",
  async created() {
    try {
      const response = await GroupService.getAllGroupExceptions(this.group_id);
      this.exceptions = response.exceptions;
      this.group_title = response.group.name;
      this.week_title = response.week.title;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      exceptions: null,
      group_title: "",
      week_title: "",
      group_id: this.$route.params.group_id,
      EXCEPTION_STATUS,
            length: 10,
    };
  },
  methods: {
    loadMore() {
      this.length += 10;
    },
    back() {
      this.$router.push({
        name: "group.group-detail",
        params: { group_id: this.group_id },
      });
    },
    async filter($event) {
      this.exceptions = await GroupService.exceptionsFilter(
        $event.target.value,
        this.group_id,
      );
    },
  },
};
</script>
