<template>
  <div class="side-nav">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>资讯</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="item">
                <router-link class="link" to="/addClass">新增分类</router-link>
              </el-menu-item>
              <el-menu-item index="1-2" class="item">
                <router-link class="link" to="/addNews">新增资讯</router-link>
              </el-menu-item>
              <el-menu-item index="1-3" class="item">
                <router-link class="link" to="/classList">分类列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-4" class="item">
                <router-link class="link" to="/newsList">资讯列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'side-nav',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="scss">
  .side-nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    padding: 50px 0;
    width: 200px;
    background-color: rgb(84, 92, 100);
    .el-menu-vertical-demo {
      border-right: 0;
    }
    .item {
      padding: 0 !important;
    }
    .link {
      display: block;
      padding-left: 40px;
      color: #fff;
      text-decoration: none;
      // text-align: center;
    }
  }
</style>
