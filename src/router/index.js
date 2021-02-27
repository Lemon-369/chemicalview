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
        //业务员管理
        {
          path: '/main/users',
          name: 'users',
          component: Users
        },
        //退货管理
        {
          path: '/main/salesReturn',
          name: 'salesReturn',
          component: SalesReturn
        },
        //供应商管理
        {
          path: '/main/supplier',
          name: 'supplier',
          component: Supplier
        },
        //采购管理
        {
          path: '/main/purchase',
          name: 'purchase',
          component: Purchase
        },
        //订单管理
        {
          path: '/main/order',
          name: 'order',
          component: Order
        },
        //发票管理
        {
          path: '/main/invoice',
          name: 'invoice',
          component: Invoice
        },
        //库存管理
        {
          path: '/main/inventory',
          name: 'inventory',
          component: Inventory
        },
        //商品管理
        {
          path: '/main/commodity',
          name: 'commodity',
          component: Commodity
        }
      ]
    },

  ]
})
