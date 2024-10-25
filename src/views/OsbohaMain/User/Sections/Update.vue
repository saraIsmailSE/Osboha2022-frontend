<template>
  <div class="col-sm-12 mt-3 text-center" v-if="user">
    <iq-card class="iq-card">
      <div class="iq-card-body p-3">
        <div class="iq-card-body profile-page p-0">
          <div class="profile-header">
            <div class="cover-container">
              <img :src="resolve_porfile_img(
                '1300x325',
                profileInfo.cover_picture,
                profileInfo.id
              )
                " alt="profile-bg" class="rounded img-fluid" v-if="profileInfo && profileInfo.cover_picture" />

              <img src="@/assets/images/main/book-banner.png" alt="profile-bg" class="rounded img-fluid" v-else />
            </div>
          </div>
        </div>
        <div class="profile-img">
          <img :src="resolve_porfile_img(
            '150x150',
            profileInfo.profile_picture,
            profileInfo.id
          )
            " alt="profile-img" class="avatar-130 img-fluid" style="border: 4px solid #1d1a55"
            v-if="profileInfo && profileInfo.profile_picture" />

          <img src="@/assets/images/main/reader.png" alt="profile-img" class="avatar-130 img-fluid"
            style="border: 4px solid #1d1a55" v-else />
        </div>
        <div class="mt-3 row">
          <div class="form-group col-6">
            <label class="form-label" for="profile_picture">
              صورة الملف الشخصي
            </label>
            <input class="form-control" type="file" name="profile_picture" id="profile_picture" ref="profile_picture"
              accept="image/*" @change="submitProfilePic" />
          </div>
          <div class="form-group col-6">
            <label class="form-label" for="cover_picture"> صورة الغلاف </label>
            <input class="form-control" type="file" name="cover_picture" id="cover_picture" ref="cover_picture"
              accept="image/*" @change="submitProfileCover" />
          </div>
        </div>
      </div>
    </iq-card>


    <update-user-name />

    <iq-card class="iq-card" v-if="(user.allowed_to_eligible == 2 || user.allowed_to_eligible == 0)">
      <div class="iq-card-body p-3">
        <h1 class="text-center">
          توثيق الكتب
        </h1>
        <hr />

        <div class="mt-3 row"
          v-if="profileInfo && (profileInfo.first_name_ar && profileInfo.middle_name_ar && profileInfo.last_name_ar)">
          <div class="form-group col-6">
            <div class="image-block text-center">
              <img :src="official_document_image_src" class="img-fluid rounded w-50" alt="official_document"
                v-if="official_document_image_src != ''" />
              <img src="@/assets/images/main/stage2.png" class="img-fluid rounded w-50" alt="official_document"
                v-else />
            </div>
            <p class="mt-2 text-center">
              قم برفع وثيقة رسمية للتمكن من توثيق الكتب
              [تأكد من اسمك الكامل أولاً]
            </p>
          </div>
          <div class="m-auto form-group col-6">
            <label class="form-label" for="official_document">
              وثيقة رسمية [هوية - جواز سفر - ...]
            </label>
            <input class="form-control" type="file" name="official_document" id="official_document"
              ref="official_document" accept="image/*" @change="submitOfficialDocument" />
          </div>
        </div>
        <div class="mt-3 row" v-else>
          <h5 class="text-center" style="direction: rtl;">
            سنحتاج منك كتابة اسمك كاملًا حسب الوثائق الرسمية (جواز سفر / بطاقة شخصية / شهادة المرور) ليتسنى لك توثيق
            قراءتك بشكل رسمي في قاعدة البيانات. سيتم حذف التوثيق الخاص بكل الحسابات الوهمية.
          </h5>

        </div>

      </div>
    </iq-card>
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">البيانات الشخصية</h3>
      </div>
      <div class="iq-card-body p-3">
        <div class="image-block text-center">
          <img src="@/assets/images/main/update-profile-info.png" class="img-fluid rounded w-50" alt="profile-img" />
        </div>

        <div class="d-flex align-items-center mt-3">
          <form @submit.prevent="submitProfileInfo" class="post-text ml-3 w-100 row">
            <div class="form-group col-12">
              <h4>اسمك الكامل بالعربية</h4>
              <div class="form-group row">
                <input type="text" class="form-control mt-2" name="first_name_ar" id="first_name_ar"
                  v-model="infoForm.first_name_ar" placeholder="الاسم الأول" />
              </div>
              <div class="form-group row">
                <input type="text" class="form-control mt-2" name="middle_name_ar" id="middle_name_ar"
                  v-model="infoForm.middle_name_ar" placeholder="الاسم الثاني" />
              </div>
              <div class="form-group row">
                <input type="text" class="form-control mt-2" name="last_name_ar" id="last_name_ar"
                  v-model="infoForm.last_name_ar" placeholder="الاسم الأخير" />
              </div>
            </div>
            <div class="form-group col-12">
              <h4>تاريخ الميلاد</h4>
              <input type="date" class="form-control mt-2" name="birthdate" id="birthdate" v-model="infoForm.birthdate"
                placeholder="تاريخ الملاد" />
            </div>

            <div class="form-group col-12">
              <h4>الدولة</h4>
              <select class="form-select mt-2" v-model="infoForm.country">
                <option value="" selected>الدولة</option>
                <option v-for="(country, index) in COUNTRIES" :key="index" :value="index">
                  {{ country }}
                </option>
              </select>
            </div>
            <div class="form-group col-12">
              <h4>بلد الاقامة</h4>
              <select class="form-select mt-2" v-model="infoForm.resident">
                <option value="" selected>بلد الاقامة</option>
                <option v-for="(country, index) in COUNTRIES" :key="index" :value="index">
                  {{ country }}
                </option>
              </select>
            </div>
            <div class="form-group col-12">
              <h4>من أنا</h4>
              <div class="form-group row">
                <textarea rows="3" placeholder="نبذة عني" class="rounded form-control mt-2 col-12" id="bio"
                  v-model="v$.infoForm.bio.$model" name="bio" dir="rtl">
                </textarea>
                <span v-if="v$.infoForm.bio.$model"> {{ v$.infoForm.bio.$model.length }}/600 حرف</span>
              </div>
              <small style="color: red" v-if="v$.infoForm.bio.$error">
                قم بادخال نبدة عنك لا يزيد عدد حروفها عن 600 حرف
              </small>

              <div class="form-group row">
                <input type="text" class="form-control" name="fav_book" id="fav_book"
                  v-model="v$.infoForm.fav_book.$model" placeholder="كتابي المفضل" />
              </div>
              <small style="color: red" v-if="v$.infoForm.fav_book.$error">
                قم بادخال اسم كتاب لا يزيد عدد حروفه عن 250
              </small>

              <div class="form-group row">
                <input type="text" class="form-control" name="fav_writer" id="fav_writer"
                  v-model="v$.infoForm.fav_writer.$model" placeholder="الكاتب المفضل" />
              </div>
              <small style="color: red" v-if="v$.infoForm.fav_writer.$error">
                قم بادخال اسم كاتب لا يزيد عدد حروفه عن 250
              </small>

              <div class="form-group row">
                <input type="text" class="form-control" name="fav_quote" id="fav_quote"
                  v-model="v$.infoForm.fav_quote.$model" placeholder="الاقتباس المفضل" />
              </div>
              <small style="color: red" v-if="v$.infoForm.fav_quote.$error">
                قم بادخال اقتباس لا يزيد عدد حروفه عن 250
              </small>
            </div>
            <div class="form-group col-12">
              <h4>قسم القراءة المفضل</h4>
              <select class="form-select mt-2" data-trigger name="section" id="section" v-model="infoForm.fav_section">
                <option value="" selected>اختر قسمك المفضل</option>
                <option v-for="section in sections" :key="section.id" :value="section.section">
                  {{ section.section }}
                </option>
              </select>
            </div>
            <hr />
            <div class="form-group">
              <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                تعديل
              </button>
            </div>

            <div class="col-sm-12 text-center" v-if="loader">
              <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <h4 class="text-center mt-3 mb-3" v-if="message">{{ message }}</h4>
          </form>
        </div>
      </div>
    </iq-card>

    <!-- ########## update social media ########## -->
    <update-social-media />

    <!-- ########## reset email ########## -->
    <reset-email />

    <div class="d-flex align-items-center mt-3 row">
      <div class="d-inline-block w-100 text-center col-12">
        <a role="button" @click="back()" class="d-block mt-3 mb-3 w-75 mx-auto">
          <span>عودة للملف الشخصي</span>
          <span class="align-middle material-symbols-outlined">
            keyboard_return
          </span>
        </a>
      </div>
    </div>


  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
