import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bar from "./Bar";
import { inc, dec, set_chapter } from "./../redux/data/dataActions";

export default function Chapter(props) {
  let key = useSelector((state) => state.data.key);

  const dispatch = useDispatch();
  const chapterData = useSelector((state) => state.data.chapterList[key]);
  const chapter = useSelector((state) => state.data.chapter);
  useEffect(() => {
    electron.windowAPI.recieve("left", () => {
      dispatch(dec());
    });
    electron.windowAPI.recieve("right", () => {
      dispatch(inc());
    });
    electron.windowAPI.recieve("chapterData", (data) => {
      dispatch(set_chapter(data));
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    electron.windowAPI.sendUrl(chapterData.link);
    electron.windowAPI.log(chapterData.link);
  }, [key]);

  return (
    <div>
      <Bar></Bar>
      <div style={{ paddingTop: "2em" }}>
        <p id="heading">
          chapter Number : {key} <br />
          chapter Name : {chapterData.text}
          <br />
        </p>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: chapter }}
        ></div>
      </div>
    </div>
  );
}
