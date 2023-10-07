<template>
  <div class="w-100 text-center">
    <div id="export">
      <button class="get-certificate-btn btn btn-primary mb-2 w-25" @click="exportToPDF">
        تحميل الشهادة ك ملف pdf
      </button>
    </div>
    <div id="mainpage">
      <div class="pageWithCertificate">
        <div class="page-content">
          <p style="text-align: center">
            <span style="font-size: 30pt; font-family: 'Arial', sans-serif"
              >بسم الله الرحمن الرحيم
            </span>
          </p>
          <p class="break-space">&nbsp;</p>
          <p>التاريخ: {{formatDate(information.created_at)}}</p>

          <p class="main-header" style="text-align: center">
            <u><span>توثيق إنجاز قارئ</span></u>
          </p>
          <p style="text-align: center">
            
            <strong v-if="information.book.level">مستوى الكتاب: {{information.book.level.name}}</strong>
          </p>
          <p>
            <strong><span style="font-size: 13px"> </span></strong>
          </p>
          <p>
            تثبت هذه الوثيقة من مشروع صناعة القرّاء (أصبوحة 180) بأن 
            <span class="important-text"> {{
                information.user.name
            }} </span>،

            قد حصل عليها بموجب المعايير المتبعة
            قد طبق معايير القراءة المنهجية من خلال إنجازه قراءة كتاب
            {{ information.book.name }}. ويثمن المشروع جهوده المبذولة وسعيه
            الحثيث في زيادة حصيلته المعرفية، ورغبته باستمرارية التعلم عبر
            القراءة المنهجية؛ ليبني صرحه المعرفيّ الذي يؤسّس لما بعده من
            الأفعال، والتي تؤدي بدورها إلى النّهضة الحقيقيّة على المستوى الفردي
            والجماعي، فينفع أمّته ويساهم في بناء نهضتها نحو القوّة والتطور
            والرفعة.
          </p>
          <p class="break-space">&nbsp;</p>
          <p class="break-space">&nbsp;</p>
          <p>
            علمًا أن مشروع أصبوحة 180 هو الحاضنة الأساسية للقرّاء، بصفته المشروع
            الأكبر عربيّاً لصناعة الفكر، مُركزًا على عوامل الفكر عن طريق استثمار
            القراءة المنهجيّة ونواتجها؛ لصناعة مجتمع واعٍ قادرٍ على الوصول
            للنّهضة، وتحقيق التنمية مستعيناً بالتكنولوجيا الحديثة.
          </p>
        </div>

        ¦
      </div>
      <div class="page">
        <div class="page-content">
          <p class="sub-header">التقييم الفردي لحامل هذه الشهادة</p>
          <p class="break-space">&nbsp;</p>
          <p>
            <span>يهدف مشروع أصبوحة </span><span>180 </span><span>
              إلى رفع كفاءة التعلم من خلال القراءة المنهجية لدى القارئ وذلك من
              خلال تعميق أهمية الكتابة التوثيقية المصاحبة للقراءة و المتمثلة في
              تنظيم وحفظ أوعية المعرفة، وتيسير سبل الإفادة من محتوياتها؛ لأغراض
              المناقشة والمقارنة، بهدف تحقيق أقصى درجات الإفادة منها، و</span><span>استثمار أكبر قدر ممكن من النتاج
              الفكري لتتحول القراءة عند القارئ
              من مجرد اكتساب إلى عملية تبادلية فيها الاكتساب والنتاج المتولد
              عنها</span><span>، إيمانًا منا أن إعمال الذهن فيما تتعلم، وتوثيقه كتابيًا يعد
              وسيلة أساسية للابتكار والتطور وتحقيق النهضة.</span>
          </p>
          <p>
            <span>لقد قام فريق مختص بمتابعة القارئ و قام فريق مدرب على تقييم إنجازه
              ضمن خطة منهجية ومعايير محددة مسبقًا، اعتمدت على قراءة الأفكار
              الأساسية والفرعية الموجودة في الكتاب، وتقديم تغذية راجعة للأطروحات
              المقدّمة للمساهمة في رفع استفادة الفرد من حصيلة ما قد قرأ وتعزيز
              مهارات القراءة الفعّالة من خلال مناقشات وحوارات، وتمكينه من ترسيخ
              أفكار المادة المقروءة وتحويلها إلى أسئلة معرفية، وكلمات دلالية،
              وملخصات مرجعية، وأطروحات ناتجة عن حصاد ذلك كله.</span>
          </p>
          <p>
            <strong><span><br />
                <u>التقديرات التي حصل عليها القارئ كما يلي: </u></span></strong>
          </p>

          <p>
            - السؤال العام المقدم من القارئ تقديره (
            
            <span
              v-bind:class="(degrees.general_summary_grade <= 100 && degrees.general_summary_grade > 94) ? 'highlight' : ''">امتياز</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.general_summary_grade <= 94 && degrees.general_summary_grade > 89) ? 'highlight' : ''">ممتاز</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.general_summary_grade <= 89 && degrees.general_summary_grade > 84) ? 'highlight' : ''">جيد
              جدا</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.general_summary_grade <= 84 && degrees.general_summary_grade > 79) ? 'highlight' : ''">جيد</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.general_summary_grade <= 79 && degrees.general_summary_grade > 69) ? 'highlight' : ''">مقبول)</span>
          </p>
          <p>
            - الأسئلة المعرفية المقدمة من القارئ تقديرها (
            <span
              v-bind:class="(degrees.check_reading_grade <= 100 && degrees.check_reading_grade > 94) ? 'highlight' : ''">امتياز</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.check_reading_grade <= 94 && degrees.check_reading_grade > 89) ? 'highlight' : ''">ممتاز</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.check_reading_grade <= 89 && degrees.check_reading_grade > 84) ? 'highlight' : ''">جيد
              جدا</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.check_reading_grade <= 84 && degrees.check_reading_grade > 79) ? 'highlight' : ''">جيد</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.check_reading_grade <= 79 && degrees.check_reading_grade > 69) ? 'highlight' : ''">مقبول)</span>

          </p>
          <p>
            - الأطروحات المقدمة من القارئ تقديرها (
            <span
              v-bind:class="(degrees.thesis_grade <= 100 && degrees.thesis_grade > 94) ? 'highlight' : ''">امتياز</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.thesis_grade <= 94 && degrees.thesis_grade > 89) ? 'highlight' : ''">ممتاز</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span v-bind:class="(degrees.thesis_grade <= 89 && degrees.thesis_grade > 84) ? 'highlight' : ''">جيد
              جدا</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.thesis_grade <= 84 && degrees.thesis_grade > 79) ? 'highlight' : ''">جيد</span>
            <strong><span style="color: #00b050">||</span></strong>
            <span
              v-bind:class="(degrees.thesis_grade <= 79 && degrees.thesis_grade > 69) ? 'highlight' : ''">مقبول)</span>
          </p>
        </div>
      </div>
      <div class="page">
        <div class="page-content">
          <p class="sub-header">شرح آلية تقدم القارئ للحصول على التوثيق</p>
          <p class="break-space">&nbsp;</p>

          <p>
            يقوم القارئ باختيار كتاب منهجي من مكتبة أصبوحة وقراءته، ثمّ يطلب منه
            كتابة من8 أطروحات كحدّ أدنى إلى 12 كحدّ أقصى، تخضع هذه الأطروحات
            للتدقيق من قبل الفريق المختص، ثمّ تأتي مرحلة تأكيد القراءة الفاحصة
            من خلال تلخيص الفكرة العامة للكتاب، وطرح سؤال عام لمحتواه ثم
            تحديد(5- 12) سؤالا شاملاً لمضامين الكتاب مع ذكر أرقام الصفحات التي
            تعالجها هذه الأسئلة، وإرفاق الإجابات النموذجية لها كاقتباسات صحيحة
            للأسئلة. ويتم قياس نتاج الحصيلة المعرفية الناتجة عن المادة المقروءة
            من الكتاب من خلال اختبار مستوى الأطروحات الناتجة عن الأسئلة المعرفية
            والتلاخيص المستفادة.
          </p>
          <p style="color: #00b050">
            تنشر كافة ملفات التوثيق في الموقع الرسمي لمشروع صناعة القراء
            (أصبوحة180) وذلك لإتاحة التحقق من مصداقية منح المشروع للوثائق
            لحامليها.
          </p>
          <p class="break-space">&nbsp;</p>
          <p class="break-space">&nbsp;</p>
          <p class="break-space">&nbsp;</p>
          <p class="sub-header">
            نرفق لكم في الصفحات التالية نموذج الطلب المقدمن من القارئ والتي
            رشحته للحصول على هذا الاستحقاق وهذه التقديرات.
          </p>
        </div>
      </div>

      <!-- ##### GENERAL INFORMATION ##### -->
      <div class="page">
        <div class="page-content">
          <p class="main-header" style="text-align: center">
            <u><span>التلخيص العام</span></u>
          </p>
          <p class="mb-0 text-primary">
            التقييم ||
            {{ getDegree(degrees.general_summary_grade) }}
          </p>
          <p class="sub-header">السؤال العام</p>
          <p>
            {{ information.general_information.general_question }}
          </p>
          <p class="sub-header">التلخيص العام</p>

          <p>
            {{ information.general_information.summary }}
          </p>
        </div>
      </div>
      <!-- ##### END GRNRRAL INFORMATION ##### -->

      <!-- ##### THESES ##### -->
      <div class="page" v-for="(thesis, index) in information.thesises" :key="index">
        <div class="page-content">
          <p v-if="index === 0" class="main-header" style="text-align: center">
            <u><span>الأطروحات</span></u>
          </p>
          <p class="break-space">&nbsp;</p>
          <p class="break-space">&nbsp;</p>

          <p class="sub-header">أطروحة {{ index + 1 }}</p>
          <p class="mb-0 text-primary">
            التقييم || {{ getDegree(thesis.degree) }}
          </p>
          <p>
            {{ thesis.thesis_text }}
          </p>
        </div>
      </div>

      <!-- ##### END THESES ##### -->

      <!-- ##### QUESTIONS ##### -->
      <div class="page" v-for="(question, index) in information.questions" :key="index">
        <div class="page-content">
          <p class="main-header" style="text-align: center">
            <u><span>الأسئلة المعرفية</span></u>
          </p>
          <p class="break-space">&nbsp;</p>
          <p class="sub-header">سؤال {{ index + 1 }}</p>
          <p class="mb-0 text-primary">
            التقييم || {{ getDegree(question.degree) }}
          </p>
          <p>
            {{ question.question }}
          </p>
          <p class="sub-header">الاقتباسات</p>
          <ul>
            <li v-for="(quote, index) in question.quotation" :key="index">
              <p class="quote" dir="rtl">
                {{ quote.text }}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- ##### END QUESTIONS ##### -->
    </div>
  </div>
