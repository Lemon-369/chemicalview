<template>
<!-- 供应商管理 -->
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 12px">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="供应商">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="业务员">
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
          label="序号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="业务员"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="供应商名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="微信或QQ"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="商品关联状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="备注"
          width="120">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
    export default {
      //供应商管理
        name: "Supplier",
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
