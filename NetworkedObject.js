#pragma strict
@script RequireComponent(NetworkView)

public class NetworkedObject extends MonoBehaviour
{
	public var instantiatedBy : String = null;

	public function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo)
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
