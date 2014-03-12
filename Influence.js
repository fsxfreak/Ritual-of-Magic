#pragma strict

public class Influence
{
    private var influence : float = 0;
    private var artifact  : Artifact;

    public function Influence(influ : float, artif : Artifact)
    {
        influence = influ;
        artifact = artif;
    }

    public function changeInfluence(amount : float)
    {
        influence += amount;

        if (influence <= 0)
            influence = 0;
        else if (influence >= 1)
            influence = 1;
    }
    
    public function getInfluence() : float { return influence; }
    public function getArtifact() : Artifact { return artifact; } 
}