import { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";
import Button from "@mui/material/Button";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext); // usecontext를 사용하기 위한 로직

  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus(); // 작가 length가 아무것도 없으면 거기에 포커스
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus(); // content가 하나도 없으면 여기에 포커스
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          value={state.author}
          onChange={handleChangeState}
          name="author"
          placeholder="작성자"
          type="text"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          value={state.content}
          onChange={handleChangeState}
          name="content"
          placeholder="일기"
          type="text"
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <Button variant="outlined" onClick={handleSubmit}>
          일기 저장하기
        </Button>
      </div>
    </div>
  );
};
export default DiaryEditor;
