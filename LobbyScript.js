#pragma strict
@script RequireComponent(NetworkView)

public class LobbyScript extends MonoBehaviour
{
	public var startGameButton : GameObject = null;

	public function Awake()
	{
		DontDestroyOnLoad(this);
		networkView.group = 1;
	}

	public function Update()
	{
		if (Network.isServer)
		{
			if (startGameButton == null)
			{
				startGameButton = GameObject.Find("startGame");
			}
		}
	}

	public function OnGUI()
	{
		if (Network.isServer)
		{
			var e : Event = Event.current;
			if (e.type == EventType.MouseDown)
			{
				if (startGameButton.GetComponent(GUITexture).HitTest(e.mousePosition))
				{
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
}