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

    public function hasArtifact(artifact : int) : boolean
    {
        switch (artifact)
        {
        case 0:
            return hasCrown;
        case 1:
            return hasScepter;
        case 2:
            return hasAmulet;
        default:
            return false;
        }
    }

    public function hasArtifact(artifact : Artifact) : boolean
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            return hasCrown;
        case Artifact.SCEPTER:
            return hasScepter;
        case Artifact.AMULET:
            return hasAmulet;
        default:
            return false;
        }
    }

    public function getInfluenceFor(artifact : int) : float
    {
        var arti : Artifact = Artifact.INVALID;
        switch (artifact)
        {
        case 0:
            arti = Artifact.CROWN;
            break;
        case 1:
            arti = Artifact.SCEPTER;
            break;
        case 2:
            arti = Artifact.AMULET;
            break;
        default:
            break;
        }

        return getInfluenceFor(arti);
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

    public function setInfluenceFor(artifact : Artifact, amount : float)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            crown.setInfluence(amount);
            break;
        case Artifact.SCEPTER:
            scepter.setInfluence(amount);
            break;
        case Artifact.AMULET:
            amulet.setInfluence(amount);
            break;
        }
    }
}