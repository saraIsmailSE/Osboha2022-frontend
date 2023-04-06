<template>
    <div class="card">
        <div class="card-header rounded-0 p-1" style="background-color: #1D1A55;">
            <h5 class="text-center text-light mt-0">
                <span role="button" class="material-symbols-outlined" v-if="!expand" @click="expand = !expand">
                    expand_more
                </span>
                <span role="button" class="material-symbols-outlined" v-else @click="expand = !expand">
                    expand_less
                </span>
                الأسبوع الخامس من ديسمبر
            </h5>

        </div>
        <div class="card-body row d-flex justify-content-center" style="box-shadow: none;" v-if="expand">

            <div class="card col-3 border border-2 me-1 ms-1">
                <div class="card-header text-center m-auto">
                    يوم
                </div>
                <div class="card-body">
                    <h1 class="card-text text-center">30</h1>
                </div>
            </div>
            <div class="card col-3 border border-2 me-1 ms-1">
                <div class="card-header text-center m-auto">
                    ساعة
                </div>
                <div class="card-body">
                    <h1 class="card-text text-center">30</h1>
                </div>
            </div>

            <div class="card col-3 border border-2 me-1 ms-1">
                <div class="card-header text-center m-auto">
                    دقيقة
                </div>
                <div class="card-body">
                    <h1 class="card-text text-center">30</h1>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
export default {
    name: 'Countdown',
    data() {
        return {
            expand: true,
        }

    },

}
</script>
