<template>
  <div>
    <HeaderNav />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav";
export default {
  components: {
    HeaderNav,
  },
};
</script>

<style>
</style>