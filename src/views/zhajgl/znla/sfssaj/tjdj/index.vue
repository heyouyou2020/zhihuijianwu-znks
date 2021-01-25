<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="show">
        <div class="table-item">
          <img v-show="!show" src="@/icons/img/jiefang.png" alt="">
          <table width="100%" height="400px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tr>
              <td class="titleitem">*姓名</td>
              <td class="contenitem"><input v-model="form.name" id="" type="text" name="" placeholder="请输入"></td>
              <td class="titleitem">手机号码</td>
              <td class="contenitem"><input v-model="form.number" id="" type="text " name="" placeholder="请输入"></td>
            </tr>
            <tr>
              <td class="titleitem">*咨询时间</td>
              <td class="contenitem">
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  placeholder="开始时间"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  required
                  style="width: 90%;"
                />
              </td>
              <td class="titleitem">*类别</td>
              <td class="contenitem">
                <el-select v-model="form.leibie" placeholder="请选择" style="width: 90%;">
                  <el-option label="刑事" value="1" />
                  <el-option label="民事" value="2" />
                  <el-option label="行政" value="3" />
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="titleitem">检察院</td>
              <td class="contenitem">
                <el-select v-model="form.jianchayuan" placeholder="请选择" style="width: 90%;">
                  <el-option label="默认" value="1" />
                </el-select>
              </td>
              <td class="titleitem">*咨询律师</td>
              <td class="contenitem">
                <el-select v-model="form.lvshi" placeholder="请选择" style="width: 90%;">
                  <el-option label="默认" value="1" />
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="titleitem">咨询内容</td>
              <td id="left" class="contenitem" colspan="3">
                <el-input
                  v-model="form.textarea"
                  type="textarea"
                  :rows="10"
                  placeholder="请输入内容"
                />
              </td>
            </tr>
          </table>
        </div>
        <div class="caozuo">
          <div class="yujf" @click="beginJf">提交</div>
          <div class="yujf" @click="goback">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      dialogVisible: false,
      form: {
        name: '',
        number: '',
        time: '',
        leibie: '',
        textarea: '', 
        jianchayuan: '1',
        lvshi: '1',
      },  
    }
  },
  created() {},
  mounted() {},
  methods: {
    beginJf() {
      for(var k in this.form) {
        if (this.form[k] == '') {
          this.$message.error('请输入所有完整信息')
          return false
        }
      }
      this.$api.getwlhuajieadd({
        objectName: this.form.name,
        phone: this.form.number,
        handleTime: this.form.time,
        consultingTypeOption: this.form.leibie,
        content: this.form.textarea
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('提交成功')
          this.$router.push({
            name: 'ajdjb'
          })
        }else {
          this.$message.error('提交失败')
        }
      })
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .show{
          margin-top: 10px;
          width: 100%;
          display: flex;
          flex-direction: column;
          .top-item{
              width: 100%;
              margin: 20px 20px;
              display: flex;
              align-items: center;
              .title-ite{
                  display: inline-block;
                  width: 4px;
                  height: 16px;
                  background: cornflowerblue;
              }
              .title-item{
                  padding-left: 5px;
                  display: inline-block;
                  color: black;
                  font-weight: 800;
              }
          }
          .table-item{
              width: 90%;
              margin: 20px auto;
              position: relative;
              img{
                  position: absolute;
                  right: -60px;
                  top: -60px;
              }
              .contenitem{
                  color:#4882bb;
                  width: 40%;
                  input{
                      width: 90%;
                      outline: none;
                      border: none;
                      height: 100%;
                  }
              }
              .titleitem{
                  color: #717375;
                  width: 10%;
              }
              #left{
                text-align: justify;
                text-indent:20px;
                padding: 0 20px;
                box-sizing: border-box;
                word-wrap: break-word;
                word-break: break-all;
              }
              table{
                  border:#a9c4df;
                  tr td{
                      text-align: center;
                  }
              }
          }
          .caozuo{
              display: flex;
              justify-content: space-around;
              width: 40%;
              margin: 0 auto;
             .yujf{
              padding: 10px 0px;
              color: white;
              background: rgb(73, 138, 223);
              width: 120px;
              margin:  20px 20px;
              text-align: center;
              border-radius: 6px;
             }
          }
       }
</style>
