<template>
  <div
    :id="id"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

// 饼图

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    pieData: {
      default: function() {
        return []
      },
      type: Array
    },
    xAxisData: {
      type: Array,
      default: () => []
    },
    legendData: {
      type: Array,
      default: () => []
    },
    unit: {
      type: String,
      default: ''
    },
    // 是否展示图例 默认不展示
    isShowLegend: {
      type: Boolean,
      default: false
    },
    roseType: {
      type: String,
      default: () => '' // radius 和 area 两种模式
    },
    radius: {
      type: Array,
      default: () => [0, 90]
    },
    color: {
      type: Array,
      default: () => ['#397ef0', '#5ce4bd', '#fa7250', '#f2ca4e', '#56bbf9', '#8759d5', '#8195d7', '#91a3ca', '#c3de49', '#3fcbb2']
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
  watch: {
    pieData: function(val) {
      this.option.series[0].data = val
      this.option.legend.data = val.map(function(item) {
        return item.name
      })
      this.chart.setOption(this.option)
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
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ' + _this.unit + ' ({d}%)'
        },
        legend: {
          show: _this.isShowLegend,
          orient: 'vertical',
          left: 'left',
          data: _this.legendData
        },
        color: _this.color,
        series: [{
          type: 'pie',
          radius: _this.radius,
          center: ['50%', '50%'],
          label: {
            textStyle: {
              fontSize: 14,
              color: '#7e879b'
            },
            formatter: '{b}:{c}' + _this.unit
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      this.chart.setOption(this.option)
    }
  }
}
</script>
