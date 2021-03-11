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
          <el-input v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="Cas号">
          <el-input v-model="formInline.cas" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="formInline.updateTimeOne"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-date-picker
            v-model="formInline.updateTimeTwo"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="querySubmit">查询</el-button>
          <el-button type="success" size="small" @click="insertOpen">添加</el-button>
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
          prop="sid"
          label="商品编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="产品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cas"
          label="Cas号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="priceInfo"
          label="报价信息"
          width="120">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="业务员名称"
          width="120">
        </el-table-column>
        <el-table-column
          label="更新日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column
          prop="commodityInfo"
          label="商品介绍"
          width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="update(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="del(scope.row)">删除</el-button>
            <el-button
              size="mini"
              @click="querySupplier(scope.row)">查看供应商</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        style="padding-top: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </el-card>
    <insertBox ref="insertBox" ></insertBox>
    <updateBox ref="updateBox"></updateBox>
  </div>
</template>

<script>
  import insertBox from "./box/insertBox";
  import updateBox from "./box/updateBox";
    export default {
      //商品管理
        name: "Commodity",
      components:{
        insertBox,
        updateBox
      },
      data() {
        return {
          //表单数据
          formInline: {
            name: '',
            cas: '',
            updateTimeOne: null,
            updateTimeTwo: null,
          },
          //查看供应商
          supplier:{
            name:'',  //供应商名称
            phone:''  //电话
          },
          //表格数据
          tableData: [
            {
              sid:'',
              name:'',
              cas:'',
              userName:'',//业务员名称
              priceInfo:'',//报价信息
              updateTime:'',//更新时间
              supplierId:'',//供应商id
              commodityInfo:''//商品介绍
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
        this.axios.get('/chemicals/commodity/query'
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
      methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //模糊查询
        querySubmit() {
          console.log('querySubmit!');
          this.axios.get('/chemicals/commodity/query',{
            params:{
              name: this.formInline.name,
              cas: this.formInline.cas,
              updateTimeOne: this.formInline.updateTimeOne,
              updateTimeTwo: this.formInline.updateTimeTwo,
            }
          }).then((response)=>{
            console.log(response)
            this.tableData=response.data.data;
            this.page.total=response.data.total;
            this.page.pageSizes=response.data.pageSizes;
          })
        },
        //添加
        insertOpen(){
          this.$refs.insertBox.onOpen();
        },
        //删除
        del(val) {
          console.log("sid:"+val.sid)
          this.$confirm('此操作将删除商品：【'+val.name+'】, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.axios.delete("/chemicals/commodity/delete",{
              params: {
                sid: val.sid
              }
            }).then((response)=>{
              if(response.data==1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }else {
                this.$message.error('删除失败');
              }
            })
          })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        },
        //编辑
        update(data){
          this.$refs.updateBox.onOpen(data);
        },
        //查看供应商
        querySupplier(data){
          console.log(data.supplierId)
          this.axios.get("/chemicals/supplier/queryById",{
            params:{
              supplierId: data.supplierId
            }
          }).then((response)=>{
            this.supplier=response.data
            this.$alert('供应商：'+this.supplier.name+' | 电话：'+this.supplier.phone,
              '查看供应商', {
              confirmButtonText: '确定',
            });
          })
        },
        //分页
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>

<style>
.upload-img{
  display: inline-block;
}
</style>
