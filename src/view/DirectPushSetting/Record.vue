<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card class="query_box">
      <div class="query_con">
        <div class="item">
          <div class="dataType">
            <span :class="{'active': dataType == 'day'}" @click="dataTypeCut('day')">{{i18n_lang.directPushSetting70}}</span>
            <span :class="{'active': dataType == 'week'}" @click="dataTypeCut('week')">{{i18n_lang.directPushSetting71}}</span>
            <span :class="{'active': dataType == 'month'}" @click="dataTypeCut('month')">{{i18n_lang.directPushSetting72}}</span>
          </div>
          <span v-if="dataType != 'month'">
            <DatePicker v-model="searchInfo.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
            <span>-</span>
            <DatePicker v-model="searchInfo.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          </span>
          <span v-else>
            <DatePicker
              v-model="searchInfo.month"
              type="month"
              placeholder
              style="width: 100px"
              clearable
              @on-change="selectTime"
            ></DatePicker>
          </span>
        </div>
        <div class="item">
          <!-- <span>{{i18n_lang.memberManage10}}</span> -->
          <Input v-model="searchInfo.username" :placeholder="`${i18n_lang.directPushSetting73}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <!-- <span>{{i18n_lang.memberManage10}}</span> -->
          <Select v-model="searchInfo.type" style="width:150px">
            <Option value="0">{{i18n_lang.directPushSetting74}}</Option>
            <Option value="1">{{i18n_lang.directPushSetting75}}</Option>
            <Option value="2">{{i18n_lang.directPushSetting76}}</Option>
            <Option value="3">{{i18n_lang.directPushSetting101}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.directPushSetting77}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.directPushSetting78}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="recordColumns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.directPushSetting79}：${page.total}${i18n_lang.directPushSetting80}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getRecord"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>
  import RecordColumns from './RecordColumns'
  let month = ''
  let getMonth = new Date().getMonth() + 1
  month = getMonth <= 9 ? `0${getMonth}` : `${getMonth}`
  const searchInfo = {
    username: "",
    start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
    end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`,
    month: `${new Date().getFullYear()}-${month}`,
    type: "0"
  }
  export default {
    data() {
      const i18n_lang = this.$t('directPushSetting');
      return {
        i18n_lang: i18n_lang,
        recordColumns: RecordColumns(this),
        loading: {
          page: false,
        },
        dataType: 'day',
        searchInfo: { ...searchInfo },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        }
      }
    },
    created() {
      this.getRecord()
    },
    methods: {
      // 报表筛选日期类型
      dataTypeCut(text){
        if(this.dataType == text) return
        this.dataType = text
        this.dataType == 'week' ? this.getWeek() : this.reset()
      },
      // 获取本周时间
      getWeek(){
        const now = new Date();
        const nowTime = now.getTime() ;
        const day = now.getDay() || 7  //为周日的时候 day 修改为7  否则当天周天会有问题
        const oneDayTime = 24*60*60*1000 ;
        const MondayTime = nowTime - (day-1) * oneDayTime ;//显示周一
        const SundayTime =  nowTime + (7-day) * oneDayTime ;//显示周日
        this.searchInfo.start_time = `${this.$dateFormat(new Date(MondayTime))} 00:00:00`
        this.searchInfo.end_time = `${this.$dateFormat(new Date(SundayTime))} 23:59:59`
        this.getRecord()
      },
      // 选择月份
      selectTime(val) {
        this.searchInfo.month = val
      },
      // 搜索
      search(){
        this.getRecord()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.getRecord()
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getRecord()
      },
      // 获取数据
      async getRecord(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        if(req.month){
          let month = ''
          let getMonth = new Date(req.month).getMonth() + 1
          month = getMonth <= 9 ? `0${getMonth}` : `${getMonth}`
          req.month = `${new Date(req.month).getFullYear()}-${month}`
        }
        if(this.dataType == 'month'){
          if(!req.month){
            this.$msg({
              type: 'error',
              message: `${this.i18n_lang.directPushSetting81}`
            })
            return
          }
        }else{
          if(!req.start_time && !req.end_time){
            this.$msg({
              type: 'error',
              message: `${this.i18n_lang.directPushSetting81}`
            })
            return
          }
        }
        req.start_time = req.start_time ? this.$dateTimeFormat(new Date(req.start_time)) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(new Date(req.end_time)) : ''
        // console.log(123, req.month)
        if(this.dataType == 'month'){
          delete req.start_time
          delete req.end_time
        }else{
          delete req.month
        }
        const res = await this.$axios.request({
          url: '/direct/record',
          method: 'GET',
          params: {
            ...req,
            page: this.page.currentPage,
            page_size: this.page.pageSize
          }
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .dataType{
    display: inline-block;
    margin-right: 10px;
    float: left;
    overflow: hidden;
    &>span{
      display: inline-block;
      width: 60px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #dcdee2;
      cursor: pointer;
      float: left;
      &:first-child{
        border-radius: 4px 0 0 4px;
      }
      &:last-child{
        border-radius: 0 4px 4px 0;
      }
      &.active{
        color: #2d8cf0;
        border-color: #2d8cf0;
      }
    }
  }
</style>
