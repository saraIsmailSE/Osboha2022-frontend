<template>
    <div class="chat-content scroller">
        <template v-for="(message, index) in messages" :key="index">
            <div class="chat d-flex other-user" v-if="message.sender.id == auth.id">
                <div class="chat-user">
                    <a class="avatar m-0">
                        <!-- <img :src="resolve_img_url(message.sender.image)" alt="avatar" class="avatar-35 " /> -->
                        <img src="@/assets/images/avatar/avatar-04.jpg" alt="profile-img" class="avatar-130 img-fluid">

                    </a>
                    <span class="chat-time mt-1">{{ message.time }}</span>
                </div>
                <div class="chat-detail">
                    <div class="chat-message">
                        <p>{{ message.body }}</p>
                    </div>
                </div>
            </div>
            <div class="chat chat-left" :key="index" v-else>
                <div class="chat-user">
                    <a class="avatar m-0">
                        <!-- <img :src="resolve_img_url(message.sender.image)" alt="avatar" class="avatar-35 " /> -->
                        <img src="@/assets/images/avatar/avatar-03.jpg" alt="profile-img" class="avatar-130 img-fluid">

                    </a>
                    <span class="chat-time mt-1">{{ message.time }}</span>
                </div>
                <div class="chat-detail">
                    <div class="chat-message">
                        <p>{{ message.body }}</p>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <!-- chat-footer -->

    <div class="chat-footer p-3 bg-white">
        <form class="d-flex align-items-center" action="javascript:void(0);">
            <div class="chat-attagement d-flex">
                <a href="#" class="d-flex align-items-center"><i class="material-symbols-outlined pe-3"
                        aria-hidden="true">sentiment_satisfied</i></a>
                <a href="#" class="d-flex align-items-center"><i class="material-symbols-outlined pe-3"
                        aria-hidden="true">attach_file</i></a>
            </div>
            <input type="text" class="form-control me-3" placeholder="Type your message">
            <button type="submit" class="btn btn-primary d-flex align-items-center p-2"><i
                    class="far fa-paper-plane"></i><span class="d-none d-lg-block ms-1">ارسال</span></button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'ListMessages',
    props: {
        messages: { type: Object },
        auth: { type: Object }
    },
    methods: {
    resolve_img_url: function (path) {
            let images = require.context('../../../assets/images', false, /\.png$|\.jpg$/)
            return images("./" + path)
        }
  }
}
</script>
