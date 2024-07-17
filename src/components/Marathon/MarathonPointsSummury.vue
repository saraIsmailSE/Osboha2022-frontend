<template>
    <div>
        <div class="circular-progress-bars row d-flex justify-content-center">
            <div class="card-header">
                <h2>النقاط</h2>
            </div>

            <div v-for="stat in statistics" :key="stat.name"
                class="circular-progress-bar col-3 col-md-3 col-lg-3 text-center mt-2 mb-3">
                <svg viewBox="0 0 36 36">
                    <path class="circle-bg" d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path class="circle" :stroke-dasharray="stat.value + ', 100'" :class="stat.class" d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span>{{ stat.name }}</span>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <hr class="mt-3 divider" />
            <div class="col-6 col-md-6 col-lg-6 text-center mt-2 mb-3">
                <h4 class="text-center">النقاط الاضافية</h4>
                <p class="text-center"> 20 </p>
            </div>
            <div class="col-6 col-md-6 col-lg-6 text-center mt-2 mb-3">
                <h4 class="text-center">المجموع الكلي</h4>
                <p class="text-center"> 300 </p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            timeFrame: 'week',
            statistics: [
                { name: 'الأسبوع الأول', value: 75, class: 'sleep' },
                { name: 'الأسبوع الثاني', value: 60, class: 'heart-rate' },
                { name: 'الأسبوع الثالث', value: 80, class: 'activity' },
                { name: 'الأسبوع الرابع', value: 90, class: 'water' },
            ],
        };
    },
    methods: {
    },
};
</script>

<style scoped>
.circular-progress-bars {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.circular-progress-bar {
    position: relative;
    text-align: center;
}

.circular-progress-bar svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
}

.circular-progress-bar .circle-bg {
    fill: none;
    stroke: #eee;
    stroke-width: 3.8;
}

.circular-progress-bar .circle {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
    transition: stroke-dasharray 0.6s ease 0s;
}

.circular-progress-bar .circle.sleep {
    stroke: #9b59b6;
}

.circular-progress-bar .circle.heart-rate {
    stroke: #e74c3c;
}

.circular-progress-bar .circle.activity {
    stroke: #2ecc71;
}

.circular-progress-bar .circle.water {
    stroke: #3498db;
}

.divider {
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
</style>