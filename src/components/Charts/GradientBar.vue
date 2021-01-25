<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>
// 渐变柱形图
<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    xAxisData: {
      type: Array,
      default: () => []
    },
    // 是否展示图例 默认不展示
    isShowLegend: {
      type: Boolean,
      default: false
    },
    colorArr: {
      type: Array,
      default: function() {
        return [{ top: '#4185ef', bottom: 'rgba(65, 133, 239, 0.1)' }, { top: '#ffbe3f', bottom: 'rgba(255, 190, 63, 0.1)' }, { top: '#38d7b7', bottom: 'rgba(56, 215, 183, 0.1)' }, { top: '#ffbe3f', bottom: 'rgba(255, 190, 63, 0.1)' }, { top: '#4185ef', bottom: 'rgba(65, 133, 239, 0.1)' }, { top: '#38d7b7', bottom: 'rgba(56, 215, 183, 0.1)' }]
      },
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    titleText: {
      type: String,
      default: '案件数'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const _this = this
      this.chart = echarts.init(document.getElementById(this.id))
      const seriesData = []
      const legendData = []
      this.chartData.forEach((item, index) => {
        legendData.push(item.name)
        seriesData.push({
          name: item.name,
          type: item.type || 'bar',
          barGap: '10%',
          barMinWidth: 8,
          barMaxWidth: 14,
          data: item.data,
          itemStyle: {
            normal: {
              color: function(params) {
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: _this.colorArr[index].top // 0% 处的颜色
                }, {
                  offset: 1,
                  color: _this.colorArr[index].bottom// 100% 处的颜色
                }], false)
              },
              barBorderRadius: [10, 10, 0, 0]
            },
          }
        })
      })
      this.chart.setOption({
        title: {
          top: 0,
          text: _this.titleText,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#53668d'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          show: _this.isShowLegend,
          top: 6,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: legendData,
          left: 'center',
          textStyle: {
            fontSize: 12,
            color: '#4f5e7b'
          }
        },
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: 0,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          snap: true,
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 50,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#53668d'
            }
          },
          data: _this.xAxisData
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#53668d'
            }
          },
          axisLabel: {
            inside: false,
            formatter: '{value}\n'
          }
        }],
        series: seriesData
      })
      this.chart.on('click', (params) => {
        this.$emit('clickBar', params)
      })
    }
  }
}
</script>
