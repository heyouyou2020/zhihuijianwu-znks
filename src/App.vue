
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    window.localStorage.setItem('userInfo', JSON.stringify({ 'name': '检察官', 'id': '1' }))
  }
}
</script>
