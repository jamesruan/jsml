jQuery = require('jquery');
(function($){
	$.fn.jsml = function(value, wl){
		var whitelist = [
			"article",
			"hr",
			"br",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"small",
			"p",
			"blockquote",
			"code",
			"pre",
			"div",
			"abbr",
			"strong",
			"em",
			"mark",
			"ins",
			"del",
			"i",
			"cite",
			"code",
			"span",
			"pre",
			"ul",
			"ol",
			"li",
			"a",
			"table",
			"caption",
			"tbody",
			"tr",
			"th",
			"td",
			"img",
			"figure"
			];

		whitelist = $.extend([], whitelist, wl);

		/* Translation rule:
		 * [tagname {attr} inside] =>
		 * OBJ(<tagname attr> inside </tagname>)
		 * [tagname [tagname2 inside2] inside] =>
		 * [tagname OBJ(<tagname2> inside2 </tagname2>) inside]
		 */

		this.empty();
		value = value.reduce(toHTML)
			this.append(value[0]);

		function isTag(value){
			return (whitelist.indexOf(value)>=0);
		}

		function toHTML(prev, cur, index, array){
			if(prev.constructor === Array){
				if(prev.length === 1){
					/* [tagname] => tagname*/
					prev = prev[0];
				}
				else{
					/* [tagname1 ... ] => tagname1 ...*/
					prev = prev.reduce(toHTML)[0];
				}
			}

			if(prev.constructor === String){
				/* tagname => OBJ(tagname) */
				if(isTag(prev)){
					var el = document.createElement(prev);
					prev = $(el);
				}
				else{
					$.error("Invalid tag name:" + prev);
					return;
				}
			}

			//prev is head of the array and should now be an JQuery wrapped DOM, so test the cur
			if(cur.constructor === Object){ //attr
				for(var attr in cur){
					if(attr === "class")
					{
						prev.addClass(cur[attr]);
					}else{
						prev.attr(attr, cur[attr]);
					}
				}
				return prev;
			}
			else if(cur.constructor === Array){ //child
				if(cur.length === 1){
					cur = cur[0];
				}
				else{
					cur = cur.reduce(toHTML)[0];
				}
				if(cur.constructor === String){
					if(isTag(cur)){
						var el = document.createElement(cur);
						cur = $(el);
					}
					else{
						$.error("Invalid tag name:" + cur);
						return;
					}
				}
				return prev.append(cur);
			}
			else if(cur.constructor === String){
				prev.append(cur);
				return prev;
			}
			else{
				$.error("Invalid format:" + cur.toString());
				return;
			}
		}
		return this;
	};
})(jQuery);
