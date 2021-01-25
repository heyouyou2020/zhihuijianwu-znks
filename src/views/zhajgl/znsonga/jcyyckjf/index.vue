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
              <el-option label="举报类" value="1" />
              <el-option label="控告类" value="2" />
              <el-option label="申诉类" value="3" />
              <el-option label="司法救援" value="4" />
              <el-option label="国家赔偿" value="5" />
              <el-option label="民行类" value="6" />
              <el-option label="其他" value="7" />
            </el-select>
          </el-form-item>
          <el-form-item label="信息来源">
            <el-cascader
              v-model="value1"
              :options="options1"
              :props="props1"
              :show-all-levels="false"
              clearable>
            </el-cascader>
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
            <el-button type="text" size="small" @click="handleSee(scope.row)">共享</el-button>
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
      <el-dialog
          v-if="caseShow"
          :show-close="isShowClose"
          class="base-dialog"
          :title="caseTitle"
          :visible.sync="caseVisible"
          top="26vh"
          width="800px"
        >
          <div class="popup">
            <div class="left">
              <span>检察院</span>
              <div class="selecter">
                <el-cascader
                  v-model="value"
                  :options="options"
                  :props="props"
                  clearable>
                </el-cascader>
              </div>
            </div>
            <div class="right">
              <span>此次共享列表</span>
              <div class="zhanshi">
                <ul>
                  <li v-for="(item,index) in checdList" :key="index">
                    <span>{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right">
              <span>已共享列表</span>
              <div class="zhanshi">
                <ul>
                  <li v-for="(item,index) in gongXiangListName" :key="index">
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div slot="footer">
            <el-button type="primary" @click="gongxiang">共享</el-button>
            <el-button type="primary" @click="displayPop">取消</el-button>
          </div>
      </el-dialog>
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
      anjianinfo: [],
      caseVisible: false,
      isShowClose: false,
      caseShow: false,
      infoPushVisible: false,
      xingfangId: '',
      caseTitle: '共享',
      checdList: [],
      gongXiangListName: [],
      value: [],
      options: [],
      props:{
        multiple: true,
        checkStrictly: true ,
        emitPath: false,
        label: 'name',
        value: 'id',
        children: 'children'
      },
      value1: '',
      options1: [],
      props1:{
        multiple: false,
        checkStrictly: true ,
        emitPath: false,
        label: 'name',
        value: 'id',
        children: 'children'
      },
      bianGenInfo: {
        czrymc: '',
        bgrq: '',
        optContent: '',
      },
      form: {
        leixing: '',
        state: '',
        time: ['', ''],
        end: '',
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
        { filed: 'mobile', title: '手机号码' },
        { filed: 'appointmentTime', title: '接访时间' },
        { filed: 'visitorName', title: '信访人姓名' },
        { filed: 'optionValueName', title: '信访类型' },
        { filed: 'procuratorateName', title: '信息来源' },
      ],
      tableData: [
      ],
      listLoading: false,
      total: 0
    }
  },
  created() {
    // this.getTime()
    this.$api.getjianchanyuanLIst().then(res => {
      if (res.code === 0) {
        this.options = res.data
        this.options1 = res.data
      }
    })
  },
  mounted() {
    // this.getList()
    this.listLoading = true
    this.$api.sousuowChuangkouYuYueJieFang({
      visitorName: this.form.name,
      startTime: this.form.time[0],
      endTime: this.form.time[1],
      optionValue: this.form.leixing,
      fromProcuratorateId: this.value1,
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
        this.$message.error('获取数据失败')
        this.listLoading = false
      }
    })
  },
  watch: {
    value(newValue, oldValue) {
      console.log(newValue)
      this.checdList = []
      this.nameList = []
      let that = this
      for (var i = 0; i < newValue.length; i++) {
        var id = newValue[i]
        this.options.find(item => {
          if (item.id == id) {
            that.$api.getjianchanyuanChildren(item.id).then(res => {
              if (res.code === 0) {
                that.checdList.push(item)
                that.$set(item, 'children', res.data)
                console.log(that.checdList)
              }
            })
          }else {
            if (item.children) {
              that.$options.methods.finditem(item.children,id,that)
            }
          }
        })
      }
    },
    value1(newValue, oldValue) {
      let that = this
      this.options1.find(item => {
        if (item.id == newValue) {
          that.$api.getjianchanyuanChildren(item.id).then(res => {
            if (res.code === 0) {
              that.$set(item, 'children', res.data)
            }
          })
        }else {
          if (item.children) {
            that.$options.methods.finditem1(item.children,newValue,that)
          }
        }
      }) 
    },
  },
  methods: {
    finditem(list,id,that) {
      list.find(item => {
        if (item.id == id) {
          that.checdList.push(item)
          if (item.hasChildren == 1) {
            that.$api.getjianchanyuanChildren(item.id).then(res => {
              if (res.code === 0) {
                that.$set(item, 'children', res.data)
                console.log(that.checdList)
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
    finditem1(list,id,that) {
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
            that.$options.methods.finditem1(item.children,id,that)
          }
        }
      })
    },
    // 搜索网络咨询接口
    handleFilter() {
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.listLoading = true
      this.$api.sousuowChuangkouYuYueJieFang({
        visitorName: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        optionValue: this.form.leixing,
        fromProcuratorateId: this.value1,
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
          this.$message.error('获取数据失败')
          this.listLoading = false
        }
      })
    },
    getList() {
      this.listLoading = false
    },
    chongzhi() {
      this.form.name = ''
      this.value1 = ''
      this.form.leixing = ''
      this.form.time = ['', '']
    },
    displayPop() {
      this.caseVisible = false
    },
    gongxiang() {
      const list = []
      list.push(this.xingfangId)
      this.$api.gongxiangwlck({
        list: list,
        procuratorateList: this.value
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('共享成功')
          this.caseVisible = false
          this.value = []
          this.checdList = []
        }else {
          this.$message.error('共享失败')
        }
      })

    },
    handleClick(row) {
      this.$router.push({
        name: 'jcyyckjfxq',
        params: {
          id: row.id
        }
      })
    },
    handleSee(row) {
      this.xingfangId = row.id
      this.caseVisible = true
      this.caseShow = true
    },
    refresh(val) {
      this.listLoading = true
      this.$api.sousuowChuangkouYuYueJieFang({
        visitorName: this.form.name,
        startTime: this.form.time[0],
        endTime: this.form.time[1],
        optionValue: this.form.leixing,
        fromProcuratorateId: this.value1,
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
            this.tableData = []
            this.listLoading = false
          }
        }else {
          this.$message.error('获取数据失败')
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
