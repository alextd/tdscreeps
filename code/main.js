var worker = require('worker');
var harvester = require('harvester');
var carrier = require('carrier');
var builder = require('builder');
var guard = require('guard');


Spawn.prototype.selectSource = /** @return Source */ function() {
	var source = this.pos.findClosestByRange(FIND_SOURCES);
	this.memory.nextSourceId = source.id;
	return source;
};

module.exports.loop = function () {
	var /** @type Room */  room = Game.rooms[Object.keys(Game.rooms)[0]];
	var /** @type Spawn */ spawn = room.find(FIND_MY_SPAWNS)[0];

	var targetSource = spawn.selectSource();

	var workerParts = [MOVE,MOVE,WORK,CARRY,CARRY];
	if(spawn.spawning == null && spawn.canCreateCreep(workerParts) == OK)
		spawn.createCreep(workerParts,
			{"role" : "worker", "job": "source", jobid:targetSource.id, "homeid":spawn.id});


	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'worker') {
			worker(creep);
		}
		else if(creep.memory.role == 'carrier') {
			carrier(creep);
		}
		else if(creep.memory.role == 'harvester') {
			harvester(creep);
		}
		else if(creep.memory.role == 'builder') {
			builder(creep);
		}
		else if(creep.memory.role == 'guard') {
			guard(creep);
		}
	}
}