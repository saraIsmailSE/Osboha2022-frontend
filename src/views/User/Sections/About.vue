<template>
  <div class="row">
    <div class="col-md-3">
      <tab-nav :pills="true" id="tab" class="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
        <tab-nav-items :active="true" id="pills-contact-info" href="#contact-info" ariaControls="pills-contact-info"
          role="tab" :ariaSelected="true" title="معلومات التواصل" />
        <tab-nav-items :active="false" id="pills-about-info" href="#about-info" ariaControls="pills-about-info" role="tab"
          :ariaSelected="true" title="من أنا" />
      </tab-nav>
    </div>
    <div class="col-md-9" v-if="user_about">
      <div class="tab-content">
        <tab-content-item :active="true" id="contact-info" aria-labelled-by="pills-contact-info">
          <h4> معلومات التواصل</h4>
          <hr>
          <div class="row">
            <div class="col-8">
              <!-- EMAIL -->
              <div class="row">
                <div class="col-12">
                  <h4 class="mb-1">
                    :
                    البريد الالكتروني
                    <span class="material-symbols-outlined align-middle">
                      mail
                    </span>
                  </h4>
                  <p class="mb-0 fs-6" v-if="user.email">{{ user.email }}</p>
                  <p class="mb-0 fs-6" v-else>غير محدد</p>

                </div>
              </div>
              <!-- EMAIL -->
              <!-- COUNTRY -->
              <div class="row mt-2">
                <div class="col-12">
                  <h4 class="mb-1">
                    :
                    الدولة
                    <img :src="`https://flagcdn.com/24x18/${user_about.country.toLowerCase()}.png`"
                      :srcset="`https://flagcdn.com/48x36/${user_about.country.toLowerCase()}.png 2x, https://flagcdn.com/72x54/${user_about.country.toLowerCase()}.png 3x`"
                      width="24" height="18" :alt="countries[user_about.country]" v-if="user_about.country">
                  </h4>
                  <p class="mb-0 fs-6" v-if="user_about.country">{{ countries[user_about.country] }}</p>
                  <p class="mb-0 fs-6" v-else>غير محدد</p>


                </div>
              </div>
              <!-- COUNTRY -->

              <!-- RESIDENT -->
              <div class="row mt-2">
                <div class="col-12">
                  <h4 class="mb-1">
                    :
                    مكان الاقامة
                    <img :src="`https://flagcdn.com/24x18/${user_about.resident.toLowerCase()}.png`"
                      :srcset="`https://flagcdn.com/48x36/${user_about.resident.toLowerCase()}.png 2x, https://flagcdn.com/72x54/${user_about.resident.toLowerCase()}.png 3x`"
                      width="24" height="18" alt="United Arab Emirates" v-if="user_about.resident">
                  </h4>
                  <p class="mb-0 fs-6" v-if="user_about.resident">{{ countries[user_about.resident] }}</p>
                  <p class="mb-0 fs-6" v-else>غير محدد</p>

                </div>
              </div>
              <!-- RESIDENT -->
            </div>
            <div class="col-3 m-auto">
              <div class="text-center">
                <img :src="resolve_porfile_img('512x512', user.profile.profile_picture, user.profile.id)"
                  alt="profile-img" class="rounded img-fluid" v-if="user.profile && user.profile.profile_picture" />

                <img v-else :src="resolve_porfile_img('512x512', 'ananimous_' + user.gender + '.png', 'ananimous')"
                  alt="profile-img" class="rounded img-fluid" :title="user.name">
              </div>
              <div class="row mt-2" v-if="social_media">
                <div class="col-4">
                  <a :href="social_media.facebook" target="_blank"><img src="@/assets/images/icon/social/facebook.png"
                      alt="facebook" class="w-100" /></a>
                </div>
                <div class="col-4">
                  <a :href="social_media.twitter" target="_blank"><img src="@/assets/images/icon/social/twitter_off.png"
                      alt="twitter" class="w-100" /></a>
                </div>
                <div class="col-4">
                  <a :href="social_media.instagram" target="_blank"><img src="@/assets/images/icon/social/instagram.png"
                      alt="instagram" class="w-100" /></a>
                </div>
              </div>

            </div>
          </div>
          <div class="row">
            <hr class="mt-3">
            <h4 class="mt-2">معلومات اضافية</h4>

            <div class="row mt-2 m-auto">
              <!-- BIRTHDAY -->
              <div class="col-6">
                <h5 class="mb-1">
                  :
                  تاريخ الميلاد
                  <span class="material-symbols-outlined align-middle">
                    cake
                  </span>
                </h5>
                <p class="mb-0 text-center" v-if="user_about.birthdate">{{ user_about.birthdate }}</p>
                <p class="mb-0 fs-6" v-else>غير محدد</p>
              </div>
              <!-- BIRTHDAY -->

              <!-- GENDER -->
              <div class="col-6">
                <h5 class="mb-1">
                  :
                  الجنس
                  <span class="material-symbols-outlined align-middle">
                    {{ user.gender }}
                  </span>
                </h5>
                <p class="mb-0 text-center">{{ gender[user.gender] }}</p>
              </div>
              <!-- GENDER -->

            </div>

          </div>
        </tab-content-item>
        <tab-content-item :active="false" id="about-info" aria-labelled-by="pills-about-info">
          <h4 class="mt-2">من أنا</h4>
          <hr>
          <h6 class="mb-1">نبذة</h6>
          <p v-if="user_about.bio">{{ user_about.bio }}</p>
          <p class="mb-0 fs-6" v-else>لا يوجد</p>

          <hr>

          <div class="row">

            <!-- FAV BOOK -->
            <div class="row">
              <div class="col-12">
                <h4 class="mb-1">
                  :
                  الكتاب المفضل
                  <img src="@/assets/images/icon/book.png" alt="fav book" width="25" />
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_book">{{ user_about.fav_book }}</p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV BOOK -->

            <!-- FAV AUTHER -->
            <div class="row mt-2">
              <div class="col-12">
                <h4 class="mb-1">
                  :
                  الكاتب المفضل
                  <img src="@/assets/images/icon/auther.png" alt="fav auther" width="25" />
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_writer">{{ user_about.fav_writer }}</p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV AUTHER -->

            <!-- FAV QOUTE -->
            <div class="row mt-2">
              <div class="col-12">
                <h4 class="mb-1">
                  :
                  الاقتباس المفضل
                  <img src="@/assets/images/icon/quotes.png" alt="fav quotes" width="25" />
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_quote">{{ user_about.fav_quote }}</p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV QOUTE -->

            <!-- FAV SECTION -->
            <div class="row mt-2">
              <div class="col-12">
                <h4 class="mb-1">
                  :
                  القسم المفضل
                  <img src="@/assets/images/icon/section.png" alt="fav section" width="25" />
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_section != ''">{{ user_about.fav_section }}</p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV SECTION -->
          </div>
          <hr>
        </tab-content-item>
      </div>
    </div>
  </div>
