<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-12-02 16:07:50
 * @Description: 添加描述
 -->
<template>
  <div :class="{'has-logo':showLogo}" style="box-shadow:10px 0px 16px 0px rgba(0,0,0,0.1);">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="'#fff'"
        :text-color="'#888888'"
        :unique-opened="true"
        :active-text-color="'#117EFB'"
        :collapse-transition="false"
        mode="vertical"
        class="active-bg-color"
      >
        <sidebar-item
          v-for="route in constantRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
// import variables from '@/styles/variables.scss';
import { constantRoutes } from '@/router';

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      constantRoutes: constantRoutes,
      mark: sessionStorage.getItem('mark'),
      time: true
    };
  },

  computed: {
    ...mapGetters(['sidebar']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },

  mounted() {
    // this.$store.dispatch("getRouter/generateRoutes", this.mark);
    this.$store.dispatch('getRouter/changeRoutes', this.mark);
    console.log(1213)
  },
  destroyed() {},
  methods: {}
};
</script>

<style  scoped>
.active-bg-color > .menu-wrapper >>> .is-active {
  background-color: rgba(36, 138, 242, 0.1) !important;
  /* border-left: 4px solid #2aa3f6 !important; */
}
.active-bg-color >>>.menu-wrapper >>> ul {
  background-color: rgba(36, 138, 242, 0.1) !important;
  /* border-left: 4px solid #2aa3f6 !important; */
}
</style>
