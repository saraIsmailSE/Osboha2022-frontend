<template>
  <div class="row">
    <div class="col-sm-12">
      <iq-card body-class="chat-page p-0">
        <template v-slot:body>
          <div class="chat-data-block">
            <div class="row">
              <div class="chat-data-left scroller col-lg-3">
                <div class="chat-search pt-3 ps-3">
                  <ToggleButton toggleShow="#user-detail-popup">
                    <template v-slot:media>
                      <img :src="auth.image" alt="chat-user" class="avatar-60 ">
                    </template>
                    <template v-slot:body>
                      <h5 class="mb-0">{{ auth.name }}</h5>
                    </template>
                  </ToggleButton>
                  <ToggleContent id="user-detail-popup" body-class="text-left">
                    <template v-slot:media>
                      <img :src="auth.image" alt="avatar">
                    </template>
                    <template v-slot:title>
                      <div class="user-name mt-4">
                        <h4>{{ auth.name }}</h4>
                      </div>
                      <div class="user-desc">
                      </div>
                    </template>
                  </ToggleContent>


                  <div class="chat-searchbar mt-4">
                    <div class="form-group chat-search-data m-0">
                      <input type="text" class="form-control round" id="chat-search" placeholder="Search"
                        v-model="search">
                      <i class="material-symbols-outlined">
                        search
                      </i>
                    </div>
                  </div>
                </div>


                <div class="chat-sidebar-channel scroller mt-4 ps-3">
                  <h5>ROOMS</h5>


                  <tab-nav :pills="true" :vertical="true" class="iq-chat-ui" id="chat-list-data">
                    <template v-for="(item, index) in privateList" :key="index">
                      <tab-nav-items :id="`v-pills-${item.id}`" href="#v-pills-home"
                        :ariaControls="`v-pills-${item.id}`" role="tab" @click="active = false">
                        <template v-slot:title>
                          <ChatItem :item="item" />
                        </template>
                      </tab-nav-items>
                    </template>
                  </tab-nav>




                  <h5>قائمة الرسائل</h5>
                  <tab-nav :pills="true" :vertical="true" class="iq-chat-ui" id="chat-list-data">
                    <template v-for="(item, index) in publicList" :key="index">
                      <tab-nav-items :id="`v-pills-${item.id}`" href="#v-pills-home"
                        :ariaControls="`v-pills-${item.id}`" role="tab" @click="active = false">
                        <template v-slot:title>
                          <ChatItem :item="item" />
                        </template>
                      </tab-nav-items>
                    </template>
                  </tab-nav>
                </div>
              </div>



              <div class="col-lg-9 chat-data p-0 chat-data-right"
                :style="`background: url(${require('../../assets/images/chatBG.png')}) no-repeat scroll center center;background-size: cover;`">
                <tab-content id="v-pills-tabContent">
                  <tab-content-item :active="active" id="v-pills-default" aria-labelled-by="v-pills-default">
                    <div class="chat-start">
                      <span
                        class="text-primary avatar-100 rounded-pill bg-white d-flex align-items-center justify-content-center">
                        <i class="material-symbols-outlined md-42" style="font-size:3rem;">sms</i>
                      </span>
                      <button id="chat-start" class="btn bg-white mt-3">Start
                        Conversation!</button>
                    </div>
                  </tab-content-item>
                  <tab-content-item id="v-pills-home" aria-labelled-by="v-pills-default">
                    <div class="chat-head">
                      <header class="d-flex justify-content-between align-items-center bg-white pt-3 pe-3 pb-3">
                        <ToggleButton :mini-toggle="true" :close-button="false" toggleShow="#chat-user-detail-popup"
                          mediaClass="chat-user-profile">
                          <template v-slot:media>
                            <img :src="checkUser(5, 'image')" alt="avatar" class="avatar-50 ">
                            <span class="avatar-status"><i class="ri-checkbox-blank-circle-fill text-success" /></span>
                          </template>
                          <template v-slot:body>
                            <h5 class="mb-0">{{ checkUser(5, 'name') }}</h5>
                          </template>
                        </ToggleButton>
                      </header>
                    </div>
                    <!-- chat content -->
                    <ListMessages :messages="messages" :auth="auth" />
                  </tab-content-item>
                </tab-content>
              </div>
            </div>
          </div>
        </template>
      </iq-card>
    </div>
  </div>
