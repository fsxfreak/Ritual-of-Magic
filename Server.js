#pragma strict
@script RequireComponent(NetworkView)

public class Server extends MonoBehaviour
{
	//private var serverIP : String = "10.2.6.54";
	private var serverIP : String = "localhost";
	private var port : int = 25314;

	private var startServerButton : GUITexture;
	private var joinServerButton : GUITexture;

	public function Start()
	{
		startServerButton = GameObject.Find("startServer").GetComponent(GUITexture);
		joinServerButton =  GameObject.Find("joinServer").GetComponent(GUITexture);
	}

	public function OnGUI()
	{
		var e : Event = Event.current;
		if (e.type == EventType.MouseDown)
		{
			if (startServerButton.HitTest(e.mousePosition))
			{
				Debug.Log("start serve");
				startServer();
				Application.LoadLevel("lobby");
			}				
			if (joinServerButton.HitTest(e.mousePosition))
			{
				Debug.Log("join serve");
				joinServer();
			}
		}
	}

	private function startServer()
	{
		Network.InitializeServer(32, port, true);
	}

	private function joinServer()
	{
		Network.Connect(serverIP, port);
	}

	@RPC
	public function loadLevel(level : String)
	{
		Debug.Log("loading level1");

		Network.SetSendingEnabled(0, false);
		Network.isMessageQueueRunning = false;
		Application.LoadLevel(level);
		yield;
		yield;

		Network.isMessageQueueRunning = true;
		Network.SetSendingEnabled(0, true);

		for (var go in FindObjectsOfType(GameObject))
		{
			go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);
		}
	}

	public function OnDisconnectedFromServer()
	{
		Debug.Log("disconnected in level1");
	}
}