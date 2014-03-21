#pragma strict
@script RequireComponent(NetworkView)

public class NetworkedFPC extends MonoBehaviour
{
    private var playersInitialized : int = 0;

    public function OnSerializeNetworkView(stream : BitStream
                                         , info : NetworkMessageInfo)
    {
        if (stream.isWriting) 
        {
            var position : Vector3 = transform.position;
            var rotation : Quaternion = transform.rotation;
            stream.Serialize(position);
            stream.Serialize(rotation);
        }
        else
        {
            var temp : Vector3;
            var tempQuat : Quaternion;
            stream.Serialize(temp);
            stream.Serialize(tempQuat);
            transform.position = temp;
            transform.rotation = tempQuat;
        }
    }

    public function Start()
    {
        this.gameObject.tag = "RitualPlayer";
        if (!networkView.isMine)
        {
            for (var child : Transform in GetComponentsInChildren(Transform))
            {
                if (child.name == "Main Camera")
                {
                    child.gameObject.SetActive(false);
                }
            }
        }
        else
        {
            //make a unique name
            this.gameObject.name = 
                "rit_fpc" 
              + GetComponent(PlayerMono).getPlayerInfo().race + " "
              + GetComponent(PlayerMono).getPlayerInfo().pointValues.
                    MONSTER_BANISHED
              + GetComponent(PlayerMono).getPlayerInfo().pointValues.
                    RULES_MARUS
              + GetComponent(PlayerMono).getPlayerInfo().pointValues.
                    EAGLE_RULES_KIDA
            ;
                    
            networkView.RPC("changeName"
                          , RPCMode.Others
                          , this.gameObject.name);
        }
    }

    @RPC
    public function getPlayersInitialized(initialized : int)
    {
        playersInitialized = initialized;
    }

    @RPC
    public function changeName(nameOther : String)
    {
        this.gameObject.name = nameOther;
    }
}