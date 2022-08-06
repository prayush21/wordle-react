import Tile from "./Tile";

interface TileObj {
    value: string,
    state: "" | "active" | "wrong" | "correct" | "wrong-position",
}

const Tiles = () => {
    const eTile: TileObj = {
        value: '',
        state: ''
    };
    const aTile: TileObj = {
        value: 'u',
        state: 'active'
    };
    const wTile: TileObj = {
        value: 'A',
        state: 'wrong'
    };
    const cTile: TileObj = {
        value: 'R',
        state: 'correct'
    };
    const wpTile: TileObj = {
        value: 'F',
        state: 'wrong-position'
    };
    const tiles: TileObj[] = new Array(30).fill(eTile);

    tiles.fill(wTile,0,3);
    tiles.fill(cTile,7,20);
    tiles.fill(wpTile,23,25);
    tiles.fill(aTile,26,27);


    return <>
        {tiles.map((obj: TileObj) => {
            
            return <Tile tileData={obj}/>
        }
        
        
        )}
    </>;
}

export default Tiles;