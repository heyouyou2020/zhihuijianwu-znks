<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="show">
        <div class="top-item">
          <span class="title-ite" />
          <span class="title-item">信访信息</span>
        </div>
        <div class="table-item">
          <img v-show="show" src="@/icons/img/jiefang.png" alt="">
          <table width="100%" height="600px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tr>
              <td class="titleitem">*姓名或单位名称</td>
              <td class="contenitem">{{biaogeshuju.visitorName}}</td>
              <td class="titleitem">性别</td>
              <td class="contenitem">{{biaogeshuju.sex}}</td>
            </tr>
            <tr>
              <td class="titleitem">*证件类型</td>
              <td class="contenitem">{{biaogeshuju.certificateOptionName}}</td>
              <td class="titleitem">*证件号码</td>
              <td class="contenitem">{{biaogeshuju.idcardNum}}</td>
            </tr>
            <tr>
              <td class="titleitem">民族</td>
              <td class="contenitem">{{biaogeshuju.nation}}</td>
              <td class="titleitem">国籍</td>
              <td class="contenitem">{{biaogeshuju.country}}</td>
            </tr>
            <tr>
              <td class="titleitem">*移动电话</td>
              <td class="contenitem">{{biaogeshuju.mobile}}</td>
              <td class="titleitem">电子邮箱</td>
              <td class="contenitem">{{biaogeshuju.email}}</td>
            </tr>
            <tr>
              <td class="titleitem">工作单位</td>
              <td class="contenitem">{{biaogeshuju.workUnit}}</td>
              <td class="titleitem">*通讯地地址</td>
              <td class="contenitem">{{biaogeshuju.habitation}}</td>
            </tr>
            <tr>
              <td class="titleitem">案件类别</td>
              <td class="contenitem" colspan="3">{{biaogeshuju.caseTypeOptionName}}</td>
            </tr>
            <tr>
              <td class="titleitem">咨询内容</td>
              <td id="left" class="contenitem" colspan="3">
               {{biaogeshuju.content}}
              </td>
            </tr>
            <tr>
              <td class="titleitem">检察院</td>
              <td class="contenitem">{{biaogeshuju.procuratorateName}}</td>
              <!-- <td class="titleitem">*律师</td>
              <td class="contenitem">{{biaogeshuju.sex}}</td> -->
              <td class="titleitem">接访时间</td>
              <td class="contenitem">{{biaogeshuju.appointmentTime}}</td>
            </tr>
            <!-- <tr>
              <td class="titleitem">接访时间</td>
              <td class="contenitem" colspan="3">{{biaogeshuju.appointmentTime}}</td>
            </tr> -->
          </table>
        </div>
        <div v-show="show1" class="yujf" @click="beginJf">接访</div>
        <div v-show="show2" class="yujf">已接访</div>
        <div v-show="showshow" class="yujf">已过期</div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>提交后接访状态会变成已接访</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="jiefang">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      biaogeshuju: {},
      show: false,
      show1: false,
      show2: false,
      dialogVisible: false,
      showshow: false,
    }
  },
  created() {
    if (this.$route.params.state == "已过期") {
      this.showshow = true
    }
    if (this.$route.params.state == '已接访') {
      this.show2 = true
      this.show = true
    }
    if (this.$route.params.state == '待接访') {
      this.show1 = true
    }
    this.$api.getchuangkoubiaoge(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.biaogeshuju = res.data
      }else {
        this.$message.error('获取表格数据失败')
      }
    })
  },
  mounted() {},
  methods: {
    beginJf() {
      this.dialogVisible = true
    },
    jiefang() {
      this.$api.getchuangkouchange(this.$route.params.id).then(res => {
        if (res.code === 0) {
          this.show = true
          this.show1 = false
          this.show2 = true
          this.dialogVisible = false
          this.$message.success('接访成功')
        }else {
          this.$message.error('接访失败')
        }
      }).catch(err => {
        console.log(err)
      })
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
                  color:#4882bb ;
              }
              .titleitem{
                  color: #717375;
                  width: 20%;
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
          .yujf{
              padding: 10px 0px;
              color: white;
              background: rgb(73, 138, 223);
              width: 120px;
              margin:  20px auto;
              text-align: center;
              border-radius: 6px;
          }
       }
</style>
