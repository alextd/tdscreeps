var workerParts = [MOVE,MOVE,WORK,CARRY,CARRY];

Spawn.prototype.selectSource = /** @return Source */ function()
{
	var source = this.pos.findClosestByRange(FIND_SOURCES);
	this.memory.nextSourceId = source.id;
	return source;
};

Spawn.prototype.think = function()
{
	//Spawn a worker and have him mine
	var targetSource = this.selectSource();
	if(this.spawning == null && this.canCreateCreep(workerParts) == OK)
		this.createCreep(workerParts,
			{"role" : "worker", "job": "source", jobid:targetSource.id, "homeid":this.id});
}
