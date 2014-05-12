#pragma strict
@script RequireComponent(NetworkView)

/**
    Should keep track of the relevant gamestates that affect
    the scoring. See PointValues for the values should be checking for.
        Put the game state in static state class that contains 
        boolean for each of the states.
*/

public class GameEngineServer extends MonoBehaviour
{
    public var networkedObject : GameObject;

    private var players : Hashtable;
    private var fpcPlayers : GameObject[];

    private var hasControllersAll : boolean;

    private var player : GameObject;

    private var WORLD_STATE_UPDATE_INTERVAL : float = 5.0;
    private var worldStateTimer : TimeInterval = null;

    //TODO GAME BALANCE
    private var INFLUENCE_DIFFERENCE_EPSILON : float = 3.0;

    private var timerSecondsLeft : float = 600;
    private var timerSecondsLeftInterval : TimeInterval = null;

    public function Start()
    {
        if (Network.isServer)
        {
            hasControllersAll = false;
            players = new Hashtable();
            fpcPlayers = new Array();
            worldStateTimer = new TimeInterval(WORLD_STATE_UPDATE_INTERVAL);
            timerSecondsLeftInterval = new TimeInterval(0.9);
            timerSecondsLeftInterval.start();

            //label each player false if they have not connected yet
            for (var player : NetworkPlayer in Network.connections)
            {
                players.Add(player, false);
                Network.SetReceivingEnabled(player, 0, true);
                Network.SetSendingEnabled(player, 0, true);
            }

            Network.Destroy(GameObject.Find("Main Camera"));

            //Generate the races that control each country
            var randomNumbers : int[] = new int[3];
            randomNumbers[0] 
                = randomNumbers[1] 
                = randomNumbers[2] 
                = Random.Range(0,3);
            while (randomNumbers[0] == randomNumbers[1])
                randomNumbers[1] = Random.Range(0, 3);
            while (randomNumbers[0] == randomNumbers[2] 
                || randomNumbers[1] == randomNumbers[2])
                randomNumbers[2] = Random.Range(0, 3);

            var randomArtifacts : int[] = new int[3];
            for (var i : int = 0; i < 3; i++)
            {
                switch(randomNumbers[i])
                {
                case 0:
                    randomArtifacts[i] = Artifact.CROWN;
                    break;
                case 1:
                    randomArtifacts[i] = Artifact.SCEPTER;
                    break;
                case 2:
                    randomArtifacts[i] = Artifact.AMULET;
                    break;
                }
            }

            RitualState.ARTIFACT_SORRELL = randomArtifacts[0];
            RitualState.ARTIFACT_MARUS = randomArtifacts[1];
            RitualState.ARTIFACT_KIDA = randomArtifacts[2];
        }
    }

    public function Update()
    {
        if (Network.isServer)
        {
            if (checkAllPlayersConnected() && !hasControllersAll)
            {
                player = initializePlayer();    //a player for myself
                hasControllersAll = true;

                fpcPlayers = GameObject.FindGameObjectsWithTag("RitualPlayer");
            }

            updateWorldState();
            if (worldStateTimer.check())
            {
                spreadWorldState();
                worldStateTimer.start();
            }

            if (Input.GetKeyDown(KeyCode.Tab))
            {
                RitualState.printStatus();
            }

            updateTimer();
        }
    }

    /**
        Keep track of all of our artifacts, who has what, and what's
        going on
    */
    private function updateWorldState()
    {
        var players : GameObject[] = 
            GameObject.FindGameObjectsWithTag("RitualPlayer");

        /* gonna bitmask this
         * see RitualGoals for mask values
         * 0000 0000  0000 0000  0000 0000  0000 0000
         * --^----^-----^----^-----^----^-----^----^-
         * --|----|-----|----|-----|----|-----|----|-
         * -NA---NA----NA---NA----NA---NA---ARTI-RACE
         */

        var statuses : Array = new Array();

        for (var player : GameObject in players)
        {
            var info : RitualPlayer = player.GetComponent(PlayerMono).getPlayerInfo();

            var race : int = info.race;
            var artifactMask : int = info.influences.artifactMask;
            
            var status : int = race + artifactMask;
            statuses.push(status);

            RitualState.updateRuling(statuses);
        }


    }

    private function initializePlayer() : GameObject
    {
        return Network.Instantiate(networkedObject 
                                 , Vector3(
                                        Random.Range(1150, 1200),
                                        250,
                                        Random.Range(1178, 1240)
                                   )
                                 , Quaternion()
                                 , 0
                    );
    }

