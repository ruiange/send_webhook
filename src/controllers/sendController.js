import axios from 'axios';

export const sendText = async (req, res) => {
  const params = {
    msgtype: 'text',
    text: {
      content: '广州今日天气：29度，大部分多云，降雨概率：60%',
      mentioned_list: [],
      mentioned_mobile_list: [],
    },
  };
  const { data } = await axios({
    method: 'post',
    url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=4cf65ad2-cd08-4833-92b2-a52333581d08',
    data: params,
  });
  console.log(data);
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
};
