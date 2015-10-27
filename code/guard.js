module.exports = function (/** @type Creep*/ creep)
{
	var targets = /** @type Creep[] */ creep.room.find(FIND_HOSTILE_CREEPS, {
		filter: function(c) {
			return c.owner.username != "Source Keeper";
		}});

	if(targets.length)
	//Attack
	{
		if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE)
		{
			creep.moveTo(targets[0]);
		}
	}
	else
	//Guard
	{
		var /** @type Spawn */ spawn = Game.getObjectById(creep.memory.homeid);
		if(creep.pos.getRangeTo(spawn) > 3)
			creep.moveTo(spawn);
	}
}