// Compiled by ClojureScript 0.0-3196 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
goog.require('cljs.repl');
goog.require('figwheel.client.heads_up');
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),args], null));

return args;
});
figwheel.client.console_print = (function figwheel$client$console_print(args){
console.log.apply(console,cljs.core.into_array.call(null,args));

return args;
});
figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

return cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__26713__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__26713 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__26714__i = 0, G__26714__a = new Array(arguments.length -  0);
while (G__26714__i < G__26714__a.length) {G__26714__a[G__26714__i] = arguments[G__26714__i + 0]; ++G__26714__i;}
  args = new cljs.core.IndexedSeq(G__26714__a,0);
} 
return G__26713__delegate.call(this,args);};
G__26713.cljs$lang$maxFixedArity = 0;
G__26713.cljs$lang$applyTo = (function (arglist__26715){
var args = cljs.core.seq(arglist__26715);
return G__26713__delegate(args);
});
G__26713.cljs$core$IFn$_invoke$arity$variadic = G__26713__delegate;
return G__26713;
})()
;
});
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel$client$get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__26716){
var map__26718 = p__26716;
var map__26718__$1 = ((cljs.core.seq_QMARK_.call(null,map__26718))?cljs.core.apply.call(null,cljs.core.hash_map,map__26718):map__26718);
var class$ = cljs.core.get.call(null,map__26718__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var message = cljs.core.get.call(null,map__26718__$1,new cljs.core.Keyword(null,"message","message",-406056002));
return [cljs.core.str(class$),cljs.core.str(" : "),cljs.core.str(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__20025__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__20013__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__20013__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__20013__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__22536__auto___26847 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___26847,ch){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___26847,ch){
return (function (state_26821){
var state_val_26822 = (state_26821[(1)]);
if((state_val_26822 === (7))){
var inst_26817 = (state_26821[(2)]);
var state_26821__$1 = state_26821;
var statearr_26823_26848 = state_26821__$1;
(statearr_26823_26848[(2)] = inst_26817);

(statearr_26823_26848[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (1))){
var state_26821__$1 = state_26821;
var statearr_26824_26849 = state_26821__$1;
(statearr_26824_26849[(2)] = null);

(statearr_26824_26849[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (4))){
var inst_26785 = (state_26821[(7)]);
var inst_26785__$1 = (state_26821[(2)]);
var state_26821__$1 = (function (){var statearr_26825 = state_26821;
(statearr_26825[(7)] = inst_26785__$1);

return statearr_26825;
})();
if(cljs.core.truth_(inst_26785__$1)){
var statearr_26826_26850 = state_26821__$1;
(statearr_26826_26850[(1)] = (5));

} else {
var statearr_26827_26851 = state_26821__$1;
(statearr_26827_26851[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (13))){
var state_26821__$1 = state_26821;
var statearr_26828_26852 = state_26821__$1;
(statearr_26828_26852[(2)] = null);

(statearr_26828_26852[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (6))){
var state_26821__$1 = state_26821;
var statearr_26829_26853 = state_26821__$1;
(statearr_26829_26853[(2)] = null);

(statearr_26829_26853[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (3))){
var inst_26819 = (state_26821[(2)]);
var state_26821__$1 = state_26821;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26821__$1,inst_26819);
} else {
if((state_val_26822 === (12))){
var inst_26792 = (state_26821[(8)]);
var inst_26805 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_26792);
var inst_26806 = cljs.core.first.call(null,inst_26805);
var inst_26807 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_26806);
var inst_26808 = console.warn("Figwheel: Not loading code with warnings - ",inst_26807);
var state_26821__$1 = state_26821;
var statearr_26830_26854 = state_26821__$1;
(statearr_26830_26854[(2)] = inst_26808);

(statearr_26830_26854[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (2))){
var state_26821__$1 = state_26821;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26821__$1,(4),ch);
} else {
if((state_val_26822 === (11))){
var inst_26801 = (state_26821[(2)]);
var state_26821__$1 = state_26821;
var statearr_26831_26855 = state_26821__$1;
(statearr_26831_26855[(2)] = inst_26801);

(statearr_26831_26855[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (9))){
var inst_26791 = (state_26821[(9)]);
var inst_26803 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_26791,opts);
var state_26821__$1 = state_26821;
if(cljs.core.truth_(inst_26803)){
var statearr_26832_26856 = state_26821__$1;
(statearr_26832_26856[(1)] = (12));

} else {
var statearr_26833_26857 = state_26821__$1;
(statearr_26833_26857[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (5))){
var inst_26785 = (state_26821[(7)]);
var inst_26791 = (state_26821[(9)]);
var inst_26787 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_26788 = (new cljs.core.PersistentArrayMap(null,2,inst_26787,null));
var inst_26789 = (new cljs.core.PersistentHashSet(null,inst_26788,null));
var inst_26790 = figwheel.client.focus_msgs.call(null,inst_26789,inst_26785);
var inst_26791__$1 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_26790);
var inst_26792 = cljs.core.first.call(null,inst_26790);
var inst_26793 = figwheel.client.reload_file_state_QMARK_.call(null,inst_26791__$1,opts);
var state_26821__$1 = (function (){var statearr_26834 = state_26821;
(statearr_26834[(8)] = inst_26792);

(statearr_26834[(9)] = inst_26791__$1);

return statearr_26834;
})();
if(cljs.core.truth_(inst_26793)){
var statearr_26835_26858 = state_26821__$1;
(statearr_26835_26858[(1)] = (8));

} else {
var statearr_26836_26859 = state_26821__$1;
(statearr_26836_26859[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (14))){
var inst_26811 = (state_26821[(2)]);
var state_26821__$1 = state_26821;
var statearr_26837_26860 = state_26821__$1;
(statearr_26837_26860[(2)] = inst_26811);

(statearr_26837_26860[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (10))){
var inst_26813 = (state_26821[(2)]);
var state_26821__$1 = (function (){var statearr_26838 = state_26821;
(statearr_26838[(10)] = inst_26813);

return statearr_26838;
})();
var statearr_26839_26861 = state_26821__$1;
(statearr_26839_26861[(2)] = null);

(statearr_26839_26861[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26822 === (8))){
var inst_26792 = (state_26821[(8)]);
var inst_26795 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_26796 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_26792);
var inst_26797 = cljs.core.async.timeout.call(null,(1000));
var inst_26798 = [inst_26796,inst_26797];
var inst_26799 = (new cljs.core.PersistentVector(null,2,(5),inst_26795,inst_26798,null));
var state_26821__$1 = state_26821;
return cljs.core.async.ioc_alts_BANG_.call(null,state_26821__$1,(11),inst_26799);
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
});})(c__22536__auto___26847,ch))
;
return ((function (switch__22474__auto__,c__22536__auto___26847,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__22475__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__22475__auto____0 = (function (){
var statearr_26843 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26843[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__22475__auto__);

(statearr_26843[(1)] = (1));

return statearr_26843;
});
var figwheel$client$file_reloader_plugin_$_state_machine__22475__auto____1 = (function (state_26821){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_26821);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e26844){if((e26844 instanceof Object)){
var ex__22478__auto__ = e26844;
var statearr_26845_26862 = state_26821;
(statearr_26845_26862[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26821);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26844;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26863 = state_26821;
state_26821 = G__26863;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__22475__auto__ = function(state_26821){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__22475__auto____1.call(this,state_26821);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__22475__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__22475__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___26847,ch))
})();
var state__22538__auto__ = (function (){var statearr_26846 = f__22537__auto__.call(null);
(statearr_26846[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___26847);

return statearr_26846;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___26847,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__26864_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__26864_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
var base_path_26873 = clojure.string.replace.call(null,goog.basePath,/(.*)goog\//,(function (p1__26866_SHARP_,p2__26865_SHARP_){
return [cljs.core.str(p2__26865_SHARP_)].join('');
}));
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_26873){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,result_handler){
try{var _STAR_print_fn_STAR_26871 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_26872 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_26871,_STAR_print_newline_STAR_26872,base_path_26873){
return (function() { 
var G__26874__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__26874 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__26875__i = 0, G__26875__a = new Array(arguments.length -  0);
while (G__26875__i < G__26875__a.length) {G__26875__a[G__26875__i] = arguments[G__26875__i + 0]; ++G__26875__i;}
  args = new cljs.core.IndexedSeq(G__26875__a,0);
} 
return G__26874__delegate.call(this,args);};
G__26874.cljs$lang$maxFixedArity = 0;
G__26874.cljs$lang$applyTo = (function (arglist__26876){
var args = cljs.core.seq(arglist__26876);
return G__26874__delegate(args);
});
G__26874.cljs$core$IFn$_invoke$arity$variadic = G__26874__delegate;
return G__26874;
})()
;})(_STAR_print_fn_STAR_26871,_STAR_print_newline_STAR_26872,base_path_26873))
;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(eval(code))].join('')], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_26872;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_26871;
}}catch (e26870){if((e26870 instanceof Error)){
var e = e26870;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_26873], null));
} else {
var e = e26870;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_26873))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = {};
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__26877){
var map__26882 = p__26877;
var map__26882__$1 = ((cljs.core.seq_QMARK_.call(null,map__26882))?cljs.core.apply.call(null,cljs.core.hash_map,map__26882):map__26882);
var opts = map__26882__$1;
var build_id = cljs.core.get.call(null,map__26882__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__26882,map__26882__$1,opts,build_id){
return (function (p__26883){
var vec__26884 = p__26883;
var map__26885 = cljs.core.nth.call(null,vec__26884,(0),null);
var map__26885__$1 = ((cljs.core.seq_QMARK_.call(null,map__26885))?cljs.core.apply.call(null,cljs.core.hash_map,map__26885):map__26885);
var msg = map__26885__$1;
var msg_name = cljs.core.get.call(null,map__26885__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__26884,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),((function (vec__26884,map__26885,map__26885__$1,msg,msg_name,_,map__26882,map__26882__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__26884,map__26885,map__26885__$1,msg,msg_name,_,map__26882,map__26882__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__26882,map__26882__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__26889){
var vec__26890 = p__26889;
var map__26891 = cljs.core.nth.call(null,vec__26890,(0),null);
var map__26891__$1 = ((cljs.core.seq_QMARK_.call(null,map__26891))?cljs.core.apply.call(null,cljs.core.hash_map,map__26891):map__26891);
var msg = map__26891__$1;
var msg_name = cljs.core.get.call(null,map__26891__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__26890,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__26892){
var map__26900 = p__26892;
var map__26900__$1 = ((cljs.core.seq_QMARK_.call(null,map__26900))?cljs.core.apply.call(null,cljs.core.hash_map,map__26900):map__26900);
var on_compile_fail = cljs.core.get.call(null,map__26900__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
var on_compile_warning = cljs.core.get.call(null,map__26900__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
return ((function (map__26900,map__26900__$1,on_compile_fail,on_compile_warning){
return (function (p__26901){
var vec__26902 = p__26901;
var map__26903 = cljs.core.nth.call(null,vec__26902,(0),null);
var map__26903__$1 = ((cljs.core.seq_QMARK_.call(null,map__26903))?cljs.core.apply.call(null,cljs.core.hash_map,map__26903):map__26903);
var msg = map__26903__$1;
var msg_name = cljs.core.get.call(null,map__26903__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__26902,(1));
var pred__26904 = cljs.core._EQ_;
var expr__26905 = msg_name;
if(cljs.core.truth_(pred__26904.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__26905))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__26904.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__26905))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__26900,map__26900__$1,on_compile_fail,on_compile_warning))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__,msg_hist,msg_names,msg){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__,msg_hist,msg_names,msg){
return (function (state_27102){
var state_val_27103 = (state_27102[(1)]);
if((state_val_27103 === (7))){
var inst_27038 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27104_27145 = state_27102__$1;
(statearr_27104_27145[(2)] = inst_27038);

(statearr_27104_27145[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (20))){
var inst_27064 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27064)){
var statearr_27105_27146 = state_27102__$1;
(statearr_27105_27146[(1)] = (22));

} else {
var statearr_27106_27147 = state_27102__$1;
(statearr_27106_27147[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (27))){
var inst_27076 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_27077 = figwheel.client.heads_up.display_warning.call(null,inst_27076);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(30),inst_27077);
} else {
if((state_val_27103 === (1))){
var inst_27026 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27026)){
var statearr_27107_27148 = state_27102__$1;
(statearr_27107_27148[(1)] = (2));

} else {
var statearr_27108_27149 = state_27102__$1;
(statearr_27108_27149[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (24))){
var inst_27092 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27109_27150 = state_27102__$1;
(statearr_27109_27150[(2)] = inst_27092);

(statearr_27109_27150[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (4))){
var inst_27100 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27102__$1,inst_27100);
} else {
if((state_val_27103 === (15))){
var inst_27053 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_27054 = figwheel.client.format_messages.call(null,inst_27053);
var inst_27055 = figwheel.client.heads_up.display_error.call(null,inst_27054);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(18),inst_27055);
} else {
if((state_val_27103 === (21))){
var inst_27094 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27110_27151 = state_27102__$1;
(statearr_27110_27151[(2)] = inst_27094);

(statearr_27110_27151[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (31))){
var inst_27083 = figwheel.client.heads_up.flash_loaded.call(null);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(34),inst_27083);
} else {
if((state_val_27103 === (32))){
var state_27102__$1 = state_27102;
var statearr_27111_27152 = state_27102__$1;
(statearr_27111_27152[(2)] = null);

(statearr_27111_27152[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (33))){
var inst_27088 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27112_27153 = state_27102__$1;
(statearr_27112_27153[(2)] = inst_27088);

(statearr_27112_27153[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (13))){
var inst_27044 = (state_27102[(2)]);
var inst_27045 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_27046 = figwheel.client.format_messages.call(null,inst_27045);
var inst_27047 = figwheel.client.heads_up.display_error.call(null,inst_27046);
var state_27102__$1 = (function (){var statearr_27113 = state_27102;
(statearr_27113[(7)] = inst_27044);

return statearr_27113;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(14),inst_27047);
} else {
if((state_val_27103 === (22))){
var inst_27066 = figwheel.client.heads_up.clear.call(null);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(25),inst_27066);
} else {
if((state_val_27103 === (29))){
var inst_27090 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27114_27154 = state_27102__$1;
(statearr_27114_27154[(2)] = inst_27090);

(statearr_27114_27154[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (6))){
var inst_27034 = figwheel.client.heads_up.clear.call(null);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(9),inst_27034);
} else {
if((state_val_27103 === (28))){
var inst_27081 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27081)){
var statearr_27115_27155 = state_27102__$1;
(statearr_27115_27155[(1)] = (31));

} else {
var statearr_27116_27156 = state_27102__$1;
(statearr_27116_27156[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (25))){
var inst_27068 = (state_27102[(2)]);
var inst_27069 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_27070 = figwheel.client.heads_up.display_warning.call(null,inst_27069);
var state_27102__$1 = (function (){var statearr_27117 = state_27102;
(statearr_27117[(8)] = inst_27068);

return statearr_27117;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(26),inst_27070);
} else {
if((state_val_27103 === (34))){
var inst_27085 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27118_27157 = state_27102__$1;
(statearr_27118_27157[(2)] = inst_27085);

(statearr_27118_27157[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (17))){
var inst_27096 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27119_27158 = state_27102__$1;
(statearr_27119_27158[(2)] = inst_27096);

(statearr_27119_27158[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (3))){
var inst_27040 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27040)){
var statearr_27120_27159 = state_27102__$1;
(statearr_27120_27159[(1)] = (10));

} else {
var statearr_27121_27160 = state_27102__$1;
(statearr_27121_27160[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (12))){
var inst_27098 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27122_27161 = state_27102__$1;
(statearr_27122_27161[(2)] = inst_27098);

(statearr_27122_27161[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (2))){
var inst_27028 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27028)){
var statearr_27123_27162 = state_27102__$1;
(statearr_27123_27162[(1)] = (5));

} else {
var statearr_27124_27163 = state_27102__$1;
(statearr_27124_27163[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (23))){
var inst_27074 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27074)){
var statearr_27125_27164 = state_27102__$1;
(statearr_27125_27164[(1)] = (27));

} else {
var statearr_27126_27165 = state_27102__$1;
(statearr_27126_27165[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (19))){
var inst_27061 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_27062 = figwheel.client.heads_up.append_message.call(null,inst_27061);
var state_27102__$1 = state_27102;
var statearr_27127_27166 = state_27102__$1;
(statearr_27127_27166[(2)] = inst_27062);

(statearr_27127_27166[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (11))){
var inst_27051 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27051)){
var statearr_27128_27167 = state_27102__$1;
(statearr_27128_27167[(1)] = (15));

} else {
var statearr_27129_27168 = state_27102__$1;
(statearr_27129_27168[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (9))){
var inst_27036 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27130_27169 = state_27102__$1;
(statearr_27130_27169[(2)] = inst_27036);

(statearr_27130_27169[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (5))){
var inst_27030 = figwheel.client.heads_up.flash_loaded.call(null);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(8),inst_27030);
} else {
if((state_val_27103 === (14))){
var inst_27049 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27131_27170 = state_27102__$1;
(statearr_27131_27170[(2)] = inst_27049);

(statearr_27131_27170[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (26))){
var inst_27072 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27132_27171 = state_27102__$1;
(statearr_27132_27171[(2)] = inst_27072);

(statearr_27132_27171[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (16))){
var inst_27059 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_27102__$1 = state_27102;
if(cljs.core.truth_(inst_27059)){
var statearr_27133_27172 = state_27102__$1;
(statearr_27133_27172[(1)] = (19));

} else {
var statearr_27134_27173 = state_27102__$1;
(statearr_27134_27173[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (30))){
var inst_27079 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27135_27174 = state_27102__$1;
(statearr_27135_27174[(2)] = inst_27079);

(statearr_27135_27174[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (10))){
var inst_27042 = figwheel.client.heads_up.clear.call(null);
var state_27102__$1 = state_27102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27102__$1,(13),inst_27042);
} else {
if((state_val_27103 === (18))){
var inst_27057 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27136_27175 = state_27102__$1;
(statearr_27136_27175[(2)] = inst_27057);

(statearr_27136_27175[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27103 === (8))){
var inst_27032 = (state_27102[(2)]);
var state_27102__$1 = state_27102;
var statearr_27137_27176 = state_27102__$1;
(statearr_27137_27176[(2)] = inst_27032);

(statearr_27137_27176[(1)] = (7));


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
});})(c__22536__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__22474__auto__,c__22536__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto____0 = (function (){
var statearr_27141 = [null,null,null,null,null,null,null,null,null];
(statearr_27141[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto__);

(statearr_27141[(1)] = (1));

return statearr_27141;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto____1 = (function (state_27102){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_27102);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e27142){if((e27142 instanceof Object)){
var ex__22478__auto__ = e27142;
var statearr_27143_27177 = state_27102;
(statearr_27143_27177[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27102);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27142;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27178 = state_27102;
state_27102 = G__27178;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto__ = function(state_27102){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto____1.call(this,state_27102);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__,msg_hist,msg_names,msg))
})();
var state__22538__auto__ = (function (){var statearr_27144 = f__22537__auto__.call(null);
(statearr_27144[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_27144;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__,msg_hist,msg_names,msg))
);

return c__22536__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__22536__auto___27241 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___27241,ch){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___27241,ch){
return (function (state_27224){
var state_val_27225 = (state_27224[(1)]);
if((state_val_27225 === (8))){
var inst_27216 = (state_27224[(2)]);
var state_27224__$1 = (function (){var statearr_27226 = state_27224;
(statearr_27226[(7)] = inst_27216);

return statearr_27226;
})();
var statearr_27227_27242 = state_27224__$1;
(statearr_27227_27242[(2)] = null);

(statearr_27227_27242[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27225 === (7))){
var inst_27220 = (state_27224[(2)]);
var state_27224__$1 = state_27224;
var statearr_27228_27243 = state_27224__$1;
(statearr_27228_27243[(2)] = inst_27220);

(statearr_27228_27243[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27225 === (6))){
var state_27224__$1 = state_27224;
var statearr_27229_27244 = state_27224__$1;
(statearr_27229_27244[(2)] = null);

(statearr_27229_27244[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27225 === (5))){
var inst_27212 = (state_27224[(8)]);
var inst_27214 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_27212);
var state_27224__$1 = state_27224;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27224__$1,(8),inst_27214);
} else {
if((state_val_27225 === (4))){
var inst_27212 = (state_27224[(8)]);
var inst_27212__$1 = (state_27224[(2)]);
var state_27224__$1 = (function (){var statearr_27230 = state_27224;
(statearr_27230[(8)] = inst_27212__$1);

return statearr_27230;
})();
if(cljs.core.truth_(inst_27212__$1)){
var statearr_27231_27245 = state_27224__$1;
(statearr_27231_27245[(1)] = (5));

} else {
var statearr_27232_27246 = state_27224__$1;
(statearr_27232_27246[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27225 === (3))){
var inst_27222 = (state_27224[(2)]);
var state_27224__$1 = state_27224;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27224__$1,inst_27222);
} else {
if((state_val_27225 === (2))){
var state_27224__$1 = state_27224;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27224__$1,(4),ch);
} else {
if((state_val_27225 === (1))){
var state_27224__$1 = state_27224;
var statearr_27233_27247 = state_27224__$1;
(statearr_27233_27247[(2)] = null);

(statearr_27233_27247[(1)] = (2));


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
});})(c__22536__auto___27241,ch))
;
return ((function (switch__22474__auto__,c__22536__auto___27241,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__22475__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__22475__auto____0 = (function (){
var statearr_27237 = [null,null,null,null,null,null,null,null,null];
(statearr_27237[(0)] = figwheel$client$heads_up_plugin_$_state_machine__22475__auto__);

(statearr_27237[(1)] = (1));

return statearr_27237;
});
var figwheel$client$heads_up_plugin_$_state_machine__22475__auto____1 = (function (state_27224){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_27224);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e27238){if((e27238 instanceof Object)){
var ex__22478__auto__ = e27238;
var statearr_27239_27248 = state_27224;
(statearr_27239_27248[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27224);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27238;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27249 = state_27224;
state_27224 = G__27249;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__22475__auto__ = function(state_27224){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__22475__auto____1.call(this,state_27224);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__22475__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__22475__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___27241,ch))
})();
var state__22538__auto__ = (function (){var statearr_27240 = f__22537__auto__.call(null);
(statearr_27240[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___27241);

return statearr_27240;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___27241,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__){
return (function (state_27270){
var state_val_27271 = (state_27270[(1)]);
if((state_val_27271 === (2))){
var inst_27267 = (state_27270[(2)]);
var inst_27268 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_27270__$1 = (function (){var statearr_27272 = state_27270;
(statearr_27272[(7)] = inst_27267);

return statearr_27272;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27270__$1,inst_27268);
} else {
if((state_val_27271 === (1))){
var inst_27265 = cljs.core.async.timeout.call(null,(3000));
var state_27270__$1 = state_27270;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27270__$1,(2),inst_27265);
} else {
return null;
}
}
});})(c__22536__auto__))
;
return ((function (switch__22474__auto__,c__22536__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__22475__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__22475__auto____0 = (function (){
var statearr_27276 = [null,null,null,null,null,null,null,null];
(statearr_27276[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__22475__auto__);

(statearr_27276[(1)] = (1));

return statearr_27276;
});
var figwheel$client$enforce_project_plugin_$_state_machine__22475__auto____1 = (function (state_27270){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_27270);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e27277){if((e27277 instanceof Object)){
var ex__22478__auto__ = e27277;
var statearr_27278_27280 = state_27270;
(statearr_27278_27280[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27270);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27277;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27281 = state_27270;
state_27270 = G__27281;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__22475__auto__ = function(state_27270){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__22475__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__22475__auto____1.call(this,state_27270);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__22475__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__22475__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__))
})();
var state__22538__auto__ = (function (){var statearr_27279 = f__22537__auto__.call(null);
(statearr_27279[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_27279;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__))
);

return c__22536__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = (function figwheel$client$default_on_jsload(url){
if(cljs.core.truth_((function (){var and__20013__auto__ = figwheel.client.utils.html_env_QMARK_.call(null);
if(cljs.core.truth_(and__20013__auto__)){
return ("CustomEvent" in window);
} else {
return and__20013__auto__;
}
})())){
return document.body.dispatchEvent((new CustomEvent("figwheel.js-reload",(function (){var obj27285 = {"detail":url};
return obj27285;
})())));
} else {
return null;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__27286){
var map__27292 = p__27286;
var map__27292__$1 = ((cljs.core.seq_QMARK_.call(null,map__27292))?cljs.core.apply.call(null,cljs.core.hash_map,map__27292):map__27292);
var ed = map__27292__$1;
var exception_data = cljs.core.get.call(null,map__27292__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var formatted_exception = cljs.core.get.call(null,map__27292__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__27293_27297 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__27294_27298 = null;
var count__27295_27299 = (0);
var i__27296_27300 = (0);
while(true){
if((i__27296_27300 < count__27295_27299)){
var msg_27301 = cljs.core._nth.call(null,chunk__27294_27298,i__27296_27300);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_27301);

var G__27302 = seq__27293_27297;
var G__27303 = chunk__27294_27298;
var G__27304 = count__27295_27299;
var G__27305 = (i__27296_27300 + (1));
seq__27293_27297 = G__27302;
chunk__27294_27298 = G__27303;
count__27295_27299 = G__27304;
i__27296_27300 = G__27305;
continue;
} else {
var temp__4126__auto___27306 = cljs.core.seq.call(null,seq__27293_27297);
if(temp__4126__auto___27306){
var seq__27293_27307__$1 = temp__4126__auto___27306;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__27293_27307__$1)){
var c__20810__auto___27308 = cljs.core.chunk_first.call(null,seq__27293_27307__$1);
var G__27309 = cljs.core.chunk_rest.call(null,seq__27293_27307__$1);
var G__27310 = c__20810__auto___27308;
var G__27311 = cljs.core.count.call(null,c__20810__auto___27308);
var G__27312 = (0);
seq__27293_27297 = G__27309;
chunk__27294_27298 = G__27310;
count__27295_27299 = G__27311;
i__27296_27300 = G__27312;
continue;
} else {
var msg_27313 = cljs.core.first.call(null,seq__27293_27307__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_27313);

var G__27314 = cljs.core.next.call(null,seq__27293_27307__$1);
var G__27315 = null;
var G__27316 = (0);
var G__27317 = (0);
seq__27293_27297 = G__27314;
chunk__27294_27298 = G__27315;
count__27295_27299 = G__27316;
i__27296_27300 = G__27317;
continue;
}
} else {
}
}
break;
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__27318){
var map__27320 = p__27318;
var map__27320__$1 = ((cljs.core.seq_QMARK_.call(null,map__27320))?cljs.core.apply.call(null,cljs.core.hash_map,map__27320):map__27320);
var w = map__27320__$1;
var message = cljs.core.get.call(null,map__27320__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str("Figwheel: Compile Warning - "),cljs.core.str(message)].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"load-unchanged-files","load-unchanged-files",-1561468704),new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[true,figwheel.client.default_on_compile_warning,figwheel.client.default_on_jsload,figwheel.client.default_on_compile_fail,false,true,[cljs.core.str("ws://"),cljs.core.str((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str("/figwheel-ws")].join(''),figwheel.client.default_before_load,false,(100),true,false,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,goog.inHtmlDocument_()))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__20013__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__20013__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__20013__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__27327 = cljs.core.seq.call(null,plugins);
var chunk__27328 = null;
var count__27329 = (0);
var i__27330 = (0);
while(true){
if((i__27330 < count__27329)){
var vec__27331 = cljs.core._nth.call(null,chunk__27328,i__27330);
var k = cljs.core.nth.call(null,vec__27331,(0),null);
var plugin = cljs.core.nth.call(null,vec__27331,(1),null);
if(cljs.core.truth_(plugin)){
var pl_27333 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__27327,chunk__27328,count__27329,i__27330,pl_27333,vec__27331,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_27333.call(null,msg_hist);
});})(seq__27327,chunk__27328,count__27329,i__27330,pl_27333,vec__27331,k,plugin))
);
} else {
}

var G__27334 = seq__27327;
var G__27335 = chunk__27328;
var G__27336 = count__27329;
var G__27337 = (i__27330 + (1));
seq__27327 = G__27334;
chunk__27328 = G__27335;
count__27329 = G__27336;
i__27330 = G__27337;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq.call(null,seq__27327);
if(temp__4126__auto__){
var seq__27327__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__27327__$1)){
var c__20810__auto__ = cljs.core.chunk_first.call(null,seq__27327__$1);
var G__27338 = cljs.core.chunk_rest.call(null,seq__27327__$1);
var G__27339 = c__20810__auto__;
var G__27340 = cljs.core.count.call(null,c__20810__auto__);
var G__27341 = (0);
seq__27327 = G__27338;
chunk__27328 = G__27339;
count__27329 = G__27340;
i__27330 = G__27341;
continue;
} else {
var vec__27332 = cljs.core.first.call(null,seq__27327__$1);
var k = cljs.core.nth.call(null,vec__27332,(0),null);
var plugin = cljs.core.nth.call(null,vec__27332,(1),null);
if(cljs.core.truth_(plugin)){
var pl_27342 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__27327,chunk__27328,count__27329,i__27330,pl_27342,vec__27332,k,plugin,seq__27327__$1,temp__4126__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_27342.call(null,msg_hist);
});})(seq__27327,chunk__27328,count__27329,i__27330,pl_27342,vec__27332,k,plugin,seq__27327__$1,temp__4126__auto__))
);
} else {
}

var G__27343 = cljs.core.next.call(null,seq__27327__$1);
var G__27344 = null;
var G__27345 = (0);
var G__27346 = (0);
seq__27327 = G__27343;
chunk__27328 = G__27344;
count__27329 = G__27345;
i__27330 = G__27346;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(){
var G__27348 = arguments.length;
switch (G__27348) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

return figwheel.client.socket.open.call(null,system_options);
}));
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;
figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(){
var argseq__21065__auto__ = ((((0) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__21065__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__27351){
var map__27352 = p__27351;
var map__27352__$1 = ((cljs.core.seq_QMARK_.call(null,map__27352))?cljs.core.apply.call(null,cljs.core.hash_map,map__27352):map__27352);
var opts = map__27352__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq27350){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq27350));
});

//# sourceMappingURL=client.js.map