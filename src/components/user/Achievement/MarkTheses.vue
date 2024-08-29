<template>
    <div v-for="(thesis, index) in theses" :key="index" class="mt-1">
        <hr>
        <h3>انجاز رقم {{ index + 1 }}</h3>
        <div class="row">
            <div class="row">
                <div class="col-6 form-group">
                    <label class="form-control-plaintext">
                        صفحة البداية: {{ thesis.start_page }}
                    </label>
                </div>
                <div class="col-6 form-group">
                    <label class="form-control-plaintext">
                        صفحة النهاية: {{ thesis.end_page }}
                    </label>
                </div>
            </div>
        </div>
        <h6> الصفحات المنجزة: {{ thesis.end_page - thesis.start_page + 1 }} </h6>
        <p style="white-space: pre-wrap; direction: rtl;">
            {{ thesis.comment.body }}
        </p>
        <small> تاريخ الانجاز: {{ format_date(thesis.created_at) }} </small>
        <small> الكتاب : {{ thesis.book.name }} || {{ BOOK_TYPES[thesis.book.type.type] }} </small>

    </div>

</template>
<script>
import moment from "moment";
import { BOOK_TYPES } from "@/utilities/constants";

export default {
    name: "Mark Theses",
    props: {
        theses: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            BOOK_TYPES,
        };
    },
    methods: {
        format_date(value) {
            if (value) {
                return moment(String(value)).format("MM/DD/YYYY");
            }
        },
    },

};
</script>