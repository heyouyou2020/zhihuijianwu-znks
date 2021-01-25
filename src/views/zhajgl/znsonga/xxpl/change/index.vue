<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <!-- 头部搜索start-->
      <div class="filter-container">
        <el-form class="base-search-form" :model="form" :inline="true">
          <div class="one">
            <el-form-item label="标题">
              <el-input
                v-model="form.name"
                placeholder="请输入标题"
                clearable
                style="width:1300px"
              />
          </el-form-item>
          </div>
          <div class="one">
            <el-form-item label="栏目">
              <el-select v-model="form.lanmu" placeholder="请选择" style="width:1300px">
                <el-option label="优秀案例展示" value="优秀案例展示" />
                <el-option label="联络工作状态" value="联络工作状态" />
                <el-option label="律师数据报告" value="律师数据报告" />
                <el-option label="鲁检公告" value="鲁检公告" />
                <el-option label="律师风采" value="律师风采" />
                <el-option label="常见问题" value="常见问题" />
                <el-option label="代表委员说检查" value="代表委员说检查" />
              </el-select>
            </el-form-item>
          </div>
          <div class="one">
            <el-form-item label="状态">
              <el-select v-model="form.state" placeholder="请选择" style="width:1300px">
                <el-option label="草稿" value="0" />
                <el-option label="已发布" value="1" />
              </el-select>
            </el-form-item>
          </div>
          
          <div class="one" v-html="daiding"></div>
          <div class="one">
            <el-form-item>
              <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
            </el-form-item>
          </div>
          <div class="one">
            <span class="span-item" @click="zhibiao">插入指标</span>
            <span class="span-item" @click="tubiao">插入图表</span>
            <span class="span-item" @click="yulan">预览</span>
            <span class="span-item" @click="send">修改</span>
            <span class="span-item" @click="goback">返回</span>
          </div>
        </el-form>
        <el-dialog
          title="选择指标"
          :visible.sync="dialogVisible"
          width="70%"
         >
          <el-date-picker
            v-model="time1"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <input
              id=""
              class="input-item"
              type="submit"
              name=""
              value="查询"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="handleFilter"
            >
          <div ref="zhibiaohtml" @click="addzhibiao"  v-if="show1">
            <div class="title">
              <div class="wenzi" v-for="(item, index) in messageList" :key="index">
                <div class="diyih">
                  <span class="zongshu">{{ item.count }}</span>
                  <span class="zengzhang">
                    <span>{{ item.yearOnYear }}</span>
                  </span>
                </div>
                <div class="count-item">{{ item.name }}</div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialog">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="插入图标"
          :visible.sync="dialogVisible1"
          width="70%"
         >
         <el-date-picker
            v-model="time2"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <input
              id=""
              class="input-item"
              type="submit"
              name=""
              value="查询"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="handClick"
            >
          <div class="two" ref="imgone" @click="clickOne">
           <!-- // <div id="mainitem" style="width: 600px;height:300px;" class="left"></div> -->
            <pie-charts width="50%" height="280px" :pie-data="pieData" unit="件" />
          </div>
          <div class="two">
            <div id="midd" class="midd"></div>         
          </div>
           <div class="two">
            <div id="right" class="right"></div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Visible">关闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import PieCharts from '@/components/Charts/PieCharts'
