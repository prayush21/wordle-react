import { useState } from "react";

const Alert = ({ data }: { data: string }) => {
  // let dataNew = data;

  const [hide, setHide] = useState(false);
  setTimeout(() => {
    setHide(true);
    // setAlertList(alertList?.filter((ele: string, index: number) => ele !== data))
  }, 1000);

  // setTimeout(() => {
  //     setAlertList(alertList?.filter((ele: string, index: number) => ele !== data))
  // }, 2000)
  return <div className={hide ? `alert hide` : `alert`}>{data}</div>;
};

export default Alert;
