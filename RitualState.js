#pragma strict

public class RitualState
{
    public static var ARTIFACT_SORRELL        : int = 0;
    public static var ARTIFACT_MARUS          : int = 0;
    public static var ARTIFACT_KIDA           : int = 0;

    public static var RACE_RULES_SORRELL      : int = 0;
    public static var RACE_RULES_MARUS        : int = 0;
    public static var RACE_RULES_KIDA         : int = 0;

    public static var WOLF_CONTROLS_MONSTER   : boolean = false;
    public static var WOLF_DIES               : boolean = false;
    public static var DRAGON_CONTROLS_MONSTER : boolean = false;
    public static var DRAGON_DIES             : boolean = false;
    public static var EAGLE_CONTROLS_MONSTER  : boolean = false;
    public static var EAGLE_DIES              : boolean = false;

    public static var MONSTER_BANISHED        : boolean = false;
    public static var AT_LEAST_ONE_COUNTRY_NO_RULER : boolean = true;
    public static var NOBODY_DIES             : boolean = true;
    public static var MONSTER_RAMPAGES_COUNTRY: boolean = false;

    public static function updateRuling(statuses : Array)
    {
        for (var status : int in statuses)
        {
            if ((status & ARTIFACT_SORRELL) == ARTIFACT_SORRELL)
                RACE_RULES_SORRELL = status & Race.RACE;
            else if ((status & ARTIFACT_MARUS) == ARTIFACT_MARUS)
                RACE_RULES_MARUS = status & Race.RACE;
            else if ((status & ARTIFACT_KIDA) == ARTIFACT_KIDA)
                RACE_RULES_KIDA = status & Race.RACE;
        }
    }

    public static function getArtifactForCountry(country : String) : int
    {
        switch (country)
        {
        case "SORRELL":
            return ARTIFACT_SORRELL;
        case "MARUS":
            return ARTIFACT_MARUS;
        case "KIDA":
            return ARTIFACT_KIDA;
        }
    }

    private static function whoRules(country : Countries) : String
    {
        switch (country)
        {
        case Countries.SORRELL:
            return Race.translate(RACE_RULES_SORRELL);
        case Countries.MARUS:
            return Race.translate(RACE_RULES_MARUS);
        case Countries.KIDA:
            return Race.translate(RACE_RULES_KIDA);
        }
    }

    public static function printStatus()
    {
        Debug.Log(
              ARTIFACT_SORRELL                  + ": ARTIFACT_SORRELL\n"
            + ARTIFACT_MARUS                    + ": ARTIFACT_MARUS\n"
            + ARTIFACT_KIDA                     + ": ARTIFACT_KIDA\n"
            + whoRules(Countries.SORRELL)       + ": RACE_RULES_SORRELL\n"
            + whoRules(Countries.MARUS)         + ": RACE_RULES_MARUS\n"
            + whoRules(Countries.KIDA)          + ": RACE_RULES_KIDA\n"
            + WOLF_CONTROLS_MONSTER             + ": WOLF_CONTROLS_MONSTER\n"
            + WOLF_DIES                         + ": WOLF_DIES\n"
            + DRAGON_CONTROLS_MONSTER           + ": DRAGON_CONTROLS_MONSTER\n"
            + DRAGON_DIES                       + ": DRAGON_DIES\n"
            + EAGLE_CONTROLS_MONSTER            + ": EAGLE_CONTROLS_MONSTER\n"
            + EAGLE_DIES                        + ": EAGLE_DIES\n"
            + MONSTER_BANISHED                  + ": MONSTER_BANISHED\n"
            + AT_LEAST_ONE_COUNTRY_NO_RULER     + ": AT_LEAST_ONE_COUNTRY_NO_RULER\n"
            + NOBODY_DIES                       + ": NOBODY_DIES\n"
            + MONSTER_RAMPAGES_COUNTRY          + ": MONSTER_RAMPAGES_COUNTRY"
        );
    }
}