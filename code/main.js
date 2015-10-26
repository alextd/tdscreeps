require('creep_ex');
require('spawn_ex');

module.exports.loop = function ()
{
	var /** @type Room */  room = Game.rooms[Object.keys(Game.rooms)[0]];
	var /** @type Spawn */ spawn = room.find(FIND_MY_SPAWNS)[0];

	spawn.think();

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.spawning) continue;

		creep.doRole();
	}
}