<template>
  <div class="row">
    <div class="col-12">
      <div v-if="rejected" class="alert alert-danger">
        <h4>تم رفض انجازك للاسباب التالية</h4>
        <p>{{ rejectedMsg }}</p>
      </div>
      <div v-else-if="retard" class="alert alert-danger">
        <h4>لديك انجاز يجب يجب اعادته</h4>
        <div v-if="retardTheses.length > 0" class="">
          <h5>الأطروحات</h5>
          <ul>
            <li v-for="(value, key) in retardTheses" :key="key">
              الأطروحة : {{ value }}
            </li>
          </ul>
        </div>
        <div v-if="retardQuestions.length > 0" class="">
          <h5>الأسئلة</h5>
          <ul>
            <li v-for="(value, key) in retardQuestions" :key="key">
              السؤال : {{ value }}
            </li>
          </ul>
        </div>
        <div v-if="retardGeneralInformations" class="">
          <h5>التلخيص العام</h5>
        </div>
      </div>
      <iq-card>
        <template v-slot:headerTitle>
          <h1 class="card-title">خطواتك نحو التوثيق</h1>
          <h4 class="card-title" v-if="userBook">
            كتاب {{ userBook?.book?.name }}
            <span class="material-symbols-outlined">
              draw
            </span>
          </h4>
        </template>
        <template v-slot:body>
          <div class="alert alert-primary">
            <h4>
              <strong> انتبه لضمان قبول انجازك تأكد مما يلي </strong>
            </h4>
            <ul>
              <li>
                يجب ان تكون اطروحاتك مرتبة بشكل تسلسلي متناسق مع عدد صفحات
                الكتاب
              </li>

              <li>تجنب وضع الرموز التعبيرية ( الإيموجي ) ضمن اطروحاتك</li>

              <li>
                يجب أن لا تقل عدد الصفحات التي تمثلها الأطروحة عن ٦ صفحات على
                الأقل
              </li>
            </ul>
          </div>
          <div class="p-0 text-center">
            <video class="w-75" controls preload="metadata">
              <source src="@/assets/videos/eligible_videos/main.mp4#t=5.0" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <TimeLine :items="timelineItems" />
        </template>
      </iq-card>
    </div>
    <iq-card v-if="completionPercentage">
      <template v-slot:body>
        <h4 class="text-center mb-2">املأ خزان ثقافتك بالقراءة</h4>
        <Chart :percintage="completionPercentage" />
      </template>
      <div v-if="msg" class="col-12 alert alert-danger">
        <h5 class="text-center">{{ msg }}</h5>
      </div>
      <div v-else>
        <h3 class="text-center">التسليــم النهائــي</h3>
        <br />
        <div v-if="completionPercentage >= 80">
          <h5 v-if="userStatus == 0" style="color: red" class="text-center mb-3">
            يرجى انتظار تفعيل حسابك لتسليم الانجاز
          </h5>
          <h5 v-else-if="userStatus != 1" style="color: red" class="text-center mb-3">
            <span class="dark-color d-inline-block line-height-2">
              <router-link :to="{ name: 'user.update-info' }">
                تفعيل الحساب
              </router-link></span>
            يجب تفعيل حسابك لتسليم انجازك
          </h5>

          <h5 class="text-center mb-3">
            سيتم تمكينك من الضغط هنا فقط في حال اكمالك اعتماد كامل إجابتك أدناه
          </h5>
        </div>
        <div class="col-12 d-flex justify-content-center mb-3">
          <input type="submit" value="تسليم" href="javascript:void(0);" class="btn btn-primary d-block w-75"
            @click="updateUserBook()" :disabled="isDisabled" />
        </div>
        <div class="col-12 d-flex justify-content-center mb-3"
          v-if="userBook.status != 'audited' || userBook.status != 'finished'">
          <input type="submit" value="الغاء التوثيق" href="javascript:void(0);" class="btn btn-danger d-block w-75"
            @click="cancel()" />
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import userBookServices from "@/API/EligibleServices/userBookServices";
import Chart from "@/components/Charts/fluid-meter-chart.vue";
import UserService from '@/API/services/user.service'
export default {
  name: "Steps",
  components: {
    Chart,
  },
  mounted() { },

  async created() {
    await this.getUserStatus();
    await this.getByBookId();
  },
  data() {
    return {
      timelineItems: [
        {
          color: "primary",
          title: "الأطروحات",
          description:
            `
 تعتبر كتابة الأطروحة من المراحل السامية في القراءة النافعة، حيث هي عملية عقلية وحركية،
  تبدأ بتلقيك فكريًا لأفكار الكاتب ومعلومات الكتاب، ثم إعادة فرزها وتحليلها وإخضاعها لتجاربك وأفكارك الذاتية
 ومعلوماتك وخبراتك. فينتج عنها حركيًا كتابة لمزيج من الأفكار و الآراء في محاورتك لما طرحه الكاتب وتنتج في سطور كتابتك. <strong style="color:#278036">نطلب منك هنا كحد أدنى ( 8 ) أطروحات شاملة في قراءتك لهذا الكتاب و (12) أطروحة كحد أعلى </strong> ،
 ويجب عليك أن تكتب أطروحتك بعناية فنحن <strong style="color:#831018"> نرفض توثيق الأطروحات التي تعتمد على نسخ اقتباسات حرفية أو تلك التي تبنى على فكرة تلخيص الأفكار فحسب  </strong> . كن منتجًا في أطروحتك وليس مستهلكًا.
 `,
          child: {
            type: "btn",
            route: {
              name: "achievement.theses",
              param: this.$route.params.id,
            },
            items: [],
          },
        },
        {
          color: "primary",
          title: "التلخيص العام",
          description:
            `
          <h4 class="mb-2">كيف اكتب الملخص العام، وكيف أحدد السؤال العام </h4>
          لكل مادة مقروءة (كتاب) هناك سؤال عام يسعى الكتاب لنقاشه، ومنه يتفرع
                                            الكتاب على شكل
                                            فصول أساسية ومن
                                            ثم مباحث داخل كل فصل. عند شروعك في قراءة الكتاب، عليك المرور على مقدمة
                                            المؤلف ومحاولة
                                            معرفة (السؤال
                                            العام) الذي يسعى الكتاب للإجابة عنه.
                                            <br />
                                            أمثلة 👇🏻
                                            <br />
                                            <strong style="color:#278036"> كتاب أغنى رجل في بابل</strong>  = يدور السؤال العام حول كيفية صناعة الثروة المالية
                                            للفرد
                                            <br />
                                            <strong style="color:#278036"> كتاب سيكولوجية الجماهير </strong>  = يدور السؤال العام في الكتاب حول قدرة المسؤول على
                                            التحكم في
                                            الجماهير والشعوب
                                            من الناحية السكولوجية
                                            <br />

                                           <strong style="color:#831018"> ومن جانب آخر  </strong>، لكل مادة مقروءة (كتاب) هناك تلخيص عام للأفكار العامة والمحاور
                                            الأساسية
                                            التي يدور حولها
                                            الكتاب. فيجب على القارئ أن يستطيع دائمًا تقديم ملخص من الكتاب، ويستحسن
                                            استخدام أفكار
                                            الكاتب والفاظه
                                            باقتضاب لصناعة الملخص، لا تقم بإضافة أفكارك واعتقاداتك على الملخص، ستفعل ذلك
                                            حين تكتب
                                            الأطروحة حين تمزج
                                            ملخص الكاتب مع أفكارك وإسقاطاتك الفكرية ومخزونك المعرفي ومقارنته مع الكتاب.`,
          child: {
            type: "btn",
            route: {
              name: "achievement.general_summary",
              param: this.$route.params.id,
            },
            items: [],
          },
        },
        {
          color: "primary",
          title: "الأسئلة",
          description: `القراءة السليمة، هي تلك التي نبدأها بحثًا عن بعض الإجابات وتنقيبًا عن معلومات وأفكار، ونخرج منها بأسئلة أخرى وأجوبة وأفكار. <strong style="color:#278036"> نطلب منك في هذه الخانة تزويدنا بالسؤال </strong> الذي تجيب عنه الصفحات التي تحددها وسنقوم نحن بتفقد هذه الصفحات بحثًا عن مدى دقة إجابة هذه الصفحات لهذا التساؤل. أنت هنا تتدرب على احتراف القراءة السليمة.تذكر أن عليك تحديد خمس أسئلة كحد أدنى من هذا الكتاب وتزويدنا بالإجابة`,
          child: {
            type: "btn",
            text: "",
            route: {
              name: "achievement.questions",
              param: this.$route.params.id,
            },
            items: [],
          },
        },
      ],
      loader: false,
      isDisabled: true,
      msg: "",
      userStatus: "",
      userBook: null,
      isThesesReady: false,
      isGeneralReady: false,
      isQuestionsReady: false,
      completionPercentage: null,
      rejected: false,
      rejectedMsg: "",
      retard: false,
      retardMsg: "لديك انجاز يجب يجب اعادته",
      retardTheses: null,
      retardQuestions: null,
      retardGeneralInformations: false,
    };
  },
  methods: {
    async getUserStatus() {
      const response = await UserService.getInfo(this.user.id);
      this.userStatus = response.allowed_to_eligible;
    },
    async updateUserBook() {
      this.isDisabled = true;
      this.loader = true;
      await userBookServices.updateUserBook("review", this.userBook.id);
      this.loader = false;
      this.msg = "تم تسليم طلبك";
    },

    async getByBookId() {
      const response = await userBookServices.getByBookID(
        this.$route.params.id
      );
      this.completionPercentage = response.completionPercentage;
      this.userBook = response.userBook;

      if (this.userBook.status == "rejected") {
        this.rejected = true;
        this.rejectedMsg = this.userBook.reviews;
      } else if (this.userBook.status == "retard") {
        this.retard = true;
        this.retardTheses = this.userBook.thesises.reduce(function (
          retardTheses,
          element,
          index
        ) {
          if (element.status === "retard") retardTheses.push(index + 1);
          return retardTheses;
        },
          []);
        this.retardQuestions = this.userBook.questions.reduce(function (
          retardQuestions,
          element,
          index
        ) {
          if (element.status === "retard") retardQuestions.push(index + 1);
          return retardQuestions;
        },
          []);
        if (
          this.userBook.general_information &&
          this.userBook.general_information.status == "retard"
        ) {
          this.retardGeneralInformations = true;
        }
      } else if (this.userBook.status != null) {
        this.msg = "تم التسليم";
      }

      function isReady(stuff) {
        return stuff.status != "rejected" && stuff.status != null;
      }
      // isThesesReady
      if (this.userBook.thesises.find(isReady)) {
        this.isThesesReady = true;
        this.timelineItems[0].child.text = "عرض";
      }

      //isQuestionsReady
      if (this.userBook.questions.find(isReady)) {
        this.isQuestionsReady = true;
        this.timelineItems[2].child.text = "عرض";
      }

      //isGeneralReady
      if (
        this.userBook.general_information &&
        this.userBook.general_information.status != "retard" &&
        this.userBook.general_information.status != null
      ) {
        this.timelineItems[1].child.text = "عرض";
        this.isGeneralReady = true;
      } else {
        this.isGeneralReady = false;
      }

      if (
        this.isThesesReady &&
        this.isGeneralReady &&
        this.isQuestionsReady &&
        (this.userBook.status == null || this.userBook.status == "retard") &&
        this.userStatus == 1
      ) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },

    cancel() {
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
          text: "موافقتك تعني حذف التوثيق بأكمله بما في ذلك اطروحاته والتلخيص العام والأسئلة المعرفية وجميع التقييمات التي حصلت عليها",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بالحذف",
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
            userBookServices
              .cancel(this.userBook.id)
              .then((response) => {
                swalWithBootstrapButtons.fire({
                  title: "تم الالغاء",
                  text: "تم الغاء طلب التوثيق",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                this.$router.push({ name: "social.book" });
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          }
        });
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  }
};
</script>