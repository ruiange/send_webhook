import express from 'express';
import { sendCard, sendText } from '../../controllers/sendController.js';

const sendRouter = express.Router();

/**
 * @api {all} /text 发送文本消息
 * @apiName SendTextMessage
 * @apiGroup TextMessage
 * @apiDescription 发送文本消息到指定的接收者。
 *
 * @apiParam {Object} body 请求体，包含消息类型和内容。
 * @apiParamExample {json} 请求示例:
 *     {
 *         "msgtype": "text",
 *         "text": {
 *             "content": "广州今日天气：29度，大部分多云，降雨概率：60%",
 *             "mentioned_list": ["wangqing", "@all"],
 *             "mentioned_mobile_list": ["13800001111", "@all"]
 *         }
 *     }
 *
 * @apiSuccess {String} message 成功提示信息。
 * @apiSuccessExample {json} 成功响应:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "消息发送成功"
 *     }
 */
sendRouter.all('/text', sendText);
sendRouter.all('/card', sendCard);

export default sendRouter;
