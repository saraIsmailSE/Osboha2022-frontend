<template>
    <div v-if="Object.keys(items).length">
        <div class="blog-description mt-2" v-for="(memberWork, index) in items" :key="index">
            <h3 class="book-title mb-2">{{ index }}</h3>
            <table class="table w-100">
                <thead>
                    <tr>
                        <th scope="col"> توثيق</th>
                        <th scope="col">الملاحظات</th>
                        <th scope="col" v-if="for_super == 'reviewer'">حالته</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in memberWork" :key="index">
                        <td>
                            <router-link :to="{ name: routeTo, params: { user_book_id: item.eligible_user_books_id } }">
                                {{ item.eligible_user_books_id }}
                            </router-link>
                        </td>
                        <!-- ########## الملاحظات ########## -->
                        <td v-if="item.reviews">
                            {{ item.reviews }}
                        </td>
                        <td v-else>
                            لا يوجد
                        </td>
                        <!-- ########## الحالة ########## -->
                        <td v-if="for_super == 'reviewer'">
                            {{ ELIGIBLE_STATUS[item.status] }}
                        </td>

                    </tr>
                </tbody>
            </table>
            <hr />
        </div>
    </div>
    <div v-else>
        <h4 class="text-center">
            لا يوجد
        </h4>
    </div>
</template>
<script>
import { ELIGIBLE_STATUS } from "@/utilities/constants";

export default {
    name: "List Items",
    components: {
    },
    props: {
        items: {
            type: Object,
            requiered: true
        },
        route: {
            type: String,
            requiered: true
        },
        for_super: {
            type: String,
            requiered: true
        }
    },
    data() {
        return {
            ELIGIBLE_STATUS,
        }
    },
    computed: {
        routeTo() {
            switch (this.route) {
                case 'thesis':
                    return `thesis-review.thesis`;
                case 'question':
                    return `questions.questions`;
                case 'generalSummury':
                    return `general.general_informations`;
                default: return false;

            }

        }
    }

};
</script>
