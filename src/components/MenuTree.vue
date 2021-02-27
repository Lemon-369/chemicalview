<template>
    <div>
      <el-menu-item index="/main/users">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/main/users">
        <i class="el-icon-s-order"></i>
        <span slot="title">发票管理</span>
      </el-menu-item>
      <el-menu-item index="/main/users">
        <i class="el-icon-discount"></i>
        <span slot="title">库存管理</span>
      </el-menu-item>
      <el-menu-item index="/main/users">
        <i class="el-icon-truck"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/main/users">
        <i class="el-icon-set-up"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/main/users">
        <i class="el-icon-shopping-cart-1"></i>
        <span slot="title">采购管理</span>
      </el-menu-item>
      <el-menu-item index="/main/users">
        <i class="el-icon-s-custom"></i>
        <span slot="title">业务员管理</span>
      </el-menu-item>
      <el-menu-item index="/main/salesReturn">
        <i class="el-icon-sold-out"></i>
        <span slot="title">退货管理</span>
      </el-menu-item>
    </div>
</template>

<script>
    export default {
        name: "MenuTree"
    }
</script>

<style scoped>

</style>
