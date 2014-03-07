#pragma strict

enum Race
{
    EAGLE_LORD,
    WOLF_MAGE,
    DRAGON_MASTER
}

public class RitualPlayer
{
    public var influences : ArtifactInfluence;
    public var pointValues : Points;
    public var race : Race;
    public var dead : boolean = false;

    public function RitualPlayer()
    {
        influences = new ArtifactInfluence();
        var rand : int = Random.Range(0, 3);
        switch (rand)
        {
        case 0:
            race = Race.EAGLE_LORD;
            break;
        case 1:
            race = Race.WOLF_MAGE;
            break;
        case 2:
            race = Race.DRAGON_MASTER;
            break;
        }

        pointValues = new Points(race);
    }

    public function getHurtFor(artifact :  Artifact, amount : float) 
    {
        if (amount > 0)
            return;
        
        influences.changeInfluenceFor(artifact, amount);  
    }
}