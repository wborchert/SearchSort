//I probably have some unused code here from stuff I was playing around with earlier

//The set organizes from "Redness" to "Blueness", with higher red values resulting in a later position in the array; some colors may look out of place when shuffled
//because they have high other values as well.

function Colors() {
	this.colors = new Array();
	this.current = new Array();
	this.old = new Array();
	this.sorted = new Array();
	this.DEMSQUARES = new Array();
	this.selected = -1;
	this.init();
	var instance = this;
	setInterval(function() { instance.checkForChange(); }, 10);
}

Colors.prototype.init = function() {
	/**
	var push;
	for(var i = 7; i < 9; i++) {
		for(var j = 6; j < 9; j++) {
			for(var k = 7; k < 9; k++) {
				for(var l = 6; l < 9; l++) {
					for(var m = 7; m < 9; m++) {
						for(var n = 6; n < 9; n++) {
							push = String(i) + String(j) + String(k) + String(l) + String(m) + String(n);
							this.colors.push(push);
						}
					}
				}
			}	
		}
	} */
	this.colors.push("FF0000");
	this.colors.push("EE0000");
	this.colors.push("DD0000");
	this.colors.push("CC0000");
	this.colors.push("BB0000");
	this.colors.push("AA0000");
	this.colors.push("990000");
	this.colors.push("880000");
	this.colors.push("770000");
	this.colors.push("667700");
	this.colors.push("668800");
	this.colors.push("559900");
	this.colors.push("44AA00");
	this.colors.push("33BB00");
	this.colors.push("22CC00");
	this.colors.push("11DD00");
	this.colors.push("00EE00");
	this.colors.push("00FF00");
	this.colors.push("00EE00");
	this.colors.push("00CC00");
	this.colors.push("00AA00");
	this.colors.push("008888");
	this.colors.push("007799");
	this.colors.push("0066AA");
	this.colors.push("0055BB");
	this.colors.push("0044CC");
	this.colors.push("0033DD");
	this.colors.push("0022EE");
	this.colors.push("0011FF");
	this.colors.push("0000FF");

	for(var i = 0; i < 30; i++) {
		this.DEMSQUARES.push(new DATSQUARE(0, 0, 100, "FF0000"));
	}
	this.colors = this.shuffle(this.colors);
	this.current = this.colors;
	this.sorted = this.mergeSort(this.colors);
}

Colors.prototype.search = function(r, g, b) {
	if((r < "00" || r > "FF")||(g < "00" || g > "FF")||(b < "00" || b > "FF")) {
		return "You must enter a value for each color!";
	}
	else if(this.current.toString() != this.sorted.toString()) {
		return "You can't search an unsorted array!";
	}
	else {
		var hex = r + g + b;
		var index = this.binarySearch(hex, this.current);
		this.selected = index;
		if(index <= -1) {
			return "This color is not already in the array.";
		}
		else {
			return "This color is at position " + (index + 1) + " in the array.";
		}
	}
}

Colors.prototype.doShuffle = function() {
	this.selected = -1;
	this.current = this.shuffle(this.colors);
}

Colors.prototype.doMerge = function() {
	var start = new Date().getTime();
	this.current = this.mergeSort(this.current);
	var end = new Date().getTime();
	var time = end - start;
	return time;
}

Colors.prototype.doQuick = function() {
	var start = new Date().getTime();
	this.current = this.quickSort(this.current);
	var end = new Date().getTime();
	var time = end - start;
	return time;
}

Colors.prototype.doInsertion = function() {
	var start = new Date().getTime();
	this.current = this.insertionSort(this.current);
	var end = new Date().getTime();
	var time = end - start;
	return time;
}

Colors.prototype.mergeSort = function(array) {
	var clone = array.slice(0);
	if (clone.length <= 1) {
		return clone;
	}
		var pivot = Math.floor(clone.length/2)
		var left = clone.slice(0, pivot);
		var right = clone.slice(pivot, clone.length);
		left = this.mergeSort(left);
		right = this.mergeSort(right);
		return this.merge(left,right);
}

