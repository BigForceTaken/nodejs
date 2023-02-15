<template>
  <el-row>
    <el-col :span="24">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="商品" name="product">
        <product></product>
      </el-tab-pane>
      <el-tab-pane label="购物车" name="cart">
        <cart></cart>
      </el-tab-pane>
      <el-tab-pane label="订单" name="order">
        <orders></orders>
      </el-tab-pane>
    </el-tabs>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref } from 'vue'
import Product from './Product.vue'
import Cart from './Cart.vue'
import Orders from './Orders.vue'

const activeName = ref('product')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>