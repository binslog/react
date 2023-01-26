import { useEffect } from "react";
import DragDrop from "../components/DragDrop.tsx";

const Test = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DragDrop />
    </div>
  );
};

export default Test;
