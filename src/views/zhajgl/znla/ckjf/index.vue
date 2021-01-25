<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <!-- 头部搜索start-->
      <div class="filter-container">
        <el-form class="base-search-form" :model="form" :inline="true">
          <el-form-item label="信访人姓名">
            <el-input
              v-model="form.name"
              placeholder="请输入姓名"
              clearable
            />
          </el-form-item>
          <el-form-item label="受理时间">
            <el-date-picker
              v-model="form.time"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="信访类型">
            <el-select v-model="form.leibie" placeholder="请选择">
              <el-option label="刑事" value="1" />
              <el-option label="民事" value="2" />
              <el-option label="行政" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.state" placeholder="请选择">
              <el-option label="待接访" value="0" />
              <el-option label="已接访" value="1" />
              <el-option label="已过期" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <input
              id=""
              type="button"
              name=""
              value="重置"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="chongzhi"
            >
          </el-form-item>
          <el-form-item>
            <input
              id=""
              type="submit"
              name=""
              value="查询"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="handleFilter"
            >
          </el-form-item>
        </el-form>
      </div>
      <!--      表格statrt-->
      <el-table
        v-loading="listLoading"
        class="table-hidden-cell"
        :data="tableData"
        stripe
        highlight-current-row
      >
        <el-table-column
          v-for="item in tableHeader"
          :key="item.filed"
          :prop="item.filed"
          :label="item.title"
          :width="item.width"
          sortable
          :show-overflow-tooltip="true"
          :cell-class-name="item.colorB"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button v-show="scope.row.state === '待接访'" type="text" size="small" @click="handlejiefang(scope.row)">接访</el-button>
          </template>T
        </el-table-column>
      </el-table>
      <!-- 分页start-->
      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pageSize"
          @pagination="refresh"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index'
export default {
  name: 'ReviewArrest',
  components: { Pagination },
  data() {
    return {
      infoPushVisible: false,
      listLoading: false,
      form: {
        leibie: '',
        state: '',
        name: '',
        time: ['', ''],
      },
      // tableData: [],
      listQuery: {
        page: 1,
        pageSize: 10,
        keyWord: ''
      },
      tableHeader: [
        { filed: 'visitorName', title: '咨询人姓名', colorB: 'colorB', width: '200' },
        { filed: 'mobile', title: '手机号码' },
        { filed: 'appointmentTime', title: '咨询时间' },
        { filed: 'optionValueName', title: '咨询类型' },
        { filed: 'state', title: '状态' },
      ],
      tableData: [
      ],
      total: 0
    }
  },
  created() {
    // this.getTime()
  },
  mounted() {
    this.listLoading = true
    this.$api.getchuangkouList({
      visitorName: this.form.name,
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      optionValue: this.form.leibie,
      state: this.form.state,
      pageNum: 1,
      pageSize: 10,
    })
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.pageList
            this.total = res.data.total
            this.listLoading = false
          }else {
            this.$message.warning('暂无数据哦')
            this.listLoading = false
            this.tableData = []
          }
        }else {
          this.$message.error('获取列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      this.listQuery.pageSize = 10
      this.listQuery.page = 1
      this.$api.getchuangkouList({
        visitorName: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        optionValue: this.form.leibie,
        state: this.form.state,
        pageNum: 1,
        pageSize: 10,
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.pageList
            this.total = res.data.total
            this.listLoading = false
          }else {
            this.$message.warning('暂无数据哦')
            this.listLoading = false
            this.tableData = []
          }
        }else {
          this.$message.error('获取列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getList() {
      this.listLoading = false
    },
    chongzhi() {
      this.form.time = ['', '']
      this.form.name = ''
      this.form.state = ''
      this.form.leibie = ''
    },
    handleClick(row) {
      this.$router.push({
        name: 'ckjfxq',
        params: {
          id: row.id,
          state: row.state
        }
      })
    },
    handlejiefang(row) {
      this.$api.getchuangkouchange({
        id: row.id
      }).then(res => {
        this.$message.success('接访成功')
      })
    },
    refresh(val) {
      this.listLoading = true
      this.$api.getchuangkouList({
        visitorName: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        optionValue: this.form.leibie,
        state: this.form.state,
        pageNum: 1,
        pageSize: 10,
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.pageList
            this.total = res.data.total
            this.listLoading = false
          }else {
            this.$message.warning('暂无数据哦')
            this.tableData = []
            this.listLoading = false
          }
        }else {
          this.$message.error('获取列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTime() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1
      }
      let mouth = ''
      // 月
      if (date.month < 10) {
        mouth = '0' + date.month
      } else {
        mouth = date.month
      }
      // 日
      // if (date.date < 10) {
      //     day = '0' + date.date
      // } else {
      //     day = date.date
      // }
      this.form.start = date.year - 1 + '-' + mouth
      this.form.end = date.year + '-' + mouth
    }
  }
}
</script>