Colors.prototype.merge = function(left, right) {
	var sorted = new Array();
	while(left.length > 0 && right.length > 0) {
		if(String(left[0]).localeCompare(String(right[0])) <= 0) {
			sorted.push(left.shift());
		}
		else {
			sorted.push(right.shift());
		}
	}
	while(left.length > 0) {
		sorted.push(left.shift());
	}
	while(right.length > 0) {
		sorted.push(right.shift());
	}
	return sorted;
}

Colors.prototype.quickSort = function(array) {
	var clone = array.slice(0);
	if (clone.length <= 1) {
		return clone;
	}
		var pivot = Math.floor(Math.random()*clone.length)
		var below = [];
		var above = [];
		var pivotElem = clone.splice(pivot,1)
		for (var i = 0; i < clone.length; i++) {
			if (clone[i].localeCompare(pivotElem[0]) == -1) {
				below.push(clone[i]);
			}
			else {
				above.push(clone[i]);
			}
		}
		return [].concat(this.quickSort(below),pivotElem,this.quickSort(above));
}

//For some reason the insertion sort seems to be far faster than the other two in data sets of all sizes 
//even though the other two are supposed to be more efficient on larger data sets...
Colors.prototype.insertionSort = function(array) {
	var clone = array.slice(0);
	var j;
	for(var i = 0; i < clone.length; i++) {
		var hole = clone[i];
		for(j = i - 1; j > -1 && clone[j] > hole; j--) {
			clone[j+1] = clone[j];
		}
		clone[j+1] = hole;
	}
	return clone;
}

Colors.prototype.binarySearch = function(color, array) {
	var clone = array.slice(0);
	var pivotIndex = Math.floor(clone.length/2);
	if(clone.length == 1 && color.localeCompare(clone[pivotIndex]) != 0) {
		return -999;
	}	
	if(color.localeCompare(clone[pivotIndex]) == 0) {
		return pivotIndex;
	}
	else if(color.localeCompare(clone[pivotIndex]) == -1) {
		return this.binarySearch(color, clone.splice(0, pivotIndex)); 
	}
	else if(color.localeCompare(clone[pivotIndex]) == 1) {
		return pivotIndex + this.binarySearch(color, clone.splice(pivotIndex, clone.length - pivotIndex)); 
	}
}

Colors.prototype.calcAverage = function(array) {
	var clone = array.slice(0);
	var total = 0;
	for(var i = 0; i < clone.length; i++) {
		total += parseInt(clone[i]);
	}
	return total/clone.length;
}

Colors.prototype.calcLowest = function(array) {
	var clone = array.slice(0);
	var lowest = 99999999999;
	for(var i = 0; i < clone.length; i++) {
		if(parseInt(clone[i]) < lowest) {
			lowest = parseInt(clone[i]);
		}
	}
	return lowest;
}

Colors.prototype.calcHighest = function(array) {
	var clone = array.slice(0);
	var highest = 0;
	for(var i = 0; i < clone.length; i++) {
		if(parseInt(clone[i]) > highest) {
			highest = parseInt(clone[i]);
		}
	}
	return highest;
}

Colors.prototype.shuffle = function(array) { 
    var old;
	var index;
	for(var j = 0; j < array.length; j++) {
		index = parseInt(Math.random() * j)
		old = array[j];
		array[j] = array[index];
		array[index] = old;
	}
	return array;
}

Colors.prototype.checkForChange = function() {
	if((this.current.toString() != this.old.toString()) || (this.current.toString() != this.sorted.toString()) || this.selected > -1) {
		var instance = this;
		instance.paint();
		this.old = this.current;
	}
}

Colors.prototype.paint = function() {
	clearCanvas();
	var x = 5;
	var y = 5;
	for(var j = 0; j < this.DEMSQUARES.length; j++) {
		this.DEMSQUARES[j].setX(x);
		this.DEMSQUARES[j].setY(y);
		this.DEMSQUARES[j].setColor(String(this.current[j]));
		x+= 110;
		if(j%10 == 9 && j > 0) {
			y+= 110;
			x = 5;
		}
	}
	if(this.selected > -1) {
		select = new DATSQUARE(this.DEMSQUARES[this.selected].getX() - 5, this.DEMSQUARES[this.selected].getY() - 5, 110, "000000");
		select.paint();
	}
	for (var i = 0; i < this.DEMSQUARES.length; i++) {
		this.DEMSQUARES[i].paint();
	}
}