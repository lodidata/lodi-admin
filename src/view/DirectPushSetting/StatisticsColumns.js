export default function(Vue) {
  const i18n = Vue.$t('directPushSetting')
  return [
    {
      title: `${i18n.directPushSetting66}`,//成员账号
      align: 'center',
      minWidth: 100,
      key: 'username'
    },
    {
      title: `${i18n.directPushSetting67}`,//推广注册人数
      align: 'center',
      minWidth: 100,
      key: 'register_count',
      render: (h, { row }) => {
        return (
          <span style="color: #2d8cf0;">{row.register_count}</span>
        )
      }
    },
    {
      title: `${i18n.directPushSetting68}`,//推广充值人数
      align: 'center',
      minWidth: 100,
      key: 'recharge_count',
      render: (h, { row }) => {
        return (
          <span style="color: #2d8cf0;">{row.recharge_count}</span>
        )
      }
    },
    {
      title: `${i18n.directPushSetting69}`,//获得奖励
      align: 'center',
      minWidth: 100,
      key: 'price',
      render: (h, { row }) => {
        return (
          <span>{ Number(row.price) / 100 }</span>
        )
      }
    }
  ]
}
