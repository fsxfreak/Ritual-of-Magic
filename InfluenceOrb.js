#pragma strict

public class InfluenceOrb extends MonoBehaviour
{
    //TODO GAME BALANCE
    private var influenceContained : float = 0.05;
    private var validArea : Bounds;

    public function Start()
    {
        influenceContained = randomInfluence();
        disable();
    }
    public function setBounds(bound : Bounds) { validArea = bound; }
    public function disable()
    {
        networkView.RPC("syncThis", RPCMode.All, 0.0, 0.0, 0.0, 0.0, false
                      , validArea.center.x, validArea.center.y, validArea.center.z
                      , validArea.size.x, validArea.size.y, validArea.size.z);
    }
    public function enable()
    {
        influenceContained = randomInfluence();

        var x : float = Random.Range(validArea.min.x, validArea.max.x);
        var y : float = Random.Range(validArea.min.y, validArea.max.y);
        var z : float = Random.Range(validArea.min.z, validArea.max.z);

        networkView.RPC("syncThis", RPCMode.All
                      , influenceContained
                      , x, y, z
                      , true
                      , validArea.center.x, validArea.center.y, validArea.center.z
                      , validArea.size.x, validArea.size.y, validArea.size.z);
    }

    @RPC
    public function syncThis(influ : float
                           , x : float, y : float, z : float
                           , enabled : boolean
                           , centerX : float, centerY : float, centerZ : float
                           , sizeX : float, sizeY : float, sizeZ : float)
    {
        influenceContained = influ;
        transform.position = Vector3(x, y, z);
        gameObject.GetComponent(SphereCollider).enabled = enabled;
        gameObject.GetComponent(ParticleSystem).enableEmission = enabled;
        validArea = Bounds(Vector3(centerX, centerY, centerZ), Vector3(sizeX, sizeY, sizeZ));
    }

    private function randomInfluence() : float
    {
        return Random.Range(0.01, 0.04) + Random.Range(0.01, 0.04);
    }
    public function getInfluenceContained() : float { return influenceContained; }
}