<template>
  <div class="login">
    <el-dialog
      class="login-wrap"
      title="登陆"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="400px">
      <el-form ref="param" :model="param" :rules="rules">
        <el-form-item label="手机号" prop="Tel">
          <el-input v-model="param.Tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="PassWord">
          <el-input v-model="param.PassWord" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <p class="error" v-show="errorText">{{errorText}}</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit('param')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { MobileLogin } from '@/api/user/login'

export default {
  name: 'login',
  props: {
    msg: String
  },
  data() {
    return {
      param: {
        Tel: '',
        PassWord: '',
      },
      errorText: '',
      dialogVisible: false,
      rules: {
        Tel: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        PassWord: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this._MobileLogin()
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    _MobileLogin() {
      this.errorText = ''
      MobileLogin(this.param).then(res => {
        var data = res.data
        if (res.data.result === 'success') {
          this.dialogVisible = false
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
        } else {
          this.errorText = data.msg
        }
      }).catch(err => {
        alert(err)
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .login-wrap {
    background-color: #000;background-image: linear-gradient(135deg, #FFFE9F 0%, #FCA180 100%);
    .error {
      box-shadow: 0 4px 4px rgba(0, 0, 0, .1);
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 16px;
      color: #fff;
      background-color: #F56C6C;
    }
  }
</style>
