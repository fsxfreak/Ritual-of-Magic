#pragma strict

public class PlayerMono extends MonoBehaviour
{
    private var playerInfo : RitualPlayer;

    public var crownPrefab : GameObject;
    public var amuletPrefab : GameObject;
    public var scepterPrefab : GameObject;

    private var canShootInfluence : boolean = true;
    private var timeShotInfluence : float = 0.0;
    private var hasShotInfluence  : boolean = false;
    private var chosenArtifact    : int = 0;
    private var otherPlayerName   : String = "";

    //GAME BALANCE: TODO
    private var INFLUENCING_COOLDOWN : int = 5; //in seconds

    private var gui : PlayerGUI;

    public function Awake()
    {
        gui = transform.Find("GUI").GetComponent(PlayerGUI);

        playerInfo = new RitualPlayer();
    }

    public function getPlayerInfo() : RitualPlayer { return playerInfo; }

    public function Update()
    {
        if (networkView.isMine)
        {
            updateGUI();
            waitForArtifactChosen();
            influenceUpdateShot();
            if ((Time.time - timeShotInfluence) < INFLUENCING_COOLDOWN)
            {
                canShootInfluence = true;
            }            
        }     
    }

    private function updateGUI()
    {
        if (Input.GetKeyDown(KeyCode.Q))
        {
            //TODO: Display the real scoreboard
            gui.setTextToDisplay("scoreboard"
                , "tsetselkklslfksjf;sdfklsjdf;lkajf;laksdjfa;sldfbaw;elfa"
                + "bwel;fkabwel;fkabweflkawbefl;akwebsdfsdfsdfsdfsdfsdfsdf"
                + "sdfklsdfa;lwebaowgihasdl;gkjaw;lkgba;wefija;wlkfajl;fka"
                + "sdkjfabwekfjabwe;fklajsd;glkabwgo;aiwheg;laksjdg;lkasdj"
                + "\nWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
                , 0);
        }
        else if (Input.GetKeyUp(KeyCode.Q))
        {
            gui.removeTextFromDisplay("scoreboard");
        }
        
        if (Input.GetKeyDown(KeyCode.E))
        {
            gui.setTextToDisplay("notification"
                               , "artifact: " + playerInfo.influences.artifactMask
                               , 0);
        }
        else if (Input.GetKeyUp(KeyCode.E))
        {
            gui.removeTextFromDisplay("notification");
        }

        if (Input.GetKeyDown(KeyCode.R))
        {
            gui.setTextToDisplay("goal"
                               , playerInfo.pointValues.stringify()
                               , 0);
        }
        else if (Input.GetKeyUp(KeyCode.R))
        {
            gui.removeTextFromDisplay("goal");
        }

        var translateArtifact : String = Artifact.translate(chosenArtifact);
        gui.setTextToDisplay("artifactMode"
                           , "Artifact mode: " + translateArtifact
                           , 0);
    }

    public function OnTriggerEnter(collision : Collider)
    {
        if (collision.gameObject.tag == "InfluenceOrb")
        {
            var influence : float = collision.gameObject.GetComponent(InfluenceOrb).getInfluenceContained();
            playerInfo.influences.addInfluenceFor(chosenArtifact, influence);

            Network.Destroy(collision.gameObject);  
        }
    }

    private function influenceUpdateShot()
    {
        //TODO: can only press the fire button every period interval
        if (Input.GetKeyDown(KeyCode.F) && canShootInfluence)
        {
            fireInfluenceShot();
        }

        else if (hasShotInfluence && chosenArtifact != Artifact.ARTIFACT)
        {
            GameObject.Find("GameEngineServer").networkView
                .RPC("attemptInfluence", RPCMode.Server
                   , gameObject.name, otherPlayerName
                   , chosenArtifact);

            hasShotInfluence = false;
        
        }
    }

