/* ========================================
 * jQuery Expander Plugin v1.12.09
 * https://github.com/crlcu/jquery-expander
 * ========================================
 * Date: Thu Sep 06
 * Requires: jQuery v1.3+
 *
 * Copyright 2012, Adrian Crisan
 * Dual licensed under the MIT and GPL licenses (just like jQuery):
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
*/
;(function($){
    $.fn.extend({
        expander: function(options) {  
            var defaults = {
                start: 3,
                step: 5,
                
                limit: -1,
                
                moreText: 'Show more',
                lessText: 'Show less',
                moreClass: '',
                lessClass: '',
                hideClass: 'hide',
                
                append: true,
                
                beforeExpand: false,
                afterExpand: false,
                
                beforeCollapse: false,
                afterCollapse: false
            };

            var options = $.extend(defaults, options);
            
            var methods = {                
                hide: function( element ){
                    element.addClass( options.hideClass ).hide();
                },
                
                show: function( element ){
                    element.removeClass( options.hideClass ).show();    
                }
            };
            
            return this.each(function() {
                //Store the current object
                var obj = $(this);
                //Add 'expander' class
                obj.addClass('expander');
                
                //Initially controls are empty
                var controls = '';
                
                //Store children's elements
                var childrens = obj.children();
                
                //Compute elements that must remain hidden
                var quantity = childrens.length - options.start;
                
                //Initialize visible elements with start elements
                var visible = options.start;
                
                //Hide children's begin at options.start
                methods.hide( childrens.slice( options.start ) );
                
                //Only add the controls if quantity of child elements exceeds the options.start
                if( quantity > 0 ) {
                    //Set controls
                    controls = '<div class="controls">' +
                                '<a href="#more" class="more '+ options.moreClass +'">'+ options.moreText +'<\/a>' + 
                                '<a href="#less" class="less '+ options.lessClass + ' ' + options.hideClass + '">'+ options.lessText +'<\/a>' + 
                                '</div>';
                }

                //Check if 'append' is set to true, otherwise prepend the controls
                if( options.append ) obj.append( controls ); else obj.prepend( controls );

                //Create a reference to the more control
                var moreControl = $( '.more', obj );
                
                //Create a reference to the less control
                var lessControl = $( '.less', obj );
                
                //Bind click action on more control
                moreControl.click(function() {
                    //Call beforeExpand if defined
                    if ( options.beforeExpand ){
                        eval( options.beforeExpand( obj ) );    
                    }
                    
                    if ( options.step > 0 ){        //Step by step
                        //Show children's begin at 'visible' and end at 'visible' + options.step
                        methods.show( childrens.slice( visible, visible + options.step ) );
                        
                        //Increment visible children's
                        visible += options.step;
                    } else {                        // less / more
                        if ( options.limit > 0 ){   //With limit
                            //Show children's begin at 'visible' and end at options.limit
                            methods.show( childrens.slice( visible, options.limit ) );
                            
                            //Set visible children's equal to options.limit
                            visible = options.limit;  
                        } else {                    //No limit
                            //Show children's begin at 'visible' and end at the end of children's
                            methods.show( childrens.slice( visible, childrens.length ) );
                            
                            //Set visible children's equal to all childrens
                            visible = childrens.length;   
                        }   
                    }
                    
                    //Controls manipulation
                    if ( options.limit != -1 && visible >= options.limit ){         //No limit and visible elements are more then options.limit
                        //Hide more control
                        methods.hide( moreControl );  
                        
                        //Show less control
                        methods.show( lessControl ); 
                    } else if ( options.start < visible && visible < childrens.length )  //Visible elements between options.start and all children's
                        //Show less control
                        methods.show( lessControl );
                    else if ( visible >= childrens.length ) {                            //Visible elements are more or equal to all children's
                        //Hide more control
                        methods.hide( moreControl );
                        
                        //Show less control
                        methods.show( lessControl );
                    }
                    
                    //Call afterExpand if defined
                    if ( options.afterExpand ){
                        eval( options.afterExpand( obj ) );    
                    }
                        
                    return false;	
                });
                
                //Bind click action on less control
                lessControl.click(function() {
                    //Call beforeCollapse if defined
                    if ( options.beforeCollapse ){
                        eval( options.beforeCollapse( obj ) ); 
                    }
                    
                    if ( options.step > 0 ){                        //Step by step
                        //Decrement visible elements
                        visible -= options.step;
                        
                        //Hide elements begin at 'visible'
                        methods.hide( childrens.slice( visible ) );
                    } else {                                       // less / more
                        //Hide elements begin at options.start
                        methods.hide( childrens.slice( options.start ) );
                        
                        //Set visible elements equal to start elements
                        visible = options.start;  
                    }
                    
                    //Controls manipulation
                    if ( options.start < visible && visible < childrens.length )     //Visible elements between options.start and all children's
                        //Show more control
                        methods.show( moreControl );
                    else if ( visible == options.start ) {
                        //Hide less control
                        methods.hide( lessControl );
                        
                        //Show more control
                        methods.show( moreControl );
                    }
                    
                    //Call afterCollapse if defined
                    if ( options.afterCollapse ){
                        eval( options.afterCollapse( obj ) );    
                    }
                    
                    return false;	
                });
            });
        }
    });
})(jQuery);