<template>
  <div class="bill-wrapper">
    <div class="bill-search">
      <el-row class="search-item">
        <el-col :span="10">
          充值状态
          <el-select v-model="query.isConfirm">
            <el-option v-for="i in Object.keys($options.confirmStatus)"
                       :label="i"
                       placeholder="请选择充值状态"
                       :value="$options.confirmStatus[i]">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          付款账号
          <el-input
            v-model="query.paymentAccount"
            size="medium"
            placeholder="请填写付款账号"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="10">
          付款订单号
          <el-input
            v-model="query.paymentOrderNo"
            size="medium"
            placeholder="请填写付款订单号"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="bill-table">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column prop="username" label="充值人"></el-table-column>
        <el-table-column prop="paymentAccount" label="付款账号"></el-table-column>
        <el-table-column prop="paymentAmount" label="充值金额"></el-table-column>
        <el-table-column prop="paymentOrderNo" label="订单号"></el-table-column>
        <el-table-column prop="isConfirm" label="充值状态">

        </el-table-column>
        <el-table-column prop="updatedAt" label="审核时间"></el-table-column>
        <el-table-column prop="taskId" label="操作">
          <template slot-scope="scope">
            <div class="operation" @click="handleDisagree(scope.row)">
              拒绝
            </div>
            <div class="operation" @click="handleAgree(scope.row)">
              通过
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="query.page"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { confirmStatus } from '@/utils/const'

export default {
  name: 'index',
  confirmStatus,
  data() {
    return {
      query: {
        limit: 10,
        page: 1,
        userType: 1,
        isConfirm: null,
        paymentAccount: '',
        paymentOrderNo: ''
      },
      list: [],
      total: 0,
      loading: false
    }
  },
  methods: {
    getList() {
    },
    handleDisagree() {

    },
    handleAgree() {

    },
    handleSizeChange(val) {
      this.query.limit = val
    },
    handleCurrentChange(val) {
      this.query.page = val
    },
  }
}
</script>

<style scoped>

</style>
