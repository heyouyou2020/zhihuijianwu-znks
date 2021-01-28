<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="neirong">
        <div class="top">{{message.title}}</div>
        <div class="time">
          <span class="left">发布时间:</span>
          <span class="right">{{message.updateTime}}</span>
        </div>
        <div class="conten">{{message.typeName}}</div>
        <div class="tubiao">
          <div v-html="message.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReviewArrest',
  data() {
    return {
      message: {},
    }
  },
  created() {
    this.$api.getHomemessage(this.$route.params.id
    ).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.message = res.data
      }else {
        this.$message.error('获取信息详情失败')
      }
    })
  },
  mounted() {
  },
  methods: {
    refresh(val) {
    },
    getTime() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1
      }
      let mouth = ''
      // 月
      if (date.month < 10) {
        mouth = '0' + date.month
      } else {
        mouth = date.month
      }
      // 日
      // if (date.date < 10) {
      //     day = '0' + date.date
      // } else {
      //     day = date.date
      // }
      this.form.start = date.year - 1 + '-' + mouth
      this.form.end = date.year + '-' + mouth
    }
  }
}
</script>
<style lang="scss" scoped>
.neirong{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .top{
        font-weight: 1000;
        font-size: 40px;
        margin: 20px;
    }
    .time{
        .left{
            font: 800;
            color: black;
        }
        .right{
            color: rgb(49, 47, 47);
        }
    }
    .conten{
        width: 90%;
        text-align: justify;
        word-wrap: wrap;
        word-break: break-all;
        padding-top: 10px;
        padding-bottom: 10px;
        color: white;
        margin: 20px 0;
        // padding-right: 100px;
        background-color: rgb(85, 134, 173);
    }
  .tubiao{
    width: 86%;
  }
  .title{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;
    .wenzi{
        width: 18%;
        padding: 20px 10px;
        background: #ebf3fe;
        border: 1px solid #a9c4df;
        .diyih{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .zongshu{
              padding: 10px 10px;
              font-size: 30px;
              font-weight: 200;
          }
          .zengzhang{
              padding: 10px 10px;
              span{
                font-size: 22px;
                color: red;
              }
          }
        }
        .count-item{
            padding: 0 10px;
        }
    }
}
}
</style>
