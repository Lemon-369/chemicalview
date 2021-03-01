<template>
<!-- 订单管理 -->
  <div>
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 12px">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="日期">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp">
          </el-date-picker>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="">查询</el-button>
          <el-button type="success" size="small" @click="">添加</el-button>
          <el-button type="warning" size="small" @click="">修改</el-button>
          <el-button type="danger" size="small" @click="">删除</el-button>
        </el-form-item>
      </el-form>
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
          label="商品编号"
          width="100">
        </el-table-column><el-table-column
        prop="name"
        label="产品名称"
        width="100">
      </el-table-column>
        <el-table-column
          prop="name"
          label="数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="单价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="成本"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="其他成本"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总成本"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="提成"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="出库状态"
          width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">生成标签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        style="padding-top: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
    export default {
      //订单管理
        name: "Order",
      data(){
          return{
            formInline: {
              user: '',
              region: ''
            },
            tableData: [
              {

              }
            ]
          }
      }
    }
</script>

<style scoped>

</style>
