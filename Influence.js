#pragma strict

public class Influence
{
    private var influence : float = 0;
    private var artifact  : Artifact;

    public function Influence(influ : int, artif : Artifact)
    {
        influence = influ;
        artifact = artif;
    }

    public function increaseInfluence(amount : float) 
    { 
        influence += amount;
        if (influence >= 1)
            influence = 1; 
    }
    public function decreaseInfluence(amount : float) 
    {
        influence -= amount;
        if (influence <= 0)
            influence = 0;
    }
    
    public function getInfluence() : int { return influence; }
    public function getArtifact() : Artifact { return artifact; } 
}