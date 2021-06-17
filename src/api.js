import { STATUS_UPDATES, CRIPTO_LIST, getCriptoUpdateUrl } from "./constants"

export function getCRIPTO_LIST() {
  return fetch(CRIPTO_LIST).then(resp => resp.json())
}

export function getSTATUS_UPDATES() {
  return fetch(STATUS_UPDATES).then(resp => resp.json())
}
