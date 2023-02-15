<template>
  <div>
    <div v-for="item in orders" :key="item.id">
      <h6>订单号：{{ item.id }}</h6>
      <el-table :data="item.products" border style="width: 100%">
        <el-table-column prop="id" label="ID" >
        </el-table-column>

        <el-table-column prop="title" label="名称" >
        </el-table-column>

        <el-table-column prop="price" label="价格" >
        </el-table-column>

        <el-table-column prop="quantity" label="数量" >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref,inject } from 'vue'
const $axios = inject('$axios')
let orders = ref([{
    id: '0001',
    products:[
      {
        id: 1,
        title: '蔬菜',
        price: '2',
        quantity: 5
      }
    ]
  }])


// const { status, data: { order } } = await $axios.get("api/orders");
// if (status === 200) {
//   orders = order;
// }
</script>

<style lang="scss" scoped></style>
