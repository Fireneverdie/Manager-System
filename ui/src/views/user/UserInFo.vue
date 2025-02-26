<script setup>
import { ref, reactive, onMounted } from "vue"
import request from "../../utils/axios-config"
import { ElMessage } from "element-plus"
import Upload from "@/components/upload/Upload.vue"
const baseUrl = import.meta.env.VITE_APP_BASE_URL
const tableData = ref([])
const centerDialogVisible = ref(false)
const userFormRef = ref({})
const userForm = reactive({
  id: null,
  username: "",
  role: "editor", //admin是管理员 editor是编辑
  avatar: "",
  file: null,
})

const userFormRules = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  introduction: [
    { required: true, message: "Please input introduction", trigger: "blur" },
  ],
  role: [
    { required: true, message: "Please select your role", trigger: "blur" },
  ],
  gender: [
    { required: true, message: "Please select your gender", trigger: "blur" },
  ],
})

const roleOptions = [
  {
    value: "admin",
    label: "管理员",
  },
  {
    value: "editor",
    label: "编辑",
  },
]

const getTableData = async () => {
  const res = await request.get("/users/list")
  tableData.value = res.data.data
}
onMounted(() => {
  getTableData()
})

const handleEdit = (data) => {
  Object.assign(userForm, data)
  console.log(userForm)
  centerDialogVisible.value = true
}

const handleEditComfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await request.put("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      centerDialogVisible.value = false
      getTableData()
      if (res.data.code === 200) ElMessage.success("更新成功")
    }
  })
  console.log("handleEditComfirm")
}

const handleDelete = async (id) => {
  const result = await request.delete(`/users/${id}`)

  if (result.data.code === 200) ElMessage.success("删除成功")
  getTableData()
}

const handleAvatarChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}
</script>
<template>
  <div>
    <el-card class="card-box">
      <el-page-header content="用户管理" icon="" title="用户列表" />

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar :size="50" :src="baseUrl + scope.row.avatar" />
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="角色">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 'admin'" type="primary"
              >管理员</el-tag
            >
            <el-tag v-else-if="scope.row.role === 'editor'" type="success"
              >编辑</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>

            <el-popconfirm
              title="你确定要删除吗？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="centerDialogVisible"
      title="编辑用户"
      width="50%"
      align-center
    >
      <el-form
        ref="userFormRef"
        style="max-width: 600px"
        :model="userForm"
        :rules="userFormRules"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select
            v-model="userForm.role"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <Upload :avatar="userForm.avatar" @fileChange="handleAvatarChange" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditComfirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-main {
  overflow: auto;
  height: calc(100vh - 60px);
}

.el-table {
  margin-top: 50px;
}
</style>
