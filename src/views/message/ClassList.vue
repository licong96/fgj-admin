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
        prop="_classno"
        label="类型编号">
      </el-table-column>
      <el-table-column
        prop="_classindex"
        label="ClassIndex">
      </el-table-column>
      <el-table-column
        prop="_regdate"
        label="添加时间">
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

  var emptyObj = {
    ParentID: '',
    ClassNo: '',
    ClassIndex: '',
    ClassName: '',
  }
  export default {
    name: 'newsClass',
    data() {
      return {
        tableData4: []
      }
    },
    activated() {
      this.GetListMore()
    },
    methods: {
      GetListMore() {
        GetListMore({
          num: 9
        }).then(res => {
          if (res.data.result === 'success') {
            this.tableData4 = res.data.data
          }
        })
      },
      handleEdit(index, data) {
        this.$router.push({
          path: '/addClass',
          query: {
            NewsClassID: data._newsclassid
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
