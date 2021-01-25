<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="filter-container">
        <el-form class="base-search-form" :model="form" :inline="true">
          <el-form-item label="检察院">
            <el-cascader
              v-model="value"
              :options="options"
              :props="props"
              @change="changeLvshi"
              :show-all-levels="false"
              clearable>
            </el-cascader>
          </el-form-item>
          <el-form-item label="律师">
            <el-select v-model="form.lvshi" placeholder="请选择">
              <el-option v-for="item in lvshiList" :key="item.id" :label="item.realName" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="form.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <input
              id=""
              type="button"
              name=""
              value="重置"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="handleBack"
            >
          </el-form-item>
          <el-form-item>
            <input
              id=""
              type="submit"
              name=""
              value="查询"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="handleFilter"
            >
          </el-form-item>
        </el-form>
      </div>
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
      <div class="tupian">
        <div class="one">
          <img src="@/icons/img/oneone.png" alt="">
          <span>网络咨询统计</span>
        </div>
        <div v-if="showshow" class="two">
          <div id="main" class="left" ref="main"></div>
          <div id="midd" class="midd"></div>
          <div id="right" class="right"></div>
        </div>
      </div>
      <div class="tupian">
        <div class="one">
          <img src="@/icons/img/twotwo.png" alt="">
          <span>网络接访统计</span>
        </div>
        <div v-if="showshow" class="two">
          <div id="one" class="left"></div>
          <div id="two" class="midd"></div>
          <div id="three" class="right"></div>
        </div>
      </div>
      <div class="tupian">
        <div class="one">
          <img src="@/icons/img/four.png" alt="">
          <span>预约窗口统计</span>
        </div>
        <div v-if="showshow" class="two">
          <div id="four" class="left"></div>
          <div id="five" class="midd"></div>
          <div id="six" class="right"></div>
        </div>
      </div>
      <div class="tupian">
        <div class="one">
          <img src="@/icons/img/thrthr.png" alt="">
          <span>涉访涉诉统计</span>
        </div>
        <div v-if="showshow" class="two-item">
          <div id="seven" class="left"></div>
          <div id="eigte" class="right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        time: ['', ''],
        lvshi: '',
      },
      value: '',
      lvshiList: [],
      options: [],
      showshow: true,
      props:{
        multiple: false,
        checkStrictly: true ,
        emitPath: false,
        label: 'name',
        value: 'id',
        children: 'children'
      },
      messageList: [],
      tableList1: {
        title: {
          text: '网络咨询趋势分析'
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            data: [],
          }
        ]
      },
      tableList4: {
        title: {
          text: '网络接访趋势分析'
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            data: [],
          }
        ]
      },
      tableList7: {
        title: {
          text: '预约窗口趋势分析'
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            data: [],
          }
        ]
      },
      tableList10: {
        title: {
          text: '涉访涉诉趋势分析'
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            data: [],
          }
        ]
      },
      tableList2: {
        title: {
          text: '网络咨询类型分析',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 20,
          left: 'center',
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      tableList5: {
        title: {
          text: '网络接访类型分析',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: [],
          bottom: 20,
          left: 'center',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      tableList8: {
        title: {
          text: '预约窗口类型分析',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 20,
          left: 'center',
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      tableList11: {
        title: {
          text: '涉访涉诉类型分析',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 20,
          left: 'center',
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      tableList3: {
        title: {
          text: '网络咨询状态分析',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: [],
          bottom: 20,
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
            ]
          }
        ]
      },
      tableList6: {
        title: {
          text: '网络接访状态分析',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: [],
          bottom: 20,
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
            ]
          }
        ]
      },
      tableList9: {
        title: {
          text: '预约窗口状态分析',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: [],
          bottom: 20,
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
            ]
          }
        ]
      },
    }
  },
  computed: {
  },
  watch: {
    value(newValue, oldValue) {
      let that = this
      this.options.find(item => {
        if (item.id == newValue) {
          that.$api.getjianchanyuanChildren(item.id).then(res => {
            if (res.code === 0) {
              that.$set(item, 'children', res.data)
            }
          })
        }else {
          if (item.children) {
            that.$options.methods.finditem(item.children,newValue,that)
          }
        }
      }) 
    },
  },
  created() {
    this.getTime()
    this.getList()
    this.$api.getjianchanyuanLIst().then(res => {
      if (res.code === 0) {
        this.options = res.data
      }
    })
  },
  mounted() {
  },
  methods: {
    getList() {
    // 统计数据
    this.$api.getJianChaGuanTj({
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      lawyerId: this.form.lvshi,
      procuratorateId: this.value
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.messageList = res.data
      }
    })
    // 网络咨询
    this.$api.getJianChaGuanWLZX({
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      lawyerId: this.form.lvshi,
      procuratorateId: this.value
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        if (res.data) {
          const tableOne = res.data.countTrent
          const tableTwo = res.data.countType
          const tableThr = res.data.countState
          for (var i = 0; i < tableOne.length; i++) {
            this.tableList1.xAxis.data.push(tableOne[i].resultName)
            this.tableList1.series[0].data.push(tableOne[i].count)
          }
          for (var i = 0; i < tableTwo.length; i++) {
            this.tableList2.legend.data.push(tableTwo[i].resultName)
            let message = {}
            this.$set(message, 'value', tableTwo[i].count)
            this.$set(message, 'name', tableTwo[i].resultName)
            this.tableList2.series[0].data.push(message)
          }
          for (var i = 0; i < tableThr.length; i++) {
            this.tableList3.legend.data.push(tableThr[i].resultName)
            let message = {}
            this.$set(message, 'value', tableThr[i].count)
            this.$set(message, 'name', tableThr[i].resultName)
            this.tableList3.series[0].data.push(message)
          }
          this.mainChart()
          this.middChart()
          this.rightChart()
        }else {
          console.log('无数据')
          this.$message.warning('暂无统计数据哦')
          this.mainChart()
          this.middChart()
          this.rightChart()
        }
      }
    })
    // 网络接访
    this.$api.getJianChaGuanWLJF({
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      lawyerId: this.form.lvshi,
      procuratorateId: this.value
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        if (res.data) {
          const tableOne = res.data.countTrent
          const tableTwo = res.data.countType
          const tableThr = res.data.countState
          for (var i = 0; i < tableOne.length; i++) {
            this.tableList4.xAxis.data.push(tableOne[i].resultName)
            this.tableList4.series[0].data.push(tableOne[i].count)
          }
          for (var i = 0; i < tableTwo.length; i++) {
            this.tableList5.legend.data.push(tableTwo[i].resultName)
            let message = {}
            this.$set(message, 'value', tableTwo[i].count)
            this.$set(message, 'name', tableTwo[i].resultName)
            this.tableList5.series[0].data.push(message)
          }
          for (var i = 0; i < tableThr.length; i++) {
            this.tableList6.legend.data.push(tableThr[i].resultName)
            let message = {}
            this.$set(message, 'value', tableThr[i].count)
            this.$set(message, 'name', tableThr[i].resultName)
            this.tableList6.series[0].data.push(message)
          }
          this.newCharts4()
          this.newCharts5()
          this.newCharts6()
        }else {
          console.log('无数据')
          this.$message.warning('暂无统计数据哦')
          this.newCharts4()
          this.newCharts5()
          this.newCharts6()
        }
      }
    })
    // 窗口接访
    this.$api.getJianChaGuanCKJF({
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      lawyerId: this.form.lvshi,
      procuratorateId: this.value
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        if (res.data) {
          const tableOne = res.data.countTrent
          const tableTwo = res.data.countType
          const tableThr = res.data.countState
          for (var i = 0; i < tableOne.length; i++) {
            this.tableList7.xAxis.data.push(tableOne[i].resultName)
            this.tableList7.series[0].data.push(tableOne[i].count)
          }
          for (var i = 0; i < tableTwo.length; i++) {
            this.tableList8.legend.data.push(tableTwo[i].resultName)
            let message = {}
            this.$set(message, 'value', tableTwo[i].count)
            this.$set(message, 'name', tableTwo[i].resultName)
            this.tableList8.series[0].data.push(message)
          }
          for (var i = 0; i < tableThr.length; i++) {
            this.tableList9.legend.data.push(tableThr[i].resultName)
            let message = {}
            this.$set(message, 'value', tableThr[i].count)
            this.$set(message, 'name', tableThr[i].resultName)
            this.tableList9.series[0].data.push(message)
          }
          this.newCharts7()
          this.newCharts8()
          this.newCharts9()
        }else {
          console.log('无数据')
          this.$message.warning('暂无统计数据哦')
          this.newCharts7()
          this.newCharts8()
          this.newCharts9()
        }
      }
    })
    // 涉访涉诉
    this.$api.getJianChaGuanCKJF({
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      lawyerId: this.form.lvshi,
      procuratorateId: this.value
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        if (res.data) {
          const tableOne = res.data.countTrent
          const tableTwo = res.data.countType
          for (var i = 0; i < tableOne.length; i++) {
            this.tableList10.xAxis.data.push(tableOne[i].resultName)
            this.tableList10.series[0].data.push(tableOne[i].count)
          }
          for (var i = 0; i < tableTwo.length; i++) {
            this.tableList11.legend.data.push(tableTwo[i].resultName)
            let message = {}
            this.$set(message, 'value', tableTwo[i].count)
            this.$set(message, 'name', tableTwo[i].resultName)
            this.tableList11.series[0].data.push(message)
          }
          this.newCharts10()
          this.newCharts11()
        }else {
          console.log('无数据')
          this.$message.warning('暂无统计数据哦')
          this.newCharts10()
          this.newCharts11()
        }
      }
    })
    },
    // ---------------------------------
    finditem(list,id,that) {
      list.find(item => {
        if (item.id == id) {
          if (item.hasChildren == 1) {
            that.$api.getjianchanyuanChildren(item.id).then(res => {
              if (res.code === 0) {
                that.$set(item, 'children', res.data)
              }
            })
          }  
        }else {
          if (item.children) {
            that.$options.methods.finditem(item.children,id,that)
          }
        }
      })
    },
    changeLvshi(value) {
      this.$api.getjianchanlvshi(value).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.lvshiList = res.data
        }
      })
    },
    handleBack() {
      this.form.time = ['', '']
      this.form.lvshi = ''
      this.value = ''
    },
    getTime() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      let mouth = ''
      let day
      // 月
      if (date.month < 10) {
        mouth = '0' + date.month
      } else {
        mouth = date.month
      }
      // 日
      if (date.date < 10) {
          day = '0' + date.date
      } else {
          day = date.date
      }
      this.form.time[0] = date.year - 1 + '-' + mouth + '-' + day
      this.form.time[1] = date.year + '-' + mouth + '-' + day
    },
    handleFilter() {
      this.tableList1.xAxis.data = []
      this.tableList1.series[0].data = []
      this.tableList2.legend.data = []
      this.tableList2.series[0].data = []
      this.tableList3.legend.data = []
      this.tableList3.series[0].data = []
      // 
      this.tableList4.xAxis.data = []
      this.tableList4.series[0].data = []
      this.tableList5.legend.data = []
      this.tableList5.series[0].data = []
      this.tableList6.legend.data = []
      this.tableList6.series[0].data = []
      // 
      this.tableList7.xAxis.data = []
      this.tableList7.series[0].data = []
      this.tableList8.legend.data = []
      this.tableList8.series[0].data = []
      this.tableList9.legend.data = []
      this.tableList9.series[0].data = []
      this.tableList10.xAxis.data = []
      this.tableList10.series[0].data = []
      this.tableList11.legend.data = []
      this.tableList11.series[0].data = []
      this.getList()
    },
    mainChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      const option = this.tableList1
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    middChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('midd'))
      // 指定图表的配置项和数据
      const option = this.tableList2
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    rightChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('right'))
      // 指定图表的配置项和数据
      const option = this.tableList3
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(option)
    },
    newCharts4() {
      const myChart = this.$echarts.init(document.getElementById('one'))
      const option = this.tableList4
      myChart.setOption(option)
    },
    newCharts5() {
      const myChart = this.$echarts.init(document.getElementById('two'))
      const option = this.tableList5
      myChart.setOption(option)
    },
    newCharts6() {
      const myChart = this.$echarts.init(document.getElementById('three'))
      const option = this.tableList6
      myChart.setOption(option)
    },
    newCharts7() {
      const myChart = this.$echarts.init(document.getElementById('four'))
      const option = this.tableList7
      myChart.setOption(option)
    },
    newCharts8() {
      const myChart = this.$echarts.init(document.getElementById('five'))
      const option = this.tableList8
      myChart.setOption(option)
    },
    newCharts9() {
      const myChart = this.$echarts.init(document.getElementById('six'))
      const option = this.tableList9
      myChart.setOption(option)
    },
    newCharts10() {
      const myChart = this.$echarts.init(document.getElementById('seven'))
      const option = this.tableList10
      myChart.setOption(option)
    },
    newCharts11() {
      const myChart = this.$echarts.init(document.getElementById('eigte'))
      const option = this.tableList11
      myChart.setOption(option)
    },
  },
}
</script>
<style lang="scss" scoped>
.title{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
              padding: 10px 20px;
              font-size: 30px;
              font-weight: 1000;
          }
          .zengzhang{
              padding: 10px 20px;
              span{
                font-size: 22px;
                color: red;
              }
          }
        }
        .count-item{
            padding: 0 20px;
        }
    }
}
input{
    outline: none;
    border: none;
}
.one{
    display: flex;
    align-items: center;
    margin: 10px 0;
    span{
        padding-left: 6px;
        font-weight: 1000;
        font-size: 20px;
    }
}
.two{
    width: 100%;
    display: flex;
    margin: 20px 0;
    .left{
        width: 50%;
        box-sizing: border-box;
        height: 400px;
        border-bottom: 1px solid #e1e7ef;
        border-top: 1px solid #e1e7ef;
        border-left: 1px solid #e1e7ef;
        padding-top: 16px;
    }
    .midd{
        width: 25%;
        box-sizing: border-box;
        height: 400px;
        border-bottom: 1px solid #e1e7ef;
        border-top: 1px solid #e1e7ef;
        border-left: 1px dashed #e1e7ef;
        padding-top: 16px;
    }
    .right{
        width: 25%;
        box-sizing: border-box;
        height: 400px;
        border-bottom: 1px solid #e1e7ef;
        border-top: 1px solid #e1e7ef;
        border-left: 1px dashed #e1e7ef;
        border-right: 1px dashed #e1e7ef;
        padding-top: 16px;
    }
}
.two-item{
      width: 100%;
      display: flex;
      margin: 20px 0;
       .left{
        width: 50%;
        box-sizing: border-box;
        height: 400px;
        border-bottom: 1px solid #e1e7ef;
        border-top: 1px solid #e1e7ef;
        border-left: 1px solid #e1e7ef;
        padding-top: 16px;
    }
    .right{
        width: 50%;
        box-sizing: border-box;
        height: 400px;
        border-bottom: 1px solid #e1e7ef;
        border-top: 1px solid #e1e7ef;
        border-left: 1px dashed #e1e7ef;
        border-right: 1px dashed #e1e7ef;
        padding-top: 16px;
    }
}
</style>
