<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div>
      <!-- 直推总开关 -->
      <div class="setting_content">
        <p class="title title_left">{{i18n_lang.directPushSetting3}}</p>
        <div class="switch_content">
          <span @click="switchHandle(false)">{{i18n_lang.directPushSetting4}}</span>
          <Switch v-model="direct_switch" @on-change="switchChange"></Switch>
          <span @click="switchHandle(true)">{{i18n_lang.directPushSetting5}}</span>
        </div>
      </div>
      <!-- 直推现金奖励 -->
      <div class="setting_content">
        <p class="title">{{i18n_lang.directPushSetting6}}</p>
        <div>
          <div class="table_tr">
            <div>{{i18n_lang.directPushSetting7}}</div>
            <div>{{i18n_lang.directPushSetting8}}</div>
            <div>{{i18n_lang.directPushSetting9}}</div>
            <div>{{i18n_lang.directPushSetting10}}</div>
            <div>{{i18n_lang.directPushSetting11}}</div>
          </div>
          <div class="table_th" v-for="(item, index) in cashBonusList" :key="index">
            <div>
              <span>{{ item.name }}</span>
            </div>
            <div>
              <span v-if="isCompileCashBonus !== index || isCompileCashBonus !== 3">{{ index === 3  ? item.recharge_amount : '/'}}</span>
              <Input v-model="item.recharge_amount" @on-keyup="clearNoNum('recharge_amount', 'cashBonusList', index)" placeholder v-if="isCompileCashBonus === index && index === 3"/>
            </div>
            <div>
              <span v-if="isCompileCashBonus !== index">{{  item.send_amount }}</span>
              <Input v-model="item.send_amount" @on-keyup="clearNoNum('send_amount', 'cashBonusList', index)" placeholder v-if="isCompileCashBonus === index"/>
            </div>
            <div>
              <span v-if="isCompileCashBonus !== index">{{ item.get_limit }}</span>
              <Input v-model="item.get_limit" @on-keyup="clearNoNum('get_limit', 'cashBonusList', index)" placeholder v-if="isCompileCashBonus === index"/>
            </div>
            <div>
              <div style="display: inline-block;overflow: hidden;">
                <Button type='primary' size='small' style='float: left;' @click="compileCashBonus(index)" v-if="isCompileCashBonus !== index">{{i18n_lang.directPushSetting12}}</Button>
                <!-- <Poptip confirm :title="`${i18n_lang.directPushSetting13}`" @on-ok="deleteCashBonus(index)" style='float: left;margin-left: 5px;' v-if="isCompileCashBonus !== index">
                  <Button type='error' size='small'>{{i18n_lang.directPushSetting14}}</Button>
                </Poptip> -->
              </div>
              <div style="display: inline-block;overflow: hidden;">
                <Button type='primary' size='small' @click="directConfig()" style='float: left;' v-if="isCompileCashBonus === index">{{i18n_lang.directPushSetting15}}</Button>
                <Button type='primary' size='small' @click="cancelBtn('isCompileCashBonus')" style='float: left;margin-left: 5px;' v-if="isCompileCashBonus === index">{{i18n_lang.directPushSetting16}}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 赠送打码量百分比% -->
      <div class="setting_content">
        <p class="title title_left">{{i18n_lang.directPushSetting89}}</p>
        <Input v-model="send_dml" :placeholder="`${i18n_lang.directPushSetting18}`" style="width: 150px;margin-left: 20px;"/>
        <Button type='primary' size='small' @click="inputSendDml()" style="margin-left: 10px;">{{i18n_lang.directPushSetting15}}</Button>
      </div>
      <!-- 直推返水奖励 -->
      <div class="setting_content">
        <p class="title">{{i18n_lang.directPushSetting19}} <Button type="primary" icon="md-add" @click="addReturnReward()" style="float: right;">{{i18n_lang.directPushSetting20}}</Button></p>
        <div>
          <div class="table_tr table_tr_7">
            <div>{{i18n_lang.directPushSetting21}}</div>
            <div>{{i18n_lang.directPushSetting22}}</div>
            <div>{{i18n_lang.directPushSetting23}}</div>
            <div>{{i18n_lang.directPushSetting107_v_1_2_7_4}}</div>
            <div>{{i18n_lang.directPushSetting108_v_1_2_7_4}}</div>
            <div>{{i18n_lang.directPushSetting109_v_1_2_7_4}}</div>
            <div>{{i18n_lang.directPushSetting11}}</div>
          </div>
          <div class="table_th table_th_7" v-for="(item, index) in returnRewardList" :key="index">
            <div>
              <span>{{ item.serial_no }}</span>
            </div>
            <div>
              <span v-if="isReturnReward !== index">{{ item.register_count }}</span>
              <Input v-model="item.register_count" @on-keyup="clearNoNum('register_count',  'returnRewardList', index)" v-if="isReturnReward === index"/>
            </div>
            <div>
              <span v-if="isReturnReward !== index">{{ item.recharge_count }}</span>
              <Input v-model="item.recharge_count" @on-keyup="clearNoNum('recharge_count', 'returnRewardList', index)" v-if="isReturnReward === index"/>
            </div>
            <div>
              <span v-if="isReturnReward !== index">{{ item.bkge_increase ? `${item.bkge_increase}%` : '0%' }}</span>
              <Input v-model="item.bkge_increase" @on-keyup="clearNoNum('bkge_increase', 'returnRewardList', index)" v-if="isReturnReward === index"/>
            </div>
            <div>
              <span v-if="isReturnReward !== index">{{ item.bkge_increase_week ? `${item.bkge_increase_week}%` : '0%' }}</span>
              <Input v-model="item.bkge_increase_week" @on-keyup="clearNoNum('bkge_increase_week', 'returnRewardList', index)" v-if="isReturnReward === index"/>
            </div>
            <div>
              <span v-if="isReturnReward !== index">{{ item.bkge_increase_month ? `${item.bkge_increase_month}%` : '0%' }}</span>
              <Input v-model="item.bkge_increase_month" @on-keyup="clearNoNum('bkge_increase_month', 'returnRewardList', index)" v-if="isReturnReward === index"/>
            </div>
            <div>
              <div style="display: inline-block;overflow: hidden;">
                <Button type='primary' size='small' style='float: left;' @click="compileReturnReward(index)" v-if="isReturnReward !== index">{{i18n_lang.directPushSetting12}}</Button>
                <Poptip confirm :title="`${i18n_lang.directPushSetting13}`" @on-ok="deleteReturnReward(item, index)" style='float: left;margin-left: 5px;' v-if="isReturnReward !== index">
                  <Button type='error' size='small'>{{i18n_lang.directPushSetting14}}</Button>
                </Poptip>
              </div>
              <div style="display: inline-block;overflow: hidden;">
                <Button type='primary' size='small' @click="saveReturnReward(item)" style='float: left;' v-if="isReturnReward === index">{{i18n_lang.directPushSetting15}}</Button>
                <Button :type="item.is_add ? 'error' : 'primary'" size='small' @click="item.is_add ? deleteReturnReward(item, index) : cancelBtn('isReturnReward')" style='float: left;margin-left: 5px;' v-if="isReturnReward === index">{{item.is_add ? i18n_lang.directPushSetting14 : i18n_lang.directPushSetting16}}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 推广文本管理 -->
      <div class="setting_content">
        <p class="title">{{i18n_lang.directPushSetting90}}</p>
        <div>
          <div class="table_tr table_tr_3">
            <div>{{i18n_lang.directPushSetting91}}</div>
            <div>{{i18n_lang.directPushSetting92}}</div>
            <div>{{i18n_lang.directPushSetting93}}</div>
          </div>
          <div class="table_th table_th_3">
            <div>
              <span>{{i18n_lang.directPushSetting94}}</span>
            </div>
            <div>
              <span class="th_span" :title="direct_content.length >= 90 ? `${direct_content}` : ''" v-if="!isCompileDirectContent">
                {{direct_content.length >= 90 ? `${direct_content.substring(0, 90)}...` : direct_content}}
                <!-- <span>{{direct_content}}</span> -->
              </span>
              <Input v-model="direct_content" v-if="isCompileDirectContent"/>
            </div>
            <div>
              <div style="display: inline-block;overflow: hidden;">
                <Button type='primary' size='small' style='float: left;' @click="isCompileDirectContent = true" v-if="!isCompileDirectContent">{{i18n_lang.directPushSetting12}}</Button>
              </div>
              <div style="display: inline-block;overflow: hidden;">
                <Button type='primary' size='small' @click="directConfig()" style='float: left;' v-if="isCompileDirectContent">{{i18n_lang.directPushSetting15}}</Button>
                <Button type='primary' size='small' @click="cancelBtn('isCompileDirectContent')" style='float: left;margin-left: 5px;' v-if="isCompileDirectContent">{{i18n_lang.directPushSetting16}}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 直推相关图片管理 -->
      <div class="setting_content">
        <p class="title">{{i18n_lang.directPushSetting26}}</p>
        <Table ref="table" border :columns="directPushPicture" :data="directPushPictureList"></Table>
      </div>
      <!-- 图片管理弹窗 -->
      <Modal v-model="visible.handle" :title="`${i18n_lang.directPushSetting26}`">
        <Form ref="handleForm" :model="handleImage" :label-width="100" :rules="handleRule">
          <FormItem :label="`${i18n_lang.directPushSetting27}`" prop="name">
            <Input v-model="handleImage.name" :placeholder="``"></Input>
          </FormItem>
          <FormItem :label="`${i18n_lang.directPushSetting28}`" prop="type">
            <Select v-model="handleImage.type" style="width:100px" disabled>
              <Option value='normal'>{{i18n_lang.directPushSetting51}}</Option>
              <Option value='promotion_rule'>{{i18n_lang.directPushSetting29}}</Option>
              <Option value='bkge_rule'>{{i18n_lang.directPushSetting30}}</Option>
              <Option value='user_promotion'>{{i18n_lang.directPushSetting31}}</Option>
              <Option value='be_pushed'>{{i18n_lang.directPushSetting32}}</Option>
              <Option value='register_finish'>{{i18n_lang.directPushSetting33}}</Option>
              <Option value='index_promotion'>{{i18n_lang.directPushSetting34}}</Option>
              <Option value='no_bind'>{{i18n_lang.directPushSetting35}}</Option>
              <Option value='no_recharge'>{{i18n_lang.directPushSetting36}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="`${i18n_lang.directPushSetting37}`" prop="desc">
            <Input type="textarea" :rows="3" v-model="handleImage.desc" :placeholder="``"></Input>
          </FormItem>
          <FormItem :label="`${i18n_lang.directPushSetting38}`" prop="img">
            <UploadImg
              v-model="handleImage.img"
              :batchUrl="true"
              style="width: 388px;background-color: transparent; border: 1px solid #ddd;"
              @input="batchUrlFn"
              @clearFile="clearFile"
            ></UploadImg>
          </FormItem>
          <FormItem :label="`${i18n_lang.directPushSetting39}`" prop="reward" v-if="handleImage.type == 'no_bind'">
            <Input v-model="handleImage.reward" :placeholder="``"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" :loading="loading.btn" @click="saveImage()">{{i18n_lang.directPushSetting40}}</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import UploadImg from './UploadImg'
  import { directPushPicture } from './SettingColumns'
  const handleImage = {
    id: '',
    type: '',
    name: '',
    desc: '',
    img: '',
    reward: ''
  }
  export default {
    data() {
      const i18n_lang = this.$t('directPushSetting');
      return {
        i18n_lang: i18n_lang,
        directPushPicture: directPushPicture(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          handle: false
        },
        direct_switch: false,
        direct_content: '',
        cashBonusList: [],
        isCompileCashBonus: false,
        isCompileDirectContent: false,
        send_dml: '',
        send_dml2: '',
        returnRewardList: [],
        isReturnReward: false,
        returnRewardType: '',
        directPushPictureList: [],
        handleImage: { ...handleImage },
        handleRule: {
          // name: [{ required: true, message: `${i18n_lang.directPushSetting41}`, trigger: 'blur' }],
          type: [{ required: true, message: `${i18n_lang.directPushSetting42}`, trigger: 'blur' }],
          // desc: [{ required: true, message: `${i18n_lang.directPushSetting43}`, trigger: 'blur' }],
          // img: [{ required: true, message: `${i18n_lang.directPushSetting44}`, trigger: 'blur' }],
          reward: [{ required: true, message: `${i18n_lang.directPushSetting45}`, trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getSetting()
    },
    components: {
      UploadImg
    },
    methods: {
      clearNoNum(text, type, index){
        if(type == 'returnRewardList'){
          if(text == 'bkge_increase' || text == 'bkge_increase_week'|| text == 'bkge_increase_month'){
            this.$set(this.returnRewardList[index], text, this.returnRewardList[index][text].replace(/[^\d.]/g,""))
            this.$set(this.returnRewardList[index], text, this.returnRewardList[index][text].replace(/^\./g,""))
            this.$set(this.returnRewardList[index], text, this.returnRewardList[index][text].replace(/\.{2,}/g,"."))
            this.$set(this.returnRewardList[index], text, this.returnRewardList[index][text].replace(".","$#$").replace(/\./g,"").replace("$#$","."))
            this.$set(this.returnRewardList[index], text, this.returnRewardList[index][text].replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'))
            if(this.returnRewardList[index][text].indexOf(".")< 0 && this.returnRewardList[index][text] !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
              if(this.returnRewardList[index][text].substr(0,1) == '0' && this.returnRewardList[index][text].length == 2){
                 this.returnRewardList[index][text]= parseFloat(this.returnRewardList[index][text]);
              }
            }
          }else{
            this.$set(this.returnRewardList[index], text, this.returnRewardList[index][text].replace(/\D/g,''))
          }
        }
        if(type == 'cashBonusList'){
          this.$set(this.cashBonusList[index], text, this.cashBonusList[index][text].replace(/[^\d.]/g,""))
          this.$set(this.cashBonusList[index], text, this.cashBonusList[index][text].replace(/^\./g,""))
          this.$set(this.cashBonusList[index], text, this.cashBonusList[index][text].replace(/\.{2,}/g,"."))
          this.$set(this.cashBonusList[index], text, this.cashBonusList[index][text].replace(".","$#$").replace(/\./g,"").replace("$#$","."))
          this.$set(this.cashBonusList[index], text, this.cashBonusList[index][text].replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'))
          if(this.cashBonusList[index][text].indexOf(".")< 0 && this.cashBonusList[index][text] !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if(this.cashBonusList[index][text].substr(0,1) == '0' && this.cashBonusList[index][text].length == 2){
               this.cashBonusList[index][text]= parseFloat(this.cashBonusList[index][text]);
            }
          }
        }
      },
      // 开关
      switchChange(val){
        this.directConfig()
      },
      switchHandle(Boole){
        if(this.direct_switch == Boole) return
        this.direct_switch = Boole
        this.directConfig()
      },
      // 直推现金奖励  相关操作
      compileCashBonus(index){
        this.isCompileCashBonus = index
      },
      // saveCashBonus(index){},
      deleteCashBonus(index){},
      // 赠送打码量
      inputSendDml(){
        if(this.send_dml == this.send_dml2) return
        this.directConfig()
      },
      // 直推返水奖励  相关操作
      addReturnReward(){
        this.returnRewardType = 'add'
        this.isReturnReward = this.returnRewardList.length
        this.returnRewardList.push({
          serial_no: this.returnRewardList.length + 1,
          register_count: '',
          recharge_count: '',
          bkge_increase: '',
          bkge_increase_week: '',
          bkge_increase_month: '',
          is_add: true
        })
      },
      compileReturnReward(index){
        this.returnRewardType = 'handle'
        this.isReturnReward = index
      },
      saveReturnReward(item){
        let req = {
          id: item.id,
          register_count: item.register_count,
          recharge_count: item.recharge_count,
          bkge_increase: item.bkge_increase,
          bkge_increase_week: item.bkge_increase_week,
          bkge_increase_month: item.bkge_increase_month
        }
        this.directConfigBkge(req)
      },
      deleteReturnReward(item, index){
        if(item.is_add){
          this.returnRewardList.splice(index, 1)
          return
        }
        this.directConfigBkgeDelete(item.id)
      },
      // 取消
      cancelBtn(text){
        this[text] = false
        this.getSetting()
        // if(text == 'isCompileCashBonus'){
        //   this.isCompileCashBonus = false
        // }
      },
      // 图片相关操作
      handleImageBtn(row){
        this.handleImage = {
          id: row.id,
          type: row.type ? row.type : '',
          name: row.name ? row.name : '',
          desc: row.desc ? row.desc : '',
          img: row.img ? row.img : '',
          reward: row.reward ? `${row.reward}` : ''
        }
        this.visible.handle = true
      },
      batchUrlFn(url){
        this.handleImage.img = url
      },
      clearFile(){
        this.handleImage.img = ''
      },
      // 获取页面数据
      async getSetting() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/direct/config',
          method: 'GET',
          params: {}
        })
        this.loading.page = false
        this.isReturnReward = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.isCompileCashBonus = false
        this.direct_switch = res.data.direct.direct_switch
        this.send_dml = res.data.direct.send_dml
        this.send_dml2 = res.data.direct.send_dml
        this.isCompileDirectContent = false
        this.direct_content = res.data.direct.direct_content
        this.cashBonusList = []
        // res.data.direct.cash_promotion_register.send_amount = Number(res.data.direct.cash_promotion_register.send_amount) / 100
        let cash_promotion_register = { name: `${this.i18n_lang.directPushSetting46}`, type: 'cash_promotion_register', ...res.data.direct.cash_promotion_register }
        // res.data.direct.cash_promotion_recharge.recharge_amount = Number(res.data.direct.cash_promotion_recharge.recharge_amount) / 100
        // res.data.direct.cash_promotion_recharge.send_amount = Number(res.data.direct.cash_promotion_recharge.send_amount) / 100
        let cash_promotion_recharge = { name: `${this.i18n_lang.directPushSetting47}`, type: 'cash_promotion_recharge', ...res.data.direct.cash_promotion_recharge }
        // res.data.direct.cash_be_pushed_register.send_amount = Number(res.data.direct.cash_be_pushed_register.send_amount) / 100
        let cash_be_pushed_register = { name: `${this.i18n_lang.directPushSetting48}`, type: 'cash_be_pushed_register', ...res.data.direct.cash_be_pushed_register }
        // res.data.direct.cash_be_pushed_recharge.recharge_amount = Number(res.data.direct.cash_be_pushed_recharge.recharge_amount) / 100
        // res.data.direct.cash_be_pushed_recharge.send_amount = Number(res.data.direct.cash_be_pushed_recharge.send_amount) / 100
        let cash_be_pushed_recharge = { name: `${this.i18n_lang.directPushSetting49}`, type: 'cash_be_pushed_recharge', ...res.data.direct.cash_be_pushed_recharge }
        this.cashBonusList.push(cash_promotion_register)
        this.cashBonusList.push(cash_promotion_recharge)
        this.cashBonusList.push(cash_be_pushed_register)
        this.cashBonusList.push(cash_be_pushed_recharge)
        this.returnRewardList = res.data.direct_bkge
        res.data.direct_imgs.forEach((item, index) => {
          switch ( item.type ) {
          	case "promotion_rule": item.type_text = `${this.i18n_lang.directPushSetting29}`;
          	break;
            case "bkge_rule": item.type_text = `${this.i18n_lang.directPushSetting30}`;
            break;
            case "user_promotion": item.type_text = `${this.i18n_lang.directPushSetting31}`;
            break;
            case "be_pushed": item.type_text = `${this.i18n_lang.directPushSetting32}`;
            break;
            case "register_finish": item.type_text = `${this.i18n_lang.directPushSetting33}`;
            break;
            case "index_promotion": item.type_text = `${this.i18n_lang.directPushSetting34}`;
            break;
            case "no_bind": item.type_text = `${this.i18n_lang.directPushSetting50}`;
            break;
            case "no_recharge": item.type_text = `${this.i18n_lang.directPushSetting36}`;
            break;
            case "normal": item.type_text = `${this.i18n_lang.directPushSetting51}`;
            break;
            default: item.type_text = ``;
          }
        })
        this.directPushPictureList = res.data.direct_imgs
      },
      // 直推基本配置修改
      async directConfig(){
        let cash_promotion_register = {}, cash_promotion_recharge = {}, cash_be_pushed_register = {}, cash_be_pushed_recharge = {};
        this.cashBonusList.map((item, index) => {
          if(item.type == 'cash_promotion_register'){
            cash_promotion_register = {
              send_amount: item.send_amount,
              get_limit: item.get_limit
            }
          }
          if(item.type == 'cash_promotion_recharge'){
            cash_promotion_recharge = {
              recharge_amount: item.recharge_amount,
              send_amount: item.send_amount,
              get_limit: item.get_limit
            }
          }
          if(item.type == 'cash_be_pushed_register'){
            cash_be_pushed_register = {
              send_amount: item.send_amount,
              get_limit: item.get_limit
            }
          }
          if(item.type == 'cash_be_pushed_recharge'){
            cash_be_pushed_recharge = {
              recharge_amount: item.recharge_amount,
              send_amount: item.send_amount,
              get_limit: item.get_limit
            }
          }
        })
        let req = {
          direct: {
            direct_switch: this.direct_switch,
            send_dml: this.send_dml,
            cash_promotion_register: cash_promotion_register,
            cash_promotion_recharge: cash_promotion_recharge,
            cash_be_pushed_register: cash_be_pushed_register,
            cash_be_pushed_recharge: cash_be_pushed_recharge,
            direct_content: this.direct_content
          }
        }
        const res = await this.$axios.request({
          url: `/direct/config`,
          method: 'PUT',
          data: req
        })
        if (res.status !== 200 || res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.getSetting()
      },
      // 直推返水奖励添加编辑
      async directConfigBkge(req){
        this.returnRewardType == 'add' ? delete req.id : ''
        const res = await this.$axios.request({
          url: `/direct/config/bkge`,
          method: this.returnRewardType === 'add' ? 'POST' : 'PUT',
          data: req
        })
        if (res.status !== 200 || res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.getSetting()
      },
      // 删除直推返水配置
      async directConfigBkgeDelete(id){
        const res = await this.$axios.request({
          url: `/direct/config/bkge`,
          method: 'DELETE',
          data: {
            id: id
          }
        })
        if (res.status !== 200 || res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.getSetting()
      },
      async saveImage(){
        this.$refs['handleForm'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            let req = { ...this.handleImage }
            if(req.type != 'no_bind') delete req.reward
            const res = await this.$axios.request({
              url: `/direct/config/image`,
              method: 'PUT',
              data: req
            })
            this.loading.btn = false
            if (res.status !== 200 || res.state != 0) {
              this.$msg({
                type: 'error',
                message: res.message
              })
              return
            }
            this.visible.handle = false
            this.getSetting()
          }
        })
      },
      // 启用停用
      async handleStop(row) {
        const res = await this.$axios.request({
          url: `/direct/config/status/${row.id}`,
          method: 'PATCH',
          data: {
            // id: data.id,
            status: row.status === 'disabled' ? 'enabled' : 'disabled'
          }
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getSetting()
      }
    }
  }
</script>

<style lang="less" scoped>
  .setting_content{
    margin-top: 25px;
    overflow: hidden;
    &:first-child{
      margin-top: 0;
    }
    .title{
      font-size: 14px;
      font-weight: bold;
      line-height: 32px;
      &.title_left{
        display: inline-block;
        float: left;
      }
    }
    .switch_content{
      display: inline-block;
      line-height: 32px;
      margin-left: 20px;
      float: left;
      &>span{
        cursor: pointer;
        margin-right: 20px;
        &:last-child{
          margin-right: 0;
          color: #2d8cf0;
        }
      }
    }
    .table_tr{
      background: #f8f8f9;
      border: 1px solid #e8eaec;
      overflow: hidden;
      margin-top: 25px;
      &>div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(100% / 5);
        min-height: 40px;
        border-right: 1px solid #e8eaec;
        font-weight: bold;
        padding: 0 10px;
        float: left;
        &:last-child{
          border: none;
        }
      }
      &.table_tr_3>div{
        width: calc(100% / 3);
      }
      &.table_tr_7>div{
        width: calc(100% / 7);
      }
    }
    .table_th{
      border: 1px solid #e8eaec;
      border-top: none;
      overflow: hidden;
      &>div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(100% / 5);
        min-height: 48px;
        border-right: 1px solid #e8eaec;
        padding: 0 10px;
        float: left;
        &:last-child{
          border: none;
        }
      }
      &.table_th_3>div{
        width: calc(100% / 3);
      }
      &.table_th_7>div{
        width: calc(100% / 7);
      }
    }
    .th_span{
      position: relative;
      // &>span{
      //   position: absolute;
      //   right: 5px;
      //   bottom: 5px;
      // }
      // overflow: hidden;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 3;
    }
  }
</style>
