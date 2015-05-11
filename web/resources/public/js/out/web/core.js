// Compiled by ClojureScript 0.0-3196 {}
goog.provide('web.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('secretary.core');
goog.require('reagent.session');
goog.require('goog.history.EventType');
goog.require('cljsjs.react');
goog.require('goog.History');
goog.require('goog.events');
goog.require('cljsjs.d3');
web.core.results = (function web$core$results(predicted){
var predictions = new cljs.core.Keyword(null,"prediction","prediction",109482855).cljs$core$IFn$_invoke$arity$1(predicted);
var parties = cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1843675177),predictions);
var svg_width = (500);
var svg_height = (500);
var y_scale = d3.scale.linear().domain((new Array((0),(1)))).range(Array(svg_height,(0)));
var x_scale = d3.scale.ordinal().domain(cljs.core.apply.call(null,Array,parties)).rangeRoundBands(Array((0),svg_width),0.1);
cljs.core.print.call(null,y_scale.call(null,(0)));

cljs.core.print.call(null,cljs.core.apply.call(null,Array,parties));

cljs.core.print.call(null,x_scale.call(null,"SPD"));

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),svg_width,new cljs.core.Keyword(null,"height","height",1025178622),svg_height], null),(function (){var iter__20779__auto__ = ((function (predictions,parties,svg_width,svg_height,y_scale,x_scale){
return (function web$core$results_$_iter__23183(s__23184){
return (new cljs.core.LazySeq(null,((function (predictions,parties,svg_width,svg_height,y_scale,x_scale){
return (function (){
var s__23184__$1 = s__23184;
while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__23184__$1);
if(temp__4126__auto__){
var s__23184__$2 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23184__$2)){
var c__20777__auto__ = cljs.core.chunk_first.call(null,s__23184__$2);
var size__20778__auto__ = cljs.core.count.call(null,c__20777__auto__);
var b__23186 = cljs.core.chunk_buffer.call(null,size__20778__auto__);
if((function (){var i__23185 = (0);
while(true){
if((i__23185 < size__20778__auto__)){
var pred = cljs.core._nth.call(null,c__20777__auto__,i__23185);
cljs.core.chunk_append.call(null,b__23186,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),x_scale.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(pred)),new cljs.core.Keyword(null,"y","y",-1757859776),y_scale.call(null,new cljs.core.Keyword(null,"probability","probability",-1843961875).cljs$core$IFn$_invoke$arity$1(pred)),new cljs.core.Keyword(null,"width","width",-384071477),x_scale.rangeBand(),new cljs.core.Keyword(null,"height","height",1025178622),(y_scale.call(null,(0)) - y_scale.call(null,new cljs.core.Keyword(null,"probability","probability",-1843961875).cljs$core$IFn$_invoke$arity$1(pred)))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(pred)], null)));

var G__23187 = (i__23185 + (1));
i__23185 = G__23187;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23186),web$core$results_$_iter__23183.call(null,cljs.core.chunk_rest.call(null,s__23184__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23186),null);
}
} else {
var pred = cljs.core.first.call(null,s__23184__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),x_scale.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(pred)),new cljs.core.Keyword(null,"y","y",-1757859776),y_scale.call(null,new cljs.core.Keyword(null,"probability","probability",-1843961875).cljs$core$IFn$_invoke$arity$1(pred)),new cljs.core.Keyword(null,"width","width",-384071477),x_scale.rangeBand(),new cljs.core.Keyword(null,"height","height",1025178622),(y_scale.call(null,(0)) - y_scale.call(null,new cljs.core.Keyword(null,"probability","probability",-1843961875).cljs$core$IFn$_invoke$arity$1(pred)))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(pred)], null)),web$core$results_$_iter__23183.call(null,cljs.core.rest.call(null,s__23184__$2)));
}
} else {
return null;
}
break;
}
});})(predictions,parties,svg_width,svg_height,y_scale,x_scale))
,null,null));
});})(predictions,parties,svg_width,svg_height,y_scale,x_scale))
;
return iter__20779__auto__.call(null,new cljs.core.Keyword(null,"prediction","prediction",109482855).cljs$core$IFn$_invoke$arity$1(predicted));
})()], null);
});
web.core.mock_prediction = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"prediction","prediction",109482855),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"Gr\u00FCne",new cljs.core.Keyword(null,"probability","probability",-1843961875),0.1], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"SPD",new cljs.core.Keyword(null,"probability","probability",-1843961875),0.4], null)], null)], null);
web.core.home_page = (function web$core$home_page(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Welche Partei?"], null),web.core.results.call(null,web.core.mock_prediction),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"#/about"], null),"go to about page"], null)], null)], null);
});
web.core.about_page = (function web$core$about_page(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"About web"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"#/"], null),"go to the home page"], null)], null)], null);
});
web.core.current_page = (function web$core$current_page(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.session.get.call(null,new cljs.core.Keyword(null,"current-page","current-page",-101294180))], null)], null);
});
secretary.core.set_config_BANG_.call(null,new cljs.core.Keyword(null,"prefix","prefix",-265908465),"#");
var action__21199__auto___23190 = (function (params__21200__auto__){
if(cljs.core.map_QMARK_.call(null,params__21200__auto__)){
var map__23188 = params__21200__auto__;
var map__23188__$1 = ((cljs.core.seq_QMARK_.call(null,map__23188))?cljs.core.apply.call(null,cljs.core.hash_map,map__23188):map__23188);
return reagent.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Var(function(){return web.core.home_page;},new cljs.core.Symbol("web.core","home-page","web.core/home-page",-3329694,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"web.core","web.core",-1576169025,null),new cljs.core.Symbol(null,"home-page","home-page",-850279575,null),"/Users/danielkirsch/code/political-affiliation-prediction/web/src/cljs/web/core.cljs",16,7,50,50,cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY)),null,(cljs.core.truth_(web.core.home_page)?web.core.home_page.cljs$lang$test:null)])));
} else {
if(cljs.core.vector_QMARK_.call(null,params__21200__auto__)){
var vec__23189 = params__21200__auto__;
return reagent.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Var(function(){return web.core.home_page;},new cljs.core.Symbol("web.core","home-page","web.core/home-page",-3329694,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"web.core","web.core",-1576169025,null),new cljs.core.Symbol(null,"home-page","home-page",-850279575,null),"/Users/danielkirsch/code/political-affiliation-prediction/web/src/cljs/web/core.cljs",16,7,50,50,cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY)),null,(cljs.core.truth_(web.core.home_page)?web.core.home_page.cljs$lang$test:null)])));
} else {
return null;
}
}
});
secretary.core.add_route_BANG_.call(null,"/",action__21199__auto___23190);

