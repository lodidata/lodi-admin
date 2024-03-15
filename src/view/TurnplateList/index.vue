<template>
  <div>
    <Tabs v-model="curTab">
      <TabPane :label="`${i18n_lang.turnplateList0}`" name="participant">
        <participant v-if="curTab === 'participant'"></participant>
      </TabPane>
      <TabPane :label="`${i18n_lang.turnplateList1}`" name="getNumber">
        <getNumber v-if="curTab === 'getNumber'"></getNumber>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import participant from './participant.vue'
import getNumber from './getNumber.vue'
export default {
  components: {
    participant,
    getNumber
  },
  data() {
    const i18n_lang = this.$t('turnplateList');
    return {
      i18n_lang: i18n_lang,
      curTab: 'participant'
    }
  }
}
</script>

<style lang="less" scoped></style>
