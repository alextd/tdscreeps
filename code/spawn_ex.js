var workerParts = [MOVE, WORK, WORK, CARRY];
var guardParts = [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK];
var healerParts = [MOVE, HEAL];

StructureSpawn.prototype.init = function () {
	if (this.memory.init) return;

	this.memory.init = true;
	this.memory.workers = [];
	this.memory.carriers = [];
	this.memory.harvesters = [];
	this.memory.builders = [];
	this.memory.guards = [];
	this.memory.healers = [];
	this.memory.workerSpawnedCount = 0;

	this.memory.sources = {};
	for (source in this.room.find(FIND_SOURCES)) {
		this.memory.sources[source.id] = [];
	}
}
StructureSpawn.prototype.forget = function (name) {
	this.memory.workers = this.memory.workers.filter(n => n != name);
	this.memory.carriers = this.memory.carriers.filter(n => n != name);
	this.memory.harvesters = this.memory.harvesters.filter(n => n != name);
	this.memory.builders = this.memory.builders.filter(n => n != name);
	this.memory.guards = this.memory.guards.filter(n => n != name);
	this.memory.healers = this.memory.healers.filter(n => n != name);
	for (sourceid in this.memory.sources) {
		this.memory.sources[sourceid] = this.memory.sources[sourceid].filter(n => n != name);
	}
}

StructureSpawn.prototype.selectSource = /** @return Source */ function () {

	var level = this.room.controller.level;

	var targetSource = this.pos.findClosestByRange(FIND_SOURCES);
	if (this.memory.sources[targetSource.id] == undefined)
		this.memory.sources[targetSource.id] = [];
	return targetSource;
}

StructureSpawn.prototype.think = function () {
	//can we spawn
	if (this.spawning != null) return;
	
	var level = this.room.controller.level;


	//decide it
	var role = "worker";
	if (this.memory.workers.length > this.memory.guards.length) {
		if (this.memory.guards.length < this.memory.healers.length * 3 + 2) //After 2, then every 3
			role = "guard";
		else
			role = "healer";
	}
	if (this.memory.workers.length > 8)	//9 is too many
		return;

	// do it
	if (role == "worker") {
		//Spawn a worker and have him mine
		if (this.canCreateCreep(workerParts) == OK) {
			var targetSource = this.selectSource();
			var cycle = this.memory.workerSpawnedCount++ % 4;
			var job = cycle == 2 ? "upgrade" : cycle == 3 ? "build" : "source";
			var workerName = this.createCreep(workerParts,
				{ "role": role, "job": job, "sourceid": targetSource.id, "homeid": this.id });

			if (typeof workerName === "string") {
				this.memory.sources[targetSource.id].push(workerName);
				this.memory.workers.push(workerName);
			}
		}
	}
	else if (role == "guard") {
		if (this.canCreateCreep(guardParts) == OK) {
			var guardName = this.createCreep(guardParts,
				{ "role": role, "homeid": this.id });

			if (typeof guardName === "string") {
				this.memory.guards.push(guardName);
			}
		}
	}
	else if (role == "healer") {
		if (this.canCreateCreep(healerParts) == OK) {
			var healerName = this.createCreep(healerParts,
				{ "role": role, "homeid": this.id });

			if (typeof healerName === "string") {
				this.memory.healers.push(healerName);
			}
		}
	}
}
