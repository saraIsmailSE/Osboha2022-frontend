<template>
  <div class="row">
    <div class="col-sm-12">
      <iq-card>
        <div class="iq-card-body profile-page p-0">
          <div class="p-0 text-center">
            <h3 class="text-center mt-3">
              <strong> عنوان </strong>
            </h3>
            <video class="w-75" controls preload="metadata">
              <source src="@/assets/videos/eligible_videos/theses.mp4#t=5.0" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="user-detail text-center mb-3">
            <div class="profile-detail mt-1">
              <br />
              <h3 class="" v-if="book">
                {{ book.name }} - قسم الأطروحات
              </h3>
            </div>
          </div>
        </div>
      </iq-card>
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="user-tabing">
            <tab-nav :pills="true" id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
              <tab-nav-items class="w-100 p-0" :active="true" id="pills-feed-tab" href="#theses_container"
                ariaControls="pills-home" role="tab" :ariaSelected="true" title="المرحلة الأولى - الأطروحات" />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </div>
    <div class="col-sm-12">
      <div class="tab-content">
        <!-- START STAGE ONE -->
        <tab-content-item :active="true" id="theses_container" aria-labelled-by="pills-feed-tab">
          <div class="iq-card-body p-0">
            <div class="row">
              <div class="col-12">
                <div id="post-modal-data" class="iq-card" v-if="user_book">
                  <CreateThesis :pagesStartingRange="pagesStartingRange" @add-thesis="addThesis" :book="book"
                    :noOfthesis="theses.length" :user_book_id="user_book.id" v-if="(theses.length < 12 && !status && auditable) ||
                      theses.length == 0 ||
                      theses.length < 8
                      " />
                </div>

                <alert v-if="insertSuccessful" variant="primary" className="d-flex align-items-center text-center">
                  <template v-slot>
                    <div>
                      <h5 class="card-title">تمت الاضافة بنجاح</h5>
                    </div>
                  </template>
                </alert>
              </div>
              <div class="col-12" v-if="theses.length>0">
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">الأطروحات</h4>
                  </template>
                  <template v-slot:body>
                    <form id="form-wizard1" class="text-center mt-3">
                      <ul id="top-tab-list" class="p-0 row list-inline">
                        <li v-for="(thesis, index) in theses" :key="index" :class="checkActive(index, index + 1)"
                          class="col-2 mb-2 text-start" @click="changeTab(index + 1)" id="account">
                          <a href="javascript:void(0);">
                            <span> {{ index + 1 }}</span>
                          </a>
                        </li>
                      </ul>
                      <!-- fieldsets -->
                      <fieldset v-for="(thesis, index) in theses" :key="index"
                        :class="current == index + 1 ? 'd-block' : 'd-none'">
                        <ThesisDisplay :thesis="thesis" :number="index" :title="thesisTitle" :book="book"
                          @onNext="changeTab" />
                      </fieldset>
                    </form>
                  </template>
                </iq-card>
              </div>
              <div class="col-12">
                <iq-card>
                  <template v-slot:body>
                    <button v-if="theses.length >= 8 && auditable" class="btn btn-primary d-block w-100 mb-3"
                      @click="reviewThesisStatus">
                      اعتماد
                    </button>
                    <button class="btn btn-success d-block w-100" @click="back()">
                      عودة لصفحة الانجاز
                    </button>
                  </template>
                </iq-card>
              </div>
            </div>
          </div>
        </tab-content-item>
        <!-- END STAGE ONE -->
      </div>
    </div>
  </div>
</template>
<script>
import CreateThesis from "@/components/EligibleComponents/Thesis/CreateThesis.vue";
import ThesisDisplay from "@/components/EligibleComponents/Thesis/ThesisDisplay";
import thesisServices from "@/API/EligibleServices/thesisServices";

export default {
  name: "Theses",
  async created() {
    await this.getTheses();
  },
  components: {
    CreateThesis,
    ThesisDisplay,
  },
  data() {
    return {
      pagesStartingRange: 0,
      already_have_one: 0,
      auditable: false,
      book: null,
      user_book: null,
      status: "",
      theses: [],
      thesisTitle: "الأطروحة رقم",
      error: "",
      current: 1,
      insertSuccessful: false,
    };
  },
  methods: {
    async getTheses() {
      const response = await thesisServices.getByBook(this.$route.params.id);

      this.book = response.user_book.book;
      this.theses = response.theses;
      this.user_book = response.user_book;
      this.status = this.user_book.status;
      this.auditable = this.theses.some((element) => {
        if (element.status === "retard" || element.status === null) {
          return true;
        }
        return false;
      });
      if (this.theses.length > 0) {
        this.pagesStartingRange = + this.theses[this.theses.length - 1].ending_page
        this.book.end_page = this.book.end_page - this.pagesStartingRange;

      }


    },
    addThesis(thesis) {
      this.theses.push(thesis);
      this.pagesStartingRange = parseInt(thesis.ending_page)
      this.book.end_page = this.book.end_page - this.pagesStartingRange;

      // this.user_book_info[0].value++;
      this.auditable = true;
      this.insertSuccessful = true;
    },
    async reviewThesisStatus() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "هل أنت متأكد؟",
          text: "في حال اعتمادك للاطروحات لن يمكنك اضافة  أطروحة جديدة أو التعديل على الأطروحات التي كتبتها ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بالاعتماد",
          cancelButtonText: "تراجع  ",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then((willDelete) => {
          if (willDelete.isConfirmed) {
            thesisServices
              .reviewThesis(this.user_book.id)
              .then((response) => {
                swalWithBootstrapButtons.fire({
                  title: "تم الاعتماد",
                  text: "تم اعتماد أطروحاتك",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                this.insertSuccessful = false;
                location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    back() {
      this.$router.push({
        name: `achievement.steps`,
        params: { id: this.$route.params.id },
      });
    },
    changeTab(tab) {
      this.current = tab;
      window.scrollTo({ behavior: "smooth" });
    },
    checkActive(item, active) {
      let className = "";
      if (this.current > item) {
        className = "active";
      }
      if (this.current > active) {
        className = className + " done";
      }
      return className;
    },
  },
};
</script>
