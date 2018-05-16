<template>
  <!-- 分类列表 -->
  <div class="class-list">
    <el-table
      :data="tableData4"
      border
      stripe
      style="width: 100%">
      <el-table-column
        fixed
        prop="_classname"
        label="类型名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="_longtitle"
        label="长标题">
      </el-table-column>
      <el-table-column
        prop="_shorttitle"
        label="短标题">
      </el-table-column>
      <el-table-column
        prop="_shortcontent"
        label="内容摘要">
      </el-table-column>
      <el-table-column
        prop="_moddate"
        label="最后修改时间"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { GetListMore } from '@/api/message/public'
  import { GetNewsList } from '@/api/message/newsList'

  var emptyObj = {
    ParentID: '',
    ClassNo: '',
    ClassIndex: '',
    ClassName: '',
  }
  export default {
    name: 'newsList',
    data() {
      return {
        tableData4: [],
        classData: [],    // 所有分类数据
      }
    },
    activated () {
      this.GetListMore()    // 获取所有分类
    },
    methods: {
      // 获取所有分类
      GetListMore() {
        GetListMore({
          num: 9
        })
        .then(res => {
          if (res.data.result === 'success') {
            this.classData = res.data.data
            this.GetNewsList()    // 获取资讯列表
          }
        })
      },
      // 获取资讯列表
      GetNewsList() {
        GetNewsList({
          num: 99
        }).then(res => {
          if (res.data.result === 'success') {
            let data = res.data.data
            this.filter(data)
            this.tableData4 = data
          }
        })
      },
      filter(data) {
        let classData = this.classData

        data.map(list => {
          for (let i = 0; i < classData.length; i++) {
            if (classData[i]._newsclassid === list._newsclassid) {
              list._classname = classData[i]._classname
            }
          }
        })
      },
      handleEdit(index, data) {
        this.$router.push({
          path: '/addNews',
          query: {
            NewsID: data._newsid
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
