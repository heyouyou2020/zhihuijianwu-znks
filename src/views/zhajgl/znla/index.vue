<template>
  <router-view :key="key" />
</template>

<script>
export default {
  name: 'ZNLA',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
