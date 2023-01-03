import { useRef, useState } from "react"

const DiaryEditor = () => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state,setState] = useState ({ //state의 상태변화 함수를 설정 
    author : "",
    content : "",
    emotion : 1,
  })  

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {    
    if (state.author.length < 1) {
        // focus
        authorInput.current.focus();
        return ;
    }

    if (state.content.length < 5) {
        // alert("일기 본문은 최소 5글자 이상 입력해주세요.")
        // focus
        contentInput.current.focus();
        return ;
    }

    alert("저장 성공")
    }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
        ref={authorInput} 
        name="author"
        value={state.author} 
        onChange= {handleChangeState}
        />
      </div>
        
      <div>
        <textarea
          ref={contentInput}
          name="content" 
          value={state.content} 
          onChange={handleChangeState}
        />
      </div>

      <div>
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor; 