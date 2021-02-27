import Vue from 'vue'
import Router from 'vue-router'
import Login from "../view/Login";
import Main from "../view/Main";
import Users from "../view/module/Users";
import SalesReturn from "../view/module/SalesReturn";
import Supplier from "../view/module/Supplier";
import Purchase from "../view/module/Purchase";
import Order from "../view/module/Order";
import Invoice from "../view/module/Invoice";
import Inventory from "../view/module/Inventory";
import Commodity from "../view/module/Commodity";

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
          name: 'users',
          component: Users
        },
        {
          path: 'main/salesReturn',
          name: 'salesReturn',
          component: SalesReturn
        },
        {
          path: 'main/Supplier',
          name: 'supplier',
          component: Supplier
        },
        {
          path: 'main/purchase',
          name: 'purchase',
          component: Purchase
        },
        {
          path: 'main/order',
          name: 'order',
          component: Order
        },
        {
          path: 'main/invoice',
          name: 'invoice',
          component: Invoice
        },
        {
          path: 'main/inventory',
          name: 'inventory',
          component: Inventory
        },
        {
          path: 'main/commodity',
          name: 'commodity',
          component: Commodity
        },
      ]
    },

  ]
})
