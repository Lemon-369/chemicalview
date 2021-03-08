<template>
  <div>
    <el-dialog v-bind="$attrs" :visible="visible"
               width="400px"
               v-on="$listeners" @open="onOpen" @close="onClose" title="添加供应商信息">
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
            <el-form-item label="cas" prop="cas">
              <el-input v-model="formData.cas" placeholder="请输入cas号" :maxlength="11" show-word-limit
                        clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="报价信息" prop="priceInfo">
              <el-input v-model="formData.priceInfo" placeholder="请输入报价信息" :maxlength="11" show-word-limit
                        clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日期选择" prop="updateTime">
              <el-date-picker v-model="formData.updateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="业务员" prop="userId">
              <el-select v-model="formData.userName" placeholder="请选择业务员" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in userArray" :key="index" :label="item.userName"
                           :value="item.uid" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品介绍" prop="commodityInfo">
              <el-input v-model="formData.commodityInfo" type="textarea" placeholder="请输入商品介绍"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" style="padding: 10px 50px">
            <el-form-item>
              <el-button type="success" icon="el-icon-search" @click="submit"> 提交 </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "updateBox",
    inheritAttrs: false,
    props: [],
    data() {
      return {
        //控制弹窗open
        visible: false,
        // visibleSlot: false,
        formData: {
          sid:'',
          name:'',
          cas:'',
          userName:'',//业务员名称
          priceInfo:'',//报价信息
          updateTime:'',//更新时间
          supplierId:'',//供应商id
          commodityInfo:''//商品介绍
        },
        //业务员选项
        userArray: [ {
          "userName": '',
          "uid": 0
        }]
      }
    },
    methods: {
      onOpen(data) {
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
        //将获取到的值填充进表单中
        this.formData.sid=data.sid,
        this.formData.name=data.name,
        this.formData.userName=data.userName,
        this.formData.cas=data.cas,
        this.formData.priceInfo=data.priceInfo,
        this.formData.commodityInfo=data.commodityInfo
      },
      //提交修改表单
      submit(){
        let data = {
          sid: this.formData.sid,
          name: this.formData.name,
          cas: this.formData.cas,
          priceInfo: this.formData.priceInfo,
          updateTime: this.formData.updateTime,
          userId: this.userArray.uid,
          commodityInfo: this.formData.commodityInfo,
        };
        this.axios.put("/chemicals/commodity/update",data)
          .then((response)=>{
            console.log(response);
            if(response.data==1){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.visible = false;
            }else {
              this.$message.error('更新失败');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //窗口X关闭
      onClose() {
        this.visible = false;
      },
      handelConfirm() {
        this.$refs['updateBox'].validate(valid => {
          if (!valid) return
          this.close()
        })
      },
    }
  }

</script>
<style>

</style>
