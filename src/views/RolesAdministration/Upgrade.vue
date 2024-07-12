<template>
    <div class="col-sm-12 mt-3">
        <assignRole :roles="roles" :upgradeType="ROLESTYPES[type]" :imagePath="'images/main/marathon.png'" />
    </div>
</template>

<script>
import assignRole from "@/components/user/assignRole";
import rolesService from "@/API/services/roles.service";

import { ROLESTYPES } from "@/utilities/constants";

export default {
    name: "Upgrade User",
    components: {
        assignRole,
    },
    async created() {
        this.roles = await rolesService.getSecondaryRoles(this.type);
    },
    data() {
        return {
            roles: [],
            ROLESTYPES,
            type: this.$route.params.type,
        };
    },

};
</script>