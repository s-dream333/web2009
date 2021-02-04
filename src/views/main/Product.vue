<template>
  <div class="product">
    <ProductSearch />
    <Product />
    <ProductProduction />
    <ProductAdd />
    <ProductEditor />
  </div>
</template>

<script>
import Product from "./ProductPage";
import ProductSearch from "./ProductPage/ProductSearch";
import ProductProduction from "./ProductPage/ProductProduction";
import ProductAdd from "./ProductPage/ProductAdd";
import ProductEditor from "./ProductPage/ProductEditor";

export default {
  components: {
    Product,
    ProductSearch,
    ProductProduction,
    ProductAdd,
    ProductEditor,
  },
};
</script>

<style scoped>
.product {
  width: 1200px;
  margin: 0 auto;
}
</style>