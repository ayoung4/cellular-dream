//////////////////////////////////
// Functional Gameoflife
//////////////////////////////////
// Constants (Global Variables)
//////////////////////////////////

const SPEED = 25;
const SCALE = 10;
const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;
const WIDTH = ~~(SCREEN_WIDTH / SCALE);
const HEIGHT = ~~(SCREEN_HEIGHT / SCALE);

const STATUS = {
    ALIVE: true,
    DEAD: false,
};

const COLORS = {
    ALIVE: { r: 255, g: 255, b: 255, a: 20 },
    DEAD: { r: 55, g: 55, b: 55, a: 10 },
};

let GAME = [];

//////////////////////////////////
// Initializing Functions
//////////////////////////////////

// function randomCell
// generate a cell with a random status

const randomCell = () => random() > 0.5
    ? STATUS.ALIVE
    : STATUS.DEAD;

// function createRow
// given a width, w, create an array of length w filled with 
// undefined values,
// turn every undefined value into a new cell

const createRow = (w) => [...Array(w)].map(randomCell);

// function createGame
// given a width, w, and a height, h, create an array of length h filled 
// with undefined values,
// turn every undefined value into an array of length w

const createGame = (w, h) => [...Array(h)].map(() => createRow(w));

//////////////////////////////////
// Calculating Functions
//////////////////////////////////

// function flatten
// creates a regular array from a 2D array

const flatten = (TwoDArray) =>
    TwoDArray.reduce((items, row) => [...items, ...row], []);

// function sliceGame
// given the coordinates of a cell, returns a 2D array of adjacent cells

const sliceGame = (game, x, y) => {
    const rows = game.slice(
        y - 1 >= 0 ? y - 1 : 0,
        (y + 1 < game.length ? y + 1 : game.length) + 1
    );
    return rows.map((r) => r.slice(
        x - 1 >= 0 ? x - 1 : 0,
        (x + 1 < r.length ? x + 1 : r.length) + 1
    ));
};

// function countAlive
// given an array of cells, returns the number of alive cells

const countAlive = (neighbors) =>
    neighbors.reduce((total, cell) =>
        total + (cell === STATUS.ALIVE ? 1 : 0), 0);

// function isAlive
// given the corrdinated of a cell, return a new status for that cell
// if a cell is dead and has 3 neighbors, bring it back to life
// an alive cell that has fewer than 1 or more than 3 neighbors dies
// otherwise, the cell remains unchanged

const isAlive = (game, cell, x, y) => {
    const neighbors = flatten(sliceGame(game, x, y));
    const numAlive = countAlive(neighbors);
    if (cell === STATUS.DEAD && numAlive === 3) {
        return STATUS.ALIVE;
    } else if (cell === STATUS.ALIVE && (numAlive < 2 || numAlive > 4)) {
        return STATUS.DEAD;
    } else {
        return cell;
    }
};

const niceSettings = {
    resurrect: (n) => n === 3,
    die: (n) => n < 2 || n > 4,
};

const okSettings = {
    resurrect: (n) => n === 4,
    die: (n) => n < 2 || n > 5,
};

const spottySettings = {
    resurrect: (n) => n === 1,
    die: (n) => n === 2 || n === 4,
};

const dialatingSettings = {
    resurrect: (n) => n > 3,
    die: (n) => n < 4 || n > 7,
};

const camoSettings = {
    resurrect: (n) => n > 2 || n < 6,
    die: (n) => n < 5 || n > 7,
};

const mazeSettings = {
    resurrect: (n) => n === 3,
    die: (n) => n === 2 || n > 5,
};

const gridSettings = {
    resurrect: (n) => n === 0 || n >= 6,
    die: (n) => n % 2,
};

const islandSettings = {
    resurrect: (n) => n > 4,
    die: (n) => n === 0 || n === 2 || n === 5 || n === 8,
};

const island2Settings = {
    resurrect: (n) => n < 2 || n > 5,
    die: (n) => n > 5 || n % 2,
};

const noiseSettings = {
    resurrect: (n) => !(n % 3) || n === 7 || n < 4,
    die: (n) => n < 3 || n === 5 || n === 7,
};

const pulsingSettings = {
    resurrect: (n) => n === 0 || n > 5,
    die: (n) => n < 6,
};

const pulsing2Settings = {
    resurrect: (n) => n === 1 || n > 5,
    die: (n) => n > 2,
};

const pulsing3Settings = {
    resurrect: (n) => n === 0 || n > 5,
    die: (n) => n > 2,
};

const geometricSettings = {
    resurrect: (n) => String(n / 3).length > 3,
    die: (n) => n < 6,
};

const geometric2Settings = {
    resurrect: (n) => String(n / 3.5).length > 3,
    die: (n) => n < 6,
};

const geometric3Settings = {
    resurrect: (n) => String(n / 3.1).length > 4,
    die: (n) => n < 7,
};

const geometric4Settings = {
    resurrect: (n) => String(n / .8).length > 3,
    die: (n) => n < 5,
};

