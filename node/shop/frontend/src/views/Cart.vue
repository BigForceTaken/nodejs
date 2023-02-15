<template>
  <div>
    <el-button type="primary" size="mini" @click="createOrder()"
      >添加订单</el-button>
    <div>
      <el-table :data="products" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>

        <el-table-column prop="title" label="名称" width="180"></el-table-column>

        <el-table-column prop="price" label="价格" width="180"></el-table-column>

        <el-table-column prop="quantity" label="数量" width="180"></el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="cartDeleteItem(scope.$index, scope.row)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,inject  } from 'vue';
import { useRouter} from 'vue-router'

const router = useRouter()
  const $axios = inject('$axios');

  let products = ref([{
    id: '1',
    title: '衣服',
    price: '2.5',
    quantity:1
  }])
 

  onMounted(() => {
    console.log('onMounted')
  })
   // 获取购物车
  const getCart = async () => {
    console.log('getCart')
    const res = await $axios.get("api/cart");
    if (res.status === 200) {
      products = res.data.products;
    }
  }

  getCart();
    // 删除购物车项
  const  cartDeleteItem = async (row) => {
    const res = await $axios.delete("api/cartItem/" + row.id);
    if (res.data.success) {
      await getCart();
    }
  }
    // 添加订单
   const createOrder = async () => {
      const res = await $axios.post("api/orders");
      if (res.status === 200) {
        router.push("/orders");
      }
    }

</script>
