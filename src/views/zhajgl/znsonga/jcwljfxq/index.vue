<template>
  <div class="dashboard-container">
    <div class="clearfix">
      <div class="top">
        <div class="left">
          <div class="title-one">律师预约信访</div>
          <div class="top-item">
            <span class="title-ite" />
            <span class="title-item">信访信息</span>
          </div>
          <div class="table-item">
            <img v-show="!show" src="@/icons/img/jiefang.png" alt="">
            <table width="100%" height="300px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
              <tr>
                <td width="20%" class="titleitem">*姓名或单位名称:</td>
                <td width="30%" class="contenitem">{{ message.sex }}</td>
                <td width="20%" class="titleitem">性别</td>
                <td width="30%" class="contenitem">{{ message.sex }}</td>
              </tr>
              <tr>
                <td class="titleitem">*证件类型</td>
                <td class="contenitem">{{ message.certificateOptionName }}</td>
                <td class="titleitem">*证件号码</td>
                <td class="contenitem">{{ message.idcardNum }}</td>
              </tr>
              <tr>
                <td class="titleitem">民族</td>
                <td class="contenitem">{{ message.nation }}</td>
                <td class="titleitem">国籍</td>
                <td class="contenitem">{{ message.country }}</td>
              </tr>
              <tr>
                <td class="titleitem">*移动电话</td>
                <td class="contenitem">{{ message.mobile }}</td>
                <td class="titleitem">电子邮箱</td>
                <td class="contenitem">{{ message.email }}</td>
              </tr>
              <tr>
                <td class="titleitem">工作单位</td>
                <td class="contenitem">{{ message.workUnit }}</td>
                <td class="titleitem">*通讯地地址</td>
                <td class="contenitem">{{ message.habitation }}</td>
              </tr>
            </table>
          </div>
          <div class="open">
            <span class="jiefang" @click="beginJf">返回上一层</span>
          </div>
        </div>
        <div class="right">
          <div class="title-one">交流区</div>
          <div class="jiaoliu">
            <ul class="kuang">
              <li class="shuju"  v-for="item in data" :key="item.id">
                <span class="name">{{item.visitorName?item.visitorName:item.lawyerName}}</span>
                <span class="time">{{item.createTime}}</span>
                <p class="neirong">{{item.content}}</p>
              </li>
            </ul>
          </div>
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
      riqi: '',
      xingqi: '',
      username: '',
      time: '',
      data: [
      ],
      message: {},
      hours: '',
      chatData: '',
    }
  },
  created() {
    this.getTime()
    this.$api.wljfxq(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.message = res.data
      }
    })
    this.$api.wljfchartxq(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.data = res.data
      }
    })
  },
  mounted() {
  },
  methods: {
    getTime() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
        day: nowDate.getDay(),
        hours: nowDate.getHours(),
        minu: nowDate.getMinutes(),
        second: nowDate.getSeconds()
      }
      let mouth = ''
      // let day = ''
      // const hours = ''
      // const minu = ''
      // const second = ''
      if (date.month < 10) {
        mouth = '0' + date.month
      } else {
        mouth = date.month
      }
      this.riqi = date.year + '-' + mouth + '-'
      const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      console.log(date)
      this.xingqi = arr[date.day]
    },
    beginJf() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.top{
    display: flex;
    justify-content: space-between;
    height: 800px;
    .left{
        width: 55%;
        height: 100%;
        border: 1px solid #a9c4df;
        .title-one{
            width: 100%;
            padding: 10px;
            color: #5c79b0;
            background: #d7e5f9;
            border: 1px solid #a9c4df;
        }
        .top-item{
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
              margin: 20px 20px;
              position: relative;
              img{
                  position: absolute;
                  right: -50px;
                  top: -50px;
              }
              .contenitem{
                  color:#4882bb ;
              }
              .titleitem{
                  color: #717375;
              }
              table{
                  border:#a9c4df;
                  tr td{
                      text-align: center;
                  }
              }
        }
        .open{
            width: 40%;
            margin: 100px auto;
            text-align: center;
            .jiefang{
                color: white;
                background: #1b9dff;
                padding: 10px 30px;
                border-radius: 6px;
            }
        }
    }
    .right{
        width: 43%;
        height: 100%;
        border: 1px solid #a9c4df;
        .title-one{
            width: 100%;
            padding: 10px;
            color: #5c79b0;
            background: #d7e5f9;
            border: 1px solid #a9c4df;
        }
         .jiaoliu{
              width: 80%;
              margin: 20px auto;
              background-color: #f4f4f4;
              height: 600px;
              position: relative;
              .kuang{
                  width: 90%;
                  margin: 20px auto;
                  background: #f4f4f4;
                  height: 300px;
                  list-style: none;
                  li{
                      list-style: none;
                      margin-bottom: 20px;
                      .name{
                          padding-right: 10px;
                          padding-bottom: 4px;
                          font-weight: 1000;
                      }
                      .time{
                          padding-bottom: 4px;
                          color: rgb(116, 116, 116);
                      }
                      .neirong{
                          padding-left: 20px;
                          word-wrap: break-word;
                          word-break: normal;
                          color: #4882d1;
                          text-indent:20px;
                          padding-top: 6px;
                      }
                  }
              }
              .message-item{
                  width: 90%;
                  margin: 0 auto;
                  input{
                      width: 100%;
                      border: 1px solid #d4c6c6;
                      outline: none;
                      padding-bottom: 150px;
                      text-indent:20px;
                  }
              }
              .but{
                  padding: 10px 20px;
                  color: white;
                  width: 80px;
                  background-color:rgb(79, 146, 223) ;
                  text-align: center;
                  border-radius: 6px;
                  float: right;
                  margin-top: 30px;
                  margin-right: 5%;
              }
          }
    }
}
</style>
