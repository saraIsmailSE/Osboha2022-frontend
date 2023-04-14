<template>
    <div class="user-img img-fluid">
        <img v-if="record.user.user_profile.profile_picture"
            :src="resolve_porfile_img('60x60', record.user.user_profile.profile_picture, record.user.user_profile.id)"
            alt="profile-img" class="rounded-circle avatar-40" :title="record.user.name" />

        <img v-else :src="resolve_porfile_img('60x60', 'ananimous_' + record.user.gender + '.png', 'ananimous')"
            alt="profile-img" :title="record.user.name" class="rounded-circle avatar-40">
    </div>
    <div class="d-flex align-items-center justify-content-between w-100">
        <div class="ms-3">
            <h6>{{ record.user.name }}</h6>
            <p class="mb-0">عدد الصفحات: {{ record.total_pages }}</p>
        </div>
        <div class="card-header-toolbar d-flex align-items-center">
            <router-link :to="{ name: 'group.listOneAmbassadorReading', params: { ambassador_id: record.user_id } }">
                <i class="material-symbols-outlined md-18 me-1 text-primary">
                    visibility
                </i>
            </router-link>
        </div>
    </div>
</template>

<script>
import profileImagesService from '@/API/services/profile.images.service'

export default {
    name: 'Achievement Pages',
    props: {
        record: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
        }
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