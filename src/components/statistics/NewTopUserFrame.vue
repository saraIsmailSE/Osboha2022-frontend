<template>
    <figure :class="`snip1113 ${topNumber ? frameClass[topNumber] : 'Satin-Sheen-Gold'}   `">
        <div :class="{ containerClass, 'user-img img-fluid': !noMainClass }">
            <img :src="require(`@/assets/images/top_users/${image}`)" class="img-fluid rounded w-75" alt="blog-img" />
            <slot />
        </div>
        <figcaption>"
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

export default {
    name: "Top User Fa=rame",
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
        topNumber: {
            type: Number,
            default: null,
        },
        image: {
            type: String,
            required: true,
        },
        profile_id: {
            type: Number,
            default: null,
        },
        title: {
            type: String,
            default: "user image",
        },
        containerClass: {
            type: String,
            default: "",
        },
        noMainClass: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            frameClass: [
                'Satin-Sheen-Gold',
                'Space-Cadet',
                'Burnt-Umber'
            ]
        }
    }
};
</script>
<style scoped>
figure.snip1113 {
    font-family: 'Raleway', Arial, sans-serif;
    position: relative;
    padding-top: 1%;
    padding-bottom: 1%;
    margin: 10px;
    width: 100%;
    background: #ffffff;
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

figure.snip1113 * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

figure.snip1113 img {
    max-width: 80%;
    margin: 40px auto;
    display: block;
    position: relative;
    border: 3px solid #666666;
    padding: 15px 15px 85px 15px;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
}

figure.snip1113 figcaption {
    position: absolute;
    height: 150px;
    bottom: 0px;
    left: 0;
    right: 0;
    display: block;
}

figure.snip1113 h3 {
    background-color: #ffffff;
    color: #000000;
    font-size: 2em;
    width: 100%;
    padding: 1px 12px;
    margin: 0;
    text-transform: uppercase;
    font-weight: 400;
    text-align: center;
}

figure.snip1113 h3 span {
    font-weight: 800;
}

figure.snip1113 h4 {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: -1px;
    opacity: 0.6;
    font-size: 1.5em;
}

figure.snip1113.green img {
    border-color: #278036;
}

figure.snip1113.green h3 {
    color: #278036;
}

figure.snip1113.Satin-Sheen-Gold img {
    border-color: #BE9839;
}

figure.snip1113.Satin-Sheen-Gold h3 {
    color: #BE9839;
}

figure.snip1113.Burnt-Umber img {
    border-color: #8A3324;
}

figure.snip1113.Burnt-Umber h3 {
    color: #8A3324;
}

figure.snip1113.Space-Cadet img {
    border-color: #1d1e42;
}

figure.snip1113.Space-Cadet h3 {
    color: #1d1e42;
}

figure.snip1113.navy img {
    border-color: #2b3c4e;
}

figure.snip1113.navy h3,
figure.snip1113.navy h4 {
    color: #2b3c4e;
}
</style>
