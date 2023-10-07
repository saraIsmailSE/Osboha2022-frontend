<template>
  <div class="col-sm-12 mt-3 text-center">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">
          تعديل سؤال
        </h3>
      </div>
      <div class="iq-card-body p-3">
        <div class="image-block text-center">
          <img src="@/assets/images/update-forms.png" class="img-fluid rounded w-50" alt="blog-img">
        </div>

        <div class="d-flex align-items-center mt-3"
          v-if="questionToupdate.status == null || questionToupdate.status == 'retard'  ">
          <form  @submit.prevent="submitQuestionUpdate" class="post-text ml-3 w-100 row">
            <div class="form-group col-6">
              <select :disabled="message" v-model="v$.questionForm.starting_page.$model" class="form-select" data-trigger
                name="choices-single-default" id="choices-single-default">
                <option value="">اختر صفحة البداية</option>
                <option v-for="(i, index) in book.end_page" :key="index" :value="i">
                  {{ i }}
                </option>
              </select>
              <small style="color: red" v-if="v$.questionForm.starting_page.$error"
                >{{pageError ? pageError :'  قم بادخال صفحة البداية'}}</small
              >
            </div>
            <div class="form-group col-6">
              <select :disabled="message" class="form-select" v-model="v$.questionForm.ending_page.$model" data-trigger
                name="choices-single-default" id="choices-single-default">
                <option value="">اختر صفحة النهاية</option>
                <option v-for="(i, index) in book.end_page" :key="index" :value="i">
                  {{ i }}
                </option>
              </select>
              <small style="color: red" v-if="v$.questionForm.ending_page.$error">
                {{pageError ? pageError :'  قم بادخال صفحة النهاية'}}
              </small>
            </div>

            <div class="form-group">
              <textarea :disabled="message" rows="5" placeholder="... اكتب سؤالًا عدد حروفه بين 10 و 250 تجيب عنه الصفحات التي حددتها أعلاه، سنبحث عن إجابة السؤال ضمن هذه الصفحات فقط لتوثيق قراءتك" class="rounded form-control" id="bookQuestion"
                v-model="v$.questionForm.question.$model"></textarea>
              <small style="color:red;" v-if="v$.questionForm.question.$error">
                لطفًا قم بكتابة سؤال عدد حروفه بين 10 و 250 خالي من الرموز التعبيرية (emojis)
              </small>
            </div>
            <hr>
            <div class="form-group">
              <h4>إجاباتها بأسلوبك</h4>
              <div class="form-group row" v-for="(v,index) in questionForm.quotes" :key="index">
                
              <textarea :disabled="message" rows="5" placeholder="اكتب لنا إجابة السؤال الذي ذكرت أعلاه بأسلوبك عدد حروفها لا يزيد عن 250، سنقوم بتفقد الصفحات المحددة أعلاه لنراجع مدى دقة الإجابة التي قدمت للسؤال"
                class="rounded form-control mt-2 col-11" id="bookQuote" v-model="v.text" style="width:90%">
                </textarea>
              </div>
              <small style="color:red;" v-if="v$.questionForm.question.$error">
                قم بادخال إجابة واحدة على الاقل عدد حروفها لا يزيد عن 250 خالية من الرموز التعبيرية
                                  (emojis)
              </small>
            </div>
            <hr>
            <div class="col-sm-12 text-center" v-if="loader">
              <img src="../../assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
            </div>
            <h4 class="text-center mt-3 mb-3" v-if="message"> {{message}}</h4>
            <div class="d-inline-block w-100 text-center">
              <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto" v-if="message">
                عودة لصفحة الأنجاز
              </button>
              <input type="submit" value="تعديل" href="javascript:void(0);" class="btn btn-primary d-block mt-3 w-100"
                v-else />
            </div>
          </form>
        </div>
        <div class="d-flex align-items-center mt-3 row" v-else>
          <h4 class="text-center mt-3 mb-3 col-12"> لا يمكنك تعديل السؤال لأنه في حالة التقييم أو تم تقييمه</h4>
          <div class="d-inline-block w-100 text-center col-12">
            <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
              عودة لصفحة الأنجاز
            </button>

          </div>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import questionServices from '../../api/questionServices';
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
  name: "UpdateQuestion",
  async created() {
    this.questionToupdate = await questionServices.getById(this.$route.params.id)
    this.book = this.questionToupdate.user_book.book
    this.questionForm.question = this.questionToupdate.question
    this.questionForm.user_book_id = this.questionToupdate.user_book.id
    this.questionForm.starting_page = this.questionToupdate.starting_page
    this.questionForm.ending_page = this.questionToupdate.ending_page
    this.questionForm.quotes = this.questionToupdate.quotation
  },
  components: {
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loader: false,
      questionForm: {
        question: '',
        starting_page: "", 
        ending_page: "",
        user_book_id:0,
        quotes: [
          { text: '' }
        ]
      },  pageError:'',
      book: [],
      message: null,
      questionToupdate:[],
    };
  },
  validations() {
    return {
      questionForm: {
        question: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(250)

        },  starting_page: {
          required,valdiatePages:this.validatePages
        },
        ending_page: {
          required,valdiatePages:this.validatePages
        }, quotes: {
          required,
          minLength: minLength(1),
          $each: {
            text: {
              minLength: minLength(250)
            }
          }
        }
      }
    };
  },
  methods: {
       validatePages(){
      const error =  parseInt(this.questionForm.starting_page) < parseInt(this.questionForm.ending_page)
      if(!error)this.pageError = 'يجب ان تكون صفحة البداية اقل من صفحة النهاية'
      else this.pageError = ''
      return error;
    },
    addField(value, fieldType) {
      fieldType.push({ text: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(-1);
    },
    removeEmojis(text) {
      var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return text.replace(regex, '');
    },


    async submitQuestionUpdate() {
      this.questionForm.question = this.removeEmojis(this.questionForm.question)
      for (let i = 0; i < this.questionForm.quotes.length; i++) {
        this.questionForm.quotes[i].text=this.removeEmojis(this.questionForm.quotes[i].text);
      }


      this.v$.$touch(); 
      if (!this.v$.questionForm.$invalid) {
        this.message = "";
        this.loader = true;
        const question = await questionServices.updateQuestion(this.questionForm, this.questionToupdate.id);
      
        this.questionForm.question = question.question;
        this.questionForm.pageEnd = question.ending_page;
        this.questionForm.pageStart = question.starting_page; 
        this.questionForm.quotes = [{ text: "" }];
        this.v$.questionForm.$reset()
        this.loader = false;
        this.message = "تم التعديل بنجاح"
      }


    },
    back() {
      this.$router.push({ name: 'achievement.questions' , params: { id: this.questionToupdate.user_book.book.id } })
    }
  },
};
</script>
