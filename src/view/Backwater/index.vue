<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.backwater0}}</span>
          <DatePicker v-model="searchInfo.start_time" type="datetime" placeholder style="width: 180px"></DatePicker>
          <span>-</span>
          <DatePicker v-model="searchInfo.end_time" type="datetime" placeholder style="width: 180px"></DatePicker>
          <!-- <DatePicker
            v-model="time"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker> -->
        </div>
        <div class="item">
          <span>{{i18n_lang.backwater1}}</span>
          <Select v-model="searchInfo.type" clearable style="width:150px">
            <Option :value="0">{{i18n_lang.backwater2}}</Option>
            <Option :value="1">{{i18n_lang.backwater3}}</Option>
            <Option :value="2">{{i18n_lang.backwater4}}</Option>
            <Option :value="3">{{i18n_lang.backwater5}}</Option>
            <!-- <Option :value="4">{{i18n_lang.backwater48}}</Option> -->
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.backwater6}}</span>
          <Select v-model="searchInfo.status" clearable style="width:150px">
            <Option :value="-1">{{i18n_lang.backwater7}}</Option>
            <Option :value="0">{{i18n_lang.backwater8}}</Option>
            <Option :value="1">{{i18n_lang.backwater9}}</Option>
            <Option :value="2">{{i18n_lang.backwater10}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.backwater11}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.backwater12}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportData(1)">{{i18n_lang.backwater21}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="dataList" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.backwater13}${page.total}${i18n_lang.backwater14}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getList"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 详情 -->
    <Modal v-model="visible.details" :title="`${i18n_lang.backwater15}`" :width="1200" :footer-hide="true">
      <Card dis-hover class="query_box">
        <div class="query_con">
          <div class="item">
            <span>{{i18n_lang.backwater16}}</span>
            <Input v-model="detailsInfo.user_name" :placeholder="``" style="width: 120px" />
          </div>
          <div class="item">
            <span>{{i18n_lang.backwater17}}</span>
            <Select v-model="detailsInfo.status" clearable style="width: 180px">
              <Option value='-1'>{{i18n_lang.backwater18}}</Option>
              <Option value='pending'>{{i18n_lang.backwater19}}</Option>
              <Option value='pass'>{{i18n_lang.backwater20}}</Option>
            </Select>
          </div>
          <div class="item">
            <Button type="primary" icon="ios-search" class="marginRight" @click="searchDetails">{{i18n_lang.backwater11}}</Button>
            <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="resetDetails">{{i18n_lang.backwater12}}</Button>
            <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportData(2)">{{i18n_lang.backwater21}}</Button>
          </div>
        </div>
      </Card>
      <Table ref="table" border :columns="detailsList" :data="detailsDataSource"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.backwater13}${detailsPage.total}${i18n_lang.backwater14}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="detailsPage.currentPage"
        :page-size-opts="detailsPage.pageSizes"
        :page-size="detailsPage.pageSize"
        :total="detailsPage.total"
        @on-change="getDetailsList"
        @on-page-size-change="changeDetailsPageNamePageSize"
      ></Page>
    </Modal>
  </div>
</template>

<script>
  import { computeDay } from '@/libs/handleDate'
  import { dataList, detailsList } from './columns'
  const searchInfo = {
    type: 0,
    status: -1,
    start_time: `${computeDay(-6)} 00:00:00`,
    end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
  }
  const detailsInfo = {
    id: '',
    user_name: '',
    status: '-1'
  }
  export default {
    data() {
      const i18n_lang = this.$t('backwater');
      return {
        i18n_lang: i18n_lang,
        dataList: dataList(this),
        detailsList: detailsList(this),
        loading: {
          page: false,
        },
        visible: {
          details: false
        },
        time: [ searchInfo.start_time, searchInfo.end_time ],
        searchInfo: { ...searchInfo },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        detailsInfo: { ...detailsInfo },
        detailsDataSource: [],
        detailsPage: {
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 选择时间
      selectTime(val){
        [this.searchInfo.start_time, this.searchInfo.end_time] = val
      },
      search(){
        this.getList()
      },
      reset(){
        this.searchInfo = { ...searchInfo }
        this.time = [searchInfo.start_time, searchInfo.end_time]
        this.getList()
      },
      searchDetails(){
        this.getDetailsList()
      },
      resetDetails(){
        this.detailsInfo.user_name = ''
        this.detailsInfo.status = '-1'
        this.getDetailsList()
      },
      handleDetails(row){
        this.detailsInfo.id = row.id
        this.getDetailsList()
      },
      // 分页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      changeDetailsPageNamePageSize(pageSize){
        this.detailsPage.pageSize = pageSize
        this.getDetailsList()
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.type = req.type ? req.type : ''
        req.status = req.status != -1 ? req.status : ''
        req.start_time = req.start_time ? this.$dateTimeFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/cash/backwater',
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
      },
      // 发放返水
      async handleBackwater(row){
        const res = await this.$axios.request({
          url: `/cash/backwater/${row.id}`,
          method: 'PATCH',
          data: {}
        })
        this.$msg({
          type: res.status !== 200 || res.state != 0 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200 || res.state != 0) return
        this.getList(this.page.currentPage)
      },
      // 获取详情列表
      async getDetailsList(index = 1) {
        // this.loading.page = true
        this.detailsPage.currentPage = index
        const req = { ...this.detailsInfo }
        req.status = req.status != -1 ? req.status : ''
        const res = await this.$axios.request({
          url: '/cash/backwater/detail',
          method: 'GET',
          params: {
            ...req,
            page: this.detailsPage.currentPage,
            page_size: this.detailsPage.pageSize
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
        this.visible.details = true
        this.detailsDataSource = res.data
        this.detailsPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 导出
      async exportData(number){
        let req = {}
        if(number == 1){
          req = { ...this.searchInfo }
          req.type = req.type ? req.type : ''
          req.status = req.status != -1 ? req.status : ''
          req.start_time = req.start_time ? this.$dateTimeFormat(req.start_time) : ''
          req.end_time = req.end_time ? this.$dateTimeFormat(req.end_time) : ''
        }
        if(number == 2){
          req = { ...this.detailsInfo }
          req.status = req.status != -1 ? req.status : ''
        }
        const res = await this.$axios.request({
          url: number == 1 ? '/cash/backwater/export' : '/cash/backwater/detail/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...req
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        const url = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
