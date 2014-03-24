#pragma strict

public class NetworkChangeName extends MonoBehaviour
{

	public function setName(name : String)
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