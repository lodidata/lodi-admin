<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div style="margin-bottom: 15px;" v-if="uidList.length > 0">
      <Button type="primary" @click="visible.sort = true">{{i18n_lang.gameManage60_v_1_2_7_8}}</Button>
    </div>
    <!-- <Table border :columns="columns" :data="dataSource"
      @on-select="handleSelect"
      @on-select-cancel="handleCancel"
      @on-select-all="handleSelectAll"
      @on-select-all-cancel="handleSelectAll"
    ></Table> -->
    <MyTable editting :columns="columns" :data="dataSource" border @editChange="editOddChange"
      @handleSelect="handleSelect"
      @handleCancel="handleCancel"
      @handleSelectAll="handleSelectAll"
    ></MyTable>
    <!-- 图标编辑 -->
    <Modal v-model="visible.imageModal" :title="i18n_lang.gameManage9" :width="600" :styles="{ top: '20px' }">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <UploadImg ref="uploadImg" v-model="gameIcon">
        <p>{{i18n_lang.gameManage18}}</p>
      </UploadImg>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="handleConfirmIcon">{{i18n_lang.gameManage14}}</Button>
        <Button @click="visible.imageModal = false">{{i18n_lang.gameManage15}}</Button>
      </div>
    </Modal>
    <!-- 名称编辑 -->
    <Modal v-model="visible.nameModal" :title="`${i18n_lang.gameManage48}`" :width="600" :styles="{ top: '20px' }">
      <Form
      ref="nameInfo"
      :model="nameInfo"
      :label-width="100"
      :rules="ruleNameValidate"
      >
        <FormItem :label="`${i18n_lang.gameManage49}`" prop="oldName">
          <Input v-model="nameInfo.oldName" disabled :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.gameManage50}`" prop="newName">
          <Input v-model="nameInfo.newName" :placeholder="` `"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="nameSave()">{{i18n_lang.gameManage51}}</Button>
      </div>
    </Modal>
    <!-- 批量排序 -->
    <Modal v-model="visible.sort" :title="`${i18n_lang.gameManage60_v_1_2_7_8}`" :width="600" :styles="{top: '20px'}">
      <Form ref="sortForm" :model="sortInfo" :label-width="220" :rules="sortValidate">
        <FormItem :label="`${i18n_lang.gameManage61_v_1_2_7_8}${uidList.length}${i18n_lang.gameManage62_v_1_2_7_8}`" prop="sort">
          <Input v-model="sortInfo.sort" />
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="visible.sort = false">{{i18n_lang.gameManage63_v_1_2_7_8}}</Button>
        <Button type="primary" :loading="loading.btn" @click="SaveSort()">{{i18n_lang.gameManage64_v_1_2_7_8}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns'
  import UploadImg from '_c/UploadImg'
  import MyTable from '_c/MyTable'
  export default {
    data() {
      const i18n_lang = this.$t('gameManage');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          btn: false
        },
        visible: {
          imageModal: false,
          nameModal: false,
          sort: false
        },
        dataSource: [],
        gameIcon: '',
        nameInfo: {
          oldName: '',
          newName: ''
        },
        ruleNameValidate: {
          newName: [{ required: true, message: `${i18n_lang.gameManage52}`, trigger: 'blur' }]
        },
        uidList: [],
        sortInfo: {
          sort: ''
        },
        sortValidate: {
          sort: [{ required: true, message: `${i18n_lang.gameManage65_v_1_2_7_8}` }]
        }
      }
    },
    created() {
      this.getHotgame()
    },
    components: {
      UploadImg,
      MyTable
    },
    methods: {
      handleSelect(row){
        this.uidList.push(row.id)
      },
      handleCancel(row){
        this.uidList.forEach((item, index) => {
          if(item == row.id){
            this.uidList.splice(index, 1)
          }
        })
      },
      handleSelectAll(slection){
        if(slection.length){
          slection.forEach(item => {
            this.uidList.push(item.id)
          })
        }else{
          this.uidList = []
        }
      },
      // 进入二级菜单
      subMenu(row) {
        this.$router.push({
          name: 'hotSubMenu',
          query: {
            game: row.name,
            id: row.id,
            type: 'c'
          }
        })
      },
      // 图标编辑
      handleEditIcon(row) {
        this.visible.imageModal = true
        this.editId = row ? row.id : ''
        this.gameIcon = row ? row.img : ''
      },
      // 名称编辑
      handleEditName(row){
        this.editId = row ? row.id : ''
        this.nameInfo.oldName = row.name ? row.name : ''
        this.visible.nameModal = true
      },
      // 获取热门游戏
      async getHotgame() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/game/newHot',
          method: 'GET',
          params: {
            // type: 'hot'
          }
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.dataSource = res.data
        this.uidList = []
        this.sortInfo.sort = ''
      },
      // 确认按钮
      async handleConfirmIcon() {
        this.loading.modalButton = true
        // await this.$refs.uploadImg.upload()
        this.$nextTick(() => {
          this.sureEditIcon()
        })
      },
      // 确认编辑图标
      async sureEditIcon() {
        if (!this.gameIcon) {
          this.loading.modalButton = false
          return this.$msg({
            type: 'error',
            message: this.i18n_lang.gameManage16
          })
        }
        const req = {
          id: this.editId,
          type: 'p',
          img: this.gameIcon
        }
        // this.type === 'c' ? (req.img = this.gameIcon) : (req.game_img = this.gameIcon)
        const res = await this.$axios.request({
          url: '/game/newHot',
          method: 'POST',
          data: req
        })
        this.loading.modalButton = false
        this.visible.imageModal = false
        if (res.status !== 200) {
          return this.$msg({
            type: 'error',
            message: res.message
          })
        }
        this.$msg({
          type: 'success',
          message: res.message
        })
        this.getHotgame()
      },
      // 名称编辑
      async nameSave(){
        this.$refs['nameInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const req = {
              id: this.editId,
              type: 'p',
              name: this.nameInfo.newName
            }
            const res = await this.$axios.request({
              url: '/game/newHot/name',
              method: 'POST',
              data: req
            })
            this.loading.btn = false
            if (res.status !== 200) {
              return this.$msg({
                type: 'error',
                message: res.message
              })
            }
            this.$msg({
              type: 'success',
              message: res.message
            })
            this.visible.nameModal = false
            this.getHotgame()
          }
        })
      },
      // 开启/关闭游戏
      async handleStatus(row) {
        this.loading.page = true
        const res = await this.$axios.request({
          url: `/game/newHot`,
          method: 'PATCH',
          data: {
            alias: row.alias,
            status: row.status === 'enabled' ? 'disabled' : 'enabled',
            type: 'p'
          }
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.$msg({
          type: 'success',
          message: `${this.i18n_lang.gameManage19}${row.status === 'enabled' ? this.i18n_lang.gameManage20 : this.i18n_lang.gameManage21}`
        })
        this.getHotgame()
      },
      // 保存排序修改
      async SaveSort() {
        this.loading.btn = true
        this.$refs['sortForm'].validate(async valid => {
          if (!valid) {
            this.loading.btn = false
          } else {
            const req = {
              ...this.sortInfo,
              ids: this.uidList,
              type: `hotgame`
            }
            const res = await this.$axios.request({
              url: `/sort`,
              method: 'POST',
              data: req
            })
            this.loading.btn = false
            this.$msg({
              type: res.status !== 200 ? 'error' : 'success',
              message: res.message
            })
            if (res.status !== 200) return
            this.visible.sort = false
            this.getHotgame()
          }
        })
      },
      async editOddChange(val, key, row){
        this.sortInfo.sort = val
        let rowArrar = []
        rowArrar.push(row.id)
        const req = {
          ...this.sortInfo,
          ids: rowArrar,
          type: `hotgame`
        }
        const res = await this.$axios.request({
          url: `/sort`,
          method: 'POST',
          data: req
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getHotgame()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
