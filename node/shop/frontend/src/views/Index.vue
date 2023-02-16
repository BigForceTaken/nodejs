<template>
  <el-row>
    <el-col :span="24">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="商品" name="product">
          <product :active="activeName" @change="changeActive"></product>
        </el-tab-pane>
        <el-tab-pane label="购物车" name="cart">
          <cart :active="activeName" @change="changeActive"></cart>
        </el-tab-pane>
        <el-tab-pane label="订单" name="order">
          <orders :active="activeName" @change="changeActive"></orders>
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

let activeName = ref('product')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
const changeActive = (value) => {
  console.log(value)
  activeName.value = value;
}
</script>