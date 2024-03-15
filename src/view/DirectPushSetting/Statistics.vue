<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card class="query_box">
      <div class="query_con">
        <div class="item">
          <Input v-model="searchInfo.username" :placeholder="`${i18n_lang.directPushSetting58}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <Select v-model="sortType" @on-change="getSortType" style="width:150px">
            <Option value="0">{{i18n_lang.directPushSetting59}}</Option>
            <Option value="1">{{i18n_lang.directPushSetting95}}</Option>
            <Option value="2">{{i18n_lang.directPushSetting96}}</Option>
            <Option value="3">{{i18n_lang.directPushSetting97}}</Option>
            <Option value="4">{{i18n_lang.directPushSetting98}}</Option>
            <Option value="5">{{i18n_lang.directPushSetting99}}</Option>
            <Option value="6">{{i18n_lang.directPushSetting100}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.directPushSetting62}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.directPushSetting63}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="statisticsColumns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.directPushSetting64}：${page.total}${i18n_lang.directPushSetting65}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getStatistics"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>
  import StatisticsColumns from './StatisticsColumns'
  const searchInfo = {
    username: "",
    order_type: "0",
    sort: ''
  }
  export default {
    data() {
      const i18n_lang = this.$t('directPushSetting');
      return {
        i18n_lang: i18n_lang,
        statisticsColumns: StatisticsColumns(this),
        sortType: '0',
        loading: {
          page: false,
        },
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
      this.getStatistics()
    },
    methods: {
      // 筛选类型
      getSortType(val){
        if(val == '0'){
          this.searchInfo.order_type = '0'
          this.searchInfo.sort = ''
        }
        if(val == '1'){
          this.searchInfo.order_type = '2'
          this.searchInfo.sort = 'price'
        }
        if(val == '2'){
          this.searchInfo.order_type = '1'
          this.searchInfo.sort = 'price'
        }
        if(val == '3'){
          this.searchInfo.order_type = '2'
          this.searchInfo.sort = 'register_count'
        }
        if(val == '4'){
          this.searchInfo.order_type = '1'
          this.searchInfo.sort = 'register_count'
        }
        if(val == '5'){
          this.searchInfo.order_type = '2'
          this.searchInfo.sort = 'recharge_count'
        }
        if(val == '6'){
          this.searchInfo.order_type = '1'
          this.searchInfo.sort = 'recharge_count'
        }
      },
      // 搜索
      search(){
        this.getStatistics()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.getStatistics()
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getStatistics()
      },
      // 获取数据
      async getStatistics(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.order_type = req.order_type != '0' ? req.order_type : ''
        const res = await this.$axios.request({
          url: '/direct/statistics',
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
</style>
