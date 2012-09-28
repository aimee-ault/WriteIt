(function ($) {
    var toolbarItems  = {
                            "emphasis":    "<li><div class='btn-group'><a class='btn' data-command='bold' title='CTRL+B'>Bold</a><a class='btn' data-command='italic' title='CTRL+I'>Italic</a><a class='btn' data-command='underline' title='CTRL+U'>Underline</a></div></li>",
                            "lists": 	   "<li><div class='btn-group'><a class='btn' data-command='insertUnorderedList' title='Unordered List'><i class='icon-list'></i></a><a class='btn' data-command='insertOrderedList' title='Ordered List'><i class='icon-th-list'></i></a><a class='btn' data-command='Outdent' title='Outdent'><i class='icon-indent-right'></i></a><a class='btn' data-command='Indent' title='Indent'><i class='icon-indent-left'></i></a></div></li>"
                        },
        methods       = {
            init : function (options) {
                var toolbar = $("<ul/>", {'class' : "writeit-toolbar"});
            
                for(var key in toolbarItems) {
                    toolbar.append(toolbarItems[key]);
                }
                this.before(toolbar);

                var $editor = $('<iframe class="writeit"></iframe>').height(this.height());
                var el = this.replaceWith($editor);
                var editor = $editor.get(0).contentDocuemnt || $editor.get(0).contentWindow.document;
                editor.designMode = "on";
                $editor.contents().find('body').html(this.val()); 
                toolbar.find('a').click(function (e) {
                    editor.execCommand($(this).attr('data-command'), $(this).attr('data-command-val'));
                });  
                return $editor;
            },
            getText: function() {
                return this.contents().find('body').html();
            },
            setText: function(val) {
                this.contents().find('body').html(val);
            }
        };
    
    $.fn.writeit = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.writeit' );
        }
        return this;
    };
})(jQuery);