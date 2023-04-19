<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <div class="card mb-0">
            <div class="top-bg-image">
                <!-- <img :src="require(`@/assets/images/${group.backgroundImg}`)"/> -->
                <img src="@/assets/images/main/book-banner.png" class="img-fluid w-100" alt="group-bg" />

            </div>
            <div class="card-body text-center">
                <div class="group-info pt-3 pb-3">
                    <h4>
                        <router-link :to="{
                        name: 'group.group-detail',
                        params: { group_id: group.id },
                    }">
                        {{group.name}}
                    </router-link>
                    </h4>
                </div>
                <div class="group-details d-inline-block pb-3">
                    <ul class="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                        <li class="pe-3 ps-3">
                            <p class="mb-0">عدد السفراء</p>
                            <h6>{{ group.leader_and_ambassadors_count }}</h6>
                        </li>
                        <li class="pe-3 ps-3">
                            <p class="mb-0">معدل الأسبوع</p>
                            <h6>{{ (Math.round(group.marks_week_avg * 100) / 100).toFixed(2) }} %</h6>
                        </li>
                    </ul>
                </div>
                <div class="row">
                    <router-link :to="{
                        name: 'group.auditMarks',
                        params: { group_id: group.id },
                    }" class="btn btn-primary d-block mt-1 me-1">
                        عرض التدقيق
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Audit Card',
    props: {
        group: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return [
        ]
    },
    methods: {
        resolve_img_url: function (path) {
            let images = require.context('@/assets/images/', false, /\.png$|\.jpg$/)
            return images("./" + path)
        },
    }


}
</script>
