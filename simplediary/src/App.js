// import React, {useRef, useState} from 'react';
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "박승빈",
    content: "hi",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "김환희",
    content: "hi 2",
    emotion: 1,
    created_data: new Date().getTime(),
  },
  {
    id: 3,
    author: "김영희",
    content: "hi 3",
    emotion: 3,
    created_date: new Date().getTime(),
  },

  {
    id: 4,
    author: "김철수",
    content: "hi 4",
    emotion: 3,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
