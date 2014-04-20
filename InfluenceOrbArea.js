#pragma strict

public class InfluenceOrbArea extends MonoBehaviour
{
    private var MAX_ORBS : int = 5;
    public var ORB : GameObject;
    private var orbs : GameObject[];
    //TODO GAME BALANCE
    private var SPAWN_TIME : float = 10.0;
    private var spawnInterval : TimeInterval = null;

    public function Start()
    {
        if (Network.isServer)
        {
            MAX_ORBS = GetComponent(BoxCollider).bounds.size.magnitude / 10;
            orbs = new GameObject[MAX_ORBS];
            for (var i : int = 0; i < MAX_ORBS; i++)
            {
                orbs[i] = Network.Instantiate(ORB, Vector3(0, 0, 0), Quaternion(), 0);
                orbs[i].transform.parent = this.transform;
            }

            spawnInterval = new TimeInterval(SPAWN_TIME);
            spawnInterval.start();
        }
    }

    public function Update()
    {
        if (Network.isServer)
        {
            if (spawnInterval.check())
            {
                for (var i : int = 0; i < MAX_ORBS; i++)
                {
                    if (orbs[i].GetComponent(SphereCollider).enabled == false)
                    {
                        orbs[i].GetComponent(InfluenceOrb).setBounds(GetComponent(Collider).bounds);
                        orbs[i].GetComponent(InfluenceOrb).enable();
                        break;
                    }
                }
                spawnInterval.start();
            }
        }
    }
}