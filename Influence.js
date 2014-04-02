#pragma strict

public class Influence
{
    private var influence : float = 0;
    private var artifact  : int;

    public function Influence(influ : float, artif : int)
    {
        influence = influ;
        artifact = artif;
    }

    public function setInfluence(amount : float)
    {
        if (amount > 1.0)
            amount = 1.0;
        else if (amount < 0.0)
            amount = 0.0;

        influence = amount;
    }
    
    public function getInfluence() : float { return influence; }
    public function getArtifact() : int { return artifact; } 
}