<template>
    <div>
        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card">
                <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                    <h3 class="text-center mt-3 mb-3">اسم السفير - الأسبوع الرابع من يناير</h3>
                </div>
                <div class="iq-card-body p-3">
                    <AchevmentCard />
                    <div class="d-flex align-items-center mt-3">
                        <Check :theses="theses" />
                    </div>

                    <div class="d-flex align-items-center mt-3 row">
                        <div class="alert alert-danger text-center" role="alert">
                            لا يمكنك الاعتماد لأن الأسبوع انتهى
                        </div>
                        <div class="d-inline-block w-100 text-center col-12">
                            <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                عودة للفريق
                            </button>
                        </div>
                    </div>
                </div>
            </iq-card>
        </div>
    </div>
</template>
<script>
import AchevmentCard from '@/components/book/theses/achevment-card.vue'
import Check from '@/components/book/theses/check.vue'

export default {
    name: "ListReading",
    components: {
        Check,
        AchevmentCard
    },

    data() {
        return {
            theses: [
                {
                    start:7,
                    end:40,
                    body: `لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود أنت بخير ، هل كل شيء على ما يرام؟
أجل ، حسنًا ، ماذا عن واجبي المنزلي ، ماك فلاي؟
أجل ، حسنًا ، ماذا عن واجبي المنزلي ، ماك فلاي؟
أعرف ما ستقوله ، يا بني ، وأنت على حق ، أنت على حق ، لكن بيف كانت مشرفي ، وأخشى أنني لست جيدًا في المواجهات.
نعم ، لكنني لم أختر قتالًا في حياتي كلها.
كلنا نرتكب أخطاء في الحياة ، أطفال
آه ، حسنًا ، حسنًا بيف ، آه ، سأنهي ذلك الليلة وسأحضره أول شيء صباح الغد.
فلوكسايتور.`,
                    mark:100,
                },

                {
                    start:7,
                    end:19,
                    body: `رونالد ريغان.
توقف ، انتظر لحظة ، دكتور ، هل تخبرني أن والدتي قد حصلت على سخونة بالنسبة لي؟
حسنًا ، يا أماه ، تحدثنا عن هذا ، لن نذهب إلى البحيرة ، فقد تحطمت السيارات.`,
mark:40,
                },

            ]
        };
    },
};
</script>
