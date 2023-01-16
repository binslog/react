export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

// 년, 월, 일을 가져오는 변수를 util 폴더에 하나 만들어준다.