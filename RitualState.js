#pragma strict

public class RitualState
{
    public static var ARTIFACT_SORRELL        : Artifact = Artifact.INVALID;
    public static var ARTIFACT_MARUS          : Artifact = Artifact.INVALID;
    public static var ARTIFACT_KIDA           : Artifact = Artifact.INVALID;

    public static var WOLF_CONTROLS_MONSTER   : boolean = false;
    public static var WOLF_RULES_SORRELL      : boolean = false;
    public static var WOLF_RULES_MARUS        : boolean = false;
    public static var WOLF_RULES_KIDA         : boolean = false;
    public static var WOLF_DIES               : boolean = false;

    public static var DRAGON_CONTROLS_MONSTER : boolean = false;
    public static var DRAGON_RULES_SORRELL    : boolean = false;
    public static var DRAGON_RULES_MARUS      : boolean = false;
    public static var DRAGON_RULES_KIDA       : boolean = false;
    public static var DRAGON_DIES             : boolean = false;

    public static var EAGLE_CONTROLS_MONSTER  : boolean = false;
    public static var EAGLE_RULES_SORRELL     : boolean = false;
    public static var EAGLE_RULES_MARUS       : boolean = false;
    public static var EAGLE_RULES_KIDA        : boolean = false;
    public static var EAGLE_DIES              : boolean = false;

    public static var MONSTER_BANISHED        : boolean = false;
    public static var AT_LEAST_ONE_COUNTRY_NO_RULER : boolean = true;
    public static var NOBODY_DIES             : boolean = true;
    public static var MONSTER_RAMPAGES_COUNTRY: boolean = false;

    public static function getArtifactForCountry(country : String) : Artifact
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
}