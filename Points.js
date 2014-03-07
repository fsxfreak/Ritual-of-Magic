#pragma strict

/**
    Stores all the possible combinations of points.
    One combination for one index within each race.
    Need to keep track for each race, which index has been taken.
        Generate random index for each race.
        Each RitualPlayer stores their own points.
*/

public class Points
{
    public var CONTROLS_MONSTER        : int = 0;
    public var RULES_SORRELL           : int = 0;
    public var RULES_MARUS             : int = 0;
    public var RULES_KIDA              : int = 0;
    public var DIES                    : int = 0;

    public var WOLF_CONTROLS_MONSTER   : int = 0;
    public var WOLF_RULES_SORRELL      : int = 0;
    public var WOLF_RULES_MARUS        : int = 0;
    public var WOLF_RULES_KIDA         : int = 0;
    public var WOLF_DIES               : int = 0;

    public var DRAGON_CONTROLS_MONSTER : int = 0;
    public var DRAGON_RULES_SORRELL    : int = 0;
    public var DRAGON_RULES_MARUS      : int = 0;
    public var DRAGON_RULES_KIDA       : int = 0;
    public var DRAGON_DIES             : int = 0;

    public var EAGLE_CONTROLS_MONSTER  : int = 0;
    public var EAGLE_RULES_SORRELL     : int = 0;
    public var EAGLE_RULES_MARUS       : int = 0;
    public var EAGLE_RULES_KIDA        : int = 0;
    public var EAGLE_DIES              : int = 0;

    public var MONSTER_BANISHED        : int = 0;
    public var MONSTER_BANISHED_LIVE   : int = 0;
    public var AT_LEAST_ONE_COUNTRY_NO_RULER : int = 0;
    public var NOBODY_DIES             : int = 0;
    public var MONSTER_RAMPAGES_COUNTRY: int = 0;
    public var SOMEONE_ELSE_DIES       : int = 0;

    private static var takenEagle  : Hashtable = new Hashtable();
    private static var takenDragon : Hashtable = new Hashtable();
    private static var takenWolf   : Hashtable = new Hashtable();
    private static var takenInitialized : boolean = false;

    public function Points(race : Race)
    {
        if (!takenInitialized)
        {
            //i < 5 depends on max variable, see getUniqueIndex
            for (var i : int = 0; i < 5; i++)
            {
                takenEagle.Add(i, false);
                takenDragon.Add(i, false);
                takenWolf.Add(i, false);
            }
            takenInitialized = true;
        }


        var index : int = getUniqueIndex(race);
        assignPointsForIndex(index, race);
    }

    private function getUniqueIndex(race : Race) : int
    {
        //these loops will hang if more than 4 of each race. 
        //I assume otherwise
        //brace yourself
        switch (race)
        {
        case Race.EAGLE_LORD:
            var max : int = 5;
            var rand : int = 0;

            while (true)
            {
                Debug.Log(race + " did not unique: " + rand);

                rand = Random.Range(0, max);

                if (takenEagle[rand])
                    continue;
                else
                {
                    takenEagle[rand] = true;
                    break;
                }   
            }
            Debug.Log("found unique index: " + rand);

            return rand;
        case Race.WOLF_MAGE:
            max = 5;

            while (true)
            {
                Debug.Log(race + " did not unique: " + rand);

                rand = Random.Range(0, max);

                if (takenWolf[rand])
                    continue;
                else
                {
                    takenWolf[rand] = true;
                    break;
                }   
            }
            Debug.Log("found unique index: " + rand);

            return rand;
        case Race.DRAGON_MASTER:
            max = 5;

            while (true)
            {
                Debug.Log(race + " did not unique: " + rand);

                rand = Random.Range(0, max);

                if (takenDragon[rand])
                    continue;
                else
                {
                    takenDragon[rand] = true;
                    break;
                }   
            }
            Debug.Log("found unique index: " + rand);

            return rand;
        }
    }

