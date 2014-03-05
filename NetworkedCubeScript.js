#pragma strict
@script RequireComponent(NetworkView)

public class NetworkedCubeScript extends MonoBehaviour
{
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
}