const camo2Settings = {
    resurrect: (n) => n === 5 || n < 3,
    die: (n) => String(n / 3.1).length > 2,
};

const camo3Settings = {
    resurrect: (n) => String(n * 33)
        .split('')
        .map(Number)
        .reduce((a, m) => a + m, 0) > 20,
    die: (n) => n > 5 || n < 3,
};

const lifeSettings = {
    resurrect: (n) => n > 2 && n !== 4,
    die: (n) => n < 2 || n > 3,
};

const newSettings = {
    resurrect: (n) => n === 2,
    die: (n) => n < 2 || n > 3,
};

const aliveFnOf =
    ({ resurrect, die }) =>
        (game, cell, x, y) => {
            const neighbors = flatten(sliceGame(game, x, y));
            const numAlive = countAlive(neighbors);
            if (cell === STATUS.DEAD && resurrect(numAlive)) {
                return STATUS.ALIVE;
            } else if (cell === STATUS.ALIVE && die(numAlive)) {
                return STATUS.DEAD;
            } else {
                return cell;
            }
        };

const okAliveFn = aliveFnOf(okSettings)
const niceAliveFn = aliveFnOf(niceSettings)
const spottyAliveFn = aliveFnOf(spottySettings)
const dialatingAliveFn = aliveFnOf(dialatingSettings)
const camoAliveFn = aliveFnOf(camoSettings)
const mazeAliveFn = aliveFnOf(mazeSettings)
const gridAliveFn = aliveFnOf(gridSettings)
const islandAliveFn = aliveFnOf(islandSettings)
const noiseAliveFn = aliveFnOf(noiseSettings)
const pulsingAliveFn = aliveFnOf(pulsingSettings)
const geometricAliveFn = aliveFnOf(geometricSettings)
const geometric2AliveFn = aliveFnOf(geometric2Settings)
const geometric3AliveFn = aliveFnOf(geometric3Settings)
const geometric4AliveFn = aliveFnOf(geometric4Settings)
const pulsing2AliveFn = aliveFnOf(pulsing2Settings)
const pulsing3AliveFn = aliveFnOf(pulsing3Settings)
const camo2AliveFn = aliveFnOf(camo2Settings)
const camo3AliveFn = aliveFnOf(camo3Settings)
const island2AliveFn = aliveFnOf(island2Settings)
const lifeAliveFn = aliveFnOf(lifeSettings)
const newAliveFn = aliveFnOf(newSettings)


const aliveFns = [
    // newAliveFn,
    noiseAliveFn,
    geometricAliveFn,
    pulsingAliveFn,
    islandAliveFn,
    geometric4AliveFn,
    camoAliveFn,
    pulsingAliveFn,
    geometric3AliveFn,
    camo3AliveFn,
    pulsing3AliveFn,
    islandAliveFn,
    niceAliveFn,
    camo2AliveFn,
    pulsing3AliveFn,
    island2AliveFn,
    pulsingAliveFn,
    okAliveFn,
    dialatingAliveFn,
    lifeAliveFn,
    pulsing2AliveFn,
    geometricAliveFn,
    pulsingAliveFn,
    noiseAliveFn,
    geometric2AliveFn,
    islandAliveFn,
    gridAliveFn,
    mazeAliveFn,
    camoAliveFn,
    dialatingAliveFn,
    spottyAliveFn,
    okAliveFn,
    lifeAliveFn,
    geometric4AliveFn,
    mazeAliveFn,
    pulsingAliveFn,
    islandAliveFn,
    geometric2AliveFn,
    pulsingAliveFn,
    gridAliveFn,
    mazeAliveFn,
    camoAliveFn,
    dialatingAliveFn,
];

let aliveFnIndex = 0;

// function
// given a game state, returns a new game state with the rules of
// life applied

const life = (game) =>
    game.map((row, y) =>
        row.map((cell, x) => aliveFns[aliveFnIndex](game, cell, x, y)));

//////////////////////////////////
// Drawing Functions
//////////////////////////////////

const fillColor = ({ r, g, b, a }) => fill(r, g, b, a);

const drawMap = (game) => {
    game.forEach((row, y) => {
        row.forEach((cell, x) => {
            cell === STATUS.ALIVE
                ? fillColor(COLORS.ALIVE)
                : fillColor(COLORS.DEAD);
            rect(x * SCALE, y * SCALE, SCALE, SCALE);
        });
    });
};

//////////////////////////////////
// Animation Functions
//////////////////////////////////

var setup = () => {
    noStroke();
    frameRate(SPEED);
    createCanvas(WIDTH * SCALE, HEIGHT * SCALE);
    GAME = createGame(WIDTH, HEIGHT);
};

var draw = () => {
    GAME = life(GAME);
    drawMap(GAME);
    if (frameCount % 50 === 0) {
        if (aliveFnIndex < aliveFns.length - 1) {
            aliveFnIndex++
        } else {
            aliveFnIndex = 0;
        }
    }
};

//////////////////////////////////