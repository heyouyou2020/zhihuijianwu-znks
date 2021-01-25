<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <!-- 头部搜索start-->
      <div class="filter-container">
        <div class="top">
          <el-form class="demo-ruleForm" status-icon :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="100px">
            <div class="one">
              <el-form-item label="律师姓名" width="400" prop='name'>
                <el-input
                  v-model="form.name"
                  style="width:500px"
                  placeholder="请输入姓名"
                  clearable
                />
              </el-form-item>
            </div>
            <!-- <div class="one">
              <el-form-item label="签约检察院" prop='jianchayuan'> 
                <el-select v-model="form.jianchayuan" placeholder="请选择" style="width:500px">
                  <el-option label="2" value="180" />
                </el-select>
              </el-form-item>
            </div> -->
            <div class="one">
              <el-form-item label="手机号码" prop='number'>
                <el-input
                  v-model="form.number"
                  @blur="onblurnum"
                  style="width:500px"
                  placeholder="请输入号码"
                  clearable
                />
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="证件类型" prop='leixing'>
                <el-select v-model="form.leixing" placeholder="请选择" style="width:500px">
                  <el-option label="身份证" value="1" />
                  <el-option label="港澳台通行证" value="2" />
                  <el-option label="外国护照" value="3" />
                  <el-option label="其他" value="4" />
                </el-select>
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="身份证号码" prop='sfz'>
                <el-input
                  v-model="form.sfz"
                  @blur="onblursfz"
                  style="width:500px"
                  placeholder="请输入证件号码"
                  clearable
                />
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="执业证号码" prop='card'>
                <el-input
                  v-model="form.card"
                  @blur="onblurcard"
                  style="width:500px"
                  placeholder="请输入证件号码"
                  clearable
                />
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="律师简介" prop='conten'>
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.conten"
                  style="width:500px"
                  placeholder="描述律师特点"
                  clearable
                />
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="上传身份证正面">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :http-request="beforeupload1"
                  :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>                
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="上传身份证反面">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :http-request="beforeupload2"
                  :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>                
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="上传律师资格证">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  ref="upload"
                  :http-request="beforeupload3"
                  :on-change="handleChange"
                  :file-list="fileList"
                  :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>                
              </el-form-item>
            </div>
            <div class="one">
              <el-form-item label="上传律师形象照">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :http-request="beforeupload4"
                  :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>                
              </el-form-item>
            </div>
            <div class="one" id="last">
              <el-form-item class="last-item">
                <el-input
                  type="button"
                  @click.native="submitForm('form')"
                  value="提交"
                  style="width:100px"
                />
              </el-form-item>
              <el-form-item class="last-item">
                <el-input
                  type="button"
                  value="取消"
                  @click.native="goback"
                  style="width:100px"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        jianchayuan: '',
        number: '',
        leixing: '1',
        sfz: '',
        card: '',
        conten:'',
      },
      fileList: [],
      file1:{},
      file2:{},
      file3:{},
      file4:{},
      rules: {
        name: [
            { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
        ],
        jianchayuan: [
            { required: true, message: '请选择检察院', trigger: ['blur', 'change'] }
        ],
        number: [
            { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }
        ],
        leixing: [
            { required: true, message: '请选择证件类型', trigger: ['blur', 'change'] }
        ],
        sfz: [
            { required: true, message: '请输入身份证', trigger: ['blur', 'change'] }
        ],
        card: [
            { required: true, message: '请输入执证号码', trigger: ['blur', 'change'] }
        ],
        tupian: [
            { required: true, message: '请选择活', trigger: ['blur', 'change'] }
        ],
        conten: [
            { required: true, message: '请输入律师简介', trigger: ['blur', 'change'] },
            { min: 10, max: 50, message: '长度在 10 到 50 个字符', trigger: ['blur', 'change'] }
        ], 
      },
      labelPosition: 'right',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      tongXingZheng: false
    }
  },
  methods: {
    onblurnum() {
      this.$api.getjianchanlvshnum(this.form.number).then(res => {
        if (res.code === 0) {
          this.$message.success('手机号码校验通过')
          this.tongXingZheng = true
        }else {
          this.$message.error('手机号码校验不通过, 请重新输入')
          this.tongXingZheng = false
        }
      })
    },
    onblursfz() {
      this.$api.getjianchanlvshsfz(this.form.sfz).then(res => {
        if (res.code === 0) {
          this.$message.success('身份证号码校验通过')
          this.tongXingZheng = true
        }else {
          this.$message.error('身份证校验不通过, 请重新输入')
          this.tongXingZheng = false
        }
      })
    },
    onblurcard() {
      this.$api.getjianchanlvshcard(this.form.card).then(res => {
        if (res.code === 0) {
          this.$message.success('执业证号码校验通过')
          this.tongXingZheng = true
        }else {
          this.$message.error('执业证号码校验不通过, 请重新输入')
          this.tongXingZheng = false
        }
      })
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }, 
    // beforeupload (file) {
    //   this.formData.append('file', file)
    //   return false
    // },
    handleChange(file, fileList) {
      console.log(file)
      console.log(fileList)
      console.log(this.fileList)
    },
    beforeupload1(conten) {
      console.log(conten.file)
      this.file1 = conten.file
    },
    beforeupload2(conten) {
      console.log(conten.file)
      this.file2 = conten.file
    },
    beforeupload3(conten) {
      console.log(conten.file)
      this.file3 = conten.file
    },
    beforeupload4(conten) {
      console.log(conten.file)
      this.file4 = conten.file
    },
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
   
    goback() {
      this.$router.go(-1)
    },
    submitForm(form) {
      if (!this.tongXingZheng) {
        this.$message.error('手机、身份证或执业证校验未通过,请从重新输入')
        return false
      }
      if (!this.file1.name) {
        this.$message.error('请上传身份证正面')
        return false
      }
      if (!this.file2.name) {
        this.$message.error('请上传身份证背面')
        return false
      }
      if (!this.file3.name) {
        this.$message.error('请上传律师资格证')
        return false
      }
      if (!this.file4.name) {
        this.$message.error('请上传律师形象照')
        return false
      }
      this.$refs[form].validate((valid) => {
          if (valid) {
            let formData = new FormData()
            formData.append("lawyerName", this.form.name)
            formData.append("procuratorateId", localStorage.getItem('danweiID'))
            formData.append("mobile", this.form.number)
            formData.append("certificateOption", this.form.leixing)
            formData.append("idcardNum", this.form.sfz)
            formData.append("professionNum", this.form.card)
            formData.append("simpleMemo", this.form.conten)
            formData.append("idcardImgFront", this.file1)
            formData.append("idcardImgBack", this.file2)
            formData.append("certificateImg", this.file3)
            formData.append("photoImg", this.file4)
            this.$api.uploadlvhsi(formData).then(res => {
              this.$message.success('添加成功')
              this.$router.push({
                name: 'lszyk',
              })
            })
          } else {
            this.$message.error('请输入完整信息')
            return false;
          }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.top{
    width: 100%;
    .one{
        width: 40%;
        margin: 20px auto;
    }
}
.yourForm {
  .el-input {
    width: 350px;
  }
}
#last{
    display: flex;
    justify-content: space-around;
}
input{
    outline: none;
}
</style>
