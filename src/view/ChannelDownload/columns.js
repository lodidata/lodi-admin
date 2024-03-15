export default function(Vue) {
  const i18n = Vue.$t('channelDownload')
  return [
    {
      title: `${i18n.channelDownload31}`,//渠道号
      align: 'center',
      minWidth: 100,
      key: 'channel_no'
    },
    {
      title: `${i18n.channelDownload32}`,//渠道名称
      align: 'center',
      minWidth: 100,
      key: 'channel_name'
    },
    // {
    //   title: `${i18n.channelDownload33}`,//产品包名称
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'product_name'
    // },
    {
      title: `${i18n.channelDownload45_v1_2_6_3}`,//安卓包地址
      align: 'center',
      minWidth: 100,
      key: 'android'
    },
    {
      title: `${i18n.channelDownload46_v1_2_6_3}`,//IOS包地址
      align: 'center',
      minWidth: 100,
      key: 'ios'
    },
    {
      title: `${i18n.channelDownload35}`,//超级签
      align: 'center',
      minWidth: 100,
      key: 'super_label'
    },
    {
      title: `${i18n.channelDownload36}`,//企业签
      align: 'center',
      minWidth: 100,
      key: 'enterprise_label'
    },
    {
      title: `${i18n.channelDownload37}`,//TF签
      align: 'center',
      minWidth: 100,
      key: 'TF_label'
    },
    {
      title: `${i18n.channelDownload38}`,//修改时间
      align: 'center',
      minWidth: 100,
      key: 'update_time'
    },
    {
      title: `${i18n.channelDownload39}`,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row, index }) => [
        h(
          'Button',
          {
            attrs: { style: '', loading: row.loading },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.produce(row, index)
              }
            }
          },
          `${i18n.channelDownload47_v1_2_6_3}`
        ),
        h(
          'Button',
          {
            attrs: { style: 'margin-left:5px' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handle(row)
              }
            }
          },
          `${i18n.channelDownload40}`
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.channelDownload41}`
            },
            on: {
              'on-ok': () => {
                Vue.handleDelete(row)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: 'margin-left:5px' },
                props: {
                  type: 'error',
                  size: 'small'
                }
              },
              `${i18n.channelDownload42}`
            )
          ]
        )
      ]
    }
  ]
}
