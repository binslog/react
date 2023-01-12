import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1673445366007,
  },

  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1673445366008,
  },

  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1673445366009,
  },

  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1673445366010,
  },

  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1673445366011,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData); // 더미 데이터를 기초 값으로 넣어준다.

  const dataId = useRef(0); // 초기값 설정

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(), //
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const OnRemove = (targetId) => {
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
          OnRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
