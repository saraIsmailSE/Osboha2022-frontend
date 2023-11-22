<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19 mb-2" v-for="supervisor in supervisors" :supervisor="supervisor" :key="supervisor.id">
        <div class="card mb-0">
            <div class="card-body text-center">
                <BaseAvatar :profileImg="supervisor.user_profile.profile_picture" :profile_id="supervisor.user_profile.id"
                    :title="supervisor.name" :gender="supervisor.gender" avatarClass="rounded-circle img-fluid avatar-120"
                    dimensions="150x150" :noMainClass="true" />
                <div class="group-info pt-3 pb-3">
                    <router-link :to="{
                        name: 'user.profile',
                        params: { user_id: supervisor.id },
                    }">
                        <h4>
                            {{ supervisor.name }}
                        </h4>
                    </router-link>
                </div>

                <div class="row">
                    <div class="col-12">
                        <router-link class="btn btn-primary d-block mt-1 me-1" :to="{
                            name: 'statistics.supervisors',
                            params: {
                                supervisor_id: supervisor.id,
                            },
                        }">
                            عرض احصائية المراقب
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '@/API/services/user.service';

export default {
    name: 'List My Supervisors',
    async created() {
        try {
            const response = await UserService.listInChargeOf();
            this.supervisors = response;
        }
        catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            supervisors: [],
        }
    },

}
</script>
