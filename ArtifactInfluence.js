#pragma strict

public class ArtifactInfluence
{
    private var crown   : Influence;
    private var scepter : Influence;
    private var amulet  : Influence;

    public var artifactMask : int = 0;

    public function ArtifactInfluence()
    {
        crown   = new Influence(0, Artifact.CROWN);
        scepter = new Influence(0, Artifact.SCEPTER);
        amulet  = new Influence(0, Artifact.AMULET);
    }

    public function hasArtifact(artifact : int) : boolean
    {
        return (artifact & artifactMask) == artifact;
    }

    public function getInfluenceFor(artifact : int) : float
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

        return 0.0;
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

    public function addInfluenceFor(artifact : int, amount : float)
    {
        switch (artifact)
        {
        case Artifact.CROWN:
            crown.setInfluence(crown.getInfluence() + amount);
            break;
        case Artifact.SCEPTER:
            scepter.setInfluence(scepter.getInfluence() + amount);
            break;
        case Artifact.AMULET:
            amulet.setInfluence(amulet.getInfluence() + amount);
            break;
        }
    }

    public function addInfluenceAll(amount : float)
    {
        crown.setInfluence(crown.getInfluence() + amount);
        scepter.setInfluence(scepter.getInfluence() + amount);
        amulet.setInfluence(amulet.getInfluence() + amount);
    }
}