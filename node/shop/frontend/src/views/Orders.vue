<template>
  <div>
    <div v-for="item in orderList" :key="item.id">
      <h6>订单号：{{ item.id }}</h6>
      <el-table :data="item.products" border style="width: 100%">
        <el-table-column prop="id" label="ID" >
        </el-table-column>

        <el-table-column prop="title" label="名称" >
        </el-table-column>

        <el-table-column prop="price" label="价格" >
        </el-table-column>

        <el-table-column prop="quantity" label="数量" >
          <template #default="scope">
            <div>{{ scope.row.orderItem.quantity}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref,inject, onMounted, defineProps, watchEffect } from 'vue'
const $axios = inject('$axios')
let orderList = ref([]);

const props = defineProps({
  active: String
})
let getOrders = async () => {
  const {  data: { orders } } = await $axios.get("/api/orders");
  orderList.value = [...orders];
}
onMounted( () => {
 watchEffect(async () => {
   if(props.active === 'order'){
        console.log('active:', props.active)
        getOrders()
      }
    })
});
</script>

<style lang="scss" scoped></style>
