#pragma strict

public class ArtifactInfluence
{
    private var crown   : Influence;
    private var scepter : Influence;
    private var amulet  : Influence;

    public var hasCrown   : boolean = false;
    public var hasScepter : boolean = false;
    public var hasAmulet  : boolean = false;

    public function ArtifactInfluence()
    {
        crown   = new Influence(0, Artifact.CROWN);
        scepter = new Influence(0, Artifact.SCEPTER);
        amulet  = new Influence(0, Artifact.AMULET);
    }

    public function getInfluenceFor(artifact : Artifact) : int
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            return crown.getInfluence();
        case Artifact.SCEPTER:
            return scepter.getInfluence();
        case Artifact.AMULET:
            return amulet.getInfluence();
        }
    }

    /*
     * If increase is set to true, will add one to influence.
     */
    public function changeInfluenceFor(artifact : Artifact, amount : float)
    {
        if (amount > 0) 
            increaseInfluenceFor(artifact, amount);
        else
            decreaseInfluenceFor(artifact, amount);
    }

    private function increaseInfluenceFor(artifact : Artifact, amount : float)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            crown.increaseInfluence(amount);
            break;
        case Artifact.SCEPTER:
            scepter.increaseInfluence(amount);
            break;
        case Artifact.AMULET:
            amulet.increaseInfluence(amount);
            break;
        }
    }

    private function decreaseInfluenceFor(artifact : Artifact, amount : float)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            crown.decreaseInfluence(amount);
            break;
        case Artifact.SCEPTER:
            scepter.decreaseInfluence(amount);
            break;
        case Artifact.AMULET:
            amulet.decreaseInfluence(amount);
            break;
        }
    }
}