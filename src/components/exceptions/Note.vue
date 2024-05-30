<template>
    <div class="col-12 p-3">
        <div class="card">
            <div class="card-header" style="background:#cae0cd;">
                <h4 class="card-title"> ملاحظات حول طلب التجميد </h4>
            </div>
            <div class="card-content">
                <div class="card-body">
                    <div class="row rounded-lg overflow-hidden shadow">
                        <!-- NOtes Box-->
                        <div class="col-12 px-0">
                            <div class="px-4 py-5 chat-box bg-white" v-if="notes" id="notes_container">
                                <div v-for="note in notes" :key="note.id" class="media w-auto mb-3"
                                    :class="[note.from_id == user.id ? 'ml-auto' : 'ltrDirection']">
                                    <base-avatar v-if="note.from_id != user.id" :profileImg="note.from.user_profile.profile_picture
                                        " :profile_id="note.from.user_profile.id" :title="note.from.name"
                                        :gender="note.from.gender" avatarClass="rounded-circle avatar-40" width="50" />
                                    <div class="media-body ml-3">

                                        <div class="rounded py-2 px-3 mb-2"
                                            :class="[note.from_id == user.id ? 'bg-sender' : 'bg-recipient']">
                                            <small v-if="note.from_id != user.id" class="font-weight-bold">
                                                {{ note.from.name }}
                                            </small>

                                            <p class="text-small mb-0 text-muted">
                                                {{ note.body }}
                                            </p>
                                        </div>
                                        <p class="small text-muted">
                                            {{ formatFullDate(note.created_at) }}
                                        </p>
                                    </div>
                                </div>


                            </div>
                            <div class="col-sm-12 text-center" v-if="loader">
                                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader"
                                    style="height: 100px" />
                            </div>

                            <!-- Typing area -->
                            <form @submit.prevent="submitNote()" class="mt-2">
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
                                    <small style="color: red" v-if="v$.noteForm.body.$invalid">
                                        الملاحظة مطلوبة
                                    </small>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import exceptionService from "@/API/services/user-exception.service";
import helper from "@/utilities/helper";


export default {
    name: "Audit Notes",
    setup() {
        return { v$: useVuelidate() };
    },
    async created() {
        this.notes = await exceptionService.getNotes(this.noteForm.user_exception_id);
    },
    data() {
        return {
            notes: null,
            loader: false,
            noteForm: {
                body: '',
                user_exception_id: this.$route.params.exception_id,
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
        ...helper,
        /**
        * Add Note.
        */
        async submitNote() {
            this.v$.$touch();
            if (!this.v$.noteForm.$invalid) {
                this.loader = true;
                try {
                    const response = await exceptionService.addNote(this.noteForm);
                    this.loader = false;
                    this.notes.push(response);
                    this.scrollToEnd();
                    this.noteForm.body = '';
                    this.v$.noteForm.$reset()
                }
                catch (error) {
                    console.log(error);
                }
            }
        },
        scrollToEnd: function () {
            var container = this.$el.querySelector("#notes_container");
            container.scrollTop = container.scrollHeight;
        },


    },
    computed: {
        user() {
            return this.$store.getters.getUser;
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

.ltrDirection {
    direction: ltr;
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

.font-weight-bold {
    font-weight: bold;
}
</style>