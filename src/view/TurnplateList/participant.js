import { Tag } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('turnplateList')
  return [
    {
      title: `${i18n.turnplateList14}`,
      align: 'center',
      minWidth: 100,
      key: 'user_name'
    },
    {
      title: `${i18n.turnplateList15}`,
      align: 'center',
      minWidth: 100,
      key: 'apply_time'
    },
    {
      title: `${i18n.turnplateList16}`,
      align: 'center',
      minWidth: 100,
      key: 'send_type',
      render(h, { row }) {
        return <span>{ row.send_type }</span>
      }
    },
    {
      title: `${i18n.turnplateList17}`,
      align: 'center',
      minWidth: 100,
      key: 'award_type',
      render(h, { row }) {
        return <span>
            { row.award_type == 1 ? `${i18n.turnplateList6}` : '' }
            { row.award_type == 2 ? `${i18n.turnplateList7}` : '' }
            { row.award_type == 3 ? `${i18n.turnplateList8}` : '' }
          </span>
      }
    },
    {
      title: `${i18n.turnplateList18}`,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <span>
          { row.award_type == 1 ? `${i18n.turnplateList19}${row.coupon_money / 100}${i18n.turnplateList20}` : ``}
          { row.award_type == 2 ? `${i18n.turnplateList7}` : `` }
          { row.award_type == 3 ? `${row.matter_name}` : `` }
          </span>
        )
      }
    },
    {
      title: `${i18n.turnplateList21}`,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{ row.withdraw_require / 100 }</span>
      }
    },
    {
      title: `${i18n.turnplateList22}`,
      align: 'center',
      minWidth: 110,
      render(h, { row }) {
        return (
          <Tag color={row.state === 'manual' ? 'blue' : 'success'} type='dot'>
            { row.state === 'manual' ? `${i18n.turnplateList23}` : `${i18n.turnplateList24}` }
          </Tag>
        )
      }
    }
  ]
}
