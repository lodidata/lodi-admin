<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.turnplateList2}}</span>
          <Input v-model="initQuery.user_name" placeholder style="width:150px;"></Input>
        </div>
        <div class="item">
          <span>{{i18n_lang.turnplateList3}}</span>
          <!-- <DatePicker
            v-model="initQuery.apply_time"
            type="date"
            format="yyyy-MM-dd"
            :placeholder="` `"
            style="width: 150px"
            @on-change="changeStartTime"
          ></DatePicker> -->
          <DatePicker v-model="initQuery.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="initQuery.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.turnplateList4}}</span>
          <Select
            v-model="initQuery.send_type"
            :placeholder="` `"
            style="width: 120px"
          >
            <Option v-for="item in sendType" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.turnplateList5}}</span>
          <Select
            v-model="initQuery.award_type"
            :placeholder="` `"
            style="width: 120px"
          >
            <Option value="1">{{i18n_lang.turnplateList6}}</Option>
            <Option value="2">{{i18n_lang.turnplateList7}}</Option>
            <Option value="3">{{i18n_lang.turnplateList8}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="search">{{i18n_lang.turnplateList9}}</Button>
          <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.turnplateList10}}</Button>
        </div>
      </div>
    </Card>
    <Table :data="dataSource" border :columns="participant" style="margin-top: 30px"></Table>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>
  import participant from './participant.js'
  const initQuery = {
    user_name: '',
    apply_time: '',
    send_type: '',
    award_type: '',
    start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
    end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
  }
  export default {
    data() {
      const i18n_lang = this.$t('turnplateList');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          modalButton: false
        },
        participant: participant(this),
        sendType: [
          { id: "1", name: `${i18n_lang.turnplateList11}` },
          { id: "2", name: `${i18n_lang.turnplateList12}` },
          { id: "3", name: `${i18n_lang.turnplateList13}` }
        ],
        initQuery: { ...initQuery },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 100, 1000, 2000]
        }
      }
    },
    created() {
      this.getData(1)
    },
    methods: {
      //修改时间
      changeStartTime(date) {
        this.initQuery.apply_time = date
      },
      // 查询
      search(){
        this.getData(1)
      },
      // 重置
      reset(){
        this.initQuery = { ...initQuery }
        this.getData(1)
      },
      // 设置每页条数
      changePage(currentPage) {
        this.page.currentPage = currentPage
        this.getData()
      },
      changePageSize(pageSize) {
        this.page.currentPage = 1
        this.page.pageSize = pageSize
        this.getData()
      },
      // 获取列表
      async getData(page) {
        this.loading.page = true
        if(page && page == 1){
          this.page.currentPage = 1
        }
        const req = { ...this.initQuery }
        if(req.start_time && req.end_time){
          req.start_time = this.$dateTimeFormat(new Date(req.start_time))
          req.end_time = this.$dateTimeFormat(new Date(req.end_time))
        }
        const query = {
          ...req,
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          type_id: 6
        }
        const res = await this.$axios.request({
          url: '/active/applys',
          method: 'GET',
          params: query
        })
        this.loading.page = false
        if (res.state === 0) {
          this.dataSource = res.data
          if (res.attributes) {
            this.page.total = res.attributes.total
          }
        }
      }
    }
  }
</script>

<style>
</style>
