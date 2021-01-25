<template>
  <router-view :key="key" />
</template>

<script>
export default {
  name: 'Znsonga',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
