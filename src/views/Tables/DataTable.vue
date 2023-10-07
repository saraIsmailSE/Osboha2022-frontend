<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
                <div class="inner-page-title">
                    <h3 class="text-white">مراجعة الأطروحات</h3>
                    <p class="text-white">تبقى 2000</p>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">أطروحات بحاجة للمراجعة</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>اسم السفير</th>
                                    <th>اسم الكتاب</th>
                                    <th>عدد الأطروحات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="thesis in    thesis" :key="thesis.id">
                                    <td>
                                        <router-link :to="{ name: 'thesis-review.thesis' }">{{ thesis.user }}</router-link>
                                    </td>
                                    <td>
                                        {{ thesis.book }}
                                    </td>
                                    <td>
                                        {{ thesis.noOfThesis }}
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
import iqCard from '../../components/custom/cards/iq-card.vue'
export default {
    components: { iqCard },
    name: 'DataTable',
    data() {
        return {
               thesis: [
                {
                    user: 'user 1',
                    book: 'BOOK 1',
                    noOfThesis: 12,
                },
                {
                    user: 'user 2',
                    book: 'BOOK 2',
                    noOfThesis: 10,
                },
                {
                    user: 'user 3',
                    book: 'BOOK 3',
                    noOfThesis: 3,
                },
                {
                    user: 'user 4',
                    book: 'BOOK 4',
                    noOfThesis: 10,
                },
                {
                    user: 'user 5',
                    book: 'BOOK 5',
                    noOfThesis: 7,
                },
                {
                    user: 'user 6',
                    book: 'BOOK 6',
                    noOfThesis: 9,
                },
                {
                    user: 'user 7',
                    book: 'BOOK 7',
                    noOfThesis: 4,
                },

            ]
        }
    }
}
</script>
