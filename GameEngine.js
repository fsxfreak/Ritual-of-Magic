#pragma strict
@script RequireComponent(NetworkView)

public class GameEngine extends MonoBehaviour
{
    public var networkedObject : GameObject;
    private var player : GameObject;

    private function tellServerLoaded()
    {
        GameObject.Find("GameEngineServer").
            networkView.RPC("receiveClientLoaded"
                          , RPCMode.Server
                          , Network.player);
    }

    public function OnLevelWasLoaded(level : int)
    {
        if (Network.isClient)
        {
            Network.isMessageQueueRunning = true;
            Network.SetSendingEnabled(0, true);
            tellServerLoaded();

            player = Network.Instantiate(networkedObject 
                                 , Vector3(
                                        Random.Range(4, 12),
                                        6,
                                        Random.Range(4, 12)
                                 )
                                 , Quaternion()
                                 , 0
                    );
        }
    }
}