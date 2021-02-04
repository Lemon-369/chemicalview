import Vue from 'vue'
import Router from 'vue-router'
import Login from "../view/Login";
import Main from "../view/Main";
import Users from "../view/user/Users";

Vue.use(Router)

//创建路由对象并配置路由规则
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../view/Login')
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children :[
        {
          path: '/main/users',
          name: 'Users',
          component: Users
        }
      ]
    }
  ]
})