var action__21199__auto___23193 = (function (params__21200__auto__){
if(cljs.core.map_QMARK_.call(null,params__21200__auto__)){
var map__23191 = params__21200__auto__;
var map__23191__$1 = ((cljs.core.seq_QMARK_.call(null,map__23191))?cljs.core.apply.call(null,cljs.core.hash_map,map__23191):map__23191);
return reagent.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Var(function(){return web.core.about_page;},new cljs.core.Symbol("web.core","about-page","web.core/about-page",-1866928426,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"web.core","web.core",-1576169025,null),new cljs.core.Symbol(null,"about-page","about-page",2116788009,null),"/Users/danielkirsch/code/political-affiliation-prediction/web/src/cljs/web/core.cljs",17,7,56,56,cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY)),null,(cljs.core.truth_(web.core.about_page)?web.core.about_page.cljs$lang$test:null)])));
} else {
if(cljs.core.vector_QMARK_.call(null,params__21200__auto__)){
var vec__23192 = params__21200__auto__;
return reagent.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Var(function(){return web.core.about_page;},new cljs.core.Symbol("web.core","about-page","web.core/about-page",-1866928426,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"web.core","web.core",-1576169025,null),new cljs.core.Symbol(null,"about-page","about-page",2116788009,null),"/Users/danielkirsch/code/political-affiliation-prediction/web/src/cljs/web/core.cljs",17,7,56,56,cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY)),null,(cljs.core.truth_(web.core.about_page)?web.core.about_page.cljs$lang$test:null)])));
} else {
return null;
}
}
});
secretary.core.add_route_BANG_.call(null,"/about",action__21199__auto___23193);

web.core.hook_browser_navigation_BANG_ = (function web$core$hook_browser_navigation_BANG_(){
var G__23195 = (new goog.History());
goog.events.listen(G__23195,goog.history.EventType.NAVIGATE,((function (G__23195){
return (function (event){
return secretary.core.dispatch_BANG_.call(null,event.token);
});})(G__23195))
);

G__23195.setEnabled(true);

return G__23195;
});
web.core.mount_root = (function web$core$mount_root(){
return reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [web.core.current_page], null),document.getElementById("app"));
});
web.core.init_BANG_ = (function web$core$init_BANG_(){
web.core.hook_browser_navigation_BANG_.call(null);

return web.core.mount_root.call(null);
});

//# sourceMappingURL=core.js.map