</template>
<script>
import html2pdf from "html2pdf.js";
import certificateServices from "../../api/certificateServices";
import moment from 'moment';

export default {
  name: "Certificate",
  async created() {
    await this.getData();
  },
  data() {
    return {
      degrees: {},
      information: {
        user: {},
        book: {},
        questions: {},
        general_information: {},
        thesises: {}
      }
    };
  },
  methods: {
    formatDate(value) {
        return moment(String(value)).format('MM/DD/YYYY')
    },
    async getData() {
      const response = await certificateServices.fullCretificate(
        this.$route.params.id
      );
      this.degrees = response.degrees;
      this.information = response.information[0]

    },
    getDegree(degree) {
      let textDegree = "";

      if (degree <= 100 && degree > 94) textDegree = "امتياز";
      else if (degree < 95 && degree > 89.9) textDegree = "ممتاز";
      else if (degree < 90 && degree > 84.9) textDegree = "جيد جدا";
      else if (degree < 85 && degree > 79.9) textDegree = "جيد";
      else if (degree > 69.9 && degree < 80) textDegree = "مقبول";

      return textDegree;
    },
    exportToPDF() {
      html2pdf(document.getElementById("mainpage"), {
        // eslint-disable-next-line
        image: { type: "jpg", quality: 20 },
        html2canvas: { scale: 2 },
        filename: this.filename,
      });
    },
  },
  computed:{
    filename(){
      return this.formatDate(this.information.created_at)+this.information.user.name
    }
  }

};
</script>

