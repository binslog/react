import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // react router hook 사용해보자

  const id = searchParams.get("id"); // id를 꺼내야한다.
  console.log("id: ", id);

  const mode = searchParams.get("mode");
  console.log("mode: ", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지입니다.</p>
      <button onClick={() => setSearchParams({ setSearchParams })}>
        QS 바꾸기
      </button>

      <br />

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로 고고!
      </button>

      <br />

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 고고!
      </button>
    </div>
  );
};

export default Edit;
