// DragDrop.tsx
import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  useRef,
} from "react";

const DragDrop = (): JSX.Element => {
  // 드래그 중일때와 아닐때의 스타일을 구분하기 위한 state 변수
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 각 선택했던 파일들의 고유값 id
  const fileId = useRef<number>(0);

  // 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
  const dragRef = useRef<HTMLLabelElement | null>(null);

  return (
    <div className="DragDrop">
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }} // label을 이용하여 구현하기에 없애줌
        multiple={true} // 파일 다중선택 허용
      />

      <label
        className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
        // 드래그 중일때와 아닐때의 클래스 이름을 다르게 주어 스타일 차이

        htmlFor="fileUpload"
        ref={dragRef}
      >
        <div>파일 첨부</div>
      </label>
    </div>
  );
};
