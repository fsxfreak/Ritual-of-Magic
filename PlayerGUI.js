#pragma strict

public class PlayerGUI extends MonoBehaviour
{
    private var textToDisplay : Hashtable = new Hashtable();
    private var timedTexts : Array = new Array();
    private var timedTextsTimes : Hashtable = new Hashtable();

    private var textRegions : Hashtable = new Hashtable();
    /* Keys for these hashtables are hard coded.
       goal - Points value for the player.
       notification - tell the player important information
       scoreboard - display ritual state
    */
    
    public function Start()
    {
        var PADDING : int = 5;

        var goalsWidth = 300;
        var goalsHeight = 200;
        textRegions.Add("goal"
                      , Rect(PADDING
                           , PADDING
                           , goalsWidth
                           , goalsHeight));

        var notificationWidth = 200;
        var notificationHeight = 30;
        textRegions.Add("notification"
                      , Rect(Screen.width - notificationWidth - PADDING
                           , Screen.height - notificationHeight - PADDING
                           , notificationWidth
                           , notificationHeight));

        var scoreboardWidth = 300;
        var scoreboardHeight = Screen.height - goalsHeight - (2 * PADDING);
        textRegions.Add("scoreboard"
                      , Rect(PADDING
                           , goalsHeight + PADDING
                           , scoreboardWidth
                           , scoreboardHeight));

        var artifactModeWidth = 20;
        var artifactModeHeight = 14;
        textRegions.Add("artifactMode"
                      , Rect(Screen.width - artifactModeWidth - PADDING
                           , PADDING
                           , artifactModeWidth
                           , artifactModeHeight));

    }

    public function setTextToDisplay(key : String, value : String, duration : float)
    {
        if (textToDisplay.Contains(key)) //overwrite existing message
        {
            textToDisplay[key] = value;

            if (duration > 0)
            {
                var timer : TimeInterval = new TimeInterval(duration);
                timedTextsTimes[key] = timer;
                timer.start();
            }
        }
        else
        {
            textToDisplay.Add(key, value);
            
            if (duration > 0)
            {
                timedTexts.Add(key);
                var timerB : TimeInterval = new TimeInterval(duration);
                timedTextsTimes.Add(key, timerB);
                timerB.start();
            }
        }
    }

    public function removeTextFromDisplay(key : String) : boolean
    {
        textToDisplay.Remove(key);
        timedTextsTimes.Remove(key);

        for (var i : int = 0; i < timedTexts.length; i++)
        {
            if (timedTexts[i] == key)
            {
                timedTexts.RemoveAt(i);
                return true;
            }
        }
    }

    public function OnGUI()
    {
        if (textToDisplay.Contains("goal"))
        {
            GUI.Label(textRegions["goal"], textToDisplay["goal"] as String);
        }
        if (textToDisplay.Contains("notification"))
        {
            GUI.Label(textRegions["notification"], textToDisplay["notification"] as String);
        }
        if (textToDisplay.Contains("scoreboard"))
        {
            GUI.Label(textRegions["scoreboard"], textToDisplay["scoreboard"] as String);
        }
    }

    private function checkTextTimings()
    {
        for (var key : String in timedTexts)
        {
            if ((timedTextsTimes[key] as TimeInterval).check())
            {
                if (removeTextFromDisplay(key))
                {
                    return;
                }
            }
        }
    }

    public function Update()
    {
        checkTextTimings();
    }
}