</template>
<script>
import profileImagesService from '@/API/services/profile.images.service';

export default {
  name: 'About',
  components: {
  },
  props: {
    user_about: {
      type: [Object],
      required: true,
    },
    social_media: {
      type: [Object],
    },
    user: {
      type: [Object],
      required: true,
    },

  },
  data() {
    return {
      gender: { "female": "أنثى", "male": "ذكر" },
      countries: {
        'SA': "المملكة العربية السعودية",
        'ET': "إثيوبيا",
        'AZ': "أذربيجان",
        'AM': "أرمينيا",
        'AW': "أروبا",
        'ER': "إريتريا",
        'ES': "أسبانيا",
        'AU': "أستراليا",
        'EE': "إستونيا",
        'IL': "إسرائيل",
        'AF': "أفغانستان",
        'IO': "إقليم المحيط الهندي البريطاني",
        'EC': "إكوادور",
        'AR': "الأرجنتين",
        'JO': "الأردن",
        'AE': "الإمارات العربية المتحدة",
        'AL': "ألبانيا",
        'BR': "البرازيل",
        'PT': "البرتغال",
        'BA': "البوسنة والهرسك",
        'GA': "الجابون",
        'DZ': "الجزائر",
        'DK': "الدانمارك",
        'CV': "الرأس الأخضر",
        'PS': "السلطة الفلسطينية",
        'SV': "السلفادور",
        'SN': "السنغال",
        'SD': "السودان",
        'SE': "السويد",
        'SO': "الصومال",
        'CN': "الصين",
        'IQ': "العراق",
        'PH': "الفلبين",
        'CM': "الكاميرون",
        'CG': "الكونغو",
        'CD': "الكونغو (جمهورية الكونغو الديمقراطية)",
        'KW': "الكويت",
        'DE': "ألمانيا",
        'HU': "المجر",
        'MA': "المغرب",
        'MX': "المكسيك",
        'UK': "المملكة المتحدة",
        'TF': "المناطق الفرنسية الجنوبية ومناطق انتراكتيكا",
        'NO': "النرويج",
        'AT': "النمسا",
        'NE': "النيجر",
        'IN': "الهند",
        'US': "الولايات المتحدة",
        'JP': "اليابان",
        'YE': "اليمن",
        'GR': "اليونان",
        'AQ': "أنتاركتيكا",
        'AG': "أنتيغوا وبربودا",
        'AD': "أندورا",
        'ID': "إندونيسيا",
        'AO': "أنغولا",
        'AI': "أنغويلا",
        'UY': "أوروجواي",
        'UZ': "أوزبكستان",
        'UG': "أوغندا",
        'UA': "أوكرانيا",
        'IR': "إيران",
        'IE': "أيرلندا",
        'IS': "أيسلندا",
        'IT': "إيطاليا",
        'PG': "بابوا-غينيا الجديدة",
        'PY': "باراجواي",
        'BB': "باربادوس",
        'PK': "باكستان",
        'PW': "بالاو",
        'BM': "برمودا",
        'BN': "بروناي",
        'BE': "بلجيكا",
        'BG': "بلغاريا",
        'BD': "بنجلاديش",
        'PA': "بنما",
        'BJ': "بنين",
        'BT': "بوتان",
        'BW': "بوتسوانا",
        'PR': "بورتو ريكو",
        'BF': "بوركينا فاسو",
        'BI': "بوروندي",
        'PL': "بولندا",
        'BO': "بوليفيا",
        'PF': "بولينزيا الفرنسية",
        'PE': "بيرو",
        'BY': "بيلاروس",
        'BZ': "بيليز",
        'TH': "تايلاند",
        'TW': "تايوان",
        'TM': "تركمانستان",
        'TR': "تركيا",
        'TT': "ترينيداد وتوباجو",
        'TD': "تشاد",
        'CL': "تشيلي",
        'TZ': "تنزانيا",
        'TG': "توجو",
        'TV': "توفالو",
        'TK': "توكيلاو",
        'TO': "تونجا",
        'TN': "تونس",
        'TP': "تيمور الشرقية (تيمور الشرقية)",
        'JM': "جامايكا",
        'GM': "جامبيا",
        'GI': "جبل طارق",
        'GL': "جرينلاند",
        'AN': "جزر الأنتيل الهولندية",
        'PN': "جزر البتكارين",
        'BS': "جزر البهاما",
        'VG': "جزر العذراء البريطانية",
        'VI': "جزر العذراء، الولايات المتحدة",
        'KM': "جزر القمر",
        'CC': "جزر الكوكوس (كيلين)",
        'MV': "جزر المالديف",
        'TC': "جزر تركس وكايكوس",
        'AS': "جزر ساموا الأمريكية",
        'SB': "جزر سولومون",
        'FO': "جزر فايرو",
        'UM': "جزر فرعية تابعة للولايات المتحدة",
        'FK': "جزر فوكلاند (أيزلاس مالفيناس)",
        'FJ': "جزر فيجي",
        'KY': "جزر كايمان",
        'CK': "جزر كوك",
        'MH': "جزر مارشال",
        'MP': "جزر ماريانا الشمالية",
        'CX': "جزيرة الكريسماس",
        'BV': "جزيرة بوفيه",
        'IM': "جزيرة مان",
        'NF': "جزيرة نورفوك",
        'HM': "جزيرة هيرد وجزر ماكدونالد",
        'CF': "جمهورية أفريقيا الوسطى",
        'CZ': "جمهورية التشيك",
        'DO': "جمهورية الدومينيكان",
        'ZA': "جنوب أفريقيا",
        'GT': "جواتيمالا",
        'GP': "جواديلوب",
        'GU': "جوام",
        'GE': "جورجيا",
        'GS': "جورجيا الجنوبية وجزر ساندويتش الجنوبية",
        'GY': "جيانا",
        'GF': "جيانا الفرنسية",
        'DJ': "جيبوتي",
        'JE': "جيرسي",
        'GG': "جيرنزي",
        'VA': "دولة الفاتيكان",
        'DM': "دومينيكا",
        'RW': "رواندا",
        'RU': "روسيا",
        'RO': "رومانيا",
        'RE': "ريونيون",
        'ZM': "زامبيا",
        'ZW': "زيمبابوي",
        'WS': "ساموا",
        'SM': "سان مارينو",
        'PM': "سانت بيير وميكولون",
        'VC': "سانت فينسنت وجرينادينز",
        'KN': "سانت كيتس ونيفيس",
        'LC': "سانت لوشيا",
        'SH': "سانت هيلينا",
        'ST': "ساوتوماي وبرينسيبا",
        'SJ': "سفالبارد وجان ماين",
        'SK': "سلوفاكيا",
        'SI': "سلوفينيا",
        'SG': "سنغافورة",
        'SZ': "سوازيلاند",
        'SY': "سوريا",
        'SR': "سورينام",
        'CH': "سويسرا",
        'SL': "سيراليون",
        'LK': "سيريلانكا",
        'SC': "سيشل",
        'RS': "صربيا",
        'TJ': "طاجيكستان",
        'OM': "عمان",
        'GH': "غانا",
        'GD': "غرينادا",
        'GN': "غينيا",
        'GQ': "غينيا الاستوائية",
        'GW': "غينيا بيساو",
        'VU': "فانواتو",
        'FR': "فرنسا",
        'VE': "فنزويلا",
        'FI': "فنلندا",
        'VN': "فيتنام",
        'CY': "قبرص",
        'QA': "قطر",
        'KG': "قيرقيزستان",
        'KZ': "كازاخستان",
        'NC': "كاليدونيا الجديدة",
        'KH': "كامبوديا",
        'HR': "كرواتيا",
        'CA': "كندا",
        'CU': "كوبا",
        'CI': "كوت ديفوار (ساحل العاج)",
        'KR': "كوريا",
        'KP': "كوريا الشمالية",
        'CR': "كوستاريكا",
        'CO': "كولومبيا",
        'KI': "كيريباتي",
        'KE': "كينيا",
        'LV': "لاتفيا",
        'LA': "لاوس",
        'LB': "لبنان",
        'LI': "لختنشتاين",
        'LU': "لوكسمبورج",
        'LY': "ليبيا",
        'LR': "ليبيريا",
        'LT': "ليتوانيا",
        'LS': "ليسوتو",
        'MQ': "مارتينيك",
        'MO': "ماكاو",
        'FM': "ماكرونيزيا",
        'MW': "مالاوي",
        'MT': "مالطا",
        'ML': "مالي",
        'MY': "ماليزيا",
        'YT': "مايوت",
        'MG': "مدغشقر",
        'EG': "مصر",
        'MK': "مقدونيا، جمهورية يوغوسلافيا السابقة",
        'BH': "مملكة البحرين",
        'MN': "منغوليا",
        'MR': "موريتانيا",
        'MU': "موريشيوس",
        'MZ': "موزمبيق",
        'MD': "مولدوفا",
        'MC': "موناكو",
        'MS': "مونتسيرات",
        'ME': "مونتينيغرو",
        'MM': "ميانمار",
        'NA': "ناميبيا",
        'NR': "ناورو",
        'NP': "نيبال",
        'NG': "نيجيريا",
        'NI': "نيكاراجوا",
        'NU': "نيوا",
        'NZ': "نيوزيلندا",
        'HT': "هايتي",
        'HN': "هندوراس",
        'NL': "هولندا",
        'HK': "هونغ كونغ SAR",
        'WF': "واليس وفوتونا"
      },
    }
  },
  methods: {
    /**
* get profile picture or cover.
*  @param  image size, image name, profile id
* @return image url
*/

    resolve_porfile_img(size, imageName, profile_id) {
      return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
    },


  },

}
</script>
