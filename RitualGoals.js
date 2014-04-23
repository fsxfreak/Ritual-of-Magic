#pragma strict

enum Ritual
{
    CANDLE_LIT,
    CANDLE_DOUSED,

    BELL_RING,
    BELL_SILENCE,

    BOOK_OPEN,
    BOOK_CLOSE
}

enum MonsterStatus
{
    CONTROLLED_CROWN,
    CONTROLLED_AMULET,
    CONTROLLED_SCEPTER,

    DEVOUR_CROWN_BANISHED,
    DEVOUR_AMULET_BANISHED,
    DEVOUR_SCEPTER_BANISHED,
    DEVOUR_ALL,

    BANISHED,

    WAITING
}

enum Countries
{
    SORRELL,
    MARUS,
    KIDA
}

//one thing languages with enums need to copy from Java - Java's enums
public static class Race
{
    var EAGLE_LORD : int =        1 << 0;
    var WOLF_MAGE : int =         1 << 1;
    var DRAGON_MASTER : int =     1 << 2;

    var RACE : int =              EAGLE_LORD + WOLF_MAGE + DRAGON_MASTER;

    public function translate(race : int) : String
    {
        switch (race)
        {
        case EAGLE_LORD:
            return "eagle";
        case WOLF_MAGE:
            return "wolf";
        case DRAGON_MASTER:
            return "dragon";
        default:
            return "";
        }
    }

    public function translate(race : String) : int
    {
        switch (race)
        {
        case "eagle":
            return EAGLE_LORD;
        case "wolf":
            return WOLF_MAGE;
        case "dragon":
            return DRAGON_MASTER;
        default:
            return 0;
        }
    }
}

public static class Artifact
{
    var CROWN : int =             1 << 4;
    var SCEPTER : int =           1 << 5;
    var AMULET : int =            1 << 6;

    var ARTIFACT : int =          CROWN + SCEPTER + AMULET;

    public function translate(artifact : int) : String
    {
        switch (artifact)
        {
        case CROWN:
            return "crown";
        case SCEPTER:
            return "scepter";
        case AMULET:
            return "amulet";
        default:
            return "ritual"; //im lazy sorry
        }
    }

    //quick and dirty, should insert commas and capitalize accordingly, but no time
    public function translateMask(artifact : int) : String
    {
        var artifacts : String = "";
        if ((artifact & CROWN) == CROWN)
            artifacts += "crown ";
        if ((artifact & SCEPTER) == SCEPTER)
            artifacts += "scepter ";
        if ((artifact & AMULET) == AMULET)
            artifacts += "amulet ";

        return artifacts;
    }
}

public static class RitualType
{
    public var CANDLE : int = 1 << 7;   //values are NOT used in artifactMask
    public var BELL : int   = 1 << 8;   //shifted in this way so cannot inadvertently
    public var BOOK : int   = 1 << 9;   //cause confusion

    public var RITUAL : int = CANDLE + BELL + BOOK;

    public function translate(ritualType : int) : String
    {
        switch (ritualType)
        {
        case CANDLE:
            return "candle";
        case BELL:
            return "bell";
        case BOOK:
            return "book";
        }
    }
}