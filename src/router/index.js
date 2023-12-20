import { createRouter, createWebHistory } from "vue-router";

//check if user is logged in
const loggedIn = () =>
  localStorage.getItem("osboha__user") && localStorage.getItem("osboha__token");

//redirect to home if logged in
const authGuard = (to, from, next) => {
  if (loggedIn()) {
    next("/");
  } else {
    next();
  }
};

const childRoutes = (prop, mode) => [
  {
    path: "",
    name: prop + ".list",
    meta: { auth: true, name: "osboha App" },
    component: () => import("../views/Apps/Osboha/OsbohaApp"),
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
    path: "groups-list",
    name: prop + ".groupsList",
    meta: { auth: true, name: "Group" },
    component: () => import("../views/OsbohaMain/Group/GroupsList"),
  },
  {
    path: "announcement",
    name: prop + ".announcement",
    meta: { auth: true, name: "Announcemnt" },
    component: () => import("../views/OsbohaMain/Announcemnt/Announcemnt"),
  },
  {
    path: "support",
    name: prop + ".support",
    meta: { auth: true, name: "Support" },
    component: () => import("../views/OsbohaMain/Support/SupportView"),
  },
  {
    path: "post/:post_id/:user_id?",
    name: prop + ".post",
    meta: { auth: true, name: "post" },
    component: () => import("../views/OsbohaMain/Post/PostView"),
  },
  {
    path: "posts/pending/:timeline_id/:post_id?",
    name: prop + ".pendingPosts",
    meta: { auth: true, name: "PendingPosts" },
    component: () => import("../views/OsbohaMain/Post/PendingPostsView"),
  },
];

const authchildRoutes = (prop, mode) => [
  {
    path: "/auth/signin",
    name: prop + ".sign-in",
    component: () => import("../views/AuthPages/Default/SignIn"),
    beforeEnter: authGuard,
  },

  {
    path: "signup",
    name: prop + ".sign-up",
    component: () => import("../views/AuthPages/Default/SignUp"),
  },
  {
    path: "forgot-password",
    name: prop + ".forgot-password",
    component: () => import("../views/AuthPages/Default/ForgotPassword.vue"),
  },
  {
    path: "reset-email",
    name: prop + ".reset-email",
    component: () => import("../views/AuthPages/Default/ResetEmail"),
  },
  {
    path: "forgot-password",
    name: prop + ".forgot-password",
    component: () => import("../views/AuthPages/Default/ForgotPassword.vue"),
  },
  {
    path: "not-ambassador-in-any-group/",
    name: prop + ".NotAmbassadorInAnyGroup",
    component: () =>
      import("../views/AuthPages/Default/NotAmbassadorInAnyGroup"),
  },
  {
    path: "excluded_ambassador/",
    name: prop + ".ExcludedAmbassador",
    component: () => import("../views/AuthPages/Default/ExcludedAmbassador"),
  },
  {
    path: "lockscreen",
    name: prop + ".lockscreen1",
    component: () => import("../views/AuthPages/Default/LockScreen1"),
  },
  {
    path: "confirm-mail",
    name: prop + ".confirmmail",
    component: () => import("../views/AuthPages/Default/ConfirmMail"),
  },
  {
    path: "reset-password/:token",
    name: prop + ".reset-password",
    component: () => import("../views/AuthPages/Default/ResetPassword"),
  },
];

