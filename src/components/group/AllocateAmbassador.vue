<template>
    <div>
        <h3 class="text-center m-auto w-75">
            نقوم الآن بتجهيز فريق القراءة المناسب لك لاستقبالك بكل حُب، لطفًا اختر جنس القائد المسؤول عنك.
        </h3>

        <div class="container mt-3">
            <div class="radio-tile-group">
                <div class="input-container">
                    <input id="walk" class="radio-button" type="radio" name="radio" @click="leader_gender = 'female'" />
                    <div class="radio-tile">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0"
                                viewBox="0 0 100 100" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                class="">
                                <g>
                                    <path
                                        d="M95.451 93.875c.24 1.93-1.294 3.625-3.239 3.625H7.788c-1.943 0-3.476-1.692-3.24-3.62l.005-.038c.236-1.905.817-3.716 1.59-5.468.914-2.075 2.581-3.46 4.396-4.687 3.305-2.236 6.974-3.75 10.632-5.278 2.632-1.098 5.28-2.16 7.903-3.277 7.436-3.347 8.427-5.908 8.54-6.31a5.55 5.55 0 0 0 .116-.719c.053-.557.095-1.115.132-1.674V64.98c-9.944.088-15.548-2.515-18.376-4.513-1.13-.798-1.068-2.448.055-3.256 2.676-1.922 6.503-7.451 6.13-23.359-.568-24.241 10.606-28.244 14.772-29.83C52.573-.587 58.67 6.746 58.67 6.746c14.061-1.3 17.942 14.06 16.214 31.555-1.172 11.872 2.877 16.941 5.6 18.973 1.102.822.976 2.491-.172 3.246-7.082 4.654-18.067 4.317-18.067 4.317v2.973c.009.096.016.194.026.291.023.244.062.484.115.719.114.403 1.104 2.964 8.54 6.31 2.624 1.117 5.272 2.18 7.903 3.277 3.66 1.527 7.327 3.041 10.632 5.277 1.815 1.229 3.483 2.613 4.397 4.688.772 1.75 1.354 3.563 1.59 5.468l.004.036z"
                                        opacity="1"></path>
                                </g>
                            </svg>
                        </div>
                        <label for="walk" class="radio-tile-label">أنثى</label>
                    </div>
                </div>

                <div class="input-container">
                    <input id="bike" class="radio-button" type="radio" name="radio" @click="leader_gender = 'male'" />
                    <div class="radio-tile">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0"
                                viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                class="">
                                <g>
                                    <clipPath id="a">
                                        <path d="M0 0h24v24H0z" opacity="1"></path>
                                    </clipPath>
                                    <g clip-path="url(#a)">
                                        <path
                                            d="m19.743 18.045-3.831-.958-.326-1.304a6.895 6.895 0 0 0 1.935-3.839 1.503 1.503 0 0 0 1.084-1.258l.25-2a1.495 1.495 0 0 0-.957-1.586l.092-1.883.374-.375c.563-.599 1.03-1.626.054-3.116C17.668.581 16.394 0 14.63 0c-.696 0-2.298 0-3.79 1.002C6.58 1.091 6 3.07 6 5c0 .449.109 1.46.181 2.07a1.5 1.5 0 0 0-1.036 1.616l.25 2a1.505 1.505 0 0 0 1.203 1.287 6.938 6.938 0 0 0 1.839 3.722l-.348 1.393-3.831.958A5.61 5.61 0 0 0 0 23.5a.5.5 0 0 0 .5.5h23c.276 0 .5-.226.5-.502a5.612 5.612 0 0 0-4.257-5.453z"
                                            opacity="1" data-original="#000000"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <label for="bike" class="radio-tile-label">ذكر</label>
                    </div>
                </div>

                <div class="input-container">
                    <input id="drive" class="radio-button" type="radio" name="radio" @click="leader_gender = 'any'" />
                    <div class="radio-tile">
                        <div class="icon ">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0"
                                viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                class="">
                                <g>
                                    <path
                                        d="m20.8 16.3-2.8-.6-.1-.4c1.9-.3 2.9-.9 2.9-.9.1-.1.2-.2.2-.4s-.1-.3-.2-.4c0 0-1.3-1.1-1.3-4.8 0-3.3-.8-4.9-2.3-4.9H17c-.5-.5-1-.7-1.9-.7-.2 0-.4.1-.4.3-.1.2-.1.4 0 .5.8 1.2.8 2.5 0 3.5-.2.2-.2.5 0 .6.4.5.6 1.1.5 1.7l-.2 1.4c-.1.6-.4 1.1-.8 1.5-.1.1-.1.2-.2.3-.1.5-.3 1-.6 1.5-.1.1-.1.3 0 .4.1.1.2.3.3.3l1.3.3c2.4.6 4 2.7 4 5.1 0 .3.2.5.5.5h4c.3 0 .5-.2.5-.5 0-2.1-1.3-3.8-3.2-4.3zm-6 0-2.8-.6-.2-.8c.7-.7 1.2-1.7 1.4-2.8.4-.2.8-.5.8-1l.2-1.5c0-.4-.1-.7-.3-1-.1-.1-.3-.2-.4-.3l.1-1.3.2-.2c.4-.5.8-1.3.1-2.5-.6-.9-1.6-1.3-3-1.3-.5 0-1.7 0-2.8.7-3.2.1-3.7 1.7-3.7 3.1 0 .3.1 1 .1 1.4-.1.1-.3.2-.4.4-.2.3-.3.6-.3 1L4 11c.1.5.4.9.9 1 .2 1 .6 2 1.3 2.7l-.2 1-2.8.7c-1.9.4-3.2 2.1-3.2 4.1 0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5 0-2-1.3-3.7-3.2-4.2z"
                                        opacity="1"></path>
                                </g>
                            </svg>
                        </div>
                        <label for="drive" class="radio-tile-label">لا فرق</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12 text-center" v-if="loader">
            <p class="text-center">يتم اختيار فريقك</p>
            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
        </div>

        <div class="alert alert-danger w-75 m-auto mt-3" role="alert" v-if="message">
            {{ message }}
        </div>

        <div class="d-inline-block w-100 mt-3" v-if="leader_gender">
            <button type="button" class="btn btn-primary w-50" :disabled="loader" @click="allocateAmbassador()">
                اعتماد
            </button>
        </div>


        <div class="alert alert-warning w-75 m-auto mt-3" role="alert">
            الايميل المسجل به: {{ user.email }}
        </div>
    </div>
