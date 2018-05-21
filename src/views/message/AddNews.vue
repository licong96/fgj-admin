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
        <div class="prev-img">
          <i class="el-icon-plus"></i>
          <img class="img" v-show="addNews.PagePic" :src="addNews.PagePic" alt="">
          <label class="btn" for="uploads"></label>
          <input type="file" id="uploads" 
          style="position:absolute; clip:rect(0 0 0 0);" 
          accept="image/png, image/jpeg, image/gif, image/jpg" 
          @change="uploadImg($event, 1)">
        </div>
      </el-form-item>
      <el-form-item label="长标题" prop="LongTitle">
        <el-input v-model="addNews.LongTitle" placeholder="请输入长标题"></el-input>
      </el-form-item>
      <el-form-item label="短标题" prop="ShortTitle">
        <el-input v-model="addNews.ShortTitle" placeholder="请输入短标题"></el-input>
      </el-form-item>
      <el-form-item label="内容摘要" prop="ShortContent">
        <el-input type="textarea" rows="4" v-model="addNews.ShortContent" placeholder="请输入内容摘要"></el-input>
      </el-form-item>
      <el-form-item label="主体内容" prop="Content">
        <div id="editorBar" class="editor-toolbar"></div>
        <div id="editorText" class="editor-text"></div>
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

    <!-- 封面图裁切 -->
    <el-dialog
      title=""
      :visible.sync="dialogImg"
      width="1200px">
      <div class="crop-wrap">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          ></vueCropper>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearCrop">取消</el-button>
        <el-button type="primary" @click="finish">裁切</el-button>
      </span>
    </el-dialog>
    <!-- 预览富文本编辑器的内容 -->
    <el-dialog
      title="预览主体内容，最终呈现的效果"
      :visible.sync="dialogVisible"
      width="900px">
      <div v-html="previewHtml"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  import wangeditor from 'wangeditor'
  import { FileUpLoad } from '@/api/message/public'
  import { classifyGetListMore, AddNews, UpNews, GetModel } from '@/api/message/addNews'
  import host from '@/assets/js/config'

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
        dialogImg: false,
        option: {
          img: '',
          size: 1,
          outputType: 'jpg',
				  canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 1000,
          autoCropHeight: 769,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [4, 3]
        },
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
      startCrop () {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      clearCrop () {
        this.dialogImg = false
        this.$refs.cropper.clearCrop()
      },
      isPreviews() {
        if (this.option.img) {
          this.dialogImg = true
        }
      },
      // 输出
      finish (type) {
        let _this = this

        this.dialogImg = false
        this.$refs.cropper.getCropBlob((data) => {
          let forms = new FormData()
          forms.append('filename', data)
          // 上传图片
          FileUpLoad(forms).then(res => {
            // console.log(res)
            if (res.data.result === 'success') {
              _this.addNews.PagePic = host + res.data.path.split('|').join('')
            }
          })
        })
      },
      //上传图片
      uploadImg (e, num) {
        let _this = this
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$notify.error({
            title: '图片格式错误',
            message: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种'
          });
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          _this.dialogImg = true
          let data = null
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      // 创建富文本编辑器
      createEditor() {
        let editor = this.wangeditor = new wangeditor('#editorBar', '#editorText')
        // editor.customConfig.debug = true
        editor.customConfig.uploadImgServer = '/Handler/FileUpLoad.ashx'  // 上传图片到服务器
        editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
          },
          error: function (xhr, editor) {
            _this.$message.error('图片上传失败')
          },
          customInsert: function (insertImg, result, editor) {
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
            let url = result.path.split('|').join('')   // 去掉 |
            
            insertImg(host + url)
          }
        }

        editor.create()
        // editor.txt.html(html)
      },
      // 预览主体内容
      onPreview() {
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
      // 提交
      onSubmit(formName) {
        let _this = this
        this.addNews.Content = escape(this.wangeditor.txt.html())   // escape转码
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 判断是新增还是修改
            if (_this.NewsID) {
              _this._UpNews()    // 修改资讯
            } else {
              _this._addNews()    // 添加资讯
            }
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      // 添加资讯
      _addNews() {
        AddNews(this.addNews)
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
        let NewsID = this.NewsID
        GetModel({
          NewsID: NewsID
        })
        .then(res => {
          // console.log(res)
          if (res.data.result === 'success') {
            let data = res.data.data
            this.addNews = {
              NewsID: NewsID,
              NewsClassID: data._newsclassid,
              PagePic: data._pagepic,
              LongTitle: data._longtitle,
              ShortTitle: data._shorttitle,
              ShortContent: data._shortcontent,
              Content: data._content,
              NewsDate: data._newsdate,
              Editor: data._editor,
              Source: data._source,
              IsTop: String(data._istop)
            }
            this.wangeditor.txt.html(this.addNews.ShortContent)
          }
        })
      },
      // 修改资讯
      _UpNews() {
        UpNews(this.addNews)
          .then(res => {
            if (res.data.result === 'success') {
              this.$message.success('修改成功！')
            } else {
              this.$message.error('修改失败！')
            }
          })
          .catch(err => {
            alert(err)
          })
      }
    },
    components: {
      VueCropper
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
  .editor-toolbar {
    border-radius: 4px 4px 0 0;
    border: 1px solid #dcdfe6;
    border-bottom: 0;
  }
  .editor-text {
    border-radius: 0 0 4px 4px;
    border: 1px solid #dcdfe6;
    height: 500px;
  }
  .crop-wrap {
    width: 100%;
    height: 720px;
  }
  .prev-img {
    position: relative;
    width: 300px;
    height: 225px;
    border: 1px dashed #d9d9d9;
    .img {
      position: relative;
      z-index: 2;
    }
    .el-icon-plus {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      font-size: 44px;
      color: #d9d9d9;
    }
    .btn {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      cursor: pointer;
    }
  }
</style>
