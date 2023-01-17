import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState(); // 기존 데이터 받고
  const navigate = useNavigate(); // 이동해줄 곳 받고
  const { id } = useParams(); // param을 id로 받는다.

  const diaryList = useContext(DiaryStateContext); // DiaryStateContext 를 받아온다.

  // mount 될 때 사용할 거기 때문에 useeffect를 사용하도록 한다.
  // id나 diaryList 가 바뀔때. useEffect (()=>{},[])
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      // 잘못되었으면, 타겟 diary의 유무에 따라서.
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  // origindata가 있으면,
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
