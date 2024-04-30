<template>
    <div id="wrapper">
        <div id="main">
            <div class="inner">
                <section id="home-section">
                    <div id="container01" class="style8 container default">
                        <div class="wrapper">
                            <div class="inner">
                                <img src="@/assets/images/main/osboha_logo_500.png" class="img-fluid " alt="blog-img" />
                                <hr id="divider01" class="style3">
                                <p id="text14" class="style4">Lorem ipsum dolor</p>
                            </div>
                        </div>
                    </div>
                    <ul id="buttons02" class="style1 buttons">
                        <li>
                            <a href="#start" class="button n01">Start</a>
                        </li>
                    </ul>
                    <hr id="divider03" class="style1">
                    <div id="container02" data-scroll-id="start" data-scroll-behavior="center" data-scroll-offset="0"
                        data-scroll-speed="3" class="style7 container default full screen">
                        <div class="wrapper">
                            <div class="inner">
                                <h2 id="text01" class="style1 text-center">Enim at Accumsan</h2>
                                <p id="text02" class="style2">Vitae dui ante eleifend accumsan ut at mus Adipiscing.
                                    Aenean condimentum, augue ut leo accumsan enim augue col tempus viverra cubilia
                                    consequat.</p>
                                <ul id="buttons01" class="style2 buttons">
                                    <li>
                                        <a href="#continue" class="button n01">Continue</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr id="divider04" class="style1">

                    <container-right-image />

                    <hr id="divider02" class="style1">
                    <div class="wrapper style1 container columns">
                        <div class="row inner pe-0 ps-0">
                            <div class="col-md-6 col-sm-12 mt-5 mb-5">
                                <h2 id="text07" class="style5">
                                    <span class="p">
                                        Lorem ipsum<br />dolor sit amet
                                    </span>
                                </h2>
                                <p id="text08" class="style6">Tortor faucibus ullamcorper nec tempus purus sed
                                    penatibus. Lacinia pellentesque eleifend vitae est elit tristique velit tempus
                                    etiam.</p>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <span class="frame deferred">
                                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxNTYwIDE1MTYiIHdpZHRoPSIxNTYwIiBoZWlnaHQ9IjE1MTYiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxyZWN0IGZpbGw9IiM3MzcyNzQiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4%3D"
                                        class="w-100" alt="" />
                                </span>
                            </div>

                        </div>
                    </div>

                    <hr id="divider05" class="style1">
                    <div id="container05" class="style2 container default">
                        <div class="wrapper">
                            <div class="inner">
                                <h2 id="text09" class="style5">Magnis parturient</h2>
                                <p id="text10" class="style6">
                                    <span class="p text-center">
                                        Justo phasellus et aenean dignissim<br />placerat cubilia purus lectus.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr id="divider06" class="style2">

                    <gallery-01 />

                    <hr id="divider07" class="style1">
                    <div id="container06" class="style3 container default">
                        <div class="wrapper">
                            <div class="inner">
                                <h2 id="text11" class="style5">Nisl sed ultricies</h2>
                                <p id="text12" class="style6">Diam dignissim lectus eu ornare volutpat orci.</p>
                                <form id="form01" class="style1" @submit.prevent="onSubmit()">
                                    <div class="inner">
                                        <div class="field">
                                            <label for="form01-name">الاسم الأول</label>
                                            <input type="text" name="name" id="form01-name" placeholder=""
                                                maxlength="128" v-model="v$.form.name.$model" />
                                            <p class="mt-2" style="color: red" v-if="v$.form.name.$error">
                                                الاسم مطلوب
                                            </p>

                                        </div>
                                        <div class="field">
                                            <label for="form01-email">الاسم الاخير</label>
                                            <input type="text" name="last_name" id="form01-last_name"
                                                placeholder="الاسم الأخير" maxlength="128"
                                                v-model="v$.form.last_name.$model" />
                                            <p class="mt-2" style="color: red" v-if="v$.form.last_name.$error">
                                                الاسم الاخير مطلوب
                                            </p>

                                        </div>

                                        <div class="field">
                                            <label for="form01-email">البريد الالكتروني</label>
                                            <input type="email" name="email" id="form01-email" placeholder=""
                                                maxlength="128" v-model="v$.form.email.$model" />
                                            <p class="mt-2" style="color: red" v-if="v$.form.email.$error">البريد
                                                الالكتروني غير
                                                صحيح
                                            </p>

                                        </div>
                                        <div class="field">
                                            <label for="form01-email">كلمة المرور</label>
                                            <input type="password" name="password" id="form01-password" class="w-100"
                                                maxlength="128" v-model="v$.form.password.$model" />
                                            <p class="mt-2" style="color: red" v-if="v$.form.password.$error">
                                                يجب ادخل كلمة مرور
                                                صالحة لا تقل عن 8 أحرف</p>
                                        </div>
                                        <div class="field">
                                            <label for="form01-email">اختر جنسك</label>
                                            <select v-model="v$.form.gender.$model" class="form-select" data-trigger
                                                name="gender" id="gender">
                                                <option value="" selected>اختر جنسك</option>
                                                <option value="male">ذكر</option>
                                                <option value="female">انثى</option>
                                            </select>
                                            <small p class="mt-2" style="color: red" v-if="v$.form.gender.$error">اختر
                                                جنسك</small>

                                        </div>

                                        <div class="actions">
                                            <button type="submit" class="btn btn-primary" @click="onSubmit()"
                                                :disabled="loader">تسجيل</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr id="divider08" class="style2">
                    <div id="container07" class="style6 container default">
                        <div class="wrapper">
                            <div class="inner">
                                <h2 class="text-center">SOCIAL MEADI</h2>
                                <!-- <ul id="icons02" class="style1 icons">
                                    <li>
                                        <a class="n02" href="#" aria-label="Facebook">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path
                                                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.3 482.4 504 379.8 504 256z" />
                                            </svg> <svg>
                                                <use xlink:href="#icon-a1eb5cac0cee3b05a40d856c98ce14a5"></use>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="n03" href="#" aria-label="Instagram">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path
                                                    d="M224 202.7A53.3 53.3 0 1 0 277.4 256 53.4 53.4 0 0 0 224 202.7zm124.7-41a54 54 0 0 0 -30.4-30.4c-21-8.3-71-6.4-94.3-6.4s-73.3-1.9-94.3 6.4a54 54 0 0 0 -30.4 30.4c-8.3 21-6.4 71.1-6.4 94.3S91 329.3 99.3 350.3a54 54 0 0 0 30.4 30.4c21 8.3 71 6.4 94.3 6.4s73.2 1.9 94.3-6.4a54 54 0 0 0 30.4-30.4c8.4-21 6.4-71.1 6.4-94.3S357.1 182.7 348.8 161.7zM224 338a82 82 0 1 1 82-82A81.9 81.9 0 0 1 224 338zm85.4-148.3a19.1 19.1 0 1 1 19.1-19.1A19.1 19.1 0 0 1 309.4 189.7zM400 32H48A48 48 0 0 0 0 80V432a48 48 0 0 0 48 48H400a48 48 0 0 0 48-48V80A48 48 0 0 0 400 32zM382.9 322c-1.3 25.6-7.1 48.3-25.9 67s-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.9-67c-1.5-26.4-1.5-105.6 0-132 1.3-25.6 7.1-48.3 25.9-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0 25.6 1.3 48.3 7.2 67 25.9s24.6 41.4 25.9 67.1C384.4 216.4 384.4 295.6 382.9 322z" />
                                            </svg> <span class="label">Instagram</span>
                                        </a>
                                    </li>
                                </ul> -->
                            </div>
                        </div>
                    </div>
                    <div id="container08" class="style4 container default">
                        <div class="wrapper">
                            <div class="inner">
                                <p id="text13" class="style7">© Untitled. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, requiredIf } from "@vuelidate/validators";
