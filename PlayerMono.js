#pragma strict

public class PlayerMono extends MonoBehaviour
{
    private var playerInfo : RitualPlayer;

    public function Awake()
    {
        playerInfo = new RitualPlayer();
    }

    public function getPlayerInfo() : RitualPlayer { return playerInfo; }

    public function OnGUI()
    {
        if (Input.GetKeyDown("tab"))
        {
            Debug.Log("tab pressed");
            //TODO: DISPLAY PLAYER INFORMATION HERE
        }
    }

    public function Update()
    {
        //TODO: can only press the fire button every period interval
        if (Input.GetKeyDown("F"))
        {
            fireInfluenceShot();
        }
    }

    private function fireInfluenceShot()
    {
        //TODO: Fire a shot to influence
        //Let player choose which artifact to get
        GameObject.Find("GameEngineServer").networkView
                .RPC("attemptInfluence", RPCMode.Server
                   , this.gameObject, this.gameObject/* <--PLACEHOLER OTHER PlayerMono */);
    }

    //Only responsible for transferring artifacts.
    @RPC
    public function gotArtifact(artifact : Artifact)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            playerInfo.influences.crown = true;
            //TODO: For each, do cosmetic
            break;
        case Artifact.SCEPTER:
            playerInfo.influences.crown = true;
            break;
        case Artifact.AMULET:
            playerInfo.influences.crown = true;
            break;
        }
    }

    //Only responsible for transferring artifacts.
    @RPC
    public function lostArtifact(artifact : Artifact)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            playerInfo.influences.crown = false;
            break;
        case Artifact.SCEPTER:
            playerInfo.influences.crown = false;
            break;
        case Artifact.AMULET:
            playerInfo.influences.crown = false;
            break;
        }
    }

    //Called after every influence attempt from the server
    @RPC
    public function hasInfluenced(influenceGet : boolean)
    {
        if (influenceGet)
        {
            //TODO - Display influence gotten
            
        }
        else
        {
            //TODO - Display influence failed!
        }
    }
}