#pragma strict

public class Influence
{
	private var influence : int = 0;
	private var artifact  : Artifact;

	public function Influence(influ : int, artif : Artifact)
	{
		influence = influ;
		artifact = artif;
	}

	public function increaseInfluence() { influence += 1; }
	public function decreaseInfluence() 
	{
		influence -= 1;
		if (influence < 0)
			influence = 0;
	}
	public function getInfluence() : int { return influence; }

	public function getArtifact() : Artifact { return artifact; } 
}