// import Msite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods.vue'
import Ratings from '../pages/Shop/Ratings.vue'
import Info from '../pages/Shop/Info.vue'
import Userdetail from '../pages/Userdetail/Userdetail.vue'
export default [
  {
    path: '/msite',
    component: Msite,
    // meta:它会保存在$route中，在组件中可以通过$route.meta.xxx读取
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userdetail',
    component: Userdetail
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: '/shop/ratings',
        component: Ratings
      },
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
