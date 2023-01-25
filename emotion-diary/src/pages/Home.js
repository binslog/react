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
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  // 시간에 년도를 가져오는 메서드
  // 달은 0부터 시작해서 +1 해줘야한다.

  useEffect(() => {
    // 월의 첫번째 날짜
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime(); // gettime 함수

      // 월의 마지막 날짜
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

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    ); // 시간에 (+)년도를 가져오는 메서드
  };

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
