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
            id: '1.jpg',
            title: 'الاقتصاد في درس واحد',
            text: 'هنري هازليت',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '2.jpg',
            title: 'إلى من ضاقت عليه نفسه',
            text: 'يحيى اليحيى',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '3.jpg',
            title: 'أولادنا بين التبعية والاستقلال',
            text: 'عبد العزيز الخضراء',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '4.jpg',
            title: 'كيف تفوز في مشاكل البكاء',
            text: 'سينيتا ويثام',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '5.jpg',
            title: 'لماذا نكتب',
            text: 'ميرديث ماران',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '6.jpg',
            title: 'اسمي أحمر',
            text: 'اورهان باموق',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '5.jpg',
            title: 'لماذا نكتب',
            text: 'ميرديث ماران',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
        ]
    }
  }
}
</script>