"use strict";(self["webpackChunkOsboha180"]=self["webpackChunkOsboha180"]||[]).push([[5371],{96444:function(e,t,s){var i=s(24150);class o{async getAllFriends(e){try{const t=await i.hi.get(`friends/user/${e}`);return t.data.data}catch(t){return t}}async getFriendsRequests(){try{const e=await i.hi.get("/friends/un-accepted");return e.data.data}catch(e){return e}}async create(e){try{return await i.hi.post("/friends/create",{friend_id:e})}catch(t){return t}}async getFriendshipById(e){try{const t=await i.hi.post("/friends/show",{friendship_id:e});return t.data}catch(t){return t}}async accept(e){try{const t=await i.hi.get(`/friends/accept/${e}`);return t.data}catch(t){return t}}async delete(e,t){const s=new FormData;s.append("user_id",e),s.append("friend_id",t);try{const e=await i.hi.post("/friends/delete",s);return e.data}catch(o){return o}}}t["Z"]=new o},91130:function(e,t,s){s.d(t,{Z:function(){return m}});var i=s(66252);const o={class:"preview-images"},n=["onClick"],l=(0,i._)("span",null," x ",-1),a=[l],r=["src"],d=["src"];function c(e,t,s,l,c,p){return(0,i.wg)(),(0,i.iD)("div",o,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(c.previewUrls,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{class:"image-container",key:e.url},[(0,i._)("div",{class:"delete-image",onClick:e=>p.removeMedia(t)},a,8,n),e.type.includes("image")?((0,i.wg)(),(0,i.iD)("img",{key:0,src:e.url},null,8,r)):((0,i.wg)(),(0,i.iD)("video",{key:1,src:e.url,autoplay:""},null,8,d))])))),128))])}var p={name:"ImagePreviewer",props:{media:{type:[Array,FileList],default:()=>[]}},emits:["remove-media"],data(){return{previewUrls:[]}},methods:{previewMedia(){this.previewUrls=[];const e=[...this.media];e.forEach((e=>{const t=new FileReader;t.onload=()=>{this.previewUrls.push({url:t.result,type:e.type})},t.readAsDataURL(e)}))},removeMedia(e){this.previewUrls.splice(e,1),this.$emit("remove-media",e)},clearMedia(){this.previewUrls=[]}},mounted(){this.previewMedia()},watch:{media(){this.previewMedia()}}},h=s(83744);const u=(0,h.Z)(p,[["render",c]]);var m=u},96060:function(e,t,s){s.d(t,{Z:function(){return v}});var i=s(66252),o=s(3577);const n={ref:"listContainer"},l={key:0,class:"d-flex align-items-center justify-content-center"},a={class:"me-2"},r={key:1,class:"col-sm-12 text-center"},d=["src"];function c(e,t,c,p,h,u){const m=(0,i.up)("font-awesome-icon"),f=(0,i.up)("Post");return(0,i.wg)(),(0,i.iD)("div",n,[h.emptyMessage?((0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("div",a,[(0,i.Wm)(m,{icon:["fas","circle-exclamation"],size:"xl"})]),(0,i._)("div",null,(0,o.zw)(h.emptyMessage),1)])):(0,i.kq)("",!0),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(h.announcements,(e=>((0,i.wg)(),(0,i.j4)(f,{key:e.id,post:e,showPin:c.showPin},null,8,["post","showPin"])))),128)),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(h.posts,(e=>((0,i.wg)(),(0,i.j4)(f,{key:e.id,post:e,showPin:c.showPin},null,8,["post","showPin"])))),128)),h.loading?((0,i.wg)(),(0,i.iD)("div",r,[(0,i._)("img",{src:s(79885),alt:"loader",style:{height:"100px"}},null,8,d)])):(0,i.kq)("",!0)],512)}var p=s(10525),h=s(8417),u=(s(49579),s(8209)),m=s(9669),f=s.n(m),g={name:"LazyLoadedPosts",components:{Post:p.Z},props:{timeline_id:{type:Number,default:null},isMain:{type:Boolean,default:!1},type:{type:String,default:null},showPin:{type:Boolean,default:!1}},provide(){return{incrementCommentsCount:this.incrementCommentsCount,decrementCommentsCount:this.decrementCommentsCount,postDelete:this.deletePost,voteOnPost:this.voteOnPost,closePostComments:this.closePostComments,pinPost:this.pinPost,reactToPost:this.reactToPost,cancelToken:this.cancelToken}},emits:{},data(){return{posts:[],announcements:[],page:1,totalPages:1,loading:!1,pendingRequest:!1,hasMore:!0,emptyMessage:"",cancelToken:f().CancelToken.source()}},computed:{hasMoreToLoad(){return this.page<=this.totalPages&&this.hasMore}},async created(){},async mounted(){this.loadPosts(),window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll),this.cancelToken.cancel()},methods:{async loadPosts(){if(!this.pendingRequest){this.pendingRequest=!0,this.loading=!0;try{let e;if(e=this.isMain?await h.Z.getPostsForMainPage(this.page,this.cancelToken):"announcement"===this.type?await h.Z.getAnnouncements(this.page):"support"===this.type?await h.Z.getSupportPosts(this.page):await h.Z.postsByTimelineId(this.timeline_id,this.page),200!==e.statusCode)return void u.Z.toggleToast("حدث خطأ أثناء تحميل المنشورات, حاول مرة أخرى","error");if(200===e.statusCode&&!e.data)return void(this.hasMore=!1);this.isMain&&1===this.page&&(this.announcements=e.data?.announcements??[]),this.posts=[...this.posts,...e.data.posts],this.totalPages=e.data?.last_page??1,this.page++}catch(e){console.log(["loaded posts error",e]),u.Z.toggleToast("حدث خطأ أثناء تحميل المنشورات, حاول مرة أخرى","error")}finally{this.loading=!1,this.pendingRequest=!1}}},isAtBottomOfPage(){const e=this.$refs.listContainer.getBoundingClientRect(),t=e.bottom,s=window.innerHeight;return t<=s},handleScroll(){this.hasMoreToLoad&&this.isAtBottomOfPage()&&this.loadPosts()},incrementCommentsCount(e){let t;t=this.posts.find((t=>t.id==e)),t||(t=this.announcements.find((t=>t.id==e))),t.comments_count++},decrementCommentsCount(e){let t;t=this.posts.find((t=>t.id==e)),t||(t=this.announcements.find((t=>t.id==e))),t.comments_count--},addNewPost(e){this.posts.unshift(e)},deletePost(e){this.posts=this.posts.filter((t=>t.id!=e)),this.announcements=this.announcements.filter((t=>t.id!=e))},voteOnPost(e){const{option_id:t,post_id:s,old_option_id:i,status:o}=e;let n;n=this.posts.find((e=>e.id==s)),n||(n=this.announcements.find((e=>e.id==s)));const l=n.pollOptions.find((e=>e.id===t)),a=n.pollOptions.find((e=>e.id===i));"created"===o?n.votes_count++:"updated"===o&&(a.votes_count--,a.selected_by_user=!1),l.votes_count++,l.selected_by_user=!0},closePostComments(e){const t=this.posts.find((t=>t.id===e));t.allow_comments=!t.allow_comments},pinPost(e,t){let s;if(t){s=this.posts.find((t=>t.id===e));let t=this.posts[0];t.is_pinned&&this.posts.splice(this.posts.indexOf(t),1),t=this.posts.find((e=>e.is_pinned)),t&&(t.is_pinned=!1),this.posts.unshift(s)}else s=this.posts.find((t=>t.id===e&&t.is_pinned)),this.posts.splice(this.posts.indexOf(s),1);s.is_pinned=t},reactToPost(e,t){let s;s=this.posts.find((t=>t.id==e)),s||(s=this.announcements.find((t=>t.id==e))),t?(s.reactions_count++,s.reacted_by_user=!0):(s.reactions_count--,s.reacted_by_user=!1)}}},y=s(83744);const w=(0,y.Z)(g,[["render",c]]);var v=w},69707:function(e,t,s){s.d(t,{Z:function(){return be}});var i=s(66252),o=s(49963),n=s(3577);const l=e=>((0,i.dD)("data-v-7b299825"),e=e(),(0,i.Cn)(),e),a=l((()=>(0,i._)("h4",{class:"card-title"},"منشور جديد",-1))),r={class:"d-flex align-items-center"},d={class:"post-text ml-3 w-100"},c=l((()=>(0,i._)("h5",{class:"modal-title",id:"modalsLabel"},"منشور جديد",-1))),p=l((()=>(0,i._)("span",{class:"material-symbols-outlined"},"close",-1))),h=[p],u={class:"d-flex align-items-start"},m={class:"post-text ml-3 w-100"},f=l((()=>(0,i._)("hr",null,null,-1))),g={class:"post-opt-block d-flex list-inline m-0 p-0 flex-wrap"},y={class:"me-2 mb-2"},w=["disabled"],v=l((()=>(0,i._)("span",{class:"material-symbols-outlined me-2"},"photo_camera",-1))),_={class:"me-2 mb-2"},b=l((()=>(0,i._)("span",{class:"material-symbols-outlined me-2"},"person_add",-1))),P={class:"me-2 mb-2"},k=l((()=>(0,i._)("span",{class:"material-symbols-outlined me-2"},"poll",-1))),C=l((()=>(0,i._)("hr",null,null,-1))),M={key:0,class:"w-100 text-right",style:{color:"red"}},x={key:1,class:"w-100 text-center py-1",style:{color:"red"}},O={key:2,class:"col-sm-12 text-center"},F=["src"],D=["disabled"],L=l((()=>(0,i._)("h5",{class:"modal-title",id:"friendsModalLabel"},"إشارة إلى صديق",-1))),T=l((()=>(0,i._)("span",{class:"material-symbols-outlined"}," arrow_back_ios_new ",-1))),R=[T],Z={class:"iq-search-bar device-search w-main my-2 d-flex"},$={action:"#",class:"searchbox",style:{width:"100% !important"}},q=l((()=>(0,i._)("a",{class:"search-link",href:"#"},[(0,i._)("span",{class:"material-symbols-outlined"},"search")],-1))),U=l((()=>(0,i._)("hr",null,null,-1)));function A(e,t,l,p,T,A){const I=(0,i.up)("UserAvatar"),W=(0,i.up)("model-header"),S=(0,i.up)("PostUser"),B=(0,i.up)("PostPoll"),H=(0,i.up)("ImagePreviewer"),Y=(0,i.up)("model-body"),K=(0,i.up)("model-footer"),Q=(0,i.up)("modal"),j=(0,i.up)("FriendsList"),z=(0,i.up)("iq-card");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(z,{id:"post-modal-data","body-class":"iq-card iq-card-block iq-card-stretch iq-card-height"},{headerTitle:(0,i.w5)((()=>[a])),body:(0,i.w5)((()=>[(0,i._)("div",r,[(0,i.Wm)(I,{profileImg:A.auth?.user_profile?.profile_picture,profile_id:A.auth?.user_profile?.id,title:A.auth?.name,gender:A.auth?.gender,avatarClass:"avatar-60 rounded-circle"},null,8,["profileImg","profile_id","title","gender"]),(0,i._)("form",d,[(0,i._)("input",{type:"text",placeholder:"ماذا تريد أن تكتب...",class:"rounded form-control",style:{border:"none"},onClick:t[0]||(t[0]=(0,o.iM)((e=>A.showModal(T.postModal)),["prevent"]))})])])])),default:(0,i.w5)((()=>[(0,i.Wm)(Q,{ref:"postModalRef",id:"postModal",dialogClass:"modal-fullscreen-sm-down",tabindex:"-1",title:"Create Post","aria-labelledby":"modalsLabel","aria-hidden":!0},{default:(0,i.w5)((()=>[(0,i.Wm)(W,null,{default:(0,i.w5)((()=>[c,(0,i._)("a",{href:"#",class:"lh-1",onClick:t[1]||(t[1]=(0,o.iM)((e=>A.hideModal(T.postModal)),["prevent"]))},h)])),_:1}),(0,i.Wm)(Y,{class:"post-modal-body"},{default:(0,i.w5)((()=>[(0,i._)("div",u,[(0,i.Wm)(S,{post:{user:A.auth,taggedFriends:T.selectedFriends}},null,8,["post"])]),(0,i._)("div",null,[(0,i._)("form",m,[(0,i.wy)((0,i._)("textarea",{placeholder:"ماذا تريد أن تكتب...",class:"rounded form-control",style:{border:"none"},"onUpdate:modelValue":t[2]||(t[2]=e=>T.post.body=e),ref:"bodyRef"},"\n              ",512),[[o.nr,T.post.body,void 0,{trim:!0}]]),(0,i._)("input",{type:"file",onChange:t[3]||(t[3]=e=>A.previewMedia(e)),multiple:"",accept:"image/*",class:"d-none",ref:"fileRef"},null,544)])]),(0,i.Wm)(B,{showPoll:T.showPoll,pollOptions:T.pollOptions,onClosePoll:t[4]||(t[4]=e=>T.showPoll=!1),onAddPollOption:A.addPollOption,onRemovePollOption:A.removePollOption,onCheckSimilarPollOptions:A.checkSimilarPollOptions},null,8,["showPoll","pollOptions","onAddPollOption","onRemovePollOption","onCheckSimilarPollOptions"]),f,(0,i._)("ul",g,[(0,i._)("li",y,[(0,i._)("button",{class:"btn btn-soft-primary d-flex align-items-center",onClick:t[5]||(t[5]=(...e)=>A.openFilePicker&&A.openFilePicker(...e)),disabled:!A.allowAddingMedia},[v,(0,i.Uk)(" صورة/فيديو ")],8,w)]),(0,i._)("li",_,[(0,i._)("button",{class:"btn btn-soft-primary d-flex align-items-center",onClick:t[6]||(t[6]=(0,o.iM)((e=>A.showModal(T.friendsListModal)),["prevent"]))},[b,(0,i.Uk)(" إشارة إلى صديق ")])]),(0,i._)("li",P,[(0,i._)("button",{class:"btn btn-soft-primary d-flex align-items-center",onClick:t[7]||(t[7]=(0,o.iM)(((...e)=>A.openPoll&&A.openPoll(...e)),["prevent"]))},[k,(0,i.Uk)(" إضافة استعلام ")])])]),T.post.media.length>0?((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[C,(0,i.Wm)(H,{media:T.post.media,onRemoveMedia:A.removeMedia},null,8,["media","onRemoveMedia"])],64)):(0,i.kq)("",!0)])),_:1}),(0,i.Wm)(K,{class:"p-0 px-2"},{default:(0,i.w5)((()=>[T.showPoll?((0,i.wg)(),(0,i.iD)("div",M," ملاحظة: نص المنشور مطلوب مع الاستعلام, والخيارات لا يمكن أن تكون أقل من 2 ولا تزيد عن 10 ")):(0,i.kq)("",!0),T.errorMessage?((0,i.wg)(),(0,i.iD)("div",x,(0,n.zw)(T.errorMessage),1)):(0,i.kq)("",!0),T.loader?((0,i.wg)(),(0,i.iD)("div",O,[(0,i._)("img",{src:s(79885),alt:"loader",style:{height:"100px"}},null,8,F)])):((0,i.wg)(),(0,i.iD)("button",{key:3,class:"btn btn-primary btn-block my-3 w-100 flex-grow-1",onClick:t[8]||(t[8]=e=>A.addNewPost()),disabled:!A.allowPosting}," نشـــر ",8,D))])),_:1})])),_:1},512),(0,i.Wm)(Q,{ref:"friendsListModalRef",id:"friendsListModal",tabindex:"-1","aria-labelledby":"friendsModalLabel","aria-hidden":!0},{default:(0,i.w5)((()=>[(0,i.Wm)(W,null,{default:(0,i.w5)((()=>[L,(0,i._)("a",{href:"#",class:"lh-1",onClick:t[9]||(t[9]=(0,o.iM)((e=>A.hideModal(T.friendsListModal)),["prevent"]))},R)])),_:1}),(0,i.Wm)(Y,null,{default:(0,i.w5)((()=>[(0,i._)("div",Z,[(0,i._)("form",$,[q,(0,i.wy)((0,i._)("input",{type:"text",class:"text search-input form-control bg-soft-primary",placeholder:"ابحث هنا...","onUpdate:modelValue":t[10]||(t[10]=e=>T.searchQuery=e),onKeyup:t[11]||(t[11]=(...e)=>A.searchFriends&&A.searchFriends(...e))},null,544),[[o.nr,T.searchQuery,void 0,{trim:!0}]])]),(0,i._)("a",{href:"#",class:"btn btn-primary ms-2",onClick:t[12]||(t[12]=(0,o.iM)((e=>A.hideModal(T.friendsListModal)),["prevent"]))}," اعتماد ")]),U,(0,i.Wm)(j,{friends:T.friends,handleCheckboxChange:A.handleCheckboxChange},null,8,["friends","handleCheckboxChange"])])),_:1})])),_:1},512)])),_:1})])}var I=s(91130),W=s(79365);const S=e=>((0,i.dD)("data-v-09c8084c"),e=e(),(0,i.Cn)(),e),B={key:0,class:"card my-3 border-1 rounded poll"},H={class:"card-header d-flex justify-content-between align-items-center"},Y=S((()=>(0,i._)("h5",{class:"mb-0 text-primary"},"إضافة استعلام",-1))),K={class:"card-body"},Q=["onUpdate:modelValue","placeholder","onChange"],j=["onClick"],z=["disabled"],E=S((()=>(0,i._)("span",{class:"material-symbols-outlined"},"add",-1))),N=S((()=>(0,i._)("span",null,"إضافة خيار",-1))),V=[E,N];function G(e,t,s,n,l,a){return s.showPoll?((0,i.wg)(),(0,i.iD)("div",B,[(0,i._)("div",H,[Y,(0,i._)("i",{class:"material-symbols-outlined",role:"button",onClick:t[0]||(t[0]=(0,o.iM)((t=>e.$emit("closePoll")),["prevent"]))},"close")]),(0,i._)("div",K,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.pollOptions,((t,s)=>((0,i.wg)(),(0,i.iD)("div",{class:"d-flex align-items-center my-2",key:t.id},[(0,i.wy)((0,i._)("input",{type:"text",class:"form-control rounded","onUpdate:modelValue":e=>t.value=e,placeholder:`خيار ${s+1}`,onChange:s=>e.$emit("checkSimilarPollOptions",t.id)},null,40,Q),[[o.nr,t.value]]),(0,i._)("i",{class:"material-symbols-outlined ms-2",role:"button",onClick:(0,o.iM)((s=>e.$emit("removePollOption",t.id)),["prevent"])},"close",8,j)])))),128)),(0,i._)("button",{class:"btn btn-secondary d-block w-100 mt-3 d-flex justify-content-center align-items-center",onClick:t[1]||(t[1]=(0,o.iM)((t=>e.$emit("addPollOption")),["prevent"])),disabled:!a.allowAddingPollOption},V,8,z)])])):(0,i.kq)("",!0)}var J={name:"PostPoll",props:{showPoll:{type:Boolean,default:!1},pollOptions:{type:Array,default:()=>[]}},computed:{allowAddingPollOption(){let e=!0;return this.pollOptions.forEach((t=>{""===t.value&&(e=!1)})),e}}},X=s(83744);const ee=(0,X.Z)(J,[["render",G],["__scopeId","data-v-09c8084c"]]);var te=ee;const se={key:0,class:"text-center text-primary"},ie={key:1,class:"p-3 friends-list"},oe={class:"d-flex align-items-center flex-grow-1"},ne={class:"user-img"},le=["src"],ae={class:"user-info ms-3 flex-grow-1"},re={class:"mb-0"},de=["id","name"];function ce(e,t,o,l,a,r){return(0,i.wg)(),(0,i.iD)(i.HY,null,[o.friends.length?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",se," لا يوجد أصدقاء لعرضهم ")),o.friends.length?((0,i.wg)(),(0,i.iD)("div",ie,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.friends,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e.id,class:"d-flex pb-3 align-items-center"},[(0,i._)("div",oe,[(0,i._)("div",ne,[(0,i._)("img",{class:"avatar-40 rounded-circle",src:e.profile.profile_picture??s(23062)},null,8,le)]),(0,i._)("div",ae,[(0,i._)("h6",re,(0,n.zw)(e.name),1)])]),(0,i._)("input",{id:e.id,class:"form-check-input",type:"checkbox",name:e.name,onChange:t[0]||(t[0]=(...e)=>o.handleCheckboxChange&&o.handleCheckboxChange(...e)),style:{width:"1.5em !important",height:"1.5em !important"}},null,40,de)])))),128))])):(0,i.kq)("",!0)],64)}var pe={name:"FriendsList",props:{friends:{type:Array,default:()=>[]},handleCheckboxChange:{type:Function,required:!0}}};const he=(0,X.Z)(pe,[["render",ce],["__scopeId","data-v-6dfed0e0"]]);var ue=he,me=s(55631),fe=s(79909),ge=s(8417),ye=s(96444),we=(s(49579),s(8209)),ve={name:"AddPost",components:{ImagePreviewer:I.Z,PostPoll:te,FriendsList:ue,PostUser:me.Z,UserAvatar:W.Z},props:{type:{type:String,default:"normal"},timeline_id:{type:Number,required:!0}},emits:["add-post"],data(){return{postModal:null,friendsListModal:null,friends:[],friendsTemp:[],selectedFriends:[],pollOptions:[],post:{body:"",media:[],tags:[],votes:[]},showPoll:!1,minmaxOptions:{min:2,max:10},loader:!1,errorMessage:"",searchQuery:""}},computed:{auth(){return this.$store.getters.getUser},allowAddingMedia(){return!this.showPoll},allowPosting(){let e=!0;return""===this.post.body&&0===this.post.media.length&&(e=!1),""===this.post.body&&this.pollOptions.length>0&&(e=!1),this.pollOptions.length>0&&this.pollOptions.length<this.minmaxOptions.min&&(e=!1),e},postBody(){return this.post.body},profile_picture(){const e=s(29822),t=s(48934),i=this.auth?.gender.toLowerCase();return"female"===i?e:t}},watch:{postBody(){this.$refs.bodyRef.style.height="auto",this.$nextTick((()=>{this.$refs.bodyRef.style.height=this.$refs.bodyRef.scrollHeight+"px"}))}},async created(){await this.getFriends()},async mounted(){this.postModal=new fe.u_(this.$refs.postModalRef.$el),this.friendsListModal=new fe.u_(this.$refs.friendsListModalRef.$el)},methods:{openFilePicker(){this.$refs.fileRef.click()},previewMedia(e){const t=[...e.target.files];this.post.media=t},removeMedia(e){const t=[...this.post.media];t.splice(e,1),this.post.media=t,0===this.post.media.length&&(this.$refs.fileRef.value=null)},showModal(e){e.show()},hideModal(e){e.hide()},async getFriends(){try{const e=await ye.Z.getAllFriends(this.auth.id);null!==e?(this.friends=e.allFriends,this.friendsTemp=e.allFriends):this.friends=[]}catch(e){return this.friends=[],void(this.friendsTemp=[])}},handleCheckboxChange(e){const{checked:t,id:s}=e.target,i=this.friends.find((e=>e.id===parseInt(s)));t?(this.post.tags.push(parseInt(s)),this.selectedFriends.push({id:this.selectedFriends.length+1,user:i})):(this.post.tags=this.post.tags.filter((e=>e!==parseInt(s))),this.selectedFriends=this.selectedFriends.filter((e=>e.id!==parseInt(s))))},openPoll(){this.showPoll=!0,this.addPollOption(),this.post.media=[],this.$refs.fileRef.value=null},addPollOption(){this.pollOptions.length>=this.minmaxOptions.max||this.pollOptions.push({id:this.pollOptions.length+1,value:""})},checkSimilarPollOptions(e){const t=this.pollOptions.find((t=>t.id===e)),s=this.pollOptions.find((s=>s.value===t.value&&s.id!==e));s&&(t.value="")},removePollOption(e){const t=this.pollOptions.find((t=>t.id===e)),s=this.pollOptions.indexOf(t);this.pollOptions.splice(s,1)},searchFriends(){""!==this.searchQuery?this.friends=this.friendsTemp.filter((e=>e.name.toLowerCase().includes(this.searchQuery.toLowerCase()))):this.friends=this.friendsTemp},async addNewPost(){const e=this.pollOptions.filter((e=>""!==e.value)),t={...this.post,votes:e.map((e=>e.value)),timeline_id:this.timeline_id,type:this.type};this.loader=!0;try{const e=await ge.Z.create(t);if(console.log("[post]",e),200!==e.statusCode)return void we.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error");null!==e.data.is_approved&&this.$emit("add-post",e.data),this.resetPostForm(),this.postModal.hide(),we.Z.toggleToast(e.message?e.message:"تم النشر بنجاح","success")}catch(s){console.log("[err]",s),we.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error")}finally{this.loader=!1}},resetPostForm(){this.post={body:"",media:[],tags:[],votes:[]},this.pollOptions=[],this.showPoll=!1,this.selectedFriends=[],this.searchQuery="",this.friends=this.friendsTemp,this.$nextTick((()=>{const e=document.querySelectorAll(".friends-list input[type=checkbox]");e.forEach((e=>{e.checked=!1}))})),this.$refs.fileRef.value=null}}};const _e=(0,X.Z)(ve,[["render",A],["__scopeId","data-v-7b299825"]]);var be=_e}}]);
//# sourceMappingURL=5371.59670460.js.map