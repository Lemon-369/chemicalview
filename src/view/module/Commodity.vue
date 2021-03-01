<template>
<!-- 商品管理 -->
  <div>
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 12px">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="产品名称">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="Cas号">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
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
        <el-form-item>
          <el-button type="primary" size="small" @click="querySubmit">查询</el-button>
          <el-button type="success" size="small" @click="inputSubmit">添加</el-button>
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
          width="120">
        </el-table-column><el-table-column
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
          prop="name"
          label="报价信息"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="业务员名称"
          width="120">
        </el-table-column>
        <el-table-column
          label="更新日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看供应商</el-button>
            <el-upload
              class="upload-img"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
      //商品管理
        name: "Commodity",
      data() {
        return {
          formInline: {
            user: '',
            region: ''
          },
          tableData: [
            {

            }
          ]
        }
      },
      methods: {
        querySubmit() {
          console.log('querySubmit!');
        },
        inputSubmit() {
          console.log('inputSubmit!');
        },
        deleteSubmit() {
          console.log('deleteSubmit!');
        },
        //分页
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        //操作
        handleEdit(index, row) {
          console.log(index, row);
        }
      }

    }
</script>

<style>
.upload-img{
  display: inline-block;
}
</style>
