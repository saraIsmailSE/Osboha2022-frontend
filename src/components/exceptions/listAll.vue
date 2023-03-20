<template>
    <div class="col-lg-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-header">
                <h2>الاجازات</h2>
            </div>
            <div class="card-body">
                <div class="blog-description">
                    <table class="table w-100">
                        <thead>
                            <tr>
                                <th scope="col">اسم السفير</th>
                                <th scope="col">نوع الاجازة</th>
                                <th scope="col">الحالة</th>
                                <th scope="col">الانتهاء</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exception in exceptions" :key="exception.id">
                                <td>{{ exception.user.name }}</td>
                                <td> {{ exception.type }}</td>
                                <td> {{ exception.status }}</td>
                                <td> {{ exception.end_at }}</td>
                                <router-link :to="{ name: 'exceptions.listException', params: { exception_id: exception.id } }">
                                    <td>
                                        <i role="button" class="material-symbols-outlined md-18 me-1 text-primary">
                                            visibility
                                        </i>
                                    </td>
                                </router-link>
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
export default {
    name: 'List All Exceptions',
    props: {
        exceptions: { type: Object },
    },
    data() {
        return {
        }

    },
}
</script>
