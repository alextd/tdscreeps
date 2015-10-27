module.exports = function (/** @type Creep*/ creep)
{
	var targets = /** @type Creep[] */ creep.room.find(FIND_HOSTILE_CREEPS, {
		filter: function(c) {
			return c.owner.username != "Source Keeper";
		}});

	//Attack
	if(targets.length)
	{
		if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE)
		{
			creep.moveTo(targets[0]);
		}
	}
	//Return Home
	else
	{
		var /** @type Spawn */ spawn = Game.getObjectById(creep.memory.homeid);
		if(creep.pos.getRangeTo(spawn) > 3)
			creep.moveTo(spawn);
	}
}