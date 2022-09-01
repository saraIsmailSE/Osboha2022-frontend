<template>
  <div class="row">
    <div class="col-md-3">
      <tab-nav :pills="true" id="tab" class="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
        <tab-nav-items :active="true" id="pills-contact-info" href="#contact-info" ariaControls="pills-contact-info"
          role="tab" :ariaSelected="true" title="Contact and Basic Info" />
        <tab-nav-items :active="false" id="pills-about-info" href="#about-info" ariaControls="pills-about-info"
          role="tab" :ariaSelected="true" title="Hobbies and Interests" />
      </tab-nav>
    </div>
    <div class="col-md-9">
      <div class="tab-content">
        <tab-content-item :active="true" id="contact-info" aria-labelled-by="pills-contact-info">
          <h4>Contact Information</h4>
          <hr>
          <div class="row">
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>Email</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <p class="mb-0">Bnijohn@gmail.com</p>
            </div>
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>Mobile</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <p class="mb-0">(001) 4544 565 456</p>
            </div>
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>Country</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-9">
              <p class="mb-0">{{ user_profile.country }}</p>
            </div>
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>Occupation</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-9">
              <p class="mb-0" v-if="user_profile.occupation != ''">{{ user_profile.occupation }}</p>
              <p v-else>لا يوجد</p>
            </div>

            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>Resident</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-9">
              <p class="mb-0">{{ user_profile.resident }}</p>
            </div>
          </div>
          <h4 class="mt-3">Social Links</h4>
          <hr>
          <div class="row">
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>Facebook</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <p class="mb-0">www.bootstrap.com</p>
            </div>
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>Instagram</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <p class="mb-0">www.bootstrap.com</p>
            </div>
          </div>
          <h4 class="mt-3">Basic Information</h4>
          <hr>
          <div class="row">
            <div class="col-3">
              <h6>Birth Date</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ user_profile.birthdate }}</p>
            </div>
            <div class="col-3">
              <h6>Gender</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ user_profile.gender }}</p>
            </div>
            <div class="col-3">
              <h6>language</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">العربية</p>
            </div>
          </div>
          <div class="edit-relation">
            <a href="#" class="d-flex align-items-center">
              <span class="material-symbols-outlined me-2 md-18">
                edit
              </span>
              تعديل
            </a>
          </div>
        </tab-content-item>
        <tab-content-item :active="false" id="about-info" aria-labelled-by="pills-about-info">
          <h4 class="mt-2">Hobbies and Interests</h4>
          <hr>
          <h6 class="mb-1">من أنا</h6>
          <p>{{ user_profile.bio }}</p>
          <hr>

          <div class="row">
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>الكتاب المفضل</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-9">
              <p class="mb-0" v-if="user_profile.fav_book != ''">{{ user_profile.fav_book }}</p>
              <p v-else>لا يوجد</p>

            </div>
            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>الكاتب المفضل</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <p v-if="user_profile.fav_writer != ''">{{ user_profile.fav_writer }}</p>
              <p v-else>لا يوجد</p>
            </div>

            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>اقتباس مفضل</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <p v-if="user_profile.fav_quote != ''">{{ user_profile.fav_quote }}</p>
              <p v-else>لا يوجد</p>
            </div>


            <div class="col-3">
              <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <img src="../../assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <h6>قسم مفضل</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <p v-if="user_profile.fav_section != ''">{{ user_profile.fav_section }}</p>
              <p v-else>لا يوجد</p>
            </div>
          </div>
          <hr>
          <div class="row">
            <h6 class="mb-1">Extra Space </h6>
          <p>{{ user_profile.extraspace }}</p>
            
          </div>
          <div class="edit-relation">
            <a href="#" class="d-flex align-items-center">
              <span class="material-symbols-outlined me-2 md-18">
                edit
              </span>
              تعديل
            </a>
          </div>
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
  data() {
    return {
      user_profile:
      {
        first_name_ar: 'Paul',
        middle_name_ar: 'Molive',
        last_name_ar: 'Brothe',
        birthdate: '24 January - 1994',
        country: 'United States of America',
        resident: 'United States of America',
        phone: '(001) 4544 565 456',
        occupation: '',
        bio: `مرحبًا ، أنا Bni ، أبلغ من العمر 26 عامًا وأعمل كمصمم ويب. أحب ركوب الدراجة للعمل والسباحة وممارسة الرياضة. أحب أيضًا قراءة مجلات التصميم ، والذهاب إلى المتاحف ، والاستمتاع بمشاهدة برنامج تلفزيوني جيد أثناء هطول الأمطار في الخارج.`,
        fav_writer: 'WRITER',
        fav_book: 'BOOK',
        fav_section: 'SECTION',
        fav_quote: '',
        extraspace: '',
        gender: 'Female'


      },

    }
  }

}
</script>
