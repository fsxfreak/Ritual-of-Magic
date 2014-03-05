#pragma strict

public class PlayerMono extends MonoBehaviour
{
	private var playerInfo : RitualPlayer;

	public function Awake()
	{
		playerInfo = new RitualPlayer();
	}

	public function getPlayerInfo() : RitualPlayer { return playerInfo; }
}