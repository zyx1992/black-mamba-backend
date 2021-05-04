<template>
  <div class="task-wrapper">
    <div class="task-search">
      <el-row class="search-item">
        <el-col :span="10">
          店铺名称
          <el-input
            v-model="query.storeName"
            size="medium"
            placeholder="请填写店铺名称"
          ></el-input>
        </el-col>
        <el-col :span="10">
          状态
          <el-select v-model="query.status">
            <el-option v-for="i in Object.keys($options.taskStatus)"
                       :value="i"
                       placeholder="请选择订单状态"
                       :label="$options.taskStatus[i]">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="10">
          产品编号
          <el-input
            v-model="query.itemcode"
            placeholder="请填写产品编号"
          ></el-input>
        </el-col>
        <el-col :span="10">
          订单编号
          <el-input v-model="query.taskId"
                    placeholder="请填订单号">
          </el-input>
        </el-col>
        <el-col :span="10">
          日期时间
          <el-date-picker
            v-model="query.date"
            type="daterange"
            range-separator="至"
            value-format="timestamp"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button class="search-btn" type="primary" @click="getTaskList">
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="task-table">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column prop="taskId" label="任务ID"></el-table-column>
        <el-table-column prop="taskCount" label="任务数量"></el-table-column>
        <el-table-column prop="storeName" label="店铺名称"></el-table-column>
        <el-table-column prop="totalAmount" label="任务费用"></el-table-column>
        <el-table-column prop="routeReq" label="任务要求">
          <template slot-scope="scope">
            {{ $options.taskOriginRules[scope.row.routeReq] }}
          </template>
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态">
          <template slot-scope="scope">
            {{ typeList[scope.row.taskStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operation" @click="handleViewDetail(scope.row)">
              详情
            </div>
            <div class="operation" @click="handleReceive(scope.row)">领取任务</div>
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
import { taskStatus } from '@/utils/const'
import { taskList } from '@/api/task'

export default {
  name: 'index',
  taskStatus,
  data() {
    return {
      query: {
        storeName: '',
        itemcode: '',
        taskId: '',
        taskStatus: '',
        date: '',
        userType: 1,
        limit: 10,
        page: 1,
        beginTime: '',
        endTime: ''

      },
      loading: false,
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.query.beginTime = new Date(minDate).getTime()
          this.query.endTime = new Date(maxDate).getTime()
        }
      },
      list: [],
      total: 0
    }
  },
  methods: {
    getTaskList() {
      this.loading = true
      taskList(this.query).then(res => {
        this.list = res.data || []
        this.total = res.count || 0
      }).finally(_ => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
    },
    handleCurrentChange(val) {
      this.query.page = val
    },
    handleViewDetail(item) {

    },
    handleReceive(item) {

    }
  },
  mounted() {
    // this.getTaskList()
    console.log(this.$options.taskStatus)
  }
}
</script>

<style lang="scss" scoped>
.task-wrapper {
  padding: 20px 10px;
  .task-search {
  }
  .getTaskList {
    float: right;
  }
}

</style>
