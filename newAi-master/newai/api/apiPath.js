const REGISTER = '/api-voice/wxMaApi/register' //注册
const IS_REGISTER = '/api-voice/wxMaApi/isRegister' //是否注册
const UP_DATA_WX_USER_INFO = '/api-voice/wxMaApi/updateWxUserInfo' //更新用户信息
const GET_PROJECTS_BY_TEAM = '/api-voice/voiceProject/getProjectByTeam' //获取项目列表
const GET_SELF_TEAM_LIST = '/api-voice/team/getSelfTeamList' //获取团队列表
const GET_TEAM_MEMBER_LIST = '/api-voice/team/getTeamMember' //获取团队下的成员列表
const GET_CALENDAR_VIEW_DATA = '/api-voice/review/getCalendarViewData' //获取日期下的信息
const GET_PROJECT_VIEW_DATA = '/api-voice/review/getProjectViewData' //获取项目下的信息
const SET_MEMBER_LEVEL = '/api-voice/team/setMemberLevel' //设置 Leader
const ADD_TEAM = '/api-voice/team/add' //添加团队
const JOIN_TEAM = '/api-voice/team/join' //加入团队
const GET_LEVEL_BY_TEAM = '/api-voice/team/getLevelByTeam' //是否是团队 leader

let SAVE_OR_UPDATE = '/api-voice/voiceProject/saveOrUpdate' //新增修改团队名
let REMOVE_PROJECT = '/api-voice/voiceProject/remove' //删除团队
let UPDATE_VOICE_STATE = '/api-voice/voice/updateVoiceState' //完成状态
let UPDATE_VOICE_WORK_TIME = '/api-voice/voice/updateVoiceWorkTime' //修改 WorkTime

let   REMOVE_MEMBER_BY_TEAM = '/api-voice/team/removeMemberByTeam' //删除用户

const ADD_VOICE_BY_TEXT ='/api-voice/voice/addVoiceByText' //文本转语音
const SAVE_VOICE_ATTRIBUTE = '/api-voice/voice/saveVoiceAttribute' //保存语音
const TO_TEXT = '/api-voice/voice/addVoice' //转语音
const UP_LOAD_IMAGE = '/api-voice/resources/uploadImage' //上传图片

module.exports = {
  REGISTER,
  IS_REGISTER,
  UP_DATA_WX_USER_INFO,
  TO_TEXT,
  GET_PROJECTS_BY_TEAM,
  GET_SELF_TEAM_LIST,
  GET_TEAM_MEMBER_LIST,
  GET_CALENDAR_VIEW_DATA,
  GET_PROJECT_VIEW_DATA,
  SET_MEMBER_LEVEL,
  ADD_TEAM,
  ADD_VOICE_BY_TEXT,
  SAVE_VOICE_ATTRIBUTE,
  UP_LOAD_IMAGE,
  JOIN_TEAM,
  GET_LEVEL_BY_TEAM,
  REMOVE_PROJECT,
  SAVE_OR_UPDATE,
  UPDATE_VOICE_STATE,
  UPDATE_VOICE_WORK_TIME,
  REMOVE_MEMBER_BY_TEAM
}