    private function waitForArtifactChosen()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1))
        {
            chosenArtifact = Artifact.CROWN;
        
            Debug.Log("chose crown" + chosenArtifact);
        }
        else if (Input.GetKeyDown(KeyCode.Alpha2))
        {
            chosenArtifact = Artifact.SCEPTER;
        
            Debug.Log("chose scepter" + chosenArtifact);
        }
        else if (Input.GetKeyDown(KeyCode.Alpha3))
        {
            chosenArtifact = Artifact.AMULET;
        
            Debug.Log("chose amulet" + chosenArtifact);
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

                //status variables for shootin influence
                canShootInfluence = false;
                hasShotInfluence = true;
            
                chosenArtifact = Artifact.ARTIFACT;
            }
            else if (trans.tag == "RitualArtifactPillar")
            {
                var artifactPillar : String = trans.gameObject.name;

                Debug.Log("attempting influence on pillar");

                GameObject.Find("GameEngineServer").networkView
                .RPC("attemptInfluencePillar", RPCMode.Server
                   , gameObject.name, artifactPillar);

                canShootInfluence = false;
                hasShotInfluence = false;
            }
            
            timeShotInfluence = Time.time;
        }

        
    }

    //Only responsible for transferring artifacts.
    @RPC
    public function gotArtifact(artifact : int)
    {
        Debug.Log("got artifact: " + artifact);
        switch (artifact)
        {
        case Artifact.CROWN:
            playerInfo.influences.artifactMask |= Artifact.CROWN;

            var crown : GameObject = Network.Instantiate(
                    crownPrefab as GameObject,
                    transform.position,
                    transform.rotation,
                    0
                );

            crown.transform.parent = this.transform;
            crown.transform.localPosition = Vector3(0, 0.825, 0);
            crown.transform.localEulerAngles = Vector3(0, 0, 0);

            crown.GetComponent(NetworkedObject).name("crown");
            crown.tag = "Crown";
            crown.GetComponent(NetworkedObject).instantiatedBy
                = this.gameObject.name;

            break;
        case Artifact.SCEPTER:
            playerInfo.influences.artifactMask |= Artifact.SCEPTER;

            var scepter : GameObject = Network.Instantiate(
                    scepterPrefab as GameObject,
                    transform.position,
                    transform.rotation,
                    0
                );

            scepter.transform.parent = this.transform;
            scepter.transform.localPosition = Vector3(0.5, 1.35, 0);
            scepter.transform.localEulerAngles = Vector3(0, 90, 90);

            scepter.GetComponent(NetworkedObject).name("scepter");
            scepter.tag = "Scepter";
            scepter.GetComponent(NetworkedObject).instantiatedBy
                = this.gameObject.name;

            break;
        case Artifact.AMULET:
            playerInfo.influences.artifactMask |= Artifact.AMULET;

            var amulet : GameObject = Network.Instantiate(
                    amuletPrefab as GameObject,
                    transform.position,
                    transform.rotation,
                    0
                );

            amulet.transform.parent = this.transform;
            amulet.transform.localPosition = Vector3(0, -0.25, 0.6);
            amulet.transform.localEulerAngles = Vector3(0, -90, -60);

            amulet.GetComponent(NetworkedObject).name("amulet");
            amulet.tag = "Amulet";
            amulet.GetComponent(NetworkedObject).instantiatedBy 
                = this.gameObject.name;

            break;
        }
    }

    //Only responsible for transferring artifacts.
    @RPC
    public function lostArtifact(artifact : int)
    {
        Debug.Log("lost artifact: " + artifact);

        switch (artifact)
        {
        case Artifact.CROWN:
            playerInfo.influences.artifactMask &= ~Artifact.CROWN;

            var crowns = GameObject.FindGameObjectsWithTag("Crown");

            var crown : GameObject = null;
            for (var e : GameObject in crowns)
            {
                if (e.GetComponent(NetworkedObject).instantiatedBy
                 == this.gameObject.name)
                {
                    crown = e;
                }
            }

            if (crown)
                Network.Destroy(crown.gameObject);
            else
                Debug.Log("did not find crown.");

            break;
        case Artifact.SCEPTER:
            playerInfo.influences.artifactMask &= ~Artifact.SCEPTER;

            var scepters = GameObject.FindGameObjectsWithTag("Scepter");

            var scepter : GameObject = null;
            for (var e : GameObject in scepters)
            {
                if (e.GetComponent(NetworkedObject).instantiatedBy
                 == this.gameObject.name)
                {
                    scepter = e;
                }
            }

            if (scepter)
                Network.Destroy(scepter.gameObject);
            else 
                Debug.Log("did not find sccepter");

            break;
        case Artifact.AMULET:
            playerInfo.influences.artifactMask &= ~Artifact.AMULET;

            var amulets = GameObject.FindGameObjectsWithTag("Amulet");

            var amulet : GameObject = null;
            for (var e : GameObject in amulets)
            {
                if (e.GetComponent(NetworkedObject).instantiatedBy
                 == this.gameObject.name)
                {
                    amulet = e;
                }
            }

            if (amulet)
                Network.Destroy(amulet.gameObject);
            else
                Debug.Log("did not find amulet");

            break;
        }
    }

    //Called after every influence attempt from the server
    @RPC
    public function hasInfluenced(influenceGet : String)    //why unity no boolean rpc
    {
        if (influenceGet == "true")
        {
            gui.setTextToDisplay("notification"
                               , "You have influenced: " + Artifact.translate(chosenArtifact) + "."
                               , 3);
            
        }
        else if (influenceGet == "false")
        {
            gui.setTextToDisplay("notification"
                              , "You have failed to influenced: " + Artifact.translate(chosenArtifact) + "."
                              , 3);
        }
    }

    //TODO: should be called every 15 seconds or so
    @RPC
    public function updateWorldState(state : String)
    {
        playerInfo.worldState = state;
    }
}
