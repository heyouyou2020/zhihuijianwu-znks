<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="top">
        <img src="@/icons/img/ajxq.png" alt="">
        <span>咨询详情</span>
      </div>
      <div class="one">
        <span class="zuti">咨询人姓名</span>
        <span class="xiti">{{message.visitorName}}</span>
        <span class="zuti">类别</span>
        <span class="xiti">{{message.optionValueName}}</span>
        <span class="zuti">咨询时间</span>
        <span class="xiti">{{message.createTime}}</span>
      </div>
      <div class="two">
        <span class="left">咨询内容:</span>
        <span class="right">{{message.consultingContent}}</span>
      </div>
      <div class="top">
        <img src="@/icons/img/huifu.png" alt="">
        <span>我的回复</span>
      </div>
      <div v-if="show" class="two">
        <span class="left">回复内容:</span>
        <span class="right">{{xiaoxi}}</span>
      </div>
      <div v-if="message.isReply == '未回复'" v-show="show2" class="neirong">
        <input v-model="backInfo" type="text" placeholder="请输入">
      </div>
      <div v-if="message.isReply == '未回复'" v-show="show2" class="btu">
        <button @click="sendMessage">回复</button>
      </div>
      <div v-if="message.isReply == '已回复'" class="two">
        <span class="left">回复内容:</span>
        <span class="right">{{message.replyContent}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: {},
      backInfo: '',
      show: false,
      xiaoxi: '',
      canabled: true,
      show2: true,
    }
  },
  created() {
    this.$api.getWlzixunneirong(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.message = res.data
      }
    })
  },
  methods: {
    sendMessage() {
      if (this.backInfo.length <= 0) {
        this.$message.error('回复内容不能为空')
        return false
      }
      this.$api.getWlzixunHuifu(this.$route.params.id, {
        replyContent: this.backInfo,
      }).then(res => {
        if (res.code === 0) {
          this.xiaoxi = this.backInfo
          this.backInfo = ''
          this.show = true
          this.show2 = false
          this.$message.success('回复成功')
          this.$router.go(-1)
        } 
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.top{
    padding: 10px;
    display: flex;
    align-items: center;
    background: #ebf3fe;
    border: 1px solid #a9c4df;
    margin-bottom: 20px;
    span{
        padding-left: 10px;
    }
}
.one{
    margin: 20px 0;
    .zuti{
        color: black;
        font-weight: 1000;
        padding-left: 10px;
    }
    .xiti{
        color: #727e95;
        padding-right: 10px;
    }
}
.two{
    display: flex;
    justify-content: space-between;
    margin-bottom: 100px;
    .left{
        padding-left: 10px;
        color: black;
        font-weight: 1000;
        display: inline-block;
        width: 6%;
    }
    .right{
        display: inline-block;
        width: 92%;
        word-wrap: break-word;
        word-break: normal;
        text-align: justify;
        padding-right: 40px;
    }
}
.neirong{
    width: 100%;
    margin: 20px 0;
    input{
        width: 100%;
        padding-bottom: 200px;
        outline: none;
        border: 1px solid #a9c4df;
    }
}
.btu{
    float: right;
    button{
        padding: 10px 40px;
        color: white;
        background: #1b9dff;
        border: none;
    }
}
</style>
