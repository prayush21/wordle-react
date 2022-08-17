import { TileObj } from "../App";


const Tile = (props: {tileData: TileObj}): JSX.Element => {
    const {tileData} = props;
    const {value, state} = tileData;
    
    return <div className="tile" data-state={state} >{value}</div>;
}

export default Tile;