import UserProfile from "@/API/services/user-profile.service";
import profileImagesService from "@/API/services/profile.images.service";
import UserServices from "@/API/services/user.service";
import Auth from '@/API/services/auth.service'
import { COUNTRIES } from "@/utilities/constants";
import UserInfoService from "@/Services/userInfoService";
import UpdateSocialMedia from '@/components/user/UpdateSocialMedia';
import UpdateUserName from '@/components/user/UpdateUserName';
import ResetEmail from '@/components/user/ResetEmail';


export default {
  name: "update profile",
  components: { UpdateUserName, UpdateSocialMedia, ResetEmail },
  async created() {

    if ((this.user.allowed_to_eligible == 0 || this.user.allowed_to_eligible == 2)) {
      this.official_document_image_src = this.getOfficialDoc(this.user.id);
    }

    const response = await UserProfile.getUserProfileToUpdate();
    this.sections = response.sections;
    this.profileInfo = response.profileInfo;
    if (this.profileInfo) {
      this.infoForm.first_name_ar = this.profileInfo.first_name_ar;
      this.infoForm.middle_name_ar = this.profileInfo.middle_name_ar;
      this.infoForm.last_name_ar = this.profileInfo.last_name_ar;
      this.infoForm.birthdate = this.profileInfo.birthdate;
      this.infoForm.country = this.profileInfo.country;
      this.infoForm.resident = this.profileInfo.resident;
      this.infoForm.bio = this.profileInfo.bio;
      this.infoForm.fav_book = this.profileInfo.fav_book;
      this.infoForm.fav_quote = this.profileInfo.fav_quote;
      this.infoForm.fav_writer = this.profileInfo.fav_writer;
      this.infoForm.fav_section = this.profileInfo.fav_section;
    }
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loader: false,
      profileInfo: null,
      profilePictureForm: {
        profile_picture: [],
        cover_picture: [],
        official_document: [],
      },
      fileExtnError: null,
      COUNTRIES,
      infoForm: {
        first_name_ar: "",
        middle_name_ar: "",
        last_name_ar: "",
        country: "",
        resident: "",
        birthdate: "",
        bio: "",
        fav_book: "",
        fav_writer: "",
        fav_quote: "",
        fav_section: "",
      },
      sections: [],
      message: null,
      ofiicilaDocUploded: false,
      official_document_image_src: '',
    };
  },
  validations() {
    return {
      infoForm: {
        bio: {
          maxLength: maxLength(600),
        },
        fav_book: {
          maxLength: maxLength(100),
        },
        fav_writer: {
          maxLength: maxLength(100),
        },
        fav_quote: {
          maxLength: maxLength(300),
        },
      },
    };
  },
  methods: {
    /**
     * update profile Information.
     */
    async submitProfileInfo() {
      this.v$.$touch();
      if (!this.v$.infoForm.$invalid) {
        this.message = "";
        this.loader = true;
        try {
          const response = await UserProfile.update(this.infoForm);
          this.loader = false;
          this.profileInfo = response;
          this.message = 'تم التعديل بنجاح';
          this.v$.infoForm.$reset();
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * update profile picture.
     * @return updated profile
     */
    async submitProfilePic() {
      this.profilePictureForm.profile_picture =
        this.$refs.profile_picture.files;
      const response = await UserProfile.updateProfilePic(
        this.profilePictureForm
      );
      this.profileInfo = response;
      this.$refs.profile_picture.value = null;
      this.$store.commit("SET_PROFILE_PICTURE", response.profile_picture);
    },

    /**
     * update profile cover.
     * @return updated profile
     */
    async submitProfileCover() {
      this.profilePictureForm.cover_picture = this.$refs.cover_picture.files;
      const response = await UserProfile.updateProfileCover(
        this.profilePictureForm
      );
      this.profileInfo = response;
      this.$refs.cover_picture.value = null;
    },
    /**
    * update official document.
    * @return updated official document
    */
    async submitOfficialDocument() {
      this.profilePictureForm.official_document = this.$refs.official_document.files;
      const response = await UserProfile.updateOfficialDocument(
        this.profilePictureForm
      );
      this.official_document_image_src = '@/assets/images/main/stage2.png'
      this.official_document_image_src = this.getOfficialDoc(this.user.id);

      this.ofiicilaDocUploded = true;
      this.user = await UserServices.getInfo(this.$route.params.user_id)
      this.$refs.official_document.value = null;
      location.reload()
    },

    /**
     * get profile picture or cover.
     *  @param  image size, image name, profile id
     * @return image url
     */
    resolve_porfile_img(size, imageName, profile_id) {
      return profileImagesService.resolve_porfile_img(
        size,
        imageName,
        profile_id
      );
    },



    /**
     * get gOfficial Doc.
     *  @param  user id
     * @return image url
     */
    getOfficialDoc(user_id) {
      return profileImagesService.getOfficialDoc(user_id);
    },
    /**
     * redirect to user profile.
     */
    back() {
      this.$router.push({
        name: "user.profile",
        params: { user_id: this.$route.params.user_id },
      });
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    supervisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "supervisor",
      ]);
    },
    eligibleTeam() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        'eligible_admin',
        'reviewer',
        'auditor',
        'user_accept',
        'super_auditer',
        'super_reviewer'
      ]);
    },

  },
};

</script>