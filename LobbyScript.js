#pragma strict
@script RequireComponent(NetworkView)

public class LobbyScript extends MonoBehaviour
{
	private var startGameButton : GUITexture;
	public var gameEngine : GameObject;

	public function Awake()
	{
		DontDestroyOnLoad(this);
		startGameButton = GameObject.Find("startGame").GetComponent(GUITexture);
	}

	public function OnGUI()
	{
		if (Network.isServer)
		{
			var e : Event = Event.current;
			if (e.type == EventType.MouseDown)
			{
				if (startGameButton.HitTest(e.mousePosition))
				{
					Debug.Log("start game");
					startGame();
				}				
			}
		}
	}

	private function startGame()
	{
		networkView.RPC("loadLevel", RPCMode.AllBuffered, "level 1");
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

		Destroy(gameObject);
	}

	public function OnDisconnectedFromServer()
	{
		Debug.Log("disconnected in level1");
	}
}