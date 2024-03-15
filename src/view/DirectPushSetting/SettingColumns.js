import { Button, Tag, Poptip } from 'iview'
export const directPushPicture = function(Vue) {
  const i18n = Vue.$t('directPushSetting')
  return [
    {
      title: `${i18n.directPushSetting52}`,
      align: 'center',
      minWidth: 100,
      key: `name`,
      render(h, { row }) {
        return <span>{ row.name }</span>
      }
    },
    {
      title: `${i18n.directPushSetting53}`,
      align: 'center',
      minWidth: 100,
      key: `type_text`,
      render(h, { row }) {
        return <span>{ row.type_text }</span>
      }
    },
    {
      title: `${i18n.directPushSetting54}`,
      align: 'center',
      minWidth: 100,
      key: `desc`,
      render(h, { row }) {
        return <span style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;" title={row.desc}>{ row.desc }</span>
      }
    },
    {
      title: `${i18n.directPushSetting55}`,
      align: 'center',
      minWidth: 100,
      key: `img`,
      render(h, { row }) {
        return <span>{ row.img ? <img src={ row.img }  style="width:75px;height:auto;"/> : `--` }</span>
      }
    },
    {
      title: `${i18n.directPushSetting102}`,//状态
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.status === 'enabled' ? 'success' : 'default'}>
            {row.status === 'enabled' ? `${i18n.directPushSetting103}` : `${i18n.directPushSetting104}`}
          </Tag>
        )
      }
    },
    {
      title: `${i18n.directPushSetting56}`,
      align: 'center',
      minWidth: 100,
      render(h, { row, index }) {
        return (
        <div>
          <Poptip confirm='' placement={index==0 ? 'bottom' : 'top'} title={row.status === 'enabled' ? `${i18n.directPushSetting105}` : `${i18n.directPushSetting106}`} on-on-ok={_ => Vue.handleStop(row)}>
            <Button type={row.status === 'enabled' ? 'error' : 'success'} size='small'>{row.status === 'enabled' ? `${i18n.directPushSetting104}` : `${i18n.directPushSetting103}`}</Button>
          </Poptip>
          <Button type='primary' size='small' on-click={_ => Vue.handleImageBtn(row)} style="margin-left: 10px;">{i18n.directPushSetting57}</Button>
        </div>
        )
      }
    }
  ]
}
