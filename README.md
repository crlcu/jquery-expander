jQuery Expander
----------------
The `Expander Plugin` hides (collapses) html child elements in a container and add "more/less" link.

Features
----------------
*   works for html child elements (any kind of html child elements)
*   configurable `start` elements, `step`, `limit` 
*   configurable `hide class`, `more text/class`, `less text/class`
*   callbacks for : `beforeExpand`, `afterExpand`, `beforeCollapse`, `afterCollapse`
  
Can be used as :
----------------
*   <a href="#step-by-step">step by step expander</a>
*   <a href="#lessmore">less/more expander</a>

Step by step
----------------
```javascript
    $('#stepByStep').expander({
        start: 5,           //show 5 elements on start
		step: 5,          //at click more/less, show more/less 5 childrens
        moreClass: 'pull-left',
        lessClass: 'pull-right',
        hideClass: 'hide',
        
        beforeExpand: function(){
            console.log('beforeExpand');
        },
        afterExpand: function(){
            console.log('afterExpand');
        },
        
        beforeCollapse: function(){
            console.log('beforeCollapse');
        },
        afterCollapse: function(){
            console.log('afterCollapse');
        }
    });
```

*   with limit

```javascript
    $('#stepByStepWithLimit').expander({
        start: 2,               //show 2 elements on start
    	step: 2,              //at click more/less, show more/less 2 childrens
        limit: 10,          //maximum 10 childrens
        moreClass: 'pull-left',
        moreText: 'More',
        lessClass: 'pull-right',
        lessText: 'Less', 
        hideClass: 'hide'
    });
```
  
Less/More
----------------
```javascript
    $('#lessMore').expander({
        start: 2,           //show 2 elements on start
    	step: 0,         //step < 0 means you do not have a step by step expander
        moreClass: 'pull-left',
        lessClass: 'pull-right',
        hideClass: 'hide'
    });  
```

*   with limit

```javascript
    $('#lessMoreWithLimit').expander({
        start: 2,           //show 2 elements on start
    	step: 0,          //step < 0 means you do not have a step by step expander,
        limit: 8,       //maximum 8 childrens
        moreClass: 'pull-left',
        lessClass: 'pull-right',
        hideClass: 'hide'
    });
```