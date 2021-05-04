<template>
  <div class="task-wrapper">
    <div class="task-search search-bar">
      <el-row class="search-item">
        <el-col :span="8">
          店铺名称
          <el-input
            v-model="query.storeName"
            size="medium"
            placeholder="请填写店铺名称"
          ></el-input>
        </el-col>
        <el-col :span="8">
          订单状态
          <el-select v-model="query.status" size="medium">
            <el-option v-for="i in Object.keys($options.taskStatus)"
                       :value="i"
                       placeholder="请选择订单状态"
                       :label="$options.taskStatus[i]">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          产品编号
          <el-input
            size="medium"
            v-model="query.itemcode"
            placeholder="请填写产品编号"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="8">
          订单编号
          <el-input v-model="query.taskId"
                    size="medium"
                    placeholder="请填订单号">
          </el-input>
        </el-col>
        <el-col :span="10">
          日期时间
          <el-date-picker
            size="medium"
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
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态">
        </el-table-column>
        <el-table-column prop="createdAt" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="operation" @click="handleViewDetail(scope.row)">
              详情
            </el-button>
            <el-button type="primary" size="mini" class="operation" @click="handleReceive(scope.row)">领取</el-button>
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
import { taskList, receiveTask } from '@/api/task'

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
      list: [{}],
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
      this.$router.push({ path: '/taskDetail/index', query: { id: item.id }})
    },
    handleReceive(item) {
      this.$confirm('确定领取本条任务 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        receiveTask(item.id)
      })
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
  padding: 20px 20px;
  .task-search {
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
  .getTaskList {
    float: right;
  }
}

</style>