export default {
  components: { PieCharts },
  data() {
    return {
      form: {
        name: '',
        lanmu: '',
        state: ''
      },
      yulanShow: false,
      pieData: [
        { value: 335, name: '民事' },
        { value: 310, name: '刑事' },
        { value: 234, name: '行政' },
        { value: 135, name: '其他' },
      ],
      time1: ['', ''],
      time2: ['', ''],
      show1: false,
      show2: false,
      message1:[],
      dialogVisible: false,
      dialogVisible1: false,
      msg: '',
      daiding: '',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/UEditor/'
      },
      tableList1: {
        title: {
          text: '网络咨询趋势分析'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 0,
              lt: 8,
              color: 'rgba(0, 180, 0, 0.5)'
            },
          ]
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: 'drakgreen',
              width: 5
            },
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
              data: [
                { xAxis: 1 },
                { xAxis: 2 },
                { xAxis: 3 },
                { xAxis: 4 },
                { xAxis: 5 },
                { xAxis: 6 },
                { xAxis: 7 },
                { xAxis: 8 },
                { xAxis: 9 }
              ]
            },
            areaStyle: {},
            data: [
              ['2019-10-10', 200],
              ['2019-10-11', 400],
              ['2019-10-12', 650],
              ['2019-10-13', 500],
              ['2019-10-14', 250],
              ['2019-10-15', 300],
              ['2019-10-16', 450],
              ['2019-10-17', 300],
              ['2019-10-18', 100]
            ]
          }
        ]
      },
    }
  },
  created() {
    this.$api.getHomemessage(this.$route.params.id
    ).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.form.name = res.data.title
        this.form.lanmu = res.data.typeName
        this.form.state = res.data.state
        this.msg = res.data.content
      }else {
        this.$message.error('获取信息详情失败')
      }
    })
  },
  methods: {
    handleFilter() {
      this.$api.getzhibiao({
        startTime: this.time1[0],
        endTime: this.time2[1],
        lawyerId: '',
        procuratorateId: ''
      }).then(res => {
        this.show1 = true
        this.messageList = res.data
      })
    },
    handClick() {},
    goback() {
      this.$router.go(-1)
    },
    dialog() {
      this.dialogVisible = false
      this.show1 = false
    },
    Visible() {
      this.dialogVisible1 = false
    },
    zhibiao() {
      this.dialogVisible = true
    },
    tubiao() {
      this.$message.error('图表工具暂不可用')
      return false
      console.log(this.$echarts.init)
      this.dialogVisible1= true
      this.mainChart()
      //this.$options.methods.mainChart()
      
    },
    yulan() {
      this.yulanShow = true
      this.daiding = this.daiding + this.msg
      this.$message.success('恭喜预览成功, 您可进行修改操作')
    },
    baocun() {
      if (!this.yulanShow) {
        this.$message.error('请预览后再保存')
        return false
      }
      if (this.form.name == '' || this.form.lanmu == '' || this.daiding == '') {
        this.$message.error('标题、栏目、内容不能为空')
        return false
      }
      this.$api.baocun({
        title: this.form.name,
        typeName: this.form.lanmu,
        content: this.daiding
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.$router.push({
            name: 'xxfb'
          })
        }else{
          this.$message.error('保存失败')
        }
      })
    },
    send() {
      if (!this.yulanShow) {
        this.$message.error('请预览后再修改')
        return false
      }
      if (this.form.name == '' || this.form.lanmu == '' || this.daiding == '') {
        this.$message.error('标题、栏目、内容不能为空')
        return false
      }
      this.$api.xiugai(this.$route.params.id, {
        title: this.form.name,
        typeName: this.form.lanmu,
        content: this.daiding,
        state: this.form.state
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.$router.push({
            name: 'xxfb'
          })
        }else {
          this.$message.error('修改失败')
        } 
      })
    },
    addzhibiao() {
      this.daiding =  this.daiding + this.$refs.zhibiaohtml.innerHTML
    },
    clickOne() {
      this.daiding = this.$refs.imgone.innerHTML
    },
    mainChart() {
     // 基于准备好的dom，初始化echarts实例
     console.log(this.$echarts.init)
      const myChart = this.$echarts.init(document.getElementById('mainitem'))
      // 指定图表的配置项和数据
      const option = this.tableList1
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
  },
  mounted() {
  
    console.log(1111111111111)
    // this.rightChart()
  },
}
</script>
<style lang="scss" scoped>
.one{
    margin-top: 20px;
    margin-left: 40px;
    .span-item{
      padding: 10px 30px;
      color: white;
      border-radius: 6px;
      background-color: rgb(44, 135, 187);
      margin-right: 10px;
    }
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
</style>
