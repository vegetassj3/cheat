import {
  INIT_CHAPTERS,
  SET_KEY,
  INC,
  DEC,
  SET_CHAPTER,
} from "./dataActionTypes";

export const init_chapters = (chapterList) => {
  return {
    type: INIT_CHAPTERS,
    payload: chapterList,
  };
};

export const set_key = (key) => {
  if (typeof key == "string") {
    key = Number(key);
  }
  return {
    type: SET_KEY,
    payload: key,
  };
};

export const set_chapter = (chapter) => {
  return {
    type: SET_CHAPTER,
    payload: chapter,
  };
};

export const inc = () => {
  return {
    type: INC,
  };
};

export const dec = () => {
  return {
    type: DEC,
  };
};
