<template>
  <div>
    <Tabs v-model="curTab">
      <TabPane :label="`${i18n_lang.directPushSetting0}`" name="Setting">
        <Setting v-if="curTab === 'Setting'"></Setting>
      </TabPane>
      <TabPane :label="`${i18n_lang.directPushSetting1}`" name="Statistics">
        <Statistics v-if="curTab === 'Statistics'"></Statistics>
      </TabPane>
      <TabPane :label="`${i18n_lang.directPushSetting2}`" name="Record">
        <Record v-if="curTab === 'Record'"></Record>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import Setting from './Setting'
  import Statistics from './Statistics'
  import Record from './Record'
  export default {
    components: {
      Setting,
      Statistics,
      Record
    },
    data() {
      const i18n_lang = this.$t('directPushSetting');
      return {
        i18n_lang: i18n_lang,
        curTab: 'Setting'
      }
    }
  }
</script>

<style>
</style>
