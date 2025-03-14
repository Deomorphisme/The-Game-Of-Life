# Game of Life

This project is an implementation of the famous life simulation game, the Game of Life, using the p5.js library for graphical rendering and Tailwind CSS for button styling.

## Features 💡

* **Interactive grid:**
    * Click on cells to change their state (alive/dead).
* **Control buttons:**
    * **Start/Pause:** Starts or pauses the automatic simulation (one iteration every 0.3 seconds).
    * **Next:** Moves to the next iteration of the simulation.
    * **Pause:** pauses the simulation.
    * **Clear:** Clears all cells from the grid.
* **Modern style:**
    * Using Tailwind CSS for a clean and responsive design.

## Upcoming Features 💭

* Add a slider for increase or decrease the grid size
* Add information on the living population and the current iteration

## Technologies used ⚙️

* **p5.js:** JavaScript library for creating interactive graphics.
* **Tailwind CSS:** CSS framework for fast and easy styling.
* **JavaScript (ES Modules):** For game logic and user interaction.

## Installation ▶️

1.  Clone the repository:

    ```bash
    git clone https://github.com/Deomorphisme/The-Game-Of-Life.git
    ```
2. Grant permission to execute the script
    ```bash
    cd The-Game-Of-Life
    chmod +x launch-server.sh # Only the first time, to make the script executable otherwise you're not allowed
    ```
3.  Launch the web server for the simulation
    ```bash
    ./launch-server.sh
    ```

## Usage 

The script `launch-server.sh` creates a web server which allow us to run the project coded in Javascript.
* Open the url, that appear in your terminal, in your browser. It should look like `http://[::]:8080` or `http://localhost:8080` or `http://127.0.0.1:8080`.
* Click on cells to toggle them on or off.
* Use the buttons to control the simulation.

## Project structure 🗂️

* `index.html`: Main HTML file.
* `sketch.js`: Main JavaScript code (game logic, interaction).
* `p5.js`: p5.js library.

## Dependencies ⛓️

* p5.js
* Tailwind CSS (CDN)

## Screenshot 📸

![Screenshot of the project](<images/screenshot demo.png>)

## Author 👨‍💻

* Deomorphisme

## License 📜

This project is under the [MIT LICENSE](LICENSE).