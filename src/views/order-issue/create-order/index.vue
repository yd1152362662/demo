<!--
 * @Author: yangdan
 * @Date: 2019-10-31 09:29:33
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-13 11:07:50
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="container-box">
      <div class="container-box-border">
        <el-form
          ref="form"
          :inline="true"
          :model="OrderInformation"
          style="width:100%"
          :rules="rules"
        >
          <Title :title="'货物信息'">
            <el-row type="flex">
            <el-col
            :xs="24"
            :sm="10"
            :md="18"
            :lg="18"
            style="display:flex; justify-content: space-between;flex-wrap: wrap"
            >
            <el-form-item label="货物名称" prop="goodsName">
            <el-input v-model="OrderInformation.goodsName " placeholder="请输入货物名称"></el-input>
            </el-form-item>

            <el-form-item label="货物类型">
            <el-select v-model="OrderInformation.goodsType" placeholder="请选择">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>
            <div
            style="display:flex;justify-content: space-between; align-items:center;flex-wrap: wrap"
            >
            <el-form-item label="货物重量" prop="weight">
            <el-input v-model="OrderInformation.weight" placeholder="请输入所需重量"></el-input>
            </el-form-item>
            <el-select v-model="OrderInformation.unit" class="weight">
            <el-option label="吨" value="吨"></el-option>
            <el-option label="袋" value="袋"></el-option>
            </el-select>
            </div>
            </el-col>
            </el-row>
          </Title>

          <Title :title="'收货人信息'">
            <el-row>
            <el-col
            :span="17"
            style="display:flex; justify-content: space-between;flex-wrap: wrap"
            >
            <el-form-item label="收货人姓名" prop="name" style="margin-bottom:0">
            <el-input v-model="OrderInformation.name" placeholder="请输入收货人姓名"></el-input>
            </el-form-item>

            <el-form-item label="装货地址" prop="loadingAddress" style="margin-bottom:0">
            <el-select v-model="OrderInformation.loadingAddress" placeholder="请选择工厂">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="收货地址" prop="receivingAddress" style="margin-bottom:0">
            <el-select v-model="OrderInformation.receivingAddress" placeholder="请选择收货地址">
            <el-option label="pc32.5" value="pc32.5"></el-option>
            <el-option label="pc42.5" value="pc42.5"></el-option>
            </el-select>
            </el-form-item>
            </el-col>

            <el-col
            :span="17"
            style="display:flex; justify-content: space-between;flex-wrap: wrap"
            >
            <el-form-item label="收货人电话" prop="phone" style="margin-top:20px">
            <el-input v-model="OrderInformation.phone" placeholder="请输入货物名称"></el-input>
            </el-form-item>

            <el-form-item label="详细地址" prop="loadingDetailedAddress" style="margin-top:20px">
            <el-input
            v-model="OrderInformation.loadingDetailedAddress"
            placeholder="请输入装货详细地址"
            ></el-input>
            </el-form-item>

            <el-form-item label="详细地址" prop="receivingDetailedAddress" style="margin-top:20px">
            <el-input
            v-model="OrderInformation.receivingDetailedAddress"
            placeholder="请输入收货详细地址"
            ></el-input>
            </el-form-item>
            </el-col>
            </el-row>
          </Title>

          <Title :title="'时间要求'">
            <el-row>
            <el-col
            :xs="24"
            :sm="10"
            :md="11"
            :lg="11"
            style="display:flex; justify-content: space-between;flex-wrap: wrap"
            >
            <el-form-item label="装货时间" prop="loadingTime">
            <el-date-picker
            v-model="OrderInformation.loadingTime"
            type="date"
            placeholder="请选择装货时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            ></el-date-picker>
            </el-form-item>

            <el-form-item label="收货时间" prop="receivingTime">
            <el-date-picker
            v-model="OrderInformation.receivingTime"
            type="date"
            placeholder="请选择收货时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            ></el-date-picker>
            </el-form-item>
            </el-col>
            </el-row>
          </Title>

          <Title :title="'运输信息'" :title-state="1">
            <el-row>
            <el-col
            :xs="24"
            :sm="10"
            :md="17"
            :lg="17"
            style="display:flex; justify-content: space-between;flex-wrap: wrap"
            >
            <el-form-item label="装卸要求" style="margin-bottom:0">
            <el-select v-model="OrderInformation.handlingRequirements" placeholder="请选择">
            <el-option label="一装一卸" value="一装一卸"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="订单模式" style="margin-bottom:0">
            <el-select v-model="OrderInformation.orderMode" placeholder="请选择">
            <el-option label="一单一运" value="一单一运"></el-option>
            <el-option label="一单多运" value="一单多运"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="回单" style="margin-bottom:0">
            <el-select v-model="OrderInformation.receipt" placeholder="请选择">
            <el-option label="需要" value="需要"></el-option>
            <el-option label="不需要" value="不需要"></el-option>
            </el-select>
            </el-form-item>
            </el-col>

            <el-col
            :xs="24"
            :sm="10"
            :md="11"
            :lg="11"
            style="display:flex; justify-content: space-between;flex-wrap: wrap"
            >
            <el-form-item label="运费" style="margin-top:20px">
            <div style="display:flex">
            <el-input v-model="OrderInformation.freight" placeholder="请输入货物名称"></el-input>
            <span style="padding-left:10px">元</span>
            </div>
            </el-form-item>

            <el-form-item label="结算方式" style="margin-top:20px">
            <el-select v-model="OrderInformation.settlementMethod" placeholder="请选择">
            <el-option label="自主结算" value="自主结算"></el-option>
            </el-select>
            </el-form-item>
            </el-col>
            </el-row>
          </Title>

          <Title :title="'指派信息'">
            <el-row
            type="flex"
            style="display:flex; justify-content: flex-start;flex-wrap: wrap"
            >
            <el-col :xs="24" :sm="15" :md="15" :lg="9">
            <el-form-item>
            <div style="display:flex; justify-content: space-between;flex-wrap: wrap">
            <el-input
            v-model="OrderInformation.user"
            placeholder="请输入货物名称"
            style="width:264px;"
            ></el-input>
            <el-button type="primary" style="margin-left:20px" @click="search">查找</el-button>
            </div>
            </el-form-item>
            </el-col>
            <!-- 已选择的司机 -->
            <el-col :xs="24" :sm="9" :md="9" :lg="7">
            <transition name="list" mode="out-in">
            <el-form-item v-if="selectTag">
            <div style="display:flex;">
            <span v-if="tips" style="width:100px">已选择：</span>
            <div style="display:flex;align-items: center;flex-wrap: wrap;">
            <el-tag
            v-for="item in OrderInformation.licensePlate"
            :key="item"
            type="info"
            effect="plain"
            closable
            @close="handleClose(item)"
            style="margin:5px 10px"
            >{{ item }}</el-tag>
            </div>
            </div>
            </el-form-item>
            </transition>
            </el-col>
            </el-row>
            <!-- 查找司机 -->
            <el-row>
            <el-col>
            <transition name="list" mode="out-in">
            <div v-if="dirver">
            <div class="search-driver">
            <div class="serach-driver-div" style="margin-left:20px">
            <div class="search-deriver-headimg"></div>
            <div>
            <p style="margin-top:7px">司机姓名：张大宝</p>
            <p style="margin-bottom:7px">车牌号码：贵DA8888</p>
            </div>
            <div :style="{color:state(1)}">空闲</div>
            </div>
            <el-button
            type="primary"
            style="margin-left:20px"
            plain
            @click="selectDriver"
            >选择</el-button>
            </div>
            </div>
            </transition>
            </el-col>
            </el-row>
          </Title>

          <Title :title="'备注'" :title-state="1" :divder="true" :footer="true">
            <el-row>
            <el-col :xs="20" :sm="5" :md="5" :lg="5">
            <el-form-item style="margin:12px 0">
            <el-input
            type="textarea"
            v-model="OrderInformation.remarks"
            style="margin:0 0 10px 30px"
            ></el-input>
            </el-form-item>
            </el-col>
            </el-row>
          </Title>
          <el-form-item style="margin:0" class="Release-div">
            <el-button type="primary" style="width:160px" @click="IssueOrder('form')">确认发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Title from './components/title';
