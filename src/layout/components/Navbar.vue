<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-13 11:00:03
 * @Description: 添加描述
 -->
<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb v-if="device!=='mobile'" id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template>
        <svg-icon icon-class="small-heade-photo" style="width:24px;height:24px" />
        <span style="font-size:15px;color:#333">欢迎XXX登录哆啦快运货主版</span>
        <el-button size="mini" @click="logout">退出</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'isDot'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      localStorage.setItem('mark', '-1');
    },
    toggleisDot() {
      console.log('object');
      this.$store.dispatch('app/setDot');
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 63px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow:10px 0px 16px 0px rgba(0,0,0,0.1);
  .hamburger-container {
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    line-height: 64px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 64px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    svg {
      margin-right: 7px;
    }
    span {
      margin-right: 10px;
    }
    button {
      width: 60px;
      height: 30px;
    }

    &:focus {
      outline: none;
    }
    em {
      position: relative;
      top: -27px;
      right: 10px;
      cursor: pointer;
      >>> .el-badge__content.is-fixed.is-dot {
        top: 25px;
        left: 15px;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #333;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        color: #333;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        span {
          margin: 0 5px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
}
</style>
