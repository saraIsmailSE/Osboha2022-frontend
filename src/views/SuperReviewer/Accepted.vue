<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
                <div class="inner-page-title">
                    <h3 class="text-white">التوثيقات المقبولة</h3>
                    <p class="text-white">العدد الكلي 90</p>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <iq-card class="iq-card">
                <div class="iq-card-body p-0">
                    <div class="image-block text-center">
                        <img src="@/assets/images/export-congrats.png" class="img-fluid rounded w-50" alt="blog-img">
                    </div>
                    <h4 class="text-center mt-3 mb-3">لا يوجد توثيقات</h4>
                </div>
            </iq-card>
        </div>
        <div class="col-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">الأطروحات</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead class="col-12">
                                <tr>
                                    <th>رقم التوثيق</th>
                                    <th>اسم الكتاب</th>
                                    <th>بواسطة</th>
                                    <th>تاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class=" btn-primary text-white bg-primary">
                                        <a href="javascript:void(0);" class="text-white"
                                            @click="listGeneralInformations(information.user_book.id)">
                                            10090
                                        </a>
                                    </td>

                                    <td>
                                        كتاب 2
                                    </td>
                                    <td>
                                        عضو 1
                                    </td>
                                    <td>
                                        2\4\1032
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </template>
            </iq-card>
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">التلخيص العام</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead class="col-12">
                                <tr>
                                    <th>رقم التوثيق</th>
                                    <th>اسم الكتاب</th>
                                    <th>بواسطة</th>
                                    <th>تاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class=" btn-primary text-white bg-primary">
                                        <a href="javascript:void(0);" class="text-white"
                                            @click="listGeneralInformations(information.user_book.id)">
                                            10090
                                        </a>
                                    </td>

                                    <td>
                                        كتاب 2
                                    </td>
                                    <td>
                                        عضو 1
                                    </td>
                                    <td>
                                        2\4\1032
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </template>
            </iq-card>

            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">الأسئلة المعرفية</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead class="col-12">
                                <tr>
                                    <th>رقم التوثيق</th>
                                    <th>اسم الكتاب</th>
                                    <th>بواسطة</th>
                                    <th>تاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class=" btn-primary text-white bg-primary">
                                        <a href="javascript:void(0);" class="text-white"
                                            @click="listGeneralInformations(information.user_book.id)">
                                            10090
                                        </a>
                                    </td>

                                    <td>
                                        كتاب 2
                                    </td>
                                    <td>
                                        عضو 1
                                    </td>
                                    <td>
                                        2\4\1032
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </template>
            </iq-card>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Accepted',
    data() {
        return {
        }
    },

}
</script>
