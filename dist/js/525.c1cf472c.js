"use strict";(self["webpackChunkOsboha180"]=self["webpackChunkOsboha180"]||[]).push([[525],{8417:function(t,e,s){var o=s(24150),a=s(66252);class n{async create(t){const e=new FormData;e.append("body",t.body),e.append("type",t.type),e.append("timeline_id",t.timeline_id),t.media&&t.media.forEach((t=>{e.append("media[]",t)})),t.tags&&t.tags.forEach((t=>{e.append("tags[]",t)})),t.votes&&t.votes.forEach((t=>{e.append("votes[]",t)}));try{const t=await o.hi.post("/posts",e,{headers:{"Content-type":"multipart/form-data"}});return t.data}catch(s){(0,a.S3)(s)}}async delete(t){try{const e=await o.hi["delete"](`/posts/${t}`);return e.data}catch(e){(0,a.S3)(e)}}async getPostById(t){try{const e=await o.hi.get(`/posts/${t}`);return e.data}catch(e){(0,a.S3)(e)}}async updatePostById(t,e,s,a,n){const i=new FormData;i.append("image",n),i.append("type",s),i.append("timeline_id",a),i.append("body",t),i.append("user_id",e);try{return await o.hi.post("/post/update",{formData:i})}catch(r){return r}}async getPostsForMainPage(t){try{const e=await o.hi.get(`/posts/home?page=${t}`);return e.data}catch(e){(0,a.S3)(e)}}async postsByTimelineId(t,e){try{const s=await o.hi.get(`/posts/timeline/${t}?page=${e}`);return s.data}catch(s){(0,a.S3)(s)}}async getAnnouncements(t){try{const e=await o.hi.get(`/posts/announcements?page=${t}`);return e.data}catch(e){(0,a.S3)(e)}}async getSupportPosts(t){try{const e=await o.hi.get(`/posts/support?page=${t}`);return e.data}catch(e){(0,a.S3)(e)}}async contolComments(t){try{const e=await o.hi.patch(`/posts/${t}/control-comments`);return e.data}catch(e){(0,a.S3)(e)}}async pinPost(t){try{const e=await o.hi.patch(`/posts/pin/${t}`);return e.data}catch(e){(0,a.S3)(e)}}async getLastSupportPost(){try{const t=await o.hi.get("/posts/support/latest");return t.data}catch(t){(0,a.S3)(t)}}}e["Z"]=new n},87026:function(t,e,s){s.d(e,{Z:function(){return M}});var o=s(66252),a=s(3577),n=s(49963);const i={class:"row",ref:"commentsListRef"},r={key:0,class:"cols"},l={class:"text-center text-primary m-auto"},d={class:"ms-1"},c={key:1,class:"cols"},m={class:"text-center m-auto",style:{color:"red"}},p={class:"ms-1"},u={class:"card card-block card-stretch card-height blog"},g={class:"card-body"},h={key:2,class:"cols text-center"},w=["src"];function y(t,e,y,f,_,v){const b=(0,o.up)("font-awesome-icon"),C=(0,o.up)("Comment");return(0,o.wg)(),(0,o.iD)("div",i,[_.emptyMessage&&!_.comments.length?((0,o.wg)(),(0,o.iD)("div",r,[(0,o._)("div",l,[(0,o.Wm)(b,{icon:["fas",""+(y.post.allow_comments?"pen":"circle-exclamation")],size:"sm"},null,8,["icon"]),(0,o._)("span",d,(0,a.zw)(_.emptyMessage),1)])])):(0,o.kq)("",!0),_.errorMessage?((0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("div",m,[(0,o.Wm)(b,{icon:["fas","circle-exclamation"],size:"sm"}),(0,o._)("span",p,(0,a.zw)(_.errorMessage),1)])])):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(_.comments,(t=>((0,o.wg)(),(0,o.iD)("div",{class:"cols",key:t.id},[(0,o._)("div",u,[(0,o._)("div",g,[(0,o.Wm)(C,{allowComment:y.post.allow_comments,comment:t,onAddComment:v.addComment,onEditComment:v.editComment,onReactToComment:v.reactToComment},null,8,["allowComment","comment","onAddComment","onEditComment","onReactToComment"])])])])))),128)),_.loading?((0,o.wg)(),(0,o.iD)("div",h,[(0,o._)("img",{src:s(79885),alt:"loader",style:{height:"100px"}},null,8,w)])):(0,o.kq)("",!0),!v.hasMoreComments||_.loading||_.emptyMessage||_.errorMessage?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("button",{key:3,class:"w-100 p-2 bold-600 text-primary border-0 bg-transparent my-2",onClick:e[0]||(e[0]=(0,n.iM)(((...t)=>v.loadComments&&v.loadComments(...t)),["prevent"]))}," تحميل المزيد من التعليقات "))],512)}var f=s(27522),_=s(20117),v=s(8209),b={name:"LazyLoadedComments",components:{Comment:_.Z},provide(){return{deleteComment:this.deleteComment}},inject:{incrementCommentsCount:{default:()=>{}},decrementCommentsCount:{default:()=>{}}},props:{post:{type:Object,required:!0},userId:{type:Number,default:null},loadOnCreate:{type:Boolean,default:!1}},data(){return{comments:[],page:1,totalPages:1,loading:!1,emptyMessage:"",errorMessage:""}},computed:{hasMoreComments(){return this.page<=this.totalPages}},created(){this.page=1,this.totalPages=1,this.comments=[],this.emptyMessage="",this.errorMessage="",this.loadOnCreate&&this.loadComments()},methods:{async loadComments(){if(!this.loading){this.loading=!0;try{const t=await f.Z.getPostComments(this.post.id,this.page,this.userId??"");if(200!==t.statusCode)return void v.Z.toggleToast(t.message,"error");t.data.comments?(this.comments=this.comments.concat(t.data.comments),this.totalPages=t.data.last_page,this.page++):this.emptyMessage=this.post.allow_comments?"قم بكتابة تعليقك الأول":"لا يوجد تعليقات"}catch(t){v.Z.toggleToast("حدث خطأ أثناء تحميل التعليقات، حاول مرة أخرى","error")}finally{this.loading=!1}}},findComment(t,e){for(let s=0;s<t.length;s++){if(t[s].id===e)return t[s];if(t[s].replies.length>0){const o=this.findComment(t[s].replies,e);if(o)return o}}},addComment(t,e){if(console.log("[lazy loaded comments] addComment",t),e){let s=this.findComment(this.comments,e);s.replies.push(t),console.log("[added comment at post]",t)}else this.comments.push(t),this.$nextTick((()=>{const t=this.$refs.commentsListRef;t.scrollTop=t.scrollHeight}));this.incrementCommentsCount(this.post.id)},deleteComment(t){for(let e=0;e<this.comments.length;e++){if(this.comments[e].id===t)return this.comments.splice(e,1),void this.decrementCommentsCount(this.post.id);if(this.comments[e].replies.length>0)for(let s=0;s<this.comments[e].replies.length;s++)if(this.comments[e].replies[s].id===t)return this.comments[e].replies.splice(s,1),void this.decrementCommentsCount(this.post.id)}},editComment(t){let e=this.findComment(this.comments,t.id);e.body=t.body,e.media=t.media},reactToComment(t,e){console.log("[lazy loaded comments] reactToComment",t,e);let s=this.findComment(this.comments,t);e?(s.reactions_count++,s.reacted_by_user=!0):(s.reactions_count--,s.reacted_by_user=!1)},resetData(){this.page=1,this.totalPages=1,this.comments=[],this.emptyMessage="",this.errorMessage="",this.loadComments()}}},C=s(83744);const k=(0,C.Z)(b,[["render",y]]);var M=k},10525:function(t,e,s){s.d(e,{Z:function(){return Be}});var o=s(66252);const a={class:"col-sm-12"},n={class:"card card-block card-stretch card-height"},i={class:"card-body"};function r(t,e,s,r,l,d){const c=(0,o.up)("PostHeader"),m=(0,o.up)("PostBody"),p=(0,o.up)("PostMedia"),u=(0,o.up)("SupportSection"),g=(0,o.up)("PostFooter"),h=(0,o.up)("PostMediaModal"),w=(0,o.up)("CommentsModal");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",a,[(0,o._)("div",n,[(0,o._)("div",i,[(0,o.Wm)(c,{showPin:s.showPin},null,8,["showPin"]),(0,o.Wm)(m),(0,o.Wm)(p,{onShowPostMedia:d.showPostMedia},null,8,["onShowPostMedia"]),(0,o.Wm)(u),(0,o.Wm)(g)])])]),(0,o.Wm)(h,{ref:"postMediaModal"},null,512),d.focusComment?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)(w,{key:0,ref:"commentModal"},null,512))],64)}var l=s(3577),d=s(49963);const c={class:"user-post-data"},m={class:"d-flex justify-content-between"},p={class:"d-flex align-items-center"},u={key:0,class:"material-symbols-outlined ms-1"},g={key:1,class:"ms-1 text-danger"},h={key:0,class:"card-post-toolbar"},w=(0,o._)("span",{class:"material-symbols-outlined"}," more_horiz ",-1),y=[w],f=(0,o._)("span",{class:"material-symbols-outlined me-2 md-18"}," push_pin ",-1),_={class:"material-symbols-outlined me-2 md-18"},v=["aria-disabled"],b=(0,o._)("span",{class:"material-symbols-outlined me-2 md-18"}," delete ",-1),C=(0,o._)("span",{class:"material-symbols-outlined me-2 md-18"}," cancel ",-1);function k(t,e,s,a,n,i){const r=(0,o.up)("tooltip"),w=(0,o.up)("PostUser");return(0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("div",m,[(0,o.Wm)(w,{post:i.post},{date:(0,o.w5)((()=>[(0,o._)("div",p,[(0,o.Wm)(r,{tag:"p",class:"mb-0 text-primary",tooltipPlacement:"bottom","data-bs-toggle":"tooltip",title:t.formatFullDate(i.post.created_at),style:{width:"fit-content"},onClick:e[0]||(e[0]=e=>t.$router.push({name:"osboha.post",params:{post_id:i.post.id}}))},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(t.formatDateToWritten(i.post.created_at)),1)])),_:1},8,["title"]),i.post.is_pinned?((0,o.wg)(),(0,o.iD)("span",u," push_pin ")):(0,o.kq)("",!0),"announcement"===i.post.type.toLowerCase()?((0,o.wg)(),(0,o.iD)("span",g,"إعلان")):(0,o.kq)("",!0)])])),_:1},8,["post"]),i.byAuth?((0,o.wg)(),(0,o.iD)("div",h,[(0,o._)("div",{class:"dropdown-toggle",id:"dropdownMenuButton","data-bs-toggle":"dropdown","aria-expanded":"false",role:"button",onClick:e[1]||(e[1]=t=>n.show=!n.show)},y),(0,o._)("div",{class:(0,l.C_)("dropdown-menu dropdown-menu-right "+(n.show?"show":"")),"aria-labelledby":"dropdownMenuButton",style:{}},[s.showPin?((0,o.wg)(),(0,o.iD)("a",{key:0,class:"dropdown-item d-flex align-items-center text-primary",href:"#",onClick:e[2]||(e[2]=(0,d.iM)(((...t)=>i.pin&&i.pin(...t)),["prevent"]))},[f,(0,o.Uk)(" "+(0,l.zw)(i.post.is_pinned?"فك التثبيت":"تثبيت"),1)])):(0,o.kq)("",!0),(0,o._)("a",{class:"dropdown-item d-flex align-items-center text-primary",href:"#",onClick:e[3]||(e[3]=(0,d.iM)(((...t)=>i.closeComments&&i.closeComments(...t)),["prevent"]))},[(0,o._)("span",_,(0,l.zw)(i.post.allow_comments?"comments_disabled":"comment"),1),(0,o.Uk)(" "+(0,l.zw)(i.post.allow_comments?"إغلاق":"فتح")+" التعليقات ",1)]),(0,o._)("a",{class:"dropdown-item d-flex align-items-center",href:"#",role:"button","aria-disabled":n.deleteLoading,onClick:e[4]||(e[4]=(0,d.iM)(((...t)=>i.deletePost&&i.deletePost(...t)),["prevent"]))},[b,(0,o.Uk)("حذف")],8,v),(0,o._)("a",{class:"dropdown-item d-flex align-items-center",href:"#",onClick:e[5]||(e[5]=(0,d.iM)((t=>n.show=!1),["prevent"]))},[C,(0,o.Uk)("إغلاق")])],2)])):(0,o.kq)("",!0)])])}var M=s(8209),x=s(55631),P=s(8417),T={name:"PostHeader",inject:{closePostComments:{default:()=>{}},pinPost:{default:()=>{}},postDelete:{default:()=>{}},post:{required:!0}},components:{PostUser:x.Z},props:{showPin:{type:Boolean,default:!1}},data(){return{show:!1,deleteLoading:!1}},computed:{byAuth(){return this.post.user.id===this.$store.getters.getUser.id}},methods:{...M.Z,async closeComments(){try{await P.Z.contolComments(this.post.id),this.closePostComments(this.post.id),this.post.allow_comments?this.toggleToast("تم فتح التعليقات","success"):this.toggleToast("تم إغلاق التعليقات","success")}catch(t){this.toggleToast("حدث خطأ ما, حاول مرة أخرى","error")}},async pin(){try{const t=await P.Z.pinPost(this.post.id);if(200!==t.statusCode)return void this.toggleToast("حدث خطأ ما, حاول مرة أخرى","error");const e="pinned"===t.data;this.pinPost(this.post.id,e),e?this.toggleToast("تم تثبيت المنشور","success"):this.toggleToast("تم فك التثبيت","success")}catch(t){this.toggleToast("حدث خطأ ما, حاول مرة أخرى","error")}},async deletePost(){if(this.deleteLoading)return;const t=this.$swal.mixin({customClass:{confirmButton:"btn btn-primary btn-lg",cancelButton:"btn btn-outline-danger btn-lg ms-2"},buttonsStyling:!1});t.fire({title:"هل أنت متأكد؟",text:"سيتم حذف هذا المنشور نهائياً!",icon:"warning",showCancelButton:!0,confirmButtonText:"نعم, احذف!",cancelButtonText:"تراجع",showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}}).then((async t=>{if(t.isConfirmed){this.deleteLoading=!0;try{await P.Z["delete"](this.post.id),this.postDelete(this.post.id),M.Z.handleSuccessSwal("تم حذف المنشور بنجاح")}catch(e){M.Z.handleErrorSwal("حدث خطأ أثناء الحذف, يرجى المحاولة مرة أخرى!")}finally{this.deleteLoading=!1}}}))}}},D=s(83744);const U=(0,D.Z)(T,[["render",k]]);var $=U;const S={class:"mt-3"},Z={key:0,class:"mt-3"},q={class:"poll-input d-flex justify-content-around align-items-center w-100 h-100"},z=["id","value"],O=["for"],j={class:"me-2 text-primary bold-600"};function I(t,e,s,a,n,i){const r=(0,o.up)("progressbar");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",S,[(0,o._)("p",null,(0,l.zw)(i.post.body),1)]),i.post.pollOptions?.length?((0,o.wg)(),(0,o.iD)("div",Z,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.post.pollOptions,(t=>((0,o.wg)(),(0,o.iD)("div",{class:"progress my-2 border border-light rounded bg-transparent",key:t.id},[(0,o.Wm)(r,{style:(0,l.j5)({width:i.getOptionVotesPercentage(t.id)}),class:"progress-bar",className:"rounded","aria-valuemin":"0","aria-valuemax":"100"},null,8,["style"]),(0,o._)("div",q,[(0,o.wy)((0,o._)("input",{type:"radio",id:t.id,value:t.id,"onUpdate:modelValue":e[0]||(e[0]=t=>n.choosedOption=t),class:"ms-1 mt-0",onChange:e[1]||(e[1]=(...t)=>i.vote&&i.vote(...t))},null,40,z),[[d.G2,n.choosedOption]]),(0,o._)("label",{for:t.id,class:"form-check-label flex-grow-1 text-truncate ms-2 align-right"},(0,l.zw)(t.option),9,O),(0,o._)("span",j,(0,l.zw)(i.getOptionVotesPercentage(t.id)),1)])])))),128))])):(0,o.kq)("",!0)],64)}var W=s(24150);class L{async create(t){try{const e=await W.hi.post("/poll-votes",t);return e.data}catch(e){(0,o.S3)(e)}}async getPostVotesUsers(t,e=""){try{const s=await W.hi.get(`/poll-votes/posts/${t}/users/${e}`);return s.data}catch(s){(0,o.S3)(s)}}}var R=new L,B={name:"PostBody",inject:{voteOnPost:{default:()=>{}},post:{required:!0}},data(){return{choosedOption:"",errorMessage:""}},mounted(){this.post.pollOptions.length>0&&(this.choosedOption=this.getSelectedOptionId())},methods:{async vote(){const t={option_id:this.choosedOption,post_id:this.post.id};try{const e=await R.create(t);if(200!==e.statusCode)return void M.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error");const s=e.data;if(!s)return;const o=this.getSelectedOptionId();this.voteOnPost({option_id:this.choosedOption,post_id:this.post.id,old_option_id:o,status:s})}catch(e){return void M.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error")}},getOptionVotesPercentage(t){const e=this.post.votes_count,s=this.post.pollOptions.find((e=>e.id===t)).votes_count;if(0===e)return"0%";const o=Math.round(s/e*100);return`${o}%`},getSelectedOptionId(){const t=this.post.pollOptions.find((t=>!0===t.selected_by_user));return t?t.id:""}}};const H=(0,D.Z)(B,[["render",I],["__scopeId","data-v-09957d3a"]]);var F=H;const Y={class:"comment-area mt-3"},A={class:"d-flex justify-content-between align-items-center flex-wrap"},N={class:"like-block position-relative d-flex align-items-center"},V=(0,o._)("hr",null,null,-1);function K(t,e,s,a,n,i){const r=(0,o.up)("TotalLikes"),l=(0,o.up)("TotalComments"),d=(0,o.up)("TotalVotes"),c=(0,o.up)("ActionButtons");return(0,o.wg)(),(0,o.iD)("div",Y,[(0,o._)("div",A,[(0,o._)("div",N,[(0,o.Wm)(r),(0,o.Wm)(l),(0,o.Wm)(d)])]),V,(0,o.Wm)(c)])}const J={class:"total-comment-block"},E={class:"dropdown-menu"},G={key:0,class:"dropdown-item text-center"},Q=["src"],X={key:1,class:"dropdown-item p-0 m-0 ms-2 mb-2"};function tt(t,e,a,n,i,r){const c=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",J,[(0,o._)("div",{class:(0,l.C_)({dropdown:r.post.comments_count>0})},[(0,o._)("span",{class:"dropdown-toggle","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",role:"button",onMouseover:e[0]||(e[0]=(...t)=>r.getUsers&&r.getUsers(...t)),onClick:e[1]||(e[1]=(0,d.iM)(((...t)=>r.showCommentModel&&r.showCommentModel(...t)),["prevent"]))},(0,l.zw)(r.commentsCount),33),(0,o._)("div",E,[i.loading?((0,o.wg)(),(0,o.iD)("div",G,[(0,o._)("img",{src:s(79885),alt:"loader",style:{height:"50px"}},null,8,Q)])):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.users,(t=>((0,o.wg)(),(0,o.j4)(c,{key:t.id,class:"dropdown-item",to:{name:"user.profile",params:{user_id:t.id}}},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(t.name),1)])),_:2},1032,["to"])))),128)),r.moreUsersText?((0,o.wg)(),(0,o.iD)("p",X,(0,l.zw)(r.moreUsersText),1)):(0,o.kq)("",!0)])],2)])}var et=s(27522),st={name:"TotalComments",inject:["post","showCommentModel"],data(){return{users:[],totalUsers:0,loading:!1}},computed:{commentsCount(){return 0==this.post.comments_count?"لا يوجد تعليقات":this.post.comments_count+" "+(this.post.comments_count<=10&&this.post.comments_count>2?"تعليقات":"تعليق")},moreUsersText(){const t=this.totalUsers-this.users.length,e=1===t?"آخر":"آخرين";return t>0?`و +${t} ${e}`:""}},methods:{async getUsers(){if(!(this.post.comments_count<=0||this.loading)){this.loading=!0;try{const t=await et.Z.getPostCommentsUsers(this.post.id);200!==t.statusCode&&M.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error"),this.users=t.data.users,this.totalUsers=t.data.count}catch(t){M.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error")}finally{this.loading=!1}}}}};const ot=(0,D.Z)(st,[["render",tt]]);var at=ot;const nt={class:"d-flex align-items-center"},it={class:"like-data"},rt={class:"dropdown"},lt={class:"text-primary","aria-haspopup":"true","aria-expanded":"false",role:"button"},dt={class:"total-like-block ms-2 me-3"},ct={class:"dropdown-menu"},mt={key:0,class:"dropdown-item text-center"},pt=["src"],ut={key:1,class:"dropdown-item p-0 m-0 ms-2 mb-2"};function gt(t,e,a,n,i,r){const d=(0,o.up)("font-awesome-icon"),c=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",nt,[(0,o._)("div",it,[(0,o._)("div",rt,[(0,o._)("span",lt,[(0,o.Wm)(d,{icon:["fas","thumbs-up"],size:"lg"})])])]),(0,o._)("div",dt,[(0,o._)("div",{class:(0,l.C_)({dropdown:r.post.reactions_count>0})},[(0,o._)("span",{class:"dropdown-toggle","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",onMouseover:e[0]||(e[0]=(...t)=>r.getUsers&&r.getUsers(...t)),role:"button"},(0,l.zw)(r.post.reactions_count),33),(0,o._)("div",ct,[i.loading?((0,o.wg)(),(0,o.iD)("div",mt,[(0,o._)("img",{src:s(79885),alt:"loader",style:{height:"50px"}},null,8,pt)])):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.users,(t=>((0,o.wg)(),(0,o.j4)(c,{key:t.id,class:"dropdown-item",to:{name:"user.profile",params:{user_id:t.id}}},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(t.name),1)])),_:2},1032,["to"])))),128)),r.moreUsersText?((0,o.wg)(),(0,o.iD)("p",ut,(0,l.zw)(r.moreUsersText),1)):(0,o.kq)("",!0)])],2)])])}var ht=s(80932),wt={name:"TotalLikes",inject:["post"],data(){return{reactions:[],users:[],totalUsers:0,loading:!1}},computed:{moreUsersText(){const t=this.totalUsers-this.users.length,e=1===t?"آخر":"آخرين";return t>0?`و +${t} ${e}`:""}},methods:{async getUsers(){if(!(this.post.reactions_count<=0||this.loading)){this.loading=!0;try{const t=await ht.Z.getPostReactionsUsers(this.post.id,this.$route.params.user_id??"");this.users=t.data.users,this.totalUsers=t.data.count}catch(t){M.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error")}finally{this.loading=!1}}}}};const yt=(0,D.Z)(wt,[["render",gt]]);var ft=yt;const _t=t=>((0,o.dD)("data-v-2983475e"),t=t(),(0,o.Cn)(),t),vt={class:"d-flex justify-content-between align-items-center"},bt=["disabled"],Ct=_t((()=>(0,o._)("span",{class:"me-1 bold-600"}," إعجاب ",-1))),kt=_t((()=>(0,o._)("span",{class:"me-1 bold-600"}," تعليق ",-1)));function Mt(t,e,s,a,n,i){const r=(0,o.up)("font-awesome-icon");return(0,o.wg)(),(0,o.iD)("div",vt,[(0,o._)("button",{type:"button",class:(0,l.C_)(["btn flex-grow-1",i.post.reacted_by_user?"text-primary":"text-gray-600"]),"data-bs-toggle":"tooltip","data-bs-placement":"top",title:"إعجاب",onClick:e[0]||(e[0]=(0,d.iM)((t=>i.reactOnPost(n.selectedReaction.id)),["prevent"])),disabled:n.pendingRequest},[Ct,(0,o.Wm)(r,{icon:[""+(i.post.reacted_by_user?"fas":"far"),"thumbs-up"],size:"xl"},null,8,["icon"])],10,bt),(0,o._)("button",{type:"button",class:"btn flex-grow-1 text-gray-600",title:"تعليق","data-bs-toggle":"tooltip","data-bs-placement":"bottom",onClick:e[1]||(e[1]=(0,d.iM)(((...t)=>i.showCommentModel&&i.showCommentModel(...t)),["prevent"]))},[kt,(0,o.Wm)(r,{icon:["far","comment"],size:"xl"})])])}var xt={name:"ActionButtons",inject:{reactToPost:{default:()=>{}},showCommentModel:{required:!0},post:{required:!0}},data(){return{reactions:[],selectedReaction:{id:1,title:"إعجاب",type:"like",text_color:"#278036"},pendingRequest:!1}},computed:{},created(){},methods:{selectReaction(t){this.selectedReaction=t,console.log(this.selectedReaction)},async reactOnPost(t){if(!this.pendingRequest){this.pendingRequest=!0;try{const e=await ht.Z.reactOnPost(this.post.id,t);if(200!==e.statusCode)return void M.Z.toggleToast("حدث خطأ ما, يرجى المحاولة لاحقاً","error");this.reactToPost(this.post.id,e.data)}catch(e){console.log("[reaction]",e.response),M.Z.toggleToast("حدث خطأ ما, يرجى المحاولة لاحقاً","error")}finally{this.pendingRequest=!1}}}}};const Pt=(0,D.Z)(xt,[["render",Mt],["__scopeId","data-v-2983475e"]]);var Tt=Pt;const Dt={key:0,class:"total-comment-block ms-3"},Ut={class:"dropdown-menu"},$t={key:0,class:"dropdown-item text-center"},St=["src"],Zt={key:1,class:"dropdown-item p-0 m-0 ms-2 mb-2"};function qt(t,e,a,n,i,r){const d=(0,o.up)("router-link");return r.post.pollOptions.length>0?((0,o.wg)(),(0,o.iD)("div",Dt,[(0,o._)("div",{class:(0,l.C_)({dropdown:r.post.votes_count>0})},[(0,o._)("span",{class:"dropdown-toggle","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",onMouseover:e[0]||(e[0]=(...t)=>r.getUsers&&r.getUsers(...t)),role:"button"},(0,l.zw)(r.votesCountText),33),(0,o._)("div",Ut,[i.loading?((0,o.wg)(),(0,o.iD)("div",$t,[(0,o._)("img",{src:s(79885),alt:"loader",style:{height:"50px"}},null,8,St)])):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.users,(t=>((0,o.wg)(),(0,o.j4)(d,{key:t.id,class:"dropdown-item",to:{name:"user.profile",params:{user_id:t.id}}},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(t.name),1)])),_:2},1032,["to"])))),128)),r.moreUsersText?((0,o.wg)(),(0,o.iD)("p",Zt,(0,l.zw)(r.moreUsersText),1)):(0,o.kq)("",!0)])],2)])):(0,o.kq)("",!0)}var zt={name:"TotalVotes",inject:["post"],data(){return{users:[],totalUsers:0,loading:!1}},computed:{moreUsersText(){const t=this.totalUsers-this.users.length,e=1===t?"آخر":"آخرين";return t>0?`و +${t} ${e}`:""},votesCountText(){return 0==this.post.votes_count?"لا يوجد تصويتات":this.post.votes_count+" "+(this.post.votes_count<=10&&this.post.votes_count>2?"تصويتات":"تصويت")}},methods:{async getUsers(){if(!(this.post.votes_count<=0||this.loading)){this.loading=!0;try{const t=await R.getPostVotesUsers(this.post.id,this.$route.params.user_id??"");this.users=t.data.users,this.totalUsers=t.data.count}catch(t){M.Z.toggleToast("حدث خطأ ما, حاول مرة أخرى","error")}finally{this.loading=!1}}}}};const Ot=(0,D.Z)(zt,[["render",qt]]);var jt=Ot,It={name:"PostFooter",components:{TotalComments:at,TotalLikes:ft,ActionButtons:Tt,TotalVotes:jt}};const Wt=(0,D.Z)(It,[["render",K]]);var Lt=Wt;const Rt=t=>((0,o.dD)("data-v-00bcd1f0"),t=t(),(0,o.Cn)(),t),Bt={key:0,class:"user-post"},Ht={class:"row g-2"},Ft=["onClick"],Yt=["src"],At={key:0,class:"overlay",role:"button"},Nt=Rt((()=>(0,o._)("span",{class:"material-symbols-outlined"}," add ",-1))),Vt=Rt((()=>(0,o._)("span",{class:"ms-1"}," المزيد",-1)));function Kt(t,e,s,a,n,i){return i.slicedMedia?((0,o.wg)(),(0,o.iD)("div",Bt,[(0,o._)("div",Ht,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.slicedMedia,((e,s)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,l.C_)(["position-relative",i.col]),key:e.path,onClick:(0,d.iM)((e=>t.$emit("showPostMedia",s)),["prevent"])},[(0,o._)("img",{src:e.path,alt:"post-image",class:"rounded w-100 h-100 post-image",style:{"object-fit":"cover"}},null,8,Yt),i.post.media?.length>i.slicedMedia.length&&s===i.slicedMedia.length-1?((0,o.wg)(),(0,o.iD)("div",At,[Nt,(0,o._)("span",null,(0,l.zw)(i.post.media?.length-i.slicedMedia.length),1),Vt])):(0,o.kq)("",!0)],10,Ft)))),128))])])):(0,o.kq)("",!0)}var Jt={name:"PostMedia",inject:["post"],emits:["showPostMedia"],computed:{col(){return this.post.media.length>1?"col-6":"col-12"},slicedMedia(){return this.post.media?this.post.media.slice(0,4):[]}}};const Et=(0,D.Z)(Jt,[["render",Kt],["__scopeId","data-v-00bcd1f0"]]);var Gt=Et;const Qt={key:0,class:"support-checkbox mt-3"},Xt={class:"d-flex justify-content-start align-items-center"},te=(0,o._)("label",{for:"support-checkbox",class:"form-check-label text-primary"},[(0,o._)("span",{class:"ms-1"}," أتعهد بأنني قرأت المنشور كاملاً ")],-1);function ee(t,e,s,a,n,i){return"support"===i.post.type.toLowerCase()?((0,o.wg)(),(0,o.iD)("div",Qt,[(0,o._)("div",Xt,[(0,o.wy)((0,o._)("input",{type:"checkbox",id:"support-checkbox",class:"form-check-input","onUpdate:modelValue":e[0]||(e[0]=t=>n.supported=t),onChange:e[1]||(e[1]=(...t)=>i.pledgeReadingPost&&i.pledgeReadingPost(...t)),style:{width:"18px",height:"18px",margin:"0"}},null,544),[[d.e8,n.supported]]),te])])):(0,o.kq)("",!0)}var se={name:"SupportSection",inject:{post:{required:!0}},data(){return{supported:!1}},created(){const t=JSON.parse(localStorage.getItem("pledges"));this.supported=!!t&&t[this.post.id]===this.$store.getters.getUser.id},methods:{pledgeReadingPost(t){const e=this.$store.getters.getUser.id;let s=localStorage.getItem("pledges");t.target.checked?s?(s=JSON.parse(s),s[this.post.id]&&s[this.post.id]===e||(s[this.post.id]=e,localStorage.setItem("pledges",JSON.stringify(s)))):localStorage.setItem("pledges",JSON.stringify({[this.post.id]:e})):s&&(s=JSON.parse(s),s[this.post.id]&&s[this.post.id]===e&&(delete s[this.post.id],localStorage.setItem("pledges",JSON.stringify(s))))}}};const oe=(0,D.Z)(se,[["render",ee]]);var ae=oe;const ne=(0,o._)("h4",null,"التعليقات",-1),ie={href:"javascript:void(0);",class:"lh-1","data-bs-dismiss":"modal",ref:"commentModalCloseBtn"},re=(0,o._)("span",{class:"material-symbols-outlined"},"close",-1),le=[re],de={class:"row"};function ce(t,e,s,a,n,i){const r=(0,o.up)("model-header"),l=(0,o.up)("LazyLoadedComments"),d=(0,o.up)("model-body"),c=(0,o.up)("CreateComment"),m=(0,o.up)("model-footer"),p=(0,o.up)("modal");return(0,o.wg)(),(0,o.j4)(p,{ref:"commentModalRef",id:`commentModal-${i.post.id}`,tabindex:"-1","aria-labelledby":`commentModalLabel-${i.post.id}`,"aria-hidden":!0,dialogClass:"modal-lg modal-dialog-centered modal-dialog-scrollable"},{default:(0,o.w5)((()=>[(0,o.Wm)(r,null,{default:(0,o.w5)((()=>[ne,(0,o._)("a",ie,le,512)])),_:1}),(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[(0,o._)("div",de,[(0,o.Wm)(l,{post:i.post,ref:"lazyLoadedCommentsRef"},null,8,["post"])])])),_:1}),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[i.post.allow_comments?((0,o.wg)(),(0,o.j4)(c,{key:0,type:"comment",class:"flex-grow-1",post_id:i.post.id,onAddComment:i.addComment},null,8,["post_id","onAddComment"])):(0,o.kq)("",!0)])),_:1})])),_:1},8,["id","aria-labelledby"])}var me=s(79909),pe=s(96648),ue=s(87026),ge={name:"CommentsModal",components:{CreateComment:pe.Z,LazyLoadedComments:ue.Z},inject:["post"],data(){return{commentModal:null}},mounted(){this.commentModal=new me.u_(this.$refs.commentModalRef.$el)},methods:{showCommentModel(){this.$refs.lazyLoadedCommentsRef.resetData(),this.commentModal.show()},addComment(t,e){this.$refs.lazyLoadedCommentsRef.addComment(t,e),e||this.$nextTick((()=>{const t=this.$refs.commentModalRef.$el,e=t.querySelector(".modal-body");e.scrollTop=e.scrollHeight}))}}};const he=(0,D.Z)(ge,[["render",ce]]);var we=he;const ye={href:"javascript:void(0);",class:"lh-1","data-bs-dismiss":"modal",ref:"galleryModalCloseBtn"},fe=(0,o._)("span",{class:"material-symbols-outlined"},"close",-1),_e=[fe],ve={class:"col-12"},be=["id"],Ce={class:"carousel-indicators"},ke=["data-bs-target","data-bs-slide-to","aria-current","aria-label"],Me={class:"carousel-inner h-100"},xe={class:"d-flex justify-content-center align-items-center h-100"},Pe=["src","alt"],Te=["data-bs-target"],De=(0,o._)("span",{class:"carousel-control-prev-icon","aria-hidden":"true"},null,-1),Ue=(0,o._)("span",{class:"visually-hidden"},"Previous",-1),$e=[De,Ue],Se=["data-bs-target"],Ze=(0,o._)("span",{class:"carousel-control-next-icon","aria-hidden":"true"},null,-1),qe=(0,o._)("span",{class:"visually-hidden"},"Next",-1),ze=[Ze,qe];function Oe(t,e,s,a,n,i){const r=(0,o.up)("model-header"),d=(0,o.up)("model-body"),c=(0,o.up)("modal");return(0,o.wg)(),(0,o.j4)(c,{ref:"galleryModalRef",id:`galleryModal-${i.post.id}`,dialogClass:"modal-lg modal-dialog-centered",tabindex:"-1","aria-labelledby":`galleryModalLabel-${i.post.id}`,"aria-hidden":!0},{default:(0,o.w5)((()=>[(0,o.Wm)(r,null,{default:(0,o.w5)((()=>[(0,o._)("a",ye,_e,512)])),_:1}),(0,o.Wm)(d,{style:{"background-color":"#eee"}},{default:(0,o.w5)((()=>[(0,o._)("div",ve,[(0,o._)("div",{id:`gallery-${i.post.id}`,class:"carousel slide carousel-dark","data-bs-ride":"carousel",style:{height:"60vh"}},[(0,o._)("div",Ce,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.post.media,((t,e)=>((0,o.wg)(),(0,o.iD)("button",{key:t.id,type:"button","data-bs-target":`#gallery-${i.post.id}`,"data-bs-slide-to":e,"aria-current":e===n.currentMediaIndex,"aria-label":`Slide ${e+1}`,class:(0,l.C_)({active:e===n.currentMediaIndex})},null,10,ke)))),128))]),(0,o._)("div",Me,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.post.media,((t,e)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,l.C_)(["carousel-item mx-auto h-100",{active:e===n.currentMediaIndex}]),key:t.id},[(0,o._)("div",xe,[(0,o._)("img",{src:t.path,class:"d-block h-100 img-fluid",alt:`Post Image ${e+1}`},null,8,Pe)])],2)))),128))]),(0,o._)("button",{class:"carousel-control-prev",type:"button","data-bs-target":`#gallery-${i.post.id}`,"data-bs-slide":"next"},$e,8,Te),(0,o._)("button",{class:"carousel-control-next",type:"button","data-bs-target":`#gallery-${i.post.id}`,"data-bs-slide":"prev"},ze,8,Se)],8,be)])])),_:1})])),_:1},8,["id","aria-labelledby"])}var je={name:"PostMediaModal",inject:["post"],data(){return{galleryModal:null,currentMediaIndex:0}},mounted(){this.galleryModal=new me.u_(this.$refs.galleryModalRef.$el)},methods:{showPostMedia(t){this.galleryModal.show(),this.currentMediaIndex=t}}};const Ie=(0,D.Z)(je,[["render",Oe]]);var We=Ie,Le={name:"Post",components:{PostHeader:$,PostBody:F,CommentsModal:we,PostMediaModal:We,PostMedia:Gt,PostFooter:Lt,SupportSection:ae},provide(){return{post:this.post,showCommentModel:this.showCommentModel}},inject:{focusComment:{default:()=>{}}},props:{post:{type:Object,required:!0},showPin:{type:Boolean,default:!1}},methods:{resolve_img_url:function(t){let e=s(20398);return e("./"+t)},showCommentModel(){if("support"===this.post.type.toLowerCase()){const t=JSON.parse(localStorage.getItem("pledges")),e=!!t&&t[this.post.id]===this.$store.getters.getUser.id;if(!e)return void M.Z.toggleToast("يجب أن تتعهد بأنك قرأت المنشور كاملاً","warning")}this.focusComment?this.focusComment():this.$refs.commentModal.showCommentModel()},showPostMedia(t){this.$refs.postMediaModal.showPostMedia(t)}}};const Re=(0,D.Z)(Le,[["render",r]]);var Be=Re},55631:function(t,e,s){s.d(e,{Z:function(){return _}});var o=s(66252),a=s(3577),n=s(49963);const i=t=>((0,o.dD)("data-v-6c2e2c75"),t=t(),(0,o.Cn)(),t),r={class:"mx-2 flex-grow-1"},l={class:"author-friends p-0 m-0"},d={class:"mx-1"},c=i((()=>(0,o._)("span",{class:"mx-1"}," مع ",-1))),m=["onClick"],p={key:0,class:"mx-1"},u={key:1};function g(t,e,s,i,g,h){const w=(0,o.up)("UserAvatar");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(w,{profileImg:h.userProfile?.profile_picture,profile_id:h.userProfile?.id,title:s.post.user?.name,gender:s.post.user?.gender,avatarClass:"avatar-50 rounded-circle"},null,8,["profileImg","profile_id","title","gender"]),(0,o._)("div",r,[(0,o._)("div",l,[(0,o._)("span",{class:(0,a.C_)(["author-name",{"hover-undelined":h.authUser.id!=s.post.user?.id}]),role:"button",onClick:e[0]||(e[0]=(0,n.iM)((t=>h.authUser.id!=s.post.user?.id?h.sendToProfile(s.post.user?.id):null),["prevent"]))},(0,a.zw)(s.post.user?.name),3),s.post.timeline&&(s.post.timeline.user&&s.post.timeline.user.id!=s.post.user?.id||s.post.timeline.group)?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o._)("span",d,(0,a.zw)(s.post.timeline.user?"عند":"في"),1),s.post.timeline.user&&s.post.timeline.user.id!=s.post.user?.id?((0,o.wg)(),(0,o.iD)("span",{key:0,class:"author-name hover-undelined",role:"button",onClick:e[1]||(e[1]=(0,n.iM)((t=>h.sendToProfile(s.post.timeline?.user?.id)),["prevent"]))},(0,a.zw)(s.post.timeline.user.name??""),1)):s.post.timeline.group?((0,o.wg)(),(0,o.iD)("span",{key:1,class:"author-name hover-undelined",role:"button",onClick:e[2]||(e[2]=(0,n.iM)((t=>h.sendToGroup(s.post.timeline.group.id)),["prevent"]))},(0,a.zw)(s.post.timeline.group.name??""),1)):(0,o.kq)("",!0)],64)):(0,o.kq)("",!0),s.post.taggedUsers?.length?((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[c,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(h.slicedTaggedFriends,((i,r)=>((0,o.wg)(),(0,o.iD)("span",{key:i.id},[(0,o._)("span",{class:"author-name hover-undelined",role:"button",onClick:(0,n.iM)((t=>h.sendToProfile(i.user.id)),["prevent"])},(0,a.zw)(i.user?.name??""),9,m),r!==h.slicedTaggedFriends.length-1||s.post.taggedUsers?.length>h.slicedTaggedFriends.length?((0,o.wg)(),(0,o.iD)("span",p,"و")):(0,o.kq)("",!0),r===h.slicedTaggedFriends.length-1?((0,o.wg)(),(0,o.iD)("span",u,[s.post.taggedUsers?.length>h.slicedTaggedFriends.length?((0,o.wg)(),(0,o.iD)("span",{key:0,class:"author-name hover-undelined",role:"button",onClick:e[3]||(e[3]=(0,n.iM)(((...e)=>t.getFriends&&t.getFriends(...e)),["prevent"]))},(0,a.zw)(s.post.taggedUsers?.length-h.slicedTaggedFriends.length)+" أكثر",1)):(0,o.kq)("",!0)])):(0,o.kq)("",!0)])))),128))],64)):(0,o.kq)("",!0)]),(0,o.WI)(t.$slots,"date",{},void 0,!0)])],64)}var h=s(79365),w={name:"PostUser",components:{UserAvatar:h.Z},props:{post:{type:Object,required:!0}},computed:{slicedTaggedFriends(){return this.post.taggedUsers?.slice(0,3)},profile_picture(){const t=s(29822),e=s(48934),o=this.post.user?.gender?.toLowerCase();return"female"===o?t:e},authUser(){return this.$store.getters.getUser},userProfile(){return this.post?.user?.profile??this.post?.user?.user_profile}},methods:{sendToProfile(t){this.$router.push({name:"user.profile",params:{user_id:t}})},sendToGroup(t){this.$router.push({name:"group.group-detail",params:{group_id:t}})}}},y=s(83744);const f=(0,y.Z)(w,[["render",g],["__scopeId","data-v-6c2e2c75"]]);var _=f},29822:function(t,e,s){t.exports=s.p+"img/avatar-04.f7603e1d.jpg"},48934:function(t,e,s){t.exports=s.p+"img/avatar-05.5d33d3c7.jpg"}}]);
//# sourceMappingURL=525.c1cf472c.js.map