<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <div class="card mb-0">
            <div class="card-body text-center">
                <div class="">
                    <img v-if="supervisor.supervisor.user_profile.profile_picture"
                        :src="resolve_porfile_img('150x150', supervisor.supervisor.user_profile.profile_picture, supervisor.supervisor.user_profile.id)"
                        alt="profile-img" class="rounded-circle img-fluid avatar-120"
                        :title="supervisor.supervisor.user.name" />

                    <img v-else
                        :src="resolve_porfile_img('150x150', 'ananimous_' + supervisor.supervisor.gender + '.png', 'ananimous')"
                        alt="profile-img" :title="supervisor.supervisor.name" class="rounded-circle img-fluid avatar-120" />
                </div>
                <div class="group-info pt-3 pb-3">
                    <router-link :to="{ name: 'user.profile', params: { user_id: supervisor.supervisor.id, }, }">
                        <h4>
                            {{ supervisor.supervisor.name }}
                        </h4>
                    </router-link>
                </div>
                <div class="group-details d-inline-block pb-3">
                    <ul class="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                        <li class="pe-3 ps-3">
                            <p class="mb-0">عدد القادة</p>
                            <h6>{{ supervisor.num_of_leaders }}</h6>
                        </li>
                        <li class="pe-3 ps-3">
                            <p class="mb-0">لمعدل العام</p>
                            <h6>{{ (Math.round(supervisor.groups_avg * 100) / 100).toFixed(2) }} %</h6>
                        </li>
                    </ul>
                </div>
                <div class="row">
                    <div class="col-12">
                        <router-link class="btn btn-primary d-block mt-1 me-1" :to="{
                            name: 'group.groupsAudit',
                            params: {
                                supervisor_id: supervisor.supervisor.id,
                            },
                        }">
                            عرض تدقيق المراقب
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import profileImagesService from '@/API/services/profile.images.service'

export default {
    name: 'supervisor Audit Card',
    props: {
        supervisor: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return [
        ]
    },
    methods: {
        /**
        * get profile picture or cover.
        *  @param  image size, image name, profile id
        * @return image url
        */
        resolve_porfile_img(size, imageName, profile_id) {
            return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
        },
    }
}
</script>
