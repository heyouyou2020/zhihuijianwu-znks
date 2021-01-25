<template>
  <div>
    <div>
      <!-- 头部搜索start-->
      <div class="filter-container">
        <el-form class="base-search-form" :model="form" :inline="true">
          <el-form-item label="律师姓名">
            <el-input
              v-model="form.name"
              placeholder="请输入姓名"
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
          <el-form-item label="咨询类型">
            <el-select v-model="form.leixing" placeholder="请选择">
              <el-option label="刑事" value="1" />
              <el-option label="民事" value="2" />
              <el-option label="行政" value="3" />
              <el-option label="司法救援" value="4" />
              <el-option label="国家赔偿" value="5" />
              <el-option label="其他" value="6" />
            </el-select>
          </el-form-item>
          <el-form-item label="信息来源">
            <el-select v-model="form.jianchayuan" placeholder="请选择">
              <!-- <el-option label="最高检" value="1" /> -->
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
              class="input-item"
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
      infoPushVisible: false,
      form: {
        jianchayuan: '',
        leixing: '',
        time: [],
        name: '',
      },
      // tableData: [],
      listQuery: {
        page: 1,
        pageSize: 10,
        keyWord: ''
      },
      tableHeader: [
        { filed: 'lawyerName', title: '律师姓名', colorB: 'colorB', width: '200' },
        { filed: 'visitorMobile', title: '手机号码' },
        { filed: 'createTime', title: '咨询时间' },
        { filed: 'visitorName', title: '受访人姓名' },
        { filed: 'typeOptionName', title: '咨询类型' },
        { filed: 'fromProcuratorateName', title: '共享单位名称' },
        { filed: 'targetProcuratorateName', title: '接收单位名称' },
      ],
      tableData: [
      ],
      listLoading: false,
      total: 0
    }
  },
  created() {
    // this.getTime()
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      this.listQuery.pageSize = 10
      this.listQuery.page = 1
      this.$api.Rzwazixun({
        lawyerName: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        optionValue: this.form.leixing,
        fromProcuratorateId: this.form.jianchayuan,
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
        }  
      })
    },
    getList() {
      this.listLoading = false
    },
    chongzhi() {
      this.form.name = ''
      this.form.jianchayuan = ''
      this.form.leixing = ''
      this.form.time = ['', '']
    },
    // handleBack(row) {
    //   this.$confirm('你是否确认接收选中的档案?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     customClass: 'message-manage',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$api.jieshouwlzixun(row.id).then(res => {
    //     console.log(res)
    //     if (res.code === 0) {
    //       this.$message.success('接收成功')
    //     }else {
    //       this.$message.error('接收失败')
    //     }  
    //   })
    //   }) 
    // },
    handleClick(row) {
      this.$router.push({
        name: 'jcwlzxxq',
        params: {
          id: row.consultingId
        }
      })
    },
    refresh(val) {
      this.listLoading = true
      this.$api.Rzwazixun({
        lawyerName: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        optionValue: this.form.leixing,
        fromProcuratorateId: this.form.jianchayuan,
        pageNum: val.page,
        pageSize: val.limit,
    }).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.pageList
            this.total = res.data.total
            this.listLoading = false
          }else {
            this.$message.warning('暂无数据哦')
            thia.tableData = []
            this.listLoading = false
          }
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
<style lang="scss" scoped>
.input-item{
    outline: none;
}
</style>

