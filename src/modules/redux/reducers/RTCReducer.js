import { combineReducers } from "redux";
import { RTCAction } from "../actions/ActionsTypes";
import { Logger } from "../../logger";

const initialization = {
  roomList: []
};

export function rtc(state = initialization, action) {
  switch (action.type) {
    case RTCAction.ROOM_LIST:
      const roomList = action.roomList;
      Logger.log("roomList: ", roomAdded);
      return Object.assign({}, state, { roomList });
    case RTCAction.ADD_ROOM:
      const rooms = state.roomList;
      const roomAdded = action.room;
      rooms.push(roomAdded);
      const newRooms = rooms.map(item => {
        return Object.assign({}, item);
      });

      return Object.assign({}, state, { roomList: newRooms });
    default:
      return state;
  }
}

const rtcReducer = combineReducers({ rtc });

export default rtcReducer;
