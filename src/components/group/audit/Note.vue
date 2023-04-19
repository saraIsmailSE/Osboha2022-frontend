<template>
    <iq-card body-class="p-0">
        <template v-slot:body>

            <!-- START NOTES -->
            <div class="col-12">
                <div class="card">
                    <div class="card-header" style="background:#cae0cd;">
                        <h4 class="card-title"> ملاحظات حول الانجاز </h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="row rounded-lg overflow-hidden shadow">
                                <!-- Chat Box-->
                                <div class="col-12 px-0">
                                    <div class="px-4 py-5 chat-box bg-white">

                                        <!-- Sender Message-->
                                        <!-- Reciever Message-->

                                        <div class="media w-auto mb-3" dir='ltr'>
                                            <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user"
                                                width="50" class="rounded-circle">
                                            <div class="media-body ml-3">
                                                <div class="bg-recipient rounded py-2 px-3 mb-2">
                                                    <p class="text-small mb-0 text-muted">Test which is a new
                                                        approach
                                                        all solutions</p>
                                                </div>
                                                <p class="small text-muted">12:00 PM | Aug 13</p>
                                            </div>
                                        </div>

                                        <!-- Sender Message-->
                                        <div class="media w-auto ml-auto mb-3">
                                            <div class="media-body">
                                                <div class="bg-sender rounded py-2 px-3 mb-2">
                                                    <p class="text-small mb-0 text-muted">Apollo University, Delhi,
                                                        India Test</p>
                                                </div>
                                                <p class="small text-muted">12:00 PM | Aug 13</p>
                                            </div>
                                        </div>
                                        <!-- Reciever Message-->

                                        <div class="media w-auto mb-3" dir='ltr'>
                                            <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user"
                                                width="50" class="rounded-circle">
                                            <div class="media-body ml-3">
                                                <div class="bg-recipient rounded py-2 px-3 mb-2">
                                                    <p class="text-small mb-0 text-muted">Test which is a new
                                                        approach
                                                        all solutions</p>
                                                </div>
                                                <p class="small text-muted">12:00 PM | Aug 13</p>
                                            </div>
                                        </div>

                                        <!-- Sender Message-->
                                        <div class="media w-auto ml-auto mb-3">
                                            <div class="media-body">
                                                <div class="bg-sender rounded py-2 px-3 mb-2">
                                                    <p class="text-small mb-0 text-muted">Apollo University, Delhi,
                                                        India Test</p>
                                                </div>
                                                <p class="small text-muted">12:00 PM | Aug 13</p>
                                            </div>
                                        </div>

                                    </div>

                                    <!-- Typing area -->
                                    <form action="#" class="mt-2">
                                        <div class="input-group">
                                            <div class="input-group-append m-auto">
                                                <button id="button-addon2" type="submit" class="btn btn-link">
                                                    <span class="display-5 text-dark material-symbols-outlined">
                                                        send
                                                    </span>

                                                </button>
                                            </div>
                                            <input type="text" placeholder="اكتب ملاحظة" aria-describedby="button-addon2"
                                                class="border-bottom form-control rounded-0 border-0 py-4"
                                                v-model="v$.noteForm.body.$model">
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </iq-card>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import AuditMarkService from '@/API/services/audit-marks.service';


export default {
    name: "Audit Notes",
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        notes: {
            type: [Object],
            required: true,
        },
        to: {
            type: [Number],
            required: true,
        },
    },
    data() {
        return {
            noteForm: {
                body: '',
                mark_for_audit_id:0,
            }
        };
    },
    validations() {
        return {
            noteForm: {
                body: {
                    required
                },
            }
        };
    },
    methods: {
        
        /**
        * Add Note.
        */
        async submitNote() {
            this.v$.$touch();
            if (!this.v$.noteForm.$invalid) {
                this.message = "";
                this.loader = true;
                try {
                    const response = await AuditMarkService.addNote(this.noteForm);
                    this.loader = false;
                    this.message = response;
                    this.v$.noteForm.$reset()
                }
                catch (error) {
                    console.log(error);
                }
            }
        },

    }
};
</script>

<style scoped>
.validation-alert {
    display: none;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    width: 5px;
    background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
    width: 1em;
    background-color: #ddd;
    outline: 1px solid slategrey;
    border-radius: 1rem;
}

.text-small {
    font-size: 0.9rem;
}

.messages-box,
.chat-box {
    height: 510px;
    overflow-y: scroll;
}

.rounded-lg {
    border-radius: 0.5rem;
}

input::placeholder {
    font-size: 0.9rem;
    color: #999;
}

.bg-sender {
    background-color: #e3ebe4
}

.bg-recipient {
    background-color: #cae0cd
}
</style>