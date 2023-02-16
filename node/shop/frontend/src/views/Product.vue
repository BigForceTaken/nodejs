<template>
  <div>
  <el-button @click="dialogFormVisible = true">添加商品</el-button>
  <el-table :data="products" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="title" label="名称" width="180" />
    <el-table-column prop="price" label="价格" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="addCart(scope.row)"
          >添加购物车</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="deleteProduct(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- dialog弹框 -->
  <el-dialog
        title="收货地址"
        width="50%"
        v-model="dialogFormVisible"
        :close-on-click-modal="false"
      >
      <el-form :model="form" label-width="120px">
        <el-form-item label="商品名：">
          <el-input v-model="form.title" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="图片地址：">
          <el-input v-model="form.imageUrl" placeholder="请输入图片地址" />
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="form.description" placeholder="请输入说明" />
        </el-form-item>
      </el-form>
    <el-button type="primary" @click="addProduct">添加</el-button>
  </el-dialog>
</div>
</template>
<script setup>
import { ref,reactive , inject,defineEmits,defineProps, watchEffect,onMounted  } from 'vue';
// import { useRouter } from 'vue-router'

const emit = defineEmits(['change']);
const props = defineProps({
  active: String
})
const $axios = inject('$axios')
  const form = reactive ({
    title: '',
    imageUrl: '',
    price: '',
    description: '',
  })

  let products = ref([]);

  let dialogFormVisible = ref(false)

  onMounted(() => {
    watchEffect(async () => {
      if(props.active === 'product'){
        console.log('active:', props.active)
        getProducts()
      }
    })
  })

  const getProducts = async () => {
    const res = await $axios.get("/api/admin/products");
    products.value = res.data.prods;
  }
  getProducts();
    // 添加商品
  const addProduct = async () => {
    console.log(form.title)
      if (form.title && form.imageUrl && form.price && form.description) {
        const params = {
          title: form.title,
          imageUrl: form.imageUrl,
          price: form.price,
          description: form.description
        };
        const res = await $axios.post("/api/admin/product", params);
        if (res.data.success) {
          dialogFormVisible.value = false;
          await getProducts();
          form.title = "";
          form.imageUrl = "";
          form.price = "";
          form.description = "";
        }
      } else {
        alert("不得有空余项！");
      }
  }
    // 删除产品
  const deleteProduct = async (row) => {
    const res = await $axios.delete("/api/admin/product/" + row.id);
    await getProducts();
  }
    // const router = useRouter()
    // 添加购物车
    const addCart = async (row) => {
      const params = { id: row.id };
      const res = await $axios.post("/api/cart", params);
      if (res.data.success) {
        // router.push("/cart");
        // const { instance } = getCurrentInstance();
        emit('change','cart')
      }
    }

</script>