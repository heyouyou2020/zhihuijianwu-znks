<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="show">
        <div class="table-item">
          <table width="100%" height="300px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tr>
              <td class="titleitem">*姓名</td>
              <td class="contenitem">{{ biaogeshuju.objectName }}</td>
              <td class="titleitem">手机号码</td>
              <td class="contenitem">{{ biaogeshuju.phone }}</td>
            </tr>
            <tr>
              <td class="titleitem">*咨询时间</td>
              <td class="contenitem">{{ biaogeshuju.handleTime }}</td>
              <td class="titleitem">*类别</td>
              <td class="contenitem">{{ biaogeshuju.optionValueName }}</td>
            </tr>
            <tr>
              <td class="titleitem">检察院</td>
              <td class="contenitem" colspan="3">{{ biaogeshuju.procuratorateName }}</td>
            </tr>
            <tr>
              <td class="titleitem">咨询内容</td>
              <td id="left" class="contenitem" colspan="3">{{ biaogeshuju.content }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
     biaogeshuju: {  
     },
    }
  },
  created() {
      this.$api.getwlhuajieXQ(this.$route.params.id).then(res => {
          console.log(res)
        if (res.code === 0) {
            if (res.data) {
              this.biaogeshuju = res.data
            }else {
                this.$message.warning('暂无数据哦')
            }  
        }else {
          this.$message.error('获取表格数据失败')
        }
      })
  },
  mounted() {},
  methods: {
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
