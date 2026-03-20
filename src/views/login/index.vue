<template>
  <div class="login-container" :class="{ dark: themeStore.themeMode === 'dark' }">
    <div class="login-bg">
      <WaveBg />
    </div>
    <div class="login-card">
      <div class="theme-switch" @click="toggleTheme">
        <el-icon class="theme-icon">
          <Moon v-if="themeStore.themeMode === 'dark'" />
          <Sunny v-else />
        </el-icon>
      </div>
      <div class="login-header">
        <div class="login-logo">
          <svg-icon name="complex/icon" />
        </div>
        <h2 class="title">
          Element Plus Admin
        </h2>
        <p class="subtitle">
          欢迎回来，请登录您的账号
        </p>
      </div>
      <el-form ref="formRef" size="large" :model="formData" :rules="formRules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="input-icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password @keyup.enter="handleLogin">
            <template #prefix>
              <el-icon class="input-icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" round class="login-btn" :loading="loading" @click="handleLogin">
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Lock, Moon, Sunny, User } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import WaveBg from "./WaveBg.vue";
import { getFirstPage } from "@/utils/permission";
import { usePermissionStore } from "@/store/permission";
import { useThemeStore } from "@/store/theme";
import router from "@/router";

defineOptions({ name: "Login" });

const route = useRoute();
const themeStore = useThemeStore();

const loading = ref(false);

const formRef = ref<FormInstance>();
const formData = reactive({
  username: "admin",
  password: "admin123",
});
const formRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
};

const toggleTheme = () => {
  themeStore.setThemeMode(themeStore.themeMode === "dark" ? "light" : "dark");
};

const handleLogin = async () => {
  try {
    await formRef.value?.validate();
    loading.value = true;

    const permissionStore = usePermissionStore();

    setTimeout(async () => {
      loading.value = false;
      ElMessage({
        message: "登录成功！欢迎回来",
        type: "success",
      });
      permissionStore.token = "test";
      const defaultPath = await getFirstPage(route.query.redirect as string || "/dashboard");
      router.replace(defaultPath);
    }, 500);
  }
  catch (error) {
    console.error("验证失败", error);
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-card {
    position: relative;
    z-index: 10;
    width: 420px;
    padding: 60px 40px 80px;
    background-color: @color-bg;
    border-radius: 16px;
    box-shadow: @box-shadow;

    .theme-switch {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      user-select: none;

      .theme-icon {
        font-size: 20px;
      }

      &:hover {
        color: @color-primary;
      }
    }

    .login-header {
      text-align: center;
      margin-bottom: 36px;

      .login-logo {
        width: 56px;
        height: 56px;
        margin: 0 auto 20px;
        color: @color-primary;

        .svg-icon {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 8px;
      }

      .subtitle {
        font-size: 14px;
        color: @color-text-secondary;
      }
    }

    .login-form {
      .input-icon {
        font-size: 18px;
      }

      :deep(.el-input__inner) {
        font-size: 16px;
      }

      .login-btn {
        width: 100%;
        height: 44px;
      }
    }
  }
}
</style>
