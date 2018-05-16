<template>
  <div id="app">
    <!-- 登陆 -->
    <login />
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <side-nav />
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Login from '@/components/Login'
  import SideNav from '@/components/SideNav'

  export default {
    name: 'app',
    data() {
      return {

      }
    },
    created() {
    },
    components: {
      Login,
      SideNav
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
