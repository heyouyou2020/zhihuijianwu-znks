<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="top-item">
        <div class="one" v-for="(item, index) in titledata" :key="index">
          <div class="top">
            <span>{{item.count}}</span>
            <span class="red">同比{{item.yearOnYear}}%</span>
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
        <span class="two">信访共享接收</span>
      </div>
      <div class="biaoge">
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
              <el-button type="text" size="small" @click="handleWatch(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row)">接收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeader: [
        { filed: 'lawyerName', title: '律师姓名', colorB: 'colorB', width: '200' },
        { filed: 'visitorMobile', title: '手机号码' },
        { filed: 'createTime', title: '咨询时间' },
        { filed: 'visitorName', title: '咨询人姓名' },
        { filed: 'typeOptionName', title: '咨询类型' },
        { filed: 'procuratorateName', title: '信息来源' },
      ],
      tableData: [
      ],
      listLoading: false,
      total: 100,
      titledata: [],
    }
  },
  created() {
    this.$api.getjianchantongji().then(res => {
      console.log(res)
      if (res.code === 0) {
        this.titledata = res.data
      }
    })
    this.$api.getjianchanHome().then(res => {
      console.log(res)
      if (res.code === 0) {
        this.tableData = res.data.consulting
      }
    })
  },
  mounted() {
  },
  methods: {
    handleClick(row) {
      this.$confirm('你是否确认接收选中的档案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-manage',
        type: 'warning'
      }).then(() => {
          this.$api.jieshouwlzixun(row.id).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$message.success('接收成功')
            }else {
              this.$message.error('接收失败')
            }  
        })
      }) 
    },
    handleWatch(row) {
      this.$router.push({
        name: 'jcwlzxxq',
        params: {
          id: row.consultingId
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
    .one{
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
          }
          span{
              padding: 10px 20px;
          }
          .red{
              color: #f56c6c;
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
</style>
