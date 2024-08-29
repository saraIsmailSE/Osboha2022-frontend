<template>
    <div class="blog-description mt-3">
        <h3>
            قراءة السفراء
            <span class="material-symbols-outlined align-middle me-1">
                book_5
            </span>

        </h3>
        <table class="table inline-grid w-100">
            <thead>
                <tr class="d-flex justify-content-around">
                    <th scope="col">السفير</th>
                    <th scope="col"> العلامة من 100</th>
                    <th scope="col"> الصفحات</th>
                    <th scope="col"> الانجاز</th>
                    <th scope="col">الاطروحات</th>
                    <th scope="col">الاقتباسات</th>
                    <th scope="col">الدعم</th>
                </tr>
            </thead>
            <tbody v-for="ambassador in ReadingDataTofilter.sort((a, b) => b.total_pages - a.total_pages)"
                :key="ambassador.id">
                <tr class="d-flex justify-content-around"
                    :class="`${ambassador.is_freezed ? 'freeze' : markClass(ambassador.reading_mark + ambassador.writing_mark + ambassador.support)} `">
                    <td class="align-middle text-center">
                        <span> {{ ambassador.name + " " + ambassador.last_name }} </span>
                        <small class="badge bg-success ms-1 me-1" v-if="groupLeader ==ambassador.id">قائد</small>
                    </td>
                    <td class="align-middle text-center">
                        <span> {{ ambassador.reading_mark + ambassador.writing_mark + ambassador.support }} </span>
                    </td>
                    <td class="align-middle text-center">
                        <span> {{ ambassador.total_pages }} </span>
                    </td>
                    <td class="align-middle text-center">
                        <span v-if="ambassador.total_thesis > 0 && ambassador.total_screenshot > 0">
                            أطروحة واقتباسات
                        </span>
                        <span v-else-if="ambassador.total_thesis > 0">أطروحة</span>
                        <span v-else-if="ambassador.total_screenshot > 0">اقتباس</span>
                        <span v-else-if="ambassador.total_pages == 0">لا يوجد </span>
                        <spanb v-else>قراءة فقط</spanb>
                    </td>
                    <td class="align-middle text-center">
                        <span> {{ ambassador.total_thesis }} </span>
                    </td>

                    <td class="align-middle text-center">
                        <span> {{ ambassador.total_screenshot }} </span>
                    </td>

                    <td class="align-middle text-center">
                        <span class="support material-symbols-outlined" v-if="ambassador.support">
                            task_alt
                        </span>
                        <span class="no-support material-symbols-outlined" v-else>
                            close
                        </span>
                    </td>


                </tr>

            </tbody>
            <tr class="d-flex justify-content-center">
                <td class="align-middle text-center w-100" colspan="8">
                    <h4 class="text-center"> العدد الكلي للصفحات {{ totalPages }} </h4>
                </td>
            </tr>

        </table>
        <hr />
    </div>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Reading List Statistics",
    props: {
        ReadingData: {
            required: true,
        },
        groupLeader: {
            type: Number,
            default:0
        },
    },
    created() {
        this.ReadingDataTofilter = this.ReadingData
    },
    data() {
        return {
            ReadingDataTofilter: null,
        }
    },
    computed: {
        totalPages() {
            return this.ReadingDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.total_pages), 0);
        }
    },
    methods: {
        getFirstTwoNames(fullName) {
            // Split the full name by spaces
            var nameParts = fullName.split(' ');
            // Take only the first two parts
            var userName = nameParts.slice(0, 2);
            // Join the two parts back into a string
            return userName.join(' ');
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
    },
};
</script>

<style scoped>
td {
    width: calc(100% / 8);
}

.no-support {
    vertical-align: -webkit-baseline-middle;
    color: darkred;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

.support {
    vertical-align: -webkit-baseline-middle;
    color: #278036;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

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