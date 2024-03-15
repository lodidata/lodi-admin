import { Button, Poptip } from 'iview'
export const dataList = function(Vue) {
  const i18n = Vue.$t('backwater')
  return [
    {
      title: `${i18n.backwater22}`,//活动名称
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    {
      title: `${i18n.backwater23}`,//类型
      align: 'center',
      minWidth: 100,
      key: 'type',
      render(h, { row }) {
        return <span>{row.type == 1 ? `${i18n.backwater24}` : ''}{row.type == 2 ? `${i18n.backwater25}` : ''}{row.type == 3 ? `${i18n.backwater26}` : ''}{row.type == 4 ? `${i18n.backwater48}` : ''}</span>
      }
    },
    {
      title: `${i18n.backwater27}`,//返水批次
      align: 'center',
      minWidth: 100,
      key: 'batch_time'
    },
    {
      title: `${i18n.backwater28}`,//返水人数
      align: 'center',
      minWidth: 100,
      key: 'back_cnt'
    },
    {
      title: `${i18n.backwater29}`,//已领取人数
      align: 'center',
      minWidth: 100,
      key: 'receive_cnt'
    },
    {
      title: `${i18n.backwater30}`,//返水金额
      align: 'center',
      minWidth: 100,
      key: 'back_amount',
      render(h, { row }) {
        return <span>{row.back_amount ? row.back_amount / 100 : ''}</span>
      }
    },
    {
      title: `${i18n.backwater31}`,//已领取金额
      align: 'center',
      minWidth: 100,
      key: 'receive_amount',
      render(h, { row }) {
        return <span>{row.receive_amount ? row.receive_amount / 100 : ''}</span>
      }
    },
    {
      title: `${i18n.backwater32}`,//创建时间
      align: 'center',
      minWidth: 100,
      key: 'create_time'
    },
    {
      title: `${i18n.backwater33}`,//状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      render(h, { row }) {
        return <span>{row.status == 0 ? `${i18n.backwater34}` : ''}{row.status == 1 ? `${i18n.backwater35}` : ''}{row.status == 2 ? `${i18n.backwater36}` : ''}</span>
      }
    },
    {
      title: `${i18n.backwater37}`,//赠送时间
      align: 'center',
      minWidth: 100,
      key: 'send_time'
    },
    {
      title: `${i18n.backwater38}`,
      minWidth: 180,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button type='primary' size='small' style='margin-right:5px' on-click={_ => Vue.handleDetails(row)}>{i18n.backwater39}</Button>
            {
              row.status == 0 ?  <Button type='primary' size='small' style='margin-right:5px' on-click={_ => Vue.handleBackwater(row)}>{i18n.backwater40}</Button> : ''
              // row.status == 0 ? <Poptip confirm title={`${i18n.backwater41}?`} on-on-ok={_ => Vue.handleBackwater(row)}>
              //   <Button type='error' size='small' style='margin-right:5px'>{i18n.backwater40}</Button>
              // </Poptip> : ''
            }
          </div>
        )
      }
    }
  ]
}

export const detailsList = function(Vue) {
  const i18n = Vue.$t('backwater')
  return [
    {
      title: `${i18n.backwater42}`,//会员账号
      align: 'center',
      minWidth: 100,
      key: 'user_name'
    },
    {
      title: `${i18n.backwater30}`,//返水金额
      align: 'center',
      minWidth: 100,
      key: 'coupon_money',
      render(h, { row }) {
        return <span>{row.coupon_money ? row.coupon_money / 100 : ''}</span>
      }
    },
    {
      title: `${i18n.backwater44}`,//状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      render(h, { row }) {
        return <span>{row.status == 'pass' ? `${i18n.backwater45}` : `${i18n.backwater46}`}</span>
      }
    },
    {
      title: `${i18n.backwater47}`,//领取时间
      align: 'center',
      minWidth: 100,
      key: 'process_time'
    }
  ]
}
