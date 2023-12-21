<template>
  <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
            <div class="inner-page-title">
                <h3 class="text-white">عدد الاطروحات</h3>
                <p class="text-white">عدد الاطروحات المتبقية 200</p>
            </div>
            </div>
        </div>
        <div class="col-sm-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">اطروحات بحاجة لمراجعة</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered" >
                            <thead>
                            <tr>
                                <th>صفحة النهاية</th>
                                <th>صفحة البداية</th>
                                <th>رقم الاطروحة</th>
                                <th>اسم الكتاب</th>
                                <th>اسم المستخدم</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>System Architect</td>
                                <td>Edinburgh</td>
                                <td>61</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>Accountant</td>
                                <td>Tokyo</td>
                                <td>63</td>
                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>Junior Technical Author</td>
                                <td>San Francisco</td>
                                <td>66</td>
                                <td>2009/01/12</td>
                                <td>$86,000</td>
                            </tr>
                            <tr>
                                <td>Senior Javascript Developer</td>
                                <td>Edinburgh</td>
                                <td>22</td>
                                <td>2012/03/29</td>
                                <td>$433,060</td>
                            </tr>
                            <tr>
                                <td>Accountant</td>
                                <td>Tokyo</td>
                                <td>33</td>
                                <td>2008/11/28</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>Integration Specialist</td>
                                <td>New York</td>
                                <td>61</td>
                                <td>2012/12/02</td>
                                <td>$372,000</td>
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

}
</script>

<style lang="scss" scoped>
    table {
        text-align: start;
    }
    .col-sm-12{
        direction: rtl;
    }
</style>