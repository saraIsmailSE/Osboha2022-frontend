<template>
    <div class="col-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-header">
                <h2>الانجاز</h2>
            </div>
            <div class="card-body">
                <div class="blog-description" v-for="(book, index) in theses" :key="index">
                    <h5 class="book-title">{{ book.title }}</h5>
                    <table class="table w-100">
                        <thead>
                            <tr>
                                <th scope="col">الصفحات</th>
                                <th scope="col">نوعه</th>
                                <th scope="col">وقته</th>
                                <th scope="col">حالته</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(thesis, index) in book" :key="index">
                                <td>{{ thesis.end_page - thesis.start_page }}</td>

                                <!-- نوع الانجاز [قراءة فقط -  اطروحة -  اطروحة واقتباسات] -->
                                <td v-if="thesis.max_length > 0 && thesis.total_screenshots > 0"> أطروحة واقتباسات</td>
                                <td v-else-if="thesis.max_length > 0"> أطروحة </td>
                                <td v-else-if="thesis.total_screenshots > 0"> اقتباسات</td>
                                <td v-else> قراءة فقط</td>
                                <td> {{ format_date(thesis.updated_at) }}</td>
                                <td v-if="thesis.is_acceptable && thesis.is_acceptable == 'accepted'"> <span
                                        class="rounded-pill badge bg-primary">مقبول </span></td>
                                <td v-else-if="thesis.is_acceptable && thesis.is_acceptable == 'rejected'"> <span
                                        class="rounded-pill badge bg-danger">مرفوض </span></td>
                                <td v-else> <span class="rounded-pill badge bg-warning"> بحاجة لمراجعة </span></td>
                                <td>
                                    <router-link :to="{ name: 'group.listOneAmbassadorThesis', params: { thesis_id: thesis.id } }">
                                        <i role="button" class="material-symbols-outlined md-18 me-1 text-primary">
                                            visibility
                                        </i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'CheckThesis',

    created() {
        console.log(this.theses)

    },
    props: {
        theses: { type: Object }
    },
    data() {
        return {
        }
    },
    methods: {
        format_date(value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        },
    },

}
</script>
<style scoped>
.book-title {
    background-color: #F1F9F5;
    width: fit-content;
    direction: rtl;
}
</style>