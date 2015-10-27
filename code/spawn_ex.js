var workerParts = [MOVE,WORK,WORK,CARRY];
var gaurdParts = [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK];

Spawn.prototype.init = function()
{
	if(this.memory.init)	return;

	this.memory.init = true;
	this.memory.sources = {};
	this.memory.workers = [];
	this.memory.guards = [];
}

Spawn.prototype.selectSource = /** @return Source */ function()
{
	var targetSource = this.pos.findClosestByRange(FIND_SOURCES);
	if (this.memory.sources[targetSource.id] == undefined)
		this.memory.sources[targetSource.id] = [];
	return targetSource;
}

Spawn.prototype.think = function()
{
	//can we spawn
	if(this.spawning != null)	return;

	//decide it
	var role = "worker";
	if(this.memory.workers.length > this.memory.guards.length)
		role = "guard";

	// do it
	if(role == "worker")
	{
		//Spawn a worker and have him mine
		if(this.canCreateCreep(workerParts) == OK)
		{
			var targetSource = this.selectSource();
			var workerName = this.createCreep(workerParts,
					{"role": role, "job": "source", jobid: targetSource.id, "homeid": this.id});

			if (typeof workerName === "string")
			{
				this.memory.sources[targetSource.id].push(workerName);
				this.memory.workers.push(workerName);
			}
		}
	}
	else if(role == "guard")
	{
		if(this.canCreateCreep(gaurdParts) == OK)
		{
			var guardName = this.createCreep(gaurdParts,
					{"role": role, "job": "guard", "homeid": this.id});

			if (typeof guardName === "string")
			{
				this.memory.guards.push(guardName);
			}
		}
	}
}
