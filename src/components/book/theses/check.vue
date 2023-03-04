<template>
    <div class="col-lg-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-header">
                <h2>الانجاز</h2>
            </div>
            <div class="card-body">
                <div class="blog-description" v-for="thesis in theses" :key="thesis.id">
                    <h4 style="background-color: #F1F9F5; width: fit-content;"> اسم الكتاب {{ 1 }}</h4>

                    <table class="table w-100">
                        <thead>
                            <tr>
                                <th scope="col">عدد الصفحات</th>
                                <th scope="col">نوع الانجاز</th>
                                <th scope="col">وقت الانجاز</th>
                                <th scope="col">علامة الانجاز</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ thesis.end - thesis.start }}</td>
                                <td> أطروحة</td>
                                <td> 20-20-2020</td>
                                <td> 100%</td>
                                <td>
                                    <i role="button" class="material-symbols-outlined md-18 me-1 text-primary" data-bs-toggle=" modal"
                                        data-bs-target="#thesisModal">
                                        visibility
                                    </i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <!-- Modal -->
                    <div class="modal fade" id="thesisModal" tabindex="-1" aria-labelledby="thesisModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="thesisModalLabel">اسم الكتاب</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>{{ thesis.body }}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">اعتماد</button>
                                    <select class="form-select btn btn-danger w-50">
                                        <option class="bg-white text-dark" value="" selected>تعديل</option>
                                        <option class="bg-white text-dark">خصم العلامة كاملة</option>
                                        <option class="bg-white text-dark">حساب علامة أطروحة واحدة</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CheckThesis',
    props: {
        theses: { type: Object }
    },
    data() {
        return {
        }

    },
}
</script>
