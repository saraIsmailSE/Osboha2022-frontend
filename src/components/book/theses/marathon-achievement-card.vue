<template>
  <div class="container" style="background-color: #f1f9f5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-12 col-xl-4 mt-3 mb-3">
        <div class="card" style="border-radius: 15px">
          <div class="card-body text-center">
            <div class="mt-3 mb-3">
              <BaseAvatar :profileImg="mark.user.user_profile.profile_picture" :profile_id="mark.user.user_profile.id"
                :title="mark.user.gender" :gender="mark.user.gender" avatarClass="avatar-130 img-fluid rounded-circle"
                dimensions="150x150" />
            </div>
            <router-link :to="{
              name: 'user.profile',
              params: { user_id: mark.user.id },
            }">
              <h4 class="mb-2 text-center">{{ mark.user.name + " " + mark.user.last_name }}</h4>
            </router-link>
            <p class="text-center mb-4" style="direction: rtl">
              مارثون
              <span class="mx-2">|</span>
              <router-link class="text-center" :to="{
                name: 'group.group-detail',
                params: { group_id: group.id },
              }">
                {{ group.name }}
              </router-link>
            </p>
            <div class="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p class="text-center mb-2 h5">
                  <strong>{{
                    mark.reading_mark + mark.writing_mark + mark.support
                  }}%</strong>
                </p>
                <p class="text-center mb-0">
                  العلامة
                  <br />
                  الكلية
                </p>
              </div>
              <div>
                <p class="text-center mb-2 h5">
                  <strong>{{ mark.total_thesis }}</strong>
                </p>
                <p class="text-center mb-0">
                  عدد
                  <br />
                  الأطروحات
                </p>
              </div>
              <div>
                <p class="text-center mb-2 h5">
                  <strong>{{ mark.total_pages }}</strong>
                </p>
                <p class="text-center mb-0">
                  عدد
                  <br />
                  الصفحات
                </p>
              </div>
            </div>
            <div class="alert alert-info text-center mt-3 mb-2" v-if="mark.is_freezed">
              تحت التجميد
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Achievement Card",
  created() {
  },

  props: {
    mark: {
      type: [Object],
      required: true,
    },
    group: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