    private function assignPointsForIndex(index : int, race : Race)
    {
        switch (race)
        {
        case Race.EAGLE_LORD:
            switch (index)
            {
            case 0: //gretl longnose
                CONTROLS_MONSTER        = 3000;
                RULES_SORRELL           = 5000;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = -2000;
                WOLF_RULES_SORRELL      = -3000;
                WOLF_RULES_MARUS        = -2000;
                WOLF_RULES_KIDA         = -2000;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = 0;
                DRAGON_RULES_SORRELL    = -1000;
                DRAGON_RULES_MARUS      = 0;
                DRAGON_RULES_KIDA       = 0;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = 1000;
                EAGLE_RULES_SORRELL     = 0;
                EAGLE_RULES_MARUS       = 2000;
                EAGLE_RULES_KIDA        = 2000;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = -2000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 1: //kasman ikita
                CONTROLS_MONSTER        = 3000;
                RULES_SORRELL           = 5000;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = -2000;
                WOLF_RULES_SORRELL      = -2000;
                WOLF_RULES_MARUS        = -2000;
                WOLF_RULES_KIDA         = -3000;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = 0;
                DRAGON_RULES_SORRELL    = 0;
                DRAGON_RULES_MARUS      = 0;
                DRAGON_RULES_KIDA       = -1000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = 1000;
                EAGLE_RULES_SORRELL     = 2000;
                EAGLE_RULES_MARUS       = 2000;
                EAGLE_RULES_KIDA        = 0;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = -1000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 2: //viscount dukaro
                CONTROLS_MONSTER        = -1000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 5000;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = -1000;
                WOLF_RULES_SORRELL      = 0;
                WOLF_RULES_MARUS        = -1000;
                WOLF_RULES_KIDA         = 0;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = -2000;
                DRAGON_RULES_SORRELL    = -2000;
                DRAGON_RULES_MARUS      = -3000;
                DRAGON_RULES_KIDA       = -2000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = 0;
                EAGLE_RULES_SORRELL     = 2000;
                EAGLE_RULES_MARUS       = 0;
                EAGLE_RULES_KIDA        = 2000;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = 2000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 3: //warlord battur
                CONTROLS_MONSTER        = 2000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = -1000;
                WOLF_RULES_SORRELL      = 0;
                WOLF_RULES_MARUS        = 0;
                WOLF_RULES_KIDA         = 0;
                WOLF_DIES               = 1000;

                DRAGON_CONTROLS_MONSTER = -3000;
                DRAGON_RULES_SORRELL    = 0;
                DRAGON_RULES_MARUS      = 0;
                DRAGON_RULES_KIDA       = 0;
                DRAGON_DIES             = 2000;

                EAGLE_CONTROLS_MONSTER  = 2000;
                EAGLE_RULES_SORRELL     = 0;
                EAGLE_RULES_MARUS       = 0;
                EAGLE_RULES_KIDA        = 0;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = -2000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 6000;
                break;
            case 4: //saint nephlar
                CONTROLS_MONSTER        = 0;
                RULES_SORRELL           = 2000;
                RULES_MARUS             = 2000;
                RULES_KIDA              = 2000;
                DIES                    = 5000;   

                WOLF_CONTROLS_MONSTER   = 0;
                WOLF_RULES_SORRELL      = -1000;
                WOLF_RULES_MARUS        = -1000;
                WOLF_RULES_KIDA         = -1000;
                WOLF_DIES               = -2000;

                DRAGON_CONTROLS_MONSTER = 0;
                DRAGON_RULES_SORRELL    = 0;
                DRAGON_RULES_MARUS      = 0;
                DRAGON_RULES_KIDA       = 0;
                DRAGON_DIES             = -3000;

                EAGLE_CONTROLS_MONSTER  = 3000;
                EAGLE_RULES_SORRELL     = 3000;
                EAGLE_RULES_MARUS       = 3000;
                EAGLE_RULES_KIDA        = 3000;
                EAGLE_DIES              = -3000;

                MONSTER_BANISHED        = 0;
                MONSTER_BANISHED_LIVE   = -5000;
                MONSTER_RAMPAGES_COUNTRY= -10000;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 6000;
                break;
            }

            break;
        case Race.WOLF_MAGE:
            switch (index)
            {
            case 0: //duke capri
                CONTROLS_MONSTER        = -2000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 0;
                RULES_KIDA              = 5000;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = 0;
                WOLF_RULES_SORRELL      = 2000;
                WOLF_RULES_MARUS        = 2000;
                WOLF_RULES_KIDA         = 0;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = -2000;
                DRAGON_RULES_SORRELL    = -2000;
                DRAGON_RULES_MARUS      = -2000;
                DRAGON_RULES_KIDA       = -3000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = -2000;
                EAGLE_RULES_SORRELL     = 0;
                EAGLE_RULES_MARUS       = 0;
                EAGLE_RULES_KIDA        = -1000;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = 2000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                NOBODY_DIES             = 1000;
                break;
            case 1: //contessa horta
                CONTROLS_MONSTER        = -2000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 5000;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = 0;
                WOLF_RULES_SORRELL      = 2000;
                WOLF_RULES_MARUS        = 0;
                WOLF_RULES_KIDA         = 2000;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = -2000;
                DRAGON_RULES_SORRELL    = 0;
                DRAGON_RULES_MARUS      = -1000;
                DRAGON_RULES_KIDA       = 0;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = -2000;
                EAGLE_RULES_SORRELL     = -2000;
                EAGLE_RULES_MARUS       = -3000;
                EAGLE_RULES_KIDA        = -2000;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = 2000;
                NOBODY_DIES             = 1000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 2: //sister ophelia
                CONTROLS_MONSTER        = -2000;
                RULES_SORRELL           = 5000;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = 0;
                WOLF_RULES_SORRELL      = 0;
                WOLF_RULES_MARUS        = 2000;
                WOLF_RULES_KIDA         = 2000;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = -2000;
                DRAGON_RULES_SORRELL    = -3000;
                DRAGON_RULES_MARUS      = -2000;
                DRAGON_RULES_KIDA       = -2000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = -2000;
                EAGLE_RULES_SORRELL     = -1000;
                EAGLE_RULES_MARUS       = 0;
                EAGLE_RULES_KIDA        = 0;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = 2000;
                NOBODY_DIES             = 1000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 3: //brother feldar
                CONTROLS_MONSTER        = 0;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = -1000;
                WOLF_RULES_SORRELL      = 2000;
                WOLF_RULES_MARUS        = 2000;
                WOLF_RULES_KIDA         = 2000;
                WOLF_DIES               = -1000;

                DRAGON_CONTROLS_MONSTER = -3000;
                DRAGON_RULES_SORRELL    = 0;
                DRAGON_RULES_MARUS      = 0;
                DRAGON_RULES_KIDA       = 0;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = -5000;
                EAGLE_RULES_SORRELL     = -3000;
                EAGLE_RULES_MARUS       = -3000;
                EAGLE_RULES_KIDA        = -3000;
                EAGLE_DIES              = 3000;

                MONSTER_BANISHED        = 6000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 4: //beastmaster kolona
                CONTROLS_MONSTER        = 6000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = 0;   

                WOLF_CONTROLS_MONSTER   = 2000;
                WOLF_RULES_SORRELL      = 2000;
                WOLF_RULES_MARUS        = 2000;
                WOLF_RULES_KIDA         = 2000;
                WOLF_DIES               = -1000;

                DRAGON_CONTROLS_MONSTER = -3000;
                DRAGON_RULES_SORRELL    = -2000;
                DRAGON_RULES_MARUS      = -2000;
                DRAGON_RULES_KIDA       = -2000;
                DRAGON_DIES             = 3000;

                EAGLE_CONTROLS_MONSTER  = 1000;
                EAGLE_RULES_SORRELL     = 0;
                EAGLE_RULES_MARUS       = 0;
                EAGLE_RULES_KIDA        = 0;
                EAGLE_DIES              = 1000;

                MONSTER_BANISHED        = -4000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            }

            break;
        case Race.DRAGON_MASTER:
            switch (index)
            {
            case 0: //khan gaelin
                CONTROLS_MONSTER        = 3000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 0;
                RULES_KIDA              = 5000;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = 0;
                WOLF_RULES_SORRELL      = 0;
                WOLF_RULES_MARUS        = 0;
                WOLF_RULES_KIDA         = -1000;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = 2000;
                DRAGON_RULES_SORRELL    = 2000;
                DRAGON_RULES_MARUS      = 2000;
                DRAGON_RULES_KIDA       = 0;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = -2000;
                EAGLE_RULES_SORRELL     = -2000;
                EAGLE_RULES_MARUS       = -2000;
                EAGLE_RULES_KIDA        = -3000;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = -1000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                NOBODY_DIES             = 0;
                break;
            case 1: //general jakarta
                CONTROLS_MONSTER        = 3000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 5000;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = 0;
                WOLF_RULES_SORRELL      = 0;
                WOLF_RULES_MARUS        = -1000;
                WOLF_RULES_KIDA         = 0;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = 2000;
                DRAGON_RULES_SORRELL    = 2000;
                DRAGON_RULES_MARUS      = 0;
                DRAGON_RULES_KIDA       = 2000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = -2000;
                EAGLE_RULES_SORRELL     = -2000;
                EAGLE_RULES_MARUS       = -3000;
                EAGLE_RULES_KIDA        = -2000;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = -1000;
                NOBODY_DIES             = 0;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 2: //count andrushka
                CONTROLS_MONSTER        = 3000;
                RULES_SORRELL           = 5000;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = -10000;   

                WOLF_CONTROLS_MONSTER   = -2000;
                WOLF_RULES_SORRELL      = -3000;
                WOLF_RULES_MARUS        = -2000;
                WOLF_RULES_KIDA         = -2000;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = 0;
                DRAGON_RULES_SORRELL    = 0;
                DRAGON_RULES_MARUS      = 2000;
                DRAGON_RULES_KIDA       = 2000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = 0;
                EAGLE_RULES_SORRELL     = -1000;
                EAGLE_RULES_MARUS       = 0;
                EAGLE_RULES_KIDA        = 0;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = -1000;
                NOBODY_DIES             = 0;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 3: //lady elitha
                CONTROLS_MONSTER        = 6000;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 0;
                RULES_KIDA              = 0;
                DIES                    = 0;   

                WOLF_CONTROLS_MONSTER   = -2000;
                WOLF_RULES_SORRELL      = -2000;
                WOLF_RULES_MARUS        = -2000;
                WOLF_RULES_KIDA         = -2000;
                WOLF_DIES               = 2000;

                DRAGON_CONTROLS_MONSTER = 3000;
                DRAGON_RULES_SORRELL    = 1000;
                DRAGON_RULES_MARUS      = 1000;
                DRAGON_RULES_KIDA       = 1000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = 1000;
                EAGLE_RULES_SORRELL     = 0;
                EAGLE_RULES_MARUS       = 0;
                EAGLE_RULES_KIDA        = 0;
                EAGLE_DIES              = 1000;

                MONSTER_BANISHED        = -4000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 5000;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                break;
            case 4: //lord parnak
                CONTROLS_MONSTER        = 0;
                RULES_SORRELL           = 0;
                RULES_MARUS             = 0;
                RULES_KIDA              = 3000;
                DIES                    = 0;   

                WOLF_CONTROLS_MONSTER   = -5000;
                WOLF_RULES_SORRELL      = 0;
                WOLF_RULES_MARUS        = 0;
                WOLF_RULES_KIDA         = -3000;
                WOLF_DIES               = 0;

                DRAGON_CONTROLS_MONSTER = 0;
                DRAGON_RULES_SORRELL    = 2000;
                DRAGON_RULES_MARUS      = 2000;
                DRAGON_RULES_KIDA       = -1000;
                DRAGON_DIES             = 0;

                EAGLE_CONTROLS_MONSTER  = -10000;
                EAGLE_RULES_SORRELL     = -2000;
                EAGLE_RULES_MARUS       = -2000;
                EAGLE_RULES_KIDA        = -3000;
                EAGLE_DIES              = 0;

                MONSTER_BANISHED        = -4000;
                MONSTER_BANISHED_LIVE   = 0;
                MONSTER_RAMPAGES_COUNTRY= 0;
                AT_LEAST_ONE_COUNTRY_NO_RULER = 0;
                SOMEONE_ELSE_DIES       = 5000;
                break;
            }

            break;
        }
    }
}