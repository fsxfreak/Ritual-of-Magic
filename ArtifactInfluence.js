#pragma strict

public class ArtifactInfluence
{
	var crown   : Influence;
	var scepter : Influence;
	var amulet  : Influence;

	public function ArtifactInfluence()
	{
		crown   = new Influence(0, Artifact.CROWN);
		scepter = new Influence(0, Artifact.SCEPTER);
		amulet  = new Influence(0, Artifact.AMULET);
	}

	public function getInfluenceFor(artifact : Artifact) : int
	{
		switch (artifact)
		{
		case Artifact.CROWN:
			return crown.getInfluence();
			break;
		case Artifact.SCEPTER:
			return scepter.getInfluence();
			break;
		case Artifact.AMULET:
			return amulet.getInfluence();
			break;
		}
	}

	/*
	 * If increase is set to true, will add one to influence.
	 */
	public function changeInfluenceFor(artifact : Artifact, increase : boolean)
	{
		if (increase) 
			increaseInfluenceFor(artifact);
		else
			decreaseInfluenceFor(artifact);
	}

	private function increaseInfluenceFor(artifact : Artifact)
	{
		switch (artifact)
		{
		case Artifact.CROWN:
			crown.increaseInfluence();
			break;
		case Artifact.SCEPTER:
			scepter.increaseInfluence();
			break;
		case Artifact.AMULET:
			amulet.increaseInfluence();
			break;
		}
	}

	private function decreaseInfluenceFor(artifact : Artifact)
	{
		switch (artifact)
		{
		case Artifact.CROWN:
			crown.decreaseInfluence();
			break;
		case Artifact.SCEPTER:
			scepter.decreaseInfluence();
			break;
		case Artifact.AMULET:
			amulet.decreaseInfluence();
			break;
		}
	}
}