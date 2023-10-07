<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-body p-0">
                <div class="image-block text-center mt-3">
                    <img src="@/assets/images/install-app.png" class="img-fluid rounded w-25" alt="blog-img">
                </div>

                <h2 class="text-center mt-3">تطبيق مصغر بانتظارك </h2>
                <h4 class="text-center">
                    بإمكانك الان تحميل تطبيق (توثيق القراءة مع أصبوحة 180) على هاتفك المحمول لتكون تجربتك في استخدامه
                    دائما سهلة وميسرة
                </h4>

                <div class="w-100 text-center row">
                    <div class="col-6">
                        <a class="btn d-block btn-primary mt-3 mb-3 w-100 mx-auto" @click="install()">
                            تحميل </a>

                    </div>
                    <div class="col-6">
                        <a class="btn d-block btn-light mt-3 mb-3 w-100 mx-auto" @click="dismiss()">
                            لاحقًا </a>
                    </div>
                </div>
            </div>

        </iq-card>

    </div>
</template>
<script>
import { useCookies } from "vue3-cookies";

export default {
    name: "InstallAlert",
    setup() {
        const { cookies } = useCookies();
        return { cookies };
    },

    data() {
        return {
            deferredPrompt: null
        };
    },
    created() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            // Stash the event so it can be triggered later.
            if (this.cookies.get("add-to-home-screen") != 'later') {
                this.deferredPrompt = e;
            }

        });
        window.addEventListener("appinstalled", () => {
            this.deferredPrompt = null;
            console.log('installed');
            this.$router.push({ name: `social.book` })

        });
    },
    methods: {
        async dismiss() {
            this.cookies.set("add-to-home-screen", 'later', { expires: 15 });
            this.$router.push({ name: `social.book` })
        },
        async install() {
            this.deferredPrompt.prompt();
            console.log('installed');
        }
    }
};
</script>
