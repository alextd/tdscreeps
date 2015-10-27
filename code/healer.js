require("room_ex");

module.exports = function (/** @type Creep*/ creep)
{
	var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
		filter: function(object) {
			return object.hits < object.hitsMax;
		}
	});

	//Heal
	if(target) {
		creep.moveTo(target);
		if(creep.pos.isNearTo(target)) {
			creep.heal(target);
		}
		else {
			creep.rangedHeal(target);
		}
	}
	//Follow guards
	else
	{
		var /** @type Spawn */ spawn = Game.getObjectById(creep.memory.homeid);
		var room = spawn.room;
		var guardNames = spawn.memory.guards;
		var guards = [];
		for(var name of guardNames)
		{
			if(Game.creeps[name] != undefined)
				guards.push(Game.creeps[name]);
		}
		creep.moveTo(room.averagePos(guards));
	}
}

