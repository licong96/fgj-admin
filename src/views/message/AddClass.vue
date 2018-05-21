<template>
  <!-- 新增分类 -->
  <div class="news-class">
    <h2 class="top-title">{{btnText}}</h2>
    <el-form ref="addClass" :model="addClass" :rules="rules" label-width="80px">
      <!-- <el-form-item label="分类" prop="ParentID">
        <el-select v-model="addClass.ParentID" placeholder="请选择分类">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in parentData" :key="index"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="类型名称" prop="ClassName">
        <el-input v-model="addClass.ClassName" placeholder="请输入类型名称"></el-input>
      </el-form-item>
      <el-form-item label="类型编号" prop="ClassNo">
        <el-input v-model="addClass.ClassNo" placeholder="请输入类型编号"></el-input>
      </el-form-item>
      <el-form-item label="类型序号" prop="ClassIndex">
        <el-input v-model="addClass.ClassIndex" placeholder="请输入类型序号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit" @click="onSubmit('addClass')">{{btnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { AddClass, UpClass } from '@/api/message/newsClass'
  import { GetListMore } from '@/api/message/public'

  var emptyObj = {
    ParentID: '',
    ClassNo: '',
    ClassIndex: '',
    ClassName: '',
  }

  export default {
    name: 'newsClass',
    beforeRouteUpdate (to, from, next) {
      this.NewsClassID = ''
      this.addClass = Object.assign({}, emptyObj)
      next()
    },
    data() {
      return {
        NewsClassID: '',    // 有NewsClassID就是修改
        NewsClassData: null,  // 临时保存当前分类数据
        btnText: '新增分类',
        parentData: [
          {
            label: '最新政策',
            value: '0'
          }, {
            label: '业界动态',
            value: '1'
          }, {
            label: '投资资讯',
            value: '2'
          }, {
            label: '市场评估',
            value: '3'
          }, {
            label: '周边游乐',
            value: '4'
          }
        ],
        addClass: Object.assign({}, emptyObj),
        rules: {
          ParentID: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ],
          ClassNo: [
            {required: true, message: '请输入类型编号', trigger: 'blur'}
          ],
          ClassIndex: [
            {required: true, message: '请输入类型序号', trigger: 'blur'}
          ],
          ClassName: [
            {required: true, message: '请输入类型名称', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      console.log('created')
    },
    activated() {
      // 有ID就是修改，没有就是添加
      this.NewsClassID = this.$route.query.NewsClassID
      if (this.NewsClassID) {
        this.btnText = '修改分类'
        this.GetListMore();   // 获取当前分类数据
      }
    },
    methods: {
      onSubmit(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 判断是新增还是修改
            if (_this.NewsClassID) {
              _this._UpClass()
            } else {
              _this._addClass()
            }
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      // 新增分类
      _addClass() {
        var param = this.addClass
        AddClass(param).then(res => {
          if (res.data.result === 'success') {
            this.$message.success('添加成功！');
            this.addClass = Object.assign({}, emptyObj)
          } else {
            this.$message.error('添加失败！');
          }
        }, err => {
          this.$message.error(err)
        })
      },
      // 修改分类
      _UpClass() {
        UpClass(this.addClass).then(res => {
          if (res.data.result === 'success') {
            this.$message.success('修改成功！');
          } else {
            this.$message.error('修改失败！');
          }
        })
      },
      // 获取当前分类数据
      GetListMore() {
        let NewsClassID = this.NewsClassID
        GetListMore({
          num: 9
        }).then(res => {
          let data = res.data.data
          for (let i = 0; i < data.length; i++) {
            if (data[i]._newsclassid === NewsClassID) {
              this.NewsClassData = data[i]
              // console.log(this.NewsClassData)
              this.addData()
              return
            }
          }
        })
      },
      // 填充要修改的数据 
      addData() {
        let NewsClassData = this.NewsClassData
        this.addClass.ClassNo = NewsClassData._classno
        this.addClass.ClassIndex = NewsClassData._classindex
        this.addClass.ClassName = NewsClassData._classname
        this.addClass.NewsClassID = this.NewsClassID
      }
    }
  }
</script>

<style scoped lang="scss">
  .news-class {
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
    .top-title {
      text-align: center;
    }
    .submit {
      margin-top: 20px;
      font-size: 18px;
    }
  }
</style>