import Gallery01 from '@/components/common/Gallery01.vue';
import ContainerRightImage from '@/components/common/ContainerRightImage.vue';

export default {
    components: { Gallery01, ContainerRightImage },
    name: 'ComplexComponent',
    setup() {
        return { v$: useVuelidate() };
    },

    data() {
        return {
            loader: false,
            form: {
                name: "",
                last_name: "",
                password: "",
                email: "",
                gender: "",
            },
            regError: "",
        };
    },
    methods: {
        async onSubmit() {
            console.log("🚀 ~ onSubmit ~ onSubmit:")
            this.v$.$touch();

            if (!this.v$.form.$invalid) {
                try {
                    this.loader = true;
                    this.regError = "";
                    await this.$store.dispatch("register", {
                        email: this.form.email,
                        password: this.form.password,
                        name: this.form.name,
                        last_name: this.form.last_name,
                        gender: this.form.gender,
                    });

                    this.loader = false;
                    this.$router.push({ name: "auth.confirmmail" });
                } catch (error) {
                    this.loader = false;
                    if (
                        error.response.data.data.email &&
                        error.response.data.data.email ==
                        "The email has already been taken."
                    ) {
                        this.regError = " البريد الالكتروني موجود مسبقاً، قم بتسجيل الدخول";
                    } else {
                        console.log(error);
                    }
                }
            }
        },
    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                    min: minLength(8),
                },
                name: {
                    required,
                },
                last_name: {
                    required
                },
                gender: {
                    required,
                },
            },
        };
    },
};
</script>

<style scoped>
html,
body,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
img,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
ol,
ul,
li,
form,
label,
caption,
footer,
header,
nav,
section,
ol,
ul {
    list-style: none;
}



/* yes */
*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    line-height: 1.0;
    min-height: var(--viewport-height);
    min-width: 320px;
    overflow-x: hidden;
    word-wrap: break-word;
}

body:before {
    content: '';
    display: block;
    background-attachment: scroll;
    height: var(--background-height);
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    transform: scale(1);
    width: 100vw;
    z-index: 0;
    background-image: url('@/assets/images/main/signup_bg.png');
    background-size: cover;
    background-position: center, top;
    background-repeat: no-repeat;
    background-color: #FFFFFF;
}

body:after {
    background-color: #080808;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    transform: scale(1);
    transition: opacity 1.5s ease-in-out 0s, visibility 1.5s 0s;
    visibility: hidden;
    width: 100%;
    z-index: 1;
}

body.is-loading:after {
    opacity: 1;
    visibility: visible;
}

:root {
    --background-height: 100vh;
    --site-language-alignment: left;
    --site-language-direction: ltr;
    --site-language-flex-alignment: flex-start;
    --site-language-indent-left: 1;
    --site-language-indent-right: 0;
    --viewport-height: 100vh;
}

html {
    font-size: 18pt;
}

u {
    text-decoration: underline;
}

strong {
    color: inherit;
    font-weight: bolder;
}

spoiler-text {
    -webkit-text-stroke: 0;
    background-color: rgba(32, 32, 32, 0.75);
    text-shadow: none;
    text-stroke: 0;
    color: transparent;
    cursor: pointer;
    transition: color 0.1s ease-in-out;
}

spoiler-text.active {
    color: #1D1A55;
    cursor: text;
}

s {
    text-decoration: line-through;
}

sub {
    font-size: smaller;
    vertical-align: sub;
}

sup {
    font-size: smaller;
    vertical-align: super;
}

a {
    color: inherit;
    text-decoration: underline;
    transition: color 0.25s ease;
}

a[onclick]:not([href]) {
    cursor: pointer;
}

deferred-script {
    display: none;
}

#wrapper {
    -webkit-overflow-scrolling: touch;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: var(--viewport-height);
    overflow: hidden;
    position: relative;
    z-index: 2;
}

#main {
    --alignment: center;
    --flex-alignment: center;
    --indent-left: 1;
    --indent-right: 1;
    --border-radius-tl: 0;
    --border-radius-tr: 0;
    --border-radius-br: 0;
    --border-radius-bl: 0;
    align-items: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: center;
    max-width: 100%;
    position: relative;
    text-align: var(--alignment);
    z-index: 1;
    transition: opacity 1.5s ease 0s, transform 1.5s ease 0s;
}

#main>.inner {
    --padding-horizontal: 3rem;
    --padding-vertical: 6rem;
    --spacing: 0rem;
    --width: 52rem;
    border-radius: var(--border-radius-tl) var(--border-radius-tr) var(--border-radius-br) var(--border-radius-bl);
    max-width: 100%;
    position: relative;
    width: var(--width);
    z-index: 1;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

#main>.inner>header {
    margin-bottom: var(--spacing);
}

#main>.inner>footer {
    margin-top: var(--spacing);
}

#main>.inner>*>* {
    margin-top: var(--spacing);
    margin-bottom: var(--spacing);
}

#main>.inner>*> :first-child {
    margin-top: 0 !important;
}

#main>.inner>*> :last-child {
    margin-bottom: 0 !important;
}

#main>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);
    width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);
}

#main>.inner>.full:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

#main>.inner>.full:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

#main>.inner>.full.screen {
    border-radius: 0 !important;
    max-width: 100vw;
    position: relative;
    width: 100vw;
    left: 50%;
    margin-left: -50vw;
    right: auto;
}

