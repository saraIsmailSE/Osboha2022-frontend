<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card">
            <div class="iq-card-body p-3">
                <div class="iq-card-body profile-page p-0">
                    <div class="profile-header">
                        <div class="cover-container">
                            <img :src="resolve_porfile_img('1300x325', profileInfo.cover_picture, profileInfo.id)"
                                alt="profile-bg" class="rounded img-fluid"
                                v-if="profileInfo && profileInfo.cover_picture" />

                            <img src="@/assets/images/main/book-banner.png" alt="profile-bg" class="rounded img-fluid"
                                v-else>
                        </div>
                    </div>
                </div>
                <div class="profile-img">

                    <img :src="resolve_porfile_img('150x150', profileInfo.profile_picture, profileInfo.id)"
                        alt="profile-img" class="avatar-130 img-fluid" style="border: 4px solid #1D1A55;"
                        v-if="profileInfo && profileInfo.profile_picture" />
                    <img src="@/assets/images/avatar/avatar-03.jpg" alt="profile-img" class="avatar-130 img-fluid"
                        style="border: 4px solid #1D1A55;" v-else />
                </div>
                <div class="mt-3 row">
                    <div class="form-group col-6">
                        <label class="form-label" for="profile_picture">
                            صورة الملف الشخصي
                        </label>
                        <input class="form-control" type="file" name="profile_picture" id="profile_picture"
                            ref="profile_picture" accept="image/*" @change="submitProfilePic" />
                    </div>
                    <div class="form-group col-6">
                        <label class="form-label" for="cover_picture">
                            صورة الغلاف
                        </label>
                        <input class="form-control" type="file" name="cover_picture" id="cover_picture" ref="cover_picture"
                            accept="image/*" @change="submitProfileCover" />


                    </div>
                </div>
            </div>
        </iq-card>
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    البيانات الشخصية
                </h3>
            </div>
            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/update-profile-info.png" class="img-fluid rounded w-50"
                        alt="profile-img">
                </div>

                <div class="d-flex align-items-center mt-3">
                    <form @submit.prevent="submitProfileInfo" class="post-text ml-3 w-100 row">
                        <div class="form-group col-12">
                            <h4>اسمك الكامل بالعربية</h4>
                            <div class="form-group row">
                                <input type="text" class="form-control mt-2" name="first_name_ar" id="first_name_ar"
                                    v-model="v$.infoForm.first_name_ar.$model" placeholder="الاسم الأول">
                            </div>
                            <small style="color:red;" v-if="v$.infoForm.first_name_ar.$error">
                                قم بادخال الاسم الأول
                            </small>
                            <div class="form-group row">
                                <input type="text" class="form-control mt-2" name="middle_name_ar" id="middle_name_ar"
                                    v-model="infoForm.middle_name_ar" placeholder="الاسم الثاني">
                            </div>
                            <div class="form-group row">
                                <input type="text" class="form-control mt-2" name="last_name_ar" id="last_name_ar"
                                    v-model="v$.infoForm.last_name_ar.$model" placeholder="الاسم الأخير">
                            </div>
                            <small style="color:red;" v-if="v$.infoForm.last_name_ar.$error">
                                قم بادخال الاسم الأخير
                            </small>
                        </div>
                        <div class="form-group col-12">
                                <h4>تاريخ الميلاد</h4>
                                <input type="date" class="form-control mt-2" name="birthdate" id="birthdate"
                                    v-model="infoForm.birthdate" placeholder="تاريخ الملاد">
                            </div>

                        <div class="form-group col-12">
                            <h4>الدولة</h4>
                            <select class="form-select mt-2" v-model="infoForm.country">
                                <option value='' selected>الدولة</option>
                                <option v-for="(country, index) in countries" :key="index" :value=country.code>
                                    {{ country.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-12">
                            <h4>بلد الاقامة</h4>
                            <select class="form-select mt-2" data-trigger name="resident" id="resident"
                                v-model="infoForm.resident">
                                <option value='' selected>بلد الاقامة</option>
                                <option v-for="(country, index) in countries" :key="index" :value=country.code>
                                    {{ country.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-12">
                            <h4>من أنا</h4>
                            <div class="form-group row">
                                <textarea rows="3" placeholder="نبذة عني" class="rounded form-control mt-2 col-12" id="bio"
                                    v-model="v$.infoForm.bio.$model" name="bio">
                            </textarea>
                            </div>
                            <small style="color:red;" v-if="v$.infoForm.bio.$error">
                                قم بادخال نبدة عنك لا يزيد عدد حروفها عن 300
                            </small>

                            <div class="form-group row">
                                <input type="text" class="form-control" name="fav_book" id="fav_book"
                                    v-model="v$.infoForm.fav_book.$model" placeholder="كتابي المفضل">
                            </div>
                            <small style="color:red;" v-if="v$.infoForm.fav_book.$error">
                                قم بادخال اسم كتاب لا يزيد عدد حروفه عن 250
                            </small>

                            <div class="form-group row">
                                <input type="text" class="form-control" name="fav_writer" id="fav_writer"
                                    v-model="v$.infoForm.fav_writer.$model" placeholder="الكاتب المفضل">
                            </div>
                            <small style="color:red;" v-if="v$.infoForm.fav_writer.$error">
                                قم بادخال اسم كاتب لا يزيد عدد حروفه عن 250
                            </small>

                            <div class="form-group row">
                                <input type="text" class="form-control" name="fav_quote" id="fav_quote"
                                    v-model="v$.infoForm.fav_quote.$model" placeholder="الاقتباس المفضل">
                            </div>
                            <small style="color:red;" v-if="v$.infoForm.fav_quote.$error">
                                قم بادخال اقتباس لا يزيد عدد حروفه عن 250
                            </small>

                        </div>
                        <div class="form-group col-12">
                            <h4>قسم القراءة المفضل</h4>
                            <select class="form-select mt-2" data-trigger name="section" id="section"
                                v-model="infoForm.fav_section">
                                <option value='' selected>اختر قسمك المفضل </option>
                                <option v-for="section in sections" :key="section.id" :value=section.section>{{section.section}} </option>
                            </select>
                        </div>
                        <hr>
                        <div class="form-group">
                            <button type="submit" :disabled="message"
                                class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                تعديل
                            </button>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                    </form>
                </div>
            </div>
        </iq-card>
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    مواقع التواصل الاجتماعي
                </h3>
            </div>
            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/social-media.png" class="img-fluid rounded w-50" alt="profile-img">
                </div>

                <div class="d-flex align-items-center mt-3">
                    <form @submit.prevent="submitSociaMedia" class="post-text ml-3 w-100 row">
                        <div class="form-group col-12">
                            <input type="text" class="form-control mt-2" name="facebook" id="facebook"
                                v-model="socialMediaForm.facebook" placeholder="فيسبوك">
                            <input type="text" class="form-control mt-2" name="instagram" id="instagram"
                                v-model="socialMediaForm.instagram" placeholder="انستغرام">
                            <input type="text" class="form-control mt-2" name="twitter" id="twitter"
                                v-model="socialMediaForm.twitter" placeholder="تويتر">
                        </div>
                        <hr>
                        <div class="form-group">
                            <button type="submit" :disabled="socialMediaMessage"
                                class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                تعديل
                            </button>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ socialMediaMessage }}</h4>
                    </form>
                </div>
                <div class="d-flex align-items-center mt-3 row">
                    <div class="d-inline-block w-100 text-center col-12">
                        <a role="button" @click="back()" class=" d-block mt-3 mb-3 w-75 mx-auto">
                            <span>عودة للملف الشخصي</span>
                            <span class="align-middle material-symbols-outlined">
                                keyboard_return
                            </span>
                        </a>

                    </div>
                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import UserProfile from '@/API/services/user-profile.service'
import SocialMedia from '@/API/services/social-media.service'

export default {
    name: "update profile",
    async created() {
        const response = await UserProfile.getUserProfileToUpdate(this.$route.params.user_id);
        this.sections=response.sections;
        this.profileInfo=response.profileInfo;
        if (this.profileInfo) {
            this.infoForm.first_name_ar = this.profileInfo.first_name_ar
            this.infoForm.middle_name_ar = this.profileInfo.middle_name_ar
            this.infoForm.last_name_ar = this.profileInfo.last_name_ar
            this.infoForm.birthdate= this.profileInfo.birthdate
            this.infoForm.country = this.profileInfo.country
            this.infoForm.resident = this.profileInfo.resident
            this.infoForm.bio = this.profileInfo.bio
            this.infoForm.fav_book = this.profileInfo.fav_book
            this.infoForm.fav_quote = this.profileInfo.fav_quote
            this.infoForm.fav_writer = this.profileInfo.fav_writer
            this.infoForm.fav_section = this.profileInfo.fav_section
        }
        const social_media = await SocialMedia.getByUserId(this.$route.params.user_id);
        if (social_media) {
            this.socialMediaForm.facebook = social_media.facebook;
            this.socialMediaForm.instagram = social_media.instagram;
            this.socialMediaForm.twitter = social_media.twitter;
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
            },
            fileExtnError: null,
            countries: [
                { code: 'SA', name: "المملكة العربية السعودية" },
                { code: 'ET', name: "إثيوبيا" },
                { code: 'AZ', name: "أذربيجان" },
                { code: 'AM', name: "أرمينيا" },
                { code: 'AW', name: "أروبا" },
                { code: 'ER', name: "إريتريا" },
                { code: 'ES', name: "أسبانيا" },
                { code: 'AU', name: "أستراليا" },
                { code: 'EE', name: "إستونيا" },
                { code: 'IL', name: "إسرائيل" },
                { code: 'AF', name: "أفغانستان" },
                { code: 'IO', name: "إقليم المحيط الهندي البريطاني" },
                { code: 'EC', name: "إكوادور" },
                { code: 'AR', name: "الأرجنتين" },
                { code: 'JO', name: "الأردن" },
                { code: 'AE', name: "الإمارات العربية المتحدة" },
                { code: 'AL', name: "ألبانيا" },
                { code: 'BR', name: "البرازيل" },
                { code: 'PT', name: "البرتغال" },
                { code: 'BA', name: "البوسنة والهرسك" },
                { code: 'GA', name: "الجابون" },
                { code: 'DZ', name: "الجزائر" },
                { code: 'DK', name: "الدانمارك" },
                { code: 'CV', name: "الرأس الأخضر" },
                { code: 'PS', name: "السلطة الفلسطينية" },
                { code: 'SV', name: "السلفادور" },
                { code: 'SN', name: "السنغال" },
                { code: 'SD', name: "السودان" },
                { code: 'SE', name: "السويد" },
                { code: 'SO', name: "الصومال" },
                { code: 'CN', name: "الصين" },
                { code: 'IQ', name: "العراق" },
                { code: 'PH', name: "الفلبين" },
                { code: 'CM', name: "الكاميرون" },
                { code: 'CG', name: "الكونغو" },
                { code: 'CD', name: "الكونغو (جمهورية الكونغو الديمقراطية)" },
                { code: 'KW', name: "الكويت" },
                { code: 'DE', name: "ألمانيا" },
                { code: 'HU', name: "المجر" },
                { code: 'MA', name: "المغرب" },
                { code: 'MX', name: "المكسيك" },
                { code: 'UK', name: "المملكة المتحدة" },
                { code: 'TF', name: "المناطق الفرنسية الجنوبية ومناطق انتراكتيكا" },
                { code: 'NO', name: "النرويج" },
                { code: 'AT', name: "النمسا" },
                { code: 'NE', name: "النيجر" },
                { code: 'IN', name: "الهند" },
                { coed: 'US', name: "الولايات المتحدة" },
                { coed: 'JP', name: "اليابان" },
                { coed: 'YE', name: "اليمن" },
                { coed: 'GR', name: "اليونان" },
                { coed: 'AQ', name: "أنتاركتيكا" },
                { coed: 'AG', name: "أنتيغوا وبربودا" },
                { coed: 'AD', name: "أندورا" },
                { coed: 'ID', name: "إندونيسيا" },
                { coed: 'AO', name: "أنغولا" },
                { coed: 'AI', name: "أنغويلا" },
                { coed: 'UY', name: "أوروجواي" },
                { coed: 'UZ', name: "أوزبكستان" },
                { coed: 'UG', name: "أوغندا" },
                { coed: 'UA', name: "أوكرانيا" },
                { coed: 'IR', name: "إيران" },
                { coed: 'IE', name: "أيرلندا" },
                { coed: 'IS', name: "أيسلندا" },
                { coed: 'IT', name: "إيطاليا" },
                { coed: 'PG', name: "بابوا-غينيا الجديدة" },
                { coed: 'PY', name: "باراجواي" },
                { coed: 'BB', name: "باربادوس" },
                { coed: 'PK', name: "باكستان" },
                { coed: 'PW', name: "بالاو" },
                { coed: 'BM', name: "برمودا" },
                { coed: 'BN', name: "بروناي" },
                { coed: 'BE', name: "بلجيكا" },
                { coed: 'BG', name: "بلغاريا" },
                { coed: 'BD', name: "بنجلاديش" },
                { coed: 'PA', name: "بنما" },
                { coed: 'BJ', name: "بنين" },
                { coed: 'BT', name: "بوتان" },
                { coed: 'BW', name: "بوتسوانا" },
                { coed: 'PR', name: "بورتو ريكو" },
                { coed: 'BF', name: "بوركينا فاسو" },
                { coed: 'BI', name: "بوروندي" },
                { coed: 'PL', name: "بولندا" },
                { coed: 'BO', name: "بوليفيا" },
                { coed: 'PF', name: "بولينزيا الفرنسية" },
                { coed: 'PE', name: "بيرو" },
                { coed: 'BY', name: "بيلاروس" },
                { coed: 'BZ', name: "بيليز" },
                { coed: 'TH', name: "تايلاند" },
                { coed: 'TW', name: "تايوان" },
                { coed: 'TM', name: "تركمانستان" },
                { coed: 'TR', name: "تركيا" },
                { coed: 'TT', name: "ترينيداد وتوباجو" },
                { coed: 'TD', name: "تشاد" },
                { coed: 'CL', name: "تشيلي" },
                { coed: 'TZ', name: "تنزانيا" },
                { coed: 'TG', name: "توجو" },
                { coed: 'TV', name: "توفالو" },
                { coed: 'TK', name: "توكيلاو" },
                { coed: 'TO', name: "تونجا" },
                { coed: 'TN', name: "تونس" },
                { coed: 'TP', name: "تيمور الشرقية (تيمور الشرقية)" },
                { coed: 'JM', name: "جامايكا" },
                { coed: 'GM', name: "جامبيا" },
                { coed: 'GI', name: "جبل طارق" },
                { coed: 'GL', name: "جرينلاند" },
                { coed: 'AN', name: "جزر الأنتيل الهولندية" },
                { coed: 'PN', name: "جزر البتكارين" },
                { coed: 'BS', name: "جزر البهاما" },
                { coed: 'VG', name: "جزر العذراء البريطانية" },
                { coed: 'VI', name: "جزر العذراء، الولايات المتحدة" },
                { coed: 'KM', name: "جزر القمر" },
                { coed: 'CC', name: "جزر الكوكوس (كيلين)" },
                { coed: 'MV', name: "جزر المالديف" },
                { code: 'TC', name: "جزر تركس وكايكوس" },
                { code: 'AS', name: "جزر ساموا الأمريكية" },
                { code: 'SB', name: "جزر سولومون" },
                { code: 'FO', name: "جزر فايرو" },
                { code: 'UM', name: "جزر فرعية تابعة للولايات المتحدة" },
                { code: 'FK', name: "جزر فوكلاند (أيزلاس مالفيناس)" },
                { code: 'FJ', name: "جزر فيجي" },
                { code: 'KY', name: "جزر كايمان" },
                { code: 'CK', name: "جزر كوك" },
                { code: 'MH', name: "جزر مارشال" },
                { code: 'MP', name: "جزر ماريانا الشمالية" },
                { code: 'CX', name: "جزيرة الكريسماس" },
                { code: 'BV', name: "جزيرة بوفيه" },
                { code: 'IM', name: "جزيرة مان" },
                { code: 'NF', name: "جزيرة نورفوك" },
                { code: 'HM', name: "جزيرة هيرد وجزر ماكدونالد" },
                { code: 'CF', name: "جمهورية أفريقيا الوسطى" },
                { code: 'CZ', name: "جمهورية التشيك" },
                { code: 'DO', name: "جمهورية الدومينيكان" },
                { code: 'ZA', name: "جنوب أفريقيا" },
                { code: 'GT', name: "جواتيمالا" },
                { code: 'GP', name: "جواديلوب" },
                { code: 'GU', name: "جوام" },
                { code: 'GE', name: "جورجيا" },
                { code: 'GS', name: "جورجيا الجنوبية وجزر ساندويتش الجنوبية" },
                { code: 'GY', name: "جيانا" },
                { code: 'GF', name: "جيانا الفرنسية" },
                { code: 'DJ', name: "جيبوتي" },
                { code: 'JE', name: "جيرسي" },
                { code: 'GG', name: "جيرنزي" },
                { code: 'VA', name: "دولة الفاتيكان" },
                { code: 'DM', name: "دومينيكا" },
                { code: 'RW', name: "رواندا" },
                { code: 'RU', name: "روسيا" },
                { code: 'RO', name: "رومانيا" },
                { code: 'RE', name: "ريونيون" },
                { code: 'ZM', name: "زامبيا" },
                { code: 'ZW', name: "زيمبابوي" },
                { code: 'WS', name: "ساموا" },
                { code: 'SM', name: "سان مارينو" },
                { code: 'PM', name: "سانت بيير وميكولون" },
                { code: 'VC', name: "سانت فينسنت وجرينادينز" },
                { code: 'KN', name: "سانت كيتس ونيفيس" },
                { code: 'LC', name: "سانت لوشيا" },
                { code: 'SH', name: "سانت هيلينا" },
                { code: 'ST', name: "ساوتوماي وبرينسيبا" },
                { code: 'SJ', name: "سفالبارد وجان ماين" },
                { code: 'SK', name: "سلوفاكيا" },
                { code: 'SI', name: "سلوفينيا" },
                { code: 'SG', name: "سنغافورة" },
                { code: 'SZ', name: "سوازيلاند" },
                { code: 'SY', name: "سوريا" },
                { code: 'SR', name: "سورينام" },
                { code: 'CH', name: "سويسرا" },
                { code: 'SL', name: "سيراليون" },
                { code: 'LK', name: "سيريلانكا" },
                { code: 'SC', name: "سيشل" },
                { code: 'RS', name: "صربيا" },
                { code: 'TJ', name: "طاجيكستان" },
                { code: 'OM', name: "عمان" },
                { code: 'GH', name: "غانا" },
                { code: 'GD', name: "غرينادا" },
                { code: 'GN', name: "غينيا" },
                { code: 'GQ', name: "غينيا الاستوائية" },
                { code: 'GW', name: "غينيا بيساو" },
                { code: 'VU', name: "فانواتو" },
                { code: 'FR', name: "فرنسا" },
                { code: 'VE', name: "فنزويلا" },
                { code: 'FI', name: "فنلندا" },
                { code: 'VN', name: "فيتنام" },
                { code: 'CY', name: "قبرص" },
                { code: 'QA', name: "قطر" },
                { code: 'KG', name: "قيرقيزستان" },
                { code: 'KZ', name: "كازاخستان" },
                { code: 'NC', name: "كاليدونيا الجديدة" },
                { code: 'KH', name: "كامبوديا" },
                { code: 'HR', name: "كرواتيا" },
                { code: 'CA', name: "كندا" },
                { code: 'CU', name: "كوبا" },
                { code: 'CI', name: "كوت ديفوار (ساحل العاج)" },
                { code: 'KR', name: "كوريا" },
                { code: 'KP', name: "كوريا الشمالية" },
                { code: 'CR', name: "كوستاريكا" },
                { code: 'CO', name: "كولومبيا" },
                { code: 'KI', name: "كيريباتي" },
                { code: 'KE', name: "كينيا" },
                { code: 'LV', name: "لاتفيا" },
                { code: 'LA', name: "لاوس" },
                { code: 'LB', name: "لبنان" },
                { code: 'LI', name: "لختنشتاين" },
                { code: 'LU', name: "لوكسمبورج" },
                { code: 'LY', name: "ليبيا" },
                { code: 'LR', name: "ليبيريا" },
                { code: 'LT', name: "ليتوانيا" },
                { code: 'LS', name: "ليسوتو" },
                { code: 'MQ', name: "مارتينيك" },
                { code: 'MO', name: "ماكاو" },
                { code: 'FM', name: "ماكرونيزيا" },
                { code: 'MW', name: "مالاوي" },
                { code: 'MT', name: "مالطا" },
                { code: 'ML', name: "مالي" },
                { code: 'MY', name: "ماليزيا" },
                { code: 'YT', name: "مايوت" },
                { code: 'MG', name: "مدغشقر" },
                { code: 'EG', name: "مصر" },
                { code: 'MK', name: "مقدونيا، جمهورية يوغوسلافيا السابقة" },
                { code: 'BH', name: "مملكة البحرين" },
                { code: 'MN', name: "منغوليا" },
                { code: 'MR', name: "موريتانيا" },
                { code: 'MU', name: "موريشيوس" },
                { code: 'MZ', name: "موزمبيق" },
                { code: 'MD', name: "مولدوفا" },
                { code: 'MC', name: "موناكو" },
                { code: 'MS', name: "مونتسيرات" },
                { code: 'ME', name: "مونتينيغرو" },
                { code: 'MM', name: "ميانمار" },
                { code: 'NA', name: "ناميبيا" },
                { code: 'NR', name: "ناورو" },
                { code: 'NP', name: "نيبال" },
                { code: 'NG', name: "نيجيريا" },
                { code: 'NI', name: "نيكاراجوا" },
                { code: 'NU', name: "نيوا" },
                { code: 'NZ', name: "نيوزيلندا" },
                { code: 'HT', name: "هايتي" },
                { code: 'HN', name: "هندوراس" },
                { code: 'NL', name: "هولندا" },
                { code: 'HK', name: "هونغ كونغ SAR" },
                { code: 'WF', name: "واليس وفوتونا" }
            ],
            infoForm: {
                first_name_ar: '',
                middle_name_ar: '',
                last_name_ar: '',
                country: '',
                resident: '',
                birthdate: '',
                bio: '',
                fav_book: '',
                fav_writer: '',
                fav_quote: '',
                fav_section: '',
            },
            socialMediaForm: {
                facebook: '',
                instagram: '',
                twitter: '',
            },
            sections:[],
            message: null,
            socialMediaMessage: null,

        };
    },
    validations() {
        return {
            infoForm: {
                first_name_ar: {
                    required
                },
                last_name_ar: {
                    required
                },
                bio: {
                    maxLength: maxLength(300)
                },
                fav_book: {
                    maxLength: maxLength(100)
                },
                fav_writer: {
                    maxLength: maxLength(100)
                },
                fav_quote: {
                    maxLength: maxLength(100)
                },
            }
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
                    this.message = response;
                    this.v$.infoForm.$reset()
                }
                catch (error) {
                    console.log(error);
                }
            }
        },

        /**
        * update profile socialmedia.
        */
        async submitSociaMedia() {
            this.socialMediaMessage = "";
            this.loader = true;
            try {
                const response = await SocialMedia.add(this.socialMediaForm);
                this.loader = false;
                this.socialMediaMessage = response;
            }
            catch (error) {
                console.log(error);
            }
        },

        /**
        * update profile picture.
        * @return updated profile
        */
        async submitProfilePic() {
            this.profilePictureForm.profile_picture = this.$refs.profile_picture.files;
            const response = await UserProfile.updateProfilePic(this.profilePictureForm);
            this.profileInfo = response
            this.$refs.profile_picture.value = null;
        },

        /**
        * update profile cover.
        * @return updated profile
        */
        async submitProfileCover() {
            this.profilePictureForm.cover_picture = this.$refs.cover_picture.files;
            const response = await UserProfile.updateProfileCover(this.profilePictureForm);
            this.profileInfo = response
            this.$refs.cover_picture.value = null;

        },
        
        /**
        * get profile picture or cover.
        *  @param  image size, image name, profile id
        * @return image url
        */
        resolve_porfile_img(size, imageName, profile_id) {
            let image = size + '_' + imageName;
            const url = `http://127.0.0.1:8000/api/v1/profile-image?fileName=${image}&profileID=${profile_id}`
            return url;
        },

        /**
        * redirect to user profile.
        */
        back() {
            this.$router.push({ name: 'user.profile', params: { user_id: this.$route.params.user_id } })
        }
    },

};
</script>