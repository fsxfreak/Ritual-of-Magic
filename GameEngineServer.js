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
    private var fpcPlayers : Array;

    private var hasControllersAll : boolean;

    private var player : GameObject;

    public function Start()
    {
        if (Network.isServer)
        {
            hasControllersAll = false;
            players = new Hashtable();
            fpcPlayers = new Array();

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
                = Random.Range(0,2);
            while (randomNumbers[0] == randomNumbers[1])
                randomNumbers[1] = Random.Range(0, 2);
            while (randomNumbers[0] == randomNumbers[2] 
                && randomNumbers[1] == randomNumbers[2])
                randomNumbers[2] = Random.Range(0, 2);

            var randomArtifacts : Artifact[] = new Artifact[3];
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
                default:
                    randomArtifacts[i] = Artifact.INVALID;
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
            }

            updateWorldState();
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

        for (var player : GameObject in players)
        {
            
        }
    }

    private function initializePlayer() : GameObject
    {
        return Network.Instantiate(networkedObject 
                                 , Vector3(
                                        Random.Range(4, 12),
                                        6,
                                        Random.Range(4, 12)
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

    private function updateRitualStateArtifactRuling(race : Race
                                                   , artifact : Artifact)
    {
        //worst piece of code ever
        //If I had more time, I'd probably use bitflags
        switch (artifact)
        {
        case Artifact.CROWN:
            if (RitualState.ARTIFACT_SORRELL == Artifact.CROWN)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_SORRELL = true;
                    RitualState.WOLF_RULES_SORRELL = false;
                    RitualState.DRAGON_RULES_SORRELL = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_SORRELL = false;
                    RitualState.WOLF_RULES_SORRELL = true;
                    RitualState.DRAGON_RULES_SORRELL = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_SORRELL = false;
                    RitualState.WOLF_RULES_SORRELL = false;
                    RitualState.DRAGON_RULES_SORRELL = true;
                    break;
                }
            }
            else if (RitualState.ARTIFACT_MARUS == Artifact.CROWN)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_MARUS = true;
                    RitualState.WOLF_RULES_MARUS = false;
                    RitualState.DRAGON_RULES_MARUS = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_MARUS = false;
                    RitualState.WOLF_RULES_MARUS = true;
                    RitualState.DRAGON_RULES_MARUS = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_MARUS = false;
                    RitualState.WOLF_RULES_MARUS = false;
                    RitualState.DRAGON_RULES_MARUS = true;
                    break;
                }
            }
            else if (RitualState.ARTIFACT_KIDA == Artifact.CROWN)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_KIDA = true;
                    RitualState.WOLF_RULES_KIDA = false;
                    RitualState.DRAGON_RULES_KIDA = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_KIDA = false;
                    RitualState.WOLF_RULES_KIDA = true;
                    RitualState.DRAGON_RULES_KIDA = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_KIDA = false;
                    RitualState.WOLF_RULES_KIDA = false;
                    RitualState.DRAGON_RULES_KIDA = true;
                    break;
                }
            }
            break;
        case Artifact.SCEPTER:
            if (RitualState.ARTIFACT_SORRELL == Artifact.SCEPTER)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_SORRELL = true;
                    RitualState.WOLF_RULES_SORRELL = false;
                    RitualState.DRAGON_RULES_SORRELL = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_SORRELL = false;
                    RitualState.WOLF_RULES_SORRELL = true;
                    RitualState.DRAGON_RULES_SORRELL = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_SORRELL = false;
                    RitualState.WOLF_RULES_SORRELL = false;
                    RitualState.DRAGON_RULES_SORRELL = true;
                    break;
                }
            }
            else if (RitualState.ARTIFACT_MARUS == Artifact.SCEPTER)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_MARUS = true;
                    RitualState.WOLF_RULES_MARUS = false;
                    RitualState.DRAGON_RULES_MARUS = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_MARUS = false;
                    RitualState.WOLF_RULES_MARUS = true;
                    RitualState.DRAGON_RULES_MARUS = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_MARUS = false;
                    RitualState.WOLF_RULES_MARUS = false;
                    RitualState.DRAGON_RULES_MARUS = true;
                    break;
                }
            }
            else if (RitualState.ARTIFACT_KIDA == Artifact.SCEPTER)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_KIDA = true;
                    RitualState.WOLF_RULES_KIDA = false;
                    RitualState.DRAGON_RULES_KIDA = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_KIDA = false;
                    RitualState.WOLF_RULES_KIDA = true;
                    RitualState.DRAGON_RULES_KIDA = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_KIDA = false;
                    RitualState.WOLF_RULES_KIDA = false;
                    RitualState.DRAGON_RULES_KIDA = true;
                    break;
                }
            }
            break;
        case Artifact.AMULET:
            if (RitualState.ARTIFACT_SORRELL == Artifact.AMULET)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_SORRELL = true;
                    RitualState.WOLF_RULES_SORRELL = false;
                    RitualState.DRAGON_RULES_SORRELL = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_SORRELL = false;
                    RitualState.WOLF_RULES_SORRELL = true;
                    RitualState.DRAGON_RULES_SORRELL = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_SORRELL = false;
                    RitualState.WOLF_RULES_SORRELL = false;
                    RitualState.DRAGON_RULES_SORRELL = true;
                    break;
                }
            }
            else if (RitualState.ARTIFACT_MARUS == Artifact.AMULET)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_MARUS = true;
                    RitualState.WOLF_RULES_MARUS = false;
                    RitualState.DRAGON_RULES_MARUS = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_MARUS = false;
                    RitualState.WOLF_RULES_MARUS = true;
                    RitualState.DRAGON_RULES_MARUS = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_MARUS = false;
                    RitualState.WOLF_RULES_MARUS = false;
                    RitualState.DRAGON_RULES_MARUS = true;
                    break;
                }
            }
            else if (RitualState.ARTIFACT_KIDA == Artifact.AMULET)
            {
                switch (race)
                {
                case Race.EAGLE_LORD:
                    RitualState.EAGLE_RULES_KIDA = true;
                    RitualState.WOLF_RULES_KIDA = false;
                    RitualState.DRAGON_RULES_KIDA = false;
                    break;
                case Race.WOLF_MAGE:
                    RitualState.EAGLE_RULES_KIDA = false;
                    RitualState.WOLF_RULES_KIDA = true;
                    RitualState.DRAGON_RULES_KIDA = false;
                    break;
                case Race.DRAGON_MASTER:
                    RitualState.EAGLE_RULES_KIDA = false;
                    RitualState.WOLF_RULES_KIDA = false;
                    RitualState.DRAGON_RULES_KIDA = true;
                    break;
                }
            }
            break;
        }
    }

    @RPC
    public function attemptInfluencePillar(fromName : String, toName : String)
    {
        Debug.Log("attemptInfluencePillar called with: "
                + "fromName: " + fromName + " "
                + "toName: " + toName + ".");

        var from : PlayerMono = GameObject.Find(fromName).GetComponent(PlayerMono);
        var to   : ArtifactPillar = GameObject.Find(toName).GetComponent(ArtifactPillar);

        var player : NetworkPlayer = from.gameObject.networkView.owner;
        var pillar : NetworkPlayer = to.gameObject.networkView.owner;

        var artifact : Artifact = to.getArtifact();

        var fromInfluence : float 
            = from.getPlayerInfo().influences.getInfluenceFor(artifact);
        var toInfluence   : float
            = to.getInfluence();

        //TODO GAME BALANCE
        var rollNeededForSuccess : float = toInfluence - fromInfluence;
        rollNeededForSuccess = rollNeededForSuccess < 0 
                             ? 0 
                             : rollNeededForSuccess;

        var roll : float = Random.value;

        //if pillar influence = 0, artifact already taken from it
        if (roll > rollNeededForSuccess && to.getInfluence() > 0)
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , "true");
            from.gameObject.networkView.RPC("gotArtifact"
                                          , player
                                          , to.getArtifactNum());

            to.gameObject.networkView.RPC("lostArtifact"
                                        , RPCMode.All);

            updateRitualStateArtifactRuling(from.getPlayerInfo().race, artifact);
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
                                   , artifactNum : int)
    {
        Debug.Log("attemptInfluence called with: "
                + "fromName: " + fromName + " "
                + "toName: " + toName + " "
                + "artifactNum: " + artifactNum + ".");

        var from : PlayerMono = GameObject.Find(fromName).GetComponent(PlayerMono);
        var to : PlayerMono = GameObject.Find(toName).GetComponent(PlayerMono);

        var player : NetworkPlayer = from.gameObject.networkView.owner;
        var toPlayer : NetworkPlayer = to.gameObject.networkView.owner;

        var artifact : Artifact = Artifact.INVALID;
        switch (artifactNum)
        {
        case 0:
            artifact = Artifact.CROWN;
            break;
        case 1: 
            artifact = Artifact.SCEPTER;
            break;
        case 2:
            artifact = Artifact.AMULET;
            break;
        }

        var fromInfluence : float = 
            from.getPlayerInfo().influences.getInfluenceFor(artifact);
        var toInfluence : float = 
            to.getPlayerInfo().influences.getInfluenceFor(artifact);

        Debug.Log("from influence: " + fromInfluence);
        Debug.Log("to influence: " + toInfluence);

        //TODO GAME BALANCE
        var rollNeededForSuccess : float = toInfluence - fromInfluence;
        rollNeededForSuccess = rollNeededForSuccess < 0 
                             ? 0 
                             : rollNeededForSuccess;

        Debug.Log("rollNeededForSuccess " + rollNeededForSuccess);

        var roll : float = Random.value;

        if (roll > rollNeededForSuccess
         && to.getPlayerInfo().influences.hasArtifact(artifact))
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , "true");
            from.gameObject.networkView.RPC("gotArtifact"
                                          , player
                                          , artifactNum);
            //TODO: Holder gets influence bonus?

            //Can't seem to be able to RPC to the server NetworkPlayer (aka self)
            if (this.player.name == to.gameObject.name)
            {
                Debug.Log("server RPC to self lostArtifact");
                to.gameObject.networkView.RPC("lostArtifact"
                                            , RPCMode.Server
                                            , artifactNum);
            }
            else
            {
                Debug.Log("client RPC " + toPlayer + " lost artifact");
                to.gameObject.networkView.RPC("lostArtifact"
                                            , toPlayer
                                            , artifactNum);
            }

            updateRitualStateArtifactRuling(from.getPlayerInfo().race, artifact);
        }
        else
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , "false");
        }
    }
}