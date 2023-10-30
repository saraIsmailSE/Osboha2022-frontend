<template>
  <ul class="iq-timeline">
    <li v-for="(item, index) in items" :key="index">
      <div class="timeline-dots" :class="'border-' + item.color"></div>
      <div class="d-flex align-items-center justify-content-between">
        <h2 class="mb-1">{{ item.title }}</h2>
        <small class="mt-1" v-html="item.right"></small>
      </div>
      <div class="d-inline-block w-100">
        <p v-html="item.description" style="direction: rtl;"></p>
        <template v-if="item.child.items.length > 0 && item.child.type === 'img'">
          <div class="media-group">
            <a href="#" class="iq-media" v-for="(childItem, childIndex) in item.child.items" :key="childIndex">
              <img :src="childItem" class="img-fluid avatar-40 rounded-circle" alt="img">
            </a>
          </div>
        </template>
        <div class=" row d-flex justify-content-end">
          <small class="col-6  d-flex justify-content-end" v-if="item.child && item.child.type === 'btn'">
            <a href="javascript:void(0);" class="btn btn-primary d-block w-50" @click="routeTo(item.child.route)">
              <span v-if="item.child.text">{{ item.child.text }}</span>
              <span v-else>توثيق</span>
            </a>
          </small>
          <!-- <small class="col-6 w-25" v-if="item.display && item.display.type === 'btn'">
          <a href="javascript:void(0);" class="btn btn-success d-block w-100"
            @click="routeTo(item.display.route)" >
            عرض
          </a>
        </small> -->

        </div>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'TimeLine',
  props: {
    items: { type: Array, default: () => [] }
  },
  methods: {
    routeTo(route) {
      this.$router.push({ name: route.name, params: { book_id: this.$route.id } })
    }
  },

}
</script>
