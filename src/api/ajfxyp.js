import { $get } from './axios-util'
export function getDzjz(params) {
  return $get('http://192.168.1.104:28083/ajfxyp/dzjz/038', params)
}
export function getGkqk(params) {
  return $get('http://192.168.1.104:28083/ajfxyp/gkqk/045', params)
}
export function getSacw(params) {
  return $get('http://192.168.1.104:28083/ajfxyp/sacw/078', params)
}
export function getLsbhr(params) {
  return $get('http://192.168.1.104:28083/ajfxyp/lsbhr/057', params)
}
export default {
  getDzjz,
  getGkqk,
  getSacw,
  getLsbhr,
}
