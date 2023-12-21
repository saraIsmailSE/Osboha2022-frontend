<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <ListView :images="infpraphicsImg" />
    </div>
</template>
<script>
import ListView from '../../components/photoGallery/ListView1.vue';
export default {
    name: 'Book',
    components: { ListView },
    data() {
        return {
            infpraphicsImg: [
                {
                    img: require('../../assets/images/main/reading_list.png'),
                    otherInfo: [
                        {
                            class: 'thumb_up',
                            value: 10
                        },
                        {
                            class: 'forward',
                            value: 1
                        }
                    ]
                },
                {
                    img: require('../../assets/images/main/reading_list.png'),
                    otherInfo: [
                        {
                            class: 'thumb_up',
                            value: 10
                        },
                        {
                            class: 'forward',
                            value: 1
                        }
                    ]
                },
  {
                    img: require('../../assets/images/main/reading_list.png'),
                    otherInfo: [
                        {
                            class: 'thumb_up',
                            value: 10
                        },
                        {
                            class: 'forward',
                            value: 1
                        }
                    ]
                },
                {
                    img: require('../../assets/images/main/reading_list.png'),
                    otherInfo: [
                        {
                            class: 'thumb_up',
                            value: 10
                        },
                        {
                            class: 'forward',
                            value: 1
                        }
                    ]
                },
                  {
                    img: require('../../assets/images/main/reading_list.png'),
                    otherInfo: [
                        {
                            class: 'thumb_up',
                            value: 10
                        },
                        {
                            class: 'forward',
                            value: 1
                        }
                    ]
                },
                {
                    img: require('../../assets/images/main/reading_list.png'),
                    otherInfo: [
                        {
                            class: 'thumb_up',
                            value: 10
                        },
                        {
                            class: 'forward',
                            value: 1
                        }
                    ]
                },
            ]
        }
    }
}
</script>