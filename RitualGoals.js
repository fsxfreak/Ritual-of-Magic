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
        }
    }

    //quick and dirty, should insert commas and capitalize accordingly, but no time
    public function translateMask(artifact : int) : String
    {
        var artifacts : String = "";
        if (artifact & CROWN == CROWN)
            artifacts += "crown ";
        if (artifact & SCEPTER == SCEPTER)
            artifacts += "scepter ";
        if (artifact & AMULET == AMULET)
            artifact += "amulet ";
    }
}