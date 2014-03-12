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

    public function getInfluenceFor(artifact : Artifact) : float
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

    public function changeInfluenceFor(artifact : Artifact, amount : float)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            crown.changeInfluence(amount);
            break;
        case Artifact.SCEPTER:
            scepter.changeInfluence(amount);
            break;
        case Artifact.AMULET:
            amulet.changeInfluence(amount);
            break;
        }
    }
}