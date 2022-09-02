<template>
   <div class="row">
      <div class="col-lg-12">
         <div class="card card-block card-stretch card-height blog blog-detail">
            <div class="card-body">
               <div class="image-block">
                  <img src="@/assets/images/blog/01.jpg" class="img-fluid rounded w-100" alt="blog-img">
               </div>
               <div class="blog-description mt-3 text-center">
                  <h2 class="mb-3 pb-3 border-bottom text-center">Book Title</h2>
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
                  <p class="text-center">Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                     quae ab illo inventore
                     veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                     voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                     voluptatem sequi nesciunt.</p>
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
                body: `لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
  
  أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
  
  أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس
  
  أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
  
  نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا
  
  كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم.`,
                rate: 3,
                comments: [
                   {
                      author: 'USER',
                      author_image: '03.jpg',
                      created_at: '12-06-2019',
                      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
                   },
                   {
                      image: 'profile-bg9.jpg',
                      author: 'USER',
                      author_image: '03.jpg',
                      created_at: '12-06-2019',
                      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
                   },
                ]
 
             },
 
             {
                pages: 7 - 19,
                body: `لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
  
  أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
  
  أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس
  
  أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
  
  نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا
  
  كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم.`,
                rate: 5
             },
 
          ]
       }
    }
 }
 </script>
 