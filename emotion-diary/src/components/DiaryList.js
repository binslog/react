import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "감정순" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// select로 선택 bar를 하나 만든다.
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  useEffect(() => {
    console.log("Control Menu");
  });

  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest"); // 오타주의
  const [filter, setFilter] = useState("all"); //

  // const handleSetSortType = (sortType) => {
  //   setSortType(sortType);
  // };

  // const handleSetFilter = (filter) => {
  //   setFilter(filler);
  // };

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      console.log(item.emotion);
      if (filter === "good") {
        return parseInt(item.emotion <= 3); // 항상 숫자가 아닐 수 있으니 parseInt 형변환
      } else {
        return parseInt(item.emotion > 3);
      }
    };

    const compare = (a, b) => {
      // console.log(a, b);
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    // diaryList를 json화 시켜서 문자열로 바꾼다.
    // console.log(copyList);
    // copylist는 dummy data를 json화.

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    // filter가 all이면 모든 리스트 반환

    const sortedList = filteredList.sort(compare); // 그냥 정렬이 안되니까 compare 함수가 있어야 한다.
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>

        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />

          <MyButton
            type={"positive"}
            text={"test"}
            onClick={() => navigate("/test")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

// 빈 배열을 전달 받는다.
DiaryList.defaultProps = {
  diaryList: [],
};

export default React.memo(DiaryList);
