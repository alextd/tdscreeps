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
            delete Memory.creeps[name];
            spawn.forget(creep);
            console.log('Clearing non-existing creep memory:', name);
            continue;
        }

		if(creep.spawning) continue;

		creep.doRole();
	}
}