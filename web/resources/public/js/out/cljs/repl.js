// Compiled by ClojureScript 0.0-3196 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4126__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4126__auto__)){
var ns = temp__4126__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__27608_27620 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__27609_27621 = null;
var count__27610_27622 = (0);
var i__27611_27623 = (0);
while(true){
if((i__27611_27623 < count__27610_27622)){
var f_27624 = cljs.core._nth.call(null,chunk__27609_27621,i__27611_27623);
cljs.core.println.call(null,"  ",f_27624);

var G__27625 = seq__27608_27620;
var G__27626 = chunk__27609_27621;
var G__27627 = count__27610_27622;
var G__27628 = (i__27611_27623 + (1));
seq__27608_27620 = G__27625;
chunk__27609_27621 = G__27626;
count__27610_27622 = G__27627;
i__27611_27623 = G__27628;
continue;
} else {
var temp__4126__auto___27629 = cljs.core.seq.call(null,seq__27608_27620);
if(temp__4126__auto___27629){
var seq__27608_27630__$1 = temp__4126__auto___27629;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__27608_27630__$1)){
var c__20810__auto___27631 = cljs.core.chunk_first.call(null,seq__27608_27630__$1);
var G__27632 = cljs.core.chunk_rest.call(null,seq__27608_27630__$1);
var G__27633 = c__20810__auto___27631;
var G__27634 = cljs.core.count.call(null,c__20810__auto___27631);
var G__27635 = (0);
seq__27608_27620 = G__27632;
chunk__27609_27621 = G__27633;
count__27610_27622 = G__27634;
i__27611_27623 = G__27635;
continue;
} else {
var f_27636 = cljs.core.first.call(null,seq__27608_27630__$1);
cljs.core.println.call(null,"  ",f_27636);

var G__27637 = cljs.core.next.call(null,seq__27608_27630__$1);
var G__27638 = null;
var G__27639 = (0);
var G__27640 = (0);
seq__27608_27620 = G__27637;
chunk__27609_27621 = G__27638;
count__27610_27622 = G__27639;
i__27611_27623 = G__27640;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
if(cljs.core.truth_((function (){var or__20025__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m));
} else {
cljs.core.prn.call(null,cljs.core.second.call(null,new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m)));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__27612 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__27613 = null;
var count__27614 = (0);
var i__27615 = (0);
while(true){
if((i__27615 < count__27614)){
var vec__27616 = cljs.core._nth.call(null,chunk__27613,i__27615);
var name = cljs.core.nth.call(null,vec__27616,(0),null);
var map__27617 = cljs.core.nth.call(null,vec__27616,(1),null);
var map__27617__$1 = ((cljs.core.seq_QMARK_.call(null,map__27617))?cljs.core.apply.call(null,cljs.core.hash_map,map__27617):map__27617);
var arglists = cljs.core.get.call(null,map__27617__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
var doc = cljs.core.get.call(null,map__27617__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__27641 = seq__27612;
var G__27642 = chunk__27613;
var G__27643 = count__27614;
var G__27644 = (i__27615 + (1));
seq__27612 = G__27641;
chunk__27613 = G__27642;
count__27614 = G__27643;
i__27615 = G__27644;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq.call(null,seq__27612);
if(temp__4126__auto__){
var seq__27612__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__27612__$1)){
var c__20810__auto__ = cljs.core.chunk_first.call(null,seq__27612__$1);
var G__27645 = cljs.core.chunk_rest.call(null,seq__27612__$1);
var G__27646 = c__20810__auto__;
var G__27647 = cljs.core.count.call(null,c__20810__auto__);
var G__27648 = (0);
seq__27612 = G__27645;
chunk__27613 = G__27646;
count__27614 = G__27647;
i__27615 = G__27648;
continue;
} else {
var vec__27618 = cljs.core.first.call(null,seq__27612__$1);
var name = cljs.core.nth.call(null,vec__27618,(0),null);
var map__27619 = cljs.core.nth.call(null,vec__27618,(1),null);
var map__27619__$1 = ((cljs.core.seq_QMARK_.call(null,map__27619))?cljs.core.apply.call(null,cljs.core.hash_map,map__27619):map__27619);
var arglists = cljs.core.get.call(null,map__27619__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
var doc = cljs.core.get.call(null,map__27619__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__27649 = cljs.core.next.call(null,seq__27612__$1);
var G__27650 = null;
var G__27651 = (0);
var G__27652 = (0);
seq__27612 = G__27649;
chunk__27613 = G__27650;
count__27614 = G__27651;
i__27615 = G__27652;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map