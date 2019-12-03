<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-11 15:53:55
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="container-box">
      <div>
        <searchForm :form-config="formConfig" :value="form">
          <el-button slot="operate" @click="handleDownload">重置</el-button>
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
        <Dialog
          :show.sync="dialogTableVisible"
          title="订单发布"
          class="ReleaseDiaog"
          @cancel="cancel"
          @OK="OK"
        >
          <el-row>
            <el-col :xs="24" :sm="24" :md="10" :lg="11" class="ReleaseDiaog-col">
              <p>
                <span>货物名称：</span>
                <span>石将军牌水泥</span>
              </p>
              <p>
                <span>货物类型：</span>
                <span>PC32.5袋装</span>
              </p>
              <p>
                <span>货物重量：</span>
                <span>20吨</span>
              </p>
              <p>
                <span>创建时间：</span>
                <span>2019-10-26</span>
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="13">
              <p>
                <span>司机姓名：</span>
                <span>张大宝</span>
              </p>
              <p>
                <span>联系方式：</span>
                <span>13323233232</span>
              </p>
              <p>
                <span>车牌号码：</span>
                <span>贵A12121</span>
              </p>
              <p>
                <span>装货地址：</span>
                <span>贵州省铜仁市思南县贵州沿河西南水泥有限公司</span>
              </p>
            </el-col>
          </el-row>
          <Title :title="'收货人信息'">
            <el-form :inline="true">
            <el-row>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="收货人姓名">
            <el-input placeholder="请输入货物名称"></el-input>
            </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="收货地址">
            <el-select placeholder="请选择">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="收货人电话">
            <el-input placeholder="请输入收货人电话"></el-input>
            </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="详细地址">
            <el-input placeholder="请输入详细地址"></el-input>
            </el-form-item>
            </el-col>
            </el-row>
            </el-form>
          </Title>
          <Title :title="'时间要求'">
            <el-form :inline="true">
            <el-row>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="装货时间">
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="收货时间">
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            </el-col>
            </el-row>
            </el-form>
          </Title>
          <Title :title="'运输要求'" :title-state="1">
            <el-form :inline="true">
            <el-row>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="装卸需求">
            <el-select placeholder="请选择">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="订单模式">
            <el-select placeholder="请选择">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="回单">
            <el-select placeholder="请选择">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="运费">
            <el-input placeholder="请输入货物名称"></el-input>
            </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-form-item label="结算方式">
            <el-select placeholder="请选择">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>
            </el-col>
            </el-row>
            </el-form>
          </Title>
          <Title :title="'备注'" :title-state="1">
            <el-row>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <el-input type="textarea"></el-input>
            </el-col>
            </el-row>
          </Title>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import MyTable from './components/MyTable';
import searchForm from './components/form';
import Dialog from './components/Dialog';
import Title from './components/title';

export default {
  name: 'Tab',
  components: {
    MyTable,
    searchForm,
    Dialog,
    Title
  },
  data() {
    return {
      tabMapOptions: [
        { label: '当前货源', key: '1' },
        { label: '最新发布', key: '2' },
        { label: '在途运输', key: '3' },
        { label: '完成订单', key: '4' }
      ],
      createdTimes: 0,
      // table的数据和配置
      dataTable: {
        hasOperation: true,
        tr: [
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
            label: '装货地址',
            prop: 'two',
            minWidth: '80',
            show: true
          },
          {
            id: '3',
            label: '货物名称',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '4',
            label: '货物类型',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '5',
            label: '货物重量',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '6',
            label: '车牌号',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '7',
            label: '承运司机',
            prop: 'state',
            minWidth: '80',
            show: true
          },
          {
            id: '8',
            label: '创建时间',
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
              size: '', // 按钮大小
              type: 'primary',
              id: '1', // 按钮循环组件的key值
              classname: 'ReleaseFun' // 按钮的类名
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
            id: 1,
            type: 'primary',
            name: '查询',
            handleClick: this.search
          },
          {
            id: 2,
            name: '重置',
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
    // 下载的函数
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

<style lang="scss" scoped>
@import "./index.scss";
</style>
