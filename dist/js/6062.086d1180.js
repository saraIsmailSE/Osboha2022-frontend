"use strict";(self["webpackChunkOsboha180"]=self["webpackChunkOsboha180"]||[]).push([[6062],{96444:function(e,t,n){var a=n(66252),i=n(24150);class s{async getAllFriends(e){try{const t=await i.hi.get(`friends/user/${e}`);return t.data.data}catch(t){(0,a.S3)(t)}}async getFriendsRequests(){try{const e=await i.hi.get("/friends/un-accepted");return e.data.data}catch(e){(0,a.S3)(e)}}async create(e){try{return await i.hi.post("/friends/create",{friend_id:e})}catch(t){(0,a.S3)(t)}}async getFriendshipById(e){try{const t=await i.hi.post("/friends/show",{friendship_id:e});return t.data}catch(t){(0,a.S3)(t)}}async accept(e){try{const t=await i.hi.get(`/friends/accept/${e}`);return t.data}catch(t){(0,a.S3)(t)}}async delete(e,t){const n=new FormData;n.append("user_id",e),n.append("friend_id",t);try{const e=await i.hi.post("/friends/delete",n);return e.data}catch(s){(0,a.S3)(s)}}}t["Z"]=new s},2933:function(e,t,n){var a=n(24150);class i{resolve_porfile_img(e,t,n){let i=e+"_"+t;const s=`${a.v2}/profile-image/${n}/${i}`;return s}}t["Z"]=new i},4521:function(e,t,n){n.r(t),n.d(t,{default:function(){return R}});var a=n(66252),i=n(3577),s=n.p+"img/no-friend-req.36ea3495.png";const r={class:"row"},l={class:"col-sm-12"},o=(0,a._)("h4",{class:"card-title"},"طلبات الصداقة",-1),c={key:0,class:"request-request request-inline m-0 p-0"},d={class:"user-img img-fluid flex-shrink-0"},u=["src","title"],m=["src","title"],p={class:"flex-grow-1 ms-3"},_={class:"d-flex align-items-center mt-2 mt-md-0"},f={class:"confirm-click-btn"},h=["onClick"],g=(0,a._)("span",{class:"material-symbols-outlined md-18 me-1"}," person_add ",-1),w=(0,a._)("a",{href:"@/app/profile.html",class:"me-3 btn btn-primary rounded request-btn",style:{display:"none"}},null,-1),b=["onClick"],y={key:0,class:"d-block text-center mb-0 pb-0"},q={key:1,class:"col-sm-12"},k=(0,a._)("div",{class:"iq-card-body p-0"},[(0,a._)("div",{class:"image-block text-center"},[(0,a._)("img",{src:s,class:"img-fluid rounded w-50",alt:"blog-img"})]),(0,a._)("h4",{class:"text-center mt-3 mb-3"},"لا يوجد طلبات صداقة")],-1);function v(e,t,n,s,v,x){const C=(0,a.up)("router-link"),B=(0,a.up)("iq-card");return(0,a.wg)(),(0,a.iD)("div",r,[(0,a._)("div",l,[(0,a.Wm)(B,null,{headerTitle:(0,a.w5)((()=>[o])),body:(0,a.w5)((()=>[x.requestsLoaded.length>0?((0,a.wg)(),(0,a.iD)("ul",c,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(x.requestsLoaded,((e,t)=>((0,a.wg)(),(0,a.iD)("li",{class:"d-flex align-items-center justify-content-between flex-wrap",key:t},[(0,a._)("div",d,[e.user.user_profile.profile_picture?((0,a.wg)(),(0,a.iD)("img",{key:0,src:x.resolve_porfile_img("60x60",e.user.user_profile.profile_picture,e.user.user_profile.id),alt:"profile-img",class:"rounded-circle avatar-40",title:e.name},null,8,u)):((0,a.wg)(),(0,a.iD)("img",{key:1,src:x.resolve_porfile_img("60x60","ananimous_"+e.user.gender+".png","ananimous"),alt:"profile-img",title:e.name,class:"rounded-circle avatar-40"},null,8,m))]),(0,a._)("div",p,[(0,a.Wm)(C,{to:{name:"user.profile",params:{user_id:e.user.id}}},{default:(0,a.w5)((()=>[(0,a._)("h6",null,(0,i.zw)(e.user.name),1)])),_:2},1032,["to"])]),(0,a._)("div",_,[(0,a._)("div",f,[(0,a._)("a",{role:"button",class:"me-3 btn btn-primary rounde d-flex align-items-center",onClick:t=>x.acceptrequest(e.id)},[g,(0,a.Uk)(" قبول ")],8,h),w]),(0,a._)("a",{role:"button",class:"btn btn-secondary rounded","data-extra-toggle":"delete","data-closest-elem":".item",onClick:t=>x.deleterequest(e.user_id,e.friend_id)},"حذف",8,b)])])))),128)),v.friendRequest.length>v.length?((0,a.wg)(),(0,a.iD)("li",y,[(0,a._)("a",{class:"me-3 btn",role:"button",onClick:t[0]||(t[0]=e=>x.loadMore())},"عرض المزيد")])):(0,a.kq)("",!0)])):((0,a.wg)(),(0,a.iD)("div",q,[(0,a.Wm)(B,{class:"iq-card"},{default:(0,a.w5)((()=>[k])),_:1})]))])),_:1})])])}var x=n(96444),C=n(2933),B={name:"FriendRequest",async created(){this.friendRequest=await x.Z.getFriendsRequests()},data(){return{friendRequest:[],length:10}},methods:{resolve_porfile_img(e,t,n){return C.Z.resolve_porfile_img(e,t,n)},acceptrequest(e){const t=this.$swal.mixin({customClass:{confirmButton:"btn btn-primary btn-lg",cancelButton:"btn btn-outline-primary btn-lg ms-2"},buttonsStyling:!1});t.fire({title:"هل أنت متأكد؟",text:"لا يمكنك التراجع عن هذا الاجراء",icon:"warning",showCancelButton:!0,confirmButtonText:"نعم، قم بالقبول",cancelButtonText:"تراجع  ",showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}}).then((n=>{n.isConfirmed&&x.Z.accept(e).then((e=>{t.fire({title:"تم القبول",text:"تم قبول طلب الصداقة",icon:"success",showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}}),setTimeout((function(){location.reload(!0)}),2e3)})).catch((e=>{console.log(e)}))}))},deleterequest(e,t){const n=this.$swal.mixin({customClass:{confirmButton:"btn btn-primary btn-lg",cancelButton:"btn btn-outline-primary btn-lg ms-2"},buttonsStyling:!1});n.fire({title:"هل أنت متأكد؟",text:"لا يمكنك التراجع عن هذا الاجراء",icon:"warning",showCancelButton:!0,confirmButtonText:"نعم، قم بالحذف",cancelButtonText:"تراجع  ",showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}}).then((a=>{a.isConfirmed&&x.Z["delete"](e,t).then((e=>{n.fire({title:"تم الحذف",text:"تم حذف طلب الصداقة",icon:"success",showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}}),setTimeout((function(){location.reload(!0)}),2e3)})).catch((e=>{console.log(e)}))}))},loadMore(){this.length>this.friendRequest.length||(this.length=this.length+10)}},computed:{requestsLoaded(){return this.friendRequest.slice(0,this.length)}}},z=n(83744);const D=(0,z.Z)(B,[["render",v]]);var R=D}}]);
//# sourceMappingURL=6062.086d1180.js.map