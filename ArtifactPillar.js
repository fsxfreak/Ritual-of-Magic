#pragma strict
@script RequireComponent(NetworkView)

public class ArtifactPillar extends MonoBehaviour
{
	@Range(0, 3)
	public var artifactNum : int = 3;
	//0 crown, 1 scepter, 2 amulet, 3 invalid

	//TODO GAME BALANCE
	@Range(0, 1)
	public var startingInfluence : float = 0.25;

	private var influence : Influence = null;

	public function Awake()
	{
		var artifact : Artifact = Artifact.INVALID;

		switch (artifactNum)
		{
		case 0:
			artifact = Artifact.CROWN;
			break;
		case 1:
			artifact = Artifact.SCEPTER;
			break;
		case 2:
			artifact = Artifact.AMULET;
			break;
		default:
			artifact = Artifact.INVALID;
		}

		influence = new Influence(startingInfluence, artifact);
	}

	public function getArtifact() : Artifact { return influence.getArtifact(); }
	public function getArtifactNum() : int { return artifactNum; }

	public function getInfluence() : float { return influence.getInfluence(); }

	@RPC
	public function lostArtifact()
	{
		influence.setInfluence(0.0);
	}


}