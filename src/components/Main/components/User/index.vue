<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userInfo.avatar || avatar" />
      <span class="user-name">{{ userInfo.username }}</span>
      <Icon :size="18" type="md-arrow-dropdown" />
      <DropdownMenu slot="list">
        <DropdownItem name="changepw">{{i18n_lang.components28}}</DropdownItem>
        <DropdownItem name="logout">{{i18n_lang.components29}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <!-- 修改密码 -->
    <Modal
      v-model="visible.password"
      :title="i18n_lang.components30"
      :loading="loading.password"
      @on-ok="changePassword"
    >
      <Spin v-if="loading.password" fix></Spin>
      <Form
        v-if="visible.password"
        ref="passwordForm"
        :model="passwordForm"
        :label-width="80"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.components31" prop="old"> <Input v-model="passwordForm.old" /> </FormItem>
        <FormItem :label="i18n_lang.components32" prop="new"> <Input v-model="passwordForm.new" /> </FormItem>
        <FormItem :label="i18n_lang.components33" prop="newRe"> <Input v-model="passwordForm.newRe" /> </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import './index.less'
import avatar from '@/assets/images/avatar.jpg'

const initPassword = {
  old: '',
  new: '',
  newRe: ''
}

export default {
  name: 'User',
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          avater: '',
          username: ''
        }
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      avatar,
      loading: {
        password: false
      },
      visible: {
        password: false
      },
      passwordForm: { ...initPassword }, // 修改密码
      ruleValidate: {
        old: [{ required: true, message: i18n_lang.components34, trigger: 'blur' }],
        new: [{ required: true, message: i18n_lang.components35, trigger: 'blur' }],
        newRe: [
          { required: true, message: i18n_lang.components36, trigger: 'blur' },
          {
            validator: (rule, value, cb) =>
              this.passwordForm.new === this.passwordForm.newRe ? cb() : cb(i18n_lang.components37)
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      handleLogOut: 'user/handleLogOut'
    }),
    handleClick(name) {
      switch (name) {
        case 'logout':
          // 关闭所有，除了home
          this.$emit(
            'on-close',
            this.list.filter(item => item.name === this.$config.homeName),
            'all'
          )
          this.handleLogOut()
          break
        case 'changepw':
          this.passwordForm = { ...initPassword }
          this.visible.password = true
          break
      }
    },
    async changePassword() {
      this.$refs['passwordForm'].validate(async valid => {
        if (!valid) return
        this.loading.password = true
        const req = {
          'new-pw': this.passwordForm.new,
          'old-pw': this.passwordForm.old,
          user_name: this.userInfo.username
        }
        const res = await this.$axios.request({
          url: `/admin/pw/${this.userInfo.id}`,
          method: 'PATCH',
          data: req
        })
        this.loading.password = false
        this.$msg({
          type: res.status !== 200 || res.state === 11050 || res.state === 11051 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200 || res.state === 11050 || res.state === 11051) return
        this.visible.password = false
      })
    }
  }
}
</script>
