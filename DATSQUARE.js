function DATSQUARE(xpos, ypos, s, datcolor) {
	this.size = s;
	this.x = xpos;
	this.y = ypos;
	this.color = "#" + datcolor;
}

DATSQUARE.prototype.paint = function() {
	setColor(this.color);
	paintRect(this.x, this.y, this.size, this.size);
}

DATSQUARE.prototype.setX = function(xpos) {
	this.x = xpos;
}

DATSQUARE.prototype.getX = function() {
	return this.x;
}

DATSQUARE.prototype.setY = function(ypos) {
	this.y = ypos;
}

DATSQUARE.prototype.getY = function() {
	return this.y;
}

DATSQUARE.prototype.setColor = function(datcolor) {
	this.color = "#" + datcolor;
}

