<template>
    <div class="col-sm-12 mt-3">
        <assignRole :roles="roles" :upgradeType="'توثيق الكتب'"/>
    </div>
</template>

<script>
import assignRole from "@/components/user/assignRole";

import rolesService from "@/API/services/roles.service";

export default {
    name: "Upgrade Marathon Role",
    components: {
        assignRole,
    },
    async created() {
        this.roles = await rolesService.getEligibleRoles();
    },
    data() {
        return {
            roles: [],
        };
    },

};
</script>
