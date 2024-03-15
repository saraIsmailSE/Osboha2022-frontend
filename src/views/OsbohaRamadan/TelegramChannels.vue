<template>
    <div>
        <ramadanHeader />
        <div class="col-12">
            <div class="row d-flex justify-content-center">
                <div class="col-6 col-md-6 col-lg-6 text-center mt-2 mb-3" v-for="(channel, index) in channels"
                    :key="index">
                    <img src="@/assets/images/ramadan/channel.png" alt="ramadan-footer" class="img-fluid w-50" />
                    <h5 class="text-center mt-1" style="direction: rtl;"> {{ channel.title }}</h5>
                    <a :href="channel.link" class="btn ramadan-btn mt-3" target="_blank"> عرض</a>
                </div>
            </div>
            <div class="d-inline-block w-100 text-center col-12">
                <router-link :to="{ name: 'ramadan.index' }" class="d-block mt-3 mb-3 w-75 mx-auto">
                    <span class="back-btn display-6">عودة</span>
                    <span class="align-middle material-symbols-outlined diplay-6">
                        keyboard_return
                    </span>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
import UserInfoService from "@/Services/userInfoService";
import ramadanHeader from "@/components/ramadan/ramadan-header";
// import ramadanFooter from "@/components/ramadan/ramadan-footer";

export default {
    name: 'Ramadan Index',
    components: {
        ramadanHeader,
        // ramadanFooter,
    },
    async created() {
    },
    data() {
        return {
            channels: [

                {
                    title: 'القناة العامة لفعاليات رمضان 2024 🌙',
                    link: 'https://t.me/+pbCNw32w5FM5MGRk'
                },
                {
                    title: 'مسابقات فعاليات رمضان 2024 🌙',
                    link: 'https://t.me/+LrHqHmN3_cMxYjNk',
                },
                {
                    title: 'قيام الليل مع أصبوحة 180 | فعاليات رمضان 2024 🌙💚',
                    link: 'https://t.me/+t2kSUWWwl3BjZDFk'
                },
                {
                    title: 'حفظ الحديث الشريف | فعاليات رمضان مع أصبوحة 180 🌙💚',
                    link: 'https://t.me/+NzO2sIQ_48Y3NzNk'
                },
                {
                    title: 'الورد القرآني اليومي | رمضان 2024 🌙💚',
                    link: 'https://t.me/+hjubbUbkpvxjZTRk'
                },

            ]
        };
    },
    methods: {
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
    },
};

</script>

<style>
@import './css/ramadan.css';
</style>