import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  // useContext,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

const reducer = (state, action) => {
  // 첫번째 파라미터는 상태, 두번째는 액션
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }

    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }

    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }

    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext(); // default는 공백

export const DiaryDispatchContext = React.createContext(); // default는 공백

const App = () => {
  const [data, dispatch] = useReducer(reducer, []); // 상태변화를 처리하는 reducer, 데이터 초기값 빈배열

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData }); //  setData(initData) 역할
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback(
    (author, content, emotion) => {
      dispatch({
        type: "CREATE",
        data: { author, content, emotion, id: dataId.current },
      }); // oncreate 함수에서 action 개체를 일으켰다..!!

      dataId.current += 1;
    },

    []
  );

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizeDispatches = useMemo(() => {
    return { onCreate, onEdit, onRemove };
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizeDispatches}>
        <div className="App">
          <OptimizeTest />
          <DiaryEditor onCreate={onCreate} />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};
export default App;
