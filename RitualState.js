#pragma strict

public class RitualState
{
    public static var ARTIFACT_SORRELL        : int = 0;
    public static var ARTIFACT_MARUS          : int = 0;
    public static var ARTIFACT_KIDA           : int = 0;

    public static var RACE_RULES_SORRELL      : int = 0;
    public static var RACE_RULES_MARUS        : int = 0;
    public static var RACE_RULES_KIDA         : int = 0;
    public static var RACE_CONTROLS_MONSTER   : int = 0;
    public static var RACES_DEAD              : int = 0;

    public static var MONSTER_BANISHED        : boolean = false;
    public static var AT_LEAST_ONE_COUNTRY_NO_RULER : boolean = true;
    public static var NOBODY_DIES             : boolean = true;
    public static var MONSTER_RAMPAGES_COUNTRY: boolean = false;

    public static var RITUAL_CANDLE : float = 0;
    public static var RITUAL_BELL : float = 0;
    public static var RITUAL_BOOK : float = 0;

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
              ARTIFACT_SORRELL                  + ":ARTIFACT_SORRELL\n"
            + ARTIFACT_MARUS                    + ":ARTIFACT_MARUS\n"
            + ARTIFACT_KIDA                     + ":ARTIFACT_KIDA\n"
            + whoRules(Countries.SORRELL)       + ":RACE_RULES_SORRELL\n"
            + whoRules(Countries.MARUS)         + ":RACE_RULES_MARUS\n"
            + whoRules(Countries.KIDA)          + ":RACE_RULES_KIDA\n"
            + RACE_CONTROLS_MONSTER             + ":RACE_CONTROLS_MONSTER\n"
            + RACES_DEAD                        + ":RACES_DEAD\n"
            + MONSTER_BANISHED                  + ":MONSTER_BANISHED\n"
            + AT_LEAST_ONE_COUNTRY_NO_RULER     + ":AT_LEAST_ONE_COUNTRY_NO_RULER\n"
            + NOBODY_DIES                       + ":NOBODY_DIES\n"
            + MONSTER_RAMPAGES_COUNTRY          + ":MONSTER_RAMPAGES_COUNTRY"
        );
    }

    public static function csvify() : String
    {
        var state : String = 
                "RACE_RULES_SORRELL:" + whoRules(Countries.SORRELL) + ","
              + "RACE_RULES_MARUS:" + whoRules(Countries.MARUS) + ","
              + "RACE_RULES_KIDA:" + whoRules(Countries.KIDA) + ","
              + "RACE_CONTROLS_MONSTER:" + RACE_CONTROLS_MONSTER + ","
              + "RACES_DEAD:" + RACES_DEAD + ","
              + "MONSTER_BANISHED:" + MONSTER_BANISHED + ","
              + "AT_LEAST_ONE_COUNTRY_NO_RULER:" + AT_LEAST_ONE_COUNTRY_NO_RULER + ","
              + "NOBODY_DIES:" + NOBODY_DIES + ","
              + "MONSTER_RAMPAGES_COUNTRY:" + MONSTER_RAMPAGES_COUNTRY + ","
              + "RITUAL_CANDLE:" + RITUAL_CANDLE + ","
              + "RITUAL_BELL:" + RITUAL_BELL + ","
              + "RITUAL_BOOK:" + RITUAL_BOOK;

        return state;
    }
}