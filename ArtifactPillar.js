#pragma strict
@script RequireComponent(NetworkView)

public class ArtifactPillar extends MonoBehaviour
{
	public var artifact : int;

	//TODO GAME BALANCE
	@Range(0, 1)
	public var startingInfluence : float = 0.25;

	private var influence : Influence = null;

	public function Start()
	{
		influence = new Influence(startingInfluence, artifact);
	}

	public function getArtifact() : int { return influence.getArtifact(); }
	public function getInfluence() : float { return influence.getInfluence(); }

	@RPC
	public function lostArtifact()
	{
		influence.setInfluence(0.0);
	}


}