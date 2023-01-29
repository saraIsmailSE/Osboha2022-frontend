<template>
  <div class="container">
    <div class="row mb-3">
      <div class="container">
        <div class="row d-flex justify-content-center mt-5">
          <div class="col-12">
            <div class="card">
              <div class="card-title">
                <h3 class="font-weight-bold text-center">البحث عن الكتب</h3>
              </div>
              <hr />
              <div class="container row d-flex justify-content-center m-auto">
                <div
                  class="col-lg-1 col-md-1 col-sm-2 text-center"
                  v-for="section in sections"
                  :key="section.section_id"
                  v-on:click="filterResults(section.section_id)"
                >
                  <span
                    class="btn button-60 mr-2 mt-1"
                    :class="checkActive(section.active)"
                    >{{ section.section }}</span
                  >
                </div>

                <!-- <div class="col-lg-1 col-md-1 col-sm-2 text-center" >
                  <span class="btn button-60 mr-2 mt-1">الكل</span>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-2 text-center">
                  <span class="btn button-60 mr-2 mt-1">بسيط</span>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-2 text-center">
                  <span class="btn button-60 mr-2 mt-1">وسط</span>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-2 text-center">
                  <span class="btn button-60 mr-2 mt-1 active"> متقدم</span>
                </div>

                <div class="col-lg-1 col-md-1 col-sm-2 text-center">
                  <span class="btn button-60 mr-2 mt-1"> عربي </span>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-2 text-center">
                  <span class="btn button-60 mr-2 mt-1"> انجليزي </span>
                </div> -->
              </div>

              <div class="mt-3 inputs">
                <i class="fa fa-search"></i>
                <input
                  type="text"
                  class="form-control"
                  placeholder=" ... ابحث عن كتاب"
                  v-model.trim="searchModel"
                  v-on:keyup="searchBookByName(searchModel)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-4">
        <button
          class="button-53"
          role="button"
          style="background-color: #77d792"
          v-on:click="filterResults(recentAddedBooks)"
        >
          مضاف حديثًا
        </button>
      </div>
      <div class="col-4">
        <button
          class="button-53"
          role="button"
          style="background-color: #0a6681"
          v-on:click="filterResults(mostReadableBooks)"
        >
          الأكثر قراءة
        </button>
      </div>
      <div class="col-4">
        <button
          class="button-53 animated-btn"
          role="button"
          style="background-color: #f9c93e; color: black"
          v-on:click="filterResults(randomBook)"
        >
          اختر لي
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Books Filter",
  components: {},
  props: {
    sections: { type: Object },
    toggleActiveFilter: { type: Function },
    searchBookByName: { type: Function },
    filterBooks: { type: Function },
  },
  data() {
    return {
      searchModel: "",
    };
  },
  methods: {
    checkActive(activeStatus) {
      return activeStatus ? "active" : "";
    },
    filterResults(index){
      this.searchModel = ''
      this.filterBooks(index)
    }
  },
  computed: {
    
    recentAddedBooks(){return this.sections.length + 1},
      mostReadableBooks(){ return this.recentAddedBooks + 1},
      randomBook(){ return this.mostReadableBooks + 1},}
};
</script>

<style lang="scss" scoped>
/* CSS */

.btn {
  border-radius: 25px;
}

.new {
  font-size: 12px;
}

.card {
  padding: 20px;
  border: none;
}

.active {
  background: #192f36 !important;
  color: #fff !important;
  font-weight: 700;
}

.inputs {
  position: relative;
}

.form-control {
  text-indent: 15px;
  border: none;
  height: 45px;
  border-radius: 0px;
  border-bottom: 1px solid #eee;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #eee;
  outline: 0;
  box-shadow: none;
  border-bottom: 1px solid blue;
}

.form-control:focus {
  color: blue;
}

.inputs i {
  position: absolute;
  top: 14px;
  left: 4px;
  color: #b8b9bc;
}

.button-60 {
  align-items: center;
  appearance: none;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 0.375em;
  box-shadow: none;
  box-sizing: border-box;
  color: #363636;
  cursor: pointer;
  display: inline-flex;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-size: 13px;
  height: 2.5em;
  justify-content: center;
  line-height: 1.5;
  padding: calc(0.5em - 1px) 1em;
  position: relative;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
}

.button-60:active {
  border-color: #4a4a4a;
  outline: 0;
}

.button-60:focus {
  border-color: #485fc7;
  outline: 0;
}

.button-60:hover {
  border-color: #b5b5b5;
}

.button-60:focus:not(:active) {
  box-shadow: rgba(72, 95, 199, 0.25) 0 0 0 0.125em;
}

.button-53 {
  background-color: #9fbed4;
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: #ffff;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-53:focus {
  outline: 0;
}

.button-53:after {
  content: "";
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

.button-53:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  .button-53 {
    padding: 0.75rem 3rem;
    font-size: 1.25rem;
  }
}

.animated-btn {
  animation: fadeIn 1.5s infinite alternate;
}

@keyframes fadeIn {
  from {
    opacity: 20%;
  }
}
</style>
