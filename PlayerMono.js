#pragma strict

public class PlayerMono extends MonoBehaviour
{
    private var playerInfo : RitualPlayer;

    public var crownPrefab : GameObject;
    public var amuletPrefab : GameObject;
    public var scepterPrefab : GameObject;

    public var chooseArtifactText : GameObject;

    private var canShootInfluence : boolean = true;
    private var hasShotInfluence  : boolean = false;
    private var hasChosenArtifact : boolean = false;
    private var chosenArtifact    : int = 3;
    private var otherPlayerName   : String = "";

    private var startTime : int = 0;
    //GAME BALANCE: TODO
    private var INFLUENCING_COOLDOWN : int = 5; //in seconds

    public function Awake()
    {
        playerInfo = new RitualPlayer();
        startTime = Time.time;

        chooseArtifactText = transform.Find("chooseArtifactText").gameObject;
        chooseArtifactText.SetActive(false);
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
        if (networkView.isMine)
        {
            influenceUpdateShot();
            if ((Time.time - startTime) % INFLUENCING_COOLDOWN > 0
              && !canShootInfluence)
            {
                canShootInfluence = true;
            }
        }     
    }

    private function influenceUpdateShot()
    {
        //TODO: can only press the fire button every period interval
        if (Input.GetKeyDown(KeyCode.F) && canShootInfluence)
        {
            hasShotInfluence = true;
            fireInfluenceShot();
        }

        if (hasShotInfluence && !hasChosenArtifact)
        {
            waitForArtifactChosen();
        }
        else if (hasShotInfluence && hasChosenArtifact 
              && chosenArtifact != 3)
        {
            Debug.Log("Shot influence to server");

            GameObject.Find("GameEngineServer").networkView
                .RPC("attemptInfluence", RPCMode.Server
                   , gameObject.name, otherPlayerName
                   , chosenArtifact);

            hasShotInfluence = false;
            hasChosenArtifact = false;
            chosenArtifact = 3;
        }
    }

    private function waitForArtifactChosen()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1))
        {
            chosenArtifact = 0;
            hasChosenArtifact = true;
            Debug.Log("chose crown");
        }
        else if (Input.GetKeyDown(KeyCode.Alpha2))
        {
            chosenArtifact = 1;
            hasChosenArtifact = true;
            Debug.Log("chose scepter");
        }
        else if (Input.GetKeyDown(KeyCode.Alpha3))
        {
            chosenArtifact = 2;
            hasChosenArtifact = true;
            Debug.Log("chose amulet");
        }
    }

    private function fireInfluenceShot()
    {
        //TODO: Fire a shot to influence
        var camera : Transform = transform.Find("Main Camera");
        var pos : Vector3 = camera.position;
        var dir : Vector3 = camera.transform.forward;

        var rayInfo : RaycastHit;
        if (Physics.Raycast(pos, dir, rayInfo, 500.0))
        {
            var trans : Transform = rayInfo.transform;
            if (trans.tag == "RitualPlayer")
            {
                otherPlayerName = trans.gameObject.name;
                Debug.Log(this.name + " shot " + otherPlayerName);
            }
        }

        //status variables for shootin influence
        canShootInfluence = false;
        hasShotInfluence = true;
        hasChosenArtifact = false;
        chosenArtifact = 3;
    }

    //Only responsible for transferring artifacts.
    @RPC
    public function gotArtifact(artifactNum : int)
    {
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

        Debug.Log("got artifact: " + artifact);
        switch (artifact)
        {
        case Artifact.CROWN:
            playerInfo.influences.hasCrown = true;

            var crown : GameObject = Network.Instantiate(
                    crownPrefab as GameObject,
                    transform.position,
                    transform.rotation,
                    0
                );

            crown.transform.parent = this.transform;
            crown.transform.localPosition = Vector3(0, 0.825, 0);
            crown.transform.localEulerAngles = Vector3(0, 0, 0);

            crown.name = "crown";

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

            scepter.name = "scepter";

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
            amulet.transform.localEulerAngles = Vector3(0, -90, -60);

            amulet.name = "amulet";

            break;
        }
    }

    //Only responsible for transferring artifacts.
    @RPC
    public function lostArtifact(artifactNum : int)
    {
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

        Debug.Log("lost artifact: " + artifact);

        switch (artifact)
        {
        case Artifact.CROWN:
            playerInfo.influences.hasCrown = false;

            var crown = transform.Find("crown");
            if (crown)
                Network.Destroy(crown.gameObject.networkView.viewID);

            break;
        case Artifact.SCEPTER:
            playerInfo.influences.hasScepter = false;

            var scepter = transform.Find("scepter");
            if (scepter)
                Network.Destroy(scepter.gameObject.networkView.viewID);

            break;
        case Artifact.AMULET:
            playerInfo.influences.hasAmulet = false;

            var amulet = transform.Find("amulet");
            if (amulet)
                Network.Destroy(scepter.gameObject.networkView.viewID);

            break;
        }
    }

    //Called after every influence attempt from the server
    @RPC
    public function hasInfluenced(influenceGet : String)
    {
        playerInfo.updateStatus();
        if (influenceGet == "true")
        {
            //TODO - Display influence gotten
            
        }
        else if (influenceGet == "false")
        {
            //TODO - Display influence failed!
        }
    }
}