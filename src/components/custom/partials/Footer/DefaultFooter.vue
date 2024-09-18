<template>
   <footer class="iq-footer bg-white w-100">
      <div class="container-fluid">
         <div class="row">
            <div class="col-12 d-flex justify-content-center">
               <h5 class="font-weight-bold text-danger">

                  <a href="https://www.messenger.com/t/117840717971244/" target="_blank" class="text-danger">
                     <span class="material-symbols-outlined">
                        support_agent
                     </span>
                     راسلنا لمساعدتك
                  </a>
               </h5>
            </div>

         </div>
         <div class="row">
            <div class="d-flex justify-content-center mt-3">
               <p> &copy; {{ currentDate }} OSBOHA180 -
                  <router-link :to="{
                     name: 'terms-and-conditions',
                  }">
                     <span> تُطبق الشروط والاحكام</span>
                  </router-link>

               </p>
            </div>
         </div>
      </div>
   </footer>
</template>
<script>
export default {
   name: 'DefaultFooter',
   data() {
      return {
         currentDate: new Date().getFullYear(),
      }
   }
}

</script>