import { createRouter, createWebHistory } from 'vue-router'

const childRoutes = (prop, mode) => [
  {
    path: '',
    name: prop + '.list',
    meta: { auth: true, name: 'Social App' },
    component: () => import('../views/Apps/Social/SocialApp')
  },
  {
    path: 'accountsetting',
    name: prop + '.accountsetting',
    meta: { auth: true, name: 'Account Setting' },
    component: () => import('../views/User/AccountSetting')
  },
  {
    path: 'privacysetting',
    name: prop + '.privacy-setting',
    meta: { auth: true, name: 'Privacy Setting' },
    component: () => import('../views/User/PrivacySetting')
  },
  {
    path: 'privacypolicy',
    name: prop + '.privacy',
    meta: { auth: true, name: 'Privacy Policy' },
    component: () => import('../views/Pages/PrivacyPolicy')
  },
  {
    path: 'termofservice',
    name: prop + '.termofservice',
    meta: { auth: true, name: 'Terms Of Use' },
    component: () => import('../views/Pages/TermsOfService')
  },
  {
    path: 'profile',
    name: prop + '.profilemain',
    meta: { auth: true, name: 'Profile' },
    component: () => import('../views/Profile/Profile')
  },
  {
    path: 'profileimage',
    name: prop + '.profileimage',
    meta: { auth: true, name: 'Profile Image' },
    component: () => import('../views/OsbohaMain/Profile/ProfileImage')
  },
  {
    path: 'profilevideo',
    name: prop + '.profilevideo',
    meta: { auth: true, name: 'Profile Video' },
    component: () => import('../views/OsbohaMain/Profile/ProfileVideo')
  },
  {
    path: 'profileevent',
    name: prop + '.profileevent',
    meta: { auth: true, name: 'Profile Event' },
    component: () => import('../views/OsbohaMain/Profile/ProfileEvent')
  },
  {
    path: 'event-detail',
    name: prop + '.event-detail',
    meta: { auth: true, name: 'Event-Detail' },
    component: () => import('../views/OsbohaMain/Profile/Event-Detail')
  },
  {
    path: 'profilebadges',
    name: prop + '.profilebadges',
    meta: { auth: true, name: 'Profile Badges' },
    component: () => import('../views/OsbohaMain/Profile/ProfileBadges')
  },
  {
    path: 'profileforum',
    name: prop + '.profileforum',
    meta: { auth: true, name: 'Profile Forum' },
    component: () => import('../views/OsbohaMain/Profile/ProfileForum')
  },
  {
    path: 'book',
    name: prop + '.book',
    meta: { auth: true, name: 'Book' },
    component: () => import('../views/Book/Book'),
    props: route => ({ page: parseInt(route.query.page) || 1 })

  },
  {
    path: 'book-details',
    name: prop + '.book-details',
    meta: { auth: true, name: 'BookDetails' },
    component: () => import('../views/Book/BookDetails'),
    props: route => ({ id: parseInt(route.query.id)})
  },
  {
    path: 'infographic',
    name: prop + '.infographic',
    meta: { auth: true, name: 'Infographic' },
    component: () => import('../views/Infographics/list')
  },
  {
    path: 'articles',
    name: prop + '.articles',
    meta: { auth: true, name: 'articles' },
    component: () => import('../views/Articles/list')
  },
  {
    path: 'group',
    name: prop + '.group',
    meta: { auth: true, name: 'Group' },
    component: () => import('../views/OsbohaMain/Group/Group')
  },
  {
    path: 'group-detail',
    name: prop + '.group-detail',
    meta: { auth: true, name: 'Group detail' },
    component: () => import('../views/OsbohaMain/Group/Group-detail')
  },
  {
    path: '/ambassadors-reading',
    name: prop + './ambassadors-reading',
    meta: { auth: true, name: 'Ambassadors reading' },
    component: () => import('../views/OsbohaMain/Group/Ambassadors/ambassadorsReading')
  },
  {
    path: 'friendlist',
    name: prop + '.friendlist',
    meta: { auth: true, name: 'Friend List' },
    component: () => import('../views/OsbohaMain/Friends/FriendList')
  },
  {
    path: 'friendprofile',
    name: prop + '.friendprofile',
    meta: { auth: true, name: 'Friend profile' },
    component: () => import('../views/OsbohaMain/Friends/FriendProfile')
  },
  {
    path: 'notification',
    name: prop + '.notification',
    meta: { auth: true, name: 'Notification' },
    component: () => import('../views/OsbohaMain/Notifications/Notification')
  },
  {
    path: 'file',
    name: prop + '.file',
    meta: { auth: true, name: 'File' },
    component: () => import('../views/OsbohaMain/File/File')
  },
  {
    path: 'friendrequest',
    name: prop + '.friendrequest',
    meta: { auth: true, name: 'Friend Request' },
    component: () => import('../views/OsbohaMain/Friends/FriendRequest')
  },
]
const blankchildRoutes = (prop, mode) => [
  {
    path: '/auth/signin',
    name: prop + '.sign-in',
    component: () => import('../views/AuthPages/Default/SignIn')
  },
  {
    path: 'signup',
    name: prop + '.sign-up1',
    component: () => import('../views/AuthPages/Default/SignUp1')
  },
  {
    path: 'recoverpassword',
    name: prop + '.recoverpassword1',
    component: () => import('../views/AuthPages/Default/RecoverPassword1')
  },
  {
    path: 'lockscreen',
    name: prop + '.lockscreen1',
    component: () => import('../views/AuthPages/Default/LockScreen1')
  },
  {
    path: 'confirmmail',
    name: prop + '.confirmmail1',
    component: () => import('../views/AuthPages/Default/ConfirmMail1')
  }
]
const pagesChildRoutes = (prop, mode = false) => [
  {
    path: 'error/:code',
    name: prop + '.error',
    component: () => import('../views/Pages/ErrorPage')
  },
  {
    path: 'error404',
    name: prop + '.error404',
    component: () => import('../views/Pages/Error404')
  },
  {
    path: 'error500',
    name: prop + '.error500',
    component: () => import('../views/Pages/Error500')
  },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    component: () => import('../views/Pages/ComingSoon')
  },
  {
    path: 'maintenance',
    name: prop + '.maintenance',
    component: () => import('../views/Pages/Maintenance')
  }
]
const blogchildRoutes = (prop, mode = false) => [
  {
    path: 'blog-grid',
    name: prop + '.blog-grid',
    meta: { auth: true, name: 'blog-grid' },
    component: () => import('../views/OsbohaMain/Blog/BlogGrid')
  },
  {
    path: 'blog-list',
    name: prop + '.blog-list',
    meta: { auth: true, name: 'blog-list' },
    component: () => import('../views/OsbohaMain/Blog/BlogList')
  },
  {
    path: 'blog-detail',
    name: prop + '.blog-detail',
    meta: { auth: true, name: 'blog-detail' },
    component: () => import('../views/OsbohaMain/Blog/BlogDetail')
  }
]
const iconChildRoute = (prop, mode = false) => [
  {
    path: 'fontawesome-5',
    name: prop + '.fontawesome-5',
    meta: { auth: true, name: 'Font Awsome' },
    component: () => import('../views/Icons/IconFontawesome5')
  },
  {
    path: 'lineawesome',
    name: prop + '.lineawesome',
    meta: { auth: true, name: 'Line Awsome' },
    component: () => import('../views/Icons/IconLineAwesome')
  },
  {
    path: 'remixicon',
    name: prop + '.remixicon',
    meta: { auth: true, name: 'Remixicon' },
    component: () => import('../views/Icons/IconRemixicon')
  },
  {
    path: 'material',
    name: prop + '.material',
    meta: { auth: true, name: 'Material' },
    component: () => import('../views/Icons/IconMaterial')
  }
]
const formChildRoute = (prop, mode = false) => [
  {
    path: 'form-layout',
    name: prop + '.layout',
    meta: { auth: true, name: 'Layout' },
    component: () => import('../views/Forms/FormLayout')
  },
  {
    path: 'form-validate',
    name: prop + '.validate',
    meta: { auth: true, name: 'Validate' },
    component: () => import('../views/Forms/FormValidates')
  },
  {
    path: 'form-switches',
    name: prop + '.switch',
    meta: { auth: true, name: 'Switch' },
    component: () => import('../views/Forms/FormSwitches')
  },
  {
    path: 'form-radios',
    name: prop + '.radio',
    meta: { auth: true, name: 'Radio' },
    component: () => import('../views/Forms/FormRadios')
  },
  {
    path: 'form-checkboxes',
    name: prop + '.checkbox',
    meta: { auth: true, name: 'Checkbox' },
    component: () => import('../views/Forms/FormCheckboxes')
  }
]
const formwizardChildRoute = (prop, mode = false) => [
  {
    path: 'simple',
    name: prop + '.simple',
    meta: { auth: true, name: 'Simple' },
    component: () => import('../views/Form Wizard/Simple')
  },
  {
    path: 'validate',
    name: prop + '.validatewizard',
    meta: { auth: true, name: 'Validate' },
    component: () => import('../views/Form Wizard/Validate')
  },
  {
    path: 'vertical',
    name: prop + '.vertical',
    meta: { auth: true, name: 'Vertical' },
    component: () => import('../views/Form Wizard/Vertical')
  }
]
const appChildRoute = (prop, mode = false) => [
  {
    path: 'chat',
    name: prop + '.chat',
    meta: { auth: true, name: 'Chat' },
    component: () => import('../views/Chat/Index')
  },
]
const defaultlayout = (prop, mode = false) => [
  {
    path: 'admin',
    name: prop + '.admin',
    meta: { auth: true, name: 'Admin' },
    component: () => import('../views/Pages/Admin')
  },
  {
    path: 'timelines',
    name: prop + '.timelines',
    meta: { auth: true, name: 'Timelines' },
    component: () => import('../views/Pages/TimeLines')
  },
  {
    path: 'faq',
    name: prop + '.faq',
    meta: { auth: true, name: 'Faq' },
    component: () => import('../views/Pages/FAQ')
  }
]

