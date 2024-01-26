<template>
   <div class="row">
      <div class="col-sm-12">
         <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
            <div class="inner-page-title">
               <h3 class="text-white">عرض الأسئلة العامة للمراجعة</h3>
            </div>
         </div>
      </div>
      <div class="col-sm-12" v-if="informations.status">
         <iq-card>
            <template v-slot:headerTitle>
               <h4 class="card-title">الأسئلة العامة</h4>
               <span class="px-2" v-if="informations.status == 'review'"> اسم السفير : {{ userName }}</span>
               <span class="px-2" v-else> اسم السفير : ***************</span>
               <span class="px-2"> || </span>
               <span class="px-2"> اسم الكتاب : {{ bookName }}</span>
            </template>
            <template v-slot:body>
               <div class="form-card text-start">
                  <form>
                     <div class="row setup-content" id="user-detail">
                        <div class="col-sm-12">
                           <div class="col-md-12 p-0">
                              <h3 class="mb-4">الانجاز</h3>
                              <div class="row">

                                 <div class="col-md-12 form-group">
                                    <div class="col-md-12 form-group">
                                       <h4 class="form-label"> التلخيص العام</h4>
                                       <p class="form-control-plaintext">{{ informations.summary }}</p>
                                    </div>

                                 </div>
                                 <div class="col-md-12 form-group">
                                    <div class="col-md-12 form-group">
                                       <h4 class="form-label"> السؤال العام العام</h4>
                                       <p class="form-control-plaintext">{{ informations.general_question }}</p>
                                    </div>

                                 </div>
                                 <hr>
                                 <div class="col-md-12 mb-3 form-group"
                                    v-if="(informations.status == 'audit' && isAuditer)">
                                    <label for="address" class="form-label">ملاحظات المراجع *</label>
                                    <textarea name="address" class="form-control" id="address" rows="5" required="required"
                                       v-model="reviweNote"></textarea>
                                    <small style="color: red" v-if="v$.reviweNote.$error">
                                       {{ 'ملاحظاتك مطلوبة' }}
                                    </small>

                                 </div>

                                 <div v-if="(informations.status == 'audit' && isAuditer)">
                                    <div class="row form-group">
                                       <label for="address" class="form-label"> * التقييم المناسب </label>
                                       <select class="form-select" data-trigger name="degree" id="degree" v-model="degree"
                                          @change="setDegree($event)">
                                          <option value="">اختر التقييم المناسب</option>
                                          <option value="96">امتياز</option>
                                          <option value="91">ممتاز</option>
                                          <option value="86">جيد جدًا</option>
                                          <option value="81">جيد </option>
                                          <option value="71">مقبول</option>
                                       </select>
                                       <small style="color: red" v-if="v$.degree.$error">
                                          {{ 'اختر التقييم المناسب' }}
                                       </small>

                                       <div class="form-check form-check-inline form-checkbox form-checkbox-color mt-4">
                                          <input type="checkbox" class="form-check-input" id="rule3" ref="rule3"
                                             :checked="rule1" @change="setRule3()">
                                          <label class="form-check-label" for="rule3">
                                             تم التحقق من تطابق الأفكار المكتوبة هنا
                                             مع أفكار الكتاب وذلك دليل قراءة القارئ للكتاب.</label>
                                       </div>

                                       <div class="col-md-3 form-group mt-3">
                                          <input type="button" value="إضافة" class="btn btn-primary d-block w-100 mt-3 "
                                             @click="addDegree(informations.id)" :disabled='!rule3' />
                                       </div>

                                    </div>
                                 </div>
                                 <iq-card v-if="informations.status == 'review' || informations.status == 'audit'">
                                    <template v-slot:headerTitle>
                                       <h4 class="card-title">قبول - اعادة - رفض</h4>
                                    </template>
                                    <template v-slot:body>
                                       <div class="row">
                                          <div class="col-lg-6 col-md-12 col-sm-12 form-group align-middle">
                                             <h3 class="text-center"> !! الزر الحاسم
                                             </h3>
                                             <br />
                                             <h5 class="text-center">
                                                نعم تمامًا فأمكانية الضغط على هذا الزر ستتاح لك حينما نقوم بإنهاء مهمتك
                                                المكلف بها في طلب السفير
                                                لتوثيق قراءته. اعتمادك الطلب وإرساله للمرحلة القادمة أو رفضه مسؤولية
                                                حقيقية لأنها تؤثر على حماية
                                                التعلم وجودة التعليم. كن حريصًا على إتمام مهمتك بكل دقة قبل الضغط على
                                                هذا الزر أدناه. يتاح
                                                القبول بعد اكتمال الشروط، ويكون الرفض في حال وجود مشكلة حقيقية في الطلب
                                                كأن يكون مخالف لشروط
                                                الحصرية أو مشاكل أخرى مخالفة للقانون
                                             </h5>
                                             <!-- ACCEPT -->
                                             <input type="button" value="انجاز صالح للتقييم"
                                                class="btn btn-primary d-block w-100 mt-3 "
                                                @click="accept(informations.id)" v-if="isReviewer" />
                                             <!-- END ACCEPT -->

                                             <!-- RETARD -->

                                             <input type="button" value="اعادة" class="btn btn-warning d-block mt-3 w-100"
                                                v-if="!retard" @click="setRetard()" />
                                             <div class="col-md-12 mb-3 form-group mt-2" v-if="retard">
                                                <label for="retardNote" class="form-label">سبب الاعادة *</label>
                                                <textarea name="retardNote" class="form-control" id="retardNote" rows="5"
                                                   required="required" v-model=retardNote></textarea>
                                                <small style="color: red" v-if="v$.retardNote.$error">
                                                   {{ 'سبب الاعادة مطلوب' }}
                                                </small>
                                                <div class="d-inline-block w-100 text-center">
                                                   <div class="col-sm-12 text-center" v-if="loader">
                                                      <img src="@/assets/images/gif/loader-3.gif" alt="loader"
                                                         style="height: 100px;">
                                                   </div>
                                                </div>

                                                <input type="button" value="اعادة"
                                                   class="btn btn-warning d-block mt-3 w-100"
                                                   @click="retardInfo(informations.id)" />
                                             </div>
                                             <!-- END RETARD -->
                                             <!-- REJECT -->
                                             <div v-if="isSuper">

                                                <input type="button" value="انجاز مرفوض"
                                                   class="btn btn-danger d-block mt-3 w-100" @click="setReject()"
                                                   v-if="!reject" />
                                                <div class="col-md-12 mb-3 form-group mt-2" v-if="reject">
                                                   <label for="rejectNote" class="form-label">سبب الرفض *</label>
                                                   <textarea name="rejectNote" class="form-control" id="rejectNote"
                                                      rows="5" required="required" v-model=rejectNote></textarea>
                                                   <small style="color: red" v-if="v$.rejectNote.$error">
                                                      {{ 'سبب الرفض مطلوب' }}
                                                   </small>
                                                   <div class="d-inline-block w-100 text-center">
                                                      <div class="col-sm-12 text-center" v-if="loader">
                                                         <img src="@/assets/images/gif/loader-3.gif" alt="loader"
                                                            style="height: 100px;">
                                                      </div>
                                                   </div>

                                                   <input type="button" value="انجاز مرفوض"
                                                      class="btn btn-danger d-block mt-3 w-100"
                                                      @click="rejectInfo(informations.id)" />
                                                </div>
                                             </div>
                                             <!-- END REJECT -->

                                          </div>
                                          <div class="col-lg-6 col-md-12 col-sm-12 form-group">
                                             <div class="image-block text-center">
                                                <img src="@/assets/images/main/accept-reject.png"
                                                   class="img-fluid rounded w-75" alt="blog-img" />
                                             </div>
                                          </div>
                                       </div>

                                    </template>
                                 </iq-card>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </template>
         </iq-card>
      </div>
      <div class="col-lg-12" v-if="informations.status == 'review'">
         <iq-card>
            <template v-slot:headerTitle>
               <h4 class="card-title">بحاجة لمراجعة</h4>
            </template>
            <template v-slot:body>
               <TimeLine :items="[
                  {
                     color: 'primary',
                     title: `لا يوجد مراجع `,
                     description: '',
                     child: {
                        type: 'img',
                        items: [
                        ]
                     }
                  },

               ]" />
            </template>
         </iq-card>
      </div>

      <div class="col-lg-12" v-if="informations.status == 'retard'">
         <iq-card>
            <template v-slot:headerTitle>
               <h4 class="card-title">تم الاعادة </h4>
            </template>
            <template v-slot:body>
               <TimeLine :items="[
                  {
                     color: 'primary',
                     title: `بحاجة لتعديل ~ ${informations.reviewer.name}`,
                     description: informations.reviews,
                     child: {
                        type: 'img',
                        items: [
                        ]
                     }
                  },

               ]" />
            </template>
         </iq-card>
      </div>
      <div class="col-lg-12" v-if="informations.status == 'accept'">
         <iq-card>
            <template v-slot:headerTitle>
               <h4 class="card-title">تم القبول </h4>
            </template>
            <template v-slot:body>
               <TimeLine :items="[
                  {
                     color: 'primary',
                     title: 'مقبول',
                     description: informations.reviewer.name,
                     child: {
                        type: 'img',
                        items: [
                        ]
                     }
                  },

               ]" />
            </template>
         </iq-card>
      </div>
      <div class="col-lg-12" v-if="informations.status == 'audite'">
         <iq-card>
            <template v-slot:headerTitle>
               <h4 class="card-title">تم الاعتماد </h4>
            </template>
            <template v-slot:body>
               <TimeLine :items="[
                  {
                     color: 'primary',
                     title: 'معتمد - قابل للتقييم',
                     description: informations.reviewer.name,
                     child: {
                        type: 'img',
                        items: [
                        ]
                     }
                  },

               ]" />
            </template>
         </iq-card>
      </div>
      <div class="col-lg-12" v-if="informations.status == 'audited'">
         <iq-card>
            <template v-slot:headerTitle>
               <h4 class="card-title">تم التقييم</h4>
            </template>
            <template v-slot:body>
               <TimeLine :items="[
                  {
                     color: 'primary',
                     title: `تم التقييم ~ ${informations.auditor.name}`,
                     description: informations.reviews,
                     child: {
                        type: 'img',
                        items: [
                        ]
                     }
                  },
                  {
                     color: 'primary',
                     title: `تم المراجعة ~ ${informations.reviewer.name}`,
                     description: '',
                     child: {
                        type: 'img',
                        items: [
                        ]
                     }
                  },

               ]" />
            </template>
         </iq-card>
      </div>
      <div class="col-lg-12" v-if="informations.status == 'rejected'">
         <iq-card>
            <template v-slot:headerTitle>
               <h4 class="card-title">تم الرفض </h4>
            </template>
            <template v-slot:body>
               <TimeLine :items="[
                  {
                     color: 'primary',
                     title: `مرفوض ~ ${informations.reviewer.name} ${informations.auditor.name}`,
                     description: informations.reviews,
                     child: {
                        type: 'img',
                        items: [
                        ]
                     }
                  },

               ]" />
            </template>
         </iq-card>
      </div>
   </div>
