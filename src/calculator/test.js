import { getSolution } from "./getSolution.js";

import {
    columnBlock30,
    fenceBlock40,
} from "./blocks.js";


const fenceParams = {
    lengthFront: 25000,
    heightFence: 2000,
    heightColumn: 2500,

    columnsCount: 10,
    gatesLength: [1800, 2500],

    fenceBlock: fenceBlock40,
    columnBlock: columnBlock30,

    fenceCoverBlock: null,
    columnCoverBlock: null,
};


const fenceSolution = getSolution(fenceParams);

console.log(fenceSolution);