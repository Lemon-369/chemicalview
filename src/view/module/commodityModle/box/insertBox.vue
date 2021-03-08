<template>
  <div>
    <el-dialog v-bind="$attrs" :visible="visible"
               width="400px"
               v-on="$listeners" @open="onOpen" @close="onClose" title="添加商品信息">
<!--      <slot v-if="visible"></slot>-->
      <el-row :gutter="15">
        <el-form ref="insertForm"
                 :model="formData"
                 style="width: 90%"
                 size="medium"
                 label-width="80px">
          <el-col :span="24">
            <el-form-item label="产品名称" prop="name">
              <el-input v-model="formData.name" placeholder="输入产品名称" :maxlength="11" show-word-limit
                        clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="cas号" prop="cas">
              <el-input v-model="formData.cas" placeholder="请输入cas号" :maxlength="11" show-word-limit
                        clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="报价信息" prop="priceInfo">
              <el-input v-model="formData.priceInfo" placeholder="请输入报价" :maxlength="11" show-word-limit
                        clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日期选择" prop="createTime">
              <el-date-picker v-model="formData.createTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="业务员" prop="userId">
              <el-select v-model="formData.userId" placeholder="请选择业务员" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in userArray" :key="index" :label="item.userName"
                           :value="item.uid" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商" prop="gid">
              <el-select v-model="formData.supplierId" placeholder="请选择供应商" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in supplierArray" :key="index" :label="item.name"
                             :value="item.gid" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品介绍" prop="commodityInfo">
              <el-input v-model="formData.commodityInfo" type="textarea" placeholder="请输入备注"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-button type="success" icon="el-icon-search" size="small" @click="submit"> 提交 </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-button type="warning" icon="el-icon-refresh-left" size="small" @click="reset"> 重置 </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "insertBox",
    inheritAttrs: false,
    props: [],
    data() {
      return {
        //控制弹窗open
        visible: false,
        // visibleSlot: false,
        formData: {
          name: undefined,
          cas: undefined,
          userId: undefined,
          createTime: null,
          priceInfo: undefined,
          sName:undefined,
          supplierId: undefined,
          commodityInfo: undefined,
        },
        //业务员选项
        userArray: [ {
          userName: '',
          uid: 0
        }],
        supplierArray: [
          {
            name:'',
            gid:''
          }
        ]
      }
    },
    methods: {
      onOpen() {
        this.visible = true;
        // this.visibleSlot = true;
        //弹窗打开时查询用户表业务员
        this.axios.get("/chemicals/supplier/queryUser")
          .then((response)=>{
            console.log(response);
            this.userArray = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
        //查询供应商信息
        this.axios.get("/chemicals/supplier/querySupplier")
          .then((response)=>{
            console.log(response);
            this.supplierArray = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //提交添加表单
      submit(){
        let data = {
          name: this.formData.name,
          cas: this.formData.cas,
          userId: this.formData.userId,
          supplierId: this.formData.supplierId,
          createTime: this.formData.createTime,
          priceInfo: this.formData.priceInfo,
          commodityInfo: this.formData.commodityInfo
        };
        this.axios.post("/chemicals/commodity/insert",data)
          .then((response)=>{
            console.log(response);
            if(response.data==1){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.visible = false;
            }else {
              this.$message.error('添加失败');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //窗口X关闭
      onClose() {
        this.visible = false;
        //窗口关闭重置操作，insertForm对应表单
        this.$refs.insertForm.resetFields()
      },
      //重置
      reset() {
        //重置操作，insertForm对应表单
        this.$refs.insertForm.resetFields();
        console.log("重置")
      },
      handelConfirm() {
        this.$refs['insertForm'].validate(valid => {
          if (!valid) return
          this.close()
        })
      },
    }
  }

</script>
<style>

</style>
