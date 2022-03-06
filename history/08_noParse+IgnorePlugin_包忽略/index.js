import jquery from 'jquery';
console.log(jquery);

import moment from 'moment';
// IgnorePlugin 忽略语言包引入后，需手动引入
import 'moment/locale/zh-cn';
// 设置语言
moment.locale('zh-cn');

let r = moment().endOf('day').fromNow();
console.log(r);
// moment 导致包大了很多
