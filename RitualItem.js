#pragma strict
@RequireComponent(NetworkView)

public class RitualItem extends MonoBehaviour
{
	@Range(128, 512)
	public var ritualType : int;
	//128,    256,  512
	//CANDLE, BELL, BOOK

	public var value : float = 0;

	//strength includes direction +/-
	public function influence(strength : float)
	{
		//TODO modify value according to strength
		//sync by RPC
		value += strength * Time.deltaTime * 0.45;
		sync();	//might cause race issues, we'll see
	}

	public function influenceDirection(object : GameObject) : int
	{
		if (object.name == "positive")
			return 1;
		else if (object.name == "negative");
			return -1;

		return 0;
	}

	public function sync()
	{
		Debug.Log(value);
		networkView.RPC("syncThis", RPCMode.All, ritualType, value);
	}

	@RPC
	public function syncThis(ritualType : int, value : float)
	{
		this.ritualType = ritualType;
		this.value = value;
	}
}