    private function checkAllPlayersConnected() : boolean
    {
        if (!players.ContainsValue(false) && players.Count > 0)
        {
            return true;
        }
        if (players.ContainsValue(true))
        {

        }
        return false;
    }

    @RPC
    public function receiveClientLoaded(player : NetworkPlayer)
    {
        players[player] = true;
    }

    @RPC
    public function attemptInfluencePillar(fromName : String, toName : String)
    {
        var from : PlayerMono = GameObject.Find(fromName).GetComponent(PlayerMono);
        var to   : ArtifactPillar = GameObject.Find(toName).GetComponent(ArtifactPillar);

        var player : NetworkPlayer = from.gameObject.networkView.owner;
        var pillar : NetworkPlayer = to.gameObject.networkView.owner;

        var artifact : int = to.getArtifact();

        var fromInfluence : float 
            = from.getPlayerInfo().influences.getInfluenceFor(artifact);
        var toInfluence   : float
            = to.getInfluence();

        var rollNeededForSuccess : float = (toInfluence - fromInfluence) * INFLUENCE_DIFFERENCE_EPSILON;
        rollNeededForSuccess = rollNeededForSuccess < 0 
                             ? 0 
                             : rollNeededForSuccess;
        rollNeededForSuccess = rollNeededForSuccess > 0
                             ? 1
                             : rollNeededForSuccess;
        var roll : float = rollValue();
        Debug.Log("to influence: " + toInfluence);
        Debug.Log("from influence: " + fromInfluence);
        Debug.Log("rollNeededForSuccess: " + rollNeededForSuccess + "\n"
                + "roll: " + roll);

        //if pillar influence = 0, artifact already taken from it
        if (roll > rollNeededForSuccess && to.getInfluence() > 0)
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , "true");
            from.gameObject.networkView.RPC("gotArtifact"
                                          , player
                                          , to.getArtifact());

            to.gameObject.networkView.RPC("lostArtifact"
                                        , RPCMode.All);
        }
        else
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , "false");
        }
    }

    @RPC
    public function attemptInfluence(fromName : String, toName : String
                                   , artifact : int)
    {
        var from : PlayerMono = GameObject.Find(fromName).GetComponent(PlayerMono);
        var to : PlayerMono = GameObject.Find(toName).GetComponent(PlayerMono);

        var player : NetworkPlayer = from.gameObject.networkView.owner;
        var toPlayer : NetworkPlayer = to.gameObject.networkView.owner;

        var fromInfluence : float = 
            from.getPlayerInfo().influences.getInfluenceFor(artifact);
        var toInfluence : float = 
            to.getPlayerInfo().influences.getInfluenceFor(artifact);

        var rollNeededForSuccess : float = (toInfluence - fromInfluence) * INFLUENCE_DIFFERENCE_EPSILON;
        rollNeededForSuccess = rollNeededForSuccess < 0 
                             ? 0 
                             : rollNeededForSuccess;
        rollNeededForSuccess = rollNeededForSuccess > 0
                             ? 1
                             : rollNeededForSuccess;

        var roll : float = rollValue();
        Debug.Log("to influence: " + toInfluence);
        Debug.Log("from influence: " + fromInfluence);
        Debug.Log("rollNeededForSuccess: " + rollNeededForSuccess + "\n"
                + "roll: " + roll);

        if (roll > rollNeededForSuccess
         && to.getPlayerInfo().influences.hasArtifact(artifact))
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , "true");
            from.gameObject.networkView.RPC("gotArtifact"
                                          , player
                                          , artifact);

            if (Network.isServer)
            {
                this.player.GetComponent(PlayerMono).lostArtifact(artifact);
            }
            else
            {
                to.lostArtifact(artifact);
            }
        }
        else
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , "false");
        }
    }

    private function spreadWorldState()
    {
        var state : String = RitualState.csvify();
        for (var player : GameObject in fpcPlayers)
        {
            player.networkView.RPC("updateWorldState", RPCMode.All, state);
        }
    }

    private function rollValue() : float
    {
        return Random.value * Random.value + (Random.value * 0.25);
    }

    private function updateTimer()
    {
        timerSecondsLeft -= Time.deltaTime;
        var timeLeft : int = timerSecondsLeft;
        var time : String = "";
        time += timeLeft / 60;
        time += ":";
        time += timeLeft % 60;
        
        for (var player : GameObject in fpcPlayers)
        {
            player.networkView.RPC("allUpdateTimer", RPCMode.All, time);
        }
    }
}