#main>.inner>*>.full {
    margin-left: calc(-3rem);
    max-width: calc(100% + 6rem + 0.4725px);
    width: calc(100% + 6rem + 0.4725px);
}

#main>.inner>*>.full.screen {
    border-radius: 0 !important;
    max-width: 100vw;
    position: relative;
    width: 100vw;
    left: 50%;
    margin-left: -50vw;
    right: auto;
}

#main>.inner>.active>.full:first-child {
    margin-top: -6rem !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

#main>.inner>.active {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

#main>.inner>.active>.full:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    margin-bottom: -6rem !important;
}

body.is-loading #main {
    opacity: 0;
    transform: translateY(1.6875rem);
}

body.is-instant #main,
body.is-instant #main>.inner>*,
body.is-instant #main>.inner>section>* {
    transition: none !important;
}

body.is-instant:after {
    display: none !important;
    transition: none !important;
}

@keyframes loading-spinner {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.deferred:before {
    content: '';
    display: block;
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -2rem 0 0 -2rem;
    animation: loading-spinner 1s infinite linear;
    transition: opacity 0.25s ease;
    transition-delay: 0.5s;
    opacity: 0;
    z-index: -1;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTZweCIgaGVpZ2h0PSI5NnB4IiB2aWV3Qm94PSIwIDAgOTYgOTYiIHpvb21BbmRQYW49ImRpc2FibGUiPjxzdHlsZT5jaXJjbGUge2ZpbGw6IHRyYW5zcGFyZW50OyBzdHJva2U6ICNmZmY7IHN0cm9rZS13aWR0aDogMS41cHg7IH08L3N0eWxlPjxkZWZzPjxjbGlwUGF0aCBpZD0iY29ybmVyIj48cG9seWdvbiBwb2ludHM9IjAsMCA0OCwwIDQ4LDQ4IDk2LDQ4IDk2LDk2IDAsOTYiIC8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI2Nvcm5lcikiPjxjaXJjbGUgY3g9IjQ4IiBjeT0iNDgiIHI9IjMyIi8+PC9nPjwvc3ZnPg==');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 3rem;
}

.deferred.loading:before {
    opacity: 0.35;
    z-index: 0;
}

h1,
h2,
h3,
p {
    direction: var(--site-language-direction);
    position: relative;
}

h1 span.p,
h2 span.p,
h3 span.p,
p span.p {
    display: block;
    position: relative;
}

h1 span[style],
h2 span[style],
h3 span[style],
p span[style],
h1 strong,
h2 strong,
h3 strong,
p strong,
h1 a,
h2 a,
h3 a,
p a,
h1 spoiler-text,
h2 spoiler-text,
h3 spoiler-text,
p spoiler-text {
    -webkit-text-fill-color: currentcolor;
}

h1.style3,
h2.style3,
h3.style3,
p.style3 {
    text-transform: uppercase;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.4rem);
    font-size: 2em;
    line-height: 1;
    font-weight: 600;
}

h1.style3 a,
h2.style3 a,
h3.style3 a,
p.style3 a {
    text-decoration: underline;
}

h1.style3 a:hover,
h2.style3 a:hover,
h3.style3 a:hover,
p.style3 a:hover {
    text-decoration: none;
}

h1.style3 span.p:nth-child(n + 2),
h2.style3 span.p:nth-child(n + 2),
h3.style3 span.p:nth-child(n + 2),
p.style3 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style1,
h2.style1,
h3.style1,
p.style1 {
    text-transform: uppercase;
    color: #FFFFFF;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.4rem);
    font-size: 1.75em;
    line-height: 1.5;
    font-weight: 400;
}

h1.style1 a,
h2.style1 a,
h3.style1 a,
p.style1 a {
    text-decoration: underline;
}

h1.style1 a:hover,
h2.style1 a:hover,
h3.style1 a:hover,
p.style1 a:hover {
    text-decoration: none;
}

h1.style1 span.p:nth-child(n + 2),
h2.style1 span.p:nth-child(n + 2),
h3.style1 span.p:nth-child(n + 2),
p.style1 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style2,
h2.style2,
h3.style2,
p.style2 {
    text-align: center;
    color: #FFFFFF;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.05rem);
    font-size: 1em;
    line-height: 1.75;
    font-weight: 300;
}

h1.style2 a,
h2.style2 a,
h3.style2 a,
p.style2 a {
    text-decoration: underline;
}

h1.style2 a:hover,
h2.style2 a:hover,
h3.style2 a:hover,
p.style2 a:hover {
    text-decoration: none;
}

h1.style2 span.p:nth-child(n + 2),
h2.style2 span.p:nth-child(n + 2),
h3.style2 span.p:nth-child(n + 2),
p.style2 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style4,
h2.style4,
h3.style4,
p.style4 {
    text-transform: uppercase;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.225rem);
    font-size: 1em;
    line-height: 1.5;
    font-weight: 300;
    text-align: center;
}

h1.style4 a,
h2.style4 a,
h3.style4 a,
p.style4 a {
    text-decoration: underline;
}

h1.style4 a:hover,
h2.style4 a:hover,
h3.style4 a:hover,
p.style4 a:hover {
    text-decoration: none;
}

h1.style4 span.p:nth-child(n + 2),
h2.style4 span.p:nth-child(n + 2),
h3.style4 span.p:nth-child(n + 2),
p.style4 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style5,
h2.style5,
h3.style5,
p.style5 {
    text-align: center;
    text-transform: uppercase;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.4rem;
    width: calc(100% + 0.4rem);
    font-size: 1.375em;
    line-height: 1.5;
    font-weight: 400;
}

h1.style5 a,
h2.style5 a,
h3.style5 a,
p.style5 a {
    text-decoration: underline;
}

h1.style5 a:hover,
h2.style5 a:hover,
h3.style5 a:hover,
p.style5 a:hover {
    text-decoration: none;
}

h1.style5 span.p:nth-child(n + 2),
h2.style5 span.p:nth-child(n + 2),
h3.style5 span.p:nth-child(n + 2),
p.style5 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style6,
h2.style6,
h3.style6,
p.style6 {
    text-align: center;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.05rem;
    width: calc(100% + 0.05rem);
    font-size: 1em;
    line-height: 1.75;
    font-weight: 300;
}

h1.style6 a,
h2.style6 a,
h3.style6 a,
p.style6 a {
    text-decoration: underline;
}

h1.style6 a:hover,
h2.style6 a:hover,
h3.style6 a:hover,
p.style6 a:hover {
    text-decoration: none;
}

