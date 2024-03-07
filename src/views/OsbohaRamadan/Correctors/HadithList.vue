<template>
    <div>
        <ramadanHeader />
        <div class="col-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">أحاديث بحاجة لتصحيح</h4>
                </template>

                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>الحديث </th>
                                    <th>اسم المشارك </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="memorizedHadith in memorizedHadiths" :key="memorizedHadith.id">
                                    <td>
                                        {{memorizedHadith.hadith.hadith_title}}
                                    </td>
                                    <td>
                                        {{memorizedHadith.user.name}}
                                    </td>
                                    <td>
                                        <router-link :to="{
                                            name: 'ramadan.correct-hadith',
                                            params: { hadith_memorization_id: memorizedHadith.id },
                                        }">
                                            <i role="button" class="material-symbols-outlined md-18 me-1 text-primary">
                                                visibility
                                            </i>
                                        </router-link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </template>
            </iq-card>
        </div>

    </div>
</template>

<script>
import UserInfoService from "@/Services/userInfoService";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import HadithMemorizationServices from "@/API/RamadanServices/hadithMemorization.service";

export default {
    name: 'Ramadan Index',
    components: {
        ramadanHeader,
    },
    async created() {
        this.memorizedHadiths = await HadithMemorizationServices.getMemorizedHadiths();
    },
    data() {
        return {
            memorizedHadiths:[]
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
@import '../css/ramadan.css';
</style>

<style scoped>
table {
    display: inline-table;
}

.material-symbols-outlined {
    color: #471809;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>