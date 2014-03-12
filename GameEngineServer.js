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

            GameObject.Destroy(GameObject.Find("Main Camera"));
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
            /*Debug.Log(
                player.name + " "
              + player.GetComponent(PlayerMono).getPlayerInfo()
                    .influences.getInfluenceFor(Artifact.SCEPTER)
            );*/
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

    @RPC
    public function atteptInfluence(from : PlayerMono, to : PlayerMono
                                  , artifact : Artifact
                                  , player : NetworkPlayer
                                  , toPlayer : NetworkPlayer)
    {
        var fromInfluence : float = 
            from.playerInfo.influences.getInfluenceFor(artifact);
        var toInfluence : float = 
            to.playerInfo.influences.getInfluenceFor(artifact);

        var rollNeededForSuccess : float = toInfluence - fromInfluence;
        rollNeededForSuccess = rollNeededForSuccess < 0 
                                    ? 0 
                                    : rollNeededForSuccess;

        var roll : float = Random.value;

        if (roll > rollNeededForSuccess)
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , true);
            from.gameObject.networkView.RPC("gotArtifact"
                                          , player
                                          , artifact);

            //TODO: Somehow need to get toPlayer : NetworkPlayer when raycast hit
            //to.gameObject.networkView.RPC("lostArtifact"
            //                            , toPlayer
            //                            , artifact);

            switch (from.playerInfo.race)
            {
            case Race.EAGLE_LORD:
                //RitualState.EAGLE_RULES_SORRELL = true;
                //TODO: need to randomly assign each artifact to a specific country
                //another switch in here (3 levels of conditionals, sorry torvalds)
                break;
            case Race.WOLF_MAGE:
                break;
            case Race.DRAGON_MASTER:
                break;
            }

            switch (to.playerInfo.race)
            {
            case Race.EAGLE_LORD:
                break;
            case Race.WOLF_MAGE:
                break;
            case Race.DRAGON_MASTER:
                break
            }
        }
        else
        {
            from.gameObject.networkView.RPC("hasInfluenced"
                                          , player
                                          , false);
        }
    }
}