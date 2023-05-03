"use strict";(self["webpackChunkOsboha180"]=self["webpackChunkOsboha180"]||[]).push([[6993],{89809:function(e,r,s){var a=s(24150),t=s(49579),o=s(66252);class A{async login({username:e,password:r}){try{const s=a.hi.post("/auth/signin",{username:e,password:r});return s.data.accessToken&&t.Z.setUser(s.date),s.data}catch(s){console.log(s)}}async assignRole(e){try{const r=await a.hi.post("assign-role",e);return r.data.data}catch(r){return r.response}}logout(){t.Z.removeUser()}async register(e,r,s,t,o,A){return await a.hi.post("/register",{name:e,gender:r,email:s,phone:t,password:o,user_type:A})}async sendEmail(){let e=null;const r=await a.hi.post("email/verification-notification").catch((e=>{e=e.response.data.message}));return{data:r.data,error:e}}async resetPassword(e,r,s){let t=new FormData;t.append("password",e),t.append("email",r),t.append("token",s);try{const e=await a.hi.post("password/reset",t);return e.data}catch(o){return o.response}}async forgetPassword(e){try{const r=await a.hi.post("password/forgot-password",{email:e});return r.data}catch(r){return r.response}}async sessionData(){try{const e=await a.hi.get("session-data");return e.data.data}catch(e){return e.response}}async refreshToken(){try{const e=await a.hi.post("/refresh");return e.data.data}catch(e){(0,o.S3)(e)}}}r["Z"]=new A},87214:function(e,r,s){s.r(r),s.d(r,{default:function(){return S}});var a=s(66252),t=s(49963),o=s(3577),A=s.p+"img/upgrade-user.6fc5a363.png",i=s(79885);const n={class:"col-sm-12 mt-3"},l=(0,a._)("div",{class:"iq-card-header-toolbar d-flex text-center align-items-center mx-auto"},[(0,a._)("h1",{class:"text-center mt-3 mb-3"},"ترقية")],-1),u=(0,a._)("div",{class:"iq-card-body p-4"},[(0,a._)("div",{class:"image-block text-center"},[(0,a._)("img",{src:A,class:"img-fluid rounded w-75",alt:"blog-img"})])],-1),d={class:"col-12 bg-white pt-2"},c={class:"sign-in-from"},m={class:"form-group"},h=(0,a._)("label",{for:"user"},"المستخدم",-1),g={key:0,style:{color:"red"}},v={class:"form-group"},p=(0,a._)("label",{for:"head_user"}," المسؤول عنه",-1),q={key:0,style:{color:"red"}},f={class:"form-group"},w=(0,a._)("label",{for:"role"},"الترقية",-1),y=(0,a._)("option",{value:"0",selected:""},"ترقية إلى",-1),k=["value"],I={key:0,style:{color:"red"}},b={key:0,class:"col-sm-12 text-center"},B=(0,a._)("p",{class:"text-center"},"جاري الترقية",-1),L=(0,a._)("img",{src:i,alt:"loader",style:{height:"100px"}},null,-1),D=[B,L],Q={key:1,class:"form-group text-center"},K={style:{color:"red"}},z=(0,a._)("div",{class:"d-inline-block w-100"},[(0,a._)("button",{type:"submit",class:"btn btn-primary float-end"}," ترقية ")],-1);function C(e,r,s,A,i,B){const L=(0,a.up)("iq-card");return(0,a.wg)(),(0,a.iD)("div",n,[(0,a.Wm)(L,{class:"iq-card"},{default:(0,a.w5)((()=>[l,u,(0,a._)("div",d,[(0,a._)("div",c,[(0,a._)("form",{class:"mt-2",onSubmit:r[3]||(r[3]=(0,t.iM)((e=>B.onSubmit()),["prevent"]))},[(0,a._)("div",m,[h,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":r[0]||(r[0]=e=>A.v$.form.user.$model=e),type:"email",class:"form-control mb-0",id:"user",placeholder:"ادخل بريد المستخدم"},null,512),[[t.nr,A.v$.form.user.$model]]),A.v$.form.user.$error?((0,a.wg)(),(0,a.iD)("small",g,"البريد الالكتروني للمستخدم مطلوب")):(0,a.kq)("",!0)]),(0,a._)("div",v,[p,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":r[1]||(r[1]=e=>A.v$.form.head_user.$model=e),type:"email",class:"form-control mb-0",id:"head_user",placeholder:"ادخل بريد المسؤول عنه"},null,512),[[t.nr,A.v$.form.head_user.$model]]),A.v$.form.head_user.$error?((0,a.wg)(),(0,a.iD)("small",q," البريد الالكتروني للمسؤول مطلوب")):(0,a.kq)("",!0)]),(0,a._)("div",f,[w,(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":r[2]||(r[2]=e=>A.v$.form.role_id.$model=e),class:"form-select","data-trigger":"",name:"role",id:"role"},[y,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.roles,((e,r)=>((0,a.wg)(),(0,a.iD)("option",{key:r,value:e.id},(0,o.zw)(i.user_type[e.name]),9,k)))),128))],512),[[t.bM,A.v$.form.role_id.$model]]),A.v$.form.role_id.$error?((0,a.wg)(),(0,a.iD)("small",I," يرجى اختيار نوع الترقية ")):(0,a.kq)("",!0)]),i.loader?((0,a.wg)(),(0,a.iD)("div",b,D)):(0,a.kq)("",!0),i.message?((0,a.wg)(),(0,a.iD)("div",Q,[(0,a._)("small",K,(0,o.zw)(i.message),1)])):(0,a.kq)("",!0),z],32)])])])),_:1})])}var x=s(54028),E=s(62587),O=s(24150),j=s(89809);const G=e=>e>0;var P={name:"AssignRole",setup(){return{v$:(0,x.ZP)()}},async created(){const e=await O.hi.get("get-roles/1");this.roles=e.data.data},data(){return{loader:!1,user_type:{ambassador:"سفير",leader:"قائد",supervisor:"مراقب",advisor:"موجه",consultant:"مستشار",admin:"ادارة"},form:{user:"",head_user:"",role_id:0},roles:[],message:""}},validations(){return{form:{user:{required:E.C1,email:E.Do},head_user:{required:E.C1,email:E.Do},role_id:{required:E.C1,maxValue:G}}}},methods:{async onSubmit(){if(this.v$.$validate(),!this.v$.$error)try{this.message="";const e=await j.Z.assignRole(this.form);this.loader=!1,this.message=e}catch(e){this.loader=!1,this.message="حدث خطأ",console.log(e)}}}},Y=s(83744);const J=(0,Y.Z)(P,[["render",C]]);var S=J},79885:function(e){e.exports="data:image/gif;base64,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"}}]);
//# sourceMappingURL=6993.abb70aa9.js.map