<template>
  <div class="task-detail">
    <div v-if="loading" style="height: 200px;display: flex;justify-content: center;align-items: center">
      <div v-loading="true"></div>
    </div>
    <el-form v-else>
      <el-row :gutter="40">
        <el-col :span="12">
          <div class="form-label">任务信息</div>
          <div class="form-detail-block">
            <div>任务名称：{{detail.xssTaskVO.taskId}}</div>
            <div>任务备注：{{detail.xssTaskVO.remark || '暂无'}}</div>
            <div>任务要求：{{detail.xssTaskVO.orderMsgReq || '暂无'}}</div>
          </div>
          <div class="form-label">商品信息</div>
          <div class="form-detail-block">
            <div>商品链接：{{detail.xssTaskProductVO.productUrl}}</div>
            <div>商品数量：{{detail.xssTaskProductVO.productCount}}</div>
            <div>商品店铺名称：{{detail.xssTaskProductVO.storeName}}</div>
            <div>商品成交价：{{detail.xssTaskProductVO.transactionPrice}}</div>
            <div>商品规格：{{detail.xssTaskProductVO.productVariant || '暂无'}}</div>
          </div>
          <div class="form-label">下单要求</div>
          <div class="form-detail-block">
            <div>订单来源：{{detail.xssTaskDetailVO.taskTerminal | originFilter}}</div>
            <div>来路要求：{{$options.taskOriginRules[detail.xssTaskDetailVO.routeReq] || '未知'}}</div>
            <div>买手国家：{{detail.xssTaskDetailVO.buyerCountry | countryFilter}}</div>
            <div>是否要求改价：{{detail.xssTaskDetailVO.isChangePrice | priceFilter}}</div>
            <div>刷单要求信息：{{detail.xssTaskDetailVO.orderMsgReq || '暂无'}}</div>
            <div>来路要求详情：{{detail.xssTaskDetailVO.requirements || '暂无'}}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="form-label">确认收货与评论要求</div>
          <div class="form-detail-block">
            <div>确认收货天数：{{detail.xssTaskDetailVO.confirmDeliveredDays}}</div>
            <div>评论要求：{{detail.xssTaskDetailVO.reviewType | commentFilter}}</div>
            <div>评论星级：{{detail.xssTaskDetailVO.reviewStar | starFilter}}</div>
            <div>收藏要求：{{detail.xssTaskDetailVO.collectionRequire | collectionFilter}}</div>
          </div>
          <div class="form-label">费用清单</div>
          <div class="form-detail-block">
            <div>总成交价：{{detail.xssTaskCostVO.totalAmount}}</div>
            <div>总佣金：{{detail.xssTaskCostVO.commission}}</div>
          </div>
          <div class="form-label">任务状态</div>
          <div class="form-detail-block">
            <div>发布时间：{{detail.xssTaskVO.createdAt}}</div>
          </div>
          <div class="form-label">执行进度</div>
          <div class="form-detail-block">
            <div>更新时间：{{detail.xssTaskVO.updatedAt}}</div>
            <div>任务状态：{{$options.taskStatus[detail.xssTaskVO.taskStatus]}}</div>
            <div>买手下单ID：{{detail.xssTaskVO.buyerId || '暂无'}}</div>
            <div>买手订单号：{{detail.xssTaskVO.buyerOrderNo || '暂无'}}</div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {taskOrigins, taskOriginRules, countries, changePrices, commentRequire, stars, collections, taskStatus} from '../../utils/const'
export default {
  name: 'detail',
  taskOriginRules,
  taskStatus,
  props: {
    detail: {
      type: Object,
      default: () => {
        return {
          xssTaskCostVO: {},
          xssTaskDetailVO: {},
          xssTaskProductVO: {},
          xssTaskVO: {},
          isDefault: true
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    originFilter(val) {
      let tmp = '未知'
      Object.entries(taskOrigins).map(item => {
        if(item[1] === val) {
          tmp = item[0]
        }
      })
      return tmp
    },
    countryFilter(val) {
      let tmp = '未知'
      Object.entries(countries).map(item => {
        if(item[1] == val) {
          tmp = item[0]
        }
      })
      return tmp
    },
    priceFilter(val) {
      let tmp = '未知'
      Object.entries(changePrices).map(item => {
        if(item[1] == val) {
          tmp = item[0]
        }
      })
      return tmp
    },
    commentFilter(val) {
      let tmp = '未知'
      Object.entries(commentRequire).map(item => {
        if(item[1] == val) {
          tmp = item[0]
        }
      })
      return tmp
    },
    starFilter(val) {
      let tmp = '未知'
      Object.entries(stars).map(item => {
        if(item[1] == val) {
          tmp = item[0]
        }
      })
      return tmp
    },
    collectionFilter(val) {
      let tmp = '未知'
      Object.entries(collections).map(item => {
        if(item[1] == val) {
          tmp = item[0]
        }
      })
      return tmp
    }
  }
}
</script>

<style scoped lang="scss">
.task-detail {
  font-size: 14px;
  line-height: 28px;
  .form-label {
    color: #1890ff;
  }
  .form-detail-block {
    margin-top: 5px;
    margin-bottom: 10px;
  }
}
</style>
