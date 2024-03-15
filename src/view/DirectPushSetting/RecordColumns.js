export default function(Vue) {
  const i18n = Vue.$t('directPushSetting')
  return [
    {
      title: `${i18n.directPushSetting82}`,//成员账号
      align: 'center',
      minWidth: 140,
      key: 'username'
    },
    {
      title: `${i18n.directPushSetting83}`,//上级账号
      align: 'center',
      minWidth: 140,
      key: 'sup_name'
    },
    {
      title: `${i18n.directPushSetting84}`,//时间
      align: 'center',
      minWidth: 140,
      key: 'created'
    },
    {
      title: `${i18n.directPushSetting85}`,//类型
      align: 'center',
      minWidth: 140,
      key: 'type',
      render: (h, { row }) => {
        return (
          <span>
          { row.type == 1 ? `${i18n.directPushSetting86}` : `` }
          { row.type == 2 ? `${i18n.directPushSetting87}` : `` }
          { row.type == 3 ? `${i18n.directPushSetting101}` : `` }
          </span>
        )
      }
    },
    {
      title: `${i18n.directPushSetting88}`,//奖励
      align: 'center',
      minWidth: 140,
      key: 'price',
      render: (h, { row }) => {
        return (
          <span>{ Number(row.price) / 100 }</span>
        )
      }
    }
  ]
}
