<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="filter-container">
        <div class="top">
          <span v-for="item in data" :key="item.id" :class="item.className" @click="clickme(item.id, item.name)">{{ item.title }}</span>
        </div>
        <component :is="zujian" />
      </div>
    </div>
  </div>
</template>
<script>
import one from './one'
import two from './two'
import thr from './thr'
import four from './four'
export default {
  components: { one, two, thr, four },
  data() {
    return {
      data: [
        { id: 0, name: 'one', title: '网络咨询', className: 'active' },
        { id: 1, name: 'two', title: '网络接访', className: '' },
        { id: 2, name: 'thr', title: '预约窗口接访', className: '' },
        { id: 3, name: 'four', title: '涉访涉诉案件化解工作', className: '' },
      ],
      zujian: 'one',
    }
  },
  methods: {
    clickme(id, name) {
      this.data.map(item => {
        item.className = ''
      })
      this.data[id].className = 'active'
      this.zujian = name
    }
  }
}
</script>
<style lang="scss" scoped>
.top{
    margin: 10px 0;
    padding-bottom: 30px;
    span{
        padding: 10px 0;
        color: rgb(51, 47, 47) ;
        margin-right: 30px;
    }
    .active{
        border-bottom: 2px solid rgb(42, 98, 172);
        color: rgb(42, 98, 172);;
    }
}
</style>
