<template>
  <div class="col-sm-12 mt-3 text-center" v-if="exception">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">
          طلب: {{ exception.type.type }}
        </h3>
      </div>
      <div class="iq-card-body">
        <div class="image-block text-center">
          <div class="profile-img">
            <BaseAvatar
              :profileImg="exception.user.user_profile.profile_picture"
              :profile_id="exception.user.user_profile.id"
              :dimensions="'512x512'"
              :title="exception.user?.name"
              :gender="exception.user?.gender"
              avatarClass="avatar-130 img-fluid"
              containerClass="flex-shrink-0"
            />
            <h4 class="text-center mt-3 mb-3">
              {{ exception.user.name }}
            </h4>
          </div>
        </div>

        <div class="iq-card-body ps-3 pe-3 mt-1">
          <h4 class="mb-2">السبب</h4>
          <p class="m-auto">{{ exception.reason }}</p>
          <h4 class="mb-2">الحالة</h4>

          <p class="m-auto" v-if="exception.status == 'pending'">
            <span class="badge bg-warning">تحت المراجعة</span>
          </p>
          <p class="m-auto" v-if="exception.status == 'accepted'">
            <span class="badge bg-primary">مقبول</span>
          </p>
          <p class="m-auto" v-if="exception.status == 'rejected'">
            <span class="badge bg-danger">مرفوض</span>
          </p>
          <p class="m-auto" v-if="exception.status == 'finished'">
            <span class="badge bg-success">منتهي</span>
          </p>
          <p class="m-auto" v-if="exception.status == 'cancelled'">
            <span class="badge bg-danger">ملغي</span>
          </p>
          <table class="table w-100" v-if="exception.reviewer">
            <thead>
              <tr>
                <th scope="col">المسؤول</th>
                <th scope="col" colspan="3">ملاحظاته</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ exception.reviewer.name }}</td>
                <td> {{ exception.note }}</td>
              </tr>
            </tbody>
          </table>
          <div class="alert alert-danger mt-2" v-if="last_freez || last_exam || last_exceptional_freez">
            <h4>أخر الاجازات</h4>
            <ul>
              <li v-if="last_freez">
                <h5>أخر تجميد</h5>
                <p>
                  {{ last_freez.end_at }}
                </p>
              </li>
              <li v-if="last_exam">
                <h5>أخر نظام امتحانات</h5>
                <p>
                  {{ last_exam.end_at }}
                </p>
              </li>
              <li v-if="last_exceptional_freez">
                <h5>أخر تجميد استثنائي</h5>
                <p>
                  {{ last_exceptional_freez.end_at }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="authInGroup && authInGroup.user_type != 'ambassador'">
          <h3 class="text-center mt-3 mb-3">الاجراء المناسب</h3>
          <div v-if="exception.status == 'pending'">
            <div class="d-flex align-items-center mt-3" v-if="exception.type.type != 'تجميد استثنائي'">
              <form @submit.prevent="submitDecision" class="post-text m-auto w-100 row">
                <div class="form-group col-12">
                  <select class="form-select" v-model="v$.decideForm.decision.$model" :disabled="message">
                    <option value="-1" selected>اختر الاجراء المناسب</option>
                    <option value="1">اعفاء الأسبوع الحالي</option>
                    <option value="2">اعفاء الأسبوع القادم</option>
                    <option value="3">
                      اعفاء الأسبوعين القادمين [ الحالي + القادم]
                    </option>
                    <option value="0">رفض</option>
                  </select>
                  <small style="color: red" v-if="v$.decideForm.decision.$error">
                    هذا الخيار مطلوب
                  </small>
                </div>
                <div class="form-group col-12">
                  <label class="form-label" for="note">ملاحظاتك</label>
                  <textarea v-model="v$.decideForm.note.$model" rows="5" placeholder="... اكتب ملاحظة"
                    class="rounded form-control" id="note" :disabled="message"></textarea>
                  <small style="color: red" v-if="v$.decideForm.note.$error">
                    * ملاحظاتك مطلوبة
                  </small>
                </div>

                <div class="form-group">
                  <button type="submit" :disabled="message" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                    اعتماد
                  </button>
                </div>

                <div class="col-sm-12 text-center" v-if="loader">
                  <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <h4 class="text-center mt-3 mb-3" v-if="message">
                  {{ message }}
                </h4>
              </form>
            </div>
            <div class="d-flex align-items-center mt-3" v-else-if="exception.type.type == 'تجميد استثنائي' &&
              authInGroup &&
              (authInGroup.user_type == 'admin' ||
                authInGroup.user_type == 'advisor')
              ">
              <form @submit.prevent="submitDecision" class="post-text m-auto w-100 row">
                <div class="form-group col-12">
                  <select class="form-select" v-model="v$.decideForm.decision.$model" :disabled="message">
                    <option value="-1" selected>اختر الاجراء المناسب</option>
                    <option value="1">اعفاء الأسبوع الحالي</option>
                    <option value="2">اعفاء الأسبوع القادم</option>
                    <option value="3">
                      اعفاء الأسبوعين القادمين [ الحالي + القادم]
                    </option>
                    <option value="4">
                      اعفاء ثلاثة أسابيع [ الحالي + القادم + الذي يليه]
                    </option>
                    <option value="0">رفض</option>
                  </select>
                  <small style="color: red" v-if="v$.decideForm.decision.$error">
                    هذا الخيار مطلوب
                  </small>
                </div>
                <div class="form-group col-12">
                  <label class="form-label" for="note">ملاحظاتك</label>
                  <textarea v-model="v$.decideForm.note.$model" rows="5" placeholder="... اكتب ملاحظة"
                    class="rounded form-control" id="note" :disabled="message"></textarea>
                  <small style="color: red" v-if="v$.decideForm.note.$error">
                    * ملاحظاتك مطلوبة
                  </small>
                </div>

                <div class="form-group">
                  <button type="submit" :disabled="message" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                    اعتماد
                  </button>
                </div>

                <div class="col-sm-12 text-center" v-if="loader">
                  <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <h4 class="text-center mt-3 mb-3" v-if="message">
                  {{ message }}
                </h4>
              </form>
            </div>
            <div class="d-inline-flex justify-content-center alert alert-success mt-2 w-75" v-else>
              <h5>يتطلب هذا الاجراء موافقة موجه المجموعة</h5>
            </div>
          </div>

          <div class="d-inline-flex justify-content-center alert alert-success mt-2 w-100" v-else>
            <h5>تم اتخاذ الاجراء مسبقًا</h5>
            <hr>
          </div>
        </div>
        <div class="d-inline-flex justify-content-center w-100" v-if="exception.user.id == auth.id &&
          (exception.status == 'accepted' || exception.status == 'pending')
          ">
          <button @click="cancelException(exception.id)" class="btn btn-danger d-block w-75">
            الغاء
          </button>
        </div>

        <div class="d-flex align-items-center mt-3 row">
          <div class="d-inline-block w-100 text-center col-12">
            <a role="button" @click="$router.go(-1)" class="d-block mt-3 mb-3 w-75 mx-auto">
              <span>عودة</span>
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
import exceptionService from "@/API/services/user-exception.service";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import UserInfo from "@/Services/userInfoService";

const greaterThanMinusOne = (value) => value > -1;

export default {
  name: "List One Exception",
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    exception: { type: Object },
    last_freez: { type: Object },
    last_exam: { type: Object },
    last_exceptional_freez: { type: Object },
    authInGroup: { type: Object },
  },
  data() {
    return {
      decideForm: {
        note: "",
        decision: -1,
      },
      message: null,
      loader: false,
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
  },
  validations() {
    return {
      decideForm: {
        note: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(250),
        },
        decision: {
          required,
          maxValue: greaterThanMinusOne,
        },
      },
    };
  },
  methods: {
    async submitDecision() {
      this.v$.$touch();
      if (!this.v$.decideForm.$invalid) {
        this.message = "";
        this.loader = true;
        try {
          const response = await exceptionService.updateStatus(
            this.exception.id,
            this.decideForm
          );
          this.loader = false;
          this.message = response;
          this.v$.decideForm.$reset();
        } catch (error) {
          console.log(error);
        }
      }
    },

    cancelException(exception_id) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "هل أنت متأكد؟",
          text: "موافقتك تعني الغاء هذا الاعفاء وحساب علامتك لهذا الاسبوع ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بالالغاء",
          cancelButtonText: "تراجع  ",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then((willDelete) => {
          if (willDelete.isConfirmed) {
            this.loader = true;
            exceptionService
              .cancelException(exception_id)
              .then((response) => {
                swalWithBootstrapButtons.fire({
                  title: "تم الاغاء",
                  text: "تم الغاء الاعفاء",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                //location.reload()
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
  },
};
</script>
