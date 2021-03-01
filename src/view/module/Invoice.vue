<template>
<!-- 发票管理 -->
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 12px">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发票管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="Cas号">
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
          prop="name"
          label="发票品名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Cas号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="价格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="单位"
          width="120">
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
    export default {
      //发票管理
        name: "Invoice",
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
