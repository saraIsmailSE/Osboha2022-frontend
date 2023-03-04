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
                    <img src="@/assets/images/icon/mail.gif" alt="animated email" width="25" />
                  </h4>
                  <p class="mb-0 fs-6">{{ user_about.user.email }}</p>

                </div>
              </div>
              <!-- EMAIL -->
              <!-- COUNTRY -->
              <div class="row mt-2">
                <div class="col-12">
                  <h4 class="mb-1">
                    :
                    الدولة
                    <img src="https://flagcdn.com/24x18/ae.png"
                      srcset="https://flagcdn.com/48x36/ae.png 2x, https://flagcdn.com/72x54/ae.png 3x" width="24"
                      height="18" alt="United Arab Emirates">
                  </h4>
                  <p class="mb-0 fs-6">{{ user_about.country }}</p>

                </div>
              </div>
              <!-- COUNTRY -->

              <!-- RESIDENT -->
              <div class="row mt-2">
                <div class="col-12">
                  <h4 class="mb-1">
                    :
                    مكان الاقامة
                    <img src="https://flagcdn.com/24x18/tt.png" srcset="https://flagcdn.com/48x36/tt.png 2x, 
                    https://flagcdn.com/72x54/tt.png 3x" width="24" height="18" alt="Trinidad and Tobago">
                  </h4>
                  <p class="mb-0 fs-6">{{ user_about.resident }}</p>
                </div>
              </div>
              <!-- RESIDENT -->
            </div>
            <div class="col-3 m-auto">
              <div class="text-center">
                <img src="@/assets/images/avatar/avatar-03.jpg" alt="profile-img" class="w-100" />
              </div>
              <div class="row mt-2">
                <div class="col-4">
                  <a href="facebook.com"><img src="@/assets/images/icon/social/facebook.png" alt="facebook"
                      class="w-100" /></a>
                </div>
                <div class="col-4">
                  <a href="twitter.com"><img src="@/assets/images/icon/social/twitter_off.png" alt="twitter"
                      class="w-100" /></a>
                </div>
                <div class="col-4">
                  <a href="instagram.com"><img src="@/assets/images/icon/social/instagram.png" alt="instagram"
                      class="w-100" /></a>
                </div>
              </div>

            </div>
          </div>
          <div class="row">
            <hr class="mt-3">
            <h4 class="mt-2 text-center">معلومات اضافية</h4>

            <div class="row mt-2 m-auto">
              <!-- BIRTHDAY -->
              <div class="col-6">
                <h5 class="mb-1">
                  :
                  تاريخ الميلاد
                  <img src="@/assets/images/icon/cake.png" alt="birthday cake" width="25" />
                </h5>
                <p class="mb-0 text-center">{{ user_about.birthdate }}</p>

              </div>
              <!-- BIRTHDAY -->

              <!-- GENDER -->
              <div class="col-6">
                <h5 class="mb-1">
                  :
                  الجنس
                  <img src="@/assets/images/icon/female.png" alt="user gender" width="25" />
                </h5>
                <p class="mb-0 text-center">{{ user_about.user.gender }}</p>
              </div>
              <!-- GENDER -->

            </div>

          </div>
        </tab-content-item>
        <tab-content-item :active="false" id="about-info" aria-labelled-by="pills-about-info">
          <h4 class="mt-2">من أنا</h4>
          <hr>
          <h6 class="mb-1">نبذة</h6>
          <p>{{ user_about.bio }}</p>
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
                <p class="mb-0 fs-6" v-if="user_about.fav_book != ''">{{ user_about.fav_book }}</p>
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
                <p class="mb-0 fs-6" v-if="user_about.fav_writer != ''">{{ user_about.fav_writer }}</p>
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
                <p class="mb-0 fs-6" v-if="user_about.fav_quote != ''">{{ user_about.fav_quote }}</p>
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
export default {
  name: 'About',
  components: {
  },
  props: {
    user_about: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {

    }
  }

}
</script>
