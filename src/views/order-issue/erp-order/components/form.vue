<!--
 * @Author: yangdan
 * @Date: 2019-10-12 15:31:58
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-30 16:34:30
 * @Description: 添加描述
 -->
<template>
  <el-form
    :inline="true"
    :model="value"
    label-position="right"
    :label-width="formConfig.labelWidth"
    :rules="rules"
    size="mini"
  >
    <slot name="formItem" />

    <el-form-item
      v-for="(item) in formConfig.formItemList"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
    >
      <el-input
        v-if="item.type=='input'"
        v-model="value[item.prop]"
        :disabled="item.disabled"
        :clearable="true"
        :placeholder="item.placeholder"
      />

      <el-select
        v-else-if="item.type=='select'"
        v-model="value[item.prop]"
        :clearable="true"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="(optItem,index) in item.optList"
          :key="index"
          :label="optItem.label"
          :value="optItem.value"
        />
      </el-select>

      <el-date-picker
        v-else-if="item.type=='date'"
        v-model="value[item.prop]"
        :value-format="item.dateFormate"
        :type="item.type"
        :disabled="item.disabled"
        :clearable="true"
        :placeholder="item.label"
      />

      <el-date-picker
        v-else
        v-model="value[item.prop]"
        :type="item.type"
        :picker-options="item.pickerOptions"
        :value-format="item.dateFormate"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      />
    </el-form-item>

    <!-- 按钮 -->
    <el-button
      v-for="item in formConfig.operate"
      :key="item.id"
      size="small"
      :type="item.type"
      :icon="item.icon"
      style="margin-left:20px;width:100px"
      @click="item.handleClick"
    >{{ item.name }}</el-button>
  </el-form>
</template>
<script>
export default {
  components: {},
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  computed: {},
  mounted() {
    this.setDefaultValue();
  },
  methods: {
    setDefaultValue() {
      const formData = { ...this.value };
      // 设置默认值
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value;
        }
      });
      this.$emit('input', formData);
    }
  }
};
</script>

