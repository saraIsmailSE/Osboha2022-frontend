<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card position-relative inner-page-bg bg-primary" style="height: 150px">
        <div class="inner-page-title">
          <h3 class="text-white">البحث عن توثيق</h3>
        </div>
      </div>
    </div>
    <form @submit.prevent="getInfo">
      <input style="margin-bottom: 10px" type="number"
        class="border border-primary w-100 text search-input form-control" v-model="search"
        placeholder="ابحث عن توثيق" />
      <button type="submit" class="col-6 btn btn-primary d-block w-75 mx-auto mb-3">
        بحث
      </button>
    </form>
    <div class="col-sm-12" v-if="show == 1">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title text-center">
            معلومات التوثيق
            <span class="material-symbols-outlined align-middle">
              menu_book
            </span>
          </h4>
          <span class="px-2">
            •
            اسم السفير : {{ userName }}</span>
          <br>
          <span class="px-2"> • اسم الكتاب : {{ bookName }}</span>
          <br>
          <span class="px-2" v-if="theses"> • عدد الأطروحات : {{ theses.length }}</span>
          <span class="px-2" v-else> • عدد الأطروحات : 0</span>
          <br>
          <span class="px-2" v-if="questions"> • عدد الأسئلة : {{ questions.length }}</span>
          <span class="px-2" v-else> • عدد الأسئلة : 0</span>
          <br>
          <span class="px-2" v-if="generalInformations"> • عدد التلخيصات : 1</span>
          <span class="px-2" v-else> • عدد التلخيصات : 0</span>
        </template>
      </iq-card>
      <!-- thesis -->
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">الأطروحات</h4>
        </template>
        <template v-slot:body v-if="theses && theses.length > 0">
          <form id="form-wizard1" class="text-center mt-3">
            <ul id="top-tab-list" class="p-0 row list-inline">
              <li v-for="(thesis, index) in theses" :key="index" :class="checkActiveThesis(index, index + 1)"
                class="col-lg-3 col-6  mb-2 text-start" @click="changeThesisTab(index + 1)" id="account">
                <a href="javascript:void(0);">
                  <span class="material-symbols-outlined align-middle" v-if="thesis.status == 'review'">
                    manage_search
                  </span>
                  <span class="material-symbols-outlined align-middle" v-if="thesis.status == 'audit'">
                    star
                  </span>
                  <span>أطروحة {{ index + 1 }}</span>
                </a>

              </li>
            </ul>
            <!-- fieldsets -->
            <fieldset v-for="(thesis, index) in theses" :key="index"
              :class="currentThesis == index + 1 ? 'd-block' : 'd-none'">
              <Thesis :reviewStage="false" :thesis="thesis" :userBook='userBook' :index='index'
                @onNext="changeThesisTab" />
            </fieldset>
          </form>
        </template>
        <template v-slot:body v-else>
          <h4 class="card-title">لا يوجد</h4>
        </template>

      </iq-card>

      <!-- Questions  -->
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">الاسئلة</h4>
        </template>
        <template v-slot:body v-if="questions && questions.length > 0">
          <form id="form-wizard1" class="text-center mt-3">
            <ul id="top-tab-list" class="p-0 row list-inline">
              <li v-for="(question, index) in questions" :key="index" :class="checkActiveQuestions(index, index + 1)"
                class="col-lg-3 col-6 mb-2 text-start" @click="changeQuestionsTab(index + 1)" id="account">
                <a href="javascript:void(0);">
                  <!-- <i class="material-symbols-outlined">Rule</i> -->
                  <span>السؤال {{ index + 1 }}</span>
                </a>
              </li>
            </ul>
            <!-- fieldsets -->
            <fieldset v-for="(question, index) in questions" :key="index"
              :class="currentQuestion == index + 1 ? 'd-block' : 'd-none'">
              <Question :reviewStage="false" :question="question" :userBook='userBook' :index='index'
                @onNext="changeQuestionsTab" />
            </fieldset>
          </form>

        </template>
        <template v-slot:body v-else>
          <h4 class="card-title">لا يوجد</h4>
        </template>

      </iq-card>


      <!-- Start General Informations -->
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">الملخص العام</h4>
        </template>
        <template v-slot:body v-if="generalInformations">
          <div class="form-card text-start">
            <form>
              <div class="row">
                <h3 class="mb-4">الانجاز</h3>
                <div class="col-md-12 form-group">
                  <h4 class="form-label"> التلخيص العام</h4>
                  <p class="form-control-plaintext">{{ generalInformations.summary }}</p>
                </div>
                <div class="col-md-12 form-group">
                  <h4 class="form-label"> السؤال العام العام</h4>
                  <p class="form-control-plaintext">{{ generalInformations.general_question }}</p>
                </div>
              </div>
            </form>
          </div>

          <div class="col-lg-12" v-if="generalInformations.status == 'review'">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">بحاجة لمراجعة</h4>
              </template>
              <template v-slot:body>
                <TimeLine :items="[
                  {
                    color: 'primary',
                    title: `لا يوجد مراجع `,
                    description: '',
                    child: {
                      type: 'img',
                      items: [
                      ]
                    }
                  },

                ]" />
              </template>
            </iq-card>
          </div>

          <div class="col-lg-12" v-if="generalInformations.status == 'retard'">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">تم الاعادة </h4>
              </template>
              <template v-slot:body>
                <TimeLine :items="[
                  {
                    color: 'primary',
                    title: `بحاجة لتعديل ~ ${generalInformations.reviewer.name}`,
                    description: generalInformations.reviews,
                    child: {
                      type: 'img',
                      items: [
                      ]
                    }
                  },

                ]" />
              </template>
            </iq-card>
          </div>
          <div class="col-lg-12" v-if="generalInformations.status == 'accept'">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">تم القبول </h4>
              </template>
              <template v-slot:body>
                <TimeLine :items="[
                  {
                    color: 'primary',
                    title: 'مقبول',
                    description: generalInformations.reviewer.name,
                    child: {
                      type: 'img',
                      items: [
                      ]
                    }
                  },

                ]" />
              </template>
            </iq-card>
          </div>
          <div class="col-lg-12" v-if="generalInformations.status == 'audite'">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">تم الاعتماد </h4>
              </template>
              <template v-slot:body>
                <TimeLine :items="[
                  {
                    color: 'primary',
                    title: 'معتمد - قابل للتقييم',
                    description: generalInformations.reviewer.name,
                    child: {
                      type: 'img',
                      items: [
                      ]
                    }
                  },

                ]" />
              </template>
            </iq-card>
          </div>
          <div class="col-lg-12" v-if="generalInformations.status == 'audited'">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">تم التقييم</h4>
              </template>
              <template v-slot:body>
                <TimeLine :items="[
                  {
                    color: 'primary',
                    title: `تم التقييم ~ ${generalInformations.auditor.name}`,
                    description: generalInformations.reviews,
                    child: {
                      type: 'img',
                      items: [
                      ]
                    }
                  },
                  {
                    color: 'primary',
                    title: `تم المراجعة ~ ${generalInformations.reviewer.name}`,
                    description: '',
                    child: {
                      type: 'img',
                      items: [
                      ]
                    }
                  },

                ]" />
              </template>
            </iq-card>
          </div>
          <div class="col-lg-12" v-if="generalInformations.status == 'rejected'">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">تم الرفض </h4>
              </template>
              <template v-slot:body>
                <TimeLine :items="[
                  {
                    color: 'primary',
                    title: `مرفوض ~ ${generalInformations.reviewer.name} ${generalInformations.auditor.name}`,
                    description: generalInformations.reviews,
                    child: {
                      type: 'img',
                      items: [
                      ]
                    }
                  },

                ]" />
              </template>
            </iq-card>
          </div>
        </template>
        <template v-slot:body v-else>
          <h4 class="card-title">لا يوجد</h4>
        </template>

      </iq-card>
      <!-- End General Informations -->

    </div>
    <div class="col-sm-12" v-else-if="show == 0">
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="image-block text-center">
            <img src="@/assets/images/main/no-E.png" class="img-fluid rounded w-50" alt="blog-img">
          </div>

          <h4 class="text-center mt-3 mb-3">لا يوجد توثيق بهذا الرقم</h4>
        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>
