import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";

// 경로 조심. 한번 올라가서 가져 와야한다.
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";
// import DiaryItem from "../components/DiaryItem";

const Home = () => {
  const diaryList = useContext(DiaryStateContext); // app 에서 가져다 쓴다.
  // console.log(diaryList);

  const [data, setData] = useState(new Date()); // 현재시간
  // console.log(data);

  const [curDate, setCurDate] = useState(new Date()); // 날짜를 저장하는 date, 현재시간.
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  // 시간에 년과 월을 가져오는 메서드 getFullYear, getMonth ()
  // 달은 0부터 시작해서 +1 해줘야한다.

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  useEffect(() => {
    // 랜더링 될 때, 첫 날과 마지막 날을 추린다.
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
        // 시 분 초 까지 정확하게 기재하자!
      ).getTime();

      // first 보다는 미래여야하고, last보다는 과거여야 한다.
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  // 월을 하나 늘리기 위한 함수. count + 1
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    ); // 시간에 (+)년도를 가져오는 메서드
  };

  // 월을 하나 줄이기 위한 함수. count - 1
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    ); // 시간에 (-)년도를 가져오는 메서드
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={diaryList} />
      {/* <DiaryItem /> */}
    </div>
  );
};

export default Home;
