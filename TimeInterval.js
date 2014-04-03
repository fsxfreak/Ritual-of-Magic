#pragma strict

public class TimeInterval
{
	private var duration : float = 0;
	private var startTime : float = 0;

	public function TimeInterval(forDuration : float) 
		{ duration = forDuration; }
	public function start() 
		{ startTime = Time.time; }
	public function check() : boolean 
		{ return (Time.time - startTime) > duration; }
}