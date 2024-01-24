<template>
    <div class="alert alert-danger mt-2" v-if="last_freez || last_exam || last_exceptional_freez">
        <h4>أخر الاجازات</h4>
        <ul>
            <li v-if="last_freez">
                <h5>أخر تجميد</h5>
                <p>
                    {{ last_freez.end_at }}
                </p>
            </li>
            <li v-if="last_exam">
                <h5>أخر نظام امتحانات</h5>
                <p>
                    {{ last_exam.end_at }}
                </p>
            </li>
            <li v-if="last_exceptional_freez">
                <h5>أخر تجميد استثنائي</h5>
                <p>
                    {{ last_exceptional_freez.end_at }}
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "Last Exceptions",
    props: {
        last_freez: { type: Object },
        last_exam: { type: Object },
        last_exceptional_freez: { type: Object },
    },
};
</script>
