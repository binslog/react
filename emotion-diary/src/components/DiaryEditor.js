// new와 edit 모두에 활용할 editor

import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";

// 같은 경로에 있으니까 경로수정
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { emotionList } from "../util/emotion.js";
import { getStringDate } from "../util/date.js";
// 자주쓰는 함수는 util/파일명 저장한 다음 불러오자

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";
// input에 저장되는 숫자를 state로 핸들링
// console.log(getStringDate(new Date())); // 오늘 날짜 나온다.
// const getStringDate = (date) => {

//   return date.toISOString().slice(0, 10);
// };

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3); // 감정의 변화를 담을 함수를 지정해준다.
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext); // 공급 받을거
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate(); // useNavigate 함수를 navigate에 넣어준다.

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    )
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }

    navigate("/", { replace: true }); // 옵션을 줘서 돌아가게 한다.
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "새로운 일기 쓰기" : "새 일기 쓰기"} // 헤더에 text 쓰기
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} /> // 뒤로가기 버튼 navigate 주는 방법
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
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
              type="date" // input type date는 날짜를 선택할 수 있다.
            />
          </div>
        </section>

        <section>
          <h4> 오늘의 감정 </h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion} // 선택되면 true 아니면 false
              />
            ))}
          </div>
        </section>
        <section>
          <h4> 오늘의 일기 </h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
