<template>
  <div>
    <div class="row">
      <div class="col-sm-12" v-if="groups && groups.length > 0">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">قائمة المجموعات - {{ groups.length }}</h4>
          </template>

          <template v-slot:body>
            <router-link
              class="btn btn-primary float-end"
              :to="{
                name: 'group.addGroup',
              }"
            >
              اضافة مجموعة
            </router-link>
            <div class="table-responsive">
              <table id="datatable" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>اسم المجموعة</th>
                    <th>نوع المجموعة</th>
                    <th>عدد الاعضاء</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(group, index) in groups" :key="index">
                    <td>
                      <router-link
                        class="text-center"
                        :to="{
                          name: 'group.group-detail',
                          params: { group_id: group.id },
                        }"
                      >
                        {{ group.name }}
                      </router-link>
                    </td>
                    <td>
                      {{ group_type[group.type.type] }}
                    </td>
                    <td>
                      {{ group.users_count }}
                    </td>

                    <td>
                      <!-- <span class="btn btn-primary text-white material-symbols-outlined ms-1 me-1">
                        edit
                      </span> -->
                      <!-- <span
                        @click="deleteGroup(group.id)"
                        class="btn btn-danger text-white material-symbols-outlined ms-1 me-1"
                      >
                        delete
                      </span> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </iq-card>
      </div>
    </div>
  </div>
</template>
<script>
import GroupService from "@/API/services/group.service";
import helper from "@/utilities/helper";

export default {
  name: "Groups List",
  async created() {
    const groups = await GroupService.getAll();
    this.groups = groups.data;
  },

  data() {
    return {
      groups: [],
      group_type: {
        followup: "فريق متابعة",
        supervising: "فريق رقابة",
        advising: "فريق توجيه",
        consultation: "فريق الاستشارة",
        Administration: "الإدارة العليا",
      },
    };
  },

  methods: {
    async deleteGroup(id) {
      try {
        const response = await GroupService.deleteById(id);
        const groups = await GroupService.getAll();
        this.groups = groups.data;
        helper.toggleToast("تم الحذف", "success");
      } catch (error) {
        helper.toggleToast("حصل خطأ - لم يتم الحذف!", "danger");
        console.log(error);
      }
    },
  },
};
</script>
