<template>
    <table class="table table-striped" style="margin-top: 3rem;" v-if="achèvements.length > 0">
        <thead>
            <tr>
                <th scope="col">اليوم</th>
                <th scope="col">الصفحات</th>
                <th scope="col">الأطروحات</th>
                <th scope="col">مجموع النقاط</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(achèvement, index) in achèvements" :key="index">
                <td>{{ DAYS[achèvement.day] }}</td>
                <td>{{ achèvement.total_pages }}</td>
                <td>{{ achèvement.total_theses }}</td>
                <td>{{ achèvement.daily_points }}</td>
            </tr>
        </tbody>
    </table>
    <div v-else>
        <h5 class="text-center" style="margin-top: 3rem;">
            لا يوجد انجاز
        </h5>
    </div>
</template>

<script>
import { DAYS } from "@/utilities/constants";

export default {
    name: 'TableComponent',
    props: {
        achèvements: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            DAYS,
        };
    },
};
</script>