// Compiled by ClojureScript 0.0-3196 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.net.jsloader');
goog.require('cljs.core.async');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('figwheel.client.utils');

figwheel.client.file_reloading.all_QMARK_ = (function figwheel$client$file_reloading$all_QMARK_(pred,coll){
return cljs.core.reduce.call(null,(function (p1__27667_SHARP_,p2__27668_SHARP_){
var and__20013__auto__ = p1__27667_SHARP_;
if(cljs.core.truth_(and__20013__auto__)){
return p2__27668_SHARP_;
} else {
return and__20013__auto__;
}
}),true,cljs.core.map.call(null,pred,coll));
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__20025__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__20025__auto__){
return or__20025__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.ns_to_js_file = (function figwheel$client$file_reloading$ns_to_js_file(ns){

return [cljs.core.str(clojure.string.replace.call(null,ns,".","/")),cljs.core.str(".js")].join('');
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){

return [cljs.core.str(clojure.string.replace.call(null,goog.basePath,/(.*)goog\//,(function (p1__27670_SHARP_,p2__27669_SHARP_){
return [cljs.core.str(p2__27669_SHARP_)].join('');
}))),cljs.core.str(figwheel.client.file_reloading.ns_to_js_file.call(null,ns))].join('');
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
goog.isProvided_ = (function (x){
return false;
});

if(((cljs.core._STAR_loaded_libs_STAR_ == null)) || (cljs.core.empty_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_))){
cljs.core._STAR_loaded_libs_STAR_ = (function (){var gntp = goog.dependencies_.nameToPath;
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.call(null,((function (gntp){
return (function (name){
return (goog.dependencies_.visited[(gntp[name])]);
});})(gntp))
,cljs.core.js_keys.call(null,gntp)));
})();
} else {
}

goog.require = (function (name,reload){
if(cljs.core.truth_((function (){var or__20025__auto__ = !(cljs.core.contains_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_,name));
if(or__20025__auto__){
return or__20025__auto__;
} else {
return reload;
}
})())){
cljs.core._STAR_loaded_libs_STAR_ = cljs.core.conj.call(null,(function (){var or__20025__auto__ = cljs.core._STAR_loaded_libs_STAR_;
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),name);

return figwheel.client.file_reloading.reload_file_STAR_.call(null,figwheel.client.file_reloading.resolve_ns.call(null,name));
} else {
return null;
}
});

goog.provide = goog.exportPath_;

return goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.reload_file_STAR_;
});
if(typeof figwheel.client.file_reloading.resolve_url !== 'undefined'){
} else {
figwheel.client.file_reloading.resolve_url = (function (){var method_table__20920__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__20921__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__20922__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__20923__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__20924__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.file-reloading","resolve-url"),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__20924__auto__,method_table__20920__auto__,prefer_table__20921__auto__,method_cache__20922__auto__,cached_hierarchy__20923__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.file_reloading.resolve_url,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__27671){
var map__27672 = p__27671;
var map__27672__$1 = ((cljs.core.seq_QMARK_.call(null,map__27672))?cljs.core.apply.call(null,cljs.core.hash_map,map__27672):map__27672);
var file = cljs.core.get.call(null,map__27672__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
return file;
}));
cljs.core._add_method.call(null,figwheel.client.file_reloading.resolve_url,new cljs.core.Keyword(null,"namespace","namespace",-377510372),(function (p__27673){
var map__27674 = p__27673;
var map__27674__$1 = ((cljs.core.seq_QMARK_.call(null,map__27674))?cljs.core.apply.call(null,cljs.core.hash_map,map__27674):map__27674);
var namespace = cljs.core.get.call(null,map__27674__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

return figwheel.client.file_reloading.resolve_ns.call(null,namespace);
}));
if(typeof figwheel.client.file_reloading.reload_base !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_base = (function (){var method_table__20920__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__20921__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__20922__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__20923__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__20924__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.file-reloading","reload-base"),figwheel.client.utils.host_env_QMARK_,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__20924__auto__,method_table__20920__auto__,prefer_table__20921__auto__,method_cache__20922__auto__,cached_hierarchy__20923__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.file_reloading.reload_base,new cljs.core.Keyword(null,"node","node",581201198),(function (request_url,callback){

var root = clojure.string.join.call(null,"/",cljs.core.reverse.call(null,cljs.core.drop.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,__dirname,"/")))));
var path = [cljs.core.str(root),cljs.core.str("/"),cljs.core.str(request_url)].join('');
(require.cache[path] = null);

return callback.call(null,(function (){try{return require(path);
}catch (e27675){if((e27675 instanceof Error)){
var e = e27675;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e27675;

}
}})());
}));
cljs.core._add_method.call(null,figwheel.client.file_reloading.reload_base,new cljs.core.Keyword(null,"html","html",-998796897),(function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred))
);

