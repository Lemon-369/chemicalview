<template>
  <el-container class="main_container">
      <!--头部布局-->
      <el-header>
        <!--logo和项目名称-->
        <div class="left_box">
          <img src="../assets/logo.png">
          <span>Pears Admin</span>
        </div>
        <!--用户登录展示的头像-->
        <div class="right_box">
          <el-dropdown>
            <img src="../assets/img/六花.gif">
            <!--下拉菜单-->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-house">系统首页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-ship">交流讨论</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-header>

      <el-container>
        <!--侧边栏-->
        <el-aside :width="isCollapse?'64px':'200px'">
          <!--展开/收起-->
          <div class="toggle_box" @click="toggleCollapse">
            <i class="el-icon-s-fold" v-if="isUnfold"></i>
            <i class="el-icon-s-unfold" v-if="isFewer"></i>
          </div>
          <el-menu
            :default-active="activerouter"
            class="el-menu-vertical-demo"
            router
            :collapse="isCollapse"
            :collapse-transition="false"
            @open="handleOpen"
            @close="handleClose"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b">
                <MenuTree></MenuTree>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view ></router-view>
        </el-main>
      </el-container>

  </el-container>
</template>

<script>
  import MenuTree from "../components/MenuTree";

    export default {
      name: "Main",
      components:{
        MenuTree
      },
      data() {
          return {
            isCollapse: true,
            isUnfold: true,
            isFewer: false,
            activerouter: ""
          };
        },
        methods:{
          toggleCollapse(){
            this.isCollapse = !this.isCollapse
            this.isUnfold = !this.isUnfold
            this.isFewer = !this.isFewer
          }
        },
      mounted() {
        //获取地址栏中的路由，设置elementui中的导航栏选中状态
        this.activerouter = window.location.pathname;
      }
    }
</script>

<style lang="less" scoped>

  /*设置整个容器高度*/
  .main_container{
    height: 100%;
  }

  /*头部区域样式*/
  .el-header {
    /*背景色 #001529*/
    background-color: #001529;
    /*流式布局*/
    display: flex;
    /*左右对齐*/
    justify-content: space-between;
    /*字体色*/
    color: #FFFFFF;
    padding-left: 0px;
    /*字体居中*/
    align-items: center;
    font-size: 20px;
    /*logo部分样式*/
    .left_box{
      display: flex;
      align-items: center;
      img{
        width: 60px;
        height: 60px;
        margin: 0px 0px 2px 10px;
      }
    }

    /*用户头像样式*/
    .right_box{
        .el-dropdown>img{
          height: 60px;
          width: 60px;
          /*设置圆角边框*/
          border-radius: 50%;
          margin: 5px 15px 2px 10px;
          background-size: contain;
        }
    }

  }
  /*侧边栏样式*/
  .el-aside {
    background-color: #001529;
    color: #333;

    /*修正设置侧边栏边框突出*/
    .el-menu{
      border-right: none;
    }

    /* 展开/收起 */
    .toggle_box{
      background-color: mediumaquamarine;
      font-size: 20px;
      /*行高*/
      line-height: 25px;
      color: #FFFFFF;
      text-align: center;
      /*字体间距*/
      letter-spacing: 0.2em;
      /*cursor 获取焦点显示方式*/
      cursor: pointer;
    }
  }
  /*内容主体*/
  .el-main {
    background-color: #E9EEF3;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  /*下拉菜单样式*/
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }


</style>
