import IndexUs from './index/en-US'
import IndexCN from './index/zh-CN'
//
import CommonUS from './common/en-US'
import commonCN from './common/zh-CN'
//
import SpeakUS from './speak/en-US'
import SpeakCN from './speak/zh-CN'
//
import UserInfoUS from './userInfo/en-US'
import UserInfoCN from './userInfo/zh-CN'

export default {
  US: { ...IndexUs, ...CommonUS, ...SpeakUS, ...UserInfoUS },
  CN: { ...IndexCN, ...commonCN, ...SpeakCN, ...UserInfoCN }
}
