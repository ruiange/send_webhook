import axios from 'axios';

const sendController = async (keyStr, params, res) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?${keyStr}`,
      data: params,
    });
    const { errcode, errmsg } = data;
    if (errcode !== 0) {
      res.status(500).json({
        code: 5000,
        message: errmsg,
      });
    }
    res.status(200).json({
      code: 2000,
      message: errmsg,
    });
  } catch (e) {
    res.status(500).json({
      code: 5000,
      message: e.message,
    });
  }
};

export const sendText = async (req, res) => {
  const params = {
    msgtype: 'text',
    text: {
      content: '广州今日天气：29度，大部分多云，降雨概率：60%',
      mentioned_list: [],
      mentioned_mobile_list: [],
    },
  };

  let keyStr = '';
  for (const key in req.query) {
    console.log(key, req.query[key]);
    keyStr += `${key}=${req.query[key]}&`;
  }

  await sendController(keyStr, params, res);
};

export const sendCard = async (req, res) => {
  let keyStr = '';
  for (const key in req.query) {
    console.log(key, req.query[key]);
    keyStr += `${key}=${req.query[key]}&`;
  }

  const params = {
    msgtype: 'template_card',
    template_card: {
      card_type: 'text_notice',
      source: {
        icon_url: 'https://wework.qpic.cn/wwpic/252813_jOfDHtcISzuodLa_1629280209/0',
        desc: '部署机器人',
        desc_color: 0,
      },
      main_title: {
        title: '已经部署更新',
        desc: '请前往查看最新版本',
      },
      emphasis_content: {
        // title: '100',
        // desc: '数据含义',
      },
      quote_area: {
        // type: 1,
        // url: 'https://work.weixin.qq.com/?from=openApi',
        // appid: 'APPID',
        // pagepath: 'PAGEPATH',
        // title: '引用文本标题',
        // quote_text: 'Jack：企业微信真的很好用~\nBalian：超级好的一款软件！',
      },
      sub_title_text: 'https://admin4.jcbtest.com',
      // horizontal_content_list: [
      //   {
      //     keyname: '邀请人',
      //     value: '张三',
      //   },
      //   {
      //     keyname: '企微官网',
      //     value: '点击访问',
      //     type: 1,
      //     url: 'https://work.weixin.qq.com/?from=openApi',
      //   },
      //   {
      //     keyname: '企微下载',
      //     value: '企业微信.apk',
      //     type: 2,
      //     media_id: 'MEDIAID',
      //   },
      // ],
      jump_list: [
        {
          type: 1,
          url: 'https://admin4.jcbtest.com/',
          title: '前往官网',
        },
        // {
        //   type: 2,
        //   appid: 'APPID',
        //   pagepath: 'PAGEPATH',
        //   title: '跳转小程序',
        // },
      ],
      card_action: {
        type: 1,
        url: 'https://work.weixin.qq.com/?from=openApi',
        appid: 'APPID',
        pagepath: 'PAGEPATH',
      },
    },
  };

  await sendController(keyStr, params, res);
};
