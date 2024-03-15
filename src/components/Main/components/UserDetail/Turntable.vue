<template>
  <div>
    <div style="width: 400px;">
      <Form
        :label-width="100"
        style="width: 400px">
        <FormItem :label="`${i18n_lang.turntableComponents1}`">
          <Input v-model="bronze"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.turntableComponents2}`">
          <Input v-model="silver"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.turntableComponents3}`">
          <Input v-model="gold"></Input>
        </FormItem>
      </Form>
      <Button type="primary" class="btn" @click="saveData">{{`${i18n_lang.turntableComponents4}`}}</Button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Accounted',
    props: ['id'],
    data() {
      const i18n_lang = this.$t('components');
      return {
        i18n_lang: i18n_lang,
        bronze: '',
        silver: '',
        gold: '',
        form: {}
      }
    },
    mounted() {
      this.getTimes()
    },
    computed: {
      ...mapState({
        userAccounted: state => state.detail.userAccounted
      })
    },
    methods: {
      ...mapMutations({
        setVisible: 'detail/setVisible',
        setUserAccounted: 'detail/setUserAccounted'
      }),
      async getTimes(){
        const res = await this.$axios.request({
          url: `/active/applys/times/${this.id}`,
          method: 'GET'
        })
        // this.$msg({
        //   type: res.status !== 200 || res.state !== 0 ? 'error' : 'success',
        //   message: res.message
        // })
        res.data.forEach((item, index) => {
          if(item.type == 1){
            this.bronze = item.times
          }
          if(item.type == 2){
            this.silver = item.times
          }
          if(item.type == 3){
            this.gold = item.times
          }
        })
      },
      async saveData(){
        const res = await this.$axios.request({
          url: `/active/applys/times/${this.id}`,
          method: 'PUT',
          data: {
            type: [this.bronze, this.silver, this.gold]
          }
        })
        this.$msg({
          type: res.status !== 200 || res.state !== 0 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200 || res.state !== 0) return
        this.setUserAccounted(this.userAccounted ? false : true)
        this.setVisible(false)
      }
    }
  }
</script>

<style>
</style>
