<template>
  <div id="Rebate">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div>
      <p class="title">{{i18n_lang.components312_v1_2_7_4}}</p>
    </div>
    <Table border :columns="columns" :data="dataSource"></Table>
  </div>
</template>

<script>
  import columns from './columns/rebate'
  export default {
    props: ['id'],
    data() {
      const i18n_lang = this.$t('components');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false
        },
        columns: columns(this),
        dataSource: []
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: `/user/info/directbkge/${this.id}`,
          method: 'GET',
          params: {}
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.dataSource = []
        this.dataSource.push(res.data)
      }
    }
  }
</script>

<style>
  #Rebate {
    position: relative;
    padding-bottom: 30px;
    min-height: 300px;
    .title {
      font-size: 16px;
      margin: 20px 0;
      padding-left: 10px;
      border-left: 3px solid #3080fe;
      color: #666;
    }
  }
</style>