import userBookService from "@/API/EligibleServices/userBookServices";
import Thesis from "../Control/Thesis/thesis";
import Question from '../Control/Questions/question'


export default {
  name: "Find Achievements",
  components: {
    Thesis,
    Question
  },
  data() {
    return {
      achievement: {},
      generalInformations: null,
      bookName: "",
      userName: "",
      cuurentQuotation: [],
      theses: null,
      currentThesis: 1,
      currentThesisCount: 1,
      questions: null,
      currentQuestion: 1,
      search: null,
      show: null,
      userBook: null,

    };
  },

  methods: {
    async getInfo() {
      this.achievement = await userBookService.getFullUserBook(this.search);
      console.log("🚀 ~ file: FindAchievement.vue:332 ~ getInfo ~ this.achievement:", this.achievement)
      if (this.achievement == 'UserBook does not exist') {
        this.show = 0
      } else {
        this.userBook = this.achievement
        this.bookName = this.achievement.book.name;
        this.userName = this.achievement.user.name;
        this.generalInformations = this.achievement.general_information;
        this.theses = this.achievement.thesises;
        this.questions = this.achievement.questions;
        this.show = 1
      }

    },
    checkActiveQuestions(item, active) {
      let className = ''
      if (this.currentQuestion > item) {
        className = 'active'
      }
      if (this.currentQuestion > active) {
        className = className + ' done'
      }
      return className
    },
    checkActiveThesis(item, active) {
      let className = ''
      if (this.currentThesis > item) {
        className = 'active'
      }
      if (this.currentThesis > active) {
        className = className + ' done'
      }
      return className
    },

    changeThesisTab(tab) {
      this.currentThesis = tab
      window.scrollTo({ behavior: 'smooth' })
    },
    changeQuestionsTab(tab) {
      this.currentQuestion = tab
      window.scrollTo({ behavior: 'smooth' })
    },
  },
};
</script>
<style scoped>
#top-tab-list {
  margin-bottom: 0;
}
</style>