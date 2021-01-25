<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="top-item">
        <div class="one-item" v-for="(item, index) in tongjishuju" :key="index">
          <div class="top">
            <span>{{item.count}}</span>
            <span class="red">{{item.yearOnYear}}</span>
            <!-- <span v-show="item.yearOnYear<0" class="green">同比{{item.yearOnYear}}%<i class="el-icon-bottom"></i></span> -->
          </div>
          <div class="bottom">{{item.name}}</div>
        </div>
      </div>
      <div class="daiban">
        <span class="one" />
        <span class="two">代办事项</span>
      </div>
      <div class="juti">
        <span class="one" />
        <span class="two">网络咨询</span>
      </div>
      <div class="biaoge">
        <el-table
          v-loading="listLoading1"
          class="table-hidden-cell"
          :data="tableData1"
          stripe
          highlight-current-row
        >
          <el-table-column
            v-for="item in tableHeader1"
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
              <el-button type="text" size="small" @click="handleback(scope.row)">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="juti">
        <span class="one" />
        <span class="two">网络接访</span>
      </div>
      <div class="biaoge">
        <el-table
          v-loading="listLoading2"
          class="table-hidden-cell"
          :data="tableData2"
          stripe
          highlight-current-row
        >
          <el-table-column
            v-for="item in tableHeader2"
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
      </div>
      <div class="juti">
        <span class="one" />
        <span class="two">预约窗口接访</span>
      </div>
      <div class="biaoge">
        <el-table
          v-loading="listLoading3"
          class="table-hidden-cell"
          :data="tableData3"
          stripe
          highlight-current-row
        >
          <el-table-column
            v-for="item in tableHeader3"
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
              <el-button type="text" size="small" @click="handleWatch(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="more">
        <div class="one">
          <div class="top">
            <span class="gzzd">工作制度</span>
            <span class="gd" @click="gomorework">更多</span>
          </div>
          <ul>
            <li v-for="item in work" :key="item.id" @click="clickone(item.id)">{{item.title}}</li>
          </ul>
        </div>
        <div class="one">
          <div class="top">
            <span class="gzzd">律师数据报告</span>
            <span class="gd"  @click="gomoreshuju">更多</span>
          </div>
          <ul>
            <li v-for="item in report" :key="item.id" @click="clicktwo(item.id)">{{item.title}}</li>
          </ul>
        </div>
        <div class="one">
          <div class="top">
            <span class="gzzd">优秀案例展示</span>
            <span class="gd"  @click="gomorecase">更多</span>
          </div>
          <ul>
            <li v-for="item in casecount" :key="item.id" @click="clickthr(item.id)">{{item.title}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeader1: [
        { filed: 'visitorName', title: '咨询人姓名', colorB: 'colorB', width: '200' },
        { filed: 'mobile', title: '手机号码' },
        { filed: 'createTime', title: '咨询时间' },
        { filed: 'optionValueName', title: '咨询类型' },
        { filed: 'isReply', title: '是否回复' },
      ],
      tableHeader2: [
        { filed: 'visitorName', title: '咨询人姓名', colorB: 'colorB', width: '200' },
        { filed: 'mobile', title: '手机号码' },
        { filed: 'createTime', title: '咨询时间' },
        { filed: 'optionValueName', title: '咨询类型' },
        { filed: 'state', title: '状态' },
      ],
      tableHeader3: [
        { filed: 'visitorName', title: '咨询人姓名', colorB: 'colorB', width: '200' },
        { filed: 'mobile', title: '手机号码' },
        { filed: 'createTime', title: '咨询时间' },
        { filed: 'optionValueName', title: '咨询类型' },
        { filed: 'state', title: '状态' },
      ],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      listLoading1: false,
      listLoading2: false,
      listLoading3: false,
      tongjishuju: [],
      casecount: [],
      work: [],
      report: [],
    }
  },
  created() {
    this.listLoading1 = true
    this.listLoading2 = true
    this.listLoading3 = true
    this.$api.getTongJi()
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tongjishuju = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    this.$api.getWldaiban()
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          this.listLoading1 = false
          this.listLoading2 = false
          this.listLoading3 = false
          this.tableData1 = res.data.consulting
          this.tableData2 = res.data.interview
          this.tableData3 = res.data.windowsInterview
        }
      })
    this.$api.getHomegonggao()
      .then(res => {
        console.log(res)
        this.work = res.data.work
        this.casecount = res.data.case
        this.report = res.data.report
      })
  },
  mounted() {
  },
  methods: {
    handleClick(row) {
      this.$router.push({
        name: 'wljfxq',
        params: {
          id: row.id
        }
      })
    },
    handleWatch(row) {
      this.$router.push({
        name: 'ckjfxq',
        params: {
          id: row.id,
          state: row.state
        }
      })
    },
    handleback(row) {
      this.$router.push({
        name: 'wlzxxq',
        params: {
          id: row.id,
          length: row.isReply
        }
      })
    },
    gomorework() {
      this.$router.push({
        name: 'gzzd',
      })
    },
    gomoreshuju() {
      this.$router.push({
        name: 'lvsjbg',
      })
    },
    gomorecase() {
      this.$router.push({
        name: 'yxalzs',
      })
    },
    clickone(id) {
      this.$router.push({
        name: 'gzzdxq',
        params: {
          id: id
        }
      })
    },
    clicktwo(id) {
      this.$router.push({
        name: 'lsbgxq',
        params: {
          id: id
        }
      })
    },
    clickthr(id) {
      this.$router.push({
        name: 'yxalzsxq',
        params: {
          id: id
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.top-item{
    display: flex;
    justify-content: space-between;
    .one-item{
      width: 18%;
      background: #ebf3fe;
      padding: 20px 10px;
      box-sizing: border-box;
      border:  1px solid #a5bfe4;
      .top{
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-child(1){
             font-size: 30px;
             font-weight: 200;
            }
          span{
              padding: 10px 20px;
          }
          .red{
              color: #f56c6c;
          }
          .green{
              color: #7ee2ab;
          }
      }
      .bottom{
          padding: 10px 20px;
          width: 100%;
          box-sizing: border-box;
      }

    }

}
.daiban{
    display: flex;
    align-items: center;
    margin-top: 40px;
    .one{
       width: 4px;
       height: 16px;
       background: blue;
    //    margin-left: 20px;
    }
    .two{
      color: black;
      font-weight: 1000;
      padding-left: 4px;
    }
}
.juti{
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding: 10px 0;
    background: #ebf3fe;
    border: 1px solid #a9c4df;
    margin-bottom: 10px;
    .one{
       width: 4px;
       height: 16px;
       background: #2c72de;
       margin-left: 20px;
    }
    .two{
      color: #2c72de;
      font-weight: 1000;
      padding-left: 4px;
    }
}
.biaoge{
    margin-bottom: 20px;
}
.more{
    display: flex;
    .one{
        width: 30%;
        margin-right: 40px;
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgb(175, 166, 166);
            .gzzd{
                padding: 10px 0;
                border-bottom: 3px solid #2269d6;
            }
            .gd{
                padding: 10px 0;
                color: #2269d6;
                padding-right: 10px;
            }
        }
        ul{
            margin-top: 10px;
            width: 100%;
            li{
                padding: 10px 0;
                width: 100%;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow:ellipsis;
            }
        }
    }

}

</style>
