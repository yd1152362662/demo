<!--
 * @Author: yangdan
 * @Date: 2019-10-25 14:26:08
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-31 18:03:02
 * @Description: 添加描述
 -->

<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :show="show"
      center
      top="8vh"
      @close="$emit('update:show', false)"
    >
      <slot />

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="OK">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      visible: this.show
    };
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    OK() {
      this.$emit('OK');
    }
  }
};
</script>
