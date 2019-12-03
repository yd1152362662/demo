<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-16 15:52:03
 * @Description: 添加描述
 -->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
  background-color: #f6fafe;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 120px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

.basic-box {
  padding: 35px 24px;
  position: relative;
}
.container-box {
  padding: 25px 24px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.basic-border {
  box-shadow: 0px 2px 20px 0px rgba(36, 139, 242, 0.13);
  border-radius: 10px;
  border: 1px solid rgba(188, 218, 248, 1);
  padding: 15px 32px;
}
</style>

