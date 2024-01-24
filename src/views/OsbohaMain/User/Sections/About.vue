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
          <h4>معلومات التواصل</h4>
          <hr />
          <div class="row">
            <div class="col-8">
              <!-- EMAIL -->
              <div class="row">
                <div class="col-12">
                  <h4 class="mb-1">
                    : البريد الالكتروني
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
                    : الدولة
                    <img :src="`https://flagcdn.com/24x18/${user_about.country.toLowerCase()}.png`"
                      :srcset="`https://flagcdn.com/48x36/${user_about.country.toLowerCase()}.png 2x, https://flagcdn.com/72x54/${user_about.country.toLowerCase()}.png 3x`"
                      width="24" height="18" :alt="COUNTRIES[user_about.country]" v-if="user_about.country" />
                  </h4>
                  <p class="mb-0 fs-6" v-if="user_about.country">
                    {{ COUNTRIES[user_about.country] }}
                  </p>
                  <p class="mb-0 fs-6" v-else>غير محدد</p>
                </div>
              </div>
              <!-- COUNTRY -->

              <!-- RESIDENT -->
              <div class="row mt-2">
                <div class="col-12">
                  <h4 class="mb-1">
                    : مكان الاقامة
                    <img v-if="user_about.resident"
                      :src="`https://flagcdn.com/24x18/${user_about.resident.toLowerCase()}.png`"
                      :srcset="`https://flagcdn.com/48x36/${user_about.resident.toLowerCase()}.png 2x, https://flagcdn.com/72x54/${user_about.resident.toLowerCase()}.png 3x`"
                      width="24" height="18" alt="United Arab Emirates" />
                  </h4>
                  <p class="mb-0 fs-6" v-if="user_about.resident">
                    {{ COUNTRIES[user_about.resident] }}
                  </p>
                  <p class="mb-0 fs-6" v-else>غير محدد</p>
                </div>
              </div>
              <!-- RESIDENT -->
            </div>
            <div class="col-3 m-auto">
              <div class="text-center">
                <BaseAvatar :profileImg="user.user_profile.profile_picture" :profile_id="user.user_profile.id"
                  :title="user.name" :gender="user.gender" avatarClass="rounded img-fluid" dimensions="512x512"
                  :noMainClass="true" />
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
            <hr class="mt-3" />
            <h4 class="mt-2">معلومات اضافية</h4>

            <div class="row mt-2 m-auto">
              <!-- BIRTHDAY -->
              <div class="col-6">
                <h5 class="mb-1">
                  : تاريخ الميلاد
                  <span class="material-symbols-outlined align-middle">
                    cake
                  </span>
                </h5>
                <p class="mb-0 text-center" v-if="user_about.birthdate">
                  {{ user_about.birthdate }}
                </p>
                <p class="mb-0 fs-6" v-else>غير محدد</p>
              </div>
              <!-- BIRTHDAY -->

              <!-- GENDER -->
              <div class="col-6">
                <h5 class="mb-1">
                  : الجنس
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
          <hr />
          <h6 class="mb-1">نبذة</h6>
          <p v-if="user_about.bio" style="white-space: pre-wrap; direction: rtl">
            {{ user_about.bio }}
          </p>
          <p class="mb-0 fs-6" v-else>لا يوجد</p>

          <hr />

          <div class="row">
            <!-- FAV BOOK -->
            <div class="row">
              <div class="col-12">
                <h4 class="mb-1">
                  : الكتاب المفضل
                  <span class="material-symbols-outlined align-middle">
                    auto_stories
                  </span>
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_book">
                  {{ user_about.fav_book }}
                </p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV BOOK -->

            <!-- FAV AUTHER -->
            <div class="row mt-2">
              <div class="col-12">
                <h4 class="mb-1">
                  : الكاتب المفضل
                  <span class="material-symbols-outlined align-middle">
                    attribution
                  </span>
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_writer">
                  {{ user_about.fav_writer }}
                </p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV AUTHER -->

            <!-- FAV QOUTE -->
            <div class="row mt-2">
              <div class="col-12">
                <h4 class="mb-1">
                  : الاقتباس المفضل
                  <span class="material-symbols-outlined align-middle">
                    format_quote
                  </span>
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_quote">
                  {{ user_about.fav_quote }}
                </p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV QOUTE -->

            <!-- FAV SECTION -->
            <div class="row mt-2">
              <div class="col-12">
                <h4 class="mb-1">
                  : القسم المفضل
                  <span class="material-symbols-outlined align-middle">
                    widgets
                  </span>
                </h4>
                <p class="mb-0 fs-6" v-if="user_about.fav_section != ''">
                  {{ user_about.fav_section }}
                </p>
                <p class="mb-0 fs-6" v-else>لا يوجد</p>
              </div>
            </div>
            <!-- FAV SECTION -->
          </div>
          <hr />
        </tab-content-item>
      </div>
    </div>
  </div>
</template>
<script>
import { COUNTRIES } from "@/utilities/constants";

export default {
  name: "About",
  components: {},
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
      gender: { female: "أنثى", male: "ذكر" },
      COUNTRIES
    };
  },
};
</script>
