<template>
   <div class="row">
      <div class="col-lg-12">
         <div class="card card-block card-stretch card-height blog blog-detail">
            <div class="card-body">
               <div class="image-block text-center mt-3">

                  <img src="@/assets/images/books/6.jpg" class="img-fluid rounded w-25" alt="blog-img">
               </div>
               <div class="blog-description mt-3 text-center">
                  <h2 class="mb-3 pb-3 border-bottom text-center">اسمي أحمر</h2>
                  <div class="blog-meta d-flex align-items-center mb-3 position-right-side flex-wrap ">
                     <div class="date me-4 d-flex align-items-center"><i
                           class="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>تاريخ الاضافة
                        20-20-2002</div>
                     <div class="like me-4 d-flex align-items-center"><i
                           class="material-symbols-outlined pe-2 md-18 text-primary">
                           star
                        </i>70% تقييم
                     </div>
                     <div class="comments me-4 d-flex align-items-center"><i
                           class="material-symbols-outlined pe-2 md-18 text-primary">
                           mode_comment
                        </i>82 أطروحة
                     </div>
                  </div>
                  <p class="text-center">
                     يجب أن يكون هذا حلما. لا تقلق. هذا كله خطأ. لا أعرف ما هو ولكن عندما أقبلك ، يكون الأمر أشبه بتقبيل
                     أخي. أعتقد أن هذا ليس له أي معنى ، أليس كذلك؟ ماذا كنت تفعل في منتصف الشارع ، طفل في مثل سنك. أمي
                     أبي. فقط استدر ، McFly ، وابتعد. هل أنت أصم يا (ماك فلاي)؟ أغلق الباب واضربه.

                     مرحباً يا دكتور أين أنت؟ حار ، يسوع المسيح ، د. يا يسوع المسيح ، دكتور ، لقد تفككت أينشتاين. أنا
                     أضمن ذلك. توقف ، لقد قاموا بالفعل بتنظيف هذا المكان ، يبدو جديدًا. أغلق فمك القذر ، أنا لست من هذا
                     النوع من الفتيات.

                     جورج. أنا ، أنا آسف ، السيد ماكفلاي ، أعني ، لقد بدأت للتو في ارتداء المعطف الثاني. قل ، لماذا تركت
                     هؤلاء الأولاد يدفعونك هكذا؟ نعم ، اعطني علامة تبويب. انظر ، يجب أن تستمع إلي.

                     أنت جورج مكفلاي. نعم حسنا. وثيقة. هيا ، هيا لنذهب. إنه شاب غريب جدا.
                  </p>
               </div>
            </div>
         </div>
      </div>
      <div class="col-lg-12">
         <div class="card card-block card-stretch card-height blog user-comment">
            <div class="card-header d-flex justify-content-between">
               <div class="header-title">
                  <h4 class="card-title"> الأطروحات</h4>
               </div>
            </div>
            <div class="card-body">
               <div class="row">
                  <listThesis v-for="thesis in theses" :key="thesis.id" :thesis="thesis" />

                  <div class="col-lg-12">
                     <div class="card card-block card-stretch card-height blog">
                        <div class="card-header d-flex justify-content-between">
                           <div class="header-title">
                              <h4 class="card-title">أضف أطروحة</h4>
                           </div>
                        </div>
                        <div class="card-body">
                           <createThesis />
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
import listThesis from '../../components/book/theses/list.vue'
import createThesis from '../../components/book/theses/create.vue'
export default {
   name: 'BookDetails',
   components: {
      listThesis,
      createThesis,
   },
   data() {
      return {
         theses: [
            {
               pages: 30,
               body: `لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود أنت بخير ، هل كل شيء على ما يرام؟
أجل ، حسنًا ، ماذا عن واجبي المنزلي ، ماك فلاي؟
أجل ، حسنًا ، ماذا عن واجبي المنزلي ، ماك فلاي؟
أعرف ما ستقوله ، يا بني ، وأنت على حق ، أنت على حق ، لكن بيف كانت مشرفي ، وأخشى أنني لست جيدًا في المواجهات.
نعم ، لكنني لم أختر قتالًا في حياتي كلها.
كلنا نرتكب أخطاء في الحياة ، أطفال
آه ، حسنًا ، حسنًا بيف ، آه ، سأنهي ذلك الليلة وسأحضره أول شيء صباح الغد.
فلوكسايتور.`,
               rate: 3,
               comments: [
                  {
                     author: 'USER',
                     author_image: 'avatar-02.jpg',
                     created_at: '12-06-2019',
                     body: `رونالد ريغان.
توقف ، انتظر لحظة ، دكتور ، هل تخبرني أن والدتي قد حصلت على سخونة بالنسبة لي؟
حسنًا ، يا أماه ، تحدثنا عن هذا ، لن نذهب إلى البحيرة ، فقد تحطمت السيارات.`,
                  },
                  {
                     image: 'avatar-01.jpg',
                     author: 'USER',
                     author_image: 'avatar-06.jpg',
                     created_at: '12-06-2019',
                     body: `رونالد ريغان.
توقف ، انتظر لحظة ، دكتور ، هل تخبرني أن والدتي قد حصلت على سخونة بالنسبة لي؟
حسنًا ، يا أماه ، تحدثنا عن هذا ، لن نذهب إلى البحيرة ، فقد تحطمت السيارات.`,
                  },
               ]

            },

            {
               pages: 7 - 19,
               body: `رونالد ريغان.
توقف ، انتظر لحظة ، دكتور ، هل تخبرني أن والدتي قد حصلت على سخونة بالنسبة لي؟
حسنًا ، يا أماه ، تحدثنا عن هذا ، لن نذهب إلى البحيرة ، فقد تحطمت السيارات.`,
               rate: 5
            },

         ]
      }
   }
}
</script>
