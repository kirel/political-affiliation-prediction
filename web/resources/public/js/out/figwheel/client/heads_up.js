// Compiled by ClojureScript 0.0-3196 {}
goog.provide('figwheel.client.heads_up');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('clojure.string');

figwheel.client.heads_up.node = (function figwheel$client$heads_up$node(){
var argseq__21065__auto__ = ((((2) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(2)),(0))):null);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__21065__auto__);
});

figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic = (function (t,attrs,children){
var e = document.createElement(cljs.core.name.call(null,t));
var seq__27365_27373 = cljs.core.seq.call(null,cljs.core.keys.call(null,attrs));
var chunk__27366_27374 = null;
var count__27367_27375 = (0);
var i__27368_27376 = (0);
while(true){
if((i__27368_27376 < count__27367_27375)){
var k_27377 = cljs.core._nth.call(null,chunk__27366_27374,i__27368_27376);
e.setAttribute(cljs.core.name.call(null,k_27377),cljs.core.get.call(null,attrs,k_27377));

var G__27378 = seq__27365_27373;
var G__27379 = chunk__27366_27374;
var G__27380 = count__27367_27375;
var G__27381 = (i__27368_27376 + (1));
seq__27365_27373 = G__27378;
chunk__27366_27374 = G__27379;
count__27367_27375 = G__27380;
i__27368_27376 = G__27381;
continue;
} else {
var temp__4126__auto___27382 = cljs.core.seq.call(null,seq__27365_27373);
if(temp__4126__auto___27382){
var seq__27365_27383__$1 = temp__4126__auto___27382;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__27365_27383__$1)){
var c__20810__auto___27384 = cljs.core.chunk_first.call(null,seq__27365_27383__$1);
var G__27385 = cljs.core.chunk_rest.call(null,seq__27365_27383__$1);
var G__27386 = c__20810__auto___27384;
var G__27387 = cljs.core.count.call(null,c__20810__auto___27384);
var G__27388 = (0);
seq__27365_27373 = G__27385;
chunk__27366_27374 = G__27386;
count__27367_27375 = G__27387;
i__27368_27376 = G__27388;
continue;
} else {
var k_27389 = cljs.core.first.call(null,seq__27365_27383__$1);
e.setAttribute(cljs.core.name.call(null,k_27389),cljs.core.get.call(null,attrs,k_27389));

var G__27390 = cljs.core.next.call(null,seq__27365_27383__$1);
var G__27391 = null;
var G__27392 = (0);
var G__27393 = (0);
seq__27365_27373 = G__27390;
chunk__27366_27374 = G__27391;
count__27367_27375 = G__27392;
i__27368_27376 = G__27393;
continue;
}
} else {
}
}
break;
}

var seq__27369_27394 = cljs.core.seq.call(null,children);
var chunk__27370_27395 = null;
var count__27371_27396 = (0);
var i__27372_27397 = (0);
while(true){
if((i__27372_27397 < count__27371_27396)){
var ch_27398 = cljs.core._nth.call(null,chunk__27370_27395,i__27372_27397);
e.appendChild(ch_27398);

var G__27399 = seq__27369_27394;
var G__27400 = chunk__27370_27395;
var G__27401 = count__27371_27396;
var G__27402 = (i__27372_27397 + (1));
seq__27369_27394 = G__27399;
chunk__27370_27395 = G__27400;
count__27371_27396 = G__27401;
i__27372_27397 = G__27402;
continue;
} else {
var temp__4126__auto___27403 = cljs.core.seq.call(null,seq__27369_27394);
if(temp__4126__auto___27403){
var seq__27369_27404__$1 = temp__4126__auto___27403;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__27369_27404__$1)){
var c__20810__auto___27405 = cljs.core.chunk_first.call(null,seq__27369_27404__$1);
var G__27406 = cljs.core.chunk_rest.call(null,seq__27369_27404__$1);
var G__27407 = c__20810__auto___27405;
var G__27408 = cljs.core.count.call(null,c__20810__auto___27405);
var G__27409 = (0);
seq__27369_27394 = G__27406;
chunk__27370_27395 = G__27407;
count__27371_27396 = G__27408;
i__27372_27397 = G__27409;
continue;
} else {
var ch_27410 = cljs.core.first.call(null,seq__27369_27404__$1);
e.appendChild(ch_27410);

var G__27411 = cljs.core.next.call(null,seq__27369_27404__$1);
var G__27412 = null;
var G__27413 = (0);
var G__27414 = (0);
seq__27369_27394 = G__27411;
chunk__27370_27395 = G__27412;
count__27371_27396 = G__27413;
i__27372_27397 = G__27414;
continue;
}
} else {
}
}
break;
}

