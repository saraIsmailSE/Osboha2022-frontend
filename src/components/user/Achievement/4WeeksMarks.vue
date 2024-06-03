<template>
    <div>
        <table class="table inline-grid w-100">
            <thead>
                <tr class="">
                    <td scope="col">الأسبوع</td>
                    <td scope="col" colspan="3">العلامة من 100</td>
                    <td scope="col">الصفحات</td>
                    <td scope="col">الاطروحات</td>
                    <td scope="col">الاقتباسات</td>
                </tr>
            </thead>
            <tbody>
                <tr :class="`${mark.is_freezed ? 'freeze' : markClass(mark.reading_mark + mark.writing_mark + mark.support)} `"
                    v-for="mark in marks" :key="mark.id">
                    <td class="align-middle text-center">
                        <span> {{ mark.week.title }}</span>
                    </td>
                    <td class="align-middle text-center">
                        <span> القراءة
                            <br />
                            {{ mark.reading_mark }}
                        </span>
                    </td>
                    <td class="align-middle text-center">
                        <span>
                            الكتابة
                            <br />
                            {{ mark.writing_mark }}
                        </span>
                    </td>
                    <td class="align-middle text-center">
                        <span>
                            اعرف مشروعك
                            <br />
                            {{ mark.support ? mark.support : 0 }}
                        </span>
                    </td>
                    <td class="align-middle text-center">
                        <span> {{ mark.total_pages }} </span>
                    </td>
                    <td class="align-middle text-center">
                        <span> {{ mark.total_thesis }} </span>
                    </td>
                    <td class="align-middle text-center">
                        <span> {{ mark.total_screenshot }} </span>
                    </td>

                    <td class="align-middle text-center">
                        <span class="support material-symbols-outlined" role="button"
                            @click="setThesesToShow(mark.thesis)">
                            {{ mark.reading_mark + mark.writing_mark + mark.support > 0 ?
                                "visibility" : "visibility_off" }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <mark-theses :theses="thesesToShow" v-if="thesesToShow" />

    </div>
</template>
<script>
import moment from "moment";
import MarkTheses from './MarkTheses.vue';

export default {
    name: "User 4 weeks Marks",
    components: {
        MarkTheses
    },
    props: {
        marks: {
            type: [Object],
            required: true,
        }
    },
    data() {
        return {
            thesesToShow: null,
        };
    },
    methods: {
        format_date(value) {
            if (value) {
                return moment(String(value)).format("MM/DD/YYYY");
            }
        },

        /**
         * return mark color class.
         *  @param  mark
         * @return class
         */
        markClass(mark) {
            switch (mark) {
                case -1:
                    return "freeze";
                case 100:
                    return "full-mark";

                case 0:
                    return "zero-mark";

                default:
                    return "incomplete";
            }
        },
        setThesesToShow(theses) {
            this.thesesToShow = theses;
        }
    },

};
</script>
<style scoped>
.freeze {
    --bs-bg-opacity: 1;
    background-color: #F4FAFF !important;
}

.full-mark {
    --bs-bg-opacity: 1;
    background-color: #F0FDF0 !important;
}

.zero-mark {
    --bs-bg-opacity: 1;
    background-color: #FFE5E6 !important;
}

.incomplete {
    --bs-bg-opacity: 1;
    background-color: #FFEBCC;
}
</style>