<style scoped>
.get-certificate-btn {
  position: fixed;
  font-size: 20px;
}

.page-content {
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
}

.pageWithCertificate {
  background-image: url("../../assets/images/test.png");
  font-family: "Calibri, sans-serif";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 210mm;
  height: 297mm;
  background-size: cover;
  background-position: center;
  margin: auto auto;
  color: black;
}

.page {
  font-family: "Calibri, sans-serif";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 210mm;
  height: 297mm;
  background-image: url("../../assets/images/certificateWithouSignature.png");
  background-size: cover;
  background-position: center;
  margin: auto auto;
  color: black;
}

.page p,
.pageWithCertificate p {
  font-size: 14pt;
  margin-left: 1px;
  margin-bottom: 10pt;
  line-height: 150%;
  direction: rtl;
  text-align: right;
}

.page .main-header,
.pageWithCertificate .main-header {
  line-height: 115%;
  font-weight: bold;
  font-size: 36pt;
}

.page .sub-header,
.pageWithCertificate .sub-header {
  line-height: 115%;
  font-size: 18pt;
  font-weight: bold;
}
#mainpage{
  overflow:auto;
}
.page .break-space,
.pageWithCertificate .break-space {
  line-height: 115%;
}

.important-text {
  font-weight: bold;
}

.highlight {
  background-color: yellow;
  color: black;
}

.quote {
  font-size: 10pt !important;
}
</style> 