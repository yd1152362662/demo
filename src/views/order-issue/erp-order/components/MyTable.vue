<!--
 * @Author: yangdan
 * @Date: 2019-10-12 10:30:36
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-30 10:58:48
 * @Description: 添加描述
 -->

<template>
  <div class="tl-rl">
    <template :table="table">
      <el-table
        ref="TlRlTable"
        v-loading="table.loading"
        :show-summary="table.hasShowSummary"
        :summary-method="table.getSummaries"
        :data="table.data"
        tooltip-effect="dark"
        :border="table.border"
        style="width: 100%"
        :row-class-name="rowClassName"
        :span-method="objectSpanMethod"
        header-row-class-name="thClassName"
        :header-cell-style="tableHeaderColor"
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
      >
        <el-table-column v-if="table.hasSelect" type="selection" width="55" />
        <template v-for="item in table.tr">
          <el-table-column
            v-if="item.show !== false && item.show === 'template'"
            :key="item.id"
            :label="item.label"
            :class-name="item.className ? item.className : ''"
            :width="item.width ? item.width : ''"
            :min-width="item.minWidth ? item.minWidth : ''"
            align="center"
          >
            <!-- <template slot-scope="scope">
              <slot :name="item.prop" :obj="scope"></slot>
            </template>-->
            <template slot-scope="scope">
              <el-tag
                :color="InitColor(scope.row.state)"
                style="color:#fff"
                close-transition
              >{{ InitState(scope.row.state) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.show !== false && item.show !== 'template'"
            :key="item.id"
            :label="item.label"
            :prop="item.prop"
            :class-name="item.className ? item.className : ''"
            :width="item.width ? item.width : ''"
            :min-width="item.minWidth ? item.minWidth : ''"
            align="center"
          />
        </template>
        <el-table-column
          v-if="table.hasOperation"
          column-key="operation"
          :label="table.operation.label"
          :width="table.operation.width ? table.operation.width : ''"
          :min-width="table.operation.minWidth ? table.operation.minWidth : ''"
          :class-name="table.operation.className"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-for="item in table.operation.data"
              :key="item.id"
              :class="item.classname ? item.classname : ''"
              :size="item.size"
              :type="item.type"
              @click.stop="handleOperation(scope.$index, scope.row, item.id)"
            >{{ item.label }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationDiv">
        <el-pagination
          background
          :current-page="table.pagination.currentPage || 0"
          :page-size="table.pagination.size ||10"
          layout=" prev, pager, next, jumper,total"
          :total="table.pagination.total || 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <div class="btn-choose">确定</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Recordlist',
  props: {
    table: {
      type: Object,
      default() {
        return {
          hasMergeRowOrColumn: false, // 是否合并单元格
          loading: false, // 加载中动画
          hasShowSummary: false, // 是否显示表位合计行
          border: false, // 是否带有纵向边框，默认为false
          hasSelect: false, // 有无选中功能
          hasOperation: false, // 有无操作功能
          tr: [
            // 表头数据 —— className:列的class名
            {
              id: '1',
              label: 'label',
              prop: 'prop',
              className: 'classname',
              minWidth: '80',
              show: true // show有三种值：false隐藏当前列，true常规表格列，template自定义表格列
              //          <template slot-scope="props" slot="example">
              //                <a class="list-a" target="_blank" :href="'/#/bombscreen?mobile=' + props.obj.row.mobile">{{ props.obj.row.username }}</a>
              //          </template>
            }
          ],
          data: [], // 表格数据 —— 如需添加行class，处理数据时则需要传入class名， class需为数组
          operation: {
            // 操作功能
            label: '操作', // 操作列的行首文字
            width: '200', // 操作列的宽度
            className: '', // 操作列的class名
            data: [
              // 操作列数据
              {
                label: '通过', // 按钮文字
                Fun: 'handleSubmit', // 点击按钮后触发的父组件事件
                size: 'mini', // 按钮大小
                id: '1', // 按钮循环组件的key值
                classname: 'show' // 按钮的类名
              }
            ]
          },
          getSummaries(param) {
            // 自定义表位合计行数据
            // *** 此函数传入param参数
            console.log(param);
            // *** 最后返回一个数组，合计行会显示数组中的内容
            return [];
          },
          pagination: {
            currentPage: '0',
            total: '0'
          }
        };
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('onHandleSelectionChange', val);
    },
    handleOperation(a, b, id) {
      const data = this.table.operation.data;
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          this.$emit(data[i].Fun, a, b);
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (!this.hasMergeRowOrColumn) {
        return;
      } else {
        this.$emit('onMergeRowOrColumn', {
          row,
          column,
          rowIndex,
          columnIndex
        });
      }
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick(Row, Event, Column) {
      if (
        !Column ||
        Column.type === 'selection' ||
        Column.columnKey === 'operation' ||
        Column.type === 'expand'
      ) {
        return;
      }
      const data = {
        row: Row,
        event: Event,
        column: Column
      };
      this.$emit('onRowClick', data);
    },
    // 行类名的回调函数
    // 在表格数据中添加class字段即为表格行类名，配合css可对表格行中的自定义标签进行样式优化
    rowClassName(rowdata) {
      const data = this.table.data;
      let className = data[rowdata.rowIndex].class
        ? data[rowdata.rowIndex].class
        : '';
      if (className.length === 0) {
        return;
      }
      className = className.join(' ');
      return className;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit('handleSizeChangeFun', val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit('handleCurrentChangeFun', val);
    },
    InitState(val) {
      switch (val) {
        case 0:
          return '未接单';
          break;
        case 1:
          return '运输中';
          break;
        default:
          return '其他状态';
      }
    },
    InitColor(val) {
      switch (val) {
        case 0:
          return 'blue';
          break;
        case 1:
          return 'orange';
          break;
        default:
          return 'red';
      }
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEEEEE;font-weight:400;border-bottom:0;font-size:16px';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.paginationDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  height: 60px;
}
.ReleaseFun {
  height: 40px;
  font-size: 14px;
}
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.el-input__inner {
  height: 30px;
}

.btn-choose {
  width: 40px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #248bf2;
    border: 1px solid #248bf2;
  }
}
.paginationDiv {
  >>> .el-pagination__total {
    margin: 0 14px !important;
  }
}
</style>
