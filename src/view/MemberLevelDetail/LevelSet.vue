<template>
  <div id="LevelSet">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Form ref="dataForm" :model="dataSource" :rules="ruleValidate">
      <div class="tab_box">
        <p class="title">{{i18n_lang.memberLevelDetail4}}</p>
        <Row class="container">
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail5}}</p>
              <span v-if="$route.query.id">{{ dataSource.name }}</span>
              <span v-else>LV{{ addLevel }}</span>
            </div>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail6}}</p>
              <span>
                <FormItem prop="deposit_money">
                  <Input
                    v-model="dataSource.deposit_money"
                    style="width: 120px"
                    :disabled="dataSource.level === 1"
                  />
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail7}}</p>
              <span>
                <FormItem prop="lottery_money">
                  <Input
                    v-model="dataSource.lottery_money"
                    style="width: 120px"
                    :disabled="dataSource.level === 1"
                  />
                </FormItem>
              </span>
            </div>
          </Col>
        </Row>

        <p class="title">
          {{i18n_lang.memberLevelDetail8}}
          <span style="font-size:14px">{{i18n_lang.memberLevelDetail9}}</span>
        </p>
        <p style="width:600px;">
          <FormItem prop="icon">
            <UploadImg ref="uploadImg" v-model="dataSource.icon"></UploadImg>
          </FormItem>
        </p>
        <p class="title">{{i18n_lang.memberLevelDetail90_v1_2_7_6}}</p>
        <div style="overflow: hidden;background-color: #f8f8f9;">
          <div style="width: calc(100% / 3);float: left;">
            <p style="line-height: 36px;">{{i18n_lang.memberLevelDetail91_v1_2_7_6}}</p>
            <FormItem prop="level_background">
              <UploadImg ref="uploadImg" v-model="dataSource.level_background"></UploadImg>
            </FormItem>
          </div>
          <div style="width: calc(100% / 3);float: left;">
            <FormItem prop="background">
              <p style="line-height: 36px;">{{i18n_lang.memberLevelDetail92_v1_2_7_6}}</p>
              <UploadImg ref="uploadImg" v-model="dataSource.background"></UploadImg>
            </FormItem>
          </div>
          <div style="width: calc(100% / 3);float: left;">
            <FormItem prop="split_line">
              <p style="line-height: 36px;">{{i18n_lang.memberLevelDetail115_v1_2_7_6}}</p>
              <UploadImg ref="uploadImg" v-model="dataSource.split_line"></UploadImg>
            </FormItem>
          </div>
        </div>
        <FormItem prop="font_color" style="margin-top: 20px;">
          <span style="font-size: 18px;">{{i18n_lang.memberLevelDetail116_v1_2_7_6}}</span>
          <ColorPicker v-model="font_color" />
        </FormItem>
        <!-- <p class="title">{{i18n_lang.memberLevelDetail116_v1_2_7_6}} <ColorPicker v-model="dataSource.font_color" /></p> -->
        <!-- <p class="title">{{i18n_lang.memberLevelDetail10}}</p>
        <Row class="container">
          <Col span="12">
            <div class="item">
              <p style="display: block;">{{i18n_lang.memberLevelDetail11}}</p>
            </div>
            <p style="width:440px;">
              <MoreOptionCheck
                v-model="dataSource.online"
                :option-data="online_channel"
                option-label="name"
                option-key="name"
              ></MoreOptionCheck>
            </p>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail12}}</p>
              <span>
                <Input v-model="dataSource.online_dml_percent" style="width: 120px"/>
              </span>
            </div>
          </Col>
        </Row>
        <Row class="container">
          <Col span="12">
            <div class="item">
              <p style="display: block;">{{i18n_lang.memberLevelDetail13}}</p>
            </div>
            <p style="width:440px;" class="special">
              <MoreOptionCheck
                v-model="dataSource.offline"
                :option-data="offline_channel"
                option-label="name"
                option-key="id"
              ></MoreOptionCheck>
            </p>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail14}}</p>
              <span>
                <Input v-model="dataSource.offline_dml_percent" style="width: 120px"/>
              </span>
            </div>
          </Col>
        </Row> -->
        <p class="title">
          {{i18n_lang.memberLevelDetail15}}
          <span class="red">{{i18n_lang.memberLevelDetail16}}</span>
        </p>
        <Row class="container">
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail17}}</p>
              <span>
                <FormItem prop="promote_handsel">
                  <Input
                    v-model="dataSource.promote_handsel"
                    style="width: 120px"
                    :disabled="dataSource.level === 1"
                  />
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail18}}</p>
              <span>
                <FormItem prop="transfer_handsel">
                  <Input v-model="dataSource.transfer_handsel" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail19}}</p>
              <span>
                <FormItem prop="upgrade_dml_percent">
                  <Input v-model="dataSource.upgrade_dml_percent" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail20}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <!-- <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail83}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count.bronze" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail84}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count.sliver" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail85}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count.gold" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col> -->
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail93_v1_2_7_6}}</p>
              <span>
                <FormItem prop="monthly_money">
                  <Input v-model="dataSource.monthly_money" style="width: 120px"></Input>
                </FormItem>
              </span>
              <div class="ReleasePrompt">{{i18n_lang.memberLevelDetail89_v1_2_6_2}}</div>
            </div>
          </Col>
          <!-- <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail22}}</p>
              <span>
                <FormItem prop="monthly_percent">
                  <Input v-model="dataSource.monthly_percent" style="width: 120px"></Input>
                </FormItem>
              </span>
              <template>
                <Tooltip max-width="200">
                  <Icon type="ios-help-outline" size="20"></Icon>
                  <div slot="content" class="tipBox">
                    <span>{{i18n_lang.memberLevelDetail23}}</span>
                    <br>
                    <span>{{i18n_lang.memberLevelDetail24}}</span>
                    <br>
                    <span>{{i18n_lang.memberLevelDetail25}}</span>
                  </div>
                </Tooltip>
              </template>
            </div>
          </Col> -->
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail94_v1_2_7_6}}</p>
              <span>
                <FormItem prop="monthly_money">
                  {{i18n_lang.memberLevelDetail87}}>=<Input v-model="dataSource.monthly_recharge" style="width: 120px"></Input>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail88}}</p>
              <span>
                <FormItem prop="bankcard_sum">
                  <Input v-model="dataSource.bankcard_sum" style="width: 120px"></Input>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail95_v1_2_7_6}}</p>
              <span>
                <FormItem prop="monthly_money">
                  <Input v-model="week_money" @on-keyup="clearNoNum(`week_money`)" style="width: 120px"></Input>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail96_v1_2_7_6}}</p>
              <span>
                <FormItem prop="monthly_money">
                  {{i18n_lang.memberLevelDetail87}}>=<Input v-model="dataSource.week_recharge" @on-keyup="clearNoNum('dataSource', 'week_recharge', true)" style="width: 120px"></Input>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="12">
            <div class="item">
              <p style="float: left;line-height: 30px;">{{i18n_lang.memberLevelDetail97_v1_2_7_6}}</p>
              <span style="float: left;">
                <FormItem prop="monthly_money">
                  <Select v-model="dataSource.week_award_day" style="width: 168px;float: left;">
                    <Option v-for="item in weekList" :key="item.id" :value="item.id">{{ item.name }}</Option>
                  </Select>
                  <BackWaterTimePicker
                    :value="dataSource.week_award_time"
                    @changeTime="changeTime"
                    :disabled-minutes="disabled_minutes"
                    :disabled-seconds="disabled_seconds"
                    :timeType="'week'"
                    style="float: left;margin-left: 10px;"
                  ></BackWaterTimePicker>
                </FormItem>
              </span>
            </div>
          </Col>
        </Row>
        <p class="title">
          {{i18n_lang.memberLevelDetail98_v1_2_7_6}}
        </p>
        <Row class="container">
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail99_v1_2_7_6}}</p>
              <span>
                <FormItem prop="fee">
                  <Input v-model="dataSource.fee" @on-keyup="clearNoNum('dataSource', 'fee', true)" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail100_v1_2_7_6}}</p>
              <span>
                <FormItem prop="transfer_handsel">
                  <Input v-model="dataSource.welfare.withdraw_day_times"  @on-keyup="clearNoNum('dataSource', 'welfare', false)" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail101_v1_2_7_6}}</p>
              <span>
                <FormItem prop="transfer_handsel">
                  <Input v-model="dataSource.welfare.withdraw_min" style="width: 60px"/>
                  <span>-</span>
                  <Input v-model="dataSource.welfare.withdraw_max" style="width: 60px"/>
                </FormItem>
              </span>
              <div class="ReleasePrompt">{{i18n_lang.memberLevelDetail111_v1_2_7_6}}</div>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail102_v1_2_7_6}}</p>
              <span>
                <FormItem prop="transfer_handsel">
                  <Input v-model="dataSource.welfare.bank_withdraw_min" style="width: 60px"/>
                  <span>-</span>
                  <Input v-model="dataSource.welfare.bank_withdraw_max" style="width: 60px"/>
                </FormItem>
              </span>
              <div class="ReleasePrompt">{{i18n_lang.memberLevelDetail112_v1_2_7_6}}</div>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail103_v1_2_7_6}}</p>
              <span>
                <FormItem prop="transfer_handsel">
                  <Input v-model="dataSource.welfare.daily_withdraw_max" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
    <Row>
      <Poptip
        confirm
        :title="
          `${i18n_lang.memberLevelDetail26}${
            $route.query.id ? `${i18n_lang.memberLevelDetail27}${dataSource.name}` : `${i18n_lang.memberLevelDetail28}${addLevel}`
          }${i18n_lang.memberLevelDetail29}`
        "
        placement="top-start"
        style="margin-left:20px;"
        @on-ok="save"
      >
        <Button type="primary">{{i18n_lang.memberLevelDetail26}}</Button>
      </Poptip>
    </Row>
  </div>
