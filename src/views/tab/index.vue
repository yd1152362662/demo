<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-25 14:57:03
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="container-box">
      <div>
        <searchForm :form-config="formConfig" :value="form">
          <el-button slot="operate" @click="handleDownload">导出表格</el-button>
        </searchForm>
        <MyTable
          class="MyTable"
          :table="dataTable"
          @ReleaseFun="Release"
          @HandleViewDetailsFun="HandleViewDetails"
          @handleSizeChangeFun="handleSizeChange"
          @handleCurrentChangeFun="handleCurrentChange"
        />

        <!-- 弹框 -->
        <Dialog :show.sync="dialogTableVisible" title="订单发布" @cancel="cancel" @OK="OK">
          示例弹框
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import tabPane from './components/TabPane';
import MyTable from './components/MyTable';
import searchForm from './components/form';
import Dialog from './components/Dialog';

export default {
  name: 'Tab',
  components: {
    tabPane,
    MyTable,
    searchForm,
    Dialog
  },
  data() {
    return {
      tabMapOptions: [
        { label: '当前货源', key: '1' },
        { label: '最新发布', key: '2' },
        { label: '在途运输', key: '3' },
        { label: '完成订单', key: '4' }
      ],
      activeName: '1',
      createdTimes: 0,
      // table的数据和配置
      dataTable: {
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: '第一行',
            prop: 'one',
            minWidth: '80',
            show: true
          },
          {
            id: '2',
            label: '第二行',
            prop: 'two',
            minWidth: '80',
            show: true
          },
          {
            id: '3',
            label: '订单状态',
            prop: 'state',
            minWidth: '80',
            show: 'template'
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
        operation: {
          // 操作功能
          label: '操作', // 操作列的行首文字
          width: '200', // 操作列的宽度
          className: 'three', // 操作列的class名
          data: [
            // 操作列数据
            {
              label: '发布', // 按钮文字
              Fun: 'ReleaseFun', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '1', // 按钮循环组件的key值
              classname: 'show' // 按钮的类名
            }
          ]
        },
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
            label: '时间',
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
          },
          {
            type: 'input',
            prop: 'PlateNumber',
            label: '车牌号',
            placeholder: '请输入车牌号'
          },
          {
            type: 'select',
            prop: 'FactoryName',
            label: '货物类型',
            placeholder: '请选择货物类型',
            optList: [{ label: '12313', value: '1' }]
          }
        ],
        operate: [
          {
            icon: 'el-icon-search',
            type: 'primary',
            name: '查询',
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
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}`);
    }
  },
  created() {
    // init the default  selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    },
    Release() {
      console.log('发布了');
      this.dialogTableVisible = true;
      // this.$confirm("<strong>这是 <i>HTML</i> 片段</strong>", "我是标题", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   center: true,
      //   dangerouslyUseHTMLString: true
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
    },
    HandleViewDetails() {
      console.log('查看详情');
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
    handleDownload() {
      this.downloadLoading = true;

      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['第一行', '第二行', '状态值'];
        const filterVal = ['one', 'two', 'state'];
        const list = this.dataTable.data;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          console.log('j', j);
          if (j === 'state') {
            return this.stateChange(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    stateChange(state) {
      switch (state) {
        case 1:
          return '运输中';
          break;
        default:
          return '其他状态';
          break;
      }
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
.tab-container {
  margin: 30px;
}
.MyTable {
  width: 100%;
  height: 300px;
}
</style>
