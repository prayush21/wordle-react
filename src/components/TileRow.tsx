import { TileObj } from "../App";
import Tile from "./Tile";

const TileRow = (props: {tileRow: TileObj[]}) => {
    return <div className="Board-Row">

    {props.tileRow.map((tileData: TileObj) => <Tile tileData={tileData}/>)}
    </div>
}

export default TileRow;