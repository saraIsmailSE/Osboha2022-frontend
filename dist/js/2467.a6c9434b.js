"use strict";(self["webpackChunkOsboha180"]=self["webpackChunkOsboha180"]||[]).push([[2467],{81716:function(t,i,s){s.d(i,{Z:function(){return h}});var e=s(66252);
/*! vue-countdown v2.1.1 | (c) 2018-present Chen Fengyuan | MIT */const a=1e3,n=60*a,r=60*n,o=24*r,l="abort",c="end",d="progress",u="start",m="visibilitychange";var h=(0,e.aZ)({name:"VueCountdown",props:{autoStart:{type:Boolean,default:!0},emitEvents:{type:Boolean,default:!0},interval:{type:Number,default:1e3,validator:t=>t>=0},now:{type:Function,default:()=>Date.now()},tag:{type:String,default:"span"},time:{type:Number,default:0,validator:t=>t>=0},transform:{type:Function,default:t=>t}},emits:[l,c,d,u],data(){return{counting:!1,endTime:0,totalMilliseconds:0,requestId:0}},computed:{days(){return Math.floor(this.totalMilliseconds/o)},hours(){return Math.floor(this.totalMilliseconds%o/r)},minutes(){return Math.floor(this.totalMilliseconds%r/n)},seconds(){return Math.floor(this.totalMilliseconds%n/a)},milliseconds(){return Math.floor(this.totalMilliseconds%a)},totalDays(){return this.days},totalHours(){return Math.floor(this.totalMilliseconds/r)},totalMinutes(){return Math.floor(this.totalMilliseconds/n)},totalSeconds(){return Math.floor(this.totalMilliseconds/a)}},watch:{$props:{deep:!0,immediate:!0,handler(){this.totalMilliseconds=this.time,this.endTime=this.now()+this.time,this.autoStart&&this.start()}}},mounted(){document.addEventListener(m,this.handleVisibilityChange)},beforeUnmount(){document.removeEventListener(m,this.handleVisibilityChange),this.pause()},methods:{start(){this.counting||(this.counting=!0,this.emitEvents&&this.$emit(u),"visible"===document.visibilityState&&this.continue())},continue(){if(!this.counting)return;const t=Math.min(this.totalMilliseconds,this.interval);if(t>0){let i,s;const e=a=>{i||(i=a),s||(s=a);const n=a-i;n>=t||n+(a-s)/2>=t?this.progress():this.requestId=requestAnimationFrame(e),s=a};this.requestId=requestAnimationFrame(e)}else this.end()},pause(){cancelAnimationFrame(this.requestId)},progress(){this.counting&&(this.update(),this.emitEvents&&this.totalMilliseconds>0&&this.$emit(d,{days:this.days,hours:this.hours,minutes:this.minutes,seconds:this.seconds,milliseconds:this.milliseconds,totalDays:this.totalDays,totalHours:this.totalHours,totalMinutes:this.totalMinutes,totalSeconds:this.totalSeconds,totalMilliseconds:this.totalMilliseconds}),this.continue())},abort(){this.counting&&(this.pause(),this.counting=!1,this.emitEvents&&this.$emit(l))},end(){this.counting&&(this.pause(),this.totalMilliseconds=0,this.counting=!1,this.emitEvents&&this.$emit(c))},update(){this.counting&&(this.totalMilliseconds=Math.max(0,this.endTime-this.now()))},restart(){this.pause(),this.totalMilliseconds=this.time,this.endTime=this.now()+this.time,this.counting=!1,this.start()},handleVisibilityChange(){switch(document.visibilityState){case"visible":this.update(),this.continue();break;case"hidden":this.pause();break}}},render(){return(0,e.h)(this.tag,this.$slots.default?[this.$slots.default(this.transform({days:this.days,hours:this.hours,minutes:this.minutes,seconds:this.seconds,milliseconds:this.milliseconds,totalDays:this.totalDays,totalHours:this.totalHours,totalMinutes:this.totalMinutes,totalSeconds:this.totalSeconds,totalMilliseconds:this.totalMilliseconds}))]:void 0)}})},89809:function(t,i,s){var e=s(24150),a=s(49579),n=s(66252);class r{async login({username:t,password:i}){try{const s=e.hi.post("/auth/signin",{username:t,password:i});return s.data.accessToken&&a.Z.setUser(s.date),s.data}catch(s){console.log(s)}}async assignRole(t){try{const i=await e.hi.post("assign-role",t);return i.data.data}catch(i){return i.response}}logout(){a.Z.removeUser()}async register(t,i,s,a,n,r){return await e.hi.post("/register",{name:t,gender:i,email:s,phone:a,password:n,user_type:r})}async sendEmail(){let t=null;const i=await e.hi.post("email/verification-notification").catch((t=>{t=t.response.data.message}));return{data:i.data,error:t}}async resetPassword(t,i,s){let a=new FormData;a.append("password",t),a.append("email",i),a.append("token",s);try{const t=await e.hi.post("password/reset",a);return t.data}catch(n){return n.response}}async forgetPassword(t){try{const i=await e.hi.post("password/forgot-password",{email:t});return i.data}catch(i){return i.response}}async sessionData(){try{const t=await e.hi.get("session-data");return t.data.data}catch(t){return t.response}}async refreshToken(){try{const t=await e.hi.post("/refresh");return t.data.data}catch(t){(0,n.S3)(t)}}}i["Z"]=new r},82165:function(t,i,s){s.d(i,{Z:function(){return rt}});var e=s(66252),a=s(3577);const n={class:"sidebar-body pt-0 data-scrollbar"},r={class:"sidebar-list"},o=(0,e._)("div",{class:"sidebar-footer"},null,-1);function l(t,i,s,l,c,d){const u=(0,e.up)("vertical-nav");return(0,e.wg)(),(0,e.iD)("aside",{class:(0,a.C_)(`sidebar sidebar-default ${l.sidebarMenuStyle} ${l.sidebarType.join(" ")}`),id:"first-tour","data-toggle":"main-sidebar","data-sidebar":"responsive"},[(0,e._)("div",n,[(0,e._)("div",r,[(0,e.Wm)(u)])]),o],2)}const c=(0,e._)("li",{class:"nav-item static-item"},[(0,e._)("a",{class:"nav-link static-item disabled",tabindex:"-1"},[(0,e._)("span",{class:"default-icon"},"القائمة الرئيسية"),(0,e._)("span",{class:"mini-icon","data-bs-toggle":"tooltip",title:"Social","data-bs-placement":"right"},"-")])],-1),d={class:"nav-item"},u=(0,e._)("i",{class:"icon material-symbols-outlined"}," newspaper ",-1),m=(0,e._)("span",{class:"item-name"},"الرئيسية",-1),h={class:"nav-item"},g=(0,e._)("i",{class:"icon material-symbols-outlined"}," person ",-1),p=(0,e._)("span",{class:"user.profile"},"الملف الشخصي",-1),b={class:"nav-item"},v=(0,e._)("i",{class:"icon material-symbols-outlined"}," diversity_1 ",-1),_=(0,e._)("span",{class:"user.profile"},"طلبات الصداقة",-1),y={class:"nav-item"},w=(0,e._)("i",{class:"icon material-symbols-outlined"}," groups ",-1),f=(0,e._)("span",{class:"item-name"},"المجموعات ",-1),k={class:"nav-item"},S=(0,e._)("i",{class:"icon material-symbols-outlined"}," book ",-1),M=(0,e._)("span",{class:"item-name"},"الكتب",-1),C={class:"nav-item"},D=(0,e._)("i",{class:"icon material-symbols-outlined"}," announcement ",-1),A=(0,e._)("span",{class:"item-name"},"الإعلانات",-1),W={class:"nav-item"},q=(0,e._)("i",{class:"icon material-symbols-outlined"}," heart_plus ",-1),x=(0,e._)("span",{class:"item-name"},"اعرف مشروعك",-1),B={key:0,class:"nav-item static-item"},L=(0,e._)("a",{class:"nav-link static-item disabled",tabindex:"-1"},[(0,e._)("span",{class:"default-icon"},"تدقيق العلامات"),(0,e._)("span",{class:"mini-icon","data-bs-toggle":"tooltip",title:"Social","data-bs-placement":"right"},"-")],-1),R=[L],Z={key:1,class:"nav-item"},T=(0,e._)("i",{class:"icon material-symbols-outlined"}," rule ",-1),$=(0,e._)("span",{class:"item-name"},"تدقيق المجموعات",-1),E={key:2,class:"nav-item"},F=(0,e._)("i",{class:"icon material-symbols-outlined"}," rule ",-1),z=(0,e._)("span",{class:"item-name"},"تدقيق المراقبين",-1),I=(0,e._)("li",{class:"nav-item static-item"},[(0,e._)("a",{class:"nav-link static-item disabled",tabindex:"-1"},[(0,e._)("span",{class:"default-icon"},"التحكم بالمجموعات"),(0,e._)("span",{class:"mini-icon","data-bs-toggle":"tooltip",title:"Social","data-bs-placement":"right"},"-")])],-1),j={class:"nav-item"},H=(0,e._)("i",{class:"icon material-symbols-outlined"}," list_alt ",-1),O=(0,e._)("span",{class:"item-name"},"عرض المجموعات",-1),U={class:"nav-item"},V=(0,e._)("i",{class:"icon material-symbols-outlined"}," list_alt_add ",-1),N=(0,e._)("span",{class:"item-name"},"اضافة مجموعة",-1),P={class:"nav-item"},G=(0,e._)("i",{class:"icon material-symbols-outlined"}," assignment_ind ",-1),Y=(0,e._)("span",{class:"item-name"},"ترقية ",-1);function J(t,i,s,n,r,o){const l=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("ul",{class:"navbar-nav iq-main-menu",id:"sidebar-menu",onClick:i[0]||(i[0]=(...t)=>n.toggleSidebar&&n.toggleSidebar(...t))},[c,(0,e._)("li",d,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("osboha.list")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"osboha.list"}},{default:(0,e.w5)((()=>[u,m])),_:1},8,["class","to"])]),(0,e._)("li",h,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("user.profile")?"active nav-link":"nav-link"),to:{name:"user.profile",params:{user_id:o.user.id}}},{default:(0,e.w5)((()=>[g,p])),_:1},8,["class","to"])]),(0,e._)("li",b,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("user.friendsRequests")?"active nav-link":"nav-link"),to:{name:"user.friendsRequests",params:{user_id:o.user.id}}},{default:(0,e.w5)((()=>[v,_])),_:1},8,["class","to"])]),(0,e._)("li",y,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("osboha.group")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"osboha.group"}},{default:(0,e.w5)((()=>[w,f])),_:1},8,["class","to"])]),(0,e._)("li",k,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("osboha.book")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"osboha.book"}},{default:(0,e.w5)((()=>[S,M])),_:1},8,["class","to"])]),(0,e._)("li",C,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("osboha.announcement")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"osboha.announcement"}},{default:(0,e.w5)((()=>[D,A])),_:1},8,["class","to"])]),(0,e._)("li",W,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("osboha.support")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"osboha.support"}},{default:(0,e.w5)((()=>[q,x])),_:1},8,["class","to"])]),o.isAdvisor||o.isSupervisor?((0,e.wg)(),(0,e.iD)("li",B,R)):(0,e.kq)("",!0),o.isSupervisor?((0,e.wg)(),(0,e.iD)("li",Z,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("group.groupsAudit")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"group.groupsAudit",params:{supervisor_id:o.user.id}}},{default:(0,e.w5)((()=>[T,$])),_:1},8,["class","to"])])):(0,e.kq)("",!0),o.isAdvisor?((0,e.wg)(),(0,e.iD)("li",E,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("group.AdvisorAudit")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"group.AdvisorAudit",params:{advisor_id:o.user.id}}},{default:(0,e.w5)((()=>[F,z])),_:1},8,["class","to"])])):(0,e.kq)("",!0),o.advisorAndAbove?((0,e.wg)(),(0,e.iD)(e.HY,{key:3},[I,(0,e._)("li",j,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("osboha.groupsList")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"osboha.groupsList"}},{default:(0,e.w5)((()=>[H,O])),_:1},8,["class","to"])]),(0,e._)("li",U,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("group.addGroup")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"group.addGroup"}},{default:(0,e.w5)((()=>[V,N])),_:1},8,["class","to"])]),(0,e._)("li",P,[(0,e.Wm)(l,{class:(0,a.C_)(o.checkActive("user.assignRole")?"active nav-link":"nav-link"),"aria-current":"page",to:{name:"user.assignRole"}},{default:(0,e.w5)((()=>[G,Y])),_:1},8,["class","to"])])],64)):(0,e.kq)("",!0)])}var K=s(33907),Q=s(49579),X={name:"DefaultSidebar",computed:{user(){return this.$store.getters.getUser},isAdvisor(){return Q.Z.hasRole(this.user,"advisor")},isSupervisor(){return Q.Z.hasRole(this.user,"supervisor")},advisorAndAbove(){return Q.Z.hasRoles(this.user,["admin","consultant","advisor"])}},setup(){const t=(0,K.oR)(),i=(0,e.Fl)((()=>t.getters["setting/sidebar_type"])),s=()=>{i.value.includes("sidebar-mini")?t.dispatch("setting/sidebar_type",i.value.filter((t=>"sidebar-mini"!==t))):t.dispatch("setting/sidebar_type",[...i.value,"sidebar-mini"])};return{store:t,sidebarType:i,toggleSidebar:s}},methods:{checkActive(t){if(this.$route.name===t)return!0}}},tt=s(83744);const it=(0,tt.Z)(X,[["render",J]]);var st=it,et=s(53881),at={name:"DefaultSidebar",components:{VerticalNav:st},created(){this.toggleSidebar()},setup(){const t=(0,K.oR)(),i=(0,e.Fl)((()=>t.getters["setting/sidebar_type"])),s=(0,e.Fl)((()=>t.getters["setting/sidebar_menu_style"])),a=()=>{i.value.includes("sidebar-mini")?t.dispatch("setting/sidebar_type",i.value.filter((t=>"sidebar-mini"!==t))):t.dispatch("setting/sidebar_type",[...i.value,"sidebar-mini"])};return(0,e.bv)((()=>{et.Z.init(document.querySelector(".data-scrollbar"),{continuousScrolling:!1});const t=()=>{const t=document.querySelector('[data-sidebar="responsive"]');window.innerWidth<1025?null!==t&&(t.classList.contains("sidebar-mini")||t.classList.add("sidebar-mini","on-resize")):null!==t&&t.classList.contains("sidebar-mini")&&t.classList.contains("on-resize")&&t.classList.remove("sidebar-mini","on-resize")};document.addEventListener("DOMContentLoaded",(i=>{t()})),window.addEventListener("resize",(function(i){t()}))})),{sidebarType:i,sidebarMenuStyle:s,toggleSidebar:a}}};const nt=(0,tt.Z)(at,[["render",l]]);var rt=nt},66555:function(t,i,s){s.r(i),s.d(i,{default:function(){return Bt}});var e=s(66252),a=s(49963);const n={id:"loading"},r={class:"main-content"},o={class:"position-relative"},l={id:"content-page",class:"content-page"},c={class:"container"},d={key:0};function u(t,i,s,u,m,h){const g=(0,e.up)("loader"),p=(0,e.up)("DefaultSidebar"),b=(0,e.up)("DefaultHeader"),v=(0,e.up)("breadcrumb"),_=(0,e.up)("router-view"),y=(0,e.up)("DefaultFooter"),w=(0,e.up)("CurrentReading"),f=(0,e.up)("ReadingTeam"),k=(0,e.up)("Timer");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e._)("div",n,[(0,e.Wm)(g)]),(0,e.Wm)(p),(0,e.Wm)(b,{image:m.logoimage},null,8,["image"]),(0,e._)("div",r,[(0,e._)("div",o,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(m.breadcrumboptions,((t,i)=>(0,e.wy)(((0,e.wg)(),(0,e.j4)(v,{key:i,img:t.img,title:t.title},null,8,["img","title"])),[[a.F8,this.$route.meta.name===t.title]]))),128))]),(0,e._)("div",l,[(0,e._)("div",c,[(0,e.Wm)(_,null,{default:(0,e.w5)((({Component:t})=>[(0,e.Wm)(a.uT,{name:"fade"},{default:(0,e.w5)((()=>[((0,e.wg)(),(0,e.j4)((0,e.LL)(t)))])),_:2},1024)])),_:1})])]),(0,e.Wm)(y),m.sessionData?((0,e.wg)(),(0,e.iD)("div",d,[(0,e.Wm)(w,{book_in_progress:m.sessionData.book_in_progress,progress:m.sessionData.progress},null,8,["book_in_progress","progress"]),(0,e.Wm)(f,{reading_team:m.sessionData.reading_team},null,8,["reading_team"]),(0,e.Wm)(k,{timer:m.sessionData.timer},null,8,["timer"])])):(0,e.kq)("",!0)])],64)}var m=s(82165),h=s(96592),g=s(96925),p=s(3577),b=s(92021);const v=t=>((0,e.dD)("data-v-72354ed8"),t=t(),(0,e.Cn)(),t),_={class:"right-sidebar-panel p-0"},y={class:"card shadow-none"},w={class:"card-body p-0"},f={class:"media-height p-2","data-scrollbar":"init"},k={class:"card d-flex align-items-center mb-4"},S=v((()=>(0,e._)("img",{src:b,class:"card-img-top",alt:"current reading"},null,-1))),M={key:0,class:"card-body w-100"},C={key:0,class:"progress mb-3"},D=v((()=>(0,e._)("h4",{class:"card-title"},"املأ مخزون ثقافتك",-1))),A={class:"card-text"},W={key:1,class:"card-body w-100"},q=v((()=>(0,e._)("h4",{class:"card-title"},"لا يوجد كتب",-1))),x=v((()=>(0,e._)("span",{class:"material-symbols-outlined"}," auto_stories ",-1))),B=[x];function L(t,i,s,a,n,r){const o=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",{class:(0,p.C_)(`right-sidebar-mini  ${n.miniClass} data-scrollbar`)},[(0,e._)("div",_,[(0,e._)("div",y,[(0,e._)("div",w,[(0,e._)("div",f,[(0,e._)("div",k,[S,s.book_in_progress?((0,e.wg)(),(0,e.iD)("div",M,[s.progress?((0,e.wg)(),(0,e.iD)("div",C,[(0,e._)("div",{class:"progress-bar progress-bar-striped bg-primary",role:"progressbar","aria-valuenow":"90","aria-valuemin":"0","aria-valuemax":"100",style:(0,p.j5)(`width: ${Math.trunc(s.progress)}%;`)},null,4)])):(0,e.kq)("",!0),D,(0,e._)("p",A,(0,p.zw)(s.book_in_progress.name),1),(0,e.Wm)(o,{class:"btn btn-primary w-100",to:{name:"book.book-details",params:{book_id:s.book_in_progress.id}}},{default:(0,e.w5)((()=>[(0,e.Uk)(" متابعة ")])),_:1},8,["to"])])):((0,e.wg)(),(0,e.iD)("div",W,[q,(0,e.Wm)(o,{class:"btn btn-primary w-100",to:{name:"osboha.book"}},{default:(0,e.w5)((()=>[(0,e.Uk)(" ابدأ الأن ")])),_:1},8,["to"])]))])]),(0,e._)("div",{class:"right-sidebar-toggle bg-primary text-white mt-3 d-flex",onClick:i[0]||(i[0]=(...t)=>r.toggleMini&&r.toggleMini(...t))},B)])])])],2)}var R={name:"CurrentReading",props:{book_in_progress:{type:[Object],required:!0},progress:{type:[Number],required:!0}},data(){return{miniClass:"right-sidebar",rightSideBarMini:!0}},methods:{toggleMini(){this.rightSideBarMini=!this.rightSideBarMini,this.checkRightSideBar()},checkRightSideBar(){const t=document.querySelector("body");this.rightSideBarMini?(this.miniClass="right-sidebar",t.classList.add("right-sidebar-close")):(this.miniClass="",t.classList.remove("right-sidebar-close"))}}},Z=s(83744);const T=(0,Z.Z)(R,[["render",L],["__scopeId","data-v-72354ed8"]]);var $=T,E=s.p+"img/team.77797c9b.png";const F=t=>((0,e.dD)("data-v-2cec4174"),t=t(),(0,e.Cn)(),t),z={class:"right-sidebar-panel p-0"},I={class:"card shadow-none"},j={class:"card-body p-0"},H={class:"media-height p-2","data-scrollbar":"init"},O={class:"card d-flex align-items-center mb-4"},U=F((()=>(0,e._)("img",{src:E,class:"card-img-top",alt:"current reading"},null,-1))),V={key:0,class:"card-body w-100"},N={class:"card-title",style:{direction:"rtl"}},P={key:1,class:"card-body w-100"},G=F((()=>(0,e._)("h4",{class:"card-title"},"لست في أي فريق",-1))),Y=[G],J=F((()=>(0,e._)("span",{class:"material-symbols-outlined"}," diversity_3 ",-1))),K=[J];function Q(t,i,s,a,n,r){const o=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",{class:(0,p.C_)(`right-sidebar-mini ${n.miniClass} data-scrollbar right-sidebar-team`)},[(0,e._)("div",z,[(0,e._)("div",I,[(0,e._)("div",j,[(0,e._)("div",H,[(0,e._)("div",O,[U,s.reading_team?((0,e.wg)(),(0,e.iD)("div",V,[(0,e._)("h4",N," فريق المتابعة: "+(0,p.zw)(s.reading_team.group.name),1),(0,e.Wm)(o,{class:"btn btn-primary w-100",to:{name:"group.group-detail",params:{group_id:s.reading_team.group.id}}},{default:(0,e.w5)((()=>[(0,e.Uk)("مشاهدة ")])),_:1},8,["to"])])):((0,e.wg)(),(0,e.iD)("div",P,Y))])]),(0,e._)("div",{class:"right-sidebar-toggle text-white mt-3 d-flex toggel-btn",onClick:i[0]||(i[0]=(...t)=>r.toggleMini&&r.toggleMini(...t))},K)])])])],2)}var X={name:"ReadingTeam",created(){},props:{reading_team:{type:[Object],required:!0}},data(){return{miniClass:"right-sidebar",rightSideBarMini:!0}},methods:{toggleMini(){this.rightSideBarMini=!this.rightSideBarMini,this.checkRightSideBar()},checkRightSideBar(){const t=document.querySelector("body");this.rightSideBarMini?(this.miniClass="right-sidebar",t.classList.add("right-sidebar-close")):(this.miniClass="",t.classList.remove("right-sidebar-close"))}}};const tt=(0,Z.Z)(X,[["render",Q],["__scopeId","data-v-2cec4174"]]);var it=tt,st=s.p+"img/left-timer.96b16054.png";const et=t=>((0,e.dD)("data-v-28cb4139"),t=t(),(0,e.Cn)(),t),at={class:"right-sidebar-panel p-0"},nt={class:"card shadow-none"},rt={class:"card-body p-0"},ot={class:"media-height p-2","data-scrollbar":"init"},lt={class:"card d-flex align-items-center mb-4"},ct=et((()=>(0,e._)("img",{src:st,class:"card-img-top",alt:"current reading"},null,-1))),dt={key:0,class:"card-body row d-flex justify-content-center card-shadow"},ut={class:"card-title",style:{direction:"rtl"}},mt={class:"text-center w-100",style:{direction:"rtl !important"}},ht={class:"font-weight-bold display-6 border-bottom"},gt=et((()=>(0,e._)("tbody",null,[(0,e._)("tr",null,[(0,e._)("td",{class:"w-25"},"ثانية"),(0,e._)("td",{class:"w-25"},"دقيقة"),(0,e._)("td",{class:"w-25"},"ساعة"),(0,e._)("td",{class:"w-25"},"يوم")])],-1))),pt={key:1,class:"card-body row d-flex justify-content-center card-shadow"},bt={class:"card-title",style:{direction:"rtl"}},vt=et((()=>(0,e._)("p",null,"اجازة",-1))),_t=et((()=>(0,e._)("span",{class:"material-symbols-outlined"}," acute ",-1))),yt=[_t];function wt(t,i,s,a,n,r){const o=(0,e.up)("vue-countdown");return(0,e.wg)(),(0,e.iD)("div",{class:(0,p.C_)(`right-sidebar-mini ${n.miniClass} data-scrollbar right-sidebar-team`)},[(0,e._)("div",at,[(0,e._)("div",nt,[(0,e._)("div",rt,[(0,e._)("div",ot,[(0,e._)("div",lt,[ct,s.timer&&!s.timer.is_vacation?((0,e.wg)(),(0,e.iD)("div",dt,[(0,e._)("h4",ut," الأسبوع: "+(0,p.zw)(s.timer.title),1),(0,e.Wm)(o,{time:r.time,onEnd:r.onCountdownEnd},{default:(0,e.w5)((({days:t,hours:i,minutes:s,seconds:a})=>[(0,e._)("table",mt,[(0,e._)("thead",null,[(0,e._)("tr",ht,[(0,e._)("th",null,(0,p.zw)(a),1),(0,e._)("th",null,(0,p.zw)(s),1),(0,e._)("th",null,(0,p.zw)(i),1),(0,e._)("th",null,(0,p.zw)(t),1)])]),gt])])),_:1},8,["time","onEnd"])])):((0,e.wg)(),(0,e.iD)("div",pt,[(0,e._)("h4",bt," الأسبوع: "+(0,p.zw)(s.timer.title),1),vt]))])]),(0,e._)("div",{class:"right-sidebar-toggle text-white mt-3 d-flex toggel-btn",onClick:i[0]||(i[0]=(...t)=>r.toggleMini&&r.toggleMini(...t))},yt)])])])],2)}var ft=s(81716),kt={name:"Timer Sidebar",created(){this.now=new Date,this.date=new Date(this.timer.main_timer)},components:{VueCountdown:ft.Z},props:{timer:{type:[Object],required:!0}},data(){return{miniClass:"right-sidebar",rightSideBarMini:!0}},methods:{toggleMini(){this.rightSideBarMini=!this.rightSideBarMini,this.checkRightSideBar()},checkRightSideBar(){const t=document.querySelector("body");this.rightSideBarMini?(this.miniClass="right-sidebar",t.classList.add("right-sidebar-close")):(this.miniClass="",t.classList.remove("right-sidebar-close"))},onCountdownEnd:function(){}},computed:{time(){return this.date-this.now}}};const St=(0,Z.Z)(kt,[["render",wt],["__scopeId","data-v-28cb4139"]]);var Mt=St,Ct=s(74657),Dt=s(74427),At=s(89809);const Wt=()=>s.e(3334).then(s.t.bind(s,3334,23));var qt={name:"Default",async created(){const t=JSON.parse(sessionStorage.getItem("AuthSessionData"));if(t&&t.status>=200&&t.status<400)this.sessionData=t;else{const t=await At.Z.sessionData();sessionStorage.setItem("AuthSessionData",JSON.stringify(t)),this.sessionData=t}},mounted(){Wt()},components:{DefaultSidebar:m.Z,DefaultHeader:h.Z,DefaultFooter:g.Z,Timer:Mt,CurrentReading:$,ReadingTeam:it,Breadcrumb:Ct.Z},data(){return{sessionData:null,breadcrumboptions:[{img:s(77192),title:"Weather"},{img:s(90002),title:"Group"},{img:s(72918),title:"Group detail"},{img:s(49409),title:"Birthday"},{img:s(99473),title:"Profile Image"},{img:s(50748),title:"Profile Video"},{img:s(6966),title:"Friend List"},{img:s(39533),title:"Profile Event"},{img:s(17069),title:"Music"},{img:s(39533),title:"Calendar"},{img:s(10224),title:"Store Category"},{img:s(10224),title:"Category List"},{img:s(10224),title:"Store"},{img:s(10224),title:"Store Checkout"},{img:s(81626),title:"Book"},{img:s(80850),title:"Infographic"}],logoimage:Dt}}};const xt=(0,Z.Z)(qt,[["render",u]]);var Bt=xt},81626:function(t,i,s){t.exports=s.p+"img/book-banner.6a2a5a9c.png"},90002:function(t,i,s){t.exports=s.p+"img/book-banner-2.d7cc109e.png"},72918:function(t,i,s){t.exports=s.p+"img/book-banner.6a2a5a9c.png"},92021:function(t,i,s){t.exports=s.p+"img/current_book.4d2ae03c.png"},80850:function(t,i,s){t.exports=s.p+"img/profile-bg.154b76eb.jpg"}}]);
//# sourceMappingURL=2467.a6c9434b.js.map