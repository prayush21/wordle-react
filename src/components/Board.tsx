import { useContext } from "react";
import { AppContext, TileObj } from "../App";
import TileRow from "./TileRow";

const Board = () => {
  const appContext = useContext(AppContext);
  // console.log(appContext?.board)
  // const tiles: TileObj[] = new Array(30).fill(eTile);

  // const [tiles, setTiles] = useState<TileObj[]>( new Array(30).fill(eTile));
  // tiles.fill(wTile,0,3);
  // tiles.fill(cTile,7,20);
  // tiles.fill(wpTile,23,25);
  // tiles.fill(aTile,26,27);

  return (
    <>
      <div className="Board-module">
        {appContext?.board.map(
          (tileRow: TileObj[]) => (
            <TileRow tileRow={tileRow} />
          )
          // tileRow.map((tileData: TileObj) => <Tile tileData={tileData}/>)
        )}
      </div>
    </>
  );
};

export default Board;
