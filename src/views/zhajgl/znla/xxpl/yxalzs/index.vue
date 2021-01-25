<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <!-- 头部搜索start-->
      <div class="filter-container">
        <el-form class="base-search-form" :model="form" :inline="true">
          <el-form-item label="标题">
            <el-input
              v-model="form.title"
              placeholder="请输入标题"
              clearable
            />
          </el-form-item>
           <el-form-item label="日期时间">
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
          sortable
          :show-overflow-tooltip="true"
          :cell-class-name="item.colorB"
        />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          </template>
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
      form: {
        title: '',
        time: ['', '']
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        keyWord: ''
      },
      infoPushVisible: false,
      tableHeader: [
        { filed: 'title', title: '标题', colorB: 'colorB', width: '200' },
        { filed: 'updateTime', title: '创建时间' },
      ],
      tableData: [
      ],
      listLoading: false,
      total: 0
    }
  },
  created() {
    //this.getTime()
  },
  mounted() {
    //this.getList()
    this.listLoading = true
    this.$api.getlvshianlizhanshi({
      title: this.form.title,
      startTime: this.form.time[0],
      endTime: this.form.time[1],
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
            this.tableData = []
            this.listLoading = false
          }
        }else {
          this.$message.error('获取列表失败')
        } 
      })
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.$api.getlvshianlizhanshi({
        title: this.form.title,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
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
      })
    },
    chongzhi() {
      this.form.title = ''
      this.form.time = ['', '']
    },
    getList() {
      this.listLoading = false
    },
    handleClick(row) {
      this.$router.push({
        name: 'yxalzsxq',
        params: {
          id: row.id
        }
        
      })
    },
    refresh(val) {
      this.listLoading = true
      this.$api.getlvshianlizhanshi({
        title: this.form.title,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        pageNum: val.page,
        pageSize: val.limit,
      }).then(res => {
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.total
            this.total = rea.data.pageList
            this.listLoading = false
          }else {
            this.$message.warning('暂无数据哦')
            this.tableData = []
            this.listLoading = false
          }
        }else {
          this.$message.error('获取列表失败')
        } 
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
