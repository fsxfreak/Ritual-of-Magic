#pragma strict

public class InfluenceOrb extends MonoBehaviour
{
	//TODO GAME BALANCE
	private var infleunceContained : float = 0.05;

	public function Start()
	{
		//TODO GAME BALANCE
		influenceContained = Random.Range(0.01, 0.04) + Random.Range(0.01, 0.04);
	}

	public function getInfluenceContained() : float { return influenceContained; }
}