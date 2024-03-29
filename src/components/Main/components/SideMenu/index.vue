<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      v-show="!collapsed"
      ref="menu"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-for="item in displayMenuList">
        <template v-if="item.children && item.children.length === 1">
          <SideMenuItem v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"/>
          <MenuItem v-else :key="`menu-${item.children[0].name}`" :name="getNameOrHref(item, true)">
            <CommonIcon :type="item.children[0].icon || ''"/>
            <span>{{ showTitle(item.children[0]) }}</span>
          </MenuItem>
        </template>
        <template v-else>
          <SideMenuItem v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"/>
          <MenuItem v-else :key="`menu-${item.name}`" :name="getNameOrHref(item)">
            <CommonIcon :type="item.icon || ''"/>
            <span>{{ showTitle(item) }}</span>
          </MenuItem>
        </template>
      </template>
    </Menu>
    <div v-show="collapsed" class="menu-collapsed" :list="displayMenuList">
      <template v-for="item in displayMenuList">
        <CollapsedMenu
          v-if="item.children && item.children.length > 1"
          :key="`drop-menu-${item.name}`"
          hide-title
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :theme="theme"
          :parent-item="item"
          @on-click="handleSelect"
        />
        <Tooltip
          v-else
          :key="`drop-menu-${item.name}`"
          transfer
          :content="
            (item.meta && item.meta.title) ||
              (item.children && item.children[0] && item.children[0].meta.title)
          "
          placement="right"
        >
          <a
            class="drop-menu-a"
            :style="{ textAlign: 'center' }"
            @click="handleSelect(getNameOrHref(item, true))"
          >
            <CommonIcon
              :size="rootIconSize"
              :color="textColor"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './SideMenuItem.vue'
import CollapsedMenu from './CollapsedMenu.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  mixins: [mixin],
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openedNames: []
    }
  },
  computed: {
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060'
    },
    displayMenuList() {
      return this.menuList.filter(item => item.children.length)
    }
  },
  watch: {
    activeName(name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames(newNames) {
      this.openedNames = newNames
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted() {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  },
  methods: {
    handleSelect(name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName(name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  }
}
</script>
<style lang="less">
@import './index.less';
</style>
