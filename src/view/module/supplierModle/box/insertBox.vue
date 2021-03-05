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
            <el-form-item label="供应商" prop="name">
              <el-input v-model="formData.name" placeholder="输入供应商" :maxlength="11" show-word-limit
                        clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入手机号电话" :maxlength="11" show-word-limit
                        clearable prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="微信/qq" prop="wechat">
              <el-input v-model="formData.wechat" placeholder="请输入手机号微信/qq" :maxlength="11" show-word-limit
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
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注"
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
          phone: undefined,
          createTime: null,
          wechat: undefined,
          userId: undefined,
          remark: undefined,
        },
        //业务员选项
        userArray: [ {
          "userName": '',
          "uid": 0
        }]
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
      },
      //提交添加表单
      submit(){
        let data = {
          "name": this.formData.name,
          "phone": this.formData.phone,
          "wechat": this.formData.wechat,
          "createTime": this.formData.createTime,
          "userId": this.formData.userId,
          "remark": this.formData.remark,
          "status": '0',
        };
        this.axios.post("/chemicals/supplier/insert",data)
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
