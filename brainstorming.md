# Flotilla

---
## TL;DR
Clicker game based around flying a caravan of spacecraft towards the center of the universe.
---

---
### Starting state

#### Player

The player starts as an AI aboard a damaged satellite that is powering up as it reaches the orbit of a star. The player has the following attributes:
    - An integer representing max energy capacity.
    - An integer of `1` representing current energy.
    - A number representing the player craft's rate of travel (speed)
    - A string `?` representing the player's distance from the center of the universe.
    - A number representing the gravitational pull of the player craft.

The player has the following abilities:
    - `