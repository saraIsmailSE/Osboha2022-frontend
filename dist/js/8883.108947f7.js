"use strict";(self["webpackChunkOsboha180"]=self["webpackChunkOsboha180"]||[]).push([[8883],{52818:function(t,e,s){s.r(e),s.d(e,{default:function(){return x}});var o=s(66252),n=s(3577);const a={class:"row"},c={class:"col-lg-8 row m-0 p-0"},r={key:0,class:"d-flex align-items-center justify-content-center"},i={class:"me-2"},m={key:1,class:"col-sm-12 text-center"},d=["src"],l={class:"col-sm-12"},u={class:"card card-block card-stretch card-height blog user-comment"},p=(0,o._)("div",{class:"card-header d-flex justify-content-between"},[(0,o._)("div",{class:"header-title"},[(0,o._)("h4",{class:"card-title"},"التعليقات")])],-1),h={class:"card-body",ref:"commentsSectionBody"},g={class:"row"};function f(t,e,f,y,C,_){const w=(0,o.up)("font-awesome-icon"),v=(0,o.up)("Post"),k=(0,o.up)("LazyLoadedComments"),b=(0,o.up)("CreateComment");return(0,o.wg)(),(0,o.iD)("div",a,[(0,o._)("div",c,[C.emptyMessage?((0,o.wg)(),(0,o.iD)("div",r,[(0,o._)("div",i,[(0,o.Wm)(w,{icon:["fas","circle-exclamation"],size:"xl"})]),(0,o._)("div",null,(0,n.zw)(C.emptyMessage),1)])):C.loading?((0,o.wg)(),(0,o.iD)("div",m,[(0,o._)("img",{src:s(79885),alt:"loader",style:{height:"100px"}},null,8,d)])):((0,o.wg)(),(0,o.iD)(o.HY,{key:2},[(0,o.Wm)(v,{post:C.post},null,8,["post"]),(0,o._)("div",l,[(0,o._)("div",u,[p,(0,o._)("div",h,[(0,o._)("div",g,[C.post?((0,o.wg)(),(0,o.j4)(k,{key:0,post:C.post,userId:t.$route.params.user_id?parseInt(t.$route.params.user_id):null,loadOnCreate:!0,ref:"lazyLoadedCommentsRef"},null,8,["post","userId"])):(0,o.kq)("",!0),C.post?.allow_comments?((0,o.wg)(),(0,o.j4)(b,{key:1,ref:"SinglePostCreateComment",type:"comment",class:"flex-grow-1",post_id:C.post.id,onAddComment:_.addComment},null,8,["post_id","onAddComment"])):(0,o.kq)("",!0)])],512)])])],64))])])}var y=s(8417),C=s(10525),_=s(96648),w=s(87026),v=s(8209),k={name:"PostView",components:{Post:C.Z,CreateComment:_.Z,LazyLoadedComments:w.Z},provide(){return{focusComment:this.focusComment,incrementCommentsCount:()=>{this.post.comments_count++},decrementCommentsCount:()=>{this.post.comments_count--},reactToPost:this.reactToPost}},data(){return{post:null,loading:!1,emptyMessage:""}},async created(){await this.getPost()},methods:{async getPost(){if(!this.loading){this.loading=!0;try{const t=await y.Z.getPostById(this.$route.params.post_id);this.post=t.data}catch(t){v.Z.toggleToast("حدث خطأ أثناء تحميل المنشور, الرجاء المحاولة مرة أخرى","error")}finally{this.loading=!1}}},focusComment(){this.post.allow_comments?(this.$refs.commentsSectionBody.scrollTop=this.$refs.commentsSectionBody.scrollHeight,this.$refs.SinglePostCreateComment.focusInput()):v.Z.toggleToast("لا يمكنك التعليق على هذا المنشور الآن","error")},addComment(t,e){this.$refs.lazyLoadedCommentsRef.addComment(t,e),e||this.$nextTick((()=>{window.scrollTo(0,document.body.scrollHeight)}))},reactToPost(t,e){e?(this.post.reactions_count++,this.post.reacted_by_user=!0):(this.post.reactions_count--,this.post.reacted_by_user=!1)}}},b=s(83744);const P=(0,b.Z)(k,[["render",f]]);var x=P}}]);
//# sourceMappingURL=8883.108947f7.js.map