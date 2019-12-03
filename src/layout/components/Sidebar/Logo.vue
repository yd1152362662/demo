<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-12-02 15:59:23
 * @Description: 添加描述
 -->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <div
          style="display:flex;align-items: center;height:64px;justify-content: center;"
        >
          <img v-if="logo" :src="logo1" class="sidebar-logo-singer">
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <div
          style="display:flex;align-items: center;height:64px;justify-content: center;"
        >
          <img v-if="logo" :src="logo" class="sidebar-logo">
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title1: '西南水泥智慧物流',
      title2: '管理平台',
      logo: require('@/assets/home/logo.png'),
      logo1: require('@/assets/home/logo-singer.png')
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 64px;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid #ebecec;
  border-right: 1px solid #f8f7f7;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 75%;
    }
    & .sidebar-logo-singer {
      width: 75%;
    }

  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