</template>
<script>
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import helper from "@/utilities/helper";

export default {
    name: "Allocate Ambassador",
    data() {
        return {
            leader_gender: '',
            loader: false,
        };
    },
    methods: {
        async allocateAmbassador() {
            this.message = "";
            this.loader = true;
            try {
                const response = await AmbassadorsRequest.allocateAmbassador(this.leader_gender, this.user.id);
                switch (response.message) {
                    case 'no group found':
                        this.message = `لا يوجد فريق متاح حاليًا حسب طلبك، لكن تم تسجيل طلبك. سيتم مراسلتك عبر بريدك الإلكتروني فور تخصيص فريق لمتابعة قراءتك.ابق بالقرب`
                        break;
                    case 'group without leader':
                        this.message = `لا يوجد فريق متاح حاليًا حسب طلبك، لكن تم تسجيل طلبك. سيتم مراسلتك عبر بريدك الإلكتروني فور تخصيص فريق لمتابعة قراءتك.ابق بالقرب`
                        break;
                    case 'done successfully':
                        this.message = 'تم توزيعك لفريق ' + response.group.name + ' سيتم نقلك للصفحة الرئيسية '
                        setTimeout(() => {
                            this.$router.push({
                                name: "osboha.list",
                                params: {
                                    tour: 1
                                }

                            });
                        }, 3000);

                        break;

                }
            }
            catch (error) {
                helper.toggleToast(
                    "حدث خطأ أثناء التوزيع, حاول مرة أخرى أو تواصل مع صفحة الدعم لمساعدتك",
                    "error"
                );
                console.log(error);
            }
            finally {
                this.loader = false;

            }

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
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
}

.radio-tile-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.radio-tile-group .input-container {
    position: relative;
    height: 7rem;
    width: 7rem;
    margin: 0.5rem;
}

.radio-tile-group .input-container .radio-button {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    cursor: pointer;
}

.radio-tile-group .input-container .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 2px solid #208040;
    border-radius: 5px;
    padding: 1rem;
    transition: transform 300ms ease;
}

.radio-tile-group .input-container .icon svg {
    fill: #208040;
    width: 3rem;
    height: 3rem;
}

.radio-tile-group .input-container .radio-tile-label {
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #208040;
    margin-top: 10%;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile {
    background-color: #208040;
    border: 2px solid #208040;
    color: white;
    transform: scale(1.1, 1.1);
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .icon svg {
    fill: white;
    background-color: #208040;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .radio-tile-label {
    color: white;
    background-color: #208040;
}
</style>