export default {
  name: 'CreateOrder',

  components: {
    Title
  },
  data() {
    return {
      OrderInformation: {
        // 货物信息
        goodsName: '',
        goodsType: 'pc32.5',
        weight: '',
        unit: '吨',
        // 收货人信息
        name: '',
        loadingAddress: '',
        receivingAddress: '',
        phone: '',
        loadingDetailedAddress: '',
        receivingDetailedAddress: '',
        // 时间要求
        loadingTime: '',
        receivingTime: '',
        // 运输信息
        handlingRequirements: '一装一卸',
        orderMode: '一单一运',
        receipt: '需要',
        freight: 0,
        settlementMethod: '自主结算',
        // 指派司机
        user: '',
        licensePlate: [
          '贵A22343',
          '贵A22344'
        ],
        // 备注
        remarks: ''
      },
      // 验证
      rules: {
        goodsName: [
          { required: true, message: '请输入货物名称', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入货物重量', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        loadingAddress: [
          { required: true, message: '请选择装货地址', trigger: 'blur' }
        ],
        receivingAddress: [
          { required: true, message: '请选择收货地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入收货人电话', trigger: 'blur' }
        ],
        loadingDetailedAddress: [
          { required: true, message: '请输入详细信息', trigger: 'blur' }
        ],
        receivingDetailedAddress: [
          { required: true, message: '请输入详细信息', trigger: 'blur' }
        ],
        loadingTime: [
          { required: true, message: '请选择装货时间', trigger: 'blur' }
        ],
        receivingTime: [
          { required: true, message: '请选择收货时间', trigger: 'blur' }
        ],
        user: [{ required: true, message: '请输入信息', trigger: 'blur' }],
        licensePlate: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ]
      },

      dirver: false,
      selectTag: false,
      num: 1
    };
  },
  computed: {
    tips() {
      if (
        this.OrderInformation.licensePlate &&
        this.OrderInformation.licensePlate.length > 0
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    handleClose(item) {
      this.OrderInformation.licensePlate.splice(
        this.OrderInformation.licensePlate.indexOf(item),
        1
      );
    },
    search() {
      this.dirver = true;
    },
    selectDriver() {
      this.selectTag = true;
      this.dirver = false;
      this.num = this.num + 1;
      var arr = this.OrderInformation.licensePlate;
      const label = '贵A12343';
      let mark = true;
      arr.forEach(item => {
        if (!!item && item === label) {
          return (mark = false);
        } else {
          mark = true;
        }
      });
      if (mark === true) {
        this.OrderInformation.licensePlate.push(label);
      } else {
        console.log('mark', mark);
        this.$message.error('重复添加了');
      }
    },
    state(state) {
      switch (state) {
        case 1:
          return '#80D847';
          break;
        case 2:
          return 'red';
          break;
        default:
          return '#ccc';
          break;
      }
    },
    // 发布订单
    IssueOrder(formName) {
      console.log('this.OrderInformation', this.OrderInformation);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