return e;
});

figwheel.client.heads_up.node.cljs$lang$maxFixedArity = (2);

figwheel.client.heads_up.node.cljs$lang$applyTo = (function (seq27362){
var G__27363 = cljs.core.first.call(null,seq27362);
var seq27362__$1 = cljs.core.next.call(null,seq27362);
var G__27364 = cljs.core.first.call(null,seq27362__$1);
var seq27362__$2 = cljs.core.next.call(null,seq27362__$1);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic(G__27363,G__27364,seq27362__$2);
});
if(typeof figwheel.client.heads_up.heads_up_event_dispatch !== 'undefined'){
} else {
figwheel.client.heads_up.heads_up_event_dispatch = (function (){var method_table__20920__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__20921__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__20922__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__20923__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__20924__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.heads-up","heads-up-event-dispatch"),((function (method_table__20920__auto__,prefer_table__20921__auto__,method_cache__20922__auto__,cached_hierarchy__20923__auto__,hierarchy__20924__auto__){
return (function (dataset){
return dataset.figwheelEvent;
});})(method_table__20920__auto__,prefer_table__20921__auto__,method_cache__20922__auto__,cached_hierarchy__20923__auto__,hierarchy__20924__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__20924__auto__,method_table__20920__auto__,prefer_table__20921__auto__,method_cache__20922__auto__,cached_hierarchy__20923__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,new cljs.core.Keyword(null,"default","default",-1987822328),(function (_){
return cljs.core.PersistentArrayMap.EMPTY;
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"file-selected",(function (dataset){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"file-selected",new cljs.core.Keyword(null,"file-name","file-name",-1654217259),dataset.fileName,new cljs.core.Keyword(null,"file-line","file-line",-1228823138),dataset.fileLine], null));
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"close-heads-up",(function (dataset){
return figwheel.client.heads_up.clear.call(null);
}));
figwheel.client.heads_up.ancestor_nodes = (function figwheel$client$heads_up$ancestor_nodes(el){
return cljs.core.iterate.call(null,(function (e){
return e.parentNode;
}),el);
});
figwheel.client.heads_up.get_dataset = (function figwheel$client$heads_up$get_dataset(el){
return cljs.core.first.call(null,cljs.core.keep.call(null,(function (x){
if(cljs.core.truth_(x.dataset.figwheelEvent)){
return x.dataset;
} else {
return null;
}
}),cljs.core.take.call(null,(4),figwheel.client.heads_up.ancestor_nodes.call(null,el))));
});
figwheel.client.heads_up.heads_up_onclick_handler = (function figwheel$client$heads_up$heads_up_onclick_handler(event){
var dataset = figwheel.client.heads_up.get_dataset.call(null,event.target);
event.preventDefault();

if(cljs.core.truth_(dataset)){
return figwheel.client.heads_up.heads_up_event_dispatch.call(null,dataset);
} else {
return null;
}
});
figwheel.client.heads_up.ensure_container = (function figwheel$client$heads_up$ensure_container(){
var cont_id = "figwheel-heads-up-container";
var content_id = "figwheel-heads-up-content-area";
if(cljs.core.not.call(null,document.querySelector([cljs.core.str("#"),cljs.core.str(cont_id)].join('')))){
var el_27415 = figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cont_id,new cljs.core.Keyword(null,"style","style",-496642736),[cljs.core.str("-webkit-transition: all 0.2s ease-in-out;"),cljs.core.str("-moz-transition: all 0.2s ease-in-out;"),cljs.core.str("-o-transition: all 0.2s ease-in-out;"),cljs.core.str("transition: all 0.2s ease-in-out;"),cljs.core.str("font-size: 13px;"),cljs.core.str("border-top: 1px solid #f5f5f5;"),cljs.core.str("box-shadow: 0px 0px 1px #aaaaaa;"),cljs.core.str("line-height: 18px;"),cljs.core.str("color: #333;"),cljs.core.str("font-family: monospace;"),cljs.core.str("padding: 0px 10px 0px 70px;"),cljs.core.str("position: fixed;"),cljs.core.str("bottom: 0px;"),cljs.core.str("left: 0px;"),cljs.core.str("height: 0px;"),cljs.core.str("opacity: 0.0;"),cljs.core.str("box-sizing: border-box;"),cljs.core.str("z-index: 10000;")].join('')], null));
el_27415.onclick = figwheel.client.heads_up.heads_up_onclick_handler;

el_27415.innerHTML = [cljs.core.str(figwheel.client.heads_up.clojure_symbol_svg)].join('');

el_27415.appendChild(figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),content_id], null)));

