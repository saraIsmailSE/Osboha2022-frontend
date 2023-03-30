import { createRouter, createWebHistory } from "vue-router";

const childRoutes = (prop, mode) => [
  {
    path: "",
    name: prop + ".list",
    meta: { auth: true, name: "Social App" },
    component: () => import("../views/Apps/Social/SocialApp"),
  },
  {
    path: "accountsetting",
    name: prop + ".accountsetting",
    meta: { auth: true, name: "Account Setting" },
    component: () => import("../views/User/AccountSetting"),
  },
  {
    path: "notification",
    name: prop + ".notification",
    meta: { auth: true, name: "Notification" },
    component: () => import("../views/OsbohaMain/Notifications/Notification"),
  },
  {
    path: "book",
    name: prop + ".book",
    meta: { auth: true, name: "Book" },
    component: () => import("../views/Book/Book"),
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "book-details/:book_id",
    name: prop + ".book-details",
    meta: { auth: true, name: "BookDetails" },
    component: () => import("../views/Book/BookDetails"),
  },
  {
    path: "infographic",
    name: prop + ".infographic",
    meta: { auth: true, name: "Infographic" },
    component: () => import("../views/Infographics/list"),
  },
  {
    path: "articles",
    name: prop + ".articles",
    meta: { auth: true, name: "articles" },
    component: () => import("../views/Articles/list"),
  },
  {
    path: "group",
    name: prop + ".group",
    meta: { auth: true, name: "Group" },
    component: () => import("../views/OsbohaMain/Group/Group"),
  },
  {
    path: "group-detail",
    name: prop + ".group-detail",
    meta: { auth: true, name: "Group detail" },
    component: () => import("../views/OsbohaMain/Group/Group-detail"),
  },
  {
    path: "/ambassadors-reading",
    name: prop + ".ambassadors-reading",
    meta: { auth: true, name: "Ambassadors reading" },
    component: () =>
      import("../views/OsbohaMain/Group/Ambassadors/TeamReading"),
  },
  {
    path: "/ambassador-list-reading",
    name: prop + ".ambassador-list-reading",
    meta: { auth: true, name: "Ambassadors list reading" },
    component: () =>
      import("../views/OsbohaMain/Group/Ambassadors/ListReading"),
  },
  {
    path: "announcement",
    name: prop + ".announcement",
    meta: { auth: true, name: "Announcemnt" },
    component: () => import("../views/Announcemnt/Announcemnt"),
  },
];
const authchildRoutes = (prop, mode) => [
  {
    path: "/auth/signin",
    name: prop + ".sign-in",
    component: () => import("../views/AuthPages/Default/SignIn"),
  },
  {
    path: "signup",
    name: prop + ".sign-up1",
    component: () => import("../views/AuthPages/Default/SignUp"),
  },
  {
    path: "recoverpassword",
    name: prop + ".recoverpassword1",
    component: () => import("../views/AuthPages/Default/RecoverPassword1"),
  },
  {
    path: "lockscreen",
    name: prop + ".lockscreen1",
    component: () => import("../views/AuthPages/Default/LockScreen1"),
  },
  {
    path: "confirmmail",
    name: prop + ".confirmmail1",
    component: () => import("../views/AuthPages/Default/ConfirmMail1"),
  },
];
const blogchildRoutes = (prop, mode = false) => [
  {
    path: "blog-grid",
    name: prop + ".blog-grid",
    meta: { auth: true, name: "blog-grid" },
    component: () => import("../views/OsbohaMain/Blog/BlogGrid"),
  },
  {
    path: "blog-list",
    name: prop + ".blog-list",
    meta: { auth: true, name: "blog-list" },
    component: () => import("../views/OsbohaMain/Blog/BlogList"),
  },
  {
    path: "blog-detail",
    name: prop + ".blog-detail",
    meta: { auth: true, name: "blog-detail" },
    component: () => import("../views/OsbohaMain/Blog/BlogDetail"),
  },
];
const iconChildRoute = (prop, mode = false) => [
  {
    path: "fontawesome-5",
    name: prop + ".fontawesome-5",
    meta: { auth: true, name: "Font Awsome" },
    component: () => import("../views/Icons/IconFontawesome5"),
  },
  {
    path: "lineawesome",
    name: prop + ".lineawesome",
    meta: { auth: true, name: "Line Awsome" },
    component: () => import("../views/Icons/IconLineAwesome"),
  },
  {
    path: "remixicon",
    name: prop + ".remixicon",
    meta: { auth: true, name: "Remixicon" },
    component: () => import("../views/Icons/IconRemixicon"),
  },
  {
    path: "material",
    name: prop + ".material",
    meta: { auth: true, name: "Material" },
    component: () => import("../views/Icons/IconMaterial"),
  },
];

