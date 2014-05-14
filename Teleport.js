#pragma strict
@RequireComponent(BoxCollider)

public class Teleport extends MonoBehaviour
{
	private var origin : Transform;
	private var destin : Transform;

	public function Start()
	{
		origin = transform.Find("origin");
		destin = transform.Find("destination");
	}
}