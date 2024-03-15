export default function(Vue) {
  const i18n = Vue.$t('components')
  return [
    {
      title: `${i18n.components313_v1_2_7_4}`,//编号
      align: 'center',
      key: 'serial_no'
    },
    {
      title: `${i18n.components314_v1_2_7_4}`,//注册人数
      align: 'center',
      key: 'register_count'
    },
    {
      title: `${i18n.components315_v1_2_7_4}`,//充值人数
      align: 'center',
      key: 'recharge_count'
    },
    {
      title: `${i18n.components316_v1_2_7_4}`,//日反水提升比例
      align: 'center',
      key: 'bkge_increase',
      render(h, { row }) {
        return <span>{row.bkge_increase ? `${row.bkge_increase}%` : '0%'}</span>
      }
    },
    {
      title: `${i18n.components317_v1_2_7_4}`,//周反水提升比例
      align: 'center',
      key: 'bkge_increase_week',
      render(h, { row }) {
        return <span>{row.bkge_increase_week ? `${row.bkge_increase_week}%` : '0%'}</span>
      }
    },
    {
      title: `${i18n.components318_v1_2_7_4}`,//月反水提升比例
      align: 'center',
      key: 'bkge_increase_month',
      render(h, { row }) {
        return <span>{row.bkge_increase_month ? `${row.bkge_increase_month}%` : '0%'}</span>
      }
    }
  ]
}
