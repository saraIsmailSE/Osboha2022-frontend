<template>
    <table class="table w-100" v-if="exception.reviewer">
        <thead>
            <tr>
                <th scope="col">المسؤول</th>
                <th scope="col" colspan="3">ملاحظاته</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ exception.reviewer.name }}</td>
                <td>{{ exception.note }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>

export default {
    name: "Exception Reviewer",
    props: {
        exception: { type: Object },
    },

};
</script>
