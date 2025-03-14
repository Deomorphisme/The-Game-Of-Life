class Cell {
  constructor(alive = false, sqr_size, X, Y) {
    this.position = { x: X, y: Y };
    this.sqr_size = sqr_size;
    this.isAlive = alive;
    this.colour = alive ? 0 : 255;
  }

  change_state(alive_or_dead) {
    this.isAlive = alive_or_dead == "alive" ? true : false;
    this.colour = this.isAlive ? 0 : 255;
  }

  invert_state() {
    this.isAlive = !this.isAlive;
    this.colour = this.isAlive ? 0 : 255;
  }

  render() {
    noStroke();
    fill(this.colour);
    rect(this.position.x, this.position.y, this.sqr_size, this.sqr_size);
  }
}

class Grid {
  constructor(num_cells = 66, cell_size = 10, inter_cell_space = 2, init_position = { x: 5, y: 5 }) {
    this.num_cells = num_cells;
    this.cell_size = cell_size;
    this.inter_cell_space = inter_cell_space;
    this.init_position = init_position;
    this.cells = [];
  }

  populate() {
    let step = this.cell_size + this.inter_cell_space;
    let X = this.init_position.x;
    let Y = this.init_position.y;
    this.cells = [];

    for (let i = 0; i < this.num_cells; i++) {
      // Create a new row
      this.cells[i] = [];

      for (let j = 0; j < this.num_cells; j++) {
        let cell_position_X = X + j * step;
        let cell_position_Y = Y + i * step;

        // Create a new cell and add it to the row
        this.cells[i][j] = new Cell(true, this.cell_size, cell_position_X, cell_position_Y);
      }
    }
  }

  update() {
    let nextGen = []; // Next cells generation
  
    for (let i = 0; i < this.num_cells; i++) {
      nextGen[i] = [];
      for (let j = 0; j < this.num_cells; j++) {
        let cell = this.cells[i][j];
        let neighbors = this.countNeighbors(i, j); // Counting the neigthbors
  
        // rules
        if (cell.isAlive) {
          if (neighbors < 2 || neighbors > 3) {
            nextGen[i][j] = new Cell(false, this.cell_size, cell.position.x, cell.position.y); // Dead
          } else {
            nextGen[i][j] = new Cell(true, this.cell_size, cell.position.x, cell.position.y); // Alive
          }
        } else {
          if (neighbors === 3) {
            nextGen[i][j] = new Cell(true, this.cell_size, cell.position.x, cell.position.y); // Born
          } else {
            nextGen[i][j] = new Cell(false, this.cell_size, cell.position.x, cell.position.y); // Dead
          }
        }
      }
    }
    this.cells = nextGen; 
  }
  
  countNeighbors(row, col) {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              let neighborRow = row + i;
              let neighborCol = col + j;
              if (neighborRow >= 0 && neighborRow < this.num_cells &&
                  neighborCol >= 0 && neighborCol < this.num_cells &&
                  this.cells[neighborRow][neighborCol].isAlive) {
                  count++;
              }
          }
      }
      return count;
  }

  render() {
    for (let i = 0; i < this.num_cells; i++) {
      for (let j = 0; j < this.num_cells; j++) {
        this.cells[i][j].render();
      }
    }
  }

  clearGrid() {
    for (let i = 0; i < this.num_cells; i++) {
        for (let j = 0; j < this.num_cells; j++) {
            this.cells[i][j].isAlive = false;
            this.cells[i][j].colour = 255;
        }
    }
}
}

function mousePressed() {

  for (let i = 0; i < grid.cells.length; i++) {
    for (let j = 0; j < grid.cells[i].length; j++) {
      let cell = grid.cells[i][j];
      let cellX = cell.position.x;
      let cellY = cell.position.y;
      let cellSize = cell.sqr_size;

      if (mouseX > cellX && mouseX < cellX + cellSize &&
          mouseY > cellY && mouseY < cellY + cellSize) {
        cell.invert_state();
      }
    }
  }
}

let win_size = 800;
let grid;
let simulationInterval; // Variable for storing interval ID
let isPaused = false;   // Variable to monitor pause status

///////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  createCanvas(win_size, win_size);
  grid = new Grid();
  grid.populate();
  grid.clearGrid();

  // Button for next iteration
  document.getElementById('nextIteration').addEventListener('click', function() {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
      isPaused = false;
    }
    grid.update();
  });

  // Start simulation button
  document.getElementById('startSimulation').addEventListener('click', function() {
    if (simulationInterval) {
      // If simulation is already running, stop it
      clearInterval(simulationInterval);
      simulationInterval = null;
    } else {
      // Otherwise, start the simulation
      simulationInterval = setInterval(function() {
        grid.update();
      }, 300); // 300 millisecondes = 0.3 secondes
    }
  });

  // Button to pause simulation
  document.getElementById('pauseSimulation').addEventListener('click', function() {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
      isPaused = true;
    }
  });

  // Clear button to erase everything
  document.getElementById('clearGrid').addEventListener('click', function() {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
      isPaused = false;
    }
    grid.clearGrid();
  });
}

function draw() {
  background(200);
  grid.render();
}