h1.style6 span.p:nth-child(n + 2),
h2.style6 span.p:nth-child(n + 2),
h3.style6 span.p:nth-child(n + 2),
p.style6 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style7,
h2.style7,
h3.style7,
p.style7 {
    text-align: center;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.05rem;
    width: calc(100% + 0.05rem);
    font-size: 0.875em;
    line-height: 1.75;
    font-weight: 300;
}

h1.style7 a,
h2.style7 a,
h3.style7 a,
p.style7 a {
    text-decoration: underline;
}

h1.style7 a:hover,
h2.style7 a:hover,
h3.style7 a:hover,
p.style7 a:hover {
    text-decoration: none;
}

h1.style7 span.p:nth-child(n + 2),
h2.style7 span.p:nth-child(n + 2),
h3.style7 span.p:nth-child(n + 2),
p.style7 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

.buttons {
    cursor: default;
    display: flex;
    justify-content: var(--flex-alignment);
    letter-spacing: 0;
    padding: 0;
}

.buttons li {
    max-width: 100%;
}

.buttons li a {
    align-items: center;
    justify-content: center;
    max-width: 100%;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
}

.buttons.style2 {
    gap: 1rem;
    flex-direction: row;
    flex-wrap: wrap;
}

.buttons.style2 li a {
    display: inline-block;
    width: 18rem;
    height: 3.875rem;
    line-height: 3.875rem;
    padding: 0 0.5rem;
    vertical-align: middle;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.1rem;
    padding-left: calc(0.1rem + 0.5rem);
    font-size: 1em;
    font-weight: 400;
    border-radius: 2rem;
    direction: var(--site-language-direction);
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.buttons.style2 .button {
    background-color: #FFFFFF;
    color: #35B88F;
}

.buttons.style2 .button:hover {
    background-color: #E6F0EC !important;
}

.buttons.style1 {
    gap: 0rem;
    flex-direction: row;
    flex-wrap: wrap;
}

.buttons.style1 li a {
    display: inline-block;
    width: 18rem;
    height: 3.875rem;
    line-height: 3.875rem;
    padding: 0 0.5rem;
    vertical-align: middle;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.1rem;
    padding-left: calc(0.1rem + 0.5rem);
    font-size: 1em;
    font-weight: 400;
    border-radius: 2rem;
    direction: var(--site-language-direction);
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.buttons.style1 .button {
    background-color: #FFFFFF;
    color: #3A3939;
}

.buttons.style1 .button:hover {
    background-color: #E6F0EC !important;
}

.buttons.style4 {
    gap: 1rem;
    flex-direction: row;
    flex-wrap: wrap;
}

.buttons.style4 li a {
    display: inline-block;
    width: 8.875rem;
    height: 3rem;
    line-height: 3rem;
    padding: 0 0.5rem;
    vertical-align: middle;
    font-family: 'Tajawal', sans-serif;
    padding-left: calc(0.1rem + 0.5rem);
    font-size: 1em;
    font-weight: 400;
    border-radius: 2rem;
    direction: var(--site-language-direction);
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.buttons.style4 .button {
    background-color: #35B88F;
    color: #FFFFFF;
}

.buttons.style4 .button:hover {
    background-color: #42C99F !important;
}

hr {
    align-items: center;
    border: 0;
    display: flex;
    justify-content: var(--flex-alignment);
    min-height: 4rem;
    padding: 0;
    position: relative;
    width: 100%;
    background: unset;
}

hr:before {
    content: '';
}

.style3:before {
    width: 16rem;
    border-bottom: solid 3px #1D1A55;
    border-top: solid 3px #1D1A55;
    height: 3px;
}

.style1:before {
    height: 8rem;
    background-color: #1D1A55;
    width: 1px;
    border-radius: 0px;
}

.style2:before {
    height: 4rem;
    background-color: #1D1A55;
    width: 1px;
    border-radius: 0px;
}

.container {
    position: relative;
}

.container>.wrapper {
    vertical-align: top;
    position: relative;
    max-width: 100%;
    border-radius: inherit;
}

.container>.wrapper>.inner {
    vertical-align: top;
    position: relative;
    max-width: 100%;
    border-radius: inherit;
    text-align: var(--alignment);
}

#main .container.full:first-child>.wrapper {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

#main .container.full:last-child>.wrapper {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

#main .container.full:first-child>.wrapper>.inner {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

#main .container.full:last-child>.wrapper>.inner {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style8 {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}

.container.style8>.wrapper>.inner {
    --gutters: 2rem;
    --padding-horizontal: 2rem;
    --padding-vertical: 8rem;
    --spacing: 0.75rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style8>.wrapper {
    max-width: var(--width);
    width: 100%;
}

.container.style8.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style8.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style8.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style8.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style8.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style8.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style8.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style8.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style8.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style8.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style8.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style8.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style8.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style8.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style8.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style8.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style8.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style8.columns>.wrapper>.inner>div:first-child,
.container.style8.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style8.columns>.wrapper>.inner>div:last-child,
.container.style8.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style8.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style8.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style8.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style8.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style8.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.container.style7 {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-attachment: scroll;
    background-color: #1D1A55;
}

.container.style7>.wrapper>.inner {
    --gutters: 2rem;
    --padding-horizontal: 2rem;
    --padding-vertical: 6rem;
    --spacing: 1.5rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style7>.wrapper {
    max-width: 30rem;
    width: 100%;
}

.container.style7.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style7.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style7.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style7.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style7.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style7.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style7.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style7.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style7.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style7.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style7.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style7.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style7.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style7.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style7.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style7.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style7.columns>.wrapper>.inner>div:first-child,
.container.style7.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>div:last-child,
.container.style7.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style7.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

#container02 {
    background-image: url('@/assets/images/main/book-lineart.svg');
    background-position: 50% 100%;
    background-repeat: repeat;
    background-size: cover;

}

.container.style1 {
    --alignment: left;
    --flex-alignment: flex-start;
    --indent-left: 1;
    --indent-right: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
}

.container.style1>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 4rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style1>.wrapper {
    max-width: var(--width);
    width: 100%;
}

.container.style1.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style1.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style1.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style1.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style1.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style1.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style1.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style1.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style1.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style1.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style1.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style1.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style1.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style1.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style1.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style1.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style1.columns>.wrapper>.inner>div:first-child,
.container.style1.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>div:last-child,
.container.style1.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style1.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

#container04>.wrapper>.inner> :nth-child(1) {
    width: calc(50% + (var(--gutters) / 2));
}

#container04>.wrapper>.inner> :nth-child(2) {
    width: calc(50% + (var(--gutters) / 2));
}

.container.style5 {
    --alignment: left;
    --flex-alignment: flex-start;
    --indent-left: 1;
    --indent-right: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
}

.container.style5>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 4rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style5>.wrapper {
    max-width: var(--width);
    width: 100%;
}

.container.style5.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style5.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style5.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style5.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style5.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style5.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style5.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style5.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style5.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style5.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style5.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style5.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style5.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style5.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style5.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style5.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style5.columns>.wrapper>.inner>div:first-child,
.container.style5.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>div:last-child,
.container.style5.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style5.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

#container03>.wrapper>.inner> :nth-child(1) {
    width: calc(50% + (var(--gutters) / 2));
}

#container03>.wrapper>.inner> :nth-child(2) {
    width: calc(50% + (var(--gutters) / 2));
}

