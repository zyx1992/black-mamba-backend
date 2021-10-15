<template>
  <div class="task-wrapper">
    <div class="task-search search-bar">
      <el-row class="search-item">
        <el-col :span="8">
          店铺名称
          <el-input
            v-model="query.storeName"
            size="medium"
            clearable
            @clear="getTaskList"
            @keyup.enter.native="getTaskList"
            placeholder="请填写店铺名称"
          ></el-input>
        </el-col>
        <el-col :span="8">
          订单状态
          <el-select v-model="query.taskStatus"
                     size="medium"
                     placeholder="请选择订单状态"
                     clearable
                     @change="getTaskList"
                     @clear="getTaskList"
          >
            <el-option v-for="i in Object.keys($options.taskStatus)"
                       :value="i"
                       placeholder="请选择订单状态"
                       :label="$options.taskStatus[i]"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          产品编号
          <el-input
            size="medium"
            clearable
            @clear="getTaskList"
            @keyup.enter.native="getTaskList"
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
                    clearable
                    @clear="getTaskList"
                    @keyup.enter.native="getTaskList"
                    placeholder="请填订单号"
          >
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
            @change="timeChange"
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
      <el-table v-loading="loading.table"
                empty-text="暂无数据"
                :data="list"
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @expand-change="handleViewDetail"
                border
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <detail :detail="detailData" :loading="loading.detail"></detail>
          </template>
        </el-table-column>
        <el-table-column prop="taskId" label="任务ID"></el-table-column>
        <el-table-column prop="taskCount" label="任务数量"></el-table-column>
        <el-table-column prop="storeName" label="店铺名称"></el-table-column>
        <el-table-column prop="totalAmount" label="任务费用"></el-table-column>
        <el-table-column prop="routeReq" label="任务要求">
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态">
          <template slot-scope="scope">
            {{ $options.taskStatus[scope.row.taskStatus] || '未知' }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.taskStatus == 101" type="primary" size="mini" class="operation"
                       @click="handleReceive(scope.row)"
            >领取
            </el-button>
            <el-button v-else type="success" size="mini" class="operation" @click="handleChangeTask(scope.row)">状态变更
            </el-button>
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
    <el-dialog
      v-if="dialogVisible"
      title="任务状态变更"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div class="dialog-status-block">
        <el-form ref="taskForm" class="dialog-status-form" :model="task" :rules="rules" label-position="left"
                 label-width="120px"
        >
          <el-form-item label="任务变更状态" prop="taskStatus">
            <el-select v-model="task.taskStatus">
              <el-option v-for="key in Object.keys($options.taskStatus)"
                         :value="key"
                         :disabled="activeRow.taskStatus == key"
                         :label="$options.taskStatus[key]"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台买手订单号" prop="buyerOrderNo">
            <el-input v-model="task.buyerOrderNo"></el-input>
          </el-form-item>
          <el-form-item label="平台买手ID">
            <el-input v-model="task.buyerId"></el-input>
          </el-form-item>
          <el-form-item label="任务备注">
            <el-input type="textarea" v-model="task.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleChangeStatus" :loading="loading.status">变更</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { taskStatus } from '@/utils/const'
import { taskList, receiveTask, taskDetail, changeTaskStatus } from '@/api/task'
import Detail from './detail'

export default {
  name: 'index',
  taskStatus,
  components: {
    Detail
  },
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
      task: {
        buyerOrderNo: '',
        taskId: null,
        taskStatus: '',
        buyerId: '',
        remark: ''
      },
      activeRow: {},
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.query.beginTime = minDate
          this.query.endTime = maxDate
        }
      },
      list: [],
      total: 0,
      detailData: {},
      getRowKeys(row) {
        return row.taskId
      },
      expands: [],
      loading: {
        table: false,
        detail: false,
        status: false,
        receive: false
      },
      dialogVisible: false,
      rules: {
        buyerOrderNo: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入平台买手订单号'
          }
        ],
        taskStatus: [
          {
            required: true,
            trigger: 'blur',
            message: '请选择变更状态'
          }
        ]
      }
    }
  },
  methods: {
    getTaskList() {
      this.loading.table = true
      taskList(this.query).then(res => {
        this.list = res.data || []
        this.total = res.count || 0
      }).finally(_ => {
        this.loading.table = false
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
    },
    handleCurrentChange(val) {
      this.query.page = val
    },
    async handleViewDetail(row, expandedRows) {
      if (expandedRows.length) {
        this.expands = []
        this.expands.push(row.taskId)
      } else {
        this.expands = []
      }
      let id = row.taskId || ''
      if (!id) return
      await this.handleGetDetail(id, row)
    },
    handleGetDetail(id) {
      this.loading.detail = true
      taskDetail(id)
        .then((res) => {
          this.detailData = res.data || {}
        }).finally(_ => {
        this.loading.detail = false
      })
    },
    handleReceive(item) {
      this.$confirm('确定领取本条任务 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.loading.receive = true
        await receiveTask(item.taskId)
        this.$message.success('领取任务成功')
        this.getTaskList()
        this.loading.receive = false
      })
    },
    timeChange(val) {
      if (!val) {
        this.query.beginTime = ''
        this.query.endTime = ''
      }
      this.getTaskList()
    },
    handleChangeTask(row) {
      this.dialogVisible = true
      this.activeRow = row
    },
    handleClose() {
      this.dialogVisible = false
      this.activeRow = {}
      this.task = {
        buyerOrderNo: '',
        taskId: null,
        taskStatus: '',
        buyerId: '',
        remark: ''
      }
    },
    handleChangeStatus() {
      this.$refs.taskForm.validate(async(valid) => {
        if (valid) {
          this.loading.status = true
          let params = Object.assign({}, this.task)
          params.taskId = this.activeRow.taskId
          params.taskStatus = Number(params.taskStatus)
          changeTaskStatus(params).then(res => {
            this.$message.success('任务状态变更成功')
            this.handleClose()
            this.getTaskList()
          }).finally(_ => {
            this.loading.status = false
          })
        }
      })

    }
  },
  mounted() {
    this.getTaskList()
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

.dialog-status-block {
  .dialog-status-form {
    .el-input, .el-textarea, .el-select {
      width: 400px;
      height: 48px;
    }
  }
}
</style>
