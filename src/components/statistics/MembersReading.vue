<template>
    <div class="blog-description">
        <h3>
            قراءة {{headTitle}}
            <span class="material-symbols-outlined align-middle me-1">
                book_5
            </span>

        </h3>
        <table class="table inline-grid w-100">
            <thead>
                <tr class="d-flex justify-content-around">
                    <th scope="col">{{userType}}</th>
                    <th scope="col">عدد الصفحات</th>
                    <th scope="col">نوع الانجاز</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody v-for="mark in ReadingDataTofilter.sort((a, b) => b.total_pages - a.total_pages)" :key="mark.id">
                <tr class="d-flex justify-content-around">
                    <td class="align-middle text-center">
                        <span> {{ mark.user.name }} </span>
                    </td>
                    <td class="align-middle text-center">
                        <span> {{ mark.total_pages }} </span>
                    </td>
                    <td class="align-middle text-center">
                        <span v-if="mark.total_thesis > 0 && mark.total_screenshot > 0">
                            أطروحة واقتباسات
                        </span>
                        <span v-else-if="mark.total_thesis > 0">أطروحة</span>
                        <span v-else-if="mark.total_screenshot > 0">اقتباسات</span>
                        <span v-else-if="mark.total_pages == 0">لا يوجد انجاز</span>
                        <spanb v-else>قراءة فقط</spanb>
                    </td>
                    <td class="align-middle text-center">
                        <router-link :to="{
                            name: 'group.listOneAmbassadorReading',
                            params: { ambassador_id: mark.user_id, week_id: mark.week_id },
                        }" class="material-symbols-outlined md-18 me-1 text-primary">
                            visibility
                        </router-link>
                    </td>

                </tr>

            </tbody>
            <tr class="d-flex justify-content-center">
                <td class="align-middle text-center" colspan="4">
                    <span> العدد الكلي للصفحات {{ totalPages }} </span>
                </td>
            </tr>

        </table>
        <hr />
    </div>
</template>
<script>

export default {
    name: 'members reading',
    props: {
        ReadingData: {
            required: true,
        },
        headTitle: {
            required: true,
        },
        userType: {
            required: true,
        },

    },
    created(){
        this.ReadingDataTofilter=this.ReadingData
    },
    data() {
        return {
            ReadingDataTofilter: null,
        }
    },
    computed: {

        totalPages() {
            return this.ReadingDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.total_pages), 0);
        }
    }

}
</script>
<style scoped>
.inline-grid {
    display: inline-table;
}
</style>