.container.style2>.wrapper {
    display: inline-block;
    width: 26rem;
    background-color: #FFFFFF;
}

.container.style2>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 3rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style2.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style2.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style2.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style2.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style2.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style2.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style2.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style2.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style2.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style2.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style2.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style2.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style2.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style2.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style2.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style2.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style2.columns>.wrapper>.inner>div:first-child,
.container.style2.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>div:last-child,
.container.style2.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style2.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.container.style3>.wrapper {
    display: inline-block;
    width: 35rem;
    background-color: #FFFFFF;
}

.container.style3>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 4rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style3.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style3.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style3.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style3.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style3.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style3.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style3.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style3.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style3.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style3.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style3.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style3.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style3.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style3.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style3.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style3.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style3.columns>.wrapper>.inner>div:first-child,
.container.style3.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>div:last-child,
.container.style3.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style3.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.container.style6>.wrapper {
    display: inline-block;
    width: 25rem;
    background-color: transparent;
    border-color: #FFFFFF;
    border-style: solid;
    border-width: 1px;
    border-radius: 3rem;
}

.container.style6>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 2rem;
    --padding-vertical: 1rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
    border-radius: calc(3rem - 1px);
}

.container.style6.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style6.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style6.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style6.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style6.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style6.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style6.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style6.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style6.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style6.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style6.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style6.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style6.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style6.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style6.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style6.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style6.columns>.wrapper>.inner>div:first-child,
.container.style6.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>div:last-child,
.container.style6.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style6.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.container.style4 {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}

.container.style4:not(:first-child) {
    margin-top: 2rem !important;
}

.container.style4>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 2rem;
    --padding-vertical: 2rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style4>.wrapper {
    max-width: var(--width);
    width: 100%;
}

.container.style4.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style4.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style4.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style4.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style4.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style4.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style4.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style4.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style4.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style4.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style4.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style4.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style4.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style4.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style4.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style4.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style4.columns>.wrapper>.inner>div:first-child,
.container.style4.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>div:last-child,
.container.style4.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style4.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.image {
    display: block;
    line-height: 0;
    max-width: 100%;
    position: relative;
}

.image .frame {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    vertical-align: top;
    width: 100%;
}

.image .frame img {
    border-radius: 0 !important;
    max-width: 100%;
    vertical-align: top;
    width: inherit;
}

.image.full .frame {
    display: block;
}