</template>
<script>
import { socialvue } from '../../config/pluginInit'
import ChatItem from '../../components/custom/Chat/ChatItem'
import ToggleButton from '../../components/custom/Chat/ToggleButton'
import ToggleContent from '../../components/custom/Chat/ToggleContent'
import ListMessages from '../../components/custom/Chat/ListMessages.vue'

export default {
  name: 'Index',
  components: { ChatItem, ToggleButton, ToggleContent, ListMessages },
  mounted() {
    socialvue.index()
  },
  computed: {
    filteredList() {
      return this.usersList.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    publicList() {
      return this.usersList.filter(item => {
        return !item.room_id ? item.name.toLowerCase().includes(this.search.toLowerCase()) : false
      })
    },
    privateList() {
      return this.usersList.filter(item => {
        return item.room_id ? item.name.toLowerCase().includes(this.search.toLowerCase()) : false
      })
    }
  },
  data() {
    return {
      search: '',
      auth:
      {
        id: 5,
        name: 'مستخدم أصبوحي',
        image: require('../../assets/images/150x150.jpg')

      },
      usersList: [
        {
          id: 1,
          name: 'Team Discussions',
          room_id: 1,
          image: require('../../assets/images/150x150.jpg')
        },
        {
          id: 2,
          name: 'Designer',
          image: require('../../assets/images/150x150-3.jpg')
        },
        {
          id: 3,
          name: 'Announcement',
          image: require('../../assets/images/150x150-2.jpg')
        },
        {
          id: 4,
          name: 'Developer',
          image: require('../../assets/images/150x150.jpg')
        },
        {
          id: 5,
          name: 'Testing Team',
          image:require('../../assets/images/150x150.jpg')
        },
      ],
      messages: [
        {
          body: 'How can we help? We\'re here for you! 😄',
          sender: 
            {
              id: 5,
              name: 'مستخدم أصبوحي',
              image: '150x150.jpg'
            }
,
          receiver: {
            id: 3,
            name: 'مستخدم أصبوحي',
            image: '150x150.jpg'
          },
          time: '6:45'
        },
        {
          body: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?🤔',
          sender: {
            id: 3,
            name: 'مستخدم أصبوحي',
            image: '150x150.jpg'
          },
          receiver: {
            id: 5,
            name: 'مستخدم أصبوحي',
            image: '150x150.jpg'
          },
          time: '6:45'
        },
        {
          body: 'Absolutely!\n' + 'SocialV Dashboard is the responsive bootstrap 4 admin template.',
          sender: {
            id: 5,
            name: 'مستخدم أصبوحي',
            image: '150x150.jpg'
          },
          receiver: {
            id: 3,
            name: 'مستخدم أصبوحي',
            image: '150x150.jpg'
          },
          time: '6:45'
        },
        {
          body: 'Looks clean and fresh UI.',
          sender: {
              id: 5,
              name: 'مستخدم أصبوحي',
              image: '150x150.jpg'
            },
          receiver: {
              id: 3,
              name: 'مستخدم أصبوحي',
              image: '150x150.jpg'
            },
          time: '6:45'
        },
        {
          body: 'I will purchase it for sure. 😄',
          sender: {
              id: 3,
              name: 'مستخدم أصبوحي',
              image: '150x150.jpg'
            },
          receiver: {
              id: 5,
              name: 'مستخدم أصبوحي',
              image: '150x150.jpg'
            },
          time: '6:45'
        },
        {
          body: 'Okay Thanks...',
          sender: {
              id: 5,
              name: 'مستخدم أصبوحي',
              image: '150x150.jpg'
            },
          receiver:{
              id: 3,
              name: 'مستخدم أصبوحي',
              image: '150x150.jpg'
            },
          time: '6:45'
        },
      ]


    }
  },

  methods: {
    checkUser(item, type) {
      const user = this.usersList.find(user => user.id === item)
      let final
      if (user !== undefined) {
        switch (type) {
          case 'name':
            final = user.name
            break
          case 'image':
            final = user.image
            break
          case 'role':
            final = user.role
            break
        }
        return final
      }
      return 'user-5.jpg'
    }
  }
}
</script>
<style>
.remove-toggle::after {
  content: unset;
}
</style>
