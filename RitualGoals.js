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

enum Artifact
{
    CROWN,
    SCEPTER,
    AMULET,

    INVALID
}

enum Countries
{
    MARUS,
    KIDA,
    SORRELL
}