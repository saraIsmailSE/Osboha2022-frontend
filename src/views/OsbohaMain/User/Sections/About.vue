<template>
  <div class="row">
    <div class="col-md-3">
      <tab-nav :pills="true" id="tab" class="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
        <tab-nav-items :active="true" id="pills-contact-info" href="#contact-info" ariaControls="pills-contact-info"
          role="tab" :ariaSelected="true" title="معلومات التواصل" />
        <tab-nav-items :active="false" id="pills-about-info" href="#about-info" ariaControls="pills-about-info"
          role="tab" :ariaSelected="true" title="من أنا" />
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
              <div class="row mt-2" v-if="social_media && (isAgroupAdministrators || isAFriend)">
                <!-- FACEBOOK -->
                <div class="col-12 d-flex mt-1" v-if="social_media.facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="25" height="25" x="0" y="0" viewBox="0 0 112.196 112.196"
                    style="enable-background:new 0 0 75 75" xml:space="preserve" class="align-middle">
                    <g>
                      <circle cx="56.098" cy="56.098" r="56.098" style="" fill="#3b5998" data-original="#3b5998"
                        class="">
                      </circle>
                      <path
                        d="M70.201 58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34c0-5.964 2.833-15.303 15.301-15.303l11.234.047v12.51h-8.151c-1.337 0-3.217.668-3.217 3.513v7.585h11.334l-1.325 12.876z"
                        style="" fill="#ffffff" data-original="#ffffff" class=""></path>
                    </g>
                  </svg>
                  <a :href="social_media.facebook" target="_blank" class="badge bg-light text-dark ms-1">
                    اضغط هنا
                  </a>
                </div>
                <!-- INSTAGRAM -->
                <div class="col-12 d-flex mt-1" v-if="social_media.instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="25" height="25" x="0" y="0" viewBox="0 0 551.034 551.034"
                    style="enable-background:new 0 0 75 75" xml:space="preserve" class="align-middle">
                    <g>
                      <linearGradient id="a" x1="275.517" x2="275.517" y1="4.57" y2="549.72"
                        gradientTransform="matrix(1 0 0 -1 0 554)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" style="stop-color:#E09B3D" stop-color="#e09b3d"></stop>
                        <stop offset=".3" style="stop-color:#C74C4D" stop-color="#c74c4d">
                        </stop>
                        <stop offset=".6" style="stop-color:#C21975" stop-color="#c21975">
                        </stop>
                        <stop offset="1" style="stop-color:#7024C4" stop-color="#7024c4"></stop>
                      </linearGradient>
                      <path
                        d="M386.878 0H164.156C73.64 0 0 73.64 0 164.156v222.722c0 90.516 73.64 164.156 164.156 164.156h222.722c90.516 0 164.156-73.64 164.156-164.156V164.156C551.033 73.64 477.393 0 386.878 0zM495.6 386.878c0 60.045-48.677 108.722-108.722 108.722H164.156c-60.045 0-108.722-48.677-108.722-108.722V164.156c0-60.046 48.677-108.722 108.722-108.722h222.722c60.045 0 108.722 48.676 108.722 108.722v222.722z"
                        style="fill:url(#a);" fill=""></path>
                      <linearGradient id="b" x1="275.517" x2="275.517" y1="4.57" y2="549.72"
                        gradientTransform="matrix(1 0 0 -1 0 554)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" style="stop-color:#E09B3D" stop-color="#e09b3d"></stop>
                        <stop offset=".3" style="stop-color:#C74C4D" stop-color="#c74c4d">
                        </stop>
                        <stop offset=".6" style="stop-color:#C21975" stop-color="#c21975">
                        </stop>
                        <stop offset="1" style="stop-color:#7024C4" stop-color="#7024c4"></stop>
                      </linearGradient>
                      <path
                        d="M275.517 133C196.933 133 133 196.933 133 275.516s63.933 142.517 142.517 142.517S418.034 354.1 418.034 275.516 354.101 133 275.517 133zm0 229.6c-48.095 0-87.083-38.988-87.083-87.083s38.989-87.083 87.083-87.083c48.095 0 87.083 38.988 87.083 87.083 0 48.094-38.989 87.083-87.083 87.083z"
                        style="fill:url(#b);" fill=""></path>
                      <linearGradient id="c" x1="418.31" x2="418.31" y1="4.57" y2="549.72"
                        gradientTransform="matrix(1 0 0 -1 0 554)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" style="stop-color:#E09B3D" stop-color="#e09b3d"></stop>
                        <stop offset=".3" style="stop-color:#C74C4D" stop-color="#c74c4d">
                        </stop>
                        <stop offset=".6" style="stop-color:#C21975" stop-color="#c21975">
                        </stop>
                        <stop offset="1" style="stop-color:#7024C4" stop-color="#7024c4"></stop>
                      </linearGradient>
                      <circle cx="418.31" cy="134.07" r="34.15" style="fill:url(#c);" fill="">
                      </circle>
                    </g>
                  </svg>
                  <a :href="social_media.instagram" target="_blank" class="badge bg-light text-dark ms-1">
                  </a>
                </div>
                <!-- WHATSAPP -->
                <div class="col-12 d-flex mt-1" v-if="social_media.whatsapp">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="25" height="25" x="0" y="0" viewBox="0 0 152 152" style="enable-background:new 0 0 25 25"
                    xml:space="preserve" class="align-middle me-2">
                    <g>
                      <g data-name="Layer 2">
                        <g data-name="08.whatsapp">
                          <circle cx="76" cy="76" r="76" fill="#2aa81a" opacity="1" data-original="#2aa81a" class="">
                          </circle>
                          <g fill="#fff">
                            <path
                              d="M102.81 49.19a37.7 37.7 0 0 0-60.4 43.62l-4 19.42a1.42 1.42 0 0 0 .23 1.13 1.45 1.45 0 0 0 1.54.6l19-4.51a37.7 37.7 0 0 0 43.6-60.26zm-5.94 47.37a29.56 29.56 0 0 1-34 5.57l-2.66-1.32-11.67 2.76v-.15L51 91.65l-1.3-2.56a29.5 29.5 0 0 1 5.43-34.27 29.53 29.53 0 0 1 41.74 0L97 55a29.52 29.52 0 0 1-.15 41.58z"
                              fill="#ffffff" opacity="1" data-original="#ffffff" class="">
                            </path>
                            <path
                              d="M95.84 88c-1.43 2.25-3.7 5-6.53 5.69-5 1.2-12.61 0-22.14-8.81l-.12-.11c-8.29-7.74-10.49-14.19-10-19.3.29-2.91 2.71-5.53 4.75-7.25a2.72 2.72 0 0 1 4.25 1l3.07 6.94a2.7 2.7 0 0 1-.33 2.76l-1.56 2a2.65 2.65 0 0 0-.21 2.95 29 29 0 0 0 5.27 5.86 31.17 31.17 0 0 0 7.3 5.23 2.65 2.65 0 0 0 2.89-.61l1.79-1.82a2.71 2.71 0 0 1 2.73-.76l7.3 2.09A2.74 2.74 0 0 1 95.84 88z"
                              fill="#ffffff" opacity="1" data-original="#ffffff" class="">
                            </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <p style="direction: rtl;"> واتساب : {{ social_media.whatsapp }}</p>
                </div>
                <!-- TELEGRAM -->
                <div class="col-12 d-flex mt-1" v-if="social_media.telegram">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="25" height="25" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512"
                    xml:space="preserve" class="align-middle me-2">
                    <g>
                      <circle cx="12" cy="12" r="12" fill="#039be5" opacity="1" data-original="#039be5" class="">
                      </circle>
                      <path fill="#ffffff"
                        d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z"
                        opacity="1" data-original="#ffffff" class=""></path>
                    </g>
                  </svg>
                  <p style="direction: rtl;"> تيليجرام : {{ social_media.telegram }}</p>
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
    groupAdministrators: {
      required: true,
    },
    friends: {
      required: true,
    }
  },
  data() {
    return {
      gender: { female: "أنثى", male: "ذكر" },
      COUNTRIES
    };
  },
  computed: {
    autUser() {
      return this.$store.getters.getUser;
    },
    isAgroupAdministrators() {
      return this.groupAdministrators.includes(this.autUser.id)
    },
    isAFriend(){
      return this.friends.includes(this.autUser.id)

    }
  }
};
</script>