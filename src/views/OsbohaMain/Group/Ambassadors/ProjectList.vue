<template>
  <iq-card>
    <template v-slot:body>
      <div class="iq-todo-page">
        <form class="position-relative">
          <div class="form-group mb-0">
            <input type="text" class="form-control todo-search" id="exampleInputEmail002" placeholder="ابحث عن سفير">
            <a class="search-link" href="#"><span class="material-symbols-outlined lh-1">
                search
              </span></a>
          </div>
        </form>
            <ul  class="todo-task-list p-0 m-0">
              <li v-for="(category, index1) in categoryList" :key="index1" @click="selectCategory(category)" :class="`${category.id === selectedCategory.id ? 'active' : ''}`">
                <a class="d-flex align-items-center justify-content-between" :href="category.href">
                  <div class="d-flex">
                    <i :class="`material-symbols-outlined text-${category.color}`">fiber_manual_record</i>
                      {{ category.name }}
                    </div>
                      <button class="bg-dark text-white float-end rounded">{{category.number}}</button>
                </a>
              </li>
            </ul>
      </div>
    </template>
  </iq-card>
</template>
<script>
export default {
  name: 'ProjectList',
  props: [
    'selectedProject',
    'selectedCategory',
    'projectList',
    'categoryList'
  ],
  data() {
    return {
      search: '',
      project: {
        id: 0,
        project_name: ''
      }
    }
  },
  methods: {
    saveProject() {
      this.$store.dispatch('Todo/addProjectAction', this.project)
      this.$bvModal.hide('add_project')
    },
    selectProject(project) {
      this.$store.dispatch('Todo/selectedAction', { data: project, type: 'project' })
      this.search = ''
    },
    selectCategory(category) {
      this.$store.dispatch('Todo/selectedAction', { data: category, type: 'category' })
      this.search = ''
    }
  },
  computed: {
    filteredList() {
      return this.projectList.filter(item => {
        return item.project_name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
  }
}
</script>
