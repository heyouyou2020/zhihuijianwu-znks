<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="show">
        <div class="table-item">
          <img v-show="!show" class="dingwei" src="@/icons/img/jiefang.png" alt="">
          <table width="100%" height="800px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tr>
              <td width="15%" class="titleitem">姓名</td>
              <td width="35%" class="contenitem">{{ message.realName }}</td>
              <td width="15%" class="titleitem">签约检察院</td>
              <td width="35%" class="contenitem">{{ message.procuratorateName }}</td>
            </tr>
            <tr>
              <td class="titleitem">身份证号码</td>
              <td class="contenitem">{{ message.idcardNum }}</td>
              <td class="titleitem">律师证件号码</td>
              <td class="contenitem">{{ message.professionNum }}</td>
            </tr>
            <tr>
              <td class="titleitem">律师简介</td>
              <td class="contenitem" colspan="3">{{ message.simpleMemo }}</td>
            </tr>
            <tr>
              <td class="">身份证正面</td>
              <td><img :src="message.idcardImgBackUrl" alt="" style="width:200px;height:200px"></td>
              <td class="">身份证背面</td>
              <td class=""><img :src="message.idcardImgBackUrl" alt="" style="width:200px;height:200px"></td>
            </tr>
            <tr>
              <td class="titleitem">律师资格证</td>
              <td class="contenitem"><img :src="message.certificateImgUrl" alt="" style="width:200px;height:200px"></td>
              <td class="titleitem">律师形象照</td>
              <td class="contenitem"><img :src="message.photoImgUrl" alt="" style="width:200px;height:200px"></td>
            </tr>
          </table>
        </div>
        <div class="caozuo">
          <div class="yujf" @click="goback">返回</div>
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
      time: '',
      leibie: '',
      textarea: '',
      message: {},
    }
  },
  created() {
    // 查看律师信息详情接口
    this.$api.getjianchanlvshixq(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.message = res.data
      }
    })
  },
  mounted() {},
  methods: {
    beginJf() {
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
              .dingwei{
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
              width: 40%;
              margin: 0 auto;
              text-align: center;
             .yujf{
              padding: 10px 0px;
              color: white;
              background: rgb(73, 138, 223);
              width: 120px;
              margin:  20px 20px;
              text-align: center;
              border-radius: 6px;
              margin: 20px auto;
             }
          }
       }
</style>
