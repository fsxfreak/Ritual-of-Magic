#pragma strict

public class PlayerMono extends MonoBehaviour
{
    private var playerInfo : RitualPlayer;

    public var crownPrefab : GameObject;
    public var amuletPrefab : GameObject;
    public var scepterPrefab : GameObject;

    public function Awake()
    {
        playerInfo = new RitualPlayer();
    }

    public function getPlayerInfo() : RitualPlayer { return playerInfo; }

    public function OnGUI()
    {
        if (Input.GetKeyDown(KeyCode.Tab))
        {
            Debug.Log("tab pressed");
            //TODO: DISPLAY PLAYER INFORMATION HERE
        }
    }

    public function Update()
    {
        //TODO: can only press the fire button every period interval
        if (Input.GetKeyDown(KeyCode.F))
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
                   , this, this/* <--PLACEHOLER OTHER PlayerMono */
                   , Artifact.AMULET/*artifact placeholder*/
                   , Network.player
                   , Network.player/*need Network.toPlayer*/);
    }

    //Only responsible for transferring artifacts.
    @RPC
    public function gotArtifact(artifact : Artifact)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            playerInfo.influences.hasCrown = true;
            //TODO: For each, do cosmetic changes on first preson controller
            break;
        case Artifact.SCEPTER:
            playerInfo.influences.hasScepter = true;

            var scepter : GameObject = Network.Instantiate(
                    scepterPrefab as GameObject,
                    transform.position,
                    transform.rotation,
                    0
                );

            scepter.transform.parent = this.transform;
            scepter.transform.localPosition = Vector3(0.5, 1.35, 0);
            scepter.transform.localEulerAngles = Vector3(0, 90, 90);

            break;
        case Artifact.AMULET:
            playerInfo.influences.hasAmulet = true;

            var amulet : GameObject = Network.Instantiate(
                    amuletPrefab as GameObject,
                    transform.position,
                    transform.rotation,
                    0
                );

            amulet.transform.parent = this.transform;
            amulet.transform.localPosition = Vector3(0, -0.25, 0.6);
            amulet.transform.localEulerAngles = Vector3(0, -90, -60;

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
            playerInfo.influences.hasCrown = false;
            break;
        case Artifact.SCEPTER:
            playerInfo.influences.hasScepter = false;
            break;
        case Artifact.AMULET:
            playerInfo.influences.hasAmulet = false;
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