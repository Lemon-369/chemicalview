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
          <el-input v-model="formInline.name" placeholder="请输入" @keyup.enter.native="query"></el-input>
        </el-form-item>
        <el-form-item label="业务员">
          <el-input v-model="formInline.userId" placeholder="请输入" @keyup.enter.native="query"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="query">查询</el-button>
          <el-button type="success" size="small" @click="insertOpen">添加</el-button>
          <el-button type="warning" size="small" @click="update">修改</el-button>
          <el-button type="danger" size="small" @click="del">删除</el-button>
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
          prop="gid"
          label="序号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="业务员"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="供应商名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="wechat"
          label="微信或QQ"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="商品关联状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="120">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="120">
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        style="padding-top: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </el-card>
    <insertBox ref="insertBox" ></insertBox>
  </div>

</template>

<script>
  import insertBox from "./box/insertBox";
    export default {
      //供应商管理
      name: "Supplier",
      components: {
        insertBox,
      },
      data(){
        return{
          multipleSelection:[],
          formInline: {
            name: '',
            userId: null
          },
          tableData: [
            {
              gid:'',
              userId:'',
              name:'',
              phone:'',
              wechat:'',
              status:'',
              createTime:'',
              remark:''
            }
          ],
          page:{
            currentPage: 0, //当前页码（必须，否则选页有bug）
            pageSizes: '',  //每页显示条目个数
            total:0  //总条数
          }
        }
      },
      beforeCreate() {
        console.log("beforeCreate!!!");
        this.axios.get('/chemicals/supplier/query'
        )
          .then((response)=>{
            console.log(response);
            this.tableData=response.data.data;
            this.page.total=response.data.total;
            this.page.pageSizes=response.data.pageSizes;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      methods:{
        //分页
        handleSizeChange(pageSize) {
          console.log(`每页 ${pageSize} 条`);
          this.axios.get('/chemicals/supplier/query',{
              params:{
                page: this.page.currentPage,
                pageSize: pageSize
              }
            }
          )
            .then((response)=>{
              console.log(response);
              this.tableData=response.data.data;
              this.page.total=response.data.total;
              this.page.pageSizes=response.data.pageSizes;
              this.page.currentPage=response.data.currentPage
            })
            .catch(function (error) {
              console.log(error);
            })

        },
        handleCurrentChange(page) {
          console.log(`当前页: ${page}`);
          this.axios.get('/chemicals/supplier/query',{
              params:{
                page: page,
                pageSize: this.page.pageSizes
              }
            }
          )
            .then((response)=>{
              console.log(response);
              this.tableData=response.data.data;
              this.page.total=response.data.total;
              this.page.pageSizes=response.data.pageSizes;
            })
            .catch(function (error) {
              console.log(error);
            })
        },
        //val为选中数据的集合
        //通过this.multipleSelection.prop字段 取得每一个选项的值
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        query(){
          this.axios.get('/chemicals/supplier/query',{
              params:{
                name: this.formInline.name,
                userId: this.formInline.userId
              }
            }
          )
          .then((response)=>{
            console.log(response);
            this.tableData=response.data.data;
            this.page.total=response.data.total;
            this.page.pageSizes=response.data.pageSizes;
          })
          .catch(function (error) {
            console.log(error);
          })
        },
        insertOpen(){
          this.$refs.insertBox.onOpen(cancel => {
            // cancel();
            console.log('添加弹窗')
          });
        },
        del(){

        },
        update(){

        }

      }
    }
</script>

<style scoped>

</style>
