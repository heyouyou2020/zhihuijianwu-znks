<template>
  <div
    :id="id"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
// import echarts from 'echarts'
import 'echarts/map/js/province/shandong.js'
// import '@/plugin/ditu-shandong-all.min.js'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    mapData: {
      default: function() {
        return []
      },
      type: Array
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
      mapEcharts: null
    }
  },
  watch: {
    mapData: function(val) {
      if (val) {
        this.initChart(val)
      }
    }
  },
  mounted() {
    // this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(mapData) {
      const _this = this
      const mapEcharts = _this.echarts.init(document.getElementById(this.id))
      const options = {
        backgroundColor: '#fff',
        title: {
          // text: '-审查情况地区展示-',
          subtext: '',
          x: 'center',
          bottom: '0'
        },
        tooltip: {
          trigger: 'item'
        },

        // 左侧小导航图标
        visualMap: {
          min: 0,
          max: 500,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#BCF6FB', '#A2D5F5', '#79ACE6', '#6697E1', '#3E6ED5', '#275DC9']
          }
        },
        // 配置属性
        series: [{
          name: '数据',
          type: 'map',
          map: '370000',
          roam: true,
          label: {
            normal: {
              show: true // 省份名称
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 0.5, // 区域边框宽度
              borderColor: '#B3E6FB', // 区域边框颜色
              areaColor: '#9FD1F2', // 区域颜色
            },
            emphasis: {
              borderWidth: 0.5,
              borderColor: '#B3E6FB',
              areaColor: '#2A59CF',
            }
          },
          data: mapData
        }]
      }
      mapEcharts.setOption(options)
      // 点击事件,根据点击某个省份计算出这个省份的数据
      mapEcharts.on('click', function(params) {
        console.log(params)
        _this.$emit('clickMap', params)
      })
    }
  }
}
</script>
