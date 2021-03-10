<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 12px">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务员管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--用户列表卡片-->
    <el-card class="box-card">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="用户">
          <el-input v-model="formData.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="userId">
          <el-select v-model="formData.userId" placeholder="请选择权限" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in privilege" :key="index" :label="item.userName"
                       :value="item.uid" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
        :data="tableData"
        border
        style="width: 100%; height: 450px">
        <el-table-column
          prop="date"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="type"
          label="权限">
        </el-table-column>
        <el-table-column width="300" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="">修改</el-button>
            <el-button type="danger" size="mini" @click="">删除</el-button>
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
      name: "Users",
      data() {
        return {
          currentPage: 4,
          formData: {
            user: '',
            region: ''
          },
          tableData: [{

          }],
          //业务员选项
          privilege: {
            admin:'',

          },

        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>

<style scoped>

</style>
