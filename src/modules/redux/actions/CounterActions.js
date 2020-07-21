import {
  INCREMENT,
  DECREMENT
} from './ActionsTypes'

function increment(count) {
  return { type: INCREMENT}
}

export const boundIncrement = () => dispatch(increment(count))