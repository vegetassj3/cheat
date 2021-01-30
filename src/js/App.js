import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { init_chapters, set_key } from "./../redux/data/dataActions";
import { useSelector, useDispatch } from "react-redux";
import "./../style.css";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    electron.windowAPI.recieve("chapterList", (data) => {
      dispatch(init_chapters(data));
    });
  }, []);

  const chapterList = useSelector((state) => state.data.chapterList);

  return (
    <div>
      {Object.entries(chapterList).map(([key, val]) => (
        <div id={key + "div"} key={key + "div"}>
          {"Chapter " + key + " : "}
          <Link
            onClick={() => {
              dispatch(set_key(key));
            }}
            key={key + "link"}
            to={{
              pathname: "/chapter",
            }}
          >
            {val.text}
          </Link>
        </div>
      ))}
    </div>
  );
}