const appChildRoute = (prop, mode = false) => [
  {
    path: "chat",
    name: prop + ".chat",
    meta: { auth: true, name: "Chat" },
    component: () => import("../views/Chat/Index"),
  },
];
const userChildRoute = (prop, mode = false) => [
  {
    path: "profile/:user_id",
    name: prop + ".profile",
    meta: { auth: true, name: "User Profile" },
    component: () => import("../views/User/Profile"),
  },
  {
    path: "profile/friends/list/:user_id",
    name: prop + ".friendsList",
    meta: { auth: true, name: "User Friends List" },
    component: () => import("../views/User/Friends/List"),
  },
  {
    path: "profile/update/:user_id",
    name: prop + ".profileUpdate",
    meta: { auth: true, name: "User Profile Update" },
    component: () => import("../views/User/Sections/Update"),
  },
  {
    path: "profile/friends/requests/:user_id",
    name: prop + ".friendsRequests",
    meta: { auth: true, name: "User Frinds Requests" },
    component: () => import("../views/User/Friends/Requests"),
  },
  {
    path: "request-exception/:user_id",
    name: prop + ".requestexception",
    meta: { auth: true, name: "User Request Exception" },
    component: () => import("../views/User/NewException"),
  },
  {
    path: "accountsetting",
    name: prop + ".accountsetting",
    meta: { auth: true, name: "Account Setting" },
    component: () => import("../views/User/AccountSetting"),
  },
  {
    path: "privacysetting",
    name: prop + ".privacy-setting",
    meta: { auth: true, name: "Privacy Setting" },
    component: () => import("../views/User/PrivacySetting"),
  },
];

const groupChildRoute = (prop, mode = false) => [
  {
    path: "request-ambassadors/:group_id",
    name: prop + ".requestAmbassadors",
    meta: { auth: true, name: "Request Ambassadors" },
    component: () => import("../views/OsbohaMain/Group/Ambassadors/Request"),
  },
  {
    path: "group-detail/:group_id",
    name: prop + ".group-detail",
    meta: { auth: true, name: "Group Detail" },
    component: () => import("../views/OsbohaMain/Group/Group-detail"),
  },
  {
    path: "group-members/:group_id",
    name: prop + ".group-members",
    meta: { auth: true, name: "Group Members" },
    component: () => import("../views/OsbohaMain/Group/ListMembers"),
  },
  {
    path: "group-books/:group_id",
    name: prop + ".group-books",
    meta: { auth: true, name: "Group Books" },
    component: () => import("../views/OsbohaMain/Group/ListBooks"),
  },
  {
    path: "group-exceptions/:group_id",
    name: prop + ".group-exceptions",
    meta: { auth: true, name: "Group Exceptions" },
    component: () => import("../views/OsbohaMain/Group/Exceptions/ListAll"),
  },
    {
    path: '/group/ambassadors-reading/:group_id',
    name: prop + '.ambassadors-reading',
    meta: { auth: true, name: 'Ambassadors reading' },
    component: () => import('../views/OsbohaMain/Group/Ambassadors/TeamReading')
  },
  {
    path: '/group/list-ambassador-reading/:ambassador_id',
    name: prop + '.listOneAmbassadorReading',
    meta: { auth: true, name: 'Ambassadors list reading' },
    component: () => import('../views/OsbohaMain/Group/Ambassadors/ListReading'),
  },
  {
    path: '/group/all-ambassadors-achement/:group_id',
    name: prop + '.listAllAmbassadorAchievements',
    meta: { auth: true, name: 'All Ambassadors Achievement' },
    component: () => import('../views/OsbohaMain/Group/Ambassadors/ListAllAchievement'),
  },  
  {
    path: '/group/achievement-as-pages/:group_id',
    name: prop + '.achievementAsPages',
    meta: { auth: true, name: 'Achievement As Pages' },
    component: () => import('../views/OsbohaMain/Group/Ambassadors/AchievementAsPages'),
  },

];

const exceptionChildRoute = (prop, mode = false) => [
  {
    path: "list-exception/:exception_id/:group_id?",
    name: prop + ".listException",
    meta: { auth: true, name: "List Exception" },
    component: () => import("../views/OsbohaMain/Group/Exceptions/ListOne"),
  },
];
const routes = [
  {
    path: "/",
    name: "social",
    component: () => import("../layouts/Default"),
    children: childRoutes("social"),
  },
  {
    path: "/without-leftside",
    name: "without-leftside",
    component: () => import("../layouts/WithoutLeftside"),
    children: childRoutes("leftside"),
  },
  {
    path: "/without-rightside",
    name: "without-rightside",
    component: () => import("../layouts/WithoutRightside"),
    children: childRoutes("rightside"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../layouts/Empty"),
    children: authchildRoutes("auth"),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../layouts/Default"),
    children: blogchildRoutes("blog"),
  },
  {
    path: "/icon",
    name: "icon",
    component: () => import("../layouts/Default"),
    children: iconChildRoute("icon"),
  },
  {
    path: "/app",
    name: "app",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: appChildRoute("app"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: userChildRoute("user"),
  },
  {
    path: "/group",
    name: "group",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: groupChildRoute("group"),
  },
  {
    path: "/exceptions",
    name: "exceptions",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: exceptionChildRoute("exceptions"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ["/auth/signin", "/auth/signup"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    return next("/auth/signin");
  }

  next();
});

export default router;
