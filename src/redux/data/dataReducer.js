import {
  INIT_CHAPTERS,
  SET_KEY,
  INC,
  DEC,
  SET_CHAPTER,
} from "./dataActionTypes";
const initialState = {
  chapterList: {},
  length: 0,
  key: 1,
  chapter: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CHAPTERS:
      return {
        ...state,
        chapterList: action.payload,
        length: Object.keys(action.payload).length,
      };
    case SET_KEY:
      return {
        ...state,
        key: action.payload,
      };
    case SET_CHAPTER:
      return {
        ...state,
        chapter: action.payload,
      };
    case INC:
      if (state.key <= state.length) {
        return {
          ...state,
          key: state.key + 1,
        };
      }
      return state;

    case DEC:
      if (state.key > 1) {
        return {
          ...state,
          key: state.key - 1,
        };
      }
      return state;

    default:
      return state;
  }
};
export default dataReducer;
