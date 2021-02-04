<template>
    <!--登录表单容器-->
    <div class="login_container">
      <!--登录区域-->
      <div class="login_box">
        <!--头像-->
        <div class="avatar_box">
          <img id="portrait" src="@/assets/img/六花.gif">
        </div>
        <!--表单-->
        <div class="login_form">
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="login_Form">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" show-password prefix-icon="el-icon-lock"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
      data() {
        return {
          loginForm: {
            username: '',
            password: '',
          },
          loginRules: {
            username: [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
            ],
            password: [
              {required: true, message: '请输入登录密码', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              this.$router.push("/main")
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  .login_container{
    height: 100%;
    /*background-color: aquamarine;*/
    background-image: url(../assets/img/带眼镜的女生.jpg);
    background-size: 100% 100%;
  }

  .login_box{
    width: 450px;
    height: 380px;
    background-color: #FFFFFF;
    /*设置圆角边框*/
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 1);
    /*绝对定位*/
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

  }

  .avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
    margin: -65px auto;
    background-color: pink;
  }
  #portrait{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .login_form{
    position: absolute;
    left: 10%;
    width: 80%;
    height: 65%;
    bottom: 0px;
    padding: 0px 20px;
    box-sizing: border-box;
  }

</style>
