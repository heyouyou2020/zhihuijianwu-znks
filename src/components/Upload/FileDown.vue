<template>
  <div class="">
    <ul v-if="zlList.length>0" class="uploadShow">
      <li v-for="(item,i) in zlList" :key="i">
        <a class="fr ml10" style="cursor: pointer" @click="down(item)"><img src="@/icons/img/down.png" height="12" width="12"></a>
        <span v-if="item.type=='pic'"><img src="@/icons/img/pic.png" height="16" width="14"></span>
        <span v-else-if="item.type=='audio'"><img src="@/icons/img/audio.png" height="16" width="14"></span>
        <span v-else-if="item.type=='video'"><img src="@/icons/img/video.png" height="16" width="14"></span>
        <span v-else><img src="@/icons/img/wd.png" height="16" width="14"></span>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SingleImageDown',
  props: {
    zlList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    down(item) {
      window.location.href = process.env.VUE_APP_BASE_API + '/jcjd/download?id=' + item.id
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
