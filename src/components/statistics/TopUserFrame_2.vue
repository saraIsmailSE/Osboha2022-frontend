<template>
    <figure class="text-center">
        <div :class="{ containerClass, 'user-img img-fluid': !noMainClass }">
            <img v-if="profileImg" :src="resolve_porfile_img(dimensions, profileImg, profile_id)" alt="profile-img"
                :class="avatarClass" :title="title" :style="imageStyle" />

            <img v-else :src="resolve_porfile_img(dimensions, `ananimous_${gender}.png`, 'ananimous')
                " alt="profile-img" :title="title" :class="avatarClass" :style="imageStyle" />
            <slot />
        </div>
        <figcaption>
            <router-link :to="{
                name: 'user.profile',
                params: { user_id: userID },
            }">
                <h3 rple="button" style="direction: rtl">{{ userName }}</h3>
            </router-link>
            <h4 class="text-center" style="direction: rtl">
                {{ topValue }} - {{ topValueType }}
            </h4>
        </figcaption>
    </figure>
</template>

<script>
import profileImagesService from "@/API/services/profile.images.service";

export default {
    name: "Top User Farame 2",
    props: {
        userID: {
            type: Number,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        topValue: {
            type: Number,
            required: true,
        },
        topValueType: {
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            default: null,
        },
        profile_id: {
            type: Number,
            default: null,
        },
        dimensions: {
            type: String,
            default: "60x60",
        },
        title: {
            type: String,
            default: "user image",
        },
        avatarClass: {
            type: String,
            default: "avatar-40",
        },
        containerClass: {
            type: String,
            default: "",
        },
        gender: {
            type: String,
            default: "male",
        },
        imageStyle: {
            type: Object,
            default: null,
        },
        noMainClass: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        /**
         * get profile picture or cover.
         * @param  {String} size,
         * @param {String} name
         * @param {Int, String} profile_id
         * @return image url
         */
        resolve_porfile_img(size, imageName, profile_id) {
            return profileImagesService.resolve_porfile_img(
                size,
                imageName,
                profile_id
            );
        },
    },
};
</script>
<style scoped>
@property --gap {
    syntax: '<length>';
    inherits: true;
    initial-value: 0;
}

@property --angle {
    syntax: '<angle>';
    inherits: true;
    initial-value: 0deg;
}

img {
    --border: 15px;
    --gap: 12px;
    --color: #1d1a55;

    width: 200px;
    aspect-ratio: 1;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 20px;
    cursor: pointer;
    padding: calc(var(--border) + var(--gap));

    --angle: 90deg;
    background:
        radial-gradient(farthest-side, var(--color) 97%, #0000 101%) 85.35% 85.35%,
        conic-gradient(from calc(180deg - var(--angle)/2), #0000 var(--angle), var(--color) 0),
        radial-gradient(farthest-side, var(--color) 97%, #0000 101%) 14.65% 85.35%;
    background-size: var(--border) var(--border), auto;
    background-repeat: no-repeat;

    -webkit-mask:
        radial-gradient(farthest-side,
            #000 calc(99% - calc(var(--border) + var(--gap))),
            #0000 calc(100% - calc(var(--border) + var(--gap))) calc(99% - var(--border)),
            #000 calc(100% - var(--border)));
    mask:
        radial-gradient(farthest-side,
            #000 calc(99% - calc(var(--border) + var(--gap))),
            #0000 calc(100% - calc(var(--border) + var(--gap))) calc(99% - var(--border)),
            #000 calc(100% - var(--border)));
    transition: --angle .4s, --gap .4s;
}

img:hover {
    --angle: 0deg;
    --gap: 5px;
}

h3 {
    color: #000000;
    font-size: 1.5em;
    width: 100%;
    margin: 0;
    text-transform: uppercase;
    font-weight: 200;
    text-align: center;
}

h4 {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: -1px;
    opacity: 0.6;
    font-size: 1em;
}
</style>
