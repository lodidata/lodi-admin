import { Button } from 'iview'
export default function(Vue) {
  const i18n_lang = Vue.$t('monetaryExchangeRate');
  return [
    {
      title: `${i18n_lang.monetaryExchangeRate5}`,//货币类型
      align: 'center',
      minWidth: 80,
      key: 'type',
      render(h, { row }) {
        return <span>{row.type == 1 ? `${i18n_lang.monetaryExchangeRate6}` : `${i18n_lang.monetaryExchangeRate7}`}</span>
      }
    },
    {
      title: `${i18n_lang.monetaryExchangeRate8}`,//货币名称
      align: 'center',
      key: 'name',
      minWidth: 80
    },
    {
      title: `${i18n_lang.monetaryExchangeRate9}`,//货币简称
      align: 'center',
      key: 'alias',
      minWidth: 80
    },
    {
      title: `${i18n_lang.monetaryExchangeRate16}`,//汇率（平台金额为1的汇率）
      align: 'center',
      key: 'exchange_rate',
      minWidth: 80
    },
    {
      title: `${i18n_lang.monetaryExchangeRate17}`,//操作
      align: 'center',
      minWidth: 80,
      render(h, { row, index }) {
        return <Button type='primary' size='small' style='margin-right:5px' on-click={_ => Vue.handle(row)}>{`${i18n_lang.monetaryExchangeRate18}`}</Button>
      }
    }
  ]
}
