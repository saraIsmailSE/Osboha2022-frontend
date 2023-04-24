<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div
          class="card position-relative inner-page-bg bg-primary"
          style="height: 150px"
        >
          <div class="inner-page-title">
            <h3 class="text-white">المجموعات</h3>
          </div>
        </div>
      </div>

      <div class="col-sm-12" v-if="groups.length > 0">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">قائمة المجموعات</h4>
            <div v-if="error" class="alert alert-danger" role="alert">
              لايمكن حذف المجموعة لاحتوائه على توثيقات
            </div>
                <div class="iq-email-search d-flex justify-content-center mb-3">
                <form class="w-100 me-2 position-relative searchbox">
                  <div class="form-group mb-0">
                    <input
                      type="text"
                      class="border border-primary w-100 text search-input form-control"
                      v-model.trim="search"
                      placeholder="ابحث عن مجموعة"
                      @keyup="filteredBooks"
                    />
                    <a
                      class="search-link"
                      href="javascript:void(0);"
                      @click="filteredBooks()"
                    >
                      <i class="material-symbols-outlined"> search </i>
                    </a>
                  </div>
                </form>
              </div>
          </template>

          <template v-slot:body>
            <button 
           @click="$router.push({ path: `/addgroup` })"
              class="btn btn-primary float-end"
            >
              اضافة مجموعة
            </button>
            <div class="table-responsive">
          
              <table id="datatable" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>اسم المجموعات</th>
                    <th>نوع المجموعة</th>
                    <th>عدد الاعضاء</th>    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(group,index) in groups" :key="index">
                    <td>
                      <a
                        href="javascript:void(0);"
                     
                      >
                        {{ group.name }}
                      </a>
                    </td>
                    <td>
                     {{ group.type }}
                    </td>
                    <td>
                      {{ group.members }}
                    </td>
                   
                    <td>
                      <button
                    
                        class="btn-primary text-white bg-delete"
                      >
                        تعديل
                      </button>
                    </td>
                    <td>
                      <button
                        @click="deleteThesis(book.id)"
                        class="btn-danger text-white bg-delete"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <ul class="pagination w-100">
               
              </ul>
            </div>
          </template>
        </iq-card>
      </div>
    </div>
  </div>
</template>
<script> 
import useVuelidate from "@vuelidate/core"; 
import GroupService from "@/API/services/group.service";
import { watchEffect } from "vue";

export default {
  name: "GroupList",
  components: {},
  props: ["page"],
  setup() {
    return { v$: useVuelidate() };
  },

 
  async created() {
    watchEffect(() => {
      
      this.getGroups();
    });
  },

  data() {
    return {
      error: false,
      groups: [] ,
      users: [],
      reject: [],
      rejectNote: "",
      current: 1,
      totalBooks:'',
      loader: false,
        empty: "",

      search: "",
    };
  },
 
  methods: {
    
    async getGroups(){
        const groups = await GroupService.getAll();
        this.groups = groups.data;
        console.log(groups)

    }
 
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalBooks / 4);
      return this.page < totalPages;
    },
    totalPages() {
      return Math.ceil(this.totalBooks / 10);
    },
  },
};
</script>
