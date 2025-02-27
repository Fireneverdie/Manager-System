<script setup>
import { onMounted, reactive, ref } from "vue"
import { Edit, Star, Delete, StarFilled } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

import request from "@/utils/axios-config"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const tableData = ref([])
onMounted(() => {
  getTableData()
})

const getTableData = async () => {
  const res = await request.get("/products/list")
  console.log(res)
  tableData.value = res.data.data
}

const handleDelete = async (id) => {
  const result = await request.delete(`/products/${id}`)
  await getTableData()

  if (result.data.code === 200) ElMessage.success("删除成功")
}

const handleEdit = (data) => {
  router.push(`/prod/prod-edit/${data.id}`)
}
</script>
<template>
  <div>
    <el-card>
      <el-page-header content="产品列表" icon="" title="产品管理" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="产品名称" width="180" />
        <el-table-column prop="introduction" label="产品描述" width="180" />

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              circle
              :icon="Edit"
              type="default"
              @click="handleEdit(scope.row)"
            >
            </el-button>

            <el-popconfirm
              title="你确定要删除吗？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button circle :icon="Delete" type="danger"> </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
