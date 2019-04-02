# Build-A-Bullet

Mobile game that combines the genres of clicker-games and bullet-hell games


TODO:

~~1.) Create confines for enemy attacks~~

    ~~Reasons: Enemy projectiles clip out of bounds and into eachother~~

    ~~Files Included: Boss.js~~

    Decided just build an entirely new system rather than work that out.

2.) Create the spaceship screen and provide the ability to switch spaceships

    Files: SpaceshipScreen.js, redux

3.) Create a larger store and upgrades to get more bullets

    BulletScreen.js, redux

4.) Implement the use of your bullets in-game

    Files: Boss.js, redux

5.) Create the settings screen - low priority

6.) Get a design choice, tighten up the homescreen and shop screens

    Files: All screens


# Grid system

The grid system is exactly that, a grid. In the current version of the game, enemy bullets can spawn anywhere, even on top of eachother. I plan to create a new grid system so that:

⋅⋅⋅Bullet patterns can become more predictable

⋅⋅⋅Shooting at enemies can be easier to implement

⋅⋅⋅Where your ship teleports can become more predictable

⋅⋅⋅Animations can be easier

It'll most likely be based on an array-type system, where the index of 0s and 1s in arrays are matched to the index of the current state of different squares. React/Redux is more efficient to do this as it renders based on what is needed.