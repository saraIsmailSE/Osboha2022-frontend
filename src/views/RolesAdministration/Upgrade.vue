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
        switch (this.type) {
            case 'specialCare':
                this.roles = await rolesService.getSpecialCareRoles();
                break;
            case 'marathon':
                this.roles = await rolesService.getMarathonRoles();
                break;
            case 'ramadan':
                this.roles = await rolesService.getRamadanRoles();
                break;
            case 'eligible':
                this.roles = await rolesService.getEligibleRoles();
                break;
            case 'WithdrawnsTeam':
                this.roles = await rolesService.getWithdrawnsTeamRoles();
                break;
            case 'booksTeam':
                this.roles = await rolesService.getBooksTeamRoles();
                break;

        }
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