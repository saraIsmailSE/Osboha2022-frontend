<template>
    <li class="d-flex align-items-center p-3" v-if="audit">
        <div class="user-img img-fluid">
            <img v-if="audit.mark.user.user_profile.profile_picture"
                :src="resolve_porfile_img('60x60', audit.mark.user.user_profile.profile_picture, audit.mark.user.user_profile.id)"
                alt="profile-img" class="rounded-circle avatar-40" :title="audit.mark.user.name" />

            <img v-else :src="resolve_porfile_img('60x60', 'ananimous_' + audit.mark.user.gender + '.png', 'ananimous')"
                alt="profile-img" :title="audit.mark.user.name" class="rounded-circle avatar-40">
        </div>
        <div class="d-flex align-items-center w-100 row">
            <div class="col-lg-3 col-md-3 col-sm-12 ms-3">
                <h6 class="d-inline-block">
                    <span :class="`ms-2 rounded badge text-white ${statusClass(audit.status)}`">{{audit_status[audit.status]}}</span>
                    <strong>{{ audit.mark.user.name }} </strong>
                </h6>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-12 form-check mt-2">
                <div class="d-block w-100">
                    <div class="progress">
                        <div :class="`${markClass(audit.mark.reading_mark + audit.mark.writing_mark + audit.mark.support)}`"
                            class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="90"
                            aria-valuemin="0" aria-valuemax="100"
                            :style="`width: ${audit.mark.reading_mark + audit.mark.writing_mark + audit.mark.support}%;`">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 text-center">
                <router-link
                    :to="{ name: 'group.markAudit', params: { mark_for_audit: audit.id } }">
                    <span class="badge bg-primary ms-0 ms-md-3 my-1 my-md-0 w-75 text-center text-white" role="button">عرض </span>
                </router-link>
            </div>
        </div>
    </li>
</template>

<script>
import profileImagesService from '@/API/services/profile.images.service'

export default {
    name: 'Achievement Progress',
    props: {
        audit: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            audit_status: {
                'acceptable': "مقبول" ,
                'unacceptable': "مرفوض" ,
                'not_audited': "لم يتم تدقيقه" ,
            }
        }
    },
    methods: {
        /**
        * return mark color class.
        *  @param  mark
        * @return class
        */
        markClass(mark) {
            switch (mark) {
                case 100:
                    return 'full-mark'

                case 0:
                    return 'zero-mark'

                default:
                    return 'incomplete'
            }
        },
        /**
        * return status bg-color class.
        *  @param  status
        * @return class
        */
        statusClass(status) {
            switch (status) {
                case 'acceptable':
                    return 'bg-primary'

                case 'unacceptable':
                    return 'bg-danger'

                default:
                    return 'bg-dark'
            }
        },
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
  
  
<style scoped>
.full-mark {
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
}

.zero-mark {
    width: 100% !important;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity)) !important;
}

.incomplete {
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity)) !important;
}
</style>
  