<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap">
                <div class="group-info d-flex align-items-center">
                    <div class="me-3">
                        <img class="rounded-circle img-fluid avatar-100" src="@/assets/images/page-img/gi-1.jpg" alt="">
                    </div>
                    <div class="info">
                        <h4>{{groupInfo.name}}</h4>
                        <p class="mb-0"><i class="ri-lock-fill pe-2"></i>{{groupInfo.type}} . {{groupInfo.members}} سفير</p>
                    </div>
                </div>
                <listMembers :members="members"/>
            </div>
        </div>
        <div class="col-lg-8">
            <div id="post-modal-data" class="card">
                  <!-- ##### <AddPost /> ##### -->
                  <AddPost @addPost="addPost"></AddPost>
                  <!-- ##### <AddPost /> ##### -->
            </div>
            <div class="card">
                <div class="card-body">
                     <!-- ##### LIST POSTS ##### -->
                  <Post v-for="post in posts" :key="post.id" :post="post" />
                  <!-- ##### END LIST POSTS ##### -->

                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <div class="header-title">
                        <h4 class="card-title">عن المجموعة</h4>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-inline p-0 m-0">
                        <li class="mb-3">
                            <p class="mb-0">{{groupInfo.name}}</p>
                        </li>
                        <li class="mb-3">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <i class="material-symbols-outlined">group</i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                <h6>قائد المجموعة</h6>
                                <p class="mb-0">{{groupInfo.leader}}</p>
                                </div>
                            </div>
                        </li>
                        <li class="mb-3">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <i class="material-symbols-outlined">group</i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                <h6>مراقب المجموعة</h6>
                                <p class="mb-0">{{groupInfo.supervispr}}</p>
                                </div>
                            </div>
                        </li>
                        
                        <li class="mb-3">
                        <div class="d-flex">
                            <div class="flex-shrink-0">
                                <i class="material-symbols-outlined">trending_up</i>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6>{{groupInfo.avg}}</h6>
                                <p class="mb-0">معدل الأسبوع الرابع</p>
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <div class="header-title">
                        <h4 class="card-title">الوصول السريع</h4>
                    </div>
                </div>
                <div class="card-body">
                    <router-link to="/" class="btn btn-primary d-block mt-3">احصائيات المجموعة </router-link>
                    <router-link to="/" class="btn btn-primary d-block mt-3">كتب يقرأوها الأعضاء  </router-link>
                    <router-link to="/" class="btn btn-primary d-block mt-3">الاجازات</router-link>
                    <router-link to="/" class="btn btn-primary d-block mt-3">التحديات</router-link>
                    <router-link to="/ambassadors-reading" class="btn btn-primary d-block mt-3">انجاز السفراء </router-link>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import listMembers from '../../../components/group/members.vue'
    import Post from '../../../components/post/Post.vue'
import AddPost from '../../../components/post/AddPost'


export default {
    
  name: 'Group-detail',
  components: { 
    listMembers,
    Post,
    AddPost,
 },
  data () {
    return {
      header2: [
        require('../../../assets/images/user/05.jpg'),
        require('../../../assets/images/user/06.jpg'),
        require('../../../assets/images/user/07.jpg'),
        require('../../../assets/images/user/08.jpg'),
        require('../../../assets/images/user/09.jpg'),
        require('../../../assets/images/user/10.jpg'),
        require('../../../assets/images/user/11.jpg'),
        require('../../../assets/images/user/12.jpg')
      ],
      groupInfo: 
        {
          name: "مجموعة القراءة",
          members: 30,
          type:"مجموعة المتابعة",
          leader: "Leader 1",
          supervispr:"Supervisor 1", 
          avg:80.54,

        }
      ,
      header1: [
        {
          b1: 'Invite'
        }
      ],
      members:[
        {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
      {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
      {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
      {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
      {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
      {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
      {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
      {
        name:"group user",
        image:"03.jpg",
        profile:"profile"
      },
    ],
    posts: [
        {
          id: 1,
          images: ['1900-475.jpg'],
          author: 'USER',
          author_image: '60x60.jpg',
          created_at: '12-06-2019',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
          comments: [
            {
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              image: '1900-475.jpg',
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
          ]
        },
        {
          id: 2,
          author: 'USER 2',
          author_image: '60x60.jpg',
          created_at: '12-06-2019',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
          comments: [
            {
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              image: ['1900-475.jpg'],
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              image: 'profile-bg9.jpg',
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, aucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
          ]
        },
        {
          id: 3,
          images: ['710-950.jpg', '710-450.jpg'],
          author: 'USER 3',
          author_image: '60x60.jpg',
          created_at: '12-06-2019',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',

        },
      ],
    }
  }
}
</script>