</template>
<script>
import generalInformationsServices from '@/API/EligibleServices/generalInformationsServices';
import UserInfoService from '@/Services/userInfoService';
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";

export default {
   name: 'GeneralInformations',
   components: {
   },
   async created() {
      await this.generalInformations();
   },
   setup() {
      return { v$: useVuelidate() };
   },
   data() {
      return {
         current: 1,
         informations: [],
         reject: false,
         rejectNote: '',
         reviweNote: '',
         retard: false,
         retardNote: '',
         mark: 0,
         degree: '',
         bookName: '',
         userName: '',
         markCondition: true,
         rule3: false,
         loader: false,
      }
   },
   validations() {
      return {
         rejectNote: {
            required: requiredIf(function (nestedModel) {
               return this.reject == true;
            }),
         },
         retardNote: {
            required: requiredIf(function (nestedModel) {
               return this.retard == true;
            }),
         },
         reviweNote: {
            required
         },

         degree: {
            required
         },
      };
   },
   methods: {

      async generalInformations() {
         const general_nformations = await generalInformationsServices.getByUserBook(this.$route.params.user_book_id);
         this.informations = general_nformations;
         this.bookName = this.informations.user_book.book.name
         this.userName =
            this.informations.user_book.user.user_profile.first_name_ar
            + " " + this.informations.user_book.user.user_profile.middle_name_ar + " " +
            this.informations.user_book.user.user_profile.last_name_ar

      },
      checkMark() {
         this.markCondition = (parseInt(this.mark) >= 70 && parseInt(this.mark) <= 100)
      },
      setDegree(e) {
         this.mark = e.target.value

      },
      setRule3() {
         this.rule3 = !this.rule3;
      },

      addDegree(id) {
         this.v$.$touch();
         if (!this.v$.reviweNote.$invalid && !this.v$.degree.$invalid) {

            const swalWithBootstrapButtons = this.$swal.mixin({
               customClass: {
                  confirmButton: 'btn btn-primary btn-lg',
                  cancelButton: 'btn btn-outline-primary btn-lg ms-2'
               },
               buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
               title: 'هل أنت متأكد؟',
               text: "موافقتك تعني أن هذا التلخيص  تم مراجعته",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'تمت المراجعة  ',
               cancelButtonText: 'تراجع  ',
               showClass: {
                  popup: 'animate__animated animate__zoomIn'
               },
               hideClass: {
                  popup: 'animate__animated animate__zoomOut'
               }
            })
               .then((willDelete) => {
                  if (willDelete.isConfirmed) {
                     generalInformationsServices.addDegree(id, this.reviweNote, this.mark)
                        .then(response => {
                           swalWithBootstrapButtons.fire({
                              title: 'تم الاضافة',
                              text: 'تم مراجعة التلخيص',
                              icon: 'success',
                              showClass: {
                                 popup: 'animate__animated animate__zoomIn'
                              },
                              hideClass: {
                                 popup: 'animate__animated animate__zoomOut'
                              }
                           })
                           location.reload()
                        })
                        .catch(error => {
                           console.log(error)
                        })
                  }
               })

         }
      },
      changeTab(tab) {
         this.current = tab
         window.scrollTo({ top: 0, behavior: 'smooth' })
      },
      checkActive(item, active) {
         let className = ''
         if (this.current > item) {
            className = 'active'
         }
         if (this.current > active) {
            className = className + ' done'
         }
         return className
      },

      setReject() {
         this.reject = true;
         this.retard = false;

      },
      rejectInfo(id) {
         this.v$.$touch();
         if (!this.v$.rejectNote.$invalid) {

            const swalWithBootstrapButtons = this.$swal.mixin({
               customClass: {
                  confirmButton: 'btn btn-primary btn-lg',
                  cancelButton: 'btn btn-outline-primary btn-lg ms-2'
               },
               buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
               title: 'هل أنت متأكد؟',
               text: "موافقتك تعني رفض هذا التلخيص ",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'نعم قم بالرفض',
               cancelButtonText: 'تراجع  ',
               showClass: {
                  popup: 'animate__animated animate__zoomIn'
               },
               hideClass: {
                  popup: 'animate__animated animate__zoomOut'
               }
            })
               .then((willDelete) => {
                  if (willDelete.isConfirmed) {
                     this.loader = true
                     generalInformationsServices.rejectRetardGeneralInformations(id, this.rejectNote, 'rejected')
                        .then(response => {
                           swalWithBootstrapButtons.fire({
                              title: 'تم الرفض',
                              text: 'تم رفض التلخيص',
                              icon: 'success',
                              showClass: {
                                 popup: 'animate__animated animate__zoomIn'
                              },
                              hideClass: {
                                 popup: 'animate__animated animate__zoomOut'
                              }
                           })
                           this.$router.push({ name: `general.list` })
                        })
                        .catch(error => {
                           console.log(error)
                        })

                  }
               })
         }
      },

      retardInfo(id) {
         this.v$.$touch();
         if (!this.v$.retardNote.$invalid) {

            const swalWithBootstrapButtons = this.$swal.mixin({
               customClass: {
                  confirmButton: 'btn btn-primary btn-lg',
                  cancelButton: 'btn btn-outline-primary btn-lg ms-2'
               },
               buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
               title: 'هل أنت متأكد؟',
               text: "موافقتك تعني اعادة هذا التلخيص ",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'نعم قم بالاعادة',
               cancelButtonText: 'تراجع  ',
               showClass: {
                  popup: 'animate__animated animate__zoomIn'
               },
               hideClass: {
                  popup: 'animate__animated animate__zoomOut'
               }
            })
               .then((willDelete) => {
                  if (willDelete.isConfirmed) {
                     this.loader = true
                     generalInformationsServices.rejectRetardGeneralInformations(id, this.retardNote, 'retard')
                        .then(response => {
                           swalWithBootstrapButtons.fire({
                              title: 'تمت الاعادة',
                              text: 'تم اعادة التلخيص',
                              icon: 'success',
                              showClass: {
                                 popup: 'animate__animated animate__zoomIn'
                              },
                              hideClass: {
                                 popup: 'animate__animated animate__zoomOut'
                              }
                           })
                           this.$router.push({ name: `general.list` })
                        })
                        .catch(error => {
                           console.log(error)
                        })

                  }
               })
         }
      },
      accept(id) {
         const swalWithBootstrapButtons = this.$swal.mixin({
            customClass: {
               confirmButton: 'btn btn-primary btn-lg',
               cancelButton: 'btn btn-outline-primary btn-lg ms-2'
            },
            buttonsStyling: false
         })
         swalWithBootstrapButtons.fire({
            title: 'هل أنت متأكد؟',
            text: "موافقتك تعني قبول هذا السؤال",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم قم بالقبول',
            cancelButtonText: 'تراجع  ',
            showClass: {
               popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
               popup: 'animate__animated animate__zoomOut'
            }
         })
            .then((willDelete) => {
               if (willDelete.isConfirmed) {
                  generalInformationsServices.acceptGeneralInformations(id)
                     .then(response => {
                        swalWithBootstrapButtons.fire({
                           title: 'تم القبول',
                           text: 'تم قبول السؤال',
                           icon: 'success',
                           showClass: {
                              popup: 'animate__animated animate__zoomIn'
                           },
                           hideClass: {
                              popup: 'animate__animated animate__zoomOut'
                           }
                        });
                        location.reload()
                     })
                     .catch(error => {
                        console.log(error)
                     })
               }
            })
      },
      setRetard() {
         this.retard = true;
         this.reject = false;
      },

   },
   computed: {
      user() {
         return this.$store.getters.getUser;
      },
      isSuper() {
         return UserInfoService.hasRoles(this.user, [
            "admin",
            "eligible_admin",
            "super_auditer",
            "super_reviewer",
         ]);
      },
      isAuditer() {
         return UserInfoService.hasRoles(this.user, [
            "admin",
            "eligible_admin",
            "super_auditer",
            "auditor",
         ]);
      },
      isReviewer() {
         return UserInfoService.hasRoles(this.user, [
            "admin",
            "eligible_admin",
            "super_reviewer",
            "reviewer",
         ]);
      },

   },
}
</script>
<style scoped>
#top-tab-list {
   margin-bottom: 0;
   ;
}
</style>