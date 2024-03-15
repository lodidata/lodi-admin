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
          <DatePicker
            v-model="initQuery.created"
            type="date"
            format="yyyy-MM-dd"
            :placeholder="i18n_lang.joinList17"
            style="width: 150px"
            @on-change="changeStartTime"
          ></DatePicker>
          <!-- <DatePicker v-model="initQuery.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="initQuery.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker> -->
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="search">{{i18n_lang.turnplateList9}}</Button>
          <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.turnplateList10}}</Button>
        </div>
      </div>
    </Card>
    <Table :data="dataSource" border :columns="getNumber" style="margin-top: 30px"></Table>
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
    <Modal v-model="visible.number" :title="`${i18n_lang.turnplateList25}`">
      <Form
      :label-width="100"
      style="width: 400px"
      >
        <FormItem :label="`${times_title}`">
          <Input v-model="times"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" class="btn" @click="saveTimes()">{{i18n_lang.turnplateList27}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import getNumber from './getNumber.js'
  const initQuery = {
    user_name: '',
    created: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,//${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}
    // start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
    // end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
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
        visible: {
          number: false
        },
        getNumber: getNumber(this),
        initQuery: { ...initQuery },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 100, 1000, 2000]
        },
        times: '',
        times_id: '',
        times_title: ''
      }
    },
    created() {
      this.getData(1)
    },
    watch: {
      userAccounted(){
        this.getData()
      }
    },
    computed: {
      ...mapState({
        userAccounted: state => state.detail.userAccounted
      })
    },
    methods: {
      ...mapActions({
        getUserDetail: 'detail/info'
      }),
      //修改时间
      changeStartTime(date) {
        this.initQuery.created = date
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
      // 查看用户详情
      handleUserDetail(row) {
        this.getUserDetail({ username: row.name, id: row.user_id })
      },
      // 设置剩余次数弹出
      setTimes(row){
        this.times = row.times
        this.times_id = row.id
        this.times_title = `${row.type}${this.i18n_lang.turnplateList26}`
        this.visible.number = true
      },
      // 获取列表
      async getData(page) {
        this.loading.page = true
        // this.page.currentPage = page
        if(page && page == 1){
          this.page.currentPage = 1
        }
        const req = { ...this.initQuery }
        // if(req.start_time && req.end_time){
        //   req.start_time = this.$dateTimeFormat(new Date(req.start_time))
        //   req.end_time = this.$dateTimeFormat(new Date(req.end_time))
        // }
        if(req.created){
          req.created = this.$dateFormat(new Date(req.created))
        }
        const query = {
          ...req,
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          type_id: 6
        }
        const res = await this.$axios.request({
          url: '/active/applys/detail',
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
      },
      // 修改剩余次数提交
      async saveTimes(){
        const res = await this.$axios.request({
          url: `/active/applys/detail/${this.times_id}`,
          method: 'PUT',
          data: {
            times: this.times ? this.times : 0
          }
        })
        if (res.status !== 200 && res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visible.number = false
        this.getData(1)
      }
    }
  }
</script>

<style>
</style>
