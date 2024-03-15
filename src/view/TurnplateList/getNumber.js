export default function(Vue) {
  const i18n = Vue.$t('turnplateList')
  return [
    {
      title: `${i18n.turnplateList28}`,
      align: 'center',
      minWidth: 100,
      key: 'name',
      render: (h, { row }) => {
        return <span style="color: #2d8cf0;cursor: pointer;" on-click={_ => Vue.handleUserDetail(row)}>{ row.name }</span>
      }
    },
    {
      title: `${i18n.turnplateList33_lucky}`,
      align: 'center',
      minWidth: 100,
      key: 'type'
    },
    {
      title: `${i18n.turnplateList29}`,
      align: 'center',
      minWidth: 100,
      key: 'get_times'
    },
    {
      title: `${i18n.turnplateList30}`,
      align: 'center',
      minWidth: 100,
      key: 'remark'
    },
    {
      title: `${i18n.turnplateList31}`,
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.turnplateList32}`,
      align: 'center',
      minWidth: 100,
      key: 'times',
      render: (h, { row }) => {
        return <span style="color: #2d8cf0;cursor: pointer;" on-click={_ => Vue.setTimes(row)}>{ row.times }</span>
      }
    }
  ]
}