const userChildRoute = (prop, mode = false) => [
  {
    path: "search",
    name: prop + ".search",
    meta: { auth: true, name: "User search" },
    component: () => import("../views/AuthPages/Default/SearchForUser"),
  },
  {
    path: "assign-to-parent",
    name: prop + ".assignToParent",
    meta: { auth: true, name: "Assign To Parent" },
    component: () =>
      import("../views/OsbohaMain/Control/Ambassador/assignToParent"),
  },
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
    component: () => import("../views/User/Exceptions/NewException"),
  },
  {
    path: "list-exception/:user_id",
    name: prop + ".listException",
    meta: { auth: true, name: "List User Exception" },
    component: () => import("../views/User/Exceptions/ListExceptions"),
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
const statisticsChildRoute = (prop, mode = false) => [
  {
    path: "weekly/:week_id",
    name: prop + ".byWeek",
    meta: { auth: true, name: "Statistics by Week" },
    component: () => import("../views/OsbohaMain/Statistics/Statistics"),
  },
  {
    path: "top-users",
    name: prop + ".top-users",
    meta: { auth: true, name: "Statistics for Top Users" },
    component: () => import("../views/OsbohaMain/Statistics/TopUsers"),
  },
  {
    path: "leaders/:supervisor_id",
    name: prop + ".Leaders",
    meta: { auth: true, name: "Statistics for Supervisor Leaders" },
    component: () => import("../views/OsbohaMain/Statistics/Leaders"),
  },
  {
    path: "supervisors/:advisor_id",
    name: prop + ".supervisors",
    meta: { auth: true, name: "Statistics for Advisor Supervisors" },
    component: () => import("../views/OsbohaMain/Statistics/Supervisors"),
  },
  {
    path: "advisors/:consultant_id",
    name: prop + ".advisors",
    meta: { auth: true, name: "Statistics for Consultant Advisors" },
    component: () => import("../views/OsbohaMain/Statistics/Advisors"),
  },
  {
    path: "consultants/:admin_id",
    name: prop + ".consultants",
    meta: { auth: true, name: "Statistics for Consultants" },
    component: () => import("../views/OsbohaMain/Statistics/Consultants"),
  },
  {
    path: "list-supervisors",
    name: prop + ".list-supervisors",
    meta: { auth: true, name: "List Supervisors for Advisor" },
    component: () => import("../views/OsbohaMain/Statistics/ListSupervisors"),
  },
];
const rolesChildRoute = (prop, mode = false) => [
  {
    path: "/assign-role",
    name: prop + ".assignRole",
    meta: { auth: true, name: "Assign Role" },
    component: () => import("../views/RolesAdministration/AssignRole"),
  },
  {
    path: "/change-advising-team",
    name: prop + ".changeAdvisingTeam",
    meta: { auth: true, name: "Change Advising Team" },
    component: () => import("../views/RolesAdministration/ChangeAdvisingTeam"),
  },
];
const groupChildRoute = (prop, mode = false) => [
  {
    path: "request-ambassadors/:group_id",
    name: prop + ".requestAmbassadors",
    meta: { auth: true, name: "Request AmbFgrassadors" },
    component: () => import("../views/OsbohaMain/Group/Ambassadors/Request"),
  },
  {
    path: "group-detail/:group_id",
    name: prop + ".group-detail",
    meta: { auth: true, name: "Group Detail" },
    component: () => import("../views/OsbohaMain/Group/Group-detail"),
  },
  {
    path: "update/:group_id",
    name: prop + ".update",
    meta: { auth: true, name: "Group Update" },
    component: () => import("../views/OsbohaMain/Group/Update"),
  },
  {
    path: "change-leader/:group_id",
    name: prop + ".change-leader",
    meta: { auth: true, name: "Group" },
    component: () => import("../views/OsbohaMain/Group/ChangeLeader"),
  },
  {
    path: "group-members/:group_id",
    name: prop + ".group-members",
    meta: { auth: true, name: "Group Members" },
    component: () => import("../views/OsbohaMain/Group/ListMembers"),
  },
  {
    path: "add-member/:group_id",
    name: prop + ".addMemeber",
    meta: { auth: true, name: "Group" },
    component: () => import("../views/OsbohaMain/Group/AddMember"),
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
    path: "/group/ambassadors-reading/:group_id/week/:week_id",
    name: prop + ".ambassadors-reading",
    meta: { auth: true, name: "Ambassadors reading" },
    component: () =>
      import("../views/OsbohaMain/Group/Ambassadors/TeamReading"),
  },
  {
    path: "/group/list-ambassador-reading/:ambassador_id/week/:week_id",
    name: prop + ".listOneAmbassadorReading",
    meta: { auth: true, name: "Ambassador list reading" },
    component: () =>
      import("../views/OsbohaMain/Group/Ambassadors/ListReading"),
  },
  {
    path: "/group/list-ambassador-reading/thesis/:thesis_id",
    name: prop + ".listOneAmbassadorThesis",
    meta: { auth: true, name: "Ambassador -  one thesis" },
    component: () => import("../views/OsbohaMain/Group/Ambassadors/ListThesis"),
  },
  {
    path: "/group/all-ambassadors-achement/:group_id/week/:week_id",
    name: prop + ".listAllAmbassadorAchievements",
    meta: { auth: true, name: "All Ambassadors Achievement" },
    component: () =>
      import("../views/OsbohaMain/Group/Ambassadors/ListAllAchievement"),
  },
  {
    path: "/group/achievement-as-pages/:group_id/:week_id",
    name: prop + ".achievementAsPages",
    meta: { auth: true, name: "Achievement As Pages" },
    component: () =>
      import("../views/OsbohaMain/Group/Ambassadors/AchievementAsPages"),
  },
  {
    path: "/group/groups-audit/:supervisor_id",
    name: prop + ".groupsAudit",
    meta: { auth: true, name: "Audit Marks" },
    component: () => import("../views/OsbohaMain/Group/AuditMarks/GroupsAudit"),
  },
  {
    path: "/group/audit/mark/:mark_for_audit",
    name: prop + ".markAudit",
    meta: { auth: true, name: "Mark" },
    component: () => import("../views/OsbohaMain/Group/AuditMarks/Mark"),
  },
  {
    path: "/group/audit-marks/:group_id",
    name: prop + ".auditMarks",
    meta: { auth: true, name: "Audit Marks" },
    component: () =>
      import("../views/OsbohaMain/Group/AuditMarks/SupervisorAuditMarks"),
  },
  {
    path: "/group/advisor-audit-marks/:advisor_id",
    name: prop + ".AdvisorAudit",
    meta: { auth: true, name: "Advisor Audit Marks" },
    component: () =>
      import("../views/OsbohaMain/Group/AuditMarks/AdvisorAudit"),
  },

  {
    path: "/group/advisor-main-audit-marks/:advisor_id",
    name: prop + ".AdvisorMainAudit",
    meta: { auth: true, name: "Advisor Main Audit Marks" },
    component: () =>
      import("../views/OsbohaMain/Group/AuditMarks/AdvisorMainAudit"),
  },
  {
    path: "/group/statistics/:group_id",
    name: prop + ".group-statistics",
    meta: { auth: true, name: "Group Statistics" },
    component: () => import("../views/OsbohaMain/Group/Statistics"),
  },
  {
    path: "add-group",
    name: prop + ".addGroup",
    meta: { auth: true, name: "Group" },
    component: () => import("../views/OsbohaMain/Group/AddGroup"),
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

const generalConversationChildRoute = (prop, mode = false) => [
  {
    path: ":questionId?",
    name: prop + ".index",
    meta: { auth: true, name: "General Conversation Index" },
    component: () => import("../views/OsbohaMain/GeneralConversation/index"),
  },
  {
    path: "statistics",
    name: prop + ".statistics",
    meta: { auth: true, name: "General Conversation Statistics" },
    component: () =>
      import("../views/OsbohaMain/GeneralConversation/Statistics"),
  },
  {
    path: "working-hours",
    name: prop + ".workingHours",
    meta: { auth: true, name: "General Conversation Working Hours" },
    component: () =>
      import("../views/OsbohaMain/GeneralConversation/WorkingHours"),
  },
  {
    path: "working-hours-stats",
    name: prop + ".workingHoursStats",
    meta: { auth: true, name: "General Conversation Working Hours Stats" },
    component: () =>
      import("../views/OsbohaMain/GeneralConversation/WorkingHoursStats"),
  },

  {
    path: "followup-statistics",
    name: prop + ".followupStatistics",
    meta: { auth: true, name: "Followup Statistics" },
    component: () =>
      import("../views/OsbohaMain/GeneralConversation/FollowupStatistics"),
  },
];

const timerChildRoute = (prop, mode = false) => [
  {
    path: "timer-list",
    name: prop + ".timerList",
    meta: { auth: true, name: "List timer" },
    component: () => import("../views/OsbohaMain/Timer/Timer.vue"),
  },
];

const bookChildRoute = (prop, mode = false) => [
  {
    path: "book-details/:book_id",
    name: prop + ".book-details",
    meta: { auth: true, name: "BookDetails" },
    component: () => import("../views/Book/BookDetails"),
  },
  {
    path: "latest",
    name: prop + ".latest",
    meta: { auth: true, name: "Latest Book" },
    component: () => import("../views/Book/LatestBook"),
  },
  {
    path: "update/:book_id",
    name: prop + ".update",
    meta: { auth: true, name: "Book Update" },
    component: () => import("../views/Book/Update"),
  },
  {
    path: "create",
    name: prop + ".create",
    meta: { auth: true, name: "Book Create" },
    component: () => import("../views/Book/Create"),
  },
  {
    path: "free-books/:user_id",
    name: prop + ".free-book",
    meta: { auth: true, name: "Free Book" },
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    component: () => import("../views/Book/Free"),
  },
  {
    path: "later-books/:user_id",
    name: prop + ".later-books",
    meta: { auth: true, name: "UserBooks" },
    component: () => import("../views/Book/LaterBooks"),
  },
  {
    path: "user-theses/:book_id/:user_id",
    name: prop + ".user-theses",
    meta: { auth: true, name: "UserTheses" },
    component: () => import("../views/Book/BookDetails"),
  },
  {
    path: "user-single-thesis/:book_id/:thesis_id",
    name: prop + ".user-single-thesis",
    meta: { auth: true, name: "UserSingleThesis" },
    component: () => import("../views/Book/BookDetails"),
  },
];

const controlChildRoute = (prop, mode = false) => [
  {
    path: "groups",
    name: prop + ".groups",
    meta: { auth: true, name: "Control Groups" },
    component: () => import("../views/OsbohaMain/Control/groups"),
  },
  {
    path: "transfer-ambassador",
    name: prop + ".transfer-ambassador",
    meta: { auth: true, name: "Aransfer Ambassador" },
    component: () => import("../views/OsbohaMain/Control/Ambassador/transfer"),
  },
  {
    path: "transfer-leader",
    name: prop + ".transfer-leader",
    meta: { auth: true, name: "Aransfer Leader" },
    component: () => import("../views/OsbohaMain/Control/Leaders/transfer"),
  },
  {
    path: "assign-administrator/",
    name: prop + ".assign-administrator",
    meta: { auth: true, name: "Assign Administrator" },
    component: () => import("../views/OsbohaMain/Control/assignAdministrator"),
  },
  {
    path: "supervisors-swap/",
    name: prop + ".supervisorsSwap",
    meta: { auth: true, name: "Supervisors Swap" },
    component: () =>
      import("../views/OsbohaMain/Control/Supervisors/supervisorsSwap"),
  },
  {
    path: "leaders-swap/",
    name: prop + ".leadersSwap",
    meta: { auth: true, name: "Leaders Swap" },
    component: () => import("../views/OsbohaMain/Control/Leaders/leadersSwap"),
  },

  {
    path: "pending-theses/:supervisor_id/",
    name: prop + ".pending-theses",
    meta: { auth: true, name: "Assign Administrator" },
    component: () => import("../views/OsbohaMain/Control/Theses/pending"),
  },
];

const chatChildRoute = (prop, mode = false) => [
  {
    path: "",
    name: prop + ".index",
    meta: { auth: true, name: "ChatIndex" },
    component: () => import("../views/Chat/Index"),
  },
];

const mediaChildRoute = (prop, mode = false) => [
  {
    path: "",
    name: prop + ".index",
    component: () => import("../views/UploadImages"),
  },
];

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/Errors/404"),
  },
  {
    path: "/notauthorized",
    name: "NotAuthorized",
    component: () => import("../views/Errors/401"),
  },
  {
    path: "/server-error",
    name: "ServerError",
    component: () => import("../views/Errors/500-server"),
  },
  // {
  //   path: "/maintenance",
  //   name: "maintenance",
  //   component: () => import("../views/Errors/500-server"),
  // },

  {
    path: "/",
    name: "osboha",
    component: () => import("../layouts/Default"),
    children: childRoutes("osboha"),
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
    path: "/upload-media",
    name: "upload-media",
    component: () => import("../layouts/Empty"),
    children: mediaChildRoute("upload-media"),
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
    path: "/statistics",
    name: "statistics",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: statisticsChildRoute("statistics"),
  },
  {
    path: "/roles",
    name: "roles",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: rolesChildRoute("roles"),
  },
  {
    path: "/exceptions",
    name: "exceptions",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: exceptionChildRoute("exceptions"),
  },
  {
    path: "/timer",
    name: "timer",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: timerChildRoute("timer"),
  },
  {
    path: "/book",
    name: "book",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: bookChildRoute("book"),
  },
  {
    path: "/control",
    name: "control",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: controlChildRoute("control"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../layouts/ChatHeader"),
    meta: { auth: true },
    children: chatChildRoute("chat"),
  },
  {
    path: "/general-conversation",
    name: "general-conversation",
    component: () => import("../layouts/Default"),
    meta: { auth: true },
    children: generalConversationChildRoute("general-conversation"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !loggedIn()) {
    return next("/auth/signin");
  } else {
    next();
  }
});


// router.beforeEach((to, from, next) => {
//   // Check if the destination route is the maintenance page
//   if (to.path !== '/maintenance') {
//     // Redirect to the maintenance page
//     next('/maintenance');
//   } else {
//     // Continue with the route
//     next();
//   }
// });


export default router;
