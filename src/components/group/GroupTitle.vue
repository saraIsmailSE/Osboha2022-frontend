<template>
    <div class="card position-relative inner-page-bg" style=" background-color: #cae0cd; height: 100px;">
        <div class="inner-page-title">
            <h3 class="text-dark">فريق المتابعة || {{ group_name }}</h3>
            <p>
                عدد السفراء
                <strong>{{ group_users }}</strong>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Group Title',
    props: {
        group_id: {
            type: [Number],
            required: true,
        },
        group_name: {
            type: [String],
            required: true,
        },
        group_users: {
            type: [Number],
            required: true,
        },
    },
    data() {
        return [
        ]
    },

}
</script>
