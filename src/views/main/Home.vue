<template>
  <div class="home">
    <div class="home-warp">
      <div class="home-warp-left">
        <HomeNav />
      </div>
      <div class="home-warp-right">
        <HomeSwiper />
        <HomeProductList />
      </div>
    </div>
  </div>
</template>

<script>
import HomeNav from "./Home/HomeNav";
import HomeSwiper from "./Home/HomeSwiper";
import HomeProductList from "./Home/HomeProductList";
export default {
  name: "Home",
  components: {
    HomeNav,
    HomeSwiper,
    HomeProductList
  },
};
</script>
<style lang="less" scoped>
.home-warp {
  width: 1200px;
  margin: 0 auto;
}
.home-warp-left {
  float: left;
  width: 300px;
  text-align: left;
}
.home-warp-right {
  float: left;
  width: 900px;
}
</style>