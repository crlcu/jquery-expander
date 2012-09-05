(function($){
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
                hideClass: "hide",
                
                append: true
            };

            var options = $.extend(defaults, options);
            
            var methods = {                
                hide: function( element ){
                    element.addClass( options.hideClass );
                },
                
                show: function( element ){
                    element.removeClass( options.hideClass );    
                }
            };
            
            return this.each(function() {
                var obj = $(this);

                //define controls
                var controls;
                
                //Calculate number of rows and hide them
                var rows = obj.children();
                var quantity = rows.length - options.start;
                var visible = options.start;
                
                rows.slice( options.start ).hide();
                
                //Only add the link if quantity of child elements exceeds the options.start
                if( quantity > 0 ) {
                    controls = '<div class="controls">' +
                                '<a href="#" class="more '+ options.moreClass +'">'+ options.moreText +'<\/a>' + 
                                '<a href="#" class="less '+ options.lessClass + ' ' + options.hideClass + '">'+ options.lessText +'<\/a>' + 
                                '</div>';
                }

                //Check if "append" is set to true, otherwise prepend the "control"
                if(options.append) {
                    obj.append(controls);
                } else {
                    obj.prepend(controls);
                }

                //Create a reference to the control

                var moreControl = $('.more', obj);
                var lessControl = $('.less', obj);

                moreControl.click(function() {                              
                    rows.slice( visible, visible + options.step ).show();
                    visible += options.step;
                    
                    if ( options.limit != -1 && visible >= options.limit ){
                        methods.hide( moreControl );  
                        methods.show( lessControl ); 
                    } else if ( options.start < visible && visible < rows.length )
                        methods.show( lessControl );
                    else if ( visible >= rows.length )
                        methods.hide( moreControl );
                        
                    return false;	
                });
                
                lessControl.click(function() {                    
                    visible -= options.step;
                    rows.slice( visible ).hide();
                    
                    if ( options.start < visible && visible < rows.length )
                        methods.show( moreControl );
                    else if ( visible == options.start ) {
                        methods.hide( lessControl );
                        methods.show( moreControl );
                    }
                    
                    return false;	
                });
            });
        }
    });
})(jQuery);