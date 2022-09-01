<template>
  <div class="d-grid gap-3 d-grid-template-1fr-19">
    <BookCard v-for="bookInfo in bookInfos" :key="bookInfo.id" :cardInfo="bookInfo" />
  </div>
</template>
<script>
import BookCard from '../../components/book/BookCard.vue';
export default {
  name: 'Book',
  components: { BookCard },
  data() {
    return {
      bookInfos:
        [
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
          {
            backgroundImg: 'profile-bg.jpg',
            groupImg: '150x150.jpg',
            title: 'BOOK Name',
            text: 'Lorem Ipsum',
            extraInfo: [
              {
                info: 'نوع الكتاب',
                value: 'منهجي'
              },
              {
                info: 'فئة الكتاب',
                value: 'ثقافي'
              },
              {
                info: 'عدد الصفحات',
                value: '250'
              }
            ],
          },
        ]
    }
  }
}
</script>