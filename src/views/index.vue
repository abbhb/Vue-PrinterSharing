<template>
  <div class="home">
    <header class="header">
      <div class="left">
        AI服务平台
        <el-button
            @click="onMenuCollapse"
            circle
            :icon="menuCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></el-button>
      </div>
      <div class="right" style="display: flex;flex-direction: row;align-items: center;">
        <div style="margin-right: 30px;font-size: 12px;color: rgba(255,255,255,0.78)">
          <el-link @click.native="setIsNeedZoom">显示异常?点击修复视图</el-link>
        </div>
        <div class="warp" style="margin-right: auto;">
          <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar shape="circle" :size="40"  :src="userphoto" />
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{name}}</el-dropdown-item>
              <el-dropdown-item>切换账号</el-dropdown-item>
              <el-dropdown-item @click.native="onLogOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <section class="section">
      <div class="tac">
        <div class="col1">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse="menuCollapse"
              :unique-opened="true"
              :default-openeds="defaultUnfoldedMenu"
              select="1-1"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
          >
            <div v-for="(item) in menuData " :key="item.index">
              <el-submenu
                  v-if="item.childList && item.childList.length > 0"
                  :index="item.index"
              >
                <template slot="title">
                  <i :class="item.iconClassName"></i>
                  <span slot="title">{{ !menuCollapse? item.optionName : '' }}</span>
                </template>
                <el-menu-item
                    v-for="(item1) in item.childList"
                    :key="item1.index"
                    :index="item1.index"
                    :routerName="item1.routerName"
                    @click="onClickMenu(item1)"
                >
