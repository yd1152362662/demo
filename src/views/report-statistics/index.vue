<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-30 10:36:38
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="container-box">
      <div>
        <searchForm :form-config="formConfig" :value="form" />
        <MyTable
          class="MyTable"
          :table="dataTable"
          @handleSizeChangeFun="handleSizeChange"
          @handleCurrentChangeFun="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyTable from './components/MyTable';
import searchForm from './components/form';
import Dialog from './components/Dialog';

export default {
  name: 'Tab',
  components: {
    MyTable,
    searchForm,
    Dialog
  },
  data() {
    return {
      // table的数据和配置
      dataTable: {
        tr: [
          {
            id: '0',
            label: '序号',
            prop: 'two',
            minWidth: '50',
            className: 'haha',
            show: true
          },
          {
            id: '1',
            label: '订单号',
            prop: 'one',
            minWidth: '80',
            className: 'haha',
            show: true
          },
          {
            id: '2',
            label: '发布时间',
            prop: 'two',
            minWidth: '80',
            show: true
          },
          {
            id: '3',
            label: '发货地址',
            prop: 'two',

            show: true
          },
          {
            id: '4',
            label: '收货地址',
            prop: 'two',

            show: true
          },
          {
            id: '5',
            label: '收货人',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '6',
            label: '货物名称',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '7',
            label: '货物重量(吨)',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '8',
            label: '车牌号',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '9',
            label: '承运司机',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '10',
            label: '出场时间',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '11',
            label: '完成时间',
            prop: 'state',
            minWidth: '80',
            show: true
          }
        ], // 表格行数据
        data: [
          {
            id: 1,
            one: 'haha1234',
            two: 'two',
            state: 1
          },
          {
            id: 2,
            one: 'haha2',
            two: 'two',
            state: 2
          },
          {
            id: 3,
            one: 'haha2',
            two: 'two',
            state: 3
          }
        ], // 表格内容数据
        pagination: {
          currentPage: 1,
          size: 10,
          total: 40
        }
      },
      // form的数据和配置
      formConfig: {
        formItemList: [
          {
            type: 'datetimerange',
            prop: 'datetimerange',
            dateFormate: 'yyyy-MM-dd hh:mm:ss',
            label: '发布时间',
            pickerOptions: {
              shortcuts: [
                {
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                },
                {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                },
                {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }
              ]
            }
          }
        ],
        operate: [
          {
            id: 1,
            type: 'primary',
            name: '查询',
            plain: false,
            handleClick: this.search
          },
          {
            id: 2,
            type: 'primary',
            name: '导出Excel',
            className: 'Excel',
            plain: true,
            handleClick: this.search
          }
        ]
      },
      // 得到的form的数据
      form: {},
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      dialogTableVisible: false
    };
  },
  watch: {},
  created() {},
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    },
    search() {
      console.log('form', this.form);
    },
    handleSizeChange(val) {
      console.log('每页数val', val);
      this.$set(this.dataTable.pagination, 'size', val);
      console.log('this.dataTable.pagination', this.dataTable.pagination);
    },
    handleCurrentChange(val) {
      console.log('当前页数val', val);
      this.$set(this.dataTable.pagination, 'currentPage', val);
      console.log('this.dataTable.pagination', this.dataTable.pagination);
    },
    cancel() {
      console.log('取消了');
      this.dialogTableVisible = false;
    },
    OK() {
      console.log('确认了');
      this.dialogTableVisible = false;
    }
  }
};
</script>

<style scoped>
.MyTable {
  padding-top: 15px;
}
.basic-box >>> .Excel {
  background-color: #fff;
  color: #248bf2;
  border-color: #248bf2;
}
.basic-box >>> .Excel:hover {
  background-color: rgba(36, 139, 242, 0.103);
  color: #248bf2;
}
</style>
