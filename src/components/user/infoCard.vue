<template>
    <div class="container" style="background-color: #f1f9f5">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-12 col-xl-4 mt-3 mb-3">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body text-center">
                        <div class="mt-3 mb-3">
                            <!-- <BaseAvatar :profileImg="mark.user.user_profile.profile_picture"
                                :profile_id="mark.user.user_profile.id" :title="mark.user.gender" :gender="mark.user.gender"
                                avatarClass="avatar-130 img-fluid rounded-circle" dimensions="150x150" /> -->
                        </div>
                        <h2 class="mb-2 text-center">{{ user.name }}</h2>
                        <p class="text-center mb-4" style="direction: rtl">
                            فريق المتابعة
                            <span class="mx-2">|</span>
                            <a href="#!">{{ followup_team }}</a>
                        </p>
                        <div class="row text-center">
                            <span class="material-symbols-outlined align-middle text-center mb-2 display-2">
                                person_pin
                            </span>

                            <TitleText :title="'القائد'" :text="'اسم القائد'" />
                            <div class="col-6 p-1">
                                <h3 class="mb-2 text-center" style="direction: rtl">
                                    المراقب
                                </h3>
                                <p class="text-center">فريق المتابعة </p>
                            </div>
                            <div class="col-6 p-1">
                                <h3 class="mb-2 text-center" style="direction: rtl">
                                    القائد
                                </h3>
                                <p class="text-center">فريق المتابعة </p>
                            </div>
                            <div class="col-6 p-1">
                                <h3 class="mb-2 text-center" style="direction: rtl">
                                    المراقب
                                </h3>
                                <p class="text-center">فريق المتابعة </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TitleText from "./title-text"
export default {
    name: "Information Card",
    components: {
        TitleText,
    },
    created() {
    },

    props: {
        user: {
            type: [Object],
            required: true,
        },
        followup_team: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {};
    },
};
</script>  