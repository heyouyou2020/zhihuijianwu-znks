<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="top">
        <img src="@/icons/img/ajxq.png" alt="">
        <span>咨询详情</span>
      </div>
      <div class="one">
        <span class="zuti">咨询人姓名:</span>
        <span class="xiti">{{ message.visitorName }}</span>
        <span class="zuti">类别:</span>
        <span class="xiti">{{ message.optionValueName }}</span>
        <span class="zuti">咨询时间:</span>
        <span class="xiti">{{ message.createTime }}</span>
      </div>
      <div class="one">
        <span class="zuti">咨询律师:</span>
        <span class="xiti">{{ message.lawyerName }}</span>
      </div>
      <div class="two">
        <span class="left">咨询内容:</span>
        <span class="right">{{ message.consultingContent }}</span>
      </div>
      <div class="top">
        <img src="@/icons/img/huifu.png" alt="">
        <span>律师回复</span>
      </div>
      <div class="neirong">
        <p>{{ message.replyContent }}</p>
      </div>
      <div class="btu">
        <button @click="goback">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: {},
    }
  },
  created() {
    this.$api.sousuowlzixunxq(this.$route.params.id).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.message = res.data
      }
    })
    this.$api.getjianchanyuanLIst().then(res => {
      console.log(res)
    })
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
.top{
    padding: 10px;
    display: flex;
    align-items: center;
    background: #ebf3fe;
    border: 1px solid #a9c4df;
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
    // display: inline-flex;
    justify-content: space-between;
    margin-bottom: 100px;
    .left{
        padding-left: 10px;
        color: black;
        font-weight: 1000;
        // display: inline-block;
        width: 6%;
    }
    .right{
        display: inline-block;
        width: 90%;
        word-wrap: break-word;
        word-break: normal;
        text-align: justify;
        padding-right: 40px;
    }
}
.neirong{
    width: 100%;
    margin: 20px 0;
    p{
        width: 100%;
        padding-bottom: 200px;
        padding-top: 10px;
        border: 1px solid #a9c4df;
        text-indent: 30px;
        padding-left: 10px;
        padding-right: 10px;
        text-align: justify;

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
