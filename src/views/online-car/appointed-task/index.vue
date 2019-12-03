<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-22 17:41:39
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="container-box">
      <div class="basic-border">
        <el-cascader
          v-model="selectedRegion"
          clearable
          :options="area"
          :props="props"
          :visible-change="false"
          change-on-select
          style="width:20%"
          @active-item-change="handleItemChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      area: [],
      props: {
        value: 'value',
        children: 'children'
      },
      selectedRegion: [],
      res: true
    };
  },
  watch: {
    selectedRegion(nv) {
      console.log('选择了', nv);
      this.loadRegionChild(nv);
    }
  },
  created() {},
  mounted() {
    this.$store
      .dispatch('test/testAddress', { parentCode: -1 })
      .then(res => {
        const areaArray = res.map(item => {
          return {
            label: item.name,
            value: item.code,
            children: []
          };
        });
        this.area = areaArray;
      })
      .catch(res => {
        console.log('fail-succes', res);
      });
  },
  methods: {
    handleItemChange(val) {
      console.log('active item:', val);
      this.selectedRegion = val;
    },

    findRegionOption(regionOptions, regionArr) {
      if (_.isEmpty(regionArr) || _.isEmpty(regionOptions)) {
        return null;
      }

      const regionId = _.first(regionArr);
      const regionOption = _.find(regionOptions, regionOption => {
        return regionOption.value === regionId;
      });
      if (!regionOption) {
        return null;
      }
      const tailRegionArr = _.tail(regionArr);
      if (_.isEmpty(tailRegionArr)) {
        return regionOption;
      }
      return this.findRegionOption(regionOption.children, tailRegionArr);
    },

    loadRegionChild(regionIdArr) {
      const regionOptions = this.area;
      const regionOptionInUI = this.findRegionOption(regionOptions, regionIdArr);
      if (
        !regionOptionInUI ||
        !regionOptionInUI.children ||
        regionOptionInUI.children.length > 0
      ) {
        return null;
      }

      const regionKey = _.last(regionIdArr);
      if (!regionKey) {
        return null;
      }

      // 拿数据
      this.$store
        .dispatch('test/testAddress', { parentCode: regionKey })
        .then(res => {
          if (res.length !== 0) {
            const areaArray = res.map(item => {
              return {
                label: item.name,
                value: item.code,
                children: []
              };
            });
            regionOptionInUI['children'] = areaArray;
          } else {
            console.log('无数据');
          }
        })
        .catch(res => {
          console.log('fail-succes', res);
        });
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
.MyTable {
  width: 100%;
  height: 300px;
}
</style>