return deferred.addErrback(((function (deferred){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred))
);
}));
figwheel.client.file_reloading.reload_file_STAR_ = (function figwheel$client$file_reloading$reload_file_STAR_(){
var G__27677 = arguments.length;
switch (G__27677) {
case 2:
return figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (request_url,callback){
return figwheel.client.file_reloading.reload_base.call(null,request_url,callback);
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (request_url){
return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,cljs.core.identity);
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__27679,callback){
var map__27681 = p__27679;
var map__27681__$1 = ((cljs.core.seq_QMARK_.call(null,map__27681))?cljs.core.apply.call(null,cljs.core.hash_map,map__27681):map__27681);
var file_msg = map__27681__$1;
var request_url = cljs.core.get.call(null,map__27681__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__27681,map__27681__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfullly loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__27681,map__27681__$1,file_msg,request_url))
);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__27682){
var map__27684 = p__27682;
var map__27684__$1 = ((cljs.core.seq_QMARK_.call(null,map__27684))?cljs.core.apply.call(null,cljs.core.hash_map,map__27684):map__27684);
var file_msg = map__27684__$1;
var meta_data = cljs.core.get.call(null,map__27684__$1,new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157));
var namespace = cljs.core.get.call(null,map__27684__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_data__$1 = (function (){var or__20025__auto__ = meta_data;
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var and__20013__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_data__$1));
if(and__20013__auto__){
var or__20025__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
if(cljs.core.truth_(or__20025__auto____$1)){
return or__20025__auto____$1;
} else {
var and__20013__auto____$1 = cljs.core.contains_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_,namespace);
if(and__20013__auto____$1){
var or__20025__auto____$2 = !(cljs.core.contains_QMARK_.call(null,meta_data__$1,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932)));
if(or__20025__auto____$2){
return or__20025__auto____$2;
} else {
return new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
}
} else {
return and__20013__auto____$1;
}
}
}
} else {
return and__20013__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__27685,callback){
var map__27687 = p__27685;
var map__27687__$1 = ((cljs.core.seq_QMARK_.call(null,map__27687))?cljs.core.apply.call(null,cljs.core.hash_map,map__27687):map__27687);
var file_msg = map__27687__$1;
var namespace = cljs.core.get.call(null,map__27687__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = cljs.core.get.call(null,map__27687__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.reload_file.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Figwheel: Not trying to load file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
setTimeout(((function (out){
return (function (){
return figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
figwheel.client.file_reloading.patch_goog_base.call(null);

cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);
});})(out))
,(0));

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__22536__auto___27774 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___27774,out){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___27774,out){
return (function (state_27756){
var state_val_27757 = (state_27756[(1)]);
if((state_val_27757 === (7))){
var inst_27740 = (state_27756[(7)]);
var inst_27746 = (state_27756[(2)]);
var inst_27747 = cljs.core.async.put_BANG_.call(null,out,inst_27746);
var inst_27736 = inst_27740;
var state_27756__$1 = (function (){var statearr_27758 = state_27756;
(statearr_27758[(8)] = inst_27736);

(statearr_27758[(9)] = inst_27747);

return statearr_27758;
})();
var statearr_27759_27775 = state_27756__$1;
(statearr_27759_27775[(2)] = null);

(statearr_27759_27775[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27757 === (6))){
var inst_27752 = (state_27756[(2)]);
var state_27756__$1 = state_27756;
var statearr_27760_27776 = state_27756__$1;
(statearr_27760_27776[(2)] = inst_27752);

(statearr_27760_27776[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27757 === (5))){
var inst_27750 = cljs.core.async.close_BANG_.call(null,out);
var state_27756__$1 = state_27756;
var statearr_27761_27777 = state_27756__$1;
(statearr_27761_27777[(2)] = inst_27750);

(statearr_27761_27777[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27757 === (4))){
var inst_27739 = (state_27756[(10)]);
var inst_27744 = figwheel.client.file_reloading.reload_js_file.call(null,inst_27739);
var state_27756__$1 = state_27756;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27756__$1,(7),inst_27744);
} else {
if((state_val_27757 === (3))){
var inst_27754 = (state_27756[(2)]);
var state_27756__$1 = state_27756;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27756__$1,inst_27754);
} else {
if((state_val_27757 === (2))){
var inst_27739 = (state_27756[(10)]);
var inst_27736 = (state_27756[(8)]);
var inst_27739__$1 = cljs.core.nth.call(null,inst_27736,(0),null);
var inst_27740 = cljs.core.nthnext.call(null,inst_27736,(1));
var inst_27741 = (inst_27739__$1 == null);
var inst_27742 = cljs.core.not.call(null,inst_27741);
var state_27756__$1 = (function (){var statearr_27762 = state_27756;
(statearr_27762[(10)] = inst_27739__$1);

(statearr_27762[(7)] = inst_27740);

return statearr_27762;
})();
if(inst_27742){
var statearr_27763_27778 = state_27756__$1;
(statearr_27763_27778[(1)] = (4));

} else {
var statearr_27764_27779 = state_27756__$1;
(statearr_27764_27779[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27757 === (1))){
var inst_27734 = cljs.core.nth.call(null,files,(0),null);
var inst_27735 = cljs.core.nthnext.call(null,files,(1));
var inst_27736 = files;
var state_27756__$1 = (function (){var statearr_27765 = state_27756;
(statearr_27765[(11)] = inst_27734);

(statearr_27765[(8)] = inst_27736);

(statearr_27765[(12)] = inst_27735);

return statearr_27765;
})();
var statearr_27766_27780 = state_27756__$1;
(statearr_27766_27780[(2)] = null);

(statearr_27766_27780[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__22536__auto___27774,out))
;
return ((function (switch__22474__auto__,c__22536__auto___27774,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto____0 = (function (){
var statearr_27770 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27770[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto__);

(statearr_27770[(1)] = (1));

return statearr_27770;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto____1 = (function (state_27756){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_27756);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e27771){if((e27771 instanceof Object)){
var ex__22478__auto__ = e27771;
var statearr_27772_27781 = state_27756;
(statearr_27772_27781[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27756);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27771;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27782 = state_27756;
state_27756 = G__27782;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto__ = function(state_27756){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto____1.call(this,state_27756);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___27774,out))
})();
var state__22538__auto__ = (function (){var statearr_27773 = f__22537__auto__.call(null);
(statearr_27773[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___27774);

return statearr_27773;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___27774,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.add_request_url = (function figwheel$client$file_reloading$add_request_url(p__27783,p__27784){
var map__27787 = p__27783;
var map__27787__$1 = ((cljs.core.seq_QMARK_.call(null,map__27787))?cljs.core.apply.call(null,cljs.core.hash_map,map__27787):map__27787);
var opts = map__27787__$1;
var url_rewriter = cljs.core.get.call(null,map__27787__$1,new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838));
var map__27788 = p__27784;
var map__27788__$1 = ((cljs.core.seq_QMARK_.call(null,map__27788))?cljs.core.apply.call(null,cljs.core.hash_map,map__27788):map__27788);
var file_msg = map__27788__$1;
var file = cljs.core.get.call(null,map__27788__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var resolved_path = figwheel.client.file_reloading.resolve_url.call(null,file_msg);
return cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"request-url","request-url",2100346596),(cljs.core.truth_(url_rewriter)?url_rewriter.call(null,resolved_path):resolved_path));
});
figwheel.client.file_reloading.add_request_urls = (function figwheel$client$file_reloading$add_request_urls(opts,files){
return cljs.core.map.call(null,cljs.core.partial.call(null,figwheel.client.file_reloading.add_request_url,opts),files);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__27789){
var map__27792 = p__27789;
var map__27792__$1 = ((cljs.core.seq_QMARK_.call(null,map__27792))?cljs.core.apply.call(null,cljs.core.hash_map,map__27792):map__27792);
var file = cljs.core.get.call(null,map__27792__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var eval_body__$1 = cljs.core.get.call(null,map__27792__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
if(cljs.core.truth_((function (){var and__20013__auto__ = eval_body__$1;
if(cljs.core.truth_(and__20013__auto__)){
return typeof eval_body__$1 === 'string';
} else {
return and__20013__auto__;
}
})())){
var code = eval_body__$1;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Evaling file "),cljs.core.str(file)].join(''));

return eval(code);
}catch (e27793){var e = e27793;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Unable to evaluate "),cljs.core.str(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__27798,p__27799){
var map__28000 = p__27798;
var map__28000__$1 = ((cljs.core.seq_QMARK_.call(null,map__28000))?cljs.core.apply.call(null,cljs.core.hash_map,map__28000):map__28000);
var opts = map__28000__$1;
var load_unchanged_files = cljs.core.get.call(null,map__28000__$1,new cljs.core.Keyword(null,"load-unchanged-files","load-unchanged-files",-1561468704));
var on_jsload = cljs.core.get.call(null,map__28000__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var before_jsload = cljs.core.get.call(null,map__28000__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var map__28001 = p__27799;
var map__28001__$1 = ((cljs.core.seq_QMARK_.call(null,map__28001))?cljs.core.apply.call(null,cljs.core.hash_map,map__28001):map__28001);
var msg = map__28001__$1;
var files = cljs.core.get.call(null,map__28001__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (state_28125){
var state_val_28126 = (state_28125[(1)]);
if((state_val_28126 === (7))){
var inst_28015 = (state_28125[(7)]);
var inst_28014 = (state_28125[(8)]);
var inst_28013 = (state_28125[(9)]);
var inst_28012 = (state_28125[(10)]);
var inst_28020 = cljs.core._nth.call(null,inst_28013,inst_28015);
var inst_28021 = figwheel.client.file_reloading.eval_body.call(null,inst_28020);
var inst_28022 = (inst_28015 + (1));
var tmp28127 = inst_28014;
var tmp28128 = inst_28013;
var tmp28129 = inst_28012;
var inst_28012__$1 = tmp28129;
var inst_28013__$1 = tmp28128;
var inst_28014__$1 = tmp28127;
var inst_28015__$1 = inst_28022;
var state_28125__$1 = (function (){var statearr_28130 = state_28125;
(statearr_28130[(7)] = inst_28015__$1);

(statearr_28130[(11)] = inst_28021);

(statearr_28130[(8)] = inst_28014__$1);

(statearr_28130[(9)] = inst_28013__$1);

(statearr_28130[(10)] = inst_28012__$1);

return statearr_28130;
})();
var statearr_28131_28200 = state_28125__$1;
(statearr_28131_28200[(2)] = null);

(statearr_28131_28200[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (20))){
var inst_28057 = (state_28125[(12)]);
var inst_28061 = (state_28125[(13)]);
var inst_28064 = (state_28125[(14)]);
var inst_28062 = (state_28125[(15)]);
var inst_28058 = (state_28125[(16)]);
var inst_28067 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_28069 = (function (){var files_not_loaded = inst_28064;
var res = inst_28062;
var res_SINGLEQUOTE_ = inst_28061;
var files_SINGLEQUOTE_ = inst_28058;
var all_files = inst_28057;
return ((function (files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28061,inst_28064,inst_28062,inst_28058,inst_28067,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (p__28068){
var map__28132 = p__28068;
var map__28132__$1 = ((cljs.core.seq_QMARK_.call(null,map__28132))?cljs.core.apply.call(null,cljs.core.hash_map,map__28132):map__28132);
var file = cljs.core.get.call(null,map__28132__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var namespace = cljs.core.get.call(null,map__28132__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.ns_to_js_file.call(null,namespace);
} else {
return file;
}
});
;})(files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28061,inst_28064,inst_28062,inst_28058,inst_28067,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var inst_28070 = cljs.core.map.call(null,inst_28069,inst_28062);
var inst_28071 = cljs.core.pr_str.call(null,inst_28070);
var inst_28072 = figwheel.client.utils.log.call(null,inst_28071);
var inst_28073 = (function (){var files_not_loaded = inst_28064;
var res = inst_28062;
var res_SINGLEQUOTE_ = inst_28061;
var files_SINGLEQUOTE_ = inst_28058;
var all_files = inst_28057;
return ((function (files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28061,inst_28064,inst_28062,inst_28058,inst_28067,inst_28069,inst_28070,inst_28071,inst_28072,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (){
return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28061,inst_28064,inst_28062,inst_28058,inst_28067,inst_28069,inst_28070,inst_28071,inst_28072,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var inst_28074 = setTimeout(inst_28073,(10));
var state_28125__$1 = (function (){var statearr_28133 = state_28125;
(statearr_28133[(17)] = inst_28067);

(statearr_28133[(18)] = inst_28072);

return statearr_28133;
})();
var statearr_28134_28201 = state_28125__$1;
(statearr_28134_28201[(2)] = inst_28074);

(statearr_28134_28201[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (27))){
var inst_28084 = (state_28125[(19)]);
var state_28125__$1 = state_28125;
var statearr_28135_28202 = state_28125__$1;
(statearr_28135_28202[(2)] = inst_28084);

(statearr_28135_28202[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (1))){
var inst_28004 = (state_28125[(20)]);
var inst_28002 = before_jsload.call(null,files);
var inst_28003 = (function (){return ((function (inst_28004,inst_28002,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (p1__27794_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__27794_SHARP_);
});
;})(inst_28004,inst_28002,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var inst_28004__$1 = cljs.core.filter.call(null,inst_28003,files);
var inst_28005 = cljs.core.not_empty.call(null,inst_28004__$1);
var state_28125__$1 = (function (){var statearr_28136 = state_28125;
(statearr_28136[(21)] = inst_28002);

(statearr_28136[(20)] = inst_28004__$1);

return statearr_28136;
})();
if(cljs.core.truth_(inst_28005)){
var statearr_28137_28203 = state_28125__$1;
(statearr_28137_28203[(1)] = (2));

} else {
var statearr_28138_28204 = state_28125__$1;
(statearr_28138_28204[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (24))){
var state_28125__$1 = state_28125;
var statearr_28139_28205 = state_28125__$1;
(statearr_28139_28205[(2)] = null);

(statearr_28139_28205[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (4))){
var inst_28049 = (state_28125[(2)]);
var inst_28050 = (function (){return ((function (inst_28049,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (p1__27795_SHARP_){
var and__20013__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__27795_SHARP_);
if(cljs.core.truth_(and__20013__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__27795_SHARP_));
} else {
return and__20013__auto__;
}
});
;})(inst_28049,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var inst_28051 = cljs.core.filter.call(null,inst_28050,files);
var state_28125__$1 = (function (){var statearr_28140 = state_28125;
(statearr_28140[(22)] = inst_28051);

(statearr_28140[(23)] = inst_28049);

return statearr_28140;
})();
if(cljs.core.truth_(load_unchanged_files)){
var statearr_28141_28206 = state_28125__$1;
(statearr_28141_28206[(1)] = (16));

} else {
var statearr_28142_28207 = state_28125__$1;
(statearr_28142_28207[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (15))){
var inst_28039 = (state_28125[(2)]);
var state_28125__$1 = state_28125;
var statearr_28143_28208 = state_28125__$1;
(statearr_28143_28208[(2)] = inst_28039);

(statearr_28143_28208[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (21))){
var state_28125__$1 = state_28125;
var statearr_28144_28209 = state_28125__$1;
(statearr_28144_28209[(2)] = null);

(statearr_28144_28209[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (31))){
var inst_28092 = (state_28125[(24)]);
var inst_28102 = (state_28125[(2)]);
var inst_28103 = cljs.core.not_empty.call(null,inst_28092);
var state_28125__$1 = (function (){var statearr_28145 = state_28125;
(statearr_28145[(25)] = inst_28102);

return statearr_28145;
})();
if(cljs.core.truth_(inst_28103)){
var statearr_28146_28210 = state_28125__$1;
(statearr_28146_28210[(1)] = (32));

} else {
var statearr_28147_28211 = state_28125__$1;
(statearr_28147_28211[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (32))){
var inst_28092 = (state_28125[(24)]);
var inst_28105 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_28092);
var inst_28106 = cljs.core.pr_str.call(null,inst_28105);
var inst_28107 = [cljs.core.str("file didn't change: "),cljs.core.str(inst_28106)].join('');
var inst_28108 = figwheel.client.utils.log.call(null,inst_28107);
var state_28125__$1 = state_28125;
var statearr_28148_28212 = state_28125__$1;
(statearr_28148_28212[(2)] = inst_28108);

(statearr_28148_28212[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (33))){
var state_28125__$1 = state_28125;
var statearr_28149_28213 = state_28125__$1;
(statearr_28149_28213[(2)] = null);

(statearr_28149_28213[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (13))){
var inst_28025 = (state_28125[(26)]);
var inst_28029 = cljs.core.chunk_first.call(null,inst_28025);
var inst_28030 = cljs.core.chunk_rest.call(null,inst_28025);
var inst_28031 = cljs.core.count.call(null,inst_28029);
var inst_28012 = inst_28030;
var inst_28013 = inst_28029;
var inst_28014 = inst_28031;
var inst_28015 = (0);
var state_28125__$1 = (function (){var statearr_28150 = state_28125;
(statearr_28150[(7)] = inst_28015);

(statearr_28150[(8)] = inst_28014);

(statearr_28150[(9)] = inst_28013);

(statearr_28150[(10)] = inst_28012);

return statearr_28150;
})();
var statearr_28151_28214 = state_28125__$1;
(statearr_28151_28214[(2)] = null);

(statearr_28151_28214[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (22))){
var inst_28064 = (state_28125[(14)]);
var inst_28077 = (state_28125[(2)]);
var inst_28078 = cljs.core.not_empty.call(null,inst_28064);
var state_28125__$1 = (function (){var statearr_28152 = state_28125;
(statearr_28152[(27)] = inst_28077);

return statearr_28152;
})();
if(cljs.core.truth_(inst_28078)){
var statearr_28153_28215 = state_28125__$1;
(statearr_28153_28215[(1)] = (23));

} else {
var statearr_28154_28216 = state_28125__$1;
(statearr_28154_28216[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (36))){
var state_28125__$1 = state_28125;
var statearr_28155_28217 = state_28125__$1;
(statearr_28155_28217[(2)] = null);

(statearr_28155_28217[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (29))){
var inst_28093 = (state_28125[(28)]);
var inst_28096 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_28093);
var inst_28097 = cljs.core.pr_str.call(null,inst_28096);
var inst_28098 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_28097)].join('');
var inst_28099 = figwheel.client.utils.log.call(null,inst_28098);
var state_28125__$1 = state_28125;
var statearr_28156_28218 = state_28125__$1;
(statearr_28156_28218[(2)] = inst_28099);

(statearr_28156_28218[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (6))){
var inst_28046 = (state_28125[(2)]);
var state_28125__$1 = state_28125;
var statearr_28157_28219 = state_28125__$1;
(statearr_28157_28219[(2)] = inst_28046);

(statearr_28157_28219[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (28))){
var inst_28093 = (state_28125[(28)]);
var inst_28090 = (state_28125[(2)]);
var inst_28091 = cljs.core.get.call(null,inst_28090,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_28092 = cljs.core.get.call(null,inst_28090,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932));
var inst_28093__$1 = cljs.core.get.call(null,inst_28090,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_28094 = cljs.core.not_empty.call(null,inst_28093__$1);
var state_28125__$1 = (function (){var statearr_28158 = state_28125;
(statearr_28158[(24)] = inst_28092);

(statearr_28158[(28)] = inst_28093__$1);

(statearr_28158[(29)] = inst_28091);

return statearr_28158;
})();
if(cljs.core.truth_(inst_28094)){
var statearr_28159_28220 = state_28125__$1;
(statearr_28159_28220[(1)] = (29));

} else {
var statearr_28160_28221 = state_28125__$1;
(statearr_28160_28221[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (25))){
var inst_28123 = (state_28125[(2)]);
var state_28125__$1 = state_28125;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28125__$1,inst_28123);
} else {
if((state_val_28126 === (34))){
var inst_28091 = (state_28125[(29)]);
var inst_28111 = (state_28125[(2)]);
var inst_28112 = cljs.core.not_empty.call(null,inst_28091);
var state_28125__$1 = (function (){var statearr_28161 = state_28125;
(statearr_28161[(30)] = inst_28111);

return statearr_28161;
})();
if(cljs.core.truth_(inst_28112)){
var statearr_28162_28222 = state_28125__$1;
(statearr_28162_28222[(1)] = (35));

} else {
var statearr_28163_28223 = state_28125__$1;
(statearr_28163_28223[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (17))){
var inst_28051 = (state_28125[(22)]);
var state_28125__$1 = state_28125;
var statearr_28164_28224 = state_28125__$1;
(statearr_28164_28224[(2)] = inst_28051);

(statearr_28164_28224[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (3))){
var state_28125__$1 = state_28125;
var statearr_28165_28225 = state_28125__$1;
(statearr_28165_28225[(2)] = null);

(statearr_28165_28225[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (12))){
var inst_28042 = (state_28125[(2)]);
var state_28125__$1 = state_28125;
var statearr_28166_28226 = state_28125__$1;
(statearr_28166_28226[(2)] = inst_28042);

(statearr_28166_28226[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (2))){
var inst_28004 = (state_28125[(20)]);
var inst_28011 = cljs.core.seq.call(null,inst_28004);
var inst_28012 = inst_28011;
var inst_28013 = null;
var inst_28014 = (0);
var inst_28015 = (0);
var state_28125__$1 = (function (){var statearr_28167 = state_28125;
(statearr_28167[(7)] = inst_28015);

(statearr_28167[(8)] = inst_28014);

(statearr_28167[(9)] = inst_28013);

(statearr_28167[(10)] = inst_28012);

return statearr_28167;
})();
var statearr_28168_28227 = state_28125__$1;
(statearr_28168_28227[(2)] = null);

(statearr_28168_28227[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (23))){
var inst_28057 = (state_28125[(12)]);
var inst_28084 = (state_28125[(19)]);
var inst_28061 = (state_28125[(13)]);
var inst_28064 = (state_28125[(14)]);
var inst_28062 = (state_28125[(15)]);
var inst_28058 = (state_28125[(16)]);
var inst_28080 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_28083 = (function (){var files_not_loaded = inst_28064;
var res = inst_28062;
var res_SINGLEQUOTE_ = inst_28061;
var files_SINGLEQUOTE_ = inst_28058;
var all_files = inst_28057;
return ((function (files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28084,inst_28061,inst_28064,inst_28062,inst_28058,inst_28080,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (p__28082){
var map__28169 = p__28082;
var map__28169__$1 = ((cljs.core.seq_QMARK_.call(null,map__28169))?cljs.core.apply.call(null,cljs.core.hash_map,map__28169):map__28169);
var meta_data = cljs.core.get.call(null,map__28169__$1,new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.contains_QMARK_.call(null,meta_data,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
if((cljs.core.contains_QMARK_.call(null,meta_data,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932))) && (cljs.core.not.call(null,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932).cljs$core$IFn$_invoke$arity$1(meta_data)))){
return new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
}
});
;})(files_not_loaded,res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28084,inst_28061,inst_28064,inst_28062,inst_28058,inst_28080,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var inst_28084__$1 = cljs.core.group_by.call(null,inst_28083,inst_28064);
var inst_28085 = cljs.core.seq_QMARK_.call(null,inst_28084__$1);
var state_28125__$1 = (function (){var statearr_28170 = state_28125;
(statearr_28170[(31)] = inst_28080);

(statearr_28170[(19)] = inst_28084__$1);

return statearr_28170;
})();
if(inst_28085){
var statearr_28171_28228 = state_28125__$1;
(statearr_28171_28228[(1)] = (26));

} else {
var statearr_28172_28229 = state_28125__$1;
(statearr_28172_28229[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (35))){
var inst_28091 = (state_28125[(29)]);
var inst_28114 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_28091);
var inst_28115 = cljs.core.pr_str.call(null,inst_28114);
var inst_28116 = [cljs.core.str("not required: "),cljs.core.str(inst_28115)].join('');
var inst_28117 = figwheel.client.utils.log.call(null,inst_28116);
var state_28125__$1 = state_28125;
var statearr_28173_28230 = state_28125__$1;
(statearr_28173_28230[(2)] = inst_28117);

(statearr_28173_28230[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (19))){
var inst_28057 = (state_28125[(12)]);
var inst_28061 = (state_28125[(13)]);
var inst_28062 = (state_28125[(15)]);
var inst_28058 = (state_28125[(16)]);
var inst_28061__$1 = (state_28125[(2)]);
var inst_28062__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_28061__$1);
var inst_28063 = (function (){var res = inst_28062__$1;
var res_SINGLEQUOTE_ = inst_28061__$1;
var files_SINGLEQUOTE_ = inst_28058;
var all_files = inst_28057;
return ((function (res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28061,inst_28062,inst_28058,inst_28061__$1,inst_28062__$1,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (p1__27797_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__27797_SHARP_));
});
;})(res,res_SINGLEQUOTE_,files_SINGLEQUOTE_,all_files,inst_28057,inst_28061,inst_28062,inst_28058,inst_28061__$1,inst_28062__$1,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var inst_28064 = cljs.core.filter.call(null,inst_28063,inst_28061__$1);
var inst_28065 = cljs.core.not_empty.call(null,inst_28062__$1);
var state_28125__$1 = (function (){var statearr_28174 = state_28125;
(statearr_28174[(13)] = inst_28061__$1);

(statearr_28174[(14)] = inst_28064);

(statearr_28174[(15)] = inst_28062__$1);

return statearr_28174;
})();
if(cljs.core.truth_(inst_28065)){
var statearr_28175_28231 = state_28125__$1;
(statearr_28175_28231[(1)] = (20));

} else {
var statearr_28176_28232 = state_28125__$1;
(statearr_28176_28232[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (11))){
var state_28125__$1 = state_28125;
var statearr_28177_28233 = state_28125__$1;
(statearr_28177_28233[(2)] = null);

(statearr_28177_28233[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (9))){
var inst_28044 = (state_28125[(2)]);
var state_28125__$1 = state_28125;
var statearr_28178_28234 = state_28125__$1;
(statearr_28178_28234[(2)] = inst_28044);

(statearr_28178_28234[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (5))){
var inst_28015 = (state_28125[(7)]);
var inst_28014 = (state_28125[(8)]);
var inst_28017 = (inst_28015 < inst_28014);
var inst_28018 = inst_28017;
var state_28125__$1 = state_28125;
if(cljs.core.truth_(inst_28018)){
var statearr_28179_28235 = state_28125__$1;
(statearr_28179_28235[(1)] = (7));

} else {
var statearr_28180_28236 = state_28125__$1;
(statearr_28180_28236[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (14))){
var inst_28025 = (state_28125[(26)]);
var inst_28034 = cljs.core.first.call(null,inst_28025);
var inst_28035 = figwheel.client.file_reloading.eval_body.call(null,inst_28034);
var inst_28036 = cljs.core.next.call(null,inst_28025);
var inst_28012 = inst_28036;
var inst_28013 = null;
var inst_28014 = (0);
var inst_28015 = (0);
var state_28125__$1 = (function (){var statearr_28181 = state_28125;
(statearr_28181[(7)] = inst_28015);

(statearr_28181[(32)] = inst_28035);

(statearr_28181[(8)] = inst_28014);

(statearr_28181[(9)] = inst_28013);

(statearr_28181[(10)] = inst_28012);

return statearr_28181;
})();
var statearr_28182_28237 = state_28125__$1;
(statearr_28182_28237[(2)] = null);

(statearr_28182_28237[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (26))){
var inst_28084 = (state_28125[(19)]);
var inst_28087 = cljs.core.apply.call(null,cljs.core.hash_map,inst_28084);
var state_28125__$1 = state_28125;
var statearr_28183_28238 = state_28125__$1;
(statearr_28183_28238[(2)] = inst_28087);

(statearr_28183_28238[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (16))){
var inst_28051 = (state_28125[(22)]);
var inst_28053 = (function (){var all_files = inst_28051;
return ((function (all_files,inst_28051,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function (p1__27796_SHARP_){
return cljs.core.update_in.call(null,p1__27796_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157)], null),cljs.core.dissoc,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932));
});
;})(all_files,inst_28051,state_val_28126,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var inst_28054 = cljs.core.map.call(null,inst_28053,inst_28051);
var state_28125__$1 = state_28125;
var statearr_28184_28239 = state_28125__$1;
(statearr_28184_28239[(2)] = inst_28054);

(statearr_28184_28239[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (30))){
var state_28125__$1 = state_28125;
var statearr_28185_28240 = state_28125__$1;
(statearr_28185_28240[(2)] = null);

(statearr_28185_28240[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (10))){
var inst_28025 = (state_28125[(26)]);
var inst_28027 = cljs.core.chunked_seq_QMARK_.call(null,inst_28025);
var state_28125__$1 = state_28125;
if(inst_28027){
var statearr_28186_28241 = state_28125__$1;
(statearr_28186_28241[(1)] = (13));

} else {
var statearr_28187_28242 = state_28125__$1;
(statearr_28187_28242[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (18))){
var inst_28057 = (state_28125[(12)]);
var inst_28058 = (state_28125[(16)]);
var inst_28057__$1 = (state_28125[(2)]);
var inst_28058__$1 = figwheel.client.file_reloading.add_request_urls.call(null,opts,inst_28057__$1);
var inst_28059 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_28058__$1);
var state_28125__$1 = (function (){var statearr_28188 = state_28125;
(statearr_28188[(12)] = inst_28057__$1);

(statearr_28188[(16)] = inst_28058__$1);

return statearr_28188;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28125__$1,(19),inst_28059);
} else {
if((state_val_28126 === (37))){
var inst_28120 = (state_28125[(2)]);
var state_28125__$1 = state_28125;
var statearr_28189_28243 = state_28125__$1;
(statearr_28189_28243[(2)] = inst_28120);

(statearr_28189_28243[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28126 === (8))){
var inst_28025 = (state_28125[(26)]);
var inst_28012 = (state_28125[(10)]);
var inst_28025__$1 = cljs.core.seq.call(null,inst_28012);
var state_28125__$1 = (function (){var statearr_28190 = state_28125;
(statearr_28190[(26)] = inst_28025__$1);

return statearr_28190;
})();
if(inst_28025__$1){
var statearr_28191_28244 = state_28125__$1;
(statearr_28191_28244[(1)] = (10));

} else {
var statearr_28192_28245 = state_28125__$1;
(statearr_28192_28245[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
;
return ((function (switch__22474__auto__,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto____0 = (function (){
var statearr_28196 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28196[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto__);

(statearr_28196[(1)] = (1));

return statearr_28196;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto____1 = (function (state_28125){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28125);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28197){if((e28197 instanceof Object)){
var ex__22478__auto__ = e28197;
var statearr_28198_28246 = state_28125;
(statearr_28198_28246[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28125);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28197;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28247 = state_28125;
state_28125 = G__28247;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto__ = function(state_28125){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto____1.call(this,state_28125);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
})();
var state__22538__auto__ = (function (){var statearr_28199 = f__22537__auto__.call(null);
(statearr_28199[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_28199;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__,map__28000,map__28000__$1,opts,load_unchanged_files,on_jsload,before_jsload,map__28001,map__28001__$1,msg,files))
);

return c__22536__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__28250,link){
var map__28252 = p__28250;
var map__28252__$1 = ((cljs.core.seq_QMARK_.call(null,map__28252))?cljs.core.apply.call(null,cljs.core.hash_map,map__28252):map__28252);
var file = cljs.core.get.call(null,map__28252__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4126__auto__ = link.href;
if(cljs.core.truth_(temp__4126__auto__)){
var link_href = temp__4126__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4126__auto__,map__28252,map__28252__$1,file){
return (function (p1__28248_SHARP_,p2__28249_SHARP_){
if(cljs.core._EQ_.call(null,p1__28248_SHARP_,p2__28249_SHARP_)){
return p1__28248_SHARP_;
} else {
return false;
}
});})(link_href,temp__4126__auto__,map__28252,map__28252__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4126__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__28256){
var map__28257 = p__28256;
var map__28257__$1 = ((cljs.core.seq_QMARK_.call(null,map__28257))?cljs.core.apply.call(null,cljs.core.hash_map,map__28257):map__28257);
var current_url_length = cljs.core.get.call(null,map__28257__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
var match_length = cljs.core.get.call(null,map__28257__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__28253_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__28253_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4126__auto__)){
var res = temp__4126__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function figwheel$client$file_reloading$add_link_to_doc(){
var G__28259 = arguments.length;
switch (G__28259) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = (function (new_link){
return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = (function (orig_link,klone){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
return parent.removeChild(orig_link);
});})(parent))
,(300));
});

figwheel.client.file_reloading.add_link_to_doc.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__28261){
var map__28263 = p__28261;
var map__28263__$1 = ((cljs.core.seq_QMARK_.call(null,map__28263))?cljs.core.apply.call(null,cljs.core.hash_map,map__28263):map__28263);
var f_data = map__28263__$1;
var request_url = cljs.core.get.call(null,map__28263__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var file = cljs.core.get.call(null,map__28263__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4124__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4124__auto__)){
var link = temp__4124__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return figwheel.client.file_reloading.add_link_to_doc.call(null,figwheel.client.file_reloading.create_link.call(null,(function (){var or__20025__auto__ = request_url;
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return file;
}
})()));
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__28264,files_msg){
var map__28286 = p__28264;
var map__28286__$1 = ((cljs.core.seq_QMARK_.call(null,map__28286))?cljs.core.apply.call(null,cljs.core.hash_map,map__28286):map__28286);
var opts = map__28286__$1;
var on_cssload = cljs.core.get.call(null,map__28286__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__28287_28307 = cljs.core.seq.call(null,figwheel.client.file_reloading.add_request_urls.call(null,opts,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__28288_28308 = null;
var count__28289_28309 = (0);
var i__28290_28310 = (0);
while(true){
if((i__28290_28310 < count__28289_28309)){
var f_28311 = cljs.core._nth.call(null,chunk__28288_28308,i__28290_28310);
figwheel.client.file_reloading.reload_css_file.call(null,f_28311);

var G__28312 = seq__28287_28307;
var G__28313 = chunk__28288_28308;
var G__28314 = count__28289_28309;
var G__28315 = (i__28290_28310 + (1));
seq__28287_28307 = G__28312;
chunk__28288_28308 = G__28313;
count__28289_28309 = G__28314;
i__28290_28310 = G__28315;
continue;
} else {
var temp__4126__auto___28316 = cljs.core.seq.call(null,seq__28287_28307);
if(temp__4126__auto___28316){
var seq__28287_28317__$1 = temp__4126__auto___28316;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__28287_28317__$1)){
var c__20810__auto___28318 = cljs.core.chunk_first.call(null,seq__28287_28317__$1);
var G__28319 = cljs.core.chunk_rest.call(null,seq__28287_28317__$1);
var G__28320 = c__20810__auto___28318;
var G__28321 = cljs.core.count.call(null,c__20810__auto___28318);
var G__28322 = (0);
seq__28287_28307 = G__28319;
chunk__28288_28308 = G__28320;
count__28289_28309 = G__28321;
i__28290_28310 = G__28322;
continue;
} else {
var f_28323 = cljs.core.first.call(null,seq__28287_28317__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_28323);

var G__28324 = cljs.core.next.call(null,seq__28287_28317__$1);
var G__28325 = null;
var G__28326 = (0);
var G__28327 = (0);
seq__28287_28307 = G__28324;
chunk__28288_28308 = G__28325;
count__28289_28309 = G__28326;
i__28290_28310 = G__28327;
continue;
}
} else {
}
}
break;
}

var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__,map__28286,map__28286__$1,opts,on_cssload){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__,map__28286,map__28286__$1,opts,on_cssload){
return (function (state_28297){
var state_val_28298 = (state_28297[(1)]);
if((state_val_28298 === (2))){
var inst_28293 = (state_28297[(2)]);
var inst_28294 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg);
var inst_28295 = on_cssload.call(null,inst_28294);
var state_28297__$1 = (function (){var statearr_28299 = state_28297;
(statearr_28299[(7)] = inst_28293);

return statearr_28299;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28297__$1,inst_28295);
} else {
if((state_val_28298 === (1))){
var inst_28291 = cljs.core.async.timeout.call(null,(100));
var state_28297__$1 = state_28297;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28297__$1,(2),inst_28291);
} else {
return null;
}
}
});})(c__22536__auto__,map__28286,map__28286__$1,opts,on_cssload))
;
return ((function (switch__22474__auto__,c__22536__auto__,map__28286,map__28286__$1,opts,on_cssload){
return (function() {
var figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto__ = null;
var figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto____0 = (function (){
var statearr_28303 = [null,null,null,null,null,null,null,null];
(statearr_28303[(0)] = figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto__);

(statearr_28303[(1)] = (1));

return statearr_28303;
});
var figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto____1 = (function (state_28297){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28297);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28304){if((e28304 instanceof Object)){
var ex__22478__auto__ = e28304;
var statearr_28305_28328 = state_28297;
(statearr_28305_28328[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28297);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28304;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28329 = state_28297;
state_28297 = G__28329;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto__ = function(state_28297){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto____1.call(this,state_28297);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto____0;
figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto____1;
return figwheel$client$file_reloading$reload_css_files_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__,map__28286,map__28286__$1,opts,on_cssload))
})();
var state__22538__auto__ = (function (){var statearr_28306 = f__22537__auto__.call(null);
(statearr_28306[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_28306;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__,map__28286,map__28286__$1,opts,on_cssload))
);

return c__22536__auto__;
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map