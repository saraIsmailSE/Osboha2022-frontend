<template>
  <div>
    <iq-card id="post-modal-data" body-class="iq-card iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <h4 class="card-title">منشور جديد</h4>
      </template>
      <template v-slot:body>
        <div class="d-flex align-items-center">
          <div class="user-img">
            <img class="avatar-60 rounded-circle" src="../../../../assets/images/user/user-1.jpg">
          </div>
          <form class="post-text ml-3 w-100">
            <input type="text" placeholder="... ماذا تريد أن تكتب" class="rounded form-control" style="border:none;"
              data-bs-toggle="modal" data-bs-target="#modals" />
          </form>
        </div>
        <hr />
        <ul class=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
          <li class="me-3 mb-md-0 mb-2"><a href="#" class="btn btn-soft-primary"><img
                src="../../../../assets/images/small/07.png" alt="icon" class="img-fluid me-2"> Photo/Video</a></li>
          <li class="me-3 mb-md-0 mb-2"><a href="#" class="btn btn-soft-primary"><img
                src="../../../../assets/images/small/08.png" alt="icon" class="img-fluid me-2"> Tag Friend</a></li>
          <li class="me-3 mb-md-0 mb-2"><a href="#" class="btn btn-soft-primary"><img
                src="../../../../assets/images/small/09.png" alt="icon" class="img-fluid me-2"> Feeling/Activity</a>
          </li>
          <li>
            <button class="btn btn-soft-primary">
              <div class="card-header-toolbar d-flex align-items-center">
                <div class="dropdown">
                  <div class="dropdown-toggle" id="post-option" data-bs-toggle="dropdown">
                    <span class="material-symbols-outlined">
                      more_horiz
                    </span>
                  </div>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="post-option" style="">
                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Check in</a>
                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Live Video</a>
                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Gif</a>
                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Watch
                      Party</a>
                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Play with
                      Friend</a>
                  </div>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </template>
      <modal id="modals" dialogClass="modal-fullscreen-sm-down" tabindex="-1" title="Create Post"
        aria-labelledby="modalsLabel" aria-hidden="true">
        <model-header>
          <h5 class="modal-title" id="modalsLabel">منشور جديد</h5>
          <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal">
            <span class="material-symbols-outlined">close</span>
          </a>
        </model-header>
        <model-body>
          <div class="d-flex align-items-center">
            <div class="user-img">
              <img src="@/assets/images/user/1.jpg" alt="userimg" class="avatar-60 rounded-circle img-fluid">
            </div>
            <form class="post-text ms-3 w-100" action="javascript:void();">
              <input type="text" class="form-control rounded" placeholder="Write something here..."
                style="border:none;">
            </form>
          </div>
          <hr>
          <ul class="d-flex flex-wrap align-items-center list-inline m-0 p-0">
            <li class="col-md-6 mb-3">
              <div class="bg-soft-primary rounded p-2 pointer me-3"><a href="#"></a><img
                  src="@/assets/images/small/07.png" alt="icon" class="img-fluid"> اضافة صورة</div>
            </li>
            <li class="col-md-6 mb-3">
              <div class="bg-soft-primary rounded p-2 pointer me-3"><a href="#"></a><img
                  src="@/assets/images/small/08.png" alt="icon" class="img-fluid"> إشارة لصديق </div>
            </li>
            
            <li class="col-md-6 mb-3">
              <div class="bg-soft-primary rounded p-2 pointer me-3"><a href="#"></a><img
                  src="@/assets/images/small/08.png" alt="icon" class="img-fluid"> add poll</div>
            </li>
          </ul>
          <hr>

          <button class="btn btn-primary d-block w-100 mt-3" @click="addNewPost(post)">نشـــر</button>
        </model-body>
      </modal>
    </iq-card>
  </div>
</template>
<script>
import Post from '../../../../Model/Post'
export default {
  name: 'AddSocialPost',
  data() {
    return {
      post: new Post(),
      tab: [
        {
          icon: require('../../../../assets/images/small/07.png'),
          name: ' Photo/Video'
        },
        {
          icon: require('../../../../assets/images/small/08.png'),
          name: ' Tag Friend'
        }
      ]
    }
  },
  methods: {
    addNewPost(post) {
      this.$emit('addPost', post)
      this.post = new Post()
      this.$bvModal.hide('modal1')
    },
    resetPost() {
      this.post = new Post()
    },
    previewImage: function (event) {
      const files = event.target.files
      Object.keys(files).forEach(i => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.post.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>