const tableChildRoute = (prop, mode = false) => [
  {
    path: 'tables-basic',
    name: prop + '.basic',
    meta: { auth: true, name: 'Basic' },
    component: () => import('../views/Tables/TablesBasic')
  },
  {
    path: 'editable',
    name: prop + '.editable',
    meta: { auth: true, name: 'Editable' },
    component: () => import('../views/Tables/EditableTable')
  },
  {
    path: 'datatable',
    name: prop + '.datatable',
    meta: { auth: true, name: 'datatable' },
    component: () => import('../views/Tables/DataTable')
  }
]
const userChildRoute = (prop, mode = false) => [
  {
    path: 'profile-edit',
    name: prop + '.profile-edit',
    meta: { auth: true, name: 'Edit Profile' },
    component: () => import('../views/User/ProfileEdit')
  },
  {
    path: 'accountsetting',
    name: prop + '.accountsetting',
    meta: { auth: true, name: 'Account Setting' },
    component: () => import('../views/User/AccountSetting')
  },
  {
    path: 'privacysetting',
    name: prop + '.privacy-setting',
    meta: { auth: true, name: 'Privacy Setting' },
    component: () => import('../views/User/PrivacySetting')
  }
]

const routes = [
  {
    path: '/',
    name: 'social',
    component: () => import('../layouts/Default'),
    children: childRoutes('social')
  },
  {
    path: '/without-leftside',
    name: 'without-leftside',
    component: () => import('../layouts/WithoutLeftside'),
    children: childRoutes('leftside')
  },
  {
    path: '/without-rightside',
    name: 'without-rightside',
    component: () => import('../layouts/WithoutRightside'),
    children: childRoutes('rightside')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layouts/Empty'),
    children: blankchildRoutes('auth')
  },
  {
    path: '/pages',
    name: 'pages',
    component: () => import('../layouts/Empty'),
    children: pagesChildRoutes('default')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../layouts/Default'),
    children: blogchildRoutes('blog')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../layouts/Default'),
    children: iconChildRoute('icon')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: formChildRoute('form')
  },
  {
    path: '/form-wizard',
    name: 'form-wizard',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: formwizardChildRoute('form-wizard')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: appChildRoute('app')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: tableChildRoute('table')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: userChildRoute('user')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if user is not logged in and trying to access a restricted page
//   const publicPages = ['/auth/signin', '/auth/signup']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('user')
//   console.log(loggedIn)
//   if (authRequired && !loggedIn) {
//     return next('/auth/signin')
//   }

//   next()
// })


export default router
