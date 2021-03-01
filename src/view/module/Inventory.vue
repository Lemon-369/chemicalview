<template>
<!-- 库存管理 -->
  <div>
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 12px">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="序号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="库存编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="产品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Cas号"
          width="120">
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="200">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="库存数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="备注">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
    export default {
      //库存管理
        name: "Inventory",
      data(){
          return{

          }
      }
    }
</script>

<style scoped>

</style>
