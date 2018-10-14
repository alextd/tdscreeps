//Version 2.0 local

require('creep_ex');
require('spawn_ex');

module.exports.loop = function ()
{
	var /** @type Room */  room = Game.rooms[Object.keys(Game.rooms)[0]];
	var /** @type Spawn */ spawn = room.find(FIND_MY_SPAWNS)[0];

	spawn.init();
	spawn.think();
	for(var name in Memory.creeps)
	{
		var creep = Game.creeps[name];
		if(!creep) {
			spawn.forget(name);
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

		if(creep.spawning) continue;

		creep.doRole();
	}
}


cleanLists = function (spawn) 
{
    var filter = function(val, n, a){ Memory.creeps.keys.includes(val)};
	spawn.memory.workers = spawn.memory.workers.filter(filter);
	spawn.memory.carriers = spawn.memory.guards.filter(filter);
	spawn.memory.harvesters = spawn.memory.healers.filter(filter);
	spawn.memory.builders = spawn.memory.healers.filter(filter);
	spawn.memory.guards = spawn.memory.healers.filter(filter);
	spawn.memory.healers = spawn.memory.healers.filter(filter);
}
fillLists = function (spawn) 
{
	spawn.memory.init = false;
	spawn.init();
	var targetSource = spawn.selectSource();
	
	for(var name in Memory.creeps)
	{
		var creep = Game.creeps[name];
		if(creep)
		{
			switch(creep.memory.role)
			{
				case "worker": spawn.memory.workers.push(name); break;
				case "carrier": spawn.memory.carriers.push(name); break;
				case "harvester": spawn.memory.harvesters.push(name); break;
				case "builder": bspawn.memory.builders.push(name); break;
				case "guard": spawn.memory.guards.push(name); break;
				case "healer": spawn.memory.healers.push(name); break;
			}
			if(creep.memory.role == "worker")
			{
				spawn.memory.sources[targetSource.id].push(creep.name)
			}
		}
	}
}