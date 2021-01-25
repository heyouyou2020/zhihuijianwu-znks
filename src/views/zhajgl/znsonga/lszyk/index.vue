<template>
  <div class="dashboard-container">
    <div class=" clearfix">
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
          <el-form-item label="签约检察院">
            <el-cascader
              v-model="value"
              :options="options"
              :props="props"
              :show-all-levels="false"
              clearable>
            </el-cascader>
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
          <el-form-item>
            <input
              id=""
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
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="handleClickLook(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDle(scope.row)">删除</el-button>
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
      bianGenInfo: {
        czrymc: '',
        bgrq: '',
        optContent: '',
      },
      jianchayuanList: [],
      options: [],
      value: '',
      props:{
        multiple: false,
        checkStrictly: true ,
        emitPath: false,
        label: 'name',
        value: 'id',
        children: 'children'
      },
      form: {
        name: '',
        ajmc: '',
      },
      // tableData: [],
      listQuery: {
        page: 1,
        pageSize: 10,
        keyWord: ''
      },
      tableHeader: [
        { filed: 'realName', title: '律师姓名', colorB: 'colorB', width: '200' },
        { filed: 'procuratorateName', title: '签约检察院' },
        { filed: 'idcardNum', title: '身份证号码' },
        { filed: 'professionNum', title: '执业证号' },
      ],
      tableData: [
      ],
      listLoading: false,
      total: 100
    }
  },
  watch: {
    value(newValue, oldValue) {
      let that = this
      this.options.find(item => {
        if (item.id == newValue) {
          that.$api.getjianchanyuanChildren(item.id).then(res => {
            if (res.code === 0) {
              that.$set(item, 'children', res.data)
            }
          })
        }else {
          if (item.children) {
            that.$options.methods.finditem(item.children,newValue,that)
          }
        }
      }) 
    },
  },
  created() {
    this.$api.getjianchanyuanLIst().then(res => {
      if (res.code === 0) {
        this.options = res.data
      }
    })
    this.listLoading = true
    this.$api.getjianchanlvshi({
        name: this.form.name,
        procuratorateId: this.form.ajmc,
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
            this.tableData = []
            this.$message.warning('暂无数据哦')
            this.listLoading = false
          }
        }else {
          this.$message.error('获取列表失败')
          this.listLoading = false
        }
      })
  },
  mounted() {
    // this.getList()
  },
  methods: {
    // 搜索律师资源接口
    handleFilter() {
      this.listLoading = true
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.$api.getjianchanlvshi({
        name: this.form.name,
        procuratorateId: this.form.ajmc,
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
            this.tableData = []
            this.$message.warning('暂无数据哦')
            this.listLoading = false
          }
        }else {
          this.$message.error('获取列表失败')
          this.listLoading = false
        }
      })
    },
    getList() {
      this.listLoading = false
    },
    handleClick(row) {
      this.$router.push({
        name: 'watch',
        params: {
          id: row.id
        }
      })
    },
    handleDle(row) {
      this.$confirm('你是否确认删除选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-manage',
        type: 'warning'
      }).then(() => {
      })
    },
    finditem(list,id,that) {
      list.find(item => {
        if (item.id == id) {
          if (item.hasChildren == 1) {
            that.$api.getjianchanyuanChildren(item.id).then(res => {
              if (res.code === 0) {
                that.$set(item, 'children', res.data)
              }
            })
          }  
        }else {
          if (item.children) {
            that.$options.methods.finditem(item.children,id,that)
          }
        }
      })
    },
    handleClickLook(row) {
      this.$router.push({
        name: 'change',
        params: {
          id: row.id
        }
      })
    },
    handleAdd() {
      this.$router.push({
        name: 'add',
      })
    },
    refresh(val) {
      this.listLoading = true
      this.$api.getjianchanlvshi({
        name: this.form.name,
        procuratorateId: this.form.ajmc,
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
            this.tableData = []
            this.$message.warning('暂无数据哦')
            this.listLoading = false
          }
        }else {
          this.$message.error('获取列表失败')
          this.listLoading = false
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
  input{
    outline: none;
}
.popup{
      width: 100%;
      display: flex;
      height: 400px;
      justify-content: space-around;
      .left{
          width: 35%;
          height: 100%;
          .selecter{
              width: 100%;
              margin: 20px 0;
              div{
                  margin-bottom: 20px;
              }
          }
      }
      .right{
          width: 30%;
          height: 100%;
          .zhanshi{
            width: 100%;
            height: 80%;
            margin-top: 20px;
            ul{
                width: 100%;
                height: 100%;
                overflow: scroll;
              li{
                width: 100%;;
                margin-bottom: 20px;
                display: flex;
                justify-content:space-between;
                align-content: center;
              }
            }
          }
      }
  }
</style>
