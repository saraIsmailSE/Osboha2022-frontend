<template>
    <div class="col-12">
        <div class="row">
            <h1 class="text-center"> التحكم بالسفراء</h1>
            <hr />
            <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'roles.changeAdvisingTeam', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        swap_horizontal_circle
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    نقل سفير
                                </h3>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Control Groups - Ambassadors',
    async created() {
    },
    data() {
    },
    methods: {
    },
};
</script>