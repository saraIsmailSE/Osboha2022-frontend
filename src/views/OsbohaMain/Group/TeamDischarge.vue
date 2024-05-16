<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card" v-if="group">
            <div class="iq-card-header-toolbar text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3" style="direction: rtl;">تفريغ فريق - {{ group.name }}</h1>
                <h4 class="text-center">{{ GROUP_TYPE[group.type.type] }}</h4>
            </div>
            <div class="iq-card-body p-4">

                <div class="row d-flex justify-content-center">
                    <h3>
                        المسؤولون في المجموعة
                        <span class="material-symbols-outlined align-middle">
                            shield_person
                        </span>

                    </h3>
                    <h5 v-if="groupAdministrators.length == 0"> لا يوجد</h5>
                    <div class="col-4 col-md-4 col-lg-4 mt-2 mb-3" v-for="administrator in groupAdministrators"
                        :key="administrator.id">
                        <div class="d-flex">
                            <div class="flex-shrink-0">
                                <p class="h3"> - </p>
                            </div>
                            <div class="flex-grow-1 ms-3 text-center">
                                <h4 v-if="administrator.pivot.user_type == 'special_care_coordinator'">
                                    مسؤول المجموعة
                                </h4>
                                <h4 v-if="administrator.pivot.user_type == 'support_leader'">
                                    قائد دعم
                                </h4>
                                <h4
                                    v-if="administrator.pivot.user_type == 'leader' || administrator.pivot.user_type == 'special_care_leader'">
                                    قائد المجموعة
                                </h4>
                                <h4 v-if="administrator.pivot.user_type == 'supervisor'">
                                    مراقب المجموعة
                                </h4>
                                <h4 v-if="administrator.pivot.user_type == 'advisor'">
                                    موجه المجموعة
                                </h4>
                                <h4 v-if="administrator.pivot.user_type == 'consultant'">
                                    مستشار المجموعة
                                </h4>
                                <h4 v-if="administrator.pivot.user_type == 'admin'">
                                    ادارة المجموعة
                                </h4>
                                <p class="mb-0">
                                    {{ administrator.name }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <hr />
            <div class="iq-card-body p-4">
                <h3 v-if="group.type.type == 'followup'">سفراء المجموعة</h3>
                <h3 v-if="group.type.type == 'supervising'">القادة في المجموعة</h3>
                <h3 v-if="group.type.type == 'advising'">المراقبين في المجموعة</h3>
                <div class="row" v-if="ambassadors.length > 0">
                    <div class="d-flex mt-2 mb-3">
                        <input class="form-check-input me-2" type="checkbox" value="selectAll" id="all"
                            @change="selectAllAmbassador()">
                            <p class="form-check-label h5" for="all" v-if="selectedAmbassadors.length == 0">
                            تحديد الكل
                        </p>
                        <p class="form-check-label h5" for="all" v-if="selectedAmbassadors.length > 0">
                            الغاء تحديد الكل
                        </p>
                    </div>
                    <div class="row d-flex justify-content-center">

                        <div class="col-4 col-md-4 col-lg-4 mt-2 mb-3" v-for="ambassador in ambassadors"
                            :key="ambassador.id">
                            <input class="form-check-input me-2" type="checkbox" :value="`${ambassador.email}`"
                                :id="`${ambassador.id}`" @change="toggleSelection(ambassador.email)"
                                :checked="allSelected">
                            <label class="form-check-label" :for="`${ambassador.id}`">
                                {{ ambassador.name }}
                            </label>

                        </div>
                    </div>
                </div>

                <h5 v-else> لا يوجد</h5>

                <transfer-ambassadors v-if="group.type.type == 'followup' && selectedAmbassadors.length > 0"
                    :selectedAmbassadors="selectedAmbassadors" />
                <transfer-leaders v-if="group.type.type == 'supervising' && selectedAmbassadors.length > 0"
                    :selectedLeaders="selectedAmbassadors" />
                <transfer-supervisors v-if="group.type.type == 'advising' && selectedAmbassadors.length > 0"
                    :selectedSupervisors="selectedAmbassadors" />
            </div>
            <DischargeForm v-if="allowedToDischarge" />

            <router-link class="mb-3 mt-3 text-center d-block w-100" :to="{
                name: 'group.group-detail',
                params: { group_id: this.$route.params.group_id },
            }">
                عرض المجموعة
                <span class="align-middle material-symbols-outlined">
                    keyboard_return
                </span>
            </router-link>

        </iq-card>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import GroupService from "@/API/services/group.service";
import { GROUP_TYPE } from "@/utilities/constants";
import TransferAmbassadors from '@/components/control/TransferAmbassadors';
import TransferLeaders from '@/components/control/TransferLeaders';
import TransferSupervisors from '@/components/control/TransferSupervisors';
import DischargeForm from '@/components/group/DischargeForm';

export default {
    components: { TransferAmbassadors, TransferLeaders, TransferSupervisors, DischargeForm },
    name: "Update Group",
    setup() {
        return { v$: useVuelidate() };
    },

    async created() {
        const response = await GroupService.getById(this.$route.params.group_id);
        this.group = response.info;
        this.users = response.info.users
        this.groupAdministrators = response.info.group_administrators

    },

    data() {
        return {
            group: null,
            users: null,
            types: [],
            allSelected: false,
            groupAdministrators: [],
            selectedAmbassadors: [],
            GROUP_TYPE,
            dischargeForm: {
                group_id: this.$route.params.group_id,
                reason: '',
                current_to: "",
                notes: "",
            },
            message: "",
            loading: false,
        };
    },

    validations() {
        return {
            dischargeForm: {
                reason: {
                    required,
                },
                current_to: {
                    required,
                },
                notes: {
                    required,
                },
            },
        };
    },
    methods: {
        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.dischargeForm.$invalid) {
                this.loading = true;
                try {
                    await GroupService.update(this.dischargeForm);
                    this.setGroup();
                    this.message = "تم التعديل";
                    setTimeout(() => {
                        this.message = "";
                    }, 1800);
                } catch (error) {
                    this.message = "حصل خطأ - لم يتم التعديل!";
                    //                    console.log(error.response.data);
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
        toggleSelection(email) {
            const index = this.selectedAmbassadors.findIndex(item => item[this.typeKey] === email);
            if (index === -1) {
                const newItem = {};
                newItem[this.typeKey] = email;
                this.selectedAmbassadors.push(newItem);
            } else {
                this.selectedAmbassadors.splice(index, 1);
            }
        },
        selectAllAmbassador() {
            if (this.selectedAmbassadors.length > 0) {
                this.selectedAmbassadors = [];
                this.allSelected = false;
            } else {
                this.selectedAmbassadors = this.ambassadors.map(ambassador => {
                    let obj = {};
                    obj[this.typeKey] = ambassador.email;
                    return obj;
                });
                this.allSelected = true;
            }
        },
    },
    computed: {
        ambassadors() {
            if (this.users) {
                return this.users.filter(user => user.pivot.user_type === 'ambassador');
            }
            return [];
        },
        allowedToDischarge() {
            if (!this.ambassadors.length > 0) {
                return true
            }
            return false;
        },
        typeKey() {
            switch (this.group.type.type) {
                case "supervising":
                    return 'leader_email';

                case "advising":
                    return 'supervisor_email';
                default:
                    return 'ambassador_email'
            }
        }
    },
};
</script>