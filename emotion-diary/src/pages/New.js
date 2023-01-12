import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10); // ISO형식으로 반환
};

const New = () => {
  // input에 저장되는 숫자를 state로 핸들링
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();
  return (
    <div>
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4> 오늘은 언제인가요? </h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
