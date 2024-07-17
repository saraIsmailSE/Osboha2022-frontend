<template>
    <table class="table table-striped" style="margin-top: 3rem;">
        <thead>
            <tr>
                <th scope="col">اليوم</th>
                <th scope="col">الصفحات</th>
                <th scope="col">الأطروحات</th>
                <th scope="col">مجموع النقاط</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in tableData" :key="entry.id">
                <td>{{ entry.day }}</td>
                <td>{{ entry.pages }}</td>
                <td>{{ entry.theses }}</td>
                <td>{{ entry.totalPoints }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'TableComponent',
    data() {
        return {
            tableData: [
                { id: 1, day: 'الاثنين', pages: 10, theses: 2, totalPoints: 12 },
                { id: 2, day: 'الثلاثاء', pages: 15, theses: 3, totalPoints: 18 },
                // Add more data as needed
            ],
        };
    },
};
</script>