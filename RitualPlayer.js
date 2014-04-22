#pragma strict

public class RitualPlayer
{
    public var influences : ArtifactInfluence;
    public var ritualLevel : float = 0.2; //TODO TEST
    public var pointValues : Points;
    public var race : int;
    public var dead : boolean = false;

    //TODO: Update these player statuses, after artifacts have been obtained or lost
    public var CONTROLS_MONSTER        : boolean = false;
    public var RULES_SORRELL           : boolean = false;
    public var RULES_MARUS             : boolean = false;
    public var RULES_KIDA              : boolean = false;

    //should call hashWorldState() after setting this
    public var worldState : String = "";
    private var state : Hashtable = new Hashtable();

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

    public function stringify() : String 
    {
        return
            "Your race: " + Race.translate(race) + "\n"
          + "Controlled artifacts: " + Artifact.translateMask(influences.artifactMask) + "\n"
          + influences.stringify() + "\n"
          + "Ritual level: " + ritualLevel + "\n"
          + "Score: " + calculateScore();
    }

    public function hashWorldState()
    {
        var splitCommas : String[] = worldState.Split(","[0]);
        for (var e : String in splitCommas)
        {
            var splitName : String[] = e.Split(":"[0]);

            var name : String = splitName[0];
            var value : String = splitName[1];

            if (state.ContainsKey(name))
                state[name] = value;
            else
                state.Add(name, value);
        }
    }

    public function calculateScore() : int
    {
        var rulerSorrell : int = Race.translate(state["RACE_RULES_SORRELL"] as String);
        var rulerMarus : int = Race.translate(state["RACE_RULES_MARUS"] as String);
        var rulerKida : int = Race.translate(state["RACE_RULES_KIDA"] as String);

        var monsterController : int = int.Parse(state["RACE_CONTROLS_MONSTER"]);
        var racesDead : int = int.Parse(state["RACES_DEAD"]);

        var monsterBanished : boolean = boolean.Parse(state["MONSTER_BANISHED"]);
        var atLeastOneCountryNoRuler : boolean = boolean.Parse(state["AT_LEAST_ONE_COUNTRY_NO_RULER"]);
        var nobodyDead : boolean = boolean.Parse(state["NOBODY_DIES"]);
        var monsterRampagesCountry : boolean = boolean.Parse(state["MONSTER_RAMPAGES_COUNTRY"]);

        var score : int = 0;
        switch (rulerSorrell)
        {
        case Race.EAGLE_LORD:
            score += pointValues.EAGLE_RULES_SORRELL;
            break;
        case Race.WOLF_MAGE:
            score += pointValues.WOLF_RULES_SORRELL;
            break;
        case Race.DRAGON_MASTER:
            score += pointValues.DRAGON_RULES_SORRELL;
            break;
        }
        switch (rulerMarus)
        {
        case Race.EAGLE_LORD:
            score += pointValues.EAGLE_RULES_MARUS;
            break;
        case Race.WOLF_MAGE:
            score += pointValues.WOLF_RULES_MARUS;
            break;
        case Race.DRAGON_MASTER:
            score += pointValues.DRAGON_RULES_MARUS;
            break;
        }
        switch (rulerKida)
        {
        case Race.EAGLE_LORD:
            score += pointValues.EAGLE_RULES_KIDA;
            break;
        case Race.WOLF_MAGE:
            score += pointValues.WOLF_RULES_KIDA;
            break;
        case Race.DRAGON_MASTER:
            score += pointValues.DRAGON_RULES_KIDA;
            break;
        }
        switch (monsterController)
        {
        case Race.EAGLE_LORD:
            score += pointValues.EAGLE_CONTROLS_MONSTER;
            break;
        case Race.WOLF_MAGE:
            score += pointValues.WOLF_CONTROLS_MONSTER;
            break;
        case Race.DRAGON_MASTER:
            score += pointValues.DRAGON_CONTROLS_MONSTER;
            break;
        }
        switch (racesDead)
        {
        case Race.EAGLE_LORD:
            score += pointValues.EAGLE_DIES;
            break;
        case Race.WOLF_MAGE:
            score += pointValues.WOLF_DIES;
            break;
        case Race.DRAGON_MASTER:
            score += pointValues.DRAGON_DIES;
            break;
        }

        if (monsterBanished) score += pointValues.MONSTER_BANISHED;
        if (atLeastOneCountryNoRuler) score += pointValues.AT_LEAST_ONE_COUNTRY_NO_RULER;
        if (nobodyDead) score += pointValues.NOBODY_DIES;
        if (monsterRampagesCountry) score += pointValues.MONSTER_RAMPAGES_COUNTRY;

        return score;
    }

    public function beautifiedHashWorldState() : String
    {
        //will display null for values that are not initialized

        var deadRaces : int = int.Parse(state["RACES_DEAD"]);
        var deadRacesString : String = "";
        if (state.ContainsKey("RACES_DEAD"))
        {
            var stringifiedDeadRaces : String = "undefined";
            if (deadRaces & Race.EAGLE_LORD == Race.EAGLE_LORD)
                stringifiedDeadRaces += "eagle ";
            if (deadRaces & Race.WOLF_MAGE == Race.WOLF_MAGE)
                stringifiedDeadRaces += "wolf ";
            if (deadRaces & Race.DRAGON_MASTER == Race.DRAGON_MASTER)
                stringifiedDeadRaces += "dragon ";

            deadRacesString = 
                deadRaces != 0
                    ? "At least one " + stringifiedDeadRaces +"is dead."
                    : "";
        }

        var raceSorrell : String = 
            state["RACE_RULES_SORRELL"] != ""
          ? "The " + state["RACE_RULES_SORRELL"]    + " rules Sorrell." + "\n"
          : "";
        var raceMarus : String = 
            state["RACE_RULES_MARUS"] != ""
          ? "The " + state["RACE_RULES_MARUS"]      + " rules Marus." + "\n"
          : "";
        var raceKida : String = 
            state["RACE_RULES_KIDA"] != ""
          ? "The " + state["RACE_RULES_KIDA"]       + " rules Kida." + "\n"
          : "";
        var raceMonster : String = 
            state["RACE_CONTROLS_MONSTER"] != "0"
          ? "The " + state["RACE_CONTROLS_MONSTER"] + " controls the monster." + "\n"
          : "";

        var beauty : String =
            raceSorrell
          + raceMarus
          + raceKida
          + raceMonster
          + deadRacesString;

        return beauty;
    }

}
