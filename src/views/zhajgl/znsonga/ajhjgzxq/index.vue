<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="show">
        <div class="top-item">
          <span class="title-ite" />
          <span class="title-item">信访信息</span>
        </div>
        <div class="table-item">
          <table width="100%" height="300px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tr>
              <td width="20%" class="titleitem">*姓名或单位名称</td>
              <td width="30%" class="contenitem">{{ message.visitorName }}</td>
              <td width="20%" class="titleitem">*移动电话</td>
              <td width="30%" class="contenitem">{{ message.phone }}</td>
            </tr>
            <tr>
              <td class="titleitem">*咨询时间</td>
              <td class="contenitem">{{ message.handleTime }}</td>
              <td class="titleitem">*案件类别</td>
              <td class="contenitem">{{ message.optionValueName }}</td>
            </tr>
            <tr>
              <td class="titleitem">检察院</td>
              <td class="contenitem">{{ message.procuratorateName }}</td>
              <td class="titleitem">咨询律师</td>
              <td class="contenitem">{{ message.lawyerName }}</td>
            </tr>
            <tr>
              <td class="titleitem">咨询内容</td>
              <td id="left" class="contenitem" colspan="3">
                {{ message.content }}
              </td>
            </tr>
          </table>
        </div>
        <div class="yujf" @click="yujf">返回上一层</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      dialogVisible: false,
      message: {},
    }
  },
  created() {
    this.$api.huajiexq(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.message = res.data
      }
    })
  },
  mounted() {},
  methods: {
    yujf() {
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
