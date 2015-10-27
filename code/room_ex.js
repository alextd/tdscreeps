/**
 * @param objs {Object[]}
 * @return RoomPosition
 */
Room.prototype.averagePos = function(objs)
{
	var length = objs.length;

	var p = new RoomPosition(0, 0, this.name);
	for (var obj of objs)
	{
		p.x += obj.pos.x;
		p.y += obj.pos.y;
	}
	p.x /= length;
	p.y /= length;

	p.x = Math.floor(p.x);
	p.y = Math.floor(p.y);

	return p;
}