</template>
<script>
import MoreOptionCheck from '_c/MoreOptionCheck'
import UploadImg from '_c/UploadImg'
import { MathDiv, MathMul } from '@/libs/formatMath'
import BackWaterTimePicker from '_c/TimePicker'

const initData = {
  name: '', // 等级
  deposit_money: '', // 最低充值金额
  lottery_money: '', // 投注量
  icon: '', // 图标
  // online: [], // 线上充值渠道
  // online_dml_percent: 0, // 线上充值打码量
  // offline: [], // 线下充值渠道
  // offline_dml_percent: 0, // 线下充值打码量
  upgrade_dml_percent: '', // 提现打码量
  promote_handsel: '', // 晋升彩金
  transfer_handsel: '', // 转卡彩金%

  draw_count: '' ,// 活动免费抽奖次数
  monthly_recharge: '',//月俸禄充值条件
  bankcard_sum: "" ,//银行卡绑定数

  level_background: "", //等级背景图片
  background: "",//奖励背景图片
  split_line: "",//分割线图片
  font_color: "",//文字颜色
  week_money: "",//周薪
  welfare: {
    withdraw_day_times: "",//(每日取款次数)
    withdraw_min: "",
    withdraw_max: "",//(G卡和maya单次取款额)
    bank_withdraw_min: "",
    bank_withdraw_max: "",//(银行卡单次取款额)
    daily_withdraw_max: "",//(每日取款总额度)'
  } ,//'福利特权
  fee: "",//'提款手续费',
  week_recharge: "" ,//'周薪充值条件，分为单位'
  week_award_day: "",//周 时间 日
  week_award_time: "",//周 时间
}
export default {
  components: {
    MoreOptionCheck,
    UploadImg,
    BackWaterTimePicker
  },
  data() {
    const i18n_lang = this.$t('memberLevelDetail');
    return {
      i18n_lang: i18n_lang,
      dataSource: { ...initData },
      online_channel: [],
      offline_channel: [],
      loading: {
        page: false
      },
      addLevel: '',
      ruleValidate: {
        deposit_money: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail30
          }
        ],
        lottery_money: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail31
          }
        ],
        icon: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail32
          }
        ],
        monthly_money: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail33
          }
        ],
        monthly_percent: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail34
          }
        ],
        fee: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail114_v1_2_7_6
          }
        ],
        bankcard_sum: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail113_v1_2_7_6
          }
        ]
      },
      weekList: [
        {
          id: "7",
          name: `${i18n_lang.memberLevelDetail104_v1_2_7_6}`
        },
        {
          id: "1",
          name: `${i18n_lang.memberLevelDetail105_v1_2_7_6}`
        },
        {
          id: "2",
          name: `${i18n_lang.memberLevelDetail106_v1_2_7_6}`
        },
        {
          id: "3",
          name: `${i18n_lang.memberLevelDetail107_v1_2_7_6}`
        },
        {
          id: "4",
          name: `${i18n_lang.memberLevelDetail108_v1_2_7_6}`
        },
        {
          id: "5",
          name: `${i18n_lang.memberLevelDetail109_v1_2_7_6}`
        },
        {
          id: "6",
          name: `${i18n_lang.memberLevelDetail110_v1_2_7_6}`
        }
      ],
      timeValue: "10:00:00",
      disabled_minutes: Array.from(Array(60)).map((u, i) => i),
      disabled_seconds: Array.from(Array(60)).map((u, i) => i),
      week_money: "",
      font_color: ""
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 输入数字
    clearNoNum(text, parameter, Boolean_text){
      // this[text] = this[text].replace(/\D/g, "")
      if(text && text != "dataSource"){
        this[text] = this[text].replace(/[^\d.]/g,"")
        this[text] = this[text].replace(/^\./g,"")
        this[text] = this[text].replace(/\.{2,}/g,".")
        this[text] = this[text].replace(".","$#$").replace(/\./g,"").replace("$#$",".")
        this[text] = this[text].replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
        if(this[text].indexOf(".")< 0 && this[text] != ""){
          if(this[text].substr(0,1) == '0' && this[text].length == 2){
            this[text] = parseFloat(this[text])
          }
        }
      }
      if(text == 'dataSource' && parameter != 'welfare'){
        if(Boolean_text){
          // this[text][parameter] = this[text][parameter].replace(/\D/g, "")
          this[text][parameter] = this[text][parameter].replace(/[^\d.]/g,"")
          this[text][parameter] = this[text][parameter].replace(/^\./g,"")
          this[text][parameter] = this[text][parameter].replace(/\.{2,}/g,".")
          this[text][parameter] = this[text][parameter].replace(".","$#$").replace(/\./g,"").replace("$#$",".")
          this[text][parameter] = this[text][parameter].replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
          if(this[text][parameter].indexOf(".")< 0 && this[text][parameter] != ""){
            if(this[text][parameter].substr(0,1) == '0' && this[text][parameter].length == 2){
              this[text][parameter] = parseFloat(this[text][parameter])
            }
          }
        }else{
          this[text][parameter] = this[text][parameter].replace(/\D/g, "")
        }
      }
      if(text == 'dataSource' && parameter == 'welfare'){
        this[`dataSource`][parameter][`withdraw_day_times`] = this[`dataSource`][parameter][`withdraw_day_times`].replace(/\D/g, "")
      }
    },
    // 周月流水 start
    changeTime(time) {//选择返水时间
      this.dataSource.week_award_time = time
    },
    async init() {
      this.loading.page = true
      await this.getChannel()
      if (this.$route.query.id) {
        this.getEditData()
      }
      this.loading.page = false
    },
    // 获取线上线下渠道
    async getChannel() {
      const res = await this.$axios.request({
        url: '/level/paySet',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.online_channel = res.data.online
      res.data.offline.map(x => {
        x.name = `${x.type}-${x.name}`
      })
      this.offline_channel = res.data.offline
      this.addLevel = res.data.level
    },
    // 获取edit数据
    async getEditData() {
      const query = {
        id: this.$route.query.id
      }
      const res = await this.$axios.request({
        url: '/memberslevel',
        method: 'GET',
        params: query
      })

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.dataSource = { ...initData }
      this.dataSource = res.data[0]
      this.dataSource.split_line = this.dataSource.split_line ? this.dataSource.split_line : ""
      this.font_color = this.dataSource.font_color ? this.dataSource.font_color : ""
      // this.solveBug()
      this.dataSource.lottery_money = MathDiv(this.dataSource.lottery_money, 100)
      this.dataSource.deposit_money = MathDiv(this.dataSource.deposit_money, 100)
      this.dataSource.promote_handsel = MathDiv(this.dataSource.promote_handsel, 100)
      // this.dataSource.online_dml_percent = MathDiv(this.dataSource.online_dml_percent, 100)
      // this.dataSource.offline_dml_percent = MathDiv(this.dataSource.offline_dml_percent, 100)
      // this.dataSource.online_dml_percent = 0
      // this.dataSource.offline_dml_percent = 0
      this.dataSource.upgrade_dml_percent = MathDiv(this.dataSource.upgrade_dml_percent, 100)
      this.dataSource.transfer_handsel = MathDiv(this.dataSource.transfer_handsel, 100)
      this.dataSource.monthly_money = MathDiv(this.dataSource.monthly_money, 100)
      this.dataSource.monthly_percent = MathDiv(this.dataSource.monthly_percent, 100)
      this.dataSource.monthly_recharge = MathDiv(this.dataSource.monthly_recharge, 100)
      this.week_money = MathDiv(this.dataSource.week_money, 100)
      this.dataSource.week_recharge = MathDiv(this.dataSource.week_recharge, 100)
      this.dataSource.welfare.withdraw_min = this.dataSource.welfare && this.dataSource.welfare.withdraw_min ? MathDiv(this.dataSource.welfare.withdraw_min, 100) : 0
      this.dataSource.welfare.withdraw_max = this.dataSource.welfare && this.dataSource.welfare.withdraw_max ? MathDiv(this.dataSource.welfare.withdraw_max, 100) : 0
      this.dataSource.welfare.bank_withdraw_min = this.dataSource.welfare && this.dataSource.welfare.bank_withdraw_min ? MathDiv(this.dataSource.welfare.bank_withdraw_min, 100) : 0
      this.dataSource.welfare.bank_withdraw_max = this.dataSource.welfare && this.dataSource.welfare.bank_withdraw_max ? MathDiv(this.dataSource.welfare.bank_withdraw_max, 100) : 0
      this.dataSource.welfare.daily_withdraw_max = this.dataSource.welfare && this.dataSource.welfare.daily_withdraw_max ? MathDiv(this.dataSource.welfare.daily_withdraw_max, 100) : 0
    },
    //  把需要编辑的列表的线下支付字段改成id
    solveBug() {
      this.offline_channel.map(x => {
        const index = this.dataSource.offline.indexOf(x.name)
        if (index >= 0) {
          this.dataSource.offline[index] = x.id
        }
      })
    },
    async save() {
      // await this.$refs.uploadImg.upload()

      this.$nextTick(() => {
        this.$refs['dataForm'].validate(async valid => {
          if (!valid) return
          this.loading.page = true
          let method = ''
          let URL = ''
          const req = {
            ...this.dataSource
          }
          req.welfare = {
            ...this.dataSource.welfare
          }
          req.font_color = this.font_color
          req.lottery_money = MathMul(req.lottery_money, 100)
          req.deposit_money = MathMul(req.deposit_money, 100)
          req.promote_handsel = MathMul(req.promote_handsel, 100)
          // req.online_dml_percent = MathMul(req.online_dml_percent, 100)
          // req.offline_dml_percent = MathMul(req.offline_dml_percent, 100)
          req.online_dml_percent = 0
          req.offline_dml_percent = 0
          req.upgrade_dml_percent = MathMul(req.upgrade_dml_percent, 100)
          req.transfer_handsel = MathMul(req.transfer_handsel, 100)
          req.monthly_money = MathMul(req.monthly_money, 100)
          req.monthly_percent = MathMul(req.monthly_percent, 100)
          req.monthly_recharge = MathMul(req.monthly_recharge, 100)
          req.week_money = MathMul(this.week_money, 100)
          req.week_recharge = MathMul(req.week_recharge, 100)
          req.welfare.withdraw_min = MathMul(req.welfare.withdraw_min, 100)
          req.welfare.withdraw_max = MathMul(req.welfare.withdraw_max, 100)
          req.welfare.bank_withdraw_min = MathMul(req.welfare.bank_withdraw_min, 100)
          req.welfare.bank_withdraw_max = MathMul(req.welfare.bank_withdraw_max, 100)
          req.welfare.daily_withdraw_max = MathMul(req.welfare.daily_withdraw_max, 100)

          if (this.$route.query.id) {
            method = 'PUT'
            URL = `/memberslevel/${this.$route.query.id}`
          } else {
            method = 'POST'
            URL = `/memberslevel`
            req.level = this.addLevel
            req.name = `LV${this.addLevel}`
          }
          const res = await this.$axios.request({
            url: URL,
            method: method,
            data: req
          })
          this.loading.page = false
          this.$msg({
            type: res.status !== 200 || res.state != 0 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200 || res.state != 0) return
          if (this.$route.query.id) {
            this.getEditData()
          } else {
            this.$router.push('/admin/memberLevel?back')
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
#LevelSet {
  padding-bottom: 20px;
  .container {
    padding: 0 40px;
  }
  .ReleasePrompt{
    color: red;
    font-size: 14px;
    padding-bottom: 15px;
  }
  /deep/ .ivu-row {
    .item {
      min-height: 94px;
      margin-bottom: 18px;
      &>p,
      &>span {
        font-size: 14px;
        display: inline-block;
        line-height: 28px;
        color: rgb(153, 153, 153);
        min-width: 70px;
        margin-right: 5px;
      }

      &>span {
        color: rgb(51, 51, 51);
        margin-left: 8px;
      }
    }
  }
}
</style>
