<template>
    <div class="col-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-header">
                <h2>تدقيق المراقبين</h2>
            </div>
            <div class="card-body">
                <div class="blog-description" v-for="(supervisor, index) in supervisors" :key="index">
                    <h3 class="book-title mb-2" style="direction: rtl;">
                        <span role="button" @click="showSupervisors(index)" class=" align-middle material-symbols-outlined">
                            visibility
                        </span>
                        {{ index }}
                    </h3>

                    <table class="table w-100" v-if="supervisorsList[index]">
                        <thead>
                            <tr>
                                <th scope="col">السفير</th>
                                <th scope="col">من تدقيق المراقب</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(mark, index) in supervisor" :key="index">
                                <td>
                                    <AchievementProgress :audit="mark.audit_mark" />
                                </td>
                                <td class="align-middle text-center"
                                    v-if="mark.audit_mark.type.name == 'not_of_supervisor_audit'">
                                    <span>❌ </span>
                                </td>
                                <td class="align-middle text-center" v-else>
                                    <span> ✅ </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuditMarkService from '@/API/services/audit-marks.service';
import AchievementProgress from "@/components/group/audit/AchievementProgress.vue";

export default {
    name: 'Advisor Audit',
    async created() {
        try {
            const response = await AuditMarkService.advisorMainAudit(this.$route.params.advisor_id);
            this.supervisors = response.reduce((groupBySupervisor, item) => {
                const supervispr = groupBySupervisor[item.supervisor_name] || [];
                supervispr["name"] = item.supervisor_name;
                this.addKeyIfNotExists(this.supervisorsList, supervispr["name"], false);

                supervispr.push(item);
                groupBySupervisor[item.supervisor_name] = supervispr;
                return groupBySupervisor;
            }, {});
            this.audit = response;
        }
        catch (error) {
            console.log(error);
        }
    },
    components: {
        AchievementProgress,
    },
    data() {
        return {
            audit: [],
            supervisors: [],
            supervisorsList: {},
        }
    },
    methods: {
        /**
 * show specific control list.
 *  @param  key
 */
        showSupervisors(key) {
            Object.keys(this.supervisorsList).forEach(key => {
                this.supervisorsList[key] = false;
            });
            this.supervisorsList[key] = true;
        },
        addKeyIfNotExists(obj, key, value) {
            if (!Object.keys(obj).includes(key)) {
                obj[key] = value;
            }
        }

    },

}
</script>
