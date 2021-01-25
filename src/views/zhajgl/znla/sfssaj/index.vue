<template>
  <router-view :key="key" />
</template>

<script>
export default {
  name: 'sfssaj',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
