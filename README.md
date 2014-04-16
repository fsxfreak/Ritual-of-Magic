Ritual of Magic
===============

Ritual of Magic is based off of a little-known board game called [Castle of Magic](http://boardgamegeek.com/boardgame/1738/castle-of-magic).

**Important to know** - Since I have only roughly three hours a week during school time to code a somewhat complex game, I have set aside good practice for sloppy code that "works" to save time.

## Exploring
In descending order of what I think you will be interested in.

* ``GameEngineServer.js`` -  Contains code for interaction between players that are connected to the server. Synchronizes players, keeps track of player statuses, and tallies the ongoing game score (calculated from the current game state). 
* ``PlayerMono.js`` - Allows the player to interact with the world, mainly with initiating rituals, collecting influence points, and gaining/losing controls over artifacts. It is also tighlty coupled with ``PlayerGUI.js`` to display public information about the world status, and the status of the player. 
* ``RitualPlayer.js`` - A container class that contains various information about each player. It is also used to keep track of the influences and the artifacts that the player has. If you are interested in the things that this class contains, check out ``ArtifactInfluence.js``, ``Influence.js``, and ``Points.js``.
* ``PlayerGUI.js`` - 