.image.full:first-child .frame {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.image.full:last-child .frame {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.image.style1 .frame {
    width: 100vw;
    transition: none;
}

.image.style1 img {
    height: 100% !important;
    object-fit: cover;
    object-position: center;
    width: 100% !important;
}

.image.style1 .frame img {
    transition: none;
}


.icons {
    color: #1D1A55;
    display: flex;
    flex-wrap: wrap;
    justify-content: var(--flex-alignment);
    padding: 0;
}

.icons li {
    position: relative;
    z-index: 1;
}

.icons li a {
    align-items: center;
    display: flex;
    justify-content: center;
}

.icons li a svg {
    display: block;
    position: relative;
}

.icons li a+svg {
    display: block;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
}

.icons li a .label {
    display: none;
}

.icons.style1 {
    font-size: 1.25em;
    gap: 1.5rem;
}

.icons.style1 li a {
    border-radius: 2rem;
    height: 1em;
    width: 1em;
    transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.icons.style1 li a svg {
    height: 100%;
    width: 100%;
    transition: fill 0.25s ease;
}

.icons.style1 a svg {
    fill: #FFFFFF;
}

.icons.style1 a:hover svg {
    fill: #42C99F !important;
}

.icons.style1 li a+svg {
    transition: fill 0.25s ease, stroke 0.25s ease;
}

form {
    display: flex;
    justify-content: var(--flex-alignment);
}

form .inner {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 100%;
}

form label {
    font-size: 1.5rem !important;
    direction: var(--site-language-direction);
    display: block;
}

form .field[data-type="label"]+div {
    margin-top: 0 !important;
}

form .field button {
    align-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: absolute;
}

form .field button>svg {
    height: 50%;
    min-width: 100%;
}

form input[type="text"],
form input[type="email"],
form input[type="tel"],
form input[type="number"],
form textarea,
form select,
form .file,
form .date {
    background-color: transparent;
    border: 0;
    direction: var(--site-language-direction);
    display: block;
    outline: 0;
    text-align: var(--site-language-alignment);
    width: 100%;
}

form input[type="tel"] {
    -webkit-appearance: none;
}

form textarea {
    height: 10rem;
    line-height: normal;
}

form select {
    background-repeat: no-repeat;
    background-size: 1rem;
    text-overflow: ellipsis;
    -webkit-appearance: none;
}

form select option {
    background-color: white;
    color: black;
}

form select::-ms-expand {
    display: none;
}

form p {
    display: block;
}

form input[type="checkbox"] {
    -webkit-appearance: none;
    display: block;
    float: left;
    margin-right: -2rem;
    opacity: 0;
    width: 1rem;
    z-index: -1;
}

form input[type="checkbox"]+label {
    align-items: center;
    display: inline-flex;
    line-height: 1.6;
    text-align: var(--site-language-alignment);
}

form input[type="checkbox"]+label:before {
    background-position: center;
    background-repeat: no-repeat;
    content: '';
    cursor: pointer;
    display: inline-block;
    flex-grow: 0;
    flex-shrink: 0;
    vertical-align: middle;
}

form input[type="number"] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
}

form input[type="number"]::-webkit-inner-spin-button,
form input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

form .number {
    position: relative;
}

form .number>input[type="number"] {
    text-align: center;
}

form .field .number>button>svg {
    height: 40%;
}

form .file {
    position: relative;
}

form .file>input[type="file"] {
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
}

form .file[data-filename]:before {
    background-repeat: no-repeat;
    content: attr(data-filename);
    display: block;
    height: 100%;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 0;
    white-space: nowrap;
}

form .file[data-filename=""]:before {
    background-image: none !important;
    content: attr(data-placeholder);
    padding-left: 0 !important;
}

form .field .file>button>svg {
    height: 53%;
}

form .date {
    overflow: hidden;
    position: relative;
}

form .date input[type="date"] {
    cursor: pointer;
    display: block;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100vw;
}

form .date[data-value]:before {
    background-repeat: no-repeat;
    display: block;
    height: 100%;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 0;
    white-space: nowrap;
}

form .date:not([data-value=""]):before {
    content: attr(data-value);
}

form .date[data-value=""]:before {
    content: attr(data-placeholder);
}

form .field .date>button>svg {
    height: 60%;
}

form .actions {
    max-width: 100%;
}

form .actions button {
    align-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    max-width: 100%;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
}

form .actions button:disabled {
    cursor: default;
    opacity: 0.35;
    pointer-events: none;
}

@keyframes button-spinner {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

form.style1:not(:first-child) {
    margin-top: 2.5rem !important;
}

form.style1:not(:last-child) {
    margin-bottom: 2.5rem !important;
}

form.style1 .inner>* {
    margin: 1.25rem 0 0 0;
    max-width: 100%;
}

form.style1 .inner> :first-child {
    margin: 0;
}

form.style1 .inner {
    width: 100%;
}

form.style1 label:first-child {
    margin: 0.25rem 0 0.9375rem 0;
    text-transform: uppercase;
    font-size: 1.5em;
    line-height: 1.5;
    font-family: 'Tajawal', sans-serif;

    padding-left: 0.325rem;
    font-weight: 400;
    color: #3A3939;
}

form.style1 .field button {
    background-size: 1.3rem;
    height: 2.6rem;
    line-height: 2.6rem;
    width: 2.6rem;
    border-radius: 0rem;
    background-color: #35B88F;
    transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

form.style1 .field button:hover {
    background-color: #42C99F;
}

form.style1 .field button svg {
    fill: #FFFFFF;
    transition: fill 0.25s ease;
}

form.style1 input[type="text"],
form.style1 input[type="email"],
form.style1 input[type="password"],
form.style1 input[type="number"],
form.style1 textarea,
form.style1 select,
form.style1 .file,
form.style1 .date {
    font-size: 1em;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.05rem;
    padding-left: calc(0.05rem + 1.1375rem);
    font-weight: 300;
    border-radius: 0rem;
    color: #3A3939;
    background-color: #F1F1F1;
}

form.style1 input[type="text"]:focus,
form.style1 input[type="email"]:focus,
form.style1 input[type="tel"]:focus,
form.style1 input[type="number"]:focus,
form.style1 input[type="password"]:focus,
form.style1 textarea:focus,
form.style1 select:focus,
form.style1 .file:focus,
form.style1 .date.focus {
    box-shadow: 0 0 0 1px #35B88F, inset 0 0 0 1px #35B88F;
}

form.style1 input[type="text"],
form.style1 input[type="email"],
form.style1 input[type="tel"],
form.style1 input[type="number"],
form.style1 input[type="password"],
form.style1 select,
form.style1 .file,
form.style1 .date {
    height: 3.25rem;
    padding: 0 1.1375rem;
    line-height: 3.25rem;
}

form.style1 textarea {
    padding: 1.1375rem;
    height: 12rem;
    line-height: 1.5;
    padding-top: 0.875rem;
}

form.style1 select {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='504' height='552' preserveAspectRatio='none' viewBox='0 0 504 552'%3E%3Cpath d='M483.9,210.9L252,442.9L20.1,210.9l67.9-67.9L252,307.1l164.1-164.1L483.9,210.9z' fill='%233A3939' /%3E%3C/svg%3E");
    background-position: calc(100% - 1.1375rem) center;
    padding-right: 3.1875rem;
}

form.style1 input[type="checkbox"]+label:before {
    border-radius: 0rem;
    color: #3A3939;
    background-color: #F1F1F1;
    background-size: 1.38125rem;
    height: 2.4375rem;
    width: 2.4375rem;
    margin-right: 1.21875rem;
}

form.style1 input[type="checkbox"]:checked+label:before {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='648' height='552' preserveAspectRatio='none' viewBox='0 0 648 552'%3E%3Cpath d='M225.3,517.7L2.1,293.1l68.1-67.7L226,382.3L578.1,35.6l67.4,68.4L225.3,517.7z' fill='%233A3939' /%3E%3C/svg%3E");
}

form.style1 input[type="checkbox"]:focus+label:before {
    box-shadow: 0 0 0 1px #35B88F, inset 0 0 0 1px #35B88F;
}

form.style1 input[type="radio"]:checked+label:before {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='648' height='552' preserveAspectRatio='none' viewBox='0 0 648 552'%3E%3Cpath d='M225.3,517.7L2.1,293.1l68.1-67.7L226,382.3L578.1,35.6l67.4,68.4L225.3,517.7z' fill='%233A3939' /%3E%3C/svg%3E");
}

form.style1 input[type="radio"]:focus+label:before {
    box-shadow: 0 0 0 1px #35B88F, inset 0 0 0 1px #35B88F;
}

form.style1 .number>input[type="number"] {
    padding-left: 3.1rem;
    padding-right: 3.1rem;
}

form.style1 .number>button.decrement {
    bottom: 0.325rem;
    left: 0.325rem;
}

form.style1 .number>button.increment {
    bottom: 0.325rem;
    right: 0.325rem;
}

form.style1 .file:before {
    width: calc(100% - 4.3875rem);
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' preserveAspectRatio='none' viewBox='0 0 40 40'%3E%3Cpath d='M27.4,4.5c-0.4-0.4-0.8-0.7-1.5-0.9c-0.6-0.3-1.2-0.4-1.7-0.4H7.1c-0.5,0-0.9,0.2-1.3,0.5S5.3,4.5,5.3,5.1v30.7 c0,0.5,0.2,0.9,0.5,1.3c0.4,0.4,0.8,0.5,1.3,0.5h25.8c0.5,0,0.9-0.2,1.3-0.5c0.4-0.4,0.5-0.8,0.5-1.3V13.7c0-0.5-0.1-1.1-0.4-1.7 c-0.3-0.6-0.6-1.1-0.9-1.5L27.4,4.5z M25.7,6.2l6,6c0.2,0.2,0.3,0.4,0.4,0.8h-7.2V5.8C25.3,5.9,25.5,6.1,25.7,6.2z M7.7,35.2V5.7 h14.7v8c0,0.5,0.2,0.9,0.5,1.3c0.4,0.4,0.8,0.5,1.3,0.5h8v19.7H7.7z' style='opacity: 0.375' fill='%233A3939' /%3E%3C/svg%3E");
    background-size: 1rem;
    background-position: left;
    padding-left: 1.4rem;
}

form.style1 .file>button {
    bottom: 0.325rem;
    right: 0.325rem;
}

form.style1 .date:before {
    width: calc(100% - 4.3875rem);
}

form.style1 .date>button {
    bottom: 0.325rem;
    right: 0.325rem;
}

form.style1 input[type="checkbox"]+label,
form.style1 p {
    font-size: 1em;
    line-height: 1.5;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.05rem;
    padding-left: 0.05rem;
    font-weight: 300;
    color: #3A3939;
}

form.style1 .actions button {
    display: inline-block;
    width: 12rem;
    height: 3.875rem;
    line-height: 3.875rem;
    padding: 0 0.5rem;
    font-size: 1em;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.1rem;
    padding-left: calc(0.1rem + 0.5rem);
    font-weight: 400;
    border-radius: 2rem;
    direction: var(--site-language-direction);
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #35B88F;
    color: #FFFFFF;
    transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
    position: relative;
}

form.style1 .actions button:hover {
    background-color: #42C99F;
}

form.style1 .inner> :first-child>label:first-child {
    margin-top: 0;
}

form.style1 .inner .actions {
    margin: 1.71875rem 0 0 0;
}

form.style1 .actions button:before {
    animation: button-spinner 1s infinite linear;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTZweCIgaGVpZ2h0PSI5NnB4IiB2aWV3Qm94PSIwIDAgOTYgOTYiIHpvb21BbmRQYW49ImRpc2FibGUiPjxzdHlsZT5jaXJjbGUge2ZpbGw6IHRyYW5zcGFyZW50OyBzdHJva2U6ICNGRkZGRkY7IHN0cm9rZS13aWR0aDogMnB4OyB9PC9zdHlsZT48ZGVmcz48Y2xpcFBhdGggaWQ9ImNvcm5lciI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNDgsMCA0OCw0OCA5Niw0OCA5Niw5NiAwLDk2IiAvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0idXJsKCNjb3JuZXIpIj48Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSIzMiIvPjwvZz48L3N2Zz4=');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 2.90625rem;
    content: '';
    display: block;
    height: 2.90625rem;
    left: 50%;
    margin: -1.453125rem 0 0 -1.453125rem;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transition: opacity 0.25s ease;
    transition-delay: 0s;
    width: 2.90625rem;
}

form.style1 .actions button.waiting {
    color: transparent;
}

form.style1 .actions button.waiting svg {
    fill: transparent;
}

form.style1 .actions button.waiting:before {
    opacity: 1.0;
    transition-delay: 0.125s;
}

form.style1 ::-webkit-input-placeholder {
    color: #3A3939;
    opacity: 0.55;
}

form.style1 :-moz-placeholder {
    color: #3A3939;
    opacity: 0.55;
}

form.style1 ::-moz-placeholder {
    color: #3A3939;
    opacity: 0.55;
}

form.style1 :-ms-input-placeholder {
    color: #3A3939;
    opacity: 0.55;
}

form.style1 .file[data-filename=""]:before {
    color: #3A3939;
    opacity: 0.55;
}

form.style1 .date[data-value=""]:before {
    color: #3A3939;
    opacity: 0.55;
}

#form01 input[name="sms"] {
    display: none;
}


@media (max-width: 1920px) {}

@media (max-width: 1680px) {
    html {
        font-size: 13pt;
    }
}

@media (max-width: 1280px) {
    html {
        font-size: 13pt;
    }
}

@media (max-width: 1024px) {}

@media (max-width: 980px) {
    html {
        font-size: 11pt;
    }
}

@media (max-width: 736px) {
    html {
        font-size: 12pt;
    }

    #main>.inner {
        --padding-horizontal: 1rem;
        --padding-vertical: 3.5rem;
        --spacing: 0rem;
    }

    #main>.inner>*>.full {
        margin-left: calc(-1rem);
        max-width: calc(100% + 2rem + 0.4725px);
        width: calc(100% + 2rem + 0.4725px);
    }

    #main>.inner>*>.full.screen {
        margin-left: -50vw;
    }

    #main>.inner>.active>.full:first-child {
        margin-top: -3.5rem !important;
    }

    #main>.inner>.active>.full:last-child {
        margin-bottom: -3.5rem !important;
    }

    h1.style3,
    h2.style3,
    h3.style3,
    p.style3 {
        letter-spacing: 0.35rem;
        width: calc(100% + 0.35rem);
        font-size: 2em;
        line-height: 1;
    }

    h1.style1,
    h2.style1,
    h3.style1,
    p.style1 {
        letter-spacing: 0.35rem;
        width: calc(100% + 0.35rem);
        font-size: 1.75em;
        line-height: 1.5;
    }

    h1.style2,
    h2.style2,
    h3.style2,
    p.style2 {
        letter-spacing: 0.04375rem;
        width: calc(100% + 0.04375rem);
        font-size: 1em;
        line-height: 1.75;
    }

    h1.style4,
    h2.style4,
    h3.style4,
    p.style4 {
        letter-spacing: 0.196875rem;
        width: calc(100% + 0.196875rem);
        font-size: 1em;
        line-height: 1.5;
    }

    h1.style5,
    h2.style5,
    h3.style5,
    p.style5 {
        letter-spacing: 0.35rem;
        width: calc(100% + 0.35rem);
        font-size: 1.375em;
        line-height: 1.5;
    }

    h1.style6,
    h2.style6,
    h3.style6,
    p.style6 {
        letter-spacing: 0.04375rem;
        width: calc(100% + 0.04375rem);
        font-size: 1em;
        line-height: 1.75;
    }

    h1.style7,
    h2.style7,
    h3.style7,
    p.style7 {
        letter-spacing: 0.04375rem;
        width: calc(100% + 0.04375rem);
        font-size: 1em;
        line-height: 1.75;
    }

    .buttons.style2 {
        gap: 1rem;
    }

    .buttons.style2 li a {
        letter-spacing: 0.1rem;
        padding-left: calc(0.1rem + 0.5rem);
        font-size: 1em;
    }

    .buttons.style1 {
        gap: 0rem;
    }

    .buttons.style1 li a {
        letter-spacing: 0.1rem;
        padding-left: calc(0.1rem + 0.5rem);
        font-size: 1em;
    }

    .buttons.style4 {
        gap: 1rem;
    }

    .buttons.style4 li a {
        letter-spacing: 0.1rem;
        padding-left: calc(0.1rem + 0.5rem);
        font-size: 1em;
    }

    .style3:before {
        width: 16rem;
    }

    .style1:before {
        height: 5rem;
    }

    .style2:before {
        height: 4rem;
    }

    .container.style8>.wrapper>.inner {
        --gutters: 2rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 0.75rem;
    }

    .container.style8.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style8.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style8.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style8.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style8.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type,
    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type,
    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type,
    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type,
    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style8.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style7>.wrapper>.inner {
        --gutters: 2rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.5rem;
    }

    .container.style7.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style7.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style7.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style7.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style7.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type,
    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type,
    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type,
    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type,
    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style1 {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
    }

    .container.style1>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.25rem;
    }

    .container.style1.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style1.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style1.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style1.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style1.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type,
    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type,
    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type,
    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type,
    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    #container04>.wrapper>.inner> :nth-child(1) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    #container04>.wrapper>.inner> :nth-child(2) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    .container.style5 {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
    }

    .container.style5>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.25rem;
    }

    .container.style5.columns>.wrapper>.inner {
        flex-direction: column-reverse !important;
        flex-wrap: nowrap !important;
    }

    .container.style5.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--padding-vertical) * -2);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style5.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-bottom: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>*:last-child {
        padding-top: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style5.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style5.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type,
    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type,
    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type,
    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-right-radius: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type,
    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    #container03>.wrapper>.inner> :nth-child(1) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    #container03>.wrapper>.inner> :nth-child(2) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    .container.style2>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3rem;
        --spacing: 1.25rem;
    }

    .container.style2.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style2.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style2.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style2.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style2.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type,
    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type,
    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type,
    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type,
    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style3>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.25rem;
    }

    .container.style3.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style3.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style3.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style3.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style3.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type,
    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type,
    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type,
    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type,
    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style6>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 1rem;
        --spacing: 1.25rem;
    }

    .container.style6.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style6.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style6.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style6.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style6.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type,
    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type,
    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type,
    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type,
    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style4:not(:first-child) {
        margin-top: 1.5rem !important;
    }

    .container.style4>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 2rem;
        --spacing: 1.25rem;
    }

    .container.style4.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style4.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style4.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style4.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style4.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type,
    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type,
    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type,
    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type,
    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }


    .icons.style1 {
        font-size: 1.875em;
        gap: 1rem;
    }

    form.style1:not(:first-child) {
        margin-top: 1.875rem !important;
    }

    form.style1:not(:last-child) {
        margin-bottom: 1.875rem !important;
    }

    form.style1 label:first-child {
        font-size: 1em;
        line-height: 1.5;

        padding-left: 0.325rem;
    }

    form.style1 input[type="text"],
    form.style1 input[type="password"],
    form.style1 input[type="email"],
    form.style1 input[type="tel"],
    form.style1 input[type="number"],
    form.style1 textarea,
    form.style1 select,
    form.style1 .file,
    form.style1 .date {
        font-size: 1em;
        padding-left: calc(0.05rem + 1.1375rem);
    }

    form.style1 textarea {
        line-height: 1.5;
        padding-top: 0.875rem;
    }

    form.style1 input[type="checkbox"]+label,
    form.style1 p {
        font-size: 1em;
        line-height: 1.5;
        padding-left: 0.05rem;
    }

    form.style1 .actions button {
        font-size: 1em;
        padding-left: calc(0.1rem + 0.5rem);
    }
}

