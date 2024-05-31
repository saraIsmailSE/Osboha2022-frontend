<template>
    <div class="iq-card-body ps-3 pe-3 mt-1">
        <h4 class="mb-2">

            <p class="m-auto">
                <span class="badge" :class="STATUS_CLASS[exception.status]">{{ STATUS[exception.status]
                    }}
                </span>
            </p>
        </h4>
        <p class="m-auto">
            تاريخ الطلب: {{ formatFullDate(exception.created_at) }}
        </p>
        <h4 class="mb-2">السبب</h4>
        <p class="m-auto">{{ exception.reason }}</p>
        <h4 class="mb-2">المدة المطلوبة</h4>
        <p class="m-auto">{{ exception.desired_duration }}</p>

        <div v-if="exception.type.type == 'نظام امتحانات - شهري' ||
            exception.type.type == 'نظام امتحانات - فصلي'
        ">
            <h4 class="mb-2">جدول الامتحانات</h4>

            <img class="img-fluid w-75" v-if="exception.media" :src="showMedia(exception.media.id)" />
            <p class="m-auto" v-else>لا يوجد جدول ثابت للامتحانات</p>
        </div>

        <Reviewer :exception="exception" />

        <LastExceptions :last_freez="last_freez" :last_exam="last_exam"
            :last_exceptional_freez="last_exceptional_freez" />

    </div>

</template>
<script>
import LastExceptions from "./LastExceptions"
import Reviewer from './Reviewer';
import mediaService from "@/API/services/media.services";
import { STATUS, STATUS_CLASS } from "@/utilities/constants";
import helper from "@/utilities/helper";

export default {
    name: "Exception Details",
    components: {
        LastExceptions,
        Reviewer,
    },
    props: {
        exception: { type: Object },
        last_freez: { type: Object },
        last_exam: { type: Object },
        last_exceptional_freez: { type: Object },
    },
    data() {
        return {
            STATUS_CLASS,
            STATUS,
        };
    },
    methods: {
        ...helper,
        /**
         * get exam media.
         * @param  {int} media id,
         * @return image url
         */
        showMedia(id) {
            return mediaService.show(id);
        },
    },
};
</script>