#pragma strict

public class RitualPlayer
{
    public var influences : ArtifactInfluence;
    public var pointValues : Points;
    public var race : int;
    public var dead : boolean = false;

    //TODO: Update these player statuses, after artifacts have been obtained or lost
    public var CONTROLS_MONSTER        : boolean = false;
    public var RULES_SORRELL           : boolean = false;
    public var RULES_MARUS             : boolean = false;
    public var RULES_KIDA              : boolean = false;

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
}
