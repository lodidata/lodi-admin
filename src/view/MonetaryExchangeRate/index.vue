<template>
  <div>
    <Spin v-if="loading.page" fix></Spin>
    <div class="explain">{{`${i18n_lang.monetaryExchangeRate0}`}}<span>{{currency_id}}</span></div><!-- {{`${i18n_lang.monetaryExchangeRate1}`}} -->
    <Table style="margin-top:10px" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.monetaryExchangeRate2}${page.total}${i18n_lang.monetaryExchangeRate3}` }}</div>
    <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" @on-change="getData" @on-page-size-change="changePageSize"></Page>
    <!-- 货币汇率设置 -->
    <Modal v-model="visible.handle" :title="`${i18n_lang.monetaryExchangeRate4} ${handleInfo.name}`">
      <Form ref="handleForm" :model="handleInfo" :label-width="80" :rules="handleRule">
        <FormItem :label="`${i18n_lang.monetaryExchangeRate5}`" prop="type">
          <Select v-model="handleInfo.type" disabled style="width:408px;">
            <Option :value="1">{{`${i18n_lang.monetaryExchangeRate6}`}}</Option>
            <Option :value="2">{{`${i18n_lang.monetaryExchangeRate7}`}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.monetaryExchangeRate8}`" prop="name">
          <Input v-model="handleInfo.name" :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.monetaryExchangeRate9}`" prop="alias">
          <Input v-model="handleInfo.alias" :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.monetaryExchangeRate10}`" prop="exchange_rate">
          <Input v-model="handleInfo.exchange_rate" :placeholder="` `" @on-keyup="onKeyUp($event, 'exchange_rate', true)"/>
          <div>{{`${i18n_lang.monetaryExchangeRate11}`}}</div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave()">{{`${i18n_lang.monetaryExchangeRate12}`}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns'
  const handleInfo = {
    id: "",
    type: 1,
    name: "",
    alias: "",
    exchange_rate: ""
  }
  export default {
    data() {
      const i18n_lang = this.$t('monetaryExchangeRate');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: 0,
          btn: false
        },
        visible: {
          handle: false
        },
        columns: columns(this),
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1
        },
        handleInfo: { ...handleInfo },
        handleRule: {
          // name: [{ required: true, message: `${i18n_lang.monetaryExchangeRate13}`, trigger: 'blur' }],
          // alias: [{ required: true, message: `${i18n_lang.monetaryExchangeRate4}`, trigger: 'blur' }],
          // exchange_rate: [{ required: true, message: `${i18n_lang.monetaryExchangeRate15}`, trigger: 'blur' }],
        },
        currency_id: ''
      }
    },
    created() {
      this.getData()
    },
    methods: {
      handle(row){
        this.handleInfo = {
          id: row.id,
          type: row.type,
          name: row.name,
          alias: row.alias,
          exchange_rate: row.exchange_rate
        }
        this.visible.handle = true
      },
      // 限制输入小数位数
      onKeyUp(e, key, money) {
        // 如果是删除为空 则不处理
        if (!this.handleInfo[key]) {
          return (this.handleInfo[key] = "");
        }
        // 每次抬键处理,对应金额渲染四位位小数||数字
        let num = "";
        if (money) {
          num = this.handleInfo[key].match(/^\d*(\.?\d{0,8})/g)[0];
        } else {
          num = this.handleInfo[key].replace(/^[^\d]+$/g, "").split('.')[0];
        }
        this.handleInfo[key] = `${num}`;
      },
      // 切换条数
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      async getData(index = 1) {
        this.page.currentPage = index
        this.loading.page++
        const res = await this.$axios.request({
          url: `/cash/exchangerate`,
          method: 'GET',
          params: {
            page: this.page.currentPage,
            page_size: this.page.pageSize
          }
        })
        this.loading.page--
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            method: 'GET'
          })
          return
        }
        this.page.total = res.attributes ? res.attributes.total : 0
        this.currency_id = res.attributes ? res.attributes.currency_id : ''
        this.dataSource = res.data ? res.data : []
      },
      async handleSave(){
        this.$refs['handleForm'].validate(async valid => {
          if (valid) {
            const req = { ...this.handleInfo }
            delete req.id
            this.loading.btn = true
            const res = await this.$axios.request({
              url: `/cash/exchangerate/${this.handleInfo.id}`,
              method: 'PUT',
              data: {
                ...req
              }
            })
            this.loading.btn = false
            if (res.status !== 200 || res.state !== 0) {
              this.$msg({
                type: 'error',
                message: res.message
              })
              return false
            }
            this.visible.add = false
            this.visible.handle = false
            this.getData(this.page.currentPage)
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .explain{
    font-size: 16px;
    font-weight: bold;
    &>span{
      color: red;
    }
  }
</style>
