<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <!-- 头部搜索start-->
      <div class="filter-container">
        <el-form class="base-search-form" :model="form" :inline="true">
          <el-form-item label="标题">
            <el-input
              v-model="form.name"
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
          <el-form-item label="状态">
            <el-select v-model="form.state" placeholder="请选择">
              <el-option label="已发布" value="1" />
              <el-option label="草稿" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <input
              id=""
              class="input-item"
              type="submit"
              name=""
              value="重置"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="chongzhi"
            >
            <input
              id=""
              class="input-item"
              type="submit"
              name=""
              value="查询"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="handleFilter"
            >
            <input
              id=""
              class="input-item"
              type="submit"
              name=""
              value="新增"
              style="width:98px;height:32px;border:none;background:#1890ff;color:white;"
              @click="handleAdd"
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
            <el-button type="text" size="small" @click="handleSee(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="handleChange(scope.row)">修改</el-button>
            <el-button  v-show="scope.row.state == '草稿'" type="text" size="small" @click="handleSend(scope.row)">发布</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
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
        state: '',
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
        { filed: 'title', title: '标题', colorB: 'colorB', width: '200' },
        { filed: 'updateTime', title: '咨询时间' },
        { filed: 'typeName', title: '栏目' },
        { filed: 'state', title: '状态' },
      ],
      tableData: [
      ],
      listLoading: false,
      total: 0
    }
  },
  created() {
  },
  mounted() {
    this.listLoading = true
    this.$api.getgonggao({
      title: this.form.name,
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      state: this.form.state,
      pageNum: 1,
      pageSize: 10,
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        if (res.data) {
          this.tableData = res.data.pageList
          this.tableData.map(item => {
            if (item.state == 1) {
              item.state = '已发布'
            }
            if (item.state == 0) {
              item.state = '草稿'
            }
          })
          this.total = res.data.total
          this.listLoading = false
        }else {
          this.$message.warning('暂无数据哦')
          this.listLoading = false
          this.tableData = []
        }
      }else{
          his.$message.error('获取数据失败')
      }
    })
  },
  methods: {
    chongzhi() {
      this.form.name = ''
      this.form.state = ''
      this.form.time = ['', '']
    },
    handleFilter() {
      this.listQuery.pageSize = 10
      this.listQuery.page = 1
      this.listLoading = true
      this.$api.getgonggao({
        title: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        state: this.form.state,
        pageNum: 1,
        pageSize: 10,
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.pageList
            this.tableData.map(item => {
              if (item.state == 1) {
                item.state = '已发布'
              }
              if (item.state == 0) {
                item.state = '草稿'
              }
            })
            this.total = res.data.total
            this.listLoading = false
          }else {
            this.$message.warning('暂无数据哦')
            this.listLoading = false
            this.tableData = []
          }
        }else{
          this.$message.error('获取数据失败')
        }
      })
    },
    handleAdd() {
      this.$router.push({
        name: 'xxtj'
      })
    },
    getList() {
      this.listLoading = false
    },
    handleSee(row) {
      this.$router.push({
        name: 'chakan',
        params: {
          id: row.id
        }
      })
    },
    handleChange(row) {
      this.$router.push({
        name: 'xiugai',
        params: {
          id: row.id
        }
      })
    },
    handleDel(row) {
      this.$confirm('你是否确认删除选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-manage',
        type: 'warning'
      }).then(() => {
        this.$api.chanchu(row.id).then(res => {
          if (res.code === 0) {
            const index = this.tableData.findIndex(item => item.id === row.id)
            this.tableData.splice(index, 1)
            this.$message.success('删除成功')
          }else{
            this.$message.error('删除失败')
          }
        })
      })
    },
    handleSend(row) {
      this.$confirm('你是否确认发布选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-manage',
        type: 'warning'
      }).then(() => {
        this.$api.xiugai(row.id,{ state: '1' }).then(res => {
          if (res.code === 0) {
            this.$message.success('发布成功')
            row.state = '已发布'
          }else{
            this.$message.error('发布失败')
          }
        })
      })
    },
    refresh(val) {
      this.listLoading = true
      this.$api.getgonggao({
        title: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        state: this.form.state,
        pageNum: val.page,
        pageSize: val.limit,
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.pageList
            this.tableData.map(item => {
              if (item.state == 1) {
                item.state = '已发布'
              }
              if (item.state == 0) {
                item.state = '草稿'
              }
            })
            this.total = res.data.total
            this.listLoading = false
          }else {
            this.$message.warning('暂无数据哦')
            this.listLoading = false
            this.tableData = []
          }
        }else{
          this.$message.error('获取数据失败')
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

