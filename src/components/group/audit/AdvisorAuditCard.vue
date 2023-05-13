<template>
  <div class="d-grid gap-3 d-grid-template-1fr-19">
    <div class="card mb-0">
      <div class="card-body text-center">
        <BaseAvatar
          :profileImg="supervisor.supervisor.user_profile.profile_picture"
          :profile_id="supervisor.supervisor.user_profile.id"
          :title="supervisor.supervisor.user.name"
          :gender="supervisor.supervisor.user.gender"
          avatarClass="rounded-circle img-fluid avatar-120"
          dimensions="150x150"
          :noMainClass="true"
        />
        <div class="group-info pt-3 pb-3">
          <router-link
            :to="{
              name: 'user.profile',
              params: { user_id: supervisor.supervisor.id },
            }"
          >
            <h4>
              {{ supervisor.supervisor.name }}
            </h4>
          </router-link>
        </div>
        <div class="group-details d-inline-block pb-3">
          <ul
            class="d-flex align-items-center justify-content-between list-inline m-0 p-0"
          >
            <li class="pe-3 ps-3">
              <p class="mb-0">عدد القادة</p>
              <h6>{{ supervisor.num_of_leaders }}</h6>
            </li>
            <li class="pe-3 ps-3">
              <p class="mb-0">لمعدل العام</p>
              <h6>
                {{ (Math.round(supervisor.groups_avg * 100) / 100).toFixed(2) }}
                %
              </h6>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col-12">
            <router-link
              class="btn btn-primary d-block mt-1 me-1"
              :to="{
                name: 'group.groupsAudit',
                params: {
                  supervisor_id: supervisor.supervisor.id,
                },
              }"
            >
              عرض تدقيق المراقب
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "supervisor Audit Card",
  props: {
    supervisor: {
      type: [Object],
      required: true,
    },
  },
};
</script>
