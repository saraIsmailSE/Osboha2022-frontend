<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <div class="card mb-0">
            <div class="top-bg-image">
                <img src="@/assets/images/main/book-banner-2.png" class="img-fluid w-100" alt="group-bg" />


            </div>
            <div class="card-body text-center">
                <div class="group-icon">
                    <img src="@/assets/images/main/200x200-book.png" alt="profile-img"
                        class="rounded-circle img-fluid avatar-120" />
                </div>

                <div class="group-info pt-3 pb-3">
                    <h4>
                        {{ group.group.name }}
                    </h4>
                    <p>{{ group_type[group.group.type.type] }}</p>
                </div>
                <div class="group-details d-inline-block pb-3">
                    <ul class="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                        <li class="pe-3 ps-3">
                            <p class="mb-0">عدد الأعضاء</p>
                            <h6>{{ group.group.users.length }}</h6>
                        </li>
                        <li class="pe-3 ps-3">
                            <p class="mb-0">دورك في المجموعة</p>
                            <h6 class="rounded-pill badge bg-primary">{{ group.user_type }}</h6>
                        </li>
                    </ul>
                </div>
                <router-link class="btn btn-primary d-block w-100"
                    :to="{ name: 'group.group-detail', params: { group_id: group.group.id } }">
                    عرض
                </router-link>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'card',
    props: {
        group: { type: Object },
    },
    data() {
        return {
            group_type: {
                followup: "فريق متابعة",
                supervising: "فريق رقابة",
                advising: "فريق توجيه",
                consultation: 'فريق الاستشارة',
                Administration: 'الإدارة العليا'
            },

        }
    },
}
</script>
