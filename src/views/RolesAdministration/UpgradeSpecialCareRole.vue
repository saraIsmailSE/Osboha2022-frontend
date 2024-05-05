<template>
    <div class="col-sm-12 mt-3">
        <assignRole :roles="roles" :upgradeType="'الرعاية الخاصة'" :imagePath="'images/main/marathon.png'" />
    </div>
</template>

<script>
import assignRole from "@/components/user/assignRole";

import rolesService from "@/API/services/roles.service";

export default {
    name: "Upgrade Special Care Role",
    components: {
        assignRole,
    },
    async created() {
        this.roles = await rolesService.getSpecialCareRoles();
    },
    data() {
        return {
            roles: [],
        };
    },

};
</script>