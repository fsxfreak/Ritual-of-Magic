#pragma strict
@script RequireComponent(NetworkView)

public class NetworkedTPC extends MonoBehaviour
{
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
        if (networkView.isMine)
        {
            //make a unique name
            var raceName : String;
            switch (GetComponent(PlayerMono).getPlayerInfo().race)
            {
            case Race.EAGLE_LORD:
                raceName = "eagle";
                break;
            case Race.WOLF_MAGE:
                raceName = "wolf";
                break;
            case Race.DRAGON_MASTER:
                raceName = "dragon";
                break;
            }

            this.gameObject.name = 
                "rit_fpc" 
              + raceName + " "
              + GetComponent(PlayerMono).getPlayerInfo().pointValues.
                    MONSTER_BANISHED
              + GetComponent(PlayerMono).getPlayerInfo().pointValues.
                    RULES_MARUS
              + GetComponent(PlayerMono).getPlayerInfo().pointValues.
                    EAGLE_RULES_KIDA
            ;

            name(this.gameObject.name);
        }
    }

    public function name(name : String)
    {
        this.gameObject.name = name;
        networkView.RPC("networkChangeName", RPCMode.Others, this.gameObject.name);
    }

    @RPC
    public function networkChangeName(nameOther : String)
    {
        this.gameObject.name = nameOther;
    }
}