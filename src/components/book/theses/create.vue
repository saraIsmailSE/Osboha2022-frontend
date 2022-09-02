<template>
    <div>
        <iq-card id="post-modal-data" body-class="iq-card iq-card-block iq-card-stretch iq-card-height">
            <template v-slot:body>
                <div class="d-flex align-items-center">
                    <form class="post-text ml-3 w-100 row">
                        <div class="row">
                            <div class="form-group">
                                <h5 class="form-label">نوع الأطروحة </h5>
                            </div>
                            <div class="form-check custom-radio form-check-inline form-group col-2">
                                <input type="radio" id="customRadio6" name="customRadio-1" class="form-check-input" @change="noThesisAndScreenshots()">
                                <label class="form-check-label" for="customRadio6"> قراءة </label>
                            </div>
                            <div class="form-check custom-radio form-check-inline form-group col-2">
                                <input type="radio" id="customRadio7" name="customRadio-1" class="form-check-input" checked @change="showAddThesis()">
                                <label class="form-check-label" for="customRadio7"> كتابة </label>
                            </div>
                            <div class="form-check custom-radio form-check-inline form-group col-2">
                                <input type="radio" id="customRadio8" name="customRadio-1" class="form-check-input"
                                @change="showAddScreenshots()">
                                <label class="form-check-label" for="customRadio8"> اقتباسات </label>
                            </div>

                            <div class="form-check custom-radio form-check-inline form-group col-2">
                                <input type="radio" id="customRadio8" name="customRadio-1" class="form-check-input"
                                @change="thesisAndScreenshots()">
                                <label class="form-check-label" for="customRadio8"> كتابة واقتباسات </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <h5 class="form-label">الصفحات</h5>
                            </div>
                            <div class="form-check custom-radio form-check-inline form-group col-2">
                                <input type="radio" id="customRadio8" name="customRadio-2" class="form-check-input"
                                    @change="showTotal()">
                                <label class="form-check-label" for="customRadio8"> عدد كلي </label>
                            </div>

                            <div class="form-check custom-radio form-check-inline form-group col-2">
                                <input type="radio" id="customRadio8" name="customRadio-2" class="form-check-input"
                                    checked="" @change="showStartEnd()">
                                <label class="form-check-label" for="customRadio8"> بداية ونهاية  </label>
                            </div>
                        </div>
                        <div class="form-group col-6" v-if="startEnd">
                            <select class="form-select" data-trigger name="choices-single-default"
                                id="choices-single-default">
                                <option value="">اختر صفحة البداية</option>
                                <option value="Choice 1">Choice 1</option>
                                <option value="Choice 2">Choice 2</option>
                                <option value="Choice 3">Choice 3</option>
                            </select>
                        </div>
                        <div class="form-group col-6" v-if="startEnd">

                            <select class="form-select" data-trigger name="choices-single-default"
                                id="choices-single-default">
                                <option value="">اختر صفحة النهاية</option>
                                <option value="Choice 1">Choice 1</option>
                                <option value="Choice 2">Choice 2</option>
                                <option value="Choice 3">Choice 3</option>
                            </select>
                        </div>
                        <div class="form-group" v-if="total">
                            <label class="form-label" for="totalPages">العدد الكلي للصفحات</label>
                            <input type="text" class="rounded form-control" id="totalPages">
                        </div>
                        <div class="form-group" v-if="thesis">
                            <label class="form-label" for="thesisBody">الأطروحة</label>
                            <textarea rows="5" placeholder="... اكتب أطروحتك" class="rounded form-control"
                                id="thesisBody"></textarea>
                        </div>

                        <div class="form-group" v-if="screenshots">
                            <label class="form-label" for="customFile"> اضافة اقتباس</label>
                            <input class="form-control" type="file" id="customFile">
                        </div>

                    </form>
                </div>
                <hr />
                <a href="javascript:void(0);" class="btn btn-primary d-block mt-3">إضافة</a>

            </template>
        </iq-card>
    </div>
</template>
<script>
export default {
    name: 'CreateThesis',
    props: [
        'pages',
        'user_book_id'
    ],
    data() {
        return {
            newThesis: '',
            thesis:true,
            screenshots:false,
            startEnd:true,
            total:false,
        }
    },
    methods: {
        addNewthesis(thesis) {
        },
        showAddThesis() {
            this.thesis=true;
            this.screenshots=false;
        },
        showAddScreenshots() {
            this.screenshots=true;
            this.thesis=false;
        },
        
        noThesisAndScreenshots() {
            this.thesis=false
            this.screenshots=false
        },

        thesisAndScreenshots() {
            this.thesis=true
            this.thesis=true
        },
        showStartEnd(){
            this.startEnd=true;
            this.total=false;
        },
        showTotal(){
            this.total=true;
            this.startEnd=false;
        }

    }
}
</script>