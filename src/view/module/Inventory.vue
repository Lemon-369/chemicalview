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
          prop="kid"
          type="index"
          label="序号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="number"
          label="库存编号"
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
          label="更新日期"
          width="200">
          <template slot-scope="scope">{{ scope.row.updateTime}}</template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="库存数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column width="300" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="addition(scope.row.kid)">增加库存</el-button>
            <el-button size="mini" @click="subtract(scope.row.kid,scope.row.amount)">减少库存</el-button>
          </template>
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
  </div>
</template>

<script>
    export default {
      //库存管理
        name: "Inventory",
      data(){
        return{
          tableData:[{
            kid:'', //库存id
            number:'',  //库存编号
            name:'',  //商品名称
            cas:'',
            updateTime:'',  //更新时间
            amount:'',  //库存数量
            remark:'',  //备注
          }],
          page:{
            currentPage: 0, //当前页码（必须，否则选页有bug）
            pageSizes: '',  //每页显示条目个数
            total:0  //总条数
          }
        }
      },
      beforeCreate() {
        console.log("beforeCreate!!!");
        this.axios.get('/chemicals/inventory/query'
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
        //val为选中数据的集合
        //通过this.multipleSelection.prop字段 取得每一个选项的值
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //分页
        handleSizeChange(pageSize) {
          console.log(`每页 ${pageSize} 条`);
          this.axios.get('/chemicals/inventory/query',{
              params:{
                page: this.page.currentPage,
                pageSize: pageSize
              }
            }
          ).then((response)=>{
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
          this.axios.get('/chemicals/inventory/query',{
              params:{
                page: page,
                pageSize: this.page.pageSizes
              }
            }
          ).then((response)=>{
              console.log(response);
              this.tableData=response.data.data;
              this.page.total=response.data.total;
              this.page.pageSizes=response.data.pageSizes;
            })
            .catch(function (error) {
              console.log(error);
            })
        },
        //增加库存
        addition(kid){
            this.$prompt('请输入', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              this.axios.put('/chemicals/inventory/addition',{
                amount: value,
                kid: kid
              }).then((response)=>{
                console.log(response)
                if(response.data==1){
                  this.$message({
                    message: '库存增加成功',
                    type: 'success'
                  });
                  this.visible = false;
                }else {
                  this.$message.error('更新失败');
                }
              }).catch(function (error) {
                console.log(error);
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
        },
        //减少库存
        subtract(kid,amount){
          if(amount>0){
            this.$prompt('请输入', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              this.axios.put('/chemicals/inventory/subtract',{
                amount: value,
                kid: kid
              }).then((response)=>{
                console.log(response)
                if(response.data==1){
                  this.$message({
                    message: '库存减少成功',
                    type: 'success'
                  });
                  this.visible = false;
                }else {
                  this.$message.error('更新失败');
                }
              }).catch(function (error) {
                console.log(error);
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
          }else {
            this.$message({
              message: '警告！库存为空，无法减少',
              type: 'warning'
            });
          }
        }


      }

    }
</script>

<style scoped>

</style>
