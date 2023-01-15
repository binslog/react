import React, { useReducer, useRef, useEffect } from "react"; //

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 라우터를 쓰기 위해 import

// import pages.
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// state에 대한 action을 처리한다.
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data; // int은 data를 모두 가져온다.
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId); // REMOVE는 id와 target.id가 같지 않은 것을 필터 처리한다.
      break;
    }
    case "EDIT": {
      newState = state.map(
        (it) => (it.id === action.data.id ? { ...action.data } : it) //
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id: 1,
//     emotion: 1,
//     content: "오늘의 일기 1번",
//     date: 1673445366007,
//   },

//   {
//     id: 2,
//     emotion: 2,
//     content: "오늘의 일기 2번",
//     date: 1673445366008,
//   },

//   {
//     id: 3,
//     emotion: 3,
//     content: "오늘의 일기 3번",
//     date: 1673445366009,
//   },

//   {
//     id: 4,
//     emotion: 4,
//     content: "오늘의 일기 4번",
//     date: 1673445366010,
//   },

//   {
//     id: 5,
//     emotion: 5,
//     content: "오늘의 일기 5번",
//     date: 1673445366011,
//   },
// ];

// localstorage는 없어져도 지워지지 않는다.

function App() {
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(b.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);
  // localstorage는 없어져도 지워지지 않는다.

  const [data, dispatch] = useReducer(reducer, []);
  // data를 dispatch할거고, useReducer에서 reducer를 쓸거야.
  // dummyData를 기초 값으로 넣어준다.

  const dataId = useRef(6); // 초기값 설정 6번 부터 해야한다. 안그러면 겹친다.

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", // 위에서 설정한 action.type
      data: {
        id: dataId.current,
        date: new Date(date).getTime(), // 새로운 날짜를 반환
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  // ID는 유지를 하면서, ACTION.DATA를 바꾼다.

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
