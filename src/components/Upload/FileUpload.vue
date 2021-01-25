<template>
  <div class="upload-container">
    <ul v-if="fileListChild.length>0" class="uploadShow" :show-id="ztSort">
      <li v-for="(item,i) in fileListChild" :key="i">
        <span class="fr ml10" style="cursor: pointer" @click="delWj(item)"><img src="@/icons/img/close.png" height="12" width="12"></span>
        <span v-if="item.type=='pic'"><img src="@/icons/img/pic.png" height="16" width="14"></span>
        <span v-else-if="item.type=='audio'"><img src="@/icons/img/audio.png" height="16" width="14"></span>
        <span v-else-if="item.type=='video'"><img src="@/icons/img/video.png" height="16" width="14"></span>
        <span v-else><img src="@/icons/img/wd.png" height="16" width="14"></span>
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <el-upload
      ref="upload"
      class="upload-demo fr"
      action="action"
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      accept=".pdf,.doc,.docx,.jpg"
    >
      <el-button type="text" class="fr">上传文件</el-button>
    </el-upload>
  </div>
</template>

<script>

export default {
  name: 'FileUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
    ztSort: {
      type: String,
      default: ''
    },
    file: {
      type: Array,
      required: true
    },
    fileList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fileIdList: [],
      fileListSave: [],
      uploadSucess: false,
      fileListChild: [],
      fileEditor: []
    }
  },
  watch: {
    fileList(newVal) {
      if (newVal.length > 0) {
        this.fileListChild = newVal
      }
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning('请最多上传 ${this.limit} 个文件')
    },
    beforeUpload(file) {
      // const isLt2M = file.size / 1024 / 1024 < 100
      // if (!isLt2M) {
      //   this.$message({
      //     message: '上传文件大小不能超过 100MB!',
      //     type: 'warning'
      //   })
      // }
      const formDatas = new FormData()
      formDatas.append('file', file)
      this.$api.upload(formDatas).then(res => {
        this.uploadSucess = true
        this.fileIdList.push({ id: res.data })
        if (this.ztSort) {
          this.file.push(res.data)
          // 将数组转换成对象数组
          const arrList = []
          for (const i in this.file) {
            var j = {}
            j.id = this.file[i]
            arrList.push(j)
          }
          const obj = this.fileListChild.map((item, index) => {
            return { ...item, ... arrList[index] }
          })
          this.fileListChild = obj
          this.$emit('uploadFile', this.file)
        } else {
          this.fileListSave.push(res.data)
          const obj = this.fileListChild.map((item, index) => {
            return { ...item, ... this.fileIdList[index] }
          })
          this.fileListChild = obj
          this.$emit('uploadFile', this.fileListSave)
        }
      })
      return false
    },
    // 上传
    handleChange(file) {
      if (file.status === 'ready') {
        const formDatas = new FormData()
        formDatas.append('file', file)
        const dataType = file.name
        const types = dataType.substring(dataType.lastIndexOf('.') + 1)
        let type = ''
        if (types === 'jpg' || types === 'png' || types === 'jpeg' || types === 'gif' || types === 'psd') {
          type = 'pic'
        } else if (types === 'mp4' || types === 'avi' || types === 'wmv' || types === 'rm' || types === 'swf' || types === 'flv') {
          type = 'video'
        } else if (types === 'mp3' || types === 'wav' || types === 'ogg' || types === 'm4a') {
          type = 'audio'
        } else {
          type = 'wx'
        }
        this.$set(file, 'type', type)
        // 判断是否已经存在此文件
        var ret2 = this.fileListChild.findIndex((v) => {
          return v.name === file.name
        })
        if (ret2 !== -1) {
          this.$message.error('文件已上传')
          return
        }
        if (this.fileListChild.length > 2) {
          this.$message.error('最多上传3个文件')
          return false
        }
        this.fileListChild.push(file)
        let sum = 0
        this.fileListChild.forEach(function(item, index) {
          if (item.size) {
            sum = sum + item.size
          }
        })
        const isLt2M = sum / 1024 / 1024 < 100
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 100MB!',
            type: 'warning'
          })
          return false
        }
        this.$refs.upload.submit()
      }
    },
    handleSuccess(res) {

    },
    delWj(obj) {
      this.fileListChild = this.fileListChild.filter(function(item) {
        return item.name !== obj.name
      })
      this.$api.delFile({ id: obj.id }).then(response => {
        if (response.code === 200) {
          this.fileListChild = this.fileListChild.filter(item => item.id !== obj.id)
          if (this.ztSort) {
            this.fileEditor = this.file
            this.fileEditor = this.fileEditor.filter(item => item !== obj.id)
            this.$emit('uploadFile', this.fileEditor)
          } else {
            this.fileListSave = this.fileListSave.filter(item => item !== obj.id)
            this.$emit('uploadFile', this.fileListSave)
          }
          this.uploadSucess = true
        } else {
          this.$message({
            message: response.message,
            type: 'warning'
          })
        }
      })
    },
    handleRemove(file, fileList) {
      // this.$emit('input', file)
      // 处理 before-upload验证不通过后触发了on-remove的解决办法
      if (file && file.status === 'success') {
        return this.$confirm('你确定删除这个文件？')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "@/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
        .image-uploader {
            width: 60%;
            float: left;
        }
    }

</style>
