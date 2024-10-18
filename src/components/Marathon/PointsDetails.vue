<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="main-timeline" v-if="point_details">
                    <div class="timeline" v-for="(detail, key, index) in point_details" :key="key">
                        <div class="timeline-content">
                            <div class="timeline-icon">
                                <span class="animate-charcter text-center">
                                    {{ Math.max(totalDailyPoints(detail) - getViolationByIndex(index + 1), 0) }}
                                </span>
                            </div>
                            <h3 class="title">{{ MARATHON_WEEKS[key] }}</h3>
                            <div class="description">
                                <p class="mt-3 mb-1">
                                    المجموع الكلي للنقاط: {{ totalDailyPoints(detail) }}
                                </p>
                                <p>
                                    خصم نقاط: {{ getViolationByIndex(index + 1) }}
                                </p>
                                <AchèvementsSummury :achèvements="detail" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    </div>
</template>

<script>
import AchèvementsSummury from './AchevementsSummury.vue';
import { MARATHON_WEEKS } from "@/utilities/constants";

export default {
    components: {
        AchèvementsSummury,
    },
    props: {
        point_details: {
            type: [Object],
            required: true,
        },
        week_violations: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            MARATHON_WEEKS,
        };
    },
    methods: {
        totalDailyPoints(achevement) {
            return achevement.reduce((total, achevement) => total + achevement.daily_points, 0);
        },
        getViolationByIndex(index) {
            return this.week_violations[`week_violations_${index}`] || 0;
        },


    }
};
</script>

<style scoped>
.animate-charcter {
    text-transform: uppercase;
    background-image: linear-gradient(-225deg,
            #231557 0%,
            #44107a 29%,
            #ff1361 67%,
            #278036 100%);
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 2s linear infinite;
    display: inline-block;
    font-size: 3rem;
}

@keyframes textclip {
    to {
        background-position: 200% center;
    }
}

.main-timeline {
    font-family: 'Poppins', sans-serif;
}

.main-timeline:after {
    content: '';
    display: block;
    clear: both;
}

.main-timeline .timeline {
    width: 50%;
    padding: 0 80px 0 0;
    margin: 0 5px 0 0;
    float: left;
}

.main-timeline .timeline-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: block;
    position: relative;
}

.main-timeline .timeline-content:hover {
    text-decoration: none;
}

.main-timeline .timeline-icon {
    color: #B3386C;
    background-color: #fff;
    font-size: 40px;
    text-align: center;
    line-height: 110px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%);
    position: absolute;
    right: -135px;
    top: 50%;
}

.main-timeline .timeline-icon:before {
    content: '';
    height: 60%;
    border-radius: 50% 50% 0 0/100% 100% 0 0;
    border: 2px solid #B3386C;
    border-bottom: none;
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
}

.main-timeline .title {
    color: #B3386C;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 0 0 7px;
}

.main-timeline .description {
    color: #666;
    font-size: 13px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 1px;
    margin: 0;
}

.main-timeline .timeline:nth-child(even) {
    padding: 0 0 0 80px;
    margin: 0 0 0 5px;
    float: right;
}

.main-timeline .timeline:nth-child(even) .timeline-icon {
    right: auto;
    left: -135px;
}

.main-timeline .timeline:nth-child(4n+2) .timeline-icon,
.main-timeline .timeline:nth-child(4n+2) .timeline-icon:before,
.main-timeline .timeline:nth-child(4n+2) .title {
    color: #008F78;
    border-color: #008F78;
}

.main-timeline .timeline:nth-child(4n+3) .timeline-icon,
.main-timeline .timeline:nth-child(4n+3) .timeline-icon:before,
.main-timeline .timeline:nth-child(4n+3) .title {
    color: #9C3140;
    border-color: #9C3140;
}

.main-timeline .timeline:nth-child(4n+4) .timeline-icon,
.main-timeline .timeline:nth-child(4n+4) .timeline-icon:before,
.main-timeline .timeline:nth-child(4n+4) .title {
    color: #5259ae;
    border-color: #5259ae;
}

@media screen and (max-width:767px) {

    .main-timeline .timeline,
    .main-timeline .timeline:nth-child(even) {
        width: 100%;
        padding: 0 0 0 140px;
        margin: 0 0 30px;
    }

    .main-timeline .timeline-icon,
    .main-timeline .timeline:nth-child(even) .timeline-icon {
        left: -130px;
        right: auto;
    }
}

@media screen and (max-width:479px) {

    .main-timeline .timeline,
    .main-timeline .timeline:nth-child(even) {
        padding: 140px 0 0;
    }

    .main-timeline .timeline-content {
        text-align: center;
    }

    .main-timeline .timeline-icon,
    .main-timeline .timeline:nth-child(even) .timeline-icon {
        transform: translateY(0) translateX(-50%);
        top: -130px;
        left: 50%;
    }
}
</style>