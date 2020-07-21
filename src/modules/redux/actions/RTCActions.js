import { RTCAction } from "./ActionsTypes";

export function setRoomList(roomList) {
  return { type: RTCAction.ROOM_LIST, roomList };
}

export function addRoom(room) {
  return { type: RTCAction.ADD_ROOM, room };
}
