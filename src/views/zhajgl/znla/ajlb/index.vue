<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <!-- 头部搜索start-->
      <div class="filter-container">
        <el-form class="base-search-form" :model="form" :inline="true">
          <el-form-item label="受理开始时间">
            <el-date-picker
              v-model="form.start"
              type="month"
              placeholder="开始时间"
              format="yyyy-MM"
              value-format="yyyy-MM"
              required
              style="width: 140px;"
            />
          </el-form-item>
          <el-form-item label="受理结束时间">
            <el-date-picker
              v-model="form.end"
              required
              type="month"
              placeholder="结束时间"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width: 140px"
            />
          </el-form-item>
          <el-form-item label="案件名称">
            <el-select v-model="form.ajmc" placeholder="请选择">
              <el-option label="2" value="180" />
            </el-select>
          </el-form-item>
          <el-form-item label="部门受案号">
            <el-select v-model="form.bmsah" placeholder="请选择">
              <el-option label="2" value="180" />
            </el-select>
          </el-form-item>
          <el-form-item label="案件类别">
            <el-select v-model="form.ajlbbm" placeholder="请选择">
              <el-option v-for="(item,index) in anjianinfo" :key="index" :label="item.ajlbmc" :value="item.ajlbbm" />
            </el-select>
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
            <el-button type="text" size="small" @click="handleClick(scope.row)">变更详情</el-button>
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
    <el-dialog
      class="base-dialog"
      title="变更详情"
      :visible.sync="infoPushVisible"
      top="34vh"
      width="500px"
      @close="closeInfoPush"
    >
      <table>
        <tr>
          <td>受理人</td>
          <td>{{ bianGenInfo.czrymc }}</td>
        </tr>
        <tr>
          <td>变更日期</td>
          <td>{{ bianGenInfo.bgrq }}</td>
        </tr>
        <tr>
          <td>变更内容</td>
          <td>{{ bianGenInfo.optContent }}</td>
        </tr>
      </table>
      <div slot="footer">
        <el-button @click="closeInfoPush">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index'
export default {
  name: 'ReviewArrest',
  components: { Pagination },
  data() {
    return {
      anjianinfo: [],
      infoPushVisible: false,
      bianGenInfo: {
        czrymc: '',
        bgrq: '',
        optContent: '',
      },
      form: {
        ajmc: '',
        bmsah: '',
        ajlbbm: '',
        start: '',
        end: ''
      },
      // tableData: [],
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        keyWord: ''
      },
      tableHeader: [
        { filed: 'ajlbmc', title: '案件名称', colorB: 'colorB', width: '200' },
        { filed: 'ajmc', title: '案件类别' },
        { filed: 'bljd', title: '公开情况' },
        { filed: 'bmsah', title: '流程阶段' },
        { filed: 'slrq', title: '受理日期' },
        { filed: 'cqrq', title: '到期日期' },
        { filed: 'sjrq', title: '审结日期' },
        { filed: 'sfgk', title: '部门受案号' },
      ],
      tableData: [
      ],
      listLoading: true,
      total: 100
    }
  },
  created() {
    this.getTime()
    this.$api.getLunAnajlb()
      .then(res => {
        this.anjianinfo = res.data
        console.log(this.anjianinfo)
      })
  },
  mounted() {
    this.getList()
  },
  methods: {
    closeInfoPush() {
      this.infoPushVisible = false
    },
    handleFilter() {
      if (this.form.start === '' || this.form.end === '') {
        alert('请输入要查询的时间日期区间')
        return false
      }
      if (this.form.ajlbbm === '') {
        alert('请输入要查询的案件类别')
        return false
      }
      this.$api.getLunAnList({ start: this.form.start, end: this.form.end })
        .then(res => {
          this.total = res.data.count
          console.log(res)
          this.tableData = res.data.records
        })
        .catch(err => {
          console.log(err)
        })
      // this.$api.getLunAnajlb({ start: this.form.start, end: this.form.end, })
      //   .then(res => {
      //     console.log(res)
      //     this.tableData = res.data.records
      //     this.curret = false
      //   })
    },
    getList() {
      this.listLoading = false
    },
    handleClick(row) {
      this.infoPushVisible = true
      this.$api.getLunAnbianGen({
        bmsah: '汉东检行监[2020]980000000001号'
      })
        .then(res => {
          console.log(res)
          console.log(row.sfgk)
          this.bianGenInfo = res.data[0]
        })
    },
    refresh(val) {
      this.$api.getLunAnList({
        start: this.form.start, end: this.form.end, pageNum: val.page
      })
        .then(res => {
          this.tableData = res.data.records
          console.log(res)
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
