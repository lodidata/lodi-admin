<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="item">
        <span>{{i18n_lang.channelDownload0}}</span>
        <DatePicker
          v-model="reginTime"
          type="daterange"
          placeholder
          style="width: 200px"
          clearable
          @on-change="selectTime"
        ></DatePicker>
        <span style="margin-left: 15px;">{{i18n_lang.channelDownload1}}</span>
        <Select v-model="searchInfo.channel_no_name" clearable style="width:150px">
          <!-- <Option value>{{i18n_lang.memberManage11}}</Option> -->
          <Option v-for="item in channelNoNameList" :key="item.name" :value="item.name">{{ item.name }}</Option>
        </Select>
        <!-- <span style="margin-left: 15px;">{{i18n_lang.channelDownload2}}</span>
        <Input v-model="searchInfo.product_name" :placeholder="`${i18n_lang.channelDownload3}`" clearable style="width: 150px"/> -->
        <Button type="primary" icon="ios-search" @click="inquire" class="marginRight" style="margin-left: 15px;">{{i18n_lang.channelDownload4}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.channelDownload5}}</Button>
      </div>
    </Card>
    <div>
      <Button type="primary" icon="md-add" class="mb30" @click="handle()">{{i18n_lang.channelDownload6}}</Button>
      <Button type="primary" class="mb30" @click="handleBatch()">{{i18n_lang.channelDownload52_v1_2_7_8}}</Button>
    </div>
    <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.channelDownload50_kol}${page.total}${i18n_lang.channelDownload51_kol}` }}</div>
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
    <Modal v-model="visible.handle" :title="handleInfo.id ? `${i18n_lang.channelDownload43_v1_2_6_3}` : `${i18n_lang.channelDownload44_v1_2_6_3}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="100"
        :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.channelDownload8}`" prop="channel_no_name">
          <Select v-model="handleInfo.channel_no_name" :disabled="handleInfo.id ? true : false" style="width:150px">
            <Option v-for="item in channelNoNameList" :key="item.name" :value="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload45_v1_2_6_3}`" prop="android" v-if="handleInfo.id">
          <Input v-model="handleInfo.android" disabled style="width: 270px;"/>
          <Button type="primary" @click="downloadBtn(handleInfo.android)">{{i18n_lang.channelDownload49_v1_2_6_3}}</Button>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload46_v1_2_6_3}`" prop="ios" v-if="handleInfo.id">
          <Input v-model="handleInfo.ios" disabled style="width: 270px;"/>
          <Button type="primary" @click="downloadBtn(handleInfo.ios)">{{i18n_lang.channelDownload49_v1_2_6_3}}</Button>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload13}`" prop="H5_url">
          <Input v-model="handleInfo.H5_url" :placeholder="`${i18n_lang.channelDownload14}`"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload17}`" prop="super_label" v-if="handleInfo.id">
          <Input v-model="handleInfo.super_label" :placeholder="`${i18n_lang.channelDownload18}`" style="width: 270px;"/>
          <RadioGroup v-model="handleInfo.super_label_state">
            <Radio :label="`1`">{{i18n_lang.channelDownload19}}</Radio>
            <Radio :label="`0`">{{i18n_lang.channelDownload20}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload21}`" prop="enterprise_label" v-if="handleInfo.id">
          <Input v-model="handleInfo.enterprise_label" :placeholder="`${i18n_lang.channelDownload22}`" style="width: 270px;"/>
         <RadioGroup v-model="handleInfo.enterprise_label_state">
           <Radio :label="`1`">{{i18n_lang.channelDownload19}}</Radio>
           <Radio :label="`0`">{{i18n_lang.channelDownload20}}</Radio>
         </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload23}`" prop="TF_label" v-if="handleInfo.id">
          <Input v-model="handleInfo.TF_label" :placeholder="`${i18n_lang.channelDownload24}`" style="width: 270px;"/>
          <RadioGroup v-model="handleInfo.TF_label_state">
            <Radio :label="`1`">{{i18n_lang.channelDownload19}}</Radio>
            <Radio :label="`0`">{{i18n_lang.channelDownload20}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload25}`" prop="icon_url" v-if="handleInfo.id">
          <UploadImg
            v-model="handleInfo.icon_url"
            :batchUrl="false"
            style="width: 388px;background-color: transparent; border: 1px solid #ddd;"
            @input="batchUrlFn"
            @clearFile="clearFile"
          ></UploadImg>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload26}`" prop="bottom_text" v-if="handleInfo.id">
          <Input type="textarea" :rows="3" v-model="handleInfo.bottom_text" :placeholder="`${i18n_lang.channelDownload27}`"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave()" v-if="!handleInfo.id">{{i18n_lang.channelDownload28}}</Button>
        <Poptip :title="`${i18n_lang.channelDownload48_v1_2_6_3}`" confirm='' @on-ok="handleSave()" v-if="handleInfo.id">
          <Button type="primary" :loading="loading.btn">{{i18n_lang.channelDownload28}}</Button>
        </Poptip>
      </div>
    </Modal>
    <!-- 批量更改超级签 -->
    <Modal v-model="visible.batch" :title="`${i18n_lang.channelDownload52_v1_2_7_8}`" :width="600" :styles="{top: '20px'}">
      <Form ref="batchForm" :model="batchInfo" :label-width="100" :rules="batchValidate">
        <FormItem :label="`${i18n_lang.channelDownload53_v1_2_7_8}`" prop="ids">
          <Select v-model="batchInfo.ids" multiple @on-change="getIds($event)">
            <Option :value="''">{{i18n_lang.channelDownload54_v1_2_7_8}}</Option>
            <Option v-for="item in treeList" :key="item.id" :value="item.id">{{ item.channel_name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelDownload55_v1_2_7_8}`" prop="super_label">
          <Input v-model="batchInfo.super_label" />
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="visible.batch = false">{{i18n_lang.channelDownload56_v1_2_7_8}}</Button>
        <Button type="primary" :loading="loading.btn" @click="SaveBatch()">{{i18n_lang.channelDownload57_v1_2_7_8}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns'
  import UploadImg from './UploadImg'
  const searchInfo = {
    date_start: '',
    date_end: '',
    channel_no_name: '',
    product_name: ''
  }
  const handleInfo = {
    id: '',
    channel_no_name: '',
    product_name: '',
    download_url: '',
    H5_url: '',
    android: '',
    ios: '',
    super_label: '',
    super_label_state: '1',
    enterprise_label: '',
    enterprise_label_state: '1',
    TF_label: '',
    TF_label_state: '1',
    icon_url: '',
    bottom_text: ''
  }
  export default {
    components: {
      UploadImg
    },
    data() {
      const i18n_lang = this.$t('channelDownload');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          handle: false,
          batch: false
        },
        reginTime: [searchInfo.date_start, searchInfo.date_end],
        searchInfo: { ...searchInfo },
        channelNoNameList: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
        handleInfo: { ...handleInfo },
        ruleValidate: {
          channel_no_name: [{ required: true, message: `${i18n_lang.channelDownload29}`, trigger: 'blur' }],
          product_name: [{ required: true, message: `${i18n_lang.channelDownload10}`, trigger: 'blur' }],
          // download_url: [{ required: true, message: `${i18n_lang.channelDownload12}`, trigger: 'blur' }],
          H5_url: [{ required: true, message: `${i18n_lang.channelDownload14}`, trigger: 'blur' }],
          android: [{ required: true, message: `${i18n_lang.channelDownload16}`, trigger: 'blur' }],
          super_label: [{ required: true, message: `${i18n_lang.channelDownload18}`, trigger: 'blur' }],
          // enterprise_label: [{ required: true, message: `${i18n_lang.channelDownload22}`, trigger: 'blur' }],
          // TF_label: [{ required: true, message: `${i18n_lang.channelDownload24}`, trigger: 'blur' }],
          // icon_url: [{ required: true, message: `${i18n_lang.channelDownload30}`, trigger: 'blur' }],
          // bottom_text: [{ required: true, message: `${i18n_lang.channelDownload27}`, trigger: 'blur' }]
        },
        batchInfo: {
          ids: [],
          super_label: ""
        },
        batchValidate: {
          ids: [{
            required: true,
            validator: (rule, value, cb) => {
              if (this.batchInfo.ids.length == 0) {
                return cb(`${i18n_lang.channelDownload58_v1_2_7_8}`)
              } else {
                return cb()
              }
            }
          }],
          super_label: [{ required: true, message: `${i18n_lang.channelDownload59_v1_2_7_8}` }]
        },
        treeList: []
      }
    },
    created() {
      this.getList()
      this.channelList()
      this.channelTree()
    },
    methods: {
      // 批量修改超级签
      handleBatch(){
        this.batchInfo = {
          ids: [],
          super_label: ""
        }
        this.visible.batch = true
      },
      // 全选
      getIds(event){
        event.forEach((item, index) => {
          if (item === '') {
            this.batchInfo.ids = []
            this.treeList.forEach((items, indexs) => {
              this.batchInfo.ids.push(items.id)
            })
          }
        })
      },
      downloadBtn(url){
        if(url) window.open(url)
      },
      // 选择日期
      selectTime(val) {
        [this.searchInfo.date_start, this.searchInfo.date_end] = val
      },
      // 查询
      inquire(){
        this.getList()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.reginTime = [searchInfo.date_start, searchInfo.date_end]
        this.getList()
      },
      // 编辑
      handle(row){
        // this.channelList()
        if(row){
          this.handleInfo = {
            id: row.id,
            channel_no_name: `${row.channel_no}/${row.channel_name}`,
            product_name: row.product_name,
            download_url: row.download_url,
            H5_url: row.H5_url,
            android: row.android,
            ios: row.ios,
            super_label: row.super_label,
            super_label_state: `${row.super_label_state}`,
            enterprise_label: row.enterprise_label,
            enterprise_label_state: `${row.enterprise_label_state}`,
            TF_label: row.TF_label,
            TF_label_state: `${row.TF_label_state}`,
            icon_url: row.icon_url,
            bottom_text: row.bottom_text
          }
        }else{
          this.handleInfo = { ...handleInfo }
        }
        this.visible.handle = true
      },
      //选择文件
      batchUrlFn(url){
        this.handleInfo.icon_url = url
      },
      //清除文件
      clearFile(){
        this.handleInfo.icon_url = ''
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.channel_no = req.channel_no_name ? req.channel_no_name.split('/')[0] : ''
        req.channel_name = req.channel_no_name ? req.channel_no_name.split('/')[1] : ''
        req.start_time = req.start_time ? this.$dateFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateFormat(req.end_time) : ''
        delete req.channel_no_name
        const res = await this.$axios.request({
          url: '/channel/download',
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
        res.data.forEach((item, index) => {
          item.loading = false
        })
        this.dataSource = res.data || []
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      async channelList(){
        const res = await this.$axios.request({
          url: '/channel/list',
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.channelNoNameList = []
        res.data.forEach((item, index) => {
          this.channelNoNameList.push({
            name: `${item.number}/${item.name}`
          })
        })
      },
      // 添加修改
      async handleSave(){
        this.$refs['handleInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            let req = {...this.handleInfo}
            let req1 = {}, req2 = {}
            if(this.handleInfo.id){
              req2.id = this.handleInfo.id
              req2.H5_url = req.H5_url ? req.H5_url : ''
              req2.super_label = req.super_label
              req2.super_label_state = req.super_label_state
              req2.enterprise_label = req.enterprise_label
              req2.enterprise_label_state = req.enterprise_label_state
              req2.TF_label = req.TF_label
              req2.TF_label_state = req.TF_label_state
              req2.icon_url = req.icon_url ? req.icon_url : ''
              req2.bottom_text = req.bottom_text ? req.bottom_text : ''
            }else{
              req1.channel_no = req.channel_no_name ? req.channel_no_name.split('/')[0] : ''
              req1.channel_name = req.channel_no_name ? req.channel_no_name.split('/')[1] : ''
              req1.H5_url = req.H5_url ? req.H5_url : ''
            }
            // const req = { ...this.handleInfo }
            // req.channel_no = req.channel_no_name ? req.channel_no_name.split('/')[0] : ''
            // req.channel_name = req.channel_no_name ? req.channel_no_name.split('/')[1] : ''
            delete req.channel_no_name
            let typeObj = {}
            if (this.handleInfo.id) {
              typeObj = {
                url: '/channel/download',
                method: 'PUT',
                data: req2
              }
            } else {
              typeObj = {
                url: `/channel/download`,
                method: 'POST',
                data: req1
              }
            }
            const res = await this.$axios.request(typeObj)
            this.loading.btn = false
            if (res.status !== 200 || res.state != 0) {
              this.$Message.error(res.message)
            } else {
              this.$Message.success(res.message)
              this.visible.handle = false
              this.getList()
            }
          }
        })
      },
      // 删除
      async handleDelete(row){
        const res = await this.$axios.request({
          url: '/channel/download',
          method: 'DELETE',
          params: {
            id: row.id
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.getList()
      },
      //生成
      async produce(row, index){
        this.$set(this.dataSource[index], "loading", true);
        // return console.log(`index`, index)
        let typeObj = {}
        typeObj = {
          url: 'channel/download/generate',
          method: 'PUT',
          data: {
            id: row.id
          }
        }
        const res = await this.$axios.request(typeObj)
        if (res.status !== 200 || res.state != 0) {
          this.$set(this.dataSource[index], "loading", false);
          this.$Message.error(res.message)
        } else {
          this.$Message.success(res.message)
          // this.visible.handle = false
          this.getList()
        }
      },
      // 获取渠道号
      async channelTree(){
        const res = await this.$axios.request({
          url: '/channel/tree',
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.treeList = res.data
      },
      // 批量修改超级签
      async SaveBatch() {
        this.loading.btn = true
        this.$refs['batchForm'].validate(async valid => {
          if (!valid) {
            this.loading.btn = false
          } else {
            let req = {
              super_label: this.batchInfo.super_label,
              ids: ''
            }
            this.batchInfo.ids.forEach((item, index) => {
              req.ids += index == 0 ? `${item}` : `,${item}`
            })
            const res = await this.$axios.request({
              url: `/channel/edit`,
              method: 'PATCH',
              data: req
            })
            this.loading.btn = false
            this.$msg({
              type: res.status !== 200 ? 'error' : 'success',
              message: res.message
            })
            if (res.status !== 200) return
            this.visible.batch = false
            this.getList()
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
