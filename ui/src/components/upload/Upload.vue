<script setup>
import { defineProps, defineEmits, computed } from "vue"

const props = defineProps({
  avatar: String,
})

const emit = defineEmits(["fileChange"])

const imageUrl = computed(() => {
  if (!props.avatar) return ""
  if (props.avatar.startsWith("/")) {
    return "http://localhost:3000" + props.avatar
  }
  return props.avatar
})

const handleChange = (file) => {
  emit("fileChange", file.raw)
}
</script>

<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color) !important;
    border-radius: 6px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
    transition: var(--el-transition-duration-fast) !important;

    &:hover {
      border-color: var(--el-color-primary) !important;
    }
  }

  :deep(.avatar-uploader-icon) {
    font-size: 28px !important;
    color: #8c939d !important;
    width: 178px !important;
    height: 178px !important;
    text-align: center !important;
  }

  :deep(.avatar) {
    width: 178px !important;
    height: 178px !important;
    display: block !important;
    background-size: cover !important;
  }
}
</style>
