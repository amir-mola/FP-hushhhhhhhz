// You can require libraries
const d3 = require('d3')

// You can include local JS files:
const createHistory = require('./create-history');
const createStream = require('./create-stream');
const MyClass = require('./my-class');
const myClassInstance = new MyClass();
myClassInstance.sayHi();

// get scrolling coordinates
sections = d3.selectAll('.step');
names = d3.select("#sections").selectAll('div');
sectionPositions = [];
var startPos;
sections.each(function(d,i) {
	var top = this.getBoundingClientRect().top;

	if(i === 0) {
		startPos = top;
	}
	sectionPositions.push(top - startPos);
});

var currentIndex = -1;

var activateFunctions = [createHistory, createStream]
function position() {
    var pos = window.pageYOffset - 400;
    var sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(sections.size() - 1, sectionIndex);

	var newInstance = new activateFunctions[sectionIndex]();
    if (currentIndex !== sectionIndex) {
    	dispatch.call('active', this, sectionIndex);
    	currentIndex = sectionIndex;
		newInstance.start();
    }
}

var dispatch = d3.dispatch("active", "progress");

d3.select(window)
	.on("scroll.scroller", position);
