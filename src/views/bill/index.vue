<template>
  <div class="bill-wrapper">
    <div class="bill-search">
      <el-row class="search-item">
        <el-col :span="7">
          充值状态&nbsp;
          <el-select v-model="query.isConfirm">
            <el-option v-for="i in Object.keys($options.confirmStatus)"
                       :label="i"
                       placeholder="请选择充值状态"
                       :value="$options.confirmStatus[i]">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          付款账号
          <el-input
            v-model="query.paymentAccount"
            size="medium"
            placeholder="请填写付款账号"
          ></el-input>
        </el-col>
        <el-col :span="7">
          付款订单号
          <el-input
            v-model="query.paymentOrderNo"
            size="medium"
            placeholder="请填写付款订单号"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getList">查询</el-button>
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
          <template slot-scope="scope">
            {{scope.row.isConfirm | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="审核时间">
          <template slot-scope="scope">
            {{scope.row.updatedAt | converTime}}
          </template>
        </el-table-column>
        <el-table-column prop="taskId" label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.isConfirm === 0">
              <el-button size="mini" type="primary" class="operation" @click="handleAgree(scope.row)">
                通过
              </el-button>
              <el-button size="mini" class="operation" @click="handleDisagree(scope.row)">
                拒绝
              </el-button>
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
import { rechargeList, agree, disagree } from '@/api/bill'

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
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      rechargeList(this.query).then(res => {
        this.list = res.data || []
        this.total = res.count || 0
      }).finally(_ => {
        this.loading = false
      })
    },
    handleDisagree(item) {
      this.$confirm('确定拒绝本次审核 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await disagree(item.id)
        this.getList()
      })
    },
    handleAgree(item) {
      this.$confirm('确定通过本次审核 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await agree(item.id)
        this.getList()
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
    },
    handleCurrentChange(val) {
      this.query.page = val
    }
  },
  filters: {
    statusFilter(status) {
      let msg = '未知'
      Object.entries(confirmStatus).map(item => {
        if(item[1] === status) {
          msg = item[0]
        }
      })
      return msg
    }
  }
}
</script>

<style lang="scss" scoped>
.bill-wrapper {
  padding: 20px 20px;
  .bill-search {
    color: #2c3e50;
    font-size: 14px;
    .search-item {
      margin-bottom: 20px;
      .el-input, .el-select {
        width: 260px;
        height: 36px;
      }
      .el-button {
        width: 120px;
        border-radius: 2px;
        padding: 9px 15px;
      }
    }
  }
  .operation {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>
