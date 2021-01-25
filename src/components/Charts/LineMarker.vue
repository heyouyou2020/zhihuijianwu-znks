<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

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
    isShowLegend: {
      type: Boolean,
      default: false
    },
    colorArr: {
      type: Array,
      default: function() {
        return ['#5fb9ff', '#ff958a', '#66dee6', '#ffc343', '#8a6538', '#50c0a5', '#c69150', '#a1b34c']
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
  watch: {
    chartData: function(val) {
      const seriesData = []
      const legendData = []
      this.chartData.forEach((item, index) => {
        legendData.push(item.name)
        seriesData.push({
          name: item.name,
          type: item.type || 'line',
          data: item.data,
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 3
            }
          }
        })
      })
      this.option.xAxis[0].data = val[0].data.map(function(data2) {
        return data2.name
      })
      this.option.series = seriesData
      this.option.legend.data = legendData
      this.chart.setOption(this.option)
    }
  },
  methods: {
    initChart() {
      const _this = this
      this.chart = echarts.init(document.getElementById(this.id))

      this.option = {
        color: _this.colorArr,
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
          axisPointer: {
            lineStyle: {
              color: '#dfdfdf'
            }
          }
        },
        legend: {
          show: _this.isShowLegend,
          top: 6,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
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
          boundaryGap: false,
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
        series: []
      }
      this.chart.setOption(this.option)
    }
  }
}
</script>
