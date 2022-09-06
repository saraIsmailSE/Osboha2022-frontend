<template>
    <div class="row">
      <div class="col-lg-3">
        <ProjectList
          :project-list="projectList"
          :categoryList="categories"
          :selected-category="selectedCategory"
          :selected-project="selectedProject"/>
      </div>
      <div class="col-lg-9">
        <TaskList :task-list="taskList" :project="selectedProject" :category="selectedCategory"/>
      </div>
    </div>
</template>
<script>
// import { socialvue } from '../../../config/pluginInit'
import ProjectList from './ProjectList.vue'
import TaskList from './TaskList'
import { mapGetters } from 'vuex'
import Ambassadros from '../../../../store/Todo'
export default {
  name: 'AmbassadrosListing',
  components: { ProjectList, TaskList },
  data(){
    return{
      categories: [
    {
      id: 1,
      name: 'انجاز كامل',
      color: 'success',
      href:"#",
      number:20
    },
    {
      id: 2,
      name: 'انجاز ناقص',
      color: 'primary',
      href:"#",
      number:7
    },
    {
      id: 3,
      name: 'انجاز صفر',
      color: 'danger',
      href:"#",
      number:3
    },
  ],
    }
  },
  mounted () {
    // socialvue.index()
  },
  beforeMount () {
    this.$store.registerModule('Ambassadros', Ambassadros)
  },
  beforeUnmount () {
    this.$store.unregisterModule('Ambassadros')
  },
  computed: {
    ...mapGetters({
      taskList: 'Ambassadros/taskState',
      projectList: 'Ambassadros/projectState',
      categoryList: 'Ambassadros/categoryState',
      selectedCategory: 'Ambassadros/selectedCategoryState',
      selectedProject: 'Ambassadros/selectedProjectState'
    })
  }
}
</script>
<style>
</style>