<!--                  {{ item1.optionName }}-->
                  <template slot="title">
                    <i :class="item1.iconClassName"></i>
                    <span slot="title">{{ !menuCollapse? item1.optionName : '' }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                  v-else
                  :index="item.index"
                  :disabled="item.disabled"
                  :routerName="item.routerName"
                  @click="onClickMenu(item)"
              >
                <i :class="item.iconClassName"></i>
                <span slot="title">{{ !menuCollapse? item.optionName : '' }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </div>
        <div class="col2">
          <header class="col2_header">
            <el-tag
                v-for="tag in tags"
                :key="tag.routerName"
                closable
                @close="close(tag)"
                @click="clickTag(tag)"
                :type="tag.type?tag.type:'info'"
                class="item"
            >{{tag.name}}</el-tag>
          </header>
          <div class="warp">
            <router-view />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import * as Api from "@/api/login";


export default {
  name:'index',
  data() {
    return {
      // 菜单配置
      menuData:[
        {
          optionName: "我的主页",
          iconClassName: "el-icon-eleme",
          index: '1',
          disabled: false, // 是否禁用
          childList: [
            {
              optionName: '个人信息',
              index: '1-1',
              routerName: "userinfo",
              iconClassName: "el-icon-user",
            },
            {
              optionName: '修改密码',
              index: '1-4',
              routerName: "changepassword",
              iconClassName: "el-icon-lock"
            }
          ]
        },
        {
          optionName: "打印服务",
          iconClassName: "el-icon-setting",
          index: '2',
          disabled: false, // 是否禁用
          childList: [
            {
              optionName: '打印页',
              index: '2-1',
              routerName: "printindex",
              iconClassName: "el-icon-s-shop"
            }
          ]
        }

      ],
      menuCollapse: false, //是否水平折叠收起菜单
      defaultUnfoldedMenu: '1', // 默认展开第一项
      tags: [],
      userphoto:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      showPhotoMenu:false,
      name:'11',
      userInfo:{},
    };
  },
  created() {
    this.defaultUnfoldedMenu = [
      localStorage.getItem("defaultUnfoldedMenu")
    ];
    this.menuCollapse = JSON.parse(localStorage.getItem("menuCollapse"));
    this.tags = JSON.parse(localStorage.getItem("tagsNavList")) || [];
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo){
      this.userInfo = JSON.parse(userInfo)
    }

    this.name = this.userInfo.name;

  },
  methods: {
    // 收取菜单按钮
    onMenuCollapse() {
      this.menuCollapse = !this.menuCollapse;
      localStorage.setItem("menuCollapse", this.menuCollapse);
      this.defaultUnfoldedMenu = [
        localStorage.getItem("defaultUnfoldedMenu")
      ];
    },
    // 菜单展开
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      localStorage.setItem("defaultUnfoldedMenu", "" + key);
    },
    // 菜单收取
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击菜单项
    onClickMenu(item) {
      let _this = this;
      // 如果要跳转的路由和当前路由一致就 return
      if (this.$router.history.current.name == item.routerName) return;
      this.$router.push({
        name: item.routerName
      });
      // 如果tags中已经存在 return
      let temp = includes(item.routerName);
      if (temp) {
        this.tags.forEach(item => {
          item.type = "info";
        });
        temp.type = "success";
        return;
      }
      this.tags.forEach(item => {
        item.type = "info";
      });
      this.tags.push({
        name: item.optionName,
        routerName: item.routerName,
        type: "success"
      });

      this.changeTagColor(item.routerName);
      localStorage.setItem("tagsNavList", JSON.stringify(this.tags));
      // 查看当前 tags里有没有传进来的路由，返回 true false

      function includes(routerName) {
        let tags = _this.tags;
        return tags.find(item => {
          return item.routerName == routerName;
        });
      }
    },
    // 点击 tag
    clickTag(tag) {
      console.log(tag.routerName);
      if (this.$router.history.current.name == tag.routerName) return;
      this.$router.push({
        name: tag.routerName
      });
      this.changeTagColor(tag.routerName);
      localStorage.setItem("tagsNavList", JSON.stringify(this.tags));
    },
    // 点击 tag 的小×
    close(tag) {
      console.log(tag);
      let spliceIndex = this.tags.findIndex(item => {
        return item.routerName == tag.routerName;
      });
      console.log(spliceIndex);
      this.tags.splice(spliceIndex, 1);
      localStorage.setItem("tagsNavList", JSON.stringify(this.tags));
    },
    // 改变tag的颜色 公用的
    changeTagColor(routerName) {
      this.tags.forEach(item => {
        if (item.routerName == routerName) {
          item.type = "success";
        } else {
          item.type = "info";
        }
      });
    },
    setIsNeedZoom(){
      this.$globl.isNeedZoom = true;
      document.body.style.zoom = 0.9
    },
    async onLogOut() {
      const data = await Api.logoutApi()
      console.log(data)

      if (String(data.code)==='900'){
        this.$message.success(data.msg);
        sessionStorage.clear();
        localStorage.clear();
        this.$router.push("login");
      }
      else if (data.status===701){
        this.$message.error(data.msg);

      }

    },

  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  .header {
    background-color: #545c64;
    height: 40px;
    padding: 10px 20px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 25px;
      color: #fff;
    }
    .right {
      .warp {
        margin-right: 20px;
      }
    }
  }
  .section {
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
    .tac {
      flex: 1;
      display: flex;
      height: 96%;
      box-sizing: border-box;
      .col1 {
        margin-right: 5px;
        background-color: #545c64;
      }
      .col2 {
        flex: 1;
        background-color: #fff;
        padding: 0 15px 15px 15px;
        border-radius: 5px;
        margin-right: 5px;
        height: 100%;
        overflow: auto;
        .col2_header {
          position: relative;
          width: 85%;
          height: 50px;
          overflow: hidden;
          border-bottom: 2px solid #eee;
          background-color: #fff;
          padding: 10px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          z-index: 2000;
          position: fixed;
          .item {
            margin-right: 8px;
          }
        }
        .warp {
          margin: 15px;
          padding-top: 55px;
        }
      }
    }
  }
  // border: 1px solid #f00;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
// 下拉菜单
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>