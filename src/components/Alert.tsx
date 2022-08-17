import { useContext, useState } from "react";
import { AppContext } from "../App";

const Alert = ({data}: {data:string}) => {
    // let dataNew = data;
    const appContext = useContext(AppContext);
    const { board, setBoard, currentAttempt, setCurrentAttempt , alertList, setAlertList} = appContext || {};
 
    const [hide, setHide] = useState(false);
    setTimeout(() => {
        setHide(true);
        // setAlertList(alertList?.filter((ele: string, index: number) => ele !== data))
    }, 1000)

    // setTimeout(() => {
    //     setAlertList(alertList?.filter((ele: string, index: number) => ele !== data))
    // }, 2000)
    return <div className={hide ? `alert hide` : `alert`}>{data}</div>
}

export default Alert;