@media (max-width: 480px) {
    #main>.inner {
        --spacing: 0rem;
    }

    .buttons.style2 li a {
        width: 18rem;
    }

    .buttons.style1 li a {
        width: 18rem;
    }

    .buttons.style4 li a {
        width: 8.875rem;
    }

    .container.style8>.wrapper>.inner {
        --spacing: 0.65625rem;
    }

    .container.style7>.wrapper>.inner {
        --spacing: 1.3125rem;
    }

    .container.style1>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style5>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style2>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style3>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style6>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style4>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .image.style1 .frame {
        height: 16rem !important;
    }

    form.style1 .actions button {
        max-width: 32rem;
        width: 100%;
    }
}

@media (max-width: 360px) {
    #main>.inner {
        --padding-horizontal: 0.75rem;
        --padding-vertical: 2.625rem;
        --spacing: 0rem;
    }

    #main>.inner>*>.full {
        margin-left: calc(-0.75rem);
        max-width: calc(100% + 1.5rem + 0.4725px);
        width: calc(100% + 1.5rem + 0.4725px);
    }

    #main>.inner>*>.full.screen {
        margin-left: -50vw;
    }

    #main>.inner>.active>.full:first-child {
        margin-top: -2.625rem !important;
    }

    #main>.inner>.active>.full:last-child {
        margin-bottom: -2.625rem !important;
    }

    h1.style3,
    h2.style3,
    h3.style3,
    p.style3 {
        font-size: 1.5em;
    }

    h1.style1,
    h2.style1,
    h3.style1,
    p.style1 {
        font-size: 1.5em;
    }

    h1.style2,
    h2.style2,
    h3.style2,
    p.style2 {
        font-size: 1em;
    }

    h1.style4,
    h2.style4,
    h3.style4,
    p.style4 {
        font-size: 1em;
    }

    h1.style5,
    h2.style5,
    h3.style5,
    p.style5 {
        font-size: 1.375em;
    }

    h1.style6,
    h2.style6,
    h3.style6,
    p.style6 {
        font-size: 1em;
    }

    h1.style7,
    h2.style7,
    h3.style7,
    p.style7 {
        font-size: 1em;
    }

    .buttons.style2 {
        gap: 0.75rem;
    }

    .buttons.style1 {
        gap: 0rem;
    }

    .buttons.style4 {
        gap: 0.75rem;
    }

    .container.style8>.wrapper>.inner {
        --gutters: 1.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 2.625rem;
        --spacing: 0.5625rem;
    }

    .container.style7>.wrapper>.inner {
        --gutters: 1.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 2.625rem;
        --spacing: 1.125rem;
    }

    .container.style1>.wrapper>.inner {
        --gutters: 4.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 2.625rem;
        --spacing: 0.9375rem;
    }

    .container.style5>.wrapper>.inner {
        --gutters: 4.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 2.625rem;
        --spacing: 0.9375rem;
    }

    .container.style2>.wrapper>.inner {
        --gutters: 4.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 2.25rem;
        --spacing: 0.9375rem;
    }

    .container.style3>.wrapper>.inner {
        --gutters: 4.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 2.625rem;
        --spacing: 0.9375rem;
    }

    .container.style6>.wrapper>.inner {
        --gutters: 4.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 0.75rem;
        --spacing: 0.9375rem;
    }

    .container.style4>.wrapper>.inner {
        --gutters: 4.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 1.5rem;
        --spacing: 0.9375rem;
    }

    .image.style1 .frame {
        height: 14rem !important;
    }

    .icons.style1 {
        gap: 0.75rem;
    }
}
</style>