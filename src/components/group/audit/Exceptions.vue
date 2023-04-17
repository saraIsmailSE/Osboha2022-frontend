<template>
    <li class="row d-flex align-items-center p-3">
        <div class="row">
            <div class="col">
                <div class="user-img img-fluid">
                    <img v-if="exception.user.user_profile.profile_picture"
                        :src="resolve_porfile_img('60x60', exception.user.user_profile.profile_picture, exception.user.user_profile.id)"
                        alt="profile-img" class="rounded-circle avatar-40" :title="exception.user.name" />

                    <img v-else
                        :src="resolve_porfile_img('60x60', 'ananimous_' + exception.user.gender + '.png', 'ananimous')"
                        alt="profile-img" :title="exception.user.name" class="rounded-circle avatar-40">

                    <h6 class="d-inline-block ms-3">
                        <strong>{{ exception.user.name }} </strong>
                    </h6>
                </div>

            </div>
            </div>
            <div class="row mt-2 m-auto">

            <div class="col">
                <h5>نوع الاعفاء: {{ exception.type.type }}</h5>
            </div>
        </div>
        <div class="row mt-2 m-auto">
            <div class="col d-flex text-center">
                <i :class="`material-symbols-outlined`">bolt</i>
                <h5> {{ exception.reason }}
                </h5>

            </div>
        </div>

    </li>
</template>

<script>
import profileImagesService from '@/API/services/profile.images.service'

export default {
    name: 'Achievement Pages',
    props: {
        exception: {
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