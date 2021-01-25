<template>
  <div class="dashboard-container">
    <div class=" clearfix"> 
      <div class="top">
        <div class="left">
          <div class="title-one">律师预约信访</div>
          <div class="top-item">
            <span class="title-ite"></span>
            <span class="title-item">信访信息</span>
          </div>
          <div class="table-item">
              <img v-show="show1" src="@/icons/img/jiefang.png" alt="">
              <table width="100%" height="300px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                <tr>
                    <td width=15% class="titleitem">姓名</td>
                    <td width=35% class="contenitem">{{biaogeshuju.workUnit}}</td>
                    <td width=15% class="titleitem">性别</td>
                    <td width=35% class="contenitem">{{biaogeshuju.sex}}</td>
                </tr>
                <tr>
                    <td class="titleitem">证件类型</td>
                    <td class="contenitem">{{biaogeshuju. certificateOptionName}}</td>
                    <td class="titleitem">证件号码</td>
                    <td class="contenitem">{{biaogeshuju.idcardNum}}</td>
                </tr>
                <tr>
                    <td class="titleitem">民族</td>
                    <td class="contenitem">{{biaogeshuju.nation}}</td>
                    <td class="titleitem">国籍</td>
                    <td class="contenitem">{{biaogeshuju.country}}</td>
                </tr>
                <tr>
                    <td class="titleitem">移动电话</td>
                    <td class="contenitem">{{biaogeshuju.mobile}}</td>
                    <td class="titleitem">电子邮箱</td>
                    <td class="contenitem">{{biaogeshuju.email}}@.com</td>
                </tr>
                <tr>
                    <td class="titleitem">工作单位</td>
                    <td class="contenitem">{{biaogeshuju.workUnit}}</td>
                    <td class="titleitem">通讯地地址</td>
                    <td class="contenitem">{{biaogeshuju.habitation}}</td>
                </tr>
                <tr>
                    <td class="titleitem">案件类型</td>
                    <td class="contenitem">{{biaogeshuju.caseTypeOptionName}}</td>
                    <td class="titleitem">预约时间</td>
                    <td class="contenitem">{{biaogeshuju.appointmentTime}}</td>
                </tr>
              </table>
          </div>
          <div class="open">
            <span v-show="show" class="jiefang" @click="beginJf">点击接访</span>
            <span v-show="show1" class="jiefang" @click="endJf">结束接访</span>
            <span v-show="show2" class="jiefang">已结束</span>
            <span v-show="show3" class="jiefang">已过期</span>
          </div>
        </div> 
        <div class="right">
          <div class="title-one">交流区</div>
          <div class="jiaoliu">
            <ul class="kuang">
              <li v-for="(item, index) in data" :key="index">
                <span class="name">{{ item.lawyerName?item.lawyerName:item.visitorName }}</span>
                <span class="time">{{ item.createTime }}</span>
                <div class="neirong">
                  {{ item.content }}
                </div>
              </li>
            </ul>
            <div v-show="show4" class="message-item">
              <input v-model="chatData" type="text" name="" id="">
            </div>
            <div v-show="show4" class="but" @click="sendinfo">发布</div>
          </div>
        </div>   
      </div>
    </div>
  </div>
</template>
<script>
export default { 
  data(){
    return{
      show: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      str: '',
      riqi:'',
      xingqi: '',
      username: '',
      time: '',
      biaogeshuju: {},
      data:[
      ],
      hours:'',
      chatData:'',
    }
  },
  methods:{
    sendinfo() {
        const nowDate = new Date()
        const date = {
          hours:nowDate.getHours(),
          minu:nowDate.getMinutes(),
          second:nowDate.getSeconds()
      }
       let hours=''
       let minu=''
       let second=''
       //时
      if (date.hours < 10) {
          hours = '0' + date.hours
      } else {
          hours = date.hours
      }
       //分
      if (date.minu < 10) {
          minu = '0' + date.minu
      } else {
          minu = date.minu
      }
       //秒
      if (date.second < 10) {
          second = '0' + date.second
      } else {
          second = date.second
      }
      let alltime = hours+':'+minu+':'+second
      let message = {}
      message.lawyerName = '小沫沫'
      message.createTime = alltime
      message.content = this.chatData
      this.$api.getWljiefangsendinfo( this.$route.params.id, {
        content: this.chatData
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('回复成功')
          this.chatData = ''
          this.data.push(message)
        }
      })
    },
    beginJf() {
      this.$api.getWljiefangchange(this.$route.params.id).then(res => {
        if (res.code === 0) {
          this.show1 = true
          this.show4 = true
          this.show = false
        }
      })
    },
    endJf() {
      this.$api.getWljiefangchange(this.$route.params.id).then(res =>{
        if (res.code === 0) {
          this.show1 = false
          this.show4 = false
          this.show = false
          this.show2 = true
        }
      })
    },
  },
  created(){
    //  获取月份 星期
    this.$api.getWljiefangxq(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.biaogeshuju = res.data
        this.str = res.data.state
      }
      // 后台返回直接4种中文字符串 直接===判断四种
      if (this.str === '已过期') {
        this.show3 = true
      }
      if (this.str == '已接访') {
        this.show1 = true
        this.show4 = true
      }
      if (this.str == '待接访') {
        this.show1 = true
      }
      if (this.str == '已结束') {
        this.show2 = true
      }
    })
    this.$api.getWljiefangliaotian(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.data = res.data
      } 
    })
  }, 
  mounted() {
  } 
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
                  overflow-y: scroll;
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
