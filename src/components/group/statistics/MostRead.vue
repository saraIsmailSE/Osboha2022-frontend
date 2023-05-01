<template>
    <div class="row">
        <!-- ########## START Most Read ########## -->
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="header-title">
                        <h4 class="card-title">الأكثر قراءة</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row d-flex justify-content-center mb-2">
                        <div class="col-6 m-auto d-flex justify-content-end">
                            <img v-if="most_read.user.user_profile.profile_picture"
                                :src="resolve_porfile_img('150x150', most_read.user.user_profile.profile_picture, most_read.user.user_profile.id)"
                                alt="profile-img" class="rounded-circle img-fluid avatar-120"
                                :title="most_read.user.name" />

                            <img v-else
                                :src="resolve_porfile_img('150x150', 'ananimous_' + most_read.user.gender + '.png', 'ananimous')"
                                alt="profile-img" :title="most_read.user.name" class="rounded-circle img-fluid avatar-120">
                        </div>
                        <div class="col-6 m-auto">
                            <h3>{{most_read.user.name}}</h3>
                            <h5>{{most_read.max_total_pages}}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ########## END Most Read ########## -->
    </div>
</template>

<script>
import profileImagesService from '@/API/services/profile.images.service'

export default {
    name: 'Most Read',
    props: {
        most_read: {
            type: [Object],
            required: true,
        },
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

    },
}

</script>
