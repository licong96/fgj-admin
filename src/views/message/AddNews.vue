<template>
  <!-- 新增资讯 -->
  <div class="add-news">
    <h2 class="top-title">{{btnText}}</h2>
    <el-form ref="addNews" class="form-con" :model="addNews" :rules="rules" label-width="100px">
      <el-form-item label="城市ID">
      </el-form-item>
      <el-form-item label="选择分类" prop="NewsClassID">
        <el-select v-model="addNews.NewsClassID" placeholder="请选择分类">
          <el-option :label="item._classname" :value="item._newsclassid" v-for="(item, index) in parentData" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布用户">
      </el-form-item>
      <el-form-item label="封面图" prop="PagePic">
        <el-input v-model="addNews.PagePic" placeholder="请上传封面图"></el-input>
      </el-form-item>
      <el-form-item label="长标题" prop="LongTitle">
        <el-input v-model="addNews.LongTitle" placeholder="请输入长标题"></el-input>
      </el-form-item>
      <el-form-item label="短标题" prop="ShortTitle">
        <el-input v-model="addNews.ShortTitle" placeholder="请输入短标题"></el-input>
      </el-form-item>
      <el-form-item label="内容摘要" prop="ShortContent">
        <el-input type="textarea" rows="3" v-model="addNews.ShortContent" placeholder="请输入内容摘要"></el-input>
      </el-form-item>
      <el-form-item label="主体内容" prop="Content">
        <!-- <el-input type="textarea" rows="8" v-model="addNews.Content" placeholder="请输入主体内容"></el-input> -->
        <div id="editor"></div>
        <el-button type="primary" @click="onPreview">预览主体内容</el-button>
      </el-form-item>
      <el-form-item label="新闻时间" prop="NewsDate">
        <el-date-picker
          v-model="addNews.NewsDate"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          value-format="yyyy-MM-dd hh:mm:ss"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="addNews.Editor" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="图片列表">
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="addNews.Source" placeholder="请输入来源"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-radio-group v-model="addNews.IsTop">
          <el-radio label="1">置顶</el-radio>
          <el-radio label="0">不置顶</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('addNews')">{{btnText}}</el-button>
      </el-form-item>
    </el-form>

    <!-- 预览富文本编辑器的内容 -->
    <el-dialog
      title="预览主体内容，最终呈现的效果"
      :visible.sync="dialogVisible"
      width="900px">
      <div v-html="previewHtml"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import wangeditor from 'wangeditor'
  import { classifyGetListMore, AddNews, UpNews, GetModel } from '@/api/message/addNews'

  let emptyObj = {
    NewsClassID: '',
    PagePic: '',
    LongTitle: '',
    ShortTitle: '',
    ShortContent: '',
    Content: '',
    NewsDate: '',
    Editor: '',
    Source: '',
    IsTop: '1'
  }

  export default {
    name: 'addNews',
    beforeRouteUpdate (to, from, next) {
      this.NewsID = ''
      this.addNews = Object.assign({}, emptyObj)
      next()
    },
    data() {
      return {
        parentData: [],   // 已填加的分类
        addNews: Object.assign({}, emptyObj),
        NewsID: '',   // 有ID就是修改
        btnText: '新增资讯',
        wangeditor: null,   // 富文本编辑器
        previewHtml: '',  // 预览富文本编辑器的内容
        dialogVisible: false,
        rules: {
          NewsClassID: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ],
          PagePic: [
            {required: true, message: '请上传封面图', trigger: 'blur'}
          ],
          LongTitle: [
            {required: true, message: '请输入长标题', trigger: 'blur'}
          ],
          ShortTitle: [
            {required: false, message: '请输入短标题', trigger: 'blur'}
          ],
          ShortContent: [
            {required: true, message: '请输入内容摘要', trigger: 'blur'}
          ],
          Content: [
            {required: true, message: '请输入主体内容', trigger: 'blur'}
          ],
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    created() {
    },
    activated() {
      // 有ID就是修改，没有就是添加
      this.NewsID = this.$route.query.NewsID
      if (this.NewsID) {
        this.btnText = '修改资讯'
        this.GetModel()
      }
      this._classifyGetListMore()   // 获取所有分类
    },
    mounted() {
      this.createEditor()   // 创建富文本编辑器
    },
    methods: {
      // 创建富文本编辑器
      createEditor() {
        let editor = this.wangeditor = new wangeditor('#editor')
        editor.customConfig.debug = true
        editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        editor.customConfig.linkImgCallback = function (url) {
          console.log(url) // url 即插入图片的地址
        }
        editor.create()
        // editor.txt.html('<p>用 JS 设置的内容</p>')
      },
      // 预览主体内容
      onPreview() {
        console.log(this.wangeditor.txt.html())
        this.previewHtml = this.wangeditor.txt.html()
        this.dialogVisible = true
      },
      // 获取所有分类
      _classifyGetListMore() {
        classifyGetListMore({
          num: 9
        }).then(res => {
          console.log(res)
          if (res.data.result === 'success') {
            this.parentData = res.data.data
          }
        })
      },
      onSubmit(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this._addNews()
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      // 添加资讯
      _addNews() {
        var param = this.addNews
        AddNews(param)
          .then(res => {
            if (res.data.result === 'success') {
              this.$message.success('添加成功！')
              this.addNews = Object.assign({}, emptyObj)
            } else {
              this.$message.error('添加失败！')
            }
          })
          .catch(err => {
            alert(err)
          })
      },
      // 根据ID获取资讯信息
      GetModel() {
        GetModel({
          NewsID: this.NewsID
        })
        .then(res => {
          console.log(res)
          if (res.data.result === 'success') {
            
          }
        })
      },
      // 修改资讯
      UpNews() {
        
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-news {
    padding-bottom: 100px;
    margin-left: auto;
    margin-right: auto;
    max-width: 900px;
    .top-title {
      text-align: center;
    }
    .text-center {
      text-align: center;
    }
    .form-con {
      position: relative;
      z-index: 2;
    }
  }
</style>