document.body.appendChild(el_27415);
} else {
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"container-el","container-el",109664205),document.getElementById(cont_id),new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187),document.getElementById(content_id)], null);
});
figwheel.client.heads_up.set_style_BANG_ = (function figwheel$client$heads_up$set_style_BANG_(p__27416,st_map){
var map__27420 = p__27416;
var map__27420__$1 = ((cljs.core.seq_QMARK_.call(null,map__27420))?cljs.core.apply.call(null,cljs.core.hash_map,map__27420):map__27420);
var container_el = cljs.core.get.call(null,map__27420__$1,new cljs.core.Keyword(null,"container-el","container-el",109664205));
return cljs.core.mapv.call(null,((function (map__27420,map__27420__$1,container_el){
return (function (p__27421){
var vec__27422 = p__27421;
var k = cljs.core.nth.call(null,vec__27422,(0),null);
var v = cljs.core.nth.call(null,vec__27422,(1),null);
return (container_el.style[cljs.core.name.call(null,k)] = v);
});})(map__27420,map__27420__$1,container_el))
,st_map);
});
figwheel.client.heads_up.set_content_BANG_ = (function figwheel$client$heads_up$set_content_BANG_(p__27423,dom_str){
var map__27425 = p__27423;
var map__27425__$1 = ((cljs.core.seq_QMARK_.call(null,map__27425))?cljs.core.apply.call(null,cljs.core.hash_map,map__27425):map__27425);
var c = map__27425__$1;
var content_area_el = cljs.core.get.call(null,map__27425__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML = dom_str;
});
figwheel.client.heads_up.get_content = (function figwheel$client$heads_up$get_content(p__27426){
var map__27428 = p__27426;
var map__27428__$1 = ((cljs.core.seq_QMARK_.call(null,map__27428))?cljs.core.apply.call(null,cljs.core.hash_map,map__27428):map__27428);
var content_area_el = cljs.core.get.call(null,map__27428__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML;
});
figwheel.client.heads_up.close_link = (function figwheel$client$heads_up$close_link(){
return [cljs.core.str("<a style=\""),cljs.core.str("float: right;"),cljs.core.str("font-size: 18px;"),cljs.core.str("text-decoration: none;"),cljs.core.str("text-align: right;"),cljs.core.str("width: 30px;"),cljs.core.str("height: 30px;"),cljs.core.str("color: rgba(84,84,84, 0.5);"),cljs.core.str("\" href=\"#\"  data-figwheel-event=\"close-heads-up\">"),cljs.core.str("x"),cljs.core.str("</a>")].join('');
});
figwheel.client.heads_up.display_heads_up = (function figwheel$client$heads_up$display_heads_up(style,msg){
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__){
return (function (state_27470){
var state_val_27471 = (state_27470[(1)]);
if((state_val_27471 === (2))){
var inst_27455 = (state_27470[(7)]);
var inst_27464 = (state_27470[(2)]);
var inst_27465 = [new cljs.core.Keyword(null,"height","height",1025178622)];
var inst_27466 = ["auto"];
var inst_27467 = cljs.core.PersistentHashMap.fromArrays(inst_27465,inst_27466);
var inst_27468 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_27455,inst_27467);
var state_27470__$1 = (function (){var statearr_27472 = state_27470;
(statearr_27472[(8)] = inst_27464);

return statearr_27472;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27470__$1,inst_27468);
} else {
if((state_val_27471 === (1))){
var inst_27455 = (state_27470[(7)]);
var inst_27455__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_27456 = [new cljs.core.Keyword(null,"paddingTop","paddingTop",-1088692345),new cljs.core.Keyword(null,"paddingBottom","paddingBottom",-916694489),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_27457 = ["10px","10px","100%","68px","1.0"];
var inst_27458 = cljs.core.PersistentHashMap.fromArrays(inst_27456,inst_27457);
var inst_27459 = cljs.core.merge.call(null,inst_27458,style);
var inst_27460 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_27455__$1,inst_27459);
var inst_27461 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_27455__$1,msg);
var inst_27462 = cljs.core.async.timeout.call(null,(300));
var state_27470__$1 = (function (){var statearr_27473 = state_27470;
(statearr_27473[(7)] = inst_27455__$1);

(statearr_27473[(9)] = inst_27460);

(statearr_27473[(10)] = inst_27461);

return statearr_27473;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27470__$1,(2),inst_27462);
} else {
return null;
}
}
});})(c__22536__auto__))
;
return ((function (switch__22474__auto__,c__22536__auto__){
return (function() {
var figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto__ = null;
var figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto____0 = (function (){
var statearr_27477 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_27477[(0)] = figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto__);

(statearr_27477[(1)] = (1));

return statearr_27477;
});
var figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto____1 = (function (state_27470){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_27470);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e27478){if((e27478 instanceof Object)){
var ex__22478__auto__ = e27478;
var statearr_27479_27481 = state_27470;
(statearr_27479_27481[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27470);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27478;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27482 = state_27470;
state_27470 = G__27482;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto__ = function(state_27470){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto____1.call(this,state_27470);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto____0;
figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto____1;
return figwheel$client$heads_up$display_heads_up_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__))
})();
var state__22538__auto__ = (function (){var statearr_27480 = f__22537__auto__.call(null);
(statearr_27480[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_27480;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__))
);

return c__22536__auto__;
});
figwheel.client.heads_up.heading = (function figwheel$client$heads_up$heading(s){
return [cljs.core.str("<div style=\""),cljs.core.str("font-size: 26px;"),cljs.core.str("line-height: 26px;"),cljs.core.str("margin-bottom: 2px;"),cljs.core.str("padding-top: 1px;"),cljs.core.str("\">"),cljs.core.str(s),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.file_and_line_number = (function figwheel$client$heads_up$file_and_line_number(msg){
if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*at\sline.*/,msg))){
return cljs.core.take.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,msg," ")));
} else {
return null;
}
});
figwheel.client.heads_up.file_selector_div = (function figwheel$client$heads_up$file_selector_div(file_name,line_number,msg){
return [cljs.core.str("<div data-figwheel-event=\"file-selected\" data-file-name=\""),cljs.core.str(file_name),cljs.core.str("\" data-file-line=\""),cljs.core.str(line_number),cljs.core.str("\">"),cljs.core.str(msg),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.format_line = (function figwheel$client$heads_up$format_line(msg){
var temp__4124__auto__ = figwheel.client.heads_up.file_and_line_number.call(null,msg);
if(cljs.core.truth_(temp__4124__auto__)){
var vec__27484 = temp__4124__auto__;
var f = cljs.core.nth.call(null,vec__27484,(0),null);
var ln = cljs.core.nth.call(null,vec__27484,(1),null);
return figwheel.client.heads_up.file_selector_div.call(null,f,ln,msg);
} else {
return [cljs.core.str("<div>"),cljs.core.str(msg),cljs.core.str("</div>")].join('');
}
});
figwheel.client.heads_up.display_error = (function figwheel$client$heads_up$display_error(formatted_messages){
var vec__27487 = cljs.core.first.call(null,cljs.core.keep.call(null,figwheel.client.heads_up.file_and_line_number,formatted_messages));
var file_name = cljs.core.nth.call(null,vec__27487,(0),null);
var file_line = cljs.core.nth.call(null,vec__27487,(1),null);
var msg = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,((function (vec__27487,file_name,file_line){
return (function (p1__27485_SHARP_){
return [cljs.core.str("<div>"),cljs.core.str(p1__27485_SHARP_),cljs.core.str("</div>")].join('');
});})(vec__27487,file_name,file_line))
,formatted_messages));
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 161, 161, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,"Compile Error")),cljs.core.str(figwheel.client.heads_up.file_selector_div.call(null,file_name,file_line,msg))].join(''));
});
figwheel.client.heads_up.display_system_warning = (function figwheel$client$heads_up$display_system_warning(header,msg){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 220, 110, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,header)),cljs.core.str(figwheel.client.heads_up.format_line.call(null,msg))].join(''));
});
figwheel.client.heads_up.display_warning = (function figwheel$client$heads_up$display_warning(msg){
return figwheel.client.heads_up.display_system_warning.call(null,"Compile Warning",msg);
});
figwheel.client.heads_up.append_message = (function figwheel$client$heads_up$append_message(message){
var map__27489 = figwheel.client.heads_up.ensure_container.call(null);
var map__27489__$1 = ((cljs.core.seq_QMARK_.call(null,map__27489))?cljs.core.apply.call(null,cljs.core.hash_map,map__27489):map__27489);
var content_area_el = cljs.core.get.call(null,map__27489__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
var el = document.createElement("div");
el.innerHTML = figwheel.client.heads_up.format_line.call(null,message);

return content_area_el.appendChild(el);
});
figwheel.client.heads_up.clear = (function figwheel$client$heads_up$clear(){
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__){
return (function (state_27536){
var state_val_27537 = (state_27536[(1)]);
if((state_val_27537 === (3))){
var inst_27519 = (state_27536[(7)]);
var inst_27533 = (state_27536[(2)]);
var inst_27534 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_27519,"");
var state_27536__$1 = (function (){var statearr_27538 = state_27536;
(statearr_27538[(8)] = inst_27533);

return statearr_27538;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27536__$1,inst_27534);
} else {
if((state_val_27537 === (2))){
var inst_27519 = (state_27536[(7)]);
var inst_27526 = (state_27536[(2)]);
var inst_27527 = [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491)];
var inst_27528 = ["auto","0px","0px","0px 10px 0px 70px","0px","transparent"];
var inst_27529 = cljs.core.PersistentHashMap.fromArrays(inst_27527,inst_27528);
var inst_27530 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_27519,inst_27529);
var inst_27531 = cljs.core.async.timeout.call(null,(200));
var state_27536__$1 = (function (){var statearr_27539 = state_27536;
(statearr_27539[(9)] = inst_27530);

(statearr_27539[(10)] = inst_27526);

return statearr_27539;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27536__$1,(3),inst_27531);
} else {
if((state_val_27537 === (1))){
var inst_27519 = (state_27536[(7)]);
var inst_27519__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_27520 = [new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_27521 = ["0.0"];
var inst_27522 = cljs.core.PersistentHashMap.fromArrays(inst_27520,inst_27521);
var inst_27523 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_27519__$1,inst_27522);
var inst_27524 = cljs.core.async.timeout.call(null,(300));
var state_27536__$1 = (function (){var statearr_27540 = state_27536;
(statearr_27540[(11)] = inst_27523);

(statearr_27540[(7)] = inst_27519__$1);

return statearr_27540;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27536__$1,(2),inst_27524);
} else {
return null;
}
}
}
});})(c__22536__auto__))
;
return ((function (switch__22474__auto__,c__22536__auto__){
return (function() {
var figwheel$client$heads_up$clear_$_state_machine__22475__auto__ = null;
var figwheel$client$heads_up$clear_$_state_machine__22475__auto____0 = (function (){
var statearr_27544 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27544[(0)] = figwheel$client$heads_up$clear_$_state_machine__22475__auto__);

(statearr_27544[(1)] = (1));

return statearr_27544;
});
var figwheel$client$heads_up$clear_$_state_machine__22475__auto____1 = (function (state_27536){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_27536);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e27545){if((e27545 instanceof Object)){
var ex__22478__auto__ = e27545;
var statearr_27546_27548 = state_27536;
(statearr_27546_27548[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27536);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27545;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27549 = state_27536;
state_27536 = G__27549;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$heads_up$clear_$_state_machine__22475__auto__ = function(state_27536){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$clear_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$heads_up$clear_$_state_machine__22475__auto____1.call(this,state_27536);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$clear_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$clear_$_state_machine__22475__auto____0;
figwheel$client$heads_up$clear_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$clear_$_state_machine__22475__auto____1;
return figwheel$client$heads_up$clear_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__))
})();
var state__22538__auto__ = (function (){var statearr_27547 = f__22537__auto__.call(null);
(statearr_27547[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_27547;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__))
);

return c__22536__auto__;
});
figwheel.client.heads_up.display_loaded_start = (function figwheel$client$heads_up$display_loaded_start(){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(211,234,172,1.0)",new cljs.core.Keyword(null,"width","width",-384071477),"68px",new cljs.core.Keyword(null,"height","height",1025178622),"68px",new cljs.core.Keyword(null,"paddingLeft","paddingLeft",262720813),"0px",new cljs.core.Keyword(null,"paddingRight","paddingRight",-1642313463),"0px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null),"");
});
figwheel.client.heads_up.flash_loaded = (function figwheel$client$heads_up$flash_loaded(){
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__){
return (function (state_27581){
var state_val_27582 = (state_27581[(1)]);
if((state_val_27582 === (4))){
var inst_27579 = (state_27581[(2)]);
var state_27581__$1 = state_27581;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27581__$1,inst_27579);
} else {
if((state_val_27582 === (3))){
var inst_27576 = (state_27581[(2)]);
var inst_27577 = figwheel.client.heads_up.clear.call(null);
var state_27581__$1 = (function (){var statearr_27583 = state_27581;
(statearr_27583[(7)] = inst_27576);

return statearr_27583;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27581__$1,(4),inst_27577);
} else {
if((state_val_27582 === (2))){
var inst_27573 = (state_27581[(2)]);
var inst_27574 = cljs.core.async.timeout.call(null,(400));
var state_27581__$1 = (function (){var statearr_27584 = state_27581;
(statearr_27584[(8)] = inst_27573);

return statearr_27584;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27581__$1,(3),inst_27574);
} else {
if((state_val_27582 === (1))){
var inst_27571 = figwheel.client.heads_up.display_loaded_start.call(null);
var state_27581__$1 = state_27581;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27581__$1,(2),inst_27571);
} else {
return null;
}
}
}
}
});})(c__22536__auto__))
;
return ((function (switch__22474__auto__,c__22536__auto__){
return (function() {
var figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto__ = null;
var figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto____0 = (function (){
var statearr_27588 = [null,null,null,null,null,null,null,null,null];
(statearr_27588[(0)] = figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto__);

(statearr_27588[(1)] = (1));

return statearr_27588;
});
var figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto____1 = (function (state_27581){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_27581);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e27589){if((e27589 instanceof Object)){
var ex__22478__auto__ = e27589;
var statearr_27590_27592 = state_27581;
(statearr_27590_27592[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27581);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27589;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27593 = state_27581;
state_27581 = G__27593;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto__ = function(state_27581){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto____1.call(this,state_27581);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto____0;
figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto____1;
return figwheel$client$heads_up$flash_loaded_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__))
})();
var state__22538__auto__ = (function (){var statearr_27591 = f__22537__auto__.call(null);
(statearr_27591[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_27591;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__))
);

return c__22536__auto__;
});
figwheel.client.heads_up.clojure_symbol_svg = "<?xml version='1.0' encoding='UTF-8' ?>\n<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n<svg width='49px' height='49px' viewBox='0 0 100 99' version='1.1' xmlns='http://www.w3.org/2000/svg' style='position:absolute; top:9px; left: 10px;'>\n<circle fill='rgba(255,255,255,0.5)' cx='49.75' cy='49.5' r='48.5'/>\n<path fill='#5881d8' d=' M 39.30 6.22 C 51.71 3.11 65.45 5.64 75.83 13.16 C 88.68 22.10 96.12 38.22 94.43 53.80 C 93.66 60.11 89.40 66.01 83.37 68.24 C 79.21 69.97 74.64 69.78 70.23 69.80 C 80.77 59.67 81.41 41.33 71.45 30.60 C 63.60 21.32 49.75 18.52 38.65 23.16 C 31.27 18.80 21.83 18.68 14.27 22.69 C 20.65 14.79 29.32 8.56 39.30 6.22 Z' />\n<path fill='#90b4fe' d=' M 42.93 26.99 C 48.49 25.50 54.55 25.62 59.79 28.14 C 68.71 32.19 74.61 42.14 73.41 51.94 C 72.85 58.64 68.92 64.53 63.81 68.69 C 59.57 66.71 57.53 62.30 55.66 58.30 C 50.76 48.12 50.23 36.02 42.93 26.99 Z' />\n<path fill='#63b132' d=' M 12.30 33.30 C 17.11 28.49 24.33 26.90 30.91 28.06 C 25.22 33.49 21.44 41.03 21.46 48.99 C 21.11 58.97 26.58 68.76 35.08 73.92 C 43.28 79.06 53.95 79.28 62.66 75.29 C 70.37 77.57 78.52 77.36 86.31 75.57 C 80.05 84.00 70.94 90.35 60.69 92.84 C 48.02 96.03 34.00 93.24 23.56 85.37 C 12.16 77.09 5.12 63.11 5.44 49.00 C 5.15 43.06 8.22 37.42 12.30 33.30 Z' />\n<path fill='#91dc47' d=' M 26.94 54.00 C 24.97 45.06 29.20 35.59 36.45 30.24 C 41.99 33.71 44.23 40.14 46.55 45.91 C 43.00 53.40 38.44 60.46 35.94 68.42 C 31.50 64.74 27.96 59.77 26.94 54.00 Z' />\n<path fill='#91dc47' d=' M 41.97 71.80 C 41.46 64.27 45.31 57.52 48.11 50.80 C 50.40 58.13 51.84 66.19 57.18 72.06 C 52.17 73.37 46.93 73.26 41.97 71.80 Z' />\n</svg>";

//# sourceMappingURL=heads_up.js.map