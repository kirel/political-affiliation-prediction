// Compiled by ClojureScript 0.0-3196 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t28380 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t28380 = (function (f,fn_handler,meta28381){
this.f = f;
this.fn_handler = fn_handler;
this.meta28381 = meta28381;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t28380.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t28380.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t28380.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t28380.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28382){
var self__ = this;
var _28382__$1 = this;
return self__.meta28381;
});

cljs.core.async.t28380.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28382,meta28381__$1){
var self__ = this;
var _28382__$1 = this;
return (new cljs.core.async.t28380(self__.f,self__.fn_handler,meta28381__$1));
});

cljs.core.async.t28380.cljs$lang$type = true;

cljs.core.async.t28380.cljs$lang$ctorStr = "cljs.core.async/t28380";

cljs.core.async.t28380.cljs$lang$ctorPrWriter = (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t28380");
});

cljs.core.async.__GT_t28380 = (function cljs$core$async$fn_handler_$___GT_t28380(f__$1,fn_handler__$1,meta28381){
return (new cljs.core.async.t28380(f__$1,fn_handler__$1,meta28381));
});

}

return (new cljs.core.async.t28380(f,cljs$core$async$fn_handler,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 * val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 * buffered, but oldest elements in buffer will be dropped (not
 * transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full.
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
var G__28384 = buff;
if(G__28384){
var bit__20699__auto__ = null;
if(cljs.core.truth_((function (){var or__20025__auto__ = bit__20699__auto__;
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return G__28384.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})())){
return true;
} else {
if((!G__28384.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__28384);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__28384);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 * (filter p) etc or a composition thereof), and an optional exception handler.
 * If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 * transducer is supplied a buffer must be specified. ex-handler must be a
 * fn of one argument - if an exception occurs during transformation it will be called
 * with the thrown value as an argument, and any non-nil return value will be placed
 * in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(){
var G__28386 = arguments.length;
switch (G__28386) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 * return nil if closed. Will park if nothing is available.
 * Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(){
var G__28389 = arguments.length;
switch (G__28389) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_28391 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_28391);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_28391,ret){
return (function (){
return fn1.call(null,val_28391);
});})(val_28391,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 * inside a (go ...) block. Will park if no buffer space is available.
 * Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(){
var G__28393 = arguments.length;
switch (G__28393) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4124__auto__)){
var ret = temp__4124__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4124__auto__)){
var retb = temp__4124__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4124__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4124__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__20910__auto___28395 = n;
var x_28396 = (0);
while(true){
if((x_28396 < n__20910__auto___28395)){
(a[x_28396] = (0));

var G__28397 = (x_28396 + (1));
x_28396 = G__28397;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__28398 = (i + (1));
i = G__28398;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t28402 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t28402 = (function (flag,alt_flag,meta28403){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta28403 = meta28403;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t28402.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t28402.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t28402.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t28402.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_28404){
var self__ = this;
var _28404__$1 = this;
return self__.meta28403;
});})(flag))
;

cljs.core.async.t28402.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_28404,meta28403__$1){
var self__ = this;
var _28404__$1 = this;
return (new cljs.core.async.t28402(self__.flag,self__.alt_flag,meta28403__$1));
});})(flag))
;

cljs.core.async.t28402.cljs$lang$type = true;

cljs.core.async.t28402.cljs$lang$ctorStr = "cljs.core.async/t28402";

cljs.core.async.t28402.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t28402");
});})(flag))
;

cljs.core.async.__GT_t28402 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t28402(flag__$1,alt_flag__$1,meta28403){
return (new cljs.core.async.t28402(flag__$1,alt_flag__$1,meta28403));
});})(flag))
;

}

return (new cljs.core.async.t28402(flag,cljs$core$async$alt_flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t28408 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t28408 = (function (cb,flag,alt_handler,meta28409){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta28409 = meta28409;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t28408.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t28408.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t28408.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t28408.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28410){
var self__ = this;
var _28410__$1 = this;
return self__.meta28409;
});

cljs.core.async.t28408.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28410,meta28409__$1){
var self__ = this;
var _28410__$1 = this;
return (new cljs.core.async.t28408(self__.cb,self__.flag,self__.alt_handler,meta28409__$1));
});

cljs.core.async.t28408.cljs$lang$type = true;

cljs.core.async.t28408.cljs$lang$ctorStr = "cljs.core.async/t28408";

cljs.core.async.t28408.cljs$lang$ctorPrWriter = (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t28408");
});

cljs.core.async.__GT_t28408 = (function cljs$core$async$alt_handler_$___GT_t28408(cb__$1,flag__$1,alt_handler__$1,meta28409){
return (new cljs.core.async.t28408(cb__$1,flag__$1,alt_handler__$1,meta28409));
});

}

return (new cljs.core.async.t28408(cb,flag,cljs$core$async$alt_handler,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__28411_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__28411_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__28412_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__28412_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__20025__auto__ = wport;
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return port;
}
})()], null));
} else {
var G__28413 = (i + (1));
i = G__28413;
continue;
}
} else {
return null;
}
break;
}
})();
var or__20025__auto__ = ret;
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4126__auto__ = (function (){var and__20013__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__20013__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__20013__auto__;
}
})();
if(cljs.core.truth_(temp__4126__auto__)){
var got = temp__4126__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 * [channel-to-put-to val-to-put], in any combination. Takes will be
 * made as if by <!, and puts will be made as if by >!. Unless
 * the :priority option is true, if more than one port operation is
 * ready a non-deterministic choice will be made. If no operation is
 * ready and a :default value is supplied, [default-val :default] will
 * be returned, otherwise alts! will park until the first operation to
 * become ready completes. Returns [val port] of the completed
 * operation, where val is the value taken for takes, and a
 * boolean (true unless already closed, as per put!) for puts.
 * 
 * opts are passed as :key val ... Supported options:
 * 
 * :default val - the value to use if none of the operations are immediately ready
 * :priority true - (default nil) when true, the operations will be tried in order.
 * 
 * Note: there is no guarantee that the port exps or val exprs will be
 * used, nor in what order should they be, so they should not be
 * depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(){
var argseq__21065__auto__ = ((((1) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__21065__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__28416){
var map__28417 = p__28416;
var map__28417__$1 = ((cljs.core.seq_QMARK_.call(null,map__28417))?cljs.core.apply.call(null,cljs.core.hash_map,map__28417):map__28417);
var opts = map__28417__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq28414){
var G__28415 = cljs.core.first.call(null,seq28414);
var seq28414__$1 = cljs.core.next.call(null,seq28414);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__28415,seq28414__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(){
var G__28419 = arguments.length;
switch (G__28419) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__22536__auto___28468 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___28468){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___28468){
return (function (state_28443){
var state_val_28444 = (state_28443[(1)]);
if((state_val_28444 === (7))){
var inst_28439 = (state_28443[(2)]);
var state_28443__$1 = state_28443;
var statearr_28445_28469 = state_28443__$1;
(statearr_28445_28469[(2)] = inst_28439);

(statearr_28445_28469[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (1))){
var state_28443__$1 = state_28443;
var statearr_28446_28470 = state_28443__$1;
(statearr_28446_28470[(2)] = null);

(statearr_28446_28470[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (4))){
var inst_28422 = (state_28443[(7)]);
var inst_28422__$1 = (state_28443[(2)]);
var inst_28423 = (inst_28422__$1 == null);
var state_28443__$1 = (function (){var statearr_28447 = state_28443;
(statearr_28447[(7)] = inst_28422__$1);

return statearr_28447;
})();
if(cljs.core.truth_(inst_28423)){
var statearr_28448_28471 = state_28443__$1;
(statearr_28448_28471[(1)] = (5));

} else {
var statearr_28449_28472 = state_28443__$1;
(statearr_28449_28472[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (13))){
var state_28443__$1 = state_28443;
var statearr_28450_28473 = state_28443__$1;
(statearr_28450_28473[(2)] = null);

(statearr_28450_28473[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (6))){
var inst_28422 = (state_28443[(7)]);
var state_28443__$1 = state_28443;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28443__$1,(11),to,inst_28422);
} else {
if((state_val_28444 === (3))){
var inst_28441 = (state_28443[(2)]);
var state_28443__$1 = state_28443;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28443__$1,inst_28441);
} else {
if((state_val_28444 === (12))){
var state_28443__$1 = state_28443;
var statearr_28451_28474 = state_28443__$1;
(statearr_28451_28474[(2)] = null);

(statearr_28451_28474[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (2))){
var state_28443__$1 = state_28443;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28443__$1,(4),from);
} else {
if((state_val_28444 === (11))){
var inst_28432 = (state_28443[(2)]);
var state_28443__$1 = state_28443;
if(cljs.core.truth_(inst_28432)){
var statearr_28452_28475 = state_28443__$1;
(statearr_28452_28475[(1)] = (12));

} else {
var statearr_28453_28476 = state_28443__$1;
(statearr_28453_28476[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (9))){
var state_28443__$1 = state_28443;
var statearr_28454_28477 = state_28443__$1;
(statearr_28454_28477[(2)] = null);

(statearr_28454_28477[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (5))){
var state_28443__$1 = state_28443;
if(cljs.core.truth_(close_QMARK_)){
var statearr_28455_28478 = state_28443__$1;
(statearr_28455_28478[(1)] = (8));

} else {
var statearr_28456_28479 = state_28443__$1;
(statearr_28456_28479[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (14))){
var inst_28437 = (state_28443[(2)]);
var state_28443__$1 = state_28443;
var statearr_28457_28480 = state_28443__$1;
(statearr_28457_28480[(2)] = inst_28437);

(statearr_28457_28480[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (10))){
var inst_28429 = (state_28443[(2)]);
var state_28443__$1 = state_28443;
var statearr_28458_28481 = state_28443__$1;
(statearr_28458_28481[(2)] = inst_28429);

(statearr_28458_28481[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28444 === (8))){
var inst_28426 = cljs.core.async.close_BANG_.call(null,to);
var state_28443__$1 = state_28443;
var statearr_28459_28482 = state_28443__$1;
(statearr_28459_28482[(2)] = inst_28426);

(statearr_28459_28482[(1)] = (10));


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
});})(c__22536__auto___28468))
;
return ((function (switch__22474__auto__,c__22536__auto___28468){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_28463 = [null,null,null,null,null,null,null,null];
(statearr_28463[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_28463[(1)] = (1));

return statearr_28463;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_28443){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28443);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28464){if((e28464 instanceof Object)){
var ex__22478__auto__ = e28464;
var statearr_28465_28483 = state_28443;
(statearr_28465_28483[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28443);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28464;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28484 = state_28443;
state_28443 = G__28484;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_28443){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_28443);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___28468))
})();
var state__22538__auto__ = (function (){var statearr_28466 = f__22537__auto__.call(null);
(statearr_28466[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___28468);

return statearr_28466;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___28468))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__28668){
var vec__28669 = p__28668;
var v = cljs.core.nth.call(null,vec__28669,(0),null);
var p = cljs.core.nth.call(null,vec__28669,(1),null);
var job = vec__28669;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__22536__auto___28851 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___28851,res,vec__28669,v,p,job,jobs,results){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___28851,res,vec__28669,v,p,job,jobs,results){
return (function (state_28674){
var state_val_28675 = (state_28674[(1)]);
if((state_val_28675 === (2))){
var inst_28671 = (state_28674[(2)]);
var inst_28672 = cljs.core.async.close_BANG_.call(null,res);
var state_28674__$1 = (function (){var statearr_28676 = state_28674;
(statearr_28676[(7)] = inst_28671);

return statearr_28676;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28674__$1,inst_28672);
} else {
if((state_val_28675 === (1))){
var state_28674__$1 = state_28674;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28674__$1,(2),res,v);
} else {
return null;
}
}
});})(c__22536__auto___28851,res,vec__28669,v,p,job,jobs,results))
;
return ((function (switch__22474__auto__,c__22536__auto___28851,res,vec__28669,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0 = (function (){
var statearr_28680 = [null,null,null,null,null,null,null,null];
(statearr_28680[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__);

(statearr_28680[(1)] = (1));

return statearr_28680;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1 = (function (state_28674){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28674);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28681){if((e28681 instanceof Object)){
var ex__22478__auto__ = e28681;
var statearr_28682_28852 = state_28674;
(statearr_28682_28852[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28674);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28681;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28853 = state_28674;
state_28674 = G__28853;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = function(state_28674){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1.call(this,state_28674);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___28851,res,vec__28669,v,p,job,jobs,results))
})();
var state__22538__auto__ = (function (){var statearr_28683 = f__22537__auto__.call(null);
(statearr_28683[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___28851);

return statearr_28683;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___28851,res,vec__28669,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__28684){
var vec__28685 = p__28684;
var v = cljs.core.nth.call(null,vec__28685,(0),null);
var p = cljs.core.nth.call(null,vec__28685,(1),null);
var job = vec__28685;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__20910__auto___28854 = n;
var __28855 = (0);
while(true){
if((__28855 < n__20910__auto___28854)){
var G__28686_28856 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__28686_28856) {
case "async":
var c__22536__auto___28858 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__28855,c__22536__auto___28858,G__28686_28856,n__20910__auto___28854,jobs,results,process,async){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (__28855,c__22536__auto___28858,G__28686_28856,n__20910__auto___28854,jobs,results,process,async){
return (function (state_28699){
var state_val_28700 = (state_28699[(1)]);
if((state_val_28700 === (7))){
var inst_28695 = (state_28699[(2)]);
var state_28699__$1 = state_28699;
var statearr_28701_28859 = state_28699__$1;
(statearr_28701_28859[(2)] = inst_28695);

(statearr_28701_28859[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28700 === (6))){
var state_28699__$1 = state_28699;
var statearr_28702_28860 = state_28699__$1;
(statearr_28702_28860[(2)] = null);

(statearr_28702_28860[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28700 === (5))){
var state_28699__$1 = state_28699;
var statearr_28703_28861 = state_28699__$1;
(statearr_28703_28861[(2)] = null);

(statearr_28703_28861[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28700 === (4))){
var inst_28689 = (state_28699[(2)]);
var inst_28690 = async.call(null,inst_28689);
var state_28699__$1 = state_28699;
if(cljs.core.truth_(inst_28690)){
var statearr_28704_28862 = state_28699__$1;
(statearr_28704_28862[(1)] = (5));

} else {
var statearr_28705_28863 = state_28699__$1;
(statearr_28705_28863[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28700 === (3))){
var inst_28697 = (state_28699[(2)]);
var state_28699__$1 = state_28699;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28699__$1,inst_28697);
} else {
if((state_val_28700 === (2))){
var state_28699__$1 = state_28699;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28699__$1,(4),jobs);
} else {
if((state_val_28700 === (1))){
var state_28699__$1 = state_28699;
var statearr_28706_28864 = state_28699__$1;
(statearr_28706_28864[(2)] = null);

(statearr_28706_28864[(1)] = (2));


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
});})(__28855,c__22536__auto___28858,G__28686_28856,n__20910__auto___28854,jobs,results,process,async))
;
return ((function (__28855,switch__22474__auto__,c__22536__auto___28858,G__28686_28856,n__20910__auto___28854,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0 = (function (){
var statearr_28710 = [null,null,null,null,null,null,null];
(statearr_28710[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__);

(statearr_28710[(1)] = (1));

return statearr_28710;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1 = (function (state_28699){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28699);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28711){if((e28711 instanceof Object)){
var ex__22478__auto__ = e28711;
var statearr_28712_28865 = state_28699;
(statearr_28712_28865[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28699);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28711;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28866 = state_28699;
state_28699 = G__28866;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = function(state_28699){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1.call(this,state_28699);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__;
})()
;})(__28855,switch__22474__auto__,c__22536__auto___28858,G__28686_28856,n__20910__auto___28854,jobs,results,process,async))
})();
var state__22538__auto__ = (function (){var statearr_28713 = f__22537__auto__.call(null);
(statearr_28713[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___28858);

return statearr_28713;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(__28855,c__22536__auto___28858,G__28686_28856,n__20910__auto___28854,jobs,results,process,async))
);


break;
case "compute":
var c__22536__auto___28867 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__28855,c__22536__auto___28867,G__28686_28856,n__20910__auto___28854,jobs,results,process,async){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (__28855,c__22536__auto___28867,G__28686_28856,n__20910__auto___28854,jobs,results,process,async){
return (function (state_28726){
var state_val_28727 = (state_28726[(1)]);
if((state_val_28727 === (7))){
var inst_28722 = (state_28726[(2)]);
var state_28726__$1 = state_28726;
var statearr_28728_28868 = state_28726__$1;
(statearr_28728_28868[(2)] = inst_28722);

(statearr_28728_28868[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28727 === (6))){
var state_28726__$1 = state_28726;
var statearr_28729_28869 = state_28726__$1;
(statearr_28729_28869[(2)] = null);

(statearr_28729_28869[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28727 === (5))){
var state_28726__$1 = state_28726;
var statearr_28730_28870 = state_28726__$1;
(statearr_28730_28870[(2)] = null);

(statearr_28730_28870[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28727 === (4))){
var inst_28716 = (state_28726[(2)]);
var inst_28717 = process.call(null,inst_28716);
var state_28726__$1 = state_28726;
if(cljs.core.truth_(inst_28717)){
var statearr_28731_28871 = state_28726__$1;
(statearr_28731_28871[(1)] = (5));

} else {
var statearr_28732_28872 = state_28726__$1;
(statearr_28732_28872[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28727 === (3))){
var inst_28724 = (state_28726[(2)]);
var state_28726__$1 = state_28726;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28726__$1,inst_28724);
} else {
if((state_val_28727 === (2))){
var state_28726__$1 = state_28726;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28726__$1,(4),jobs);
} else {
if((state_val_28727 === (1))){
var state_28726__$1 = state_28726;
var statearr_28733_28873 = state_28726__$1;
(statearr_28733_28873[(2)] = null);

(statearr_28733_28873[(1)] = (2));


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
});})(__28855,c__22536__auto___28867,G__28686_28856,n__20910__auto___28854,jobs,results,process,async))
;
return ((function (__28855,switch__22474__auto__,c__22536__auto___28867,G__28686_28856,n__20910__auto___28854,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0 = (function (){
var statearr_28737 = [null,null,null,null,null,null,null];
(statearr_28737[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__);

(statearr_28737[(1)] = (1));

return statearr_28737;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1 = (function (state_28726){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28726);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28738){if((e28738 instanceof Object)){
var ex__22478__auto__ = e28738;
var statearr_28739_28874 = state_28726;
(statearr_28739_28874[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28726);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28738;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28875 = state_28726;
state_28726 = G__28875;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = function(state_28726){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1.call(this,state_28726);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__;
})()
;})(__28855,switch__22474__auto__,c__22536__auto___28867,G__28686_28856,n__20910__auto___28854,jobs,results,process,async))
})();
var state__22538__auto__ = (function (){var statearr_28740 = f__22537__auto__.call(null);
(statearr_28740[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___28867);

return statearr_28740;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(__28855,c__22536__auto___28867,G__28686_28856,n__20910__auto___28854,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__28876 = (__28855 + (1));
__28855 = G__28876;
continue;
} else {
}
break;
}

var c__22536__auto___28877 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___28877,jobs,results,process,async){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___28877,jobs,results,process,async){
return (function (state_28762){
var state_val_28763 = (state_28762[(1)]);
if((state_val_28763 === (9))){
var inst_28755 = (state_28762[(2)]);
var state_28762__$1 = (function (){var statearr_28764 = state_28762;
(statearr_28764[(7)] = inst_28755);

return statearr_28764;
})();
var statearr_28765_28878 = state_28762__$1;
(statearr_28765_28878[(2)] = null);

(statearr_28765_28878[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28763 === (8))){
var inst_28748 = (state_28762[(8)]);
var inst_28753 = (state_28762[(2)]);
var state_28762__$1 = (function (){var statearr_28766 = state_28762;
(statearr_28766[(9)] = inst_28753);

return statearr_28766;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28762__$1,(9),results,inst_28748);
} else {
if((state_val_28763 === (7))){
var inst_28758 = (state_28762[(2)]);
var state_28762__$1 = state_28762;
var statearr_28767_28879 = state_28762__$1;
(statearr_28767_28879[(2)] = inst_28758);

(statearr_28767_28879[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28763 === (6))){
var inst_28748 = (state_28762[(8)]);
var inst_28743 = (state_28762[(10)]);
var inst_28748__$1 = cljs.core.async.chan.call(null,(1));
var inst_28749 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_28750 = [inst_28743,inst_28748__$1];
var inst_28751 = (new cljs.core.PersistentVector(null,2,(5),inst_28749,inst_28750,null));
var state_28762__$1 = (function (){var statearr_28768 = state_28762;
(statearr_28768[(8)] = inst_28748__$1);

return statearr_28768;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28762__$1,(8),jobs,inst_28751);
} else {
if((state_val_28763 === (5))){
var inst_28746 = cljs.core.async.close_BANG_.call(null,jobs);
var state_28762__$1 = state_28762;
var statearr_28769_28880 = state_28762__$1;
(statearr_28769_28880[(2)] = inst_28746);

(statearr_28769_28880[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28763 === (4))){
var inst_28743 = (state_28762[(10)]);
var inst_28743__$1 = (state_28762[(2)]);
var inst_28744 = (inst_28743__$1 == null);
var state_28762__$1 = (function (){var statearr_28770 = state_28762;
(statearr_28770[(10)] = inst_28743__$1);

return statearr_28770;
})();
if(cljs.core.truth_(inst_28744)){
var statearr_28771_28881 = state_28762__$1;
(statearr_28771_28881[(1)] = (5));

} else {
var statearr_28772_28882 = state_28762__$1;
(statearr_28772_28882[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28763 === (3))){
var inst_28760 = (state_28762[(2)]);
var state_28762__$1 = state_28762;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28762__$1,inst_28760);
} else {
if((state_val_28763 === (2))){
var state_28762__$1 = state_28762;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28762__$1,(4),from);
} else {
if((state_val_28763 === (1))){
var state_28762__$1 = state_28762;
var statearr_28773_28883 = state_28762__$1;
(statearr_28773_28883[(2)] = null);

(statearr_28773_28883[(1)] = (2));


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
});})(c__22536__auto___28877,jobs,results,process,async))
;
return ((function (switch__22474__auto__,c__22536__auto___28877,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0 = (function (){
var statearr_28777 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28777[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__);

(statearr_28777[(1)] = (1));

return statearr_28777;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1 = (function (state_28762){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28762);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28778){if((e28778 instanceof Object)){
var ex__22478__auto__ = e28778;
var statearr_28779_28884 = state_28762;
(statearr_28779_28884[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28762);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28778;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28885 = state_28762;
state_28762 = G__28885;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = function(state_28762){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1.call(this,state_28762);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___28877,jobs,results,process,async))
})();
var state__22538__auto__ = (function (){var statearr_28780 = f__22537__auto__.call(null);
(statearr_28780[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___28877);

return statearr_28780;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___28877,jobs,results,process,async))
);


var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__,jobs,results,process,async){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__,jobs,results,process,async){
return (function (state_28818){
var state_val_28819 = (state_28818[(1)]);
if((state_val_28819 === (7))){
var inst_28814 = (state_28818[(2)]);
var state_28818__$1 = state_28818;
var statearr_28820_28886 = state_28818__$1;
(statearr_28820_28886[(2)] = inst_28814);

(statearr_28820_28886[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (20))){
var state_28818__$1 = state_28818;
var statearr_28821_28887 = state_28818__$1;
(statearr_28821_28887[(2)] = null);

(statearr_28821_28887[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (1))){
var state_28818__$1 = state_28818;
var statearr_28822_28888 = state_28818__$1;
(statearr_28822_28888[(2)] = null);

(statearr_28822_28888[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (4))){
var inst_28783 = (state_28818[(7)]);
var inst_28783__$1 = (state_28818[(2)]);
var inst_28784 = (inst_28783__$1 == null);
var state_28818__$1 = (function (){var statearr_28823 = state_28818;
(statearr_28823[(7)] = inst_28783__$1);

return statearr_28823;
})();
if(cljs.core.truth_(inst_28784)){
var statearr_28824_28889 = state_28818__$1;
(statearr_28824_28889[(1)] = (5));

} else {
var statearr_28825_28890 = state_28818__$1;
(statearr_28825_28890[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (15))){
var inst_28796 = (state_28818[(8)]);
var state_28818__$1 = state_28818;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28818__$1,(18),to,inst_28796);
} else {
if((state_val_28819 === (21))){
var inst_28809 = (state_28818[(2)]);
var state_28818__$1 = state_28818;
var statearr_28826_28891 = state_28818__$1;
(statearr_28826_28891[(2)] = inst_28809);

(statearr_28826_28891[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (13))){
var inst_28811 = (state_28818[(2)]);
var state_28818__$1 = (function (){var statearr_28827 = state_28818;
(statearr_28827[(9)] = inst_28811);

return statearr_28827;
})();
var statearr_28828_28892 = state_28818__$1;
(statearr_28828_28892[(2)] = null);

(statearr_28828_28892[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (6))){
var inst_28783 = (state_28818[(7)]);
var state_28818__$1 = state_28818;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28818__$1,(11),inst_28783);
} else {
if((state_val_28819 === (17))){
var inst_28804 = (state_28818[(2)]);
var state_28818__$1 = state_28818;
if(cljs.core.truth_(inst_28804)){
var statearr_28829_28893 = state_28818__$1;
(statearr_28829_28893[(1)] = (19));

} else {
var statearr_28830_28894 = state_28818__$1;
(statearr_28830_28894[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (3))){
var inst_28816 = (state_28818[(2)]);
var state_28818__$1 = state_28818;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28818__$1,inst_28816);
} else {
if((state_val_28819 === (12))){
var inst_28793 = (state_28818[(10)]);
var state_28818__$1 = state_28818;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28818__$1,(14),inst_28793);
} else {
if((state_val_28819 === (2))){
var state_28818__$1 = state_28818;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28818__$1,(4),results);
} else {
if((state_val_28819 === (19))){
var state_28818__$1 = state_28818;
var statearr_28831_28895 = state_28818__$1;
(statearr_28831_28895[(2)] = null);

(statearr_28831_28895[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (11))){
var inst_28793 = (state_28818[(2)]);
var state_28818__$1 = (function (){var statearr_28832 = state_28818;
(statearr_28832[(10)] = inst_28793);

return statearr_28832;
})();
var statearr_28833_28896 = state_28818__$1;
(statearr_28833_28896[(2)] = null);

(statearr_28833_28896[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (9))){
var state_28818__$1 = state_28818;
var statearr_28834_28897 = state_28818__$1;
(statearr_28834_28897[(2)] = null);

(statearr_28834_28897[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (5))){
var state_28818__$1 = state_28818;
if(cljs.core.truth_(close_QMARK_)){
var statearr_28835_28898 = state_28818__$1;
(statearr_28835_28898[(1)] = (8));

} else {
var statearr_28836_28899 = state_28818__$1;
(statearr_28836_28899[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (14))){
var inst_28796 = (state_28818[(8)]);
var inst_28798 = (state_28818[(11)]);
var inst_28796__$1 = (state_28818[(2)]);
var inst_28797 = (inst_28796__$1 == null);
var inst_28798__$1 = cljs.core.not.call(null,inst_28797);
var state_28818__$1 = (function (){var statearr_28837 = state_28818;
(statearr_28837[(8)] = inst_28796__$1);

(statearr_28837[(11)] = inst_28798__$1);

return statearr_28837;
})();
if(inst_28798__$1){
var statearr_28838_28900 = state_28818__$1;
(statearr_28838_28900[(1)] = (15));

} else {
var statearr_28839_28901 = state_28818__$1;
(statearr_28839_28901[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (16))){
var inst_28798 = (state_28818[(11)]);
var state_28818__$1 = state_28818;
var statearr_28840_28902 = state_28818__$1;
(statearr_28840_28902[(2)] = inst_28798);

(statearr_28840_28902[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (10))){
var inst_28790 = (state_28818[(2)]);
var state_28818__$1 = state_28818;
var statearr_28841_28903 = state_28818__$1;
(statearr_28841_28903[(2)] = inst_28790);

(statearr_28841_28903[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (18))){
var inst_28801 = (state_28818[(2)]);
var state_28818__$1 = state_28818;
var statearr_28842_28904 = state_28818__$1;
(statearr_28842_28904[(2)] = inst_28801);

(statearr_28842_28904[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28819 === (8))){
var inst_28787 = cljs.core.async.close_BANG_.call(null,to);
var state_28818__$1 = state_28818;
var statearr_28843_28905 = state_28818__$1;
(statearr_28843_28905[(2)] = inst_28787);

(statearr_28843_28905[(1)] = (10));


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
});})(c__22536__auto__,jobs,results,process,async))
;
return ((function (switch__22474__auto__,c__22536__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0 = (function (){
var statearr_28847 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28847[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__);

(statearr_28847[(1)] = (1));

return statearr_28847;
});
var cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1 = (function (state_28818){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28818);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28848){if((e28848 instanceof Object)){
var ex__22478__auto__ = e28848;
var statearr_28849_28906 = state_28818;
(statearr_28849_28906[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28818);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28848;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28907 = state_28818;
state_28818 = G__28907;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__ = function(state_28818){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1.call(this,state_28818);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__22475__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__,jobs,results,process,async))
})();
var state__22538__auto__ = (function (){var statearr_28850 = f__22537__auto__.call(null);
(statearr_28850[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_28850;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__,jobs,results,process,async))
);

return c__22536__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel, subject to the async function af, with parallelism n. af
 * must be a function of two arguments, the first an input value and
 * the second a channel on which to place the result(s). af must close!
 * the channel before returning.  The presumption is that af will
 * return immediately, having launched some asynchronous operation
 * whose completion/callback will manipulate the result channel. Outputs
 * will be returned in order relative to  the inputs. By default, the to
 * channel will be closed when the from channel closes, but can be
 * determined by the close?  parameter. Will stop consuming the from
 * channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(){
var G__28909 = arguments.length;
switch (G__28909) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 * channel, subject to the transducer xf, with parallelism n. Because
 * it is parallel, the transducer will be applied independently to each
 * element, not across elements, and may produce zero or more outputs
 * per input.  Outputs will be returned in order relative to the
 * inputs. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes.
 * 
 * Note this is supplied for API compatibility with the Clojure version.
 * Values of N > 1 will not result in actual concurrency in a
 * single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(){
var G__28912 = arguments.length;
switch (G__28912) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 * channels, the first of which will contain the values for which the
 * predicate returned true, the second those for which it returned
 * false.
 * 
 * The out channels will be unbuffered by default, or two buf-or-ns can
 * be supplied. The channels will close after the source channel has
 * closed.
 */
cljs.core.async.split = (function cljs$core$async$split(){
var G__28915 = arguments.length;
switch (G__28915) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__22536__auto___28967 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___28967,tc,fc){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___28967,tc,fc){
return (function (state_28941){
var state_val_28942 = (state_28941[(1)]);
if((state_val_28942 === (7))){
var inst_28937 = (state_28941[(2)]);
var state_28941__$1 = state_28941;
var statearr_28943_28968 = state_28941__$1;
(statearr_28943_28968[(2)] = inst_28937);

(statearr_28943_28968[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (1))){
var state_28941__$1 = state_28941;
var statearr_28944_28969 = state_28941__$1;
(statearr_28944_28969[(2)] = null);

(statearr_28944_28969[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (4))){
var inst_28918 = (state_28941[(7)]);
var inst_28918__$1 = (state_28941[(2)]);
var inst_28919 = (inst_28918__$1 == null);
var state_28941__$1 = (function (){var statearr_28945 = state_28941;
(statearr_28945[(7)] = inst_28918__$1);

return statearr_28945;
})();
if(cljs.core.truth_(inst_28919)){
var statearr_28946_28970 = state_28941__$1;
(statearr_28946_28970[(1)] = (5));

} else {
var statearr_28947_28971 = state_28941__$1;
(statearr_28947_28971[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (13))){
var state_28941__$1 = state_28941;
var statearr_28948_28972 = state_28941__$1;
(statearr_28948_28972[(2)] = null);

(statearr_28948_28972[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (6))){
var inst_28918 = (state_28941[(7)]);
var inst_28924 = p.call(null,inst_28918);
var state_28941__$1 = state_28941;
if(cljs.core.truth_(inst_28924)){
var statearr_28949_28973 = state_28941__$1;
(statearr_28949_28973[(1)] = (9));

} else {
var statearr_28950_28974 = state_28941__$1;
(statearr_28950_28974[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (3))){
var inst_28939 = (state_28941[(2)]);
var state_28941__$1 = state_28941;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28941__$1,inst_28939);
} else {
if((state_val_28942 === (12))){
var state_28941__$1 = state_28941;
var statearr_28951_28975 = state_28941__$1;
(statearr_28951_28975[(2)] = null);

(statearr_28951_28975[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (2))){
var state_28941__$1 = state_28941;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28941__$1,(4),ch);
} else {
if((state_val_28942 === (11))){
var inst_28918 = (state_28941[(7)]);
var inst_28928 = (state_28941[(2)]);
var state_28941__$1 = state_28941;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28941__$1,(8),inst_28928,inst_28918);
} else {
if((state_val_28942 === (9))){
var state_28941__$1 = state_28941;
var statearr_28952_28976 = state_28941__$1;
(statearr_28952_28976[(2)] = tc);

(statearr_28952_28976[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (5))){
var inst_28921 = cljs.core.async.close_BANG_.call(null,tc);
var inst_28922 = cljs.core.async.close_BANG_.call(null,fc);
var state_28941__$1 = (function (){var statearr_28953 = state_28941;
(statearr_28953[(8)] = inst_28921);

return statearr_28953;
})();
var statearr_28954_28977 = state_28941__$1;
(statearr_28954_28977[(2)] = inst_28922);

(statearr_28954_28977[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (14))){
var inst_28935 = (state_28941[(2)]);
var state_28941__$1 = state_28941;
var statearr_28955_28978 = state_28941__$1;
(statearr_28955_28978[(2)] = inst_28935);

(statearr_28955_28978[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (10))){
var state_28941__$1 = state_28941;
var statearr_28956_28979 = state_28941__$1;
(statearr_28956_28979[(2)] = fc);

(statearr_28956_28979[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28942 === (8))){
var inst_28930 = (state_28941[(2)]);
var state_28941__$1 = state_28941;
if(cljs.core.truth_(inst_28930)){
var statearr_28957_28980 = state_28941__$1;
(statearr_28957_28980[(1)] = (12));

} else {
var statearr_28958_28981 = state_28941__$1;
(statearr_28958_28981[(1)] = (13));

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
});})(c__22536__auto___28967,tc,fc))
;
return ((function (switch__22474__auto__,c__22536__auto___28967,tc,fc){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_28962 = [null,null,null,null,null,null,null,null,null];
(statearr_28962[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_28962[(1)] = (1));

return statearr_28962;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_28941){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_28941);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e28963){if((e28963 instanceof Object)){
var ex__22478__auto__ = e28963;
var statearr_28964_28982 = state_28941;
(statearr_28964_28982[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28941);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28963;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28983 = state_28941;
state_28941 = G__28983;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_28941){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_28941);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___28967,tc,fc))
})();
var state__22538__auto__ = (function (){var statearr_28965 = f__22537__auto__.call(null);
(statearr_28965[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___28967);

return statearr_28965;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___28967,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 * the single result of applying f to init and the first item from the
 * channel, then applying f to that result and the 2nd item, etc. If
 * the channel closes without yielding items, returns init and f is not
 * called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__){
return (function (state_29030){
var state_val_29031 = (state_29030[(1)]);
if((state_val_29031 === (7))){
var inst_29026 = (state_29030[(2)]);
var state_29030__$1 = state_29030;
var statearr_29032_29048 = state_29030__$1;
(statearr_29032_29048[(2)] = inst_29026);

(statearr_29032_29048[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29031 === (6))){
var inst_29019 = (state_29030[(7)]);
var inst_29016 = (state_29030[(8)]);
var inst_29023 = f.call(null,inst_29016,inst_29019);
var inst_29016__$1 = inst_29023;
var state_29030__$1 = (function (){var statearr_29033 = state_29030;
(statearr_29033[(8)] = inst_29016__$1);

return statearr_29033;
})();
var statearr_29034_29049 = state_29030__$1;
(statearr_29034_29049[(2)] = null);

(statearr_29034_29049[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29031 === (5))){
var inst_29016 = (state_29030[(8)]);
var state_29030__$1 = state_29030;
var statearr_29035_29050 = state_29030__$1;
(statearr_29035_29050[(2)] = inst_29016);

(statearr_29035_29050[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29031 === (4))){
var inst_29019 = (state_29030[(7)]);
var inst_29019__$1 = (state_29030[(2)]);
var inst_29020 = (inst_29019__$1 == null);
var state_29030__$1 = (function (){var statearr_29036 = state_29030;
(statearr_29036[(7)] = inst_29019__$1);

return statearr_29036;
})();
if(cljs.core.truth_(inst_29020)){
var statearr_29037_29051 = state_29030__$1;
(statearr_29037_29051[(1)] = (5));

} else {
var statearr_29038_29052 = state_29030__$1;
(statearr_29038_29052[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29031 === (3))){
var inst_29028 = (state_29030[(2)]);
var state_29030__$1 = state_29030;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29030__$1,inst_29028);
} else {
if((state_val_29031 === (2))){
var state_29030__$1 = state_29030;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29030__$1,(4),ch);
} else {
if((state_val_29031 === (1))){
var inst_29016 = init;
var state_29030__$1 = (function (){var statearr_29039 = state_29030;
(statearr_29039[(8)] = inst_29016);

return statearr_29039;
})();
var statearr_29040_29053 = state_29030__$1;
(statearr_29040_29053[(2)] = null);

(statearr_29040_29053[(1)] = (2));


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
});})(c__22536__auto__))
;
return ((function (switch__22474__auto__,c__22536__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__22475__auto__ = null;
var cljs$core$async$reduce_$_state_machine__22475__auto____0 = (function (){
var statearr_29044 = [null,null,null,null,null,null,null,null,null];
(statearr_29044[(0)] = cljs$core$async$reduce_$_state_machine__22475__auto__);

(statearr_29044[(1)] = (1));

return statearr_29044;
});
var cljs$core$async$reduce_$_state_machine__22475__auto____1 = (function (state_29030){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_29030);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e29045){if((e29045 instanceof Object)){
var ex__22478__auto__ = e29045;
var statearr_29046_29054 = state_29030;
(statearr_29046_29054[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29030);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29045;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29055 = state_29030;
state_29030 = G__29055;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__22475__auto__ = function(state_29030){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__22475__auto____1.call(this,state_29030);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__22475__auto____0;
cljs$core$async$reduce_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__22475__auto____1;
return cljs$core$async$reduce_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__))
})();
var state__22538__auto__ = (function (){var statearr_29047 = f__22537__auto__.call(null);
(statearr_29047[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_29047;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__))
);

return c__22536__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 * By default the channel will be closed after the items are copied,
 * but can be determined by the close? parameter.
 * 
 * Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(){
var G__29057 = arguments.length;
switch (G__29057) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__){
return (function (state_29082){
var state_val_29083 = (state_29082[(1)]);
if((state_val_29083 === (7))){
var inst_29064 = (state_29082[(2)]);
var state_29082__$1 = state_29082;
var statearr_29084_29108 = state_29082__$1;
(statearr_29084_29108[(2)] = inst_29064);

(statearr_29084_29108[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (1))){
var inst_29058 = cljs.core.seq.call(null,coll);
var inst_29059 = inst_29058;
var state_29082__$1 = (function (){var statearr_29085 = state_29082;
(statearr_29085[(7)] = inst_29059);

return statearr_29085;
})();
var statearr_29086_29109 = state_29082__$1;
(statearr_29086_29109[(2)] = null);

(statearr_29086_29109[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (4))){
var inst_29059 = (state_29082[(7)]);
var inst_29062 = cljs.core.first.call(null,inst_29059);
var state_29082__$1 = state_29082;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_29082__$1,(7),ch,inst_29062);
} else {
if((state_val_29083 === (13))){
var inst_29076 = (state_29082[(2)]);
var state_29082__$1 = state_29082;
var statearr_29087_29110 = state_29082__$1;
(statearr_29087_29110[(2)] = inst_29076);

(statearr_29087_29110[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (6))){
var inst_29067 = (state_29082[(2)]);
var state_29082__$1 = state_29082;
if(cljs.core.truth_(inst_29067)){
var statearr_29088_29111 = state_29082__$1;
(statearr_29088_29111[(1)] = (8));

} else {
var statearr_29089_29112 = state_29082__$1;
(statearr_29089_29112[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (3))){
var inst_29080 = (state_29082[(2)]);
var state_29082__$1 = state_29082;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29082__$1,inst_29080);
} else {
if((state_val_29083 === (12))){
var state_29082__$1 = state_29082;
var statearr_29090_29113 = state_29082__$1;
(statearr_29090_29113[(2)] = null);

(statearr_29090_29113[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (2))){
var inst_29059 = (state_29082[(7)]);
var state_29082__$1 = state_29082;
if(cljs.core.truth_(inst_29059)){
var statearr_29091_29114 = state_29082__$1;
(statearr_29091_29114[(1)] = (4));

} else {
var statearr_29092_29115 = state_29082__$1;
(statearr_29092_29115[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (11))){
var inst_29073 = cljs.core.async.close_BANG_.call(null,ch);
var state_29082__$1 = state_29082;
var statearr_29093_29116 = state_29082__$1;
(statearr_29093_29116[(2)] = inst_29073);

(statearr_29093_29116[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (9))){
var state_29082__$1 = state_29082;
if(cljs.core.truth_(close_QMARK_)){
var statearr_29094_29117 = state_29082__$1;
(statearr_29094_29117[(1)] = (11));

} else {
var statearr_29095_29118 = state_29082__$1;
(statearr_29095_29118[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (5))){
var inst_29059 = (state_29082[(7)]);
var state_29082__$1 = state_29082;
var statearr_29096_29119 = state_29082__$1;
(statearr_29096_29119[(2)] = inst_29059);

(statearr_29096_29119[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (10))){
var inst_29078 = (state_29082[(2)]);
var state_29082__$1 = state_29082;
var statearr_29097_29120 = state_29082__$1;
(statearr_29097_29120[(2)] = inst_29078);

(statearr_29097_29120[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29083 === (8))){
var inst_29059 = (state_29082[(7)]);
var inst_29069 = cljs.core.next.call(null,inst_29059);
var inst_29059__$1 = inst_29069;
var state_29082__$1 = (function (){var statearr_29098 = state_29082;
(statearr_29098[(7)] = inst_29059__$1);

return statearr_29098;
})();
var statearr_29099_29121 = state_29082__$1;
(statearr_29099_29121[(2)] = null);

(statearr_29099_29121[(1)] = (2));


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
});})(c__22536__auto__))
;
return ((function (switch__22474__auto__,c__22536__auto__){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_29103 = [null,null,null,null,null,null,null,null];
(statearr_29103[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_29103[(1)] = (1));

return statearr_29103;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_29082){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_29082);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e29104){if((e29104 instanceof Object)){
var ex__22478__auto__ = e29104;
var statearr_29105_29122 = state_29082;
(statearr_29105_29122[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29082);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29104;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29123 = state_29082;
state_29082 = G__29123;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_29082){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_29082);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__))
})();
var state__22538__auto__ = (function (){var statearr_29106 = f__22537__auto__.call(null);
(statearr_29106[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_29106;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__))
);

return c__22536__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 * closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

cljs.core.async.Mux = (function (){var obj29125 = {};
return obj29125;
})();

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((function (){var and__20013__auto__ = _;
if(and__20013__auto__){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else {
return and__20013__auto__;
}
})()){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__20661__auto__ = (((_ == null))?null:_);
return (function (){var or__20025__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});


cljs.core.async.Mult = (function (){var obj29127 = {};
return obj29127;
})();

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 * containing copies of the channel can be created with 'tap', and
 * detached with 'untap'.
 * 
 * Each item is distributed to all taps in parallel and synchronously,
 * i.e. each tap must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow taps from holding up the mult.
 * 
 * Items received when there are no taps get dropped.
 * 
 * If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t29349 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t29349 = (function (cs,ch,mult,meta29350){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta29350 = meta29350;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t29349.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t29349.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t29349.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t29349.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t29349.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t29349.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t29349.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_29351){
var self__ = this;
var _29351__$1 = this;
return self__.meta29350;
});})(cs))
;

cljs.core.async.t29349.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_29351,meta29350__$1){
var self__ = this;
var _29351__$1 = this;
return (new cljs.core.async.t29349(self__.cs,self__.ch,self__.mult,meta29350__$1));
});})(cs))
;

cljs.core.async.t29349.cljs$lang$type = true;

cljs.core.async.t29349.cljs$lang$ctorStr = "cljs.core.async/t29349";

cljs.core.async.t29349.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t29349");
});})(cs))
;

cljs.core.async.__GT_t29349 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t29349(cs__$1,ch__$1,mult__$1,meta29350){
return (new cljs.core.async.t29349(cs__$1,ch__$1,mult__$1,meta29350));
});})(cs))
;

}

return (new cljs.core.async.t29349(cs,ch,cljs$core$async$mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__22536__auto___29570 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___29570,cs,m,dchan,dctr,done){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___29570,cs,m,dchan,dctr,done){
return (function (state_29482){
var state_val_29483 = (state_29482[(1)]);
if((state_val_29483 === (7))){
var inst_29478 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29484_29571 = state_29482__$1;
(statearr_29484_29571[(2)] = inst_29478);

(statearr_29484_29571[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (20))){
var inst_29383 = (state_29482[(7)]);
var inst_29393 = cljs.core.first.call(null,inst_29383);
var inst_29394 = cljs.core.nth.call(null,inst_29393,(0),null);
var inst_29395 = cljs.core.nth.call(null,inst_29393,(1),null);
var state_29482__$1 = (function (){var statearr_29485 = state_29482;
(statearr_29485[(8)] = inst_29394);

return statearr_29485;
})();
if(cljs.core.truth_(inst_29395)){
var statearr_29486_29572 = state_29482__$1;
(statearr_29486_29572[(1)] = (22));

} else {
var statearr_29487_29573 = state_29482__$1;
(statearr_29487_29573[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (27))){
var inst_29354 = (state_29482[(9)]);
var inst_29430 = (state_29482[(10)]);
var inst_29425 = (state_29482[(11)]);
var inst_29423 = (state_29482[(12)]);
var inst_29430__$1 = cljs.core._nth.call(null,inst_29423,inst_29425);
var inst_29431 = cljs.core.async.put_BANG_.call(null,inst_29430__$1,inst_29354,done);
var state_29482__$1 = (function (){var statearr_29488 = state_29482;
(statearr_29488[(10)] = inst_29430__$1);

return statearr_29488;
})();
if(cljs.core.truth_(inst_29431)){
var statearr_29489_29574 = state_29482__$1;
(statearr_29489_29574[(1)] = (30));

} else {
var statearr_29490_29575 = state_29482__$1;
(statearr_29490_29575[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (1))){
var state_29482__$1 = state_29482;
var statearr_29491_29576 = state_29482__$1;
(statearr_29491_29576[(2)] = null);

(statearr_29491_29576[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (24))){
var inst_29383 = (state_29482[(7)]);
var inst_29400 = (state_29482[(2)]);
var inst_29401 = cljs.core.next.call(null,inst_29383);
var inst_29363 = inst_29401;
var inst_29364 = null;
var inst_29365 = (0);
var inst_29366 = (0);
var state_29482__$1 = (function (){var statearr_29492 = state_29482;
(statearr_29492[(13)] = inst_29400);

(statearr_29492[(14)] = inst_29366);

(statearr_29492[(15)] = inst_29364);

(statearr_29492[(16)] = inst_29365);

(statearr_29492[(17)] = inst_29363);

return statearr_29492;
})();
var statearr_29493_29577 = state_29482__$1;
(statearr_29493_29577[(2)] = null);

(statearr_29493_29577[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (39))){
var state_29482__$1 = state_29482;
var statearr_29497_29578 = state_29482__$1;
(statearr_29497_29578[(2)] = null);

(statearr_29497_29578[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (4))){
var inst_29354 = (state_29482[(9)]);
var inst_29354__$1 = (state_29482[(2)]);
var inst_29355 = (inst_29354__$1 == null);
var state_29482__$1 = (function (){var statearr_29498 = state_29482;
(statearr_29498[(9)] = inst_29354__$1);

return statearr_29498;
})();
if(cljs.core.truth_(inst_29355)){
var statearr_29499_29579 = state_29482__$1;
(statearr_29499_29579[(1)] = (5));

} else {
var statearr_29500_29580 = state_29482__$1;
(statearr_29500_29580[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (15))){
var inst_29366 = (state_29482[(14)]);
var inst_29364 = (state_29482[(15)]);
var inst_29365 = (state_29482[(16)]);
var inst_29363 = (state_29482[(17)]);
var inst_29379 = (state_29482[(2)]);
var inst_29380 = (inst_29366 + (1));
var tmp29494 = inst_29364;
var tmp29495 = inst_29365;
var tmp29496 = inst_29363;
var inst_29363__$1 = tmp29496;
var inst_29364__$1 = tmp29494;
var inst_29365__$1 = tmp29495;
var inst_29366__$1 = inst_29380;
var state_29482__$1 = (function (){var statearr_29501 = state_29482;
(statearr_29501[(18)] = inst_29379);

(statearr_29501[(14)] = inst_29366__$1);

(statearr_29501[(15)] = inst_29364__$1);

(statearr_29501[(16)] = inst_29365__$1);

(statearr_29501[(17)] = inst_29363__$1);

return statearr_29501;
})();
var statearr_29502_29581 = state_29482__$1;
(statearr_29502_29581[(2)] = null);

(statearr_29502_29581[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (21))){
var inst_29404 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29506_29582 = state_29482__$1;
(statearr_29506_29582[(2)] = inst_29404);

(statearr_29506_29582[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (31))){
var inst_29430 = (state_29482[(10)]);
var inst_29434 = done.call(null,null);
var inst_29435 = cljs.core.async.untap_STAR_.call(null,m,inst_29430);
var state_29482__$1 = (function (){var statearr_29507 = state_29482;
(statearr_29507[(19)] = inst_29434);

return statearr_29507;
})();
var statearr_29508_29583 = state_29482__$1;
(statearr_29508_29583[(2)] = inst_29435);

(statearr_29508_29583[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (32))){
var inst_29424 = (state_29482[(20)]);
var inst_29425 = (state_29482[(11)]);
var inst_29422 = (state_29482[(21)]);
var inst_29423 = (state_29482[(12)]);
var inst_29437 = (state_29482[(2)]);
var inst_29438 = (inst_29425 + (1));
var tmp29503 = inst_29424;
var tmp29504 = inst_29422;
var tmp29505 = inst_29423;
var inst_29422__$1 = tmp29504;
var inst_29423__$1 = tmp29505;
var inst_29424__$1 = tmp29503;
var inst_29425__$1 = inst_29438;
var state_29482__$1 = (function (){var statearr_29509 = state_29482;
(statearr_29509[(20)] = inst_29424__$1);

(statearr_29509[(11)] = inst_29425__$1);

(statearr_29509[(21)] = inst_29422__$1);

(statearr_29509[(12)] = inst_29423__$1);

(statearr_29509[(22)] = inst_29437);

return statearr_29509;
})();
var statearr_29510_29584 = state_29482__$1;
(statearr_29510_29584[(2)] = null);

(statearr_29510_29584[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (40))){
var inst_29450 = (state_29482[(23)]);
var inst_29454 = done.call(null,null);
var inst_29455 = cljs.core.async.untap_STAR_.call(null,m,inst_29450);
var state_29482__$1 = (function (){var statearr_29511 = state_29482;
(statearr_29511[(24)] = inst_29454);

return statearr_29511;
})();
var statearr_29512_29585 = state_29482__$1;
(statearr_29512_29585[(2)] = inst_29455);

(statearr_29512_29585[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (33))){
var inst_29441 = (state_29482[(25)]);
var inst_29443 = cljs.core.chunked_seq_QMARK_.call(null,inst_29441);
var state_29482__$1 = state_29482;
if(inst_29443){
var statearr_29513_29586 = state_29482__$1;
(statearr_29513_29586[(1)] = (36));

} else {
var statearr_29514_29587 = state_29482__$1;
(statearr_29514_29587[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (13))){
var inst_29373 = (state_29482[(26)]);
var inst_29376 = cljs.core.async.close_BANG_.call(null,inst_29373);
var state_29482__$1 = state_29482;
var statearr_29515_29588 = state_29482__$1;
(statearr_29515_29588[(2)] = inst_29376);

(statearr_29515_29588[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (22))){
var inst_29394 = (state_29482[(8)]);
var inst_29397 = cljs.core.async.close_BANG_.call(null,inst_29394);
var state_29482__$1 = state_29482;
var statearr_29516_29589 = state_29482__$1;
(statearr_29516_29589[(2)] = inst_29397);

(statearr_29516_29589[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (36))){
var inst_29441 = (state_29482[(25)]);
var inst_29445 = cljs.core.chunk_first.call(null,inst_29441);
var inst_29446 = cljs.core.chunk_rest.call(null,inst_29441);
var inst_29447 = cljs.core.count.call(null,inst_29445);
var inst_29422 = inst_29446;
var inst_29423 = inst_29445;
var inst_29424 = inst_29447;
var inst_29425 = (0);
var state_29482__$1 = (function (){var statearr_29517 = state_29482;
(statearr_29517[(20)] = inst_29424);

(statearr_29517[(11)] = inst_29425);

(statearr_29517[(21)] = inst_29422);

(statearr_29517[(12)] = inst_29423);

return statearr_29517;
})();
var statearr_29518_29590 = state_29482__$1;
(statearr_29518_29590[(2)] = null);

(statearr_29518_29590[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (41))){
var inst_29441 = (state_29482[(25)]);
var inst_29457 = (state_29482[(2)]);
var inst_29458 = cljs.core.next.call(null,inst_29441);
var inst_29422 = inst_29458;
var inst_29423 = null;
var inst_29424 = (0);
var inst_29425 = (0);
var state_29482__$1 = (function (){var statearr_29519 = state_29482;
(statearr_29519[(20)] = inst_29424);

(statearr_29519[(11)] = inst_29425);

(statearr_29519[(27)] = inst_29457);

(statearr_29519[(21)] = inst_29422);

(statearr_29519[(12)] = inst_29423);

return statearr_29519;
})();
var statearr_29520_29591 = state_29482__$1;
(statearr_29520_29591[(2)] = null);

(statearr_29520_29591[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (43))){
var state_29482__$1 = state_29482;
var statearr_29521_29592 = state_29482__$1;
(statearr_29521_29592[(2)] = null);

(statearr_29521_29592[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (29))){
var inst_29466 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29522_29593 = state_29482__$1;
(statearr_29522_29593[(2)] = inst_29466);

(statearr_29522_29593[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (44))){
var inst_29475 = (state_29482[(2)]);
var state_29482__$1 = (function (){var statearr_29523 = state_29482;
(statearr_29523[(28)] = inst_29475);

return statearr_29523;
})();
var statearr_29524_29594 = state_29482__$1;
(statearr_29524_29594[(2)] = null);

(statearr_29524_29594[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (6))){
var inst_29414 = (state_29482[(29)]);
var inst_29413 = cljs.core.deref.call(null,cs);
var inst_29414__$1 = cljs.core.keys.call(null,inst_29413);
var inst_29415 = cljs.core.count.call(null,inst_29414__$1);
var inst_29416 = cljs.core.reset_BANG_.call(null,dctr,inst_29415);
var inst_29421 = cljs.core.seq.call(null,inst_29414__$1);
var inst_29422 = inst_29421;
var inst_29423 = null;
var inst_29424 = (0);
var inst_29425 = (0);
var state_29482__$1 = (function (){var statearr_29525 = state_29482;
(statearr_29525[(20)] = inst_29424);

(statearr_29525[(29)] = inst_29414__$1);

(statearr_29525[(30)] = inst_29416);

(statearr_29525[(11)] = inst_29425);

(statearr_29525[(21)] = inst_29422);

(statearr_29525[(12)] = inst_29423);

return statearr_29525;
})();
var statearr_29526_29595 = state_29482__$1;
(statearr_29526_29595[(2)] = null);

(statearr_29526_29595[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (28))){
var inst_29441 = (state_29482[(25)]);
var inst_29422 = (state_29482[(21)]);
var inst_29441__$1 = cljs.core.seq.call(null,inst_29422);
var state_29482__$1 = (function (){var statearr_29527 = state_29482;
(statearr_29527[(25)] = inst_29441__$1);

return statearr_29527;
})();
if(inst_29441__$1){
var statearr_29528_29596 = state_29482__$1;
(statearr_29528_29596[(1)] = (33));

} else {
var statearr_29529_29597 = state_29482__$1;
(statearr_29529_29597[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (25))){
var inst_29424 = (state_29482[(20)]);
var inst_29425 = (state_29482[(11)]);
var inst_29427 = (inst_29425 < inst_29424);
var inst_29428 = inst_29427;
var state_29482__$1 = state_29482;
if(cljs.core.truth_(inst_29428)){
var statearr_29530_29598 = state_29482__$1;
(statearr_29530_29598[(1)] = (27));

} else {
var statearr_29531_29599 = state_29482__$1;
(statearr_29531_29599[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (34))){
var state_29482__$1 = state_29482;
var statearr_29532_29600 = state_29482__$1;
(statearr_29532_29600[(2)] = null);

(statearr_29532_29600[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (17))){
var state_29482__$1 = state_29482;
var statearr_29533_29601 = state_29482__$1;
(statearr_29533_29601[(2)] = null);

(statearr_29533_29601[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (3))){
var inst_29480 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29482__$1,inst_29480);
} else {
if((state_val_29483 === (12))){
var inst_29409 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29534_29602 = state_29482__$1;
(statearr_29534_29602[(2)] = inst_29409);

(statearr_29534_29602[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (2))){
var state_29482__$1 = state_29482;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29482__$1,(4),ch);
} else {
if((state_val_29483 === (23))){
var state_29482__$1 = state_29482;
var statearr_29535_29603 = state_29482__$1;
(statearr_29535_29603[(2)] = null);

(statearr_29535_29603[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (35))){
var inst_29464 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29536_29604 = state_29482__$1;
(statearr_29536_29604[(2)] = inst_29464);

(statearr_29536_29604[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (19))){
var inst_29383 = (state_29482[(7)]);
var inst_29387 = cljs.core.chunk_first.call(null,inst_29383);
var inst_29388 = cljs.core.chunk_rest.call(null,inst_29383);
var inst_29389 = cljs.core.count.call(null,inst_29387);
var inst_29363 = inst_29388;
var inst_29364 = inst_29387;
var inst_29365 = inst_29389;
var inst_29366 = (0);
var state_29482__$1 = (function (){var statearr_29537 = state_29482;
(statearr_29537[(14)] = inst_29366);

(statearr_29537[(15)] = inst_29364);

(statearr_29537[(16)] = inst_29365);

(statearr_29537[(17)] = inst_29363);

return statearr_29537;
})();
var statearr_29538_29605 = state_29482__$1;
(statearr_29538_29605[(2)] = null);

(statearr_29538_29605[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (11))){
var inst_29383 = (state_29482[(7)]);
var inst_29363 = (state_29482[(17)]);
var inst_29383__$1 = cljs.core.seq.call(null,inst_29363);
var state_29482__$1 = (function (){var statearr_29539 = state_29482;
(statearr_29539[(7)] = inst_29383__$1);

return statearr_29539;
})();
if(inst_29383__$1){
var statearr_29540_29606 = state_29482__$1;
(statearr_29540_29606[(1)] = (16));

} else {
var statearr_29541_29607 = state_29482__$1;
(statearr_29541_29607[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (9))){
var inst_29411 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29542_29608 = state_29482__$1;
(statearr_29542_29608[(2)] = inst_29411);

(statearr_29542_29608[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (5))){
var inst_29361 = cljs.core.deref.call(null,cs);
var inst_29362 = cljs.core.seq.call(null,inst_29361);
var inst_29363 = inst_29362;
var inst_29364 = null;
var inst_29365 = (0);
var inst_29366 = (0);
var state_29482__$1 = (function (){var statearr_29543 = state_29482;
(statearr_29543[(14)] = inst_29366);

(statearr_29543[(15)] = inst_29364);

(statearr_29543[(16)] = inst_29365);

(statearr_29543[(17)] = inst_29363);

return statearr_29543;
})();
var statearr_29544_29609 = state_29482__$1;
(statearr_29544_29609[(2)] = null);

(statearr_29544_29609[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (14))){
var state_29482__$1 = state_29482;
var statearr_29545_29610 = state_29482__$1;
(statearr_29545_29610[(2)] = null);

(statearr_29545_29610[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (45))){
var inst_29472 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29546_29611 = state_29482__$1;
(statearr_29546_29611[(2)] = inst_29472);

(statearr_29546_29611[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (26))){
var inst_29414 = (state_29482[(29)]);
var inst_29468 = (state_29482[(2)]);
var inst_29469 = cljs.core.seq.call(null,inst_29414);
var state_29482__$1 = (function (){var statearr_29547 = state_29482;
(statearr_29547[(31)] = inst_29468);

return statearr_29547;
})();
if(inst_29469){
var statearr_29548_29612 = state_29482__$1;
(statearr_29548_29612[(1)] = (42));

} else {
var statearr_29549_29613 = state_29482__$1;
(statearr_29549_29613[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (16))){
var inst_29383 = (state_29482[(7)]);
var inst_29385 = cljs.core.chunked_seq_QMARK_.call(null,inst_29383);
var state_29482__$1 = state_29482;
if(inst_29385){
var statearr_29550_29614 = state_29482__$1;
(statearr_29550_29614[(1)] = (19));

} else {
var statearr_29551_29615 = state_29482__$1;
(statearr_29551_29615[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (38))){
var inst_29461 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29552_29616 = state_29482__$1;
(statearr_29552_29616[(2)] = inst_29461);

(statearr_29552_29616[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (30))){
var state_29482__$1 = state_29482;
var statearr_29553_29617 = state_29482__$1;
(statearr_29553_29617[(2)] = null);

(statearr_29553_29617[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (10))){
var inst_29366 = (state_29482[(14)]);
var inst_29364 = (state_29482[(15)]);
var inst_29372 = cljs.core._nth.call(null,inst_29364,inst_29366);
var inst_29373 = cljs.core.nth.call(null,inst_29372,(0),null);
var inst_29374 = cljs.core.nth.call(null,inst_29372,(1),null);
var state_29482__$1 = (function (){var statearr_29554 = state_29482;
(statearr_29554[(26)] = inst_29373);

return statearr_29554;
})();
if(cljs.core.truth_(inst_29374)){
var statearr_29555_29618 = state_29482__$1;
(statearr_29555_29618[(1)] = (13));

} else {
var statearr_29556_29619 = state_29482__$1;
(statearr_29556_29619[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (18))){
var inst_29407 = (state_29482[(2)]);
var state_29482__$1 = state_29482;
var statearr_29557_29620 = state_29482__$1;
(statearr_29557_29620[(2)] = inst_29407);

(statearr_29557_29620[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (42))){
var state_29482__$1 = state_29482;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29482__$1,(45),dchan);
} else {
if((state_val_29483 === (37))){
var inst_29354 = (state_29482[(9)]);
var inst_29441 = (state_29482[(25)]);
var inst_29450 = (state_29482[(23)]);
var inst_29450__$1 = cljs.core.first.call(null,inst_29441);
var inst_29451 = cljs.core.async.put_BANG_.call(null,inst_29450__$1,inst_29354,done);
var state_29482__$1 = (function (){var statearr_29558 = state_29482;
(statearr_29558[(23)] = inst_29450__$1);

return statearr_29558;
})();
if(cljs.core.truth_(inst_29451)){
var statearr_29559_29621 = state_29482__$1;
(statearr_29559_29621[(1)] = (39));

} else {
var statearr_29560_29622 = state_29482__$1;
(statearr_29560_29622[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29483 === (8))){
var inst_29366 = (state_29482[(14)]);
var inst_29365 = (state_29482[(16)]);
var inst_29368 = (inst_29366 < inst_29365);
var inst_29369 = inst_29368;
var state_29482__$1 = state_29482;
if(cljs.core.truth_(inst_29369)){
var statearr_29561_29623 = state_29482__$1;
(statearr_29561_29623[(1)] = (10));

} else {
var statearr_29562_29624 = state_29482__$1;
(statearr_29562_29624[(1)] = (11));

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
}
}
}
}
}
}
}
}
});})(c__22536__auto___29570,cs,m,dchan,dctr,done))
;
return ((function (switch__22474__auto__,c__22536__auto___29570,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__22475__auto__ = null;
var cljs$core$async$mult_$_state_machine__22475__auto____0 = (function (){
var statearr_29566 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29566[(0)] = cljs$core$async$mult_$_state_machine__22475__auto__);

(statearr_29566[(1)] = (1));

return statearr_29566;
});
var cljs$core$async$mult_$_state_machine__22475__auto____1 = (function (state_29482){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_29482);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e29567){if((e29567 instanceof Object)){
var ex__22478__auto__ = e29567;
var statearr_29568_29625 = state_29482;
(statearr_29568_29625[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29482);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29567;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29626 = state_29482;
state_29482 = G__29626;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__22475__auto__ = function(state_29482){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__22475__auto____1.call(this,state_29482);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__22475__auto____0;
cljs$core$async$mult_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__22475__auto____1;
return cljs$core$async$mult_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___29570,cs,m,dchan,dctr,done))
})();
var state__22538__auto__ = (function (){var statearr_29569 = f__22537__auto__.call(null);
(statearr_29569[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___29570);

return statearr_29569;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___29570,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(){
var G__29628 = arguments.length;
switch (G__29628) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

cljs.core.async.Mix = (function (){var obj29631 = {};
return obj29631;
})();

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((function (){var and__20013__auto__ = m;
if(and__20013__auto__){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else {
return and__20013__auto__;
}
})()){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__20661__auto__ = (((m == null))?null:m);
return (function (){var or__20025__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(){
var argseq__21065__auto__ = ((((3) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__21065__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__29636){
var map__29637 = p__29636;
var map__29637__$1 = ((cljs.core.seq_QMARK_.call(null,map__29637))?cljs.core.apply.call(null,cljs.core.hash_map,map__29637):map__29637);
var opts = map__29637__$1;
var statearr_29638_29641 = state;
(statearr_29638_29641[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4126__auto__ = cljs.core.async.do_alts.call(null,((function (map__29637,map__29637__$1,opts){
return (function (val){
var statearr_29639_29642 = state;
(statearr_29639_29642[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__29637,map__29637__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4126__auto__)){
var cb = temp__4126__auto__;
var statearr_29640_29643 = state;
(statearr_29640_29643[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq29632){
var G__29633 = cljs.core.first.call(null,seq29632);
var seq29632__$1 = cljs.core.next.call(null,seq29632);
var G__29634 = cljs.core.first.call(null,seq29632__$1);
var seq29632__$2 = cljs.core.next.call(null,seq29632__$1);
var G__29635 = cljs.core.first.call(null,seq29632__$2);
var seq29632__$3 = cljs.core.next.call(null,seq29632__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__29633,G__29634,G__29635,seq29632__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 * be put on the supplied out channel. Input sources can be added to
 * the mix with 'admix', and removed with 'unmix'. A mix supports
 * soloing, muting and pausing multiple inputs atomically using
 * 'toggle', and can solo using either muting or pausing as determined
 * by 'solo-mode'.
 * 
 * Each channel can have zero or more boolean modes set via 'toggle':
 * 
 * :solo - when true, only this (ond other soloed) channel(s) will appear
 * in the mix output channel. :mute and :pause states of soloed
 * channels are ignored. If solo-mode is :mute, non-soloed
 * channels are muted, if :pause, non-soloed channels are
 * paused.
 * 
 * :mute - muted channels will have their contents consumed but not included in the mix
 * :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t29763 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t29763 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta29764){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta29764 = meta29764;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t29763.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t29763.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t29763.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_29765){
var self__ = this;
var _29765__$1 = this;
return self__.meta29764;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_29765,meta29764__$1){
var self__ = this;
var _29765__$1 = this;
return (new cljs.core.async.t29763(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta29764__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t29763.cljs$lang$type = true;

cljs.core.async.t29763.cljs$lang$ctorStr = "cljs.core.async/t29763";

cljs.core.async.t29763.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t29763");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t29763 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t29763(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta29764){
return (new cljs.core.async.t29763(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta29764));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t29763(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__22536__auto___29882 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___29882,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___29882,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_29835){
var state_val_29836 = (state_29835[(1)]);
if((state_val_29836 === (7))){
var inst_29779 = (state_29835[(7)]);
var inst_29784 = cljs.core.apply.call(null,cljs.core.hash_map,inst_29779);
var state_29835__$1 = state_29835;
var statearr_29837_29883 = state_29835__$1;
(statearr_29837_29883[(2)] = inst_29784);

(statearr_29837_29883[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (20))){
var inst_29794 = (state_29835[(8)]);
var state_29835__$1 = state_29835;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_29835__$1,(23),out,inst_29794);
} else {
if((state_val_29836 === (1))){
var inst_29769 = (state_29835[(9)]);
var inst_29769__$1 = calc_state.call(null);
var inst_29770 = cljs.core.seq_QMARK_.call(null,inst_29769__$1);
var state_29835__$1 = (function (){var statearr_29838 = state_29835;
(statearr_29838[(9)] = inst_29769__$1);

return statearr_29838;
})();
if(inst_29770){
var statearr_29839_29884 = state_29835__$1;
(statearr_29839_29884[(1)] = (2));

} else {
var statearr_29840_29885 = state_29835__$1;
(statearr_29840_29885[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (24))){
var inst_29787 = (state_29835[(10)]);
var inst_29779 = inst_29787;
var state_29835__$1 = (function (){var statearr_29841 = state_29835;
(statearr_29841[(7)] = inst_29779);

return statearr_29841;
})();
var statearr_29842_29886 = state_29835__$1;
(statearr_29842_29886[(2)] = null);

(statearr_29842_29886[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (4))){
var inst_29769 = (state_29835[(9)]);
var inst_29775 = (state_29835[(2)]);
var inst_29776 = cljs.core.get.call(null,inst_29775,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_29777 = cljs.core.get.call(null,inst_29775,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_29778 = cljs.core.get.call(null,inst_29775,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_29779 = inst_29769;
var state_29835__$1 = (function (){var statearr_29843 = state_29835;
(statearr_29843[(7)] = inst_29779);

(statearr_29843[(11)] = inst_29778);

(statearr_29843[(12)] = inst_29777);

(statearr_29843[(13)] = inst_29776);

return statearr_29843;
})();
var statearr_29844_29887 = state_29835__$1;
(statearr_29844_29887[(2)] = null);

(statearr_29844_29887[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (15))){
var state_29835__$1 = state_29835;
var statearr_29845_29888 = state_29835__$1;
(statearr_29845_29888[(2)] = null);

(statearr_29845_29888[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (21))){
var inst_29787 = (state_29835[(10)]);
var inst_29779 = inst_29787;
var state_29835__$1 = (function (){var statearr_29846 = state_29835;
(statearr_29846[(7)] = inst_29779);

return statearr_29846;
})();
var statearr_29847_29889 = state_29835__$1;
(statearr_29847_29889[(2)] = null);

(statearr_29847_29889[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (13))){
var inst_29831 = (state_29835[(2)]);
var state_29835__$1 = state_29835;
var statearr_29848_29890 = state_29835__$1;
(statearr_29848_29890[(2)] = inst_29831);

(statearr_29848_29890[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (22))){
var inst_29829 = (state_29835[(2)]);
var state_29835__$1 = state_29835;
var statearr_29849_29891 = state_29835__$1;
(statearr_29849_29891[(2)] = inst_29829);

(statearr_29849_29891[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (6))){
var inst_29833 = (state_29835[(2)]);
var state_29835__$1 = state_29835;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29835__$1,inst_29833);
} else {
if((state_val_29836 === (25))){
var state_29835__$1 = state_29835;
var statearr_29850_29892 = state_29835__$1;
(statearr_29850_29892[(2)] = null);

(statearr_29850_29892[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (17))){
var inst_29809 = (state_29835[(14)]);
var state_29835__$1 = state_29835;
var statearr_29851_29893 = state_29835__$1;
(statearr_29851_29893[(2)] = inst_29809);

(statearr_29851_29893[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (3))){
var inst_29769 = (state_29835[(9)]);
var state_29835__$1 = state_29835;
var statearr_29852_29894 = state_29835__$1;
(statearr_29852_29894[(2)] = inst_29769);

(statearr_29852_29894[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (12))){
var inst_29809 = (state_29835[(14)]);
var inst_29790 = (state_29835[(15)]);
var inst_29795 = (state_29835[(16)]);
var inst_29809__$1 = inst_29790.call(null,inst_29795);
var state_29835__$1 = (function (){var statearr_29853 = state_29835;
(statearr_29853[(14)] = inst_29809__$1);

return statearr_29853;
})();
if(cljs.core.truth_(inst_29809__$1)){
var statearr_29854_29895 = state_29835__$1;
(statearr_29854_29895[(1)] = (17));

} else {
var statearr_29855_29896 = state_29835__$1;
(statearr_29855_29896[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (2))){
var inst_29769 = (state_29835[(9)]);
var inst_29772 = cljs.core.apply.call(null,cljs.core.hash_map,inst_29769);
var state_29835__$1 = state_29835;
var statearr_29856_29897 = state_29835__$1;
(statearr_29856_29897[(2)] = inst_29772);

(statearr_29856_29897[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (23))){
var inst_29820 = (state_29835[(2)]);
var state_29835__$1 = state_29835;
if(cljs.core.truth_(inst_29820)){
var statearr_29857_29898 = state_29835__$1;
(statearr_29857_29898[(1)] = (24));

} else {
var statearr_29858_29899 = state_29835__$1;
(statearr_29858_29899[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (19))){
var inst_29817 = (state_29835[(2)]);
var state_29835__$1 = state_29835;
if(cljs.core.truth_(inst_29817)){
var statearr_29859_29900 = state_29835__$1;
(statearr_29859_29900[(1)] = (20));

} else {
var statearr_29860_29901 = state_29835__$1;
(statearr_29860_29901[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (11))){
var inst_29794 = (state_29835[(8)]);
var inst_29800 = (inst_29794 == null);
var state_29835__$1 = state_29835;
if(cljs.core.truth_(inst_29800)){
var statearr_29861_29902 = state_29835__$1;
(statearr_29861_29902[(1)] = (14));

} else {
var statearr_29862_29903 = state_29835__$1;
(statearr_29862_29903[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (9))){
var inst_29787 = (state_29835[(10)]);
var inst_29787__$1 = (state_29835[(2)]);
var inst_29788 = cljs.core.get.call(null,inst_29787__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_29789 = cljs.core.get.call(null,inst_29787__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_29790 = cljs.core.get.call(null,inst_29787__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var state_29835__$1 = (function (){var statearr_29863 = state_29835;
(statearr_29863[(15)] = inst_29790);

(statearr_29863[(17)] = inst_29789);

(statearr_29863[(10)] = inst_29787__$1);

return statearr_29863;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_29835__$1,(10),inst_29788);
} else {
if((state_val_29836 === (5))){
var inst_29779 = (state_29835[(7)]);
var inst_29782 = cljs.core.seq_QMARK_.call(null,inst_29779);
var state_29835__$1 = state_29835;
if(inst_29782){
var statearr_29864_29904 = state_29835__$1;
(statearr_29864_29904[(1)] = (7));

} else {
var statearr_29865_29905 = state_29835__$1;
(statearr_29865_29905[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (14))){
var inst_29795 = (state_29835[(16)]);
var inst_29802 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_29795);
var state_29835__$1 = state_29835;
var statearr_29866_29906 = state_29835__$1;
(statearr_29866_29906[(2)] = inst_29802);

(statearr_29866_29906[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (26))){
var inst_29825 = (state_29835[(2)]);
var state_29835__$1 = state_29835;
var statearr_29867_29907 = state_29835__$1;
(statearr_29867_29907[(2)] = inst_29825);

(statearr_29867_29907[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (16))){
var inst_29805 = (state_29835[(2)]);
var inst_29806 = calc_state.call(null);
var inst_29779 = inst_29806;
var state_29835__$1 = (function (){var statearr_29868 = state_29835;
(statearr_29868[(7)] = inst_29779);

(statearr_29868[(18)] = inst_29805);

return statearr_29868;
})();
var statearr_29869_29908 = state_29835__$1;
(statearr_29869_29908[(2)] = null);

(statearr_29869_29908[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (10))){
var inst_29795 = (state_29835[(16)]);
var inst_29794 = (state_29835[(8)]);
var inst_29793 = (state_29835[(2)]);
var inst_29794__$1 = cljs.core.nth.call(null,inst_29793,(0),null);
var inst_29795__$1 = cljs.core.nth.call(null,inst_29793,(1),null);
var inst_29796 = (inst_29794__$1 == null);
var inst_29797 = cljs.core._EQ_.call(null,inst_29795__$1,change);
var inst_29798 = (inst_29796) || (inst_29797);
var state_29835__$1 = (function (){var statearr_29870 = state_29835;
(statearr_29870[(16)] = inst_29795__$1);

(statearr_29870[(8)] = inst_29794__$1);

return statearr_29870;
})();
if(cljs.core.truth_(inst_29798)){
var statearr_29871_29909 = state_29835__$1;
(statearr_29871_29909[(1)] = (11));

} else {
var statearr_29872_29910 = state_29835__$1;
(statearr_29872_29910[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (18))){
var inst_29790 = (state_29835[(15)]);
var inst_29789 = (state_29835[(17)]);
var inst_29795 = (state_29835[(16)]);
var inst_29812 = cljs.core.empty_QMARK_.call(null,inst_29790);
var inst_29813 = inst_29789.call(null,inst_29795);
var inst_29814 = cljs.core.not.call(null,inst_29813);
var inst_29815 = (inst_29812) && (inst_29814);
var state_29835__$1 = state_29835;
var statearr_29873_29911 = state_29835__$1;
(statearr_29873_29911[(2)] = inst_29815);

(statearr_29873_29911[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29836 === (8))){
var inst_29779 = (state_29835[(7)]);
var state_29835__$1 = state_29835;
var statearr_29874_29912 = state_29835__$1;
(statearr_29874_29912[(2)] = inst_29779);

(statearr_29874_29912[(1)] = (9));


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
});})(c__22536__auto___29882,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__22474__auto__,c__22536__auto___29882,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__22475__auto__ = null;
var cljs$core$async$mix_$_state_machine__22475__auto____0 = (function (){
var statearr_29878 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29878[(0)] = cljs$core$async$mix_$_state_machine__22475__auto__);

(statearr_29878[(1)] = (1));

return statearr_29878;
});
var cljs$core$async$mix_$_state_machine__22475__auto____1 = (function (state_29835){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_29835);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e29879){if((e29879 instanceof Object)){
var ex__22478__auto__ = e29879;
var statearr_29880_29913 = state_29835;
(statearr_29880_29913[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29835);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29879;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29914 = state_29835;
state_29835 = G__29914;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__22475__auto__ = function(state_29835){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__22475__auto____1.call(this,state_29835);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__22475__auto____0;
cljs$core$async$mix_$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__22475__auto____1;
return cljs$core$async$mix_$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___29882,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__22538__auto__ = (function (){var statearr_29881 = f__22537__auto__.call(null);
(statearr_29881[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___29882);

return statearr_29881;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___29882,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 * state map is a map of channels -> channel-state-map. A
 * channel-state-map is a map of attrs -> boolean, where attr is one or
 * more of :mute, :pause or :solo. Any states supplied are merged with
 * the current state.
 * 
 * Note that channels can be added to a mix via toggle, which can be
 * used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

cljs.core.async.Pub = (function (){var obj29916 = {};
return obj29916;
})();

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((function (){var and__20013__auto__ = p;
if(and__20013__auto__){
return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else {
return and__20013__auto__;
}
})()){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__20661__auto__ = (((p == null))?null:p);
return (function (){var or__20025__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((function (){var and__20013__auto__ = p;
if(and__20013__auto__){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else {
return and__20013__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__20661__auto__ = (((p == null))?null:p);
return (function (){var or__20025__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(){
var G__29918 = arguments.length;
switch (G__29918) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((function (){var and__20013__auto__ = p;
if(and__20013__auto__){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else {
return and__20013__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__20661__auto__ = (((p == null))?null:p);
return (function (){var or__20025__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((function (){var and__20013__auto__ = p;
if(and__20013__auto__){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else {
return and__20013__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__20661__auto__ = (((p == null))?null:p);
return (function (){var or__20025__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__20661__auto__)]);
if(or__20025__auto__){
return or__20025__auto__;
} else {
var or__20025__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(or__20025__auto____$1){
return or__20025__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 * partitioned into topics by the topic-fn. topic-fn will be applied to
 * each value on the channel and the result will determine the 'topic'
 * on which that value will be put. Channels can be subscribed to
 * receive copies of topics using 'sub', and unsubscribed using
 * 'unsub'. Each topic will be handled by an internal mult on a
 * dedicated channel. By default these internal channels are
 * unbuffered, but a buf-fn can be supplied which, given a topic,
 * creates a buffer with desired properties.
 * 
 * Each item is distributed to all subs in parallel and synchronously,
 * i.e. each sub must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow subs from holding up the pub.
 * 
 * Items received when there are no matching subs get dropped.
 * 
 * Note that if buf-fns are used then each topic is handled
 * asynchronously, i.e. if a channel is subscribed to more than one
 * topic it should not expect them to be interleaved identically with
 * the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(){
var G__29922 = arguments.length;
switch (G__29922) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__20025__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__20025__auto__)){
return or__20025__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__20025__auto__,mults){
return (function (p1__29920_SHARP_){
if(cljs.core.truth_(p1__29920_SHARP_.call(null,topic))){
return p1__29920_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__29920_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__20025__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t29923 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t29923 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,meta29924){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.meta29924 = meta29924;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t29923.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t29923.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t29923.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4126__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4126__auto__)){
var m = temp__4126__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t29923.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t29923.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t29923.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t29923.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t29923.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_29925){
var self__ = this;
var _29925__$1 = this;
return self__.meta29924;
});})(mults,ensure_mult))
;

cljs.core.async.t29923.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_29925,meta29924__$1){
var self__ = this;
var _29925__$1 = this;
return (new cljs.core.async.t29923(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,meta29924__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t29923.cljs$lang$type = true;

cljs.core.async.t29923.cljs$lang$ctorStr = "cljs.core.async/t29923";

cljs.core.async.t29923.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t29923");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t29923 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t29923(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,meta29924){
return (new cljs.core.async.t29923(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,meta29924));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t29923(ensure_mult,mults,buf_fn,topic_fn,ch,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__22536__auto___30046 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30046,mults,ensure_mult,p){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30046,mults,ensure_mult,p){
return (function (state_29997){
var state_val_29998 = (state_29997[(1)]);
if((state_val_29998 === (7))){
var inst_29993 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
var statearr_29999_30047 = state_29997__$1;
(statearr_29999_30047[(2)] = inst_29993);

(statearr_29999_30047[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (20))){
var state_29997__$1 = state_29997;
var statearr_30000_30048 = state_29997__$1;
(statearr_30000_30048[(2)] = null);

(statearr_30000_30048[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (1))){
var state_29997__$1 = state_29997;
var statearr_30001_30049 = state_29997__$1;
(statearr_30001_30049[(2)] = null);

(statearr_30001_30049[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (24))){
var inst_29976 = (state_29997[(7)]);
var inst_29985 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_29976);
var state_29997__$1 = state_29997;
var statearr_30002_30050 = state_29997__$1;
(statearr_30002_30050[(2)] = inst_29985);

(statearr_30002_30050[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (4))){
var inst_29928 = (state_29997[(8)]);
var inst_29928__$1 = (state_29997[(2)]);
var inst_29929 = (inst_29928__$1 == null);
var state_29997__$1 = (function (){var statearr_30003 = state_29997;
(statearr_30003[(8)] = inst_29928__$1);

return statearr_30003;
})();
if(cljs.core.truth_(inst_29929)){
var statearr_30004_30051 = state_29997__$1;
(statearr_30004_30051[(1)] = (5));

} else {
var statearr_30005_30052 = state_29997__$1;
(statearr_30005_30052[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (15))){
var inst_29970 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
var statearr_30006_30053 = state_29997__$1;
(statearr_30006_30053[(2)] = inst_29970);

(statearr_30006_30053[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (21))){
var inst_29990 = (state_29997[(2)]);
var state_29997__$1 = (function (){var statearr_30007 = state_29997;
(statearr_30007[(9)] = inst_29990);

return statearr_30007;
})();
var statearr_30008_30054 = state_29997__$1;
(statearr_30008_30054[(2)] = null);

(statearr_30008_30054[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (13))){
var inst_29952 = (state_29997[(10)]);
var inst_29954 = cljs.core.chunked_seq_QMARK_.call(null,inst_29952);
var state_29997__$1 = state_29997;
if(inst_29954){
var statearr_30009_30055 = state_29997__$1;
(statearr_30009_30055[(1)] = (16));

} else {
var statearr_30010_30056 = state_29997__$1;
(statearr_30010_30056[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (22))){
var inst_29982 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
if(cljs.core.truth_(inst_29982)){
var statearr_30011_30057 = state_29997__$1;
(statearr_30011_30057[(1)] = (23));

} else {
var statearr_30012_30058 = state_29997__$1;
(statearr_30012_30058[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (6))){
var inst_29976 = (state_29997[(7)]);
var inst_29928 = (state_29997[(8)]);
var inst_29978 = (state_29997[(11)]);
var inst_29976__$1 = topic_fn.call(null,inst_29928);
var inst_29977 = cljs.core.deref.call(null,mults);
var inst_29978__$1 = cljs.core.get.call(null,inst_29977,inst_29976__$1);
var state_29997__$1 = (function (){var statearr_30013 = state_29997;
(statearr_30013[(7)] = inst_29976__$1);

(statearr_30013[(11)] = inst_29978__$1);

return statearr_30013;
})();
if(cljs.core.truth_(inst_29978__$1)){
var statearr_30014_30059 = state_29997__$1;
(statearr_30014_30059[(1)] = (19));

} else {
var statearr_30015_30060 = state_29997__$1;
(statearr_30015_30060[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (25))){
var inst_29987 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
var statearr_30016_30061 = state_29997__$1;
(statearr_30016_30061[(2)] = inst_29987);

(statearr_30016_30061[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (17))){
var inst_29952 = (state_29997[(10)]);
var inst_29961 = cljs.core.first.call(null,inst_29952);
var inst_29962 = cljs.core.async.muxch_STAR_.call(null,inst_29961);
var inst_29963 = cljs.core.async.close_BANG_.call(null,inst_29962);
var inst_29964 = cljs.core.next.call(null,inst_29952);
var inst_29938 = inst_29964;
var inst_29939 = null;
var inst_29940 = (0);
var inst_29941 = (0);
var state_29997__$1 = (function (){var statearr_30017 = state_29997;
(statearr_30017[(12)] = inst_29939);

(statearr_30017[(13)] = inst_29941);

(statearr_30017[(14)] = inst_29938);

(statearr_30017[(15)] = inst_29940);

(statearr_30017[(16)] = inst_29963);

return statearr_30017;
})();
var statearr_30018_30062 = state_29997__$1;
(statearr_30018_30062[(2)] = null);

(statearr_30018_30062[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (3))){
var inst_29995 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29997__$1,inst_29995);
} else {
if((state_val_29998 === (12))){
var inst_29972 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
var statearr_30019_30063 = state_29997__$1;
(statearr_30019_30063[(2)] = inst_29972);

(statearr_30019_30063[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (2))){
var state_29997__$1 = state_29997;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29997__$1,(4),ch);
} else {
if((state_val_29998 === (23))){
var state_29997__$1 = state_29997;
var statearr_30020_30064 = state_29997__$1;
(statearr_30020_30064[(2)] = null);

(statearr_30020_30064[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (19))){
var inst_29928 = (state_29997[(8)]);
var inst_29978 = (state_29997[(11)]);
var inst_29980 = cljs.core.async.muxch_STAR_.call(null,inst_29978);
var state_29997__$1 = state_29997;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_29997__$1,(22),inst_29980,inst_29928);
} else {
if((state_val_29998 === (11))){
var inst_29938 = (state_29997[(14)]);
var inst_29952 = (state_29997[(10)]);
var inst_29952__$1 = cljs.core.seq.call(null,inst_29938);
var state_29997__$1 = (function (){var statearr_30021 = state_29997;
(statearr_30021[(10)] = inst_29952__$1);

return statearr_30021;
})();
if(inst_29952__$1){
var statearr_30022_30065 = state_29997__$1;
(statearr_30022_30065[(1)] = (13));

} else {
var statearr_30023_30066 = state_29997__$1;
(statearr_30023_30066[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (9))){
var inst_29974 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
var statearr_30024_30067 = state_29997__$1;
(statearr_30024_30067[(2)] = inst_29974);

(statearr_30024_30067[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (5))){
var inst_29935 = cljs.core.deref.call(null,mults);
var inst_29936 = cljs.core.vals.call(null,inst_29935);
var inst_29937 = cljs.core.seq.call(null,inst_29936);
var inst_29938 = inst_29937;
var inst_29939 = null;
var inst_29940 = (0);
var inst_29941 = (0);
var state_29997__$1 = (function (){var statearr_30025 = state_29997;
(statearr_30025[(12)] = inst_29939);

(statearr_30025[(13)] = inst_29941);

(statearr_30025[(14)] = inst_29938);

(statearr_30025[(15)] = inst_29940);

return statearr_30025;
})();
var statearr_30026_30068 = state_29997__$1;
(statearr_30026_30068[(2)] = null);

(statearr_30026_30068[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (14))){
var state_29997__$1 = state_29997;
var statearr_30030_30069 = state_29997__$1;
(statearr_30030_30069[(2)] = null);

(statearr_30030_30069[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (16))){
var inst_29952 = (state_29997[(10)]);
var inst_29956 = cljs.core.chunk_first.call(null,inst_29952);
var inst_29957 = cljs.core.chunk_rest.call(null,inst_29952);
var inst_29958 = cljs.core.count.call(null,inst_29956);
var inst_29938 = inst_29957;
var inst_29939 = inst_29956;
var inst_29940 = inst_29958;
var inst_29941 = (0);
var state_29997__$1 = (function (){var statearr_30031 = state_29997;
(statearr_30031[(12)] = inst_29939);

(statearr_30031[(13)] = inst_29941);

(statearr_30031[(14)] = inst_29938);

(statearr_30031[(15)] = inst_29940);

return statearr_30031;
})();
var statearr_30032_30070 = state_29997__$1;
(statearr_30032_30070[(2)] = null);

(statearr_30032_30070[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (10))){
var inst_29939 = (state_29997[(12)]);
var inst_29941 = (state_29997[(13)]);
var inst_29938 = (state_29997[(14)]);
var inst_29940 = (state_29997[(15)]);
var inst_29946 = cljs.core._nth.call(null,inst_29939,inst_29941);
var inst_29947 = cljs.core.async.muxch_STAR_.call(null,inst_29946);
var inst_29948 = cljs.core.async.close_BANG_.call(null,inst_29947);
var inst_29949 = (inst_29941 + (1));
var tmp30027 = inst_29939;
var tmp30028 = inst_29938;
var tmp30029 = inst_29940;
var inst_29938__$1 = tmp30028;
var inst_29939__$1 = tmp30027;
var inst_29940__$1 = tmp30029;
var inst_29941__$1 = inst_29949;
var state_29997__$1 = (function (){var statearr_30033 = state_29997;
(statearr_30033[(12)] = inst_29939__$1);

(statearr_30033[(13)] = inst_29941__$1);

(statearr_30033[(14)] = inst_29938__$1);

(statearr_30033[(15)] = inst_29940__$1);

(statearr_30033[(17)] = inst_29948);

return statearr_30033;
})();
var statearr_30034_30071 = state_29997__$1;
(statearr_30034_30071[(2)] = null);

(statearr_30034_30071[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (18))){
var inst_29967 = (state_29997[(2)]);
var state_29997__$1 = state_29997;
var statearr_30035_30072 = state_29997__$1;
(statearr_30035_30072[(2)] = inst_29967);

(statearr_30035_30072[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29998 === (8))){
var inst_29941 = (state_29997[(13)]);
var inst_29940 = (state_29997[(15)]);
var inst_29943 = (inst_29941 < inst_29940);
var inst_29944 = inst_29943;
var state_29997__$1 = state_29997;
if(cljs.core.truth_(inst_29944)){
var statearr_30036_30073 = state_29997__$1;
(statearr_30036_30073[(1)] = (10));

} else {
var statearr_30037_30074 = state_29997__$1;
(statearr_30037_30074[(1)] = (11));

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
});})(c__22536__auto___30046,mults,ensure_mult,p))
;
return ((function (switch__22474__auto__,c__22536__auto___30046,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30041 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30041[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30041[(1)] = (1));

return statearr_30041;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_29997){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_29997);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30042){if((e30042 instanceof Object)){
var ex__22478__auto__ = e30042;
var statearr_30043_30075 = state_29997;
(statearr_30043_30075[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29997);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30042;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30076 = state_29997;
state_29997 = G__30076;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_29997){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_29997);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30046,mults,ensure_mult,p))
})();
var state__22538__auto__ = (function (){var statearr_30044 = f__22537__auto__.call(null);
(statearr_30044[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30046);

return statearr_30044;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30046,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(){
var G__30078 = arguments.length;
switch (G__30078) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(){
var G__30081 = arguments.length;
switch (G__30081) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 * channel which contains the values produced by applying f to the set
 * of first items taken from each source channel, followed by applying
 * f to the set of second items from each channel, until any one of the
 * channels is closed, at which point the output channel will be
 * closed. The returned channel will be unbuffered by default, or a
 * buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(){
var G__30084 = arguments.length;
switch (G__30084) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__22536__auto___30154 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30154,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30154,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_30123){
var state_val_30124 = (state_30123[(1)]);
if((state_val_30124 === (7))){
var state_30123__$1 = state_30123;
var statearr_30125_30155 = state_30123__$1;
(statearr_30125_30155[(2)] = null);

(statearr_30125_30155[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (1))){
var state_30123__$1 = state_30123;
var statearr_30126_30156 = state_30123__$1;
(statearr_30126_30156[(2)] = null);

(statearr_30126_30156[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (4))){
var inst_30087 = (state_30123[(7)]);
var inst_30089 = (inst_30087 < cnt);
var state_30123__$1 = state_30123;
if(cljs.core.truth_(inst_30089)){
var statearr_30127_30157 = state_30123__$1;
(statearr_30127_30157[(1)] = (6));

} else {
var statearr_30128_30158 = state_30123__$1;
(statearr_30128_30158[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (15))){
var inst_30119 = (state_30123[(2)]);
var state_30123__$1 = state_30123;
var statearr_30129_30159 = state_30123__$1;
(statearr_30129_30159[(2)] = inst_30119);

(statearr_30129_30159[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (13))){
var inst_30112 = cljs.core.async.close_BANG_.call(null,out);
var state_30123__$1 = state_30123;
var statearr_30130_30160 = state_30123__$1;
(statearr_30130_30160[(2)] = inst_30112);

(statearr_30130_30160[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (6))){
var state_30123__$1 = state_30123;
var statearr_30131_30161 = state_30123__$1;
(statearr_30131_30161[(2)] = null);

(statearr_30131_30161[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (3))){
var inst_30121 = (state_30123[(2)]);
var state_30123__$1 = state_30123;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30123__$1,inst_30121);
} else {
if((state_val_30124 === (12))){
var inst_30109 = (state_30123[(8)]);
var inst_30109__$1 = (state_30123[(2)]);
var inst_30110 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_30109__$1);
var state_30123__$1 = (function (){var statearr_30132 = state_30123;
(statearr_30132[(8)] = inst_30109__$1);

return statearr_30132;
})();
if(cljs.core.truth_(inst_30110)){
var statearr_30133_30162 = state_30123__$1;
(statearr_30133_30162[(1)] = (13));

} else {
var statearr_30134_30163 = state_30123__$1;
(statearr_30134_30163[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (2))){
var inst_30086 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_30087 = (0);
var state_30123__$1 = (function (){var statearr_30135 = state_30123;
(statearr_30135[(9)] = inst_30086);

(statearr_30135[(7)] = inst_30087);

return statearr_30135;
})();
var statearr_30136_30164 = state_30123__$1;
(statearr_30136_30164[(2)] = null);

(statearr_30136_30164[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (11))){
var inst_30087 = (state_30123[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_30123,(10),Object,null,(9));
var inst_30096 = chs__$1.call(null,inst_30087);
var inst_30097 = done.call(null,inst_30087);
var inst_30098 = cljs.core.async.take_BANG_.call(null,inst_30096,inst_30097);
var state_30123__$1 = state_30123;
var statearr_30137_30165 = state_30123__$1;
(statearr_30137_30165[(2)] = inst_30098);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30123__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (9))){
var inst_30087 = (state_30123[(7)]);
var inst_30100 = (state_30123[(2)]);
var inst_30101 = (inst_30087 + (1));
var inst_30087__$1 = inst_30101;
var state_30123__$1 = (function (){var statearr_30138 = state_30123;
(statearr_30138[(7)] = inst_30087__$1);

(statearr_30138[(10)] = inst_30100);

return statearr_30138;
})();
var statearr_30139_30166 = state_30123__$1;
(statearr_30139_30166[(2)] = null);

(statearr_30139_30166[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (5))){
var inst_30107 = (state_30123[(2)]);
var state_30123__$1 = (function (){var statearr_30140 = state_30123;
(statearr_30140[(11)] = inst_30107);

return statearr_30140;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30123__$1,(12),dchan);
} else {
if((state_val_30124 === (14))){
var inst_30109 = (state_30123[(8)]);
var inst_30114 = cljs.core.apply.call(null,f,inst_30109);
var state_30123__$1 = state_30123;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30123__$1,(16),out,inst_30114);
} else {
if((state_val_30124 === (16))){
var inst_30116 = (state_30123[(2)]);
var state_30123__$1 = (function (){var statearr_30141 = state_30123;
(statearr_30141[(12)] = inst_30116);

return statearr_30141;
})();
var statearr_30142_30167 = state_30123__$1;
(statearr_30142_30167[(2)] = null);

(statearr_30142_30167[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (10))){
var inst_30091 = (state_30123[(2)]);
var inst_30092 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_30123__$1 = (function (){var statearr_30143 = state_30123;
(statearr_30143[(13)] = inst_30091);

return statearr_30143;
})();
var statearr_30144_30168 = state_30123__$1;
(statearr_30144_30168[(2)] = inst_30092);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30123__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30124 === (8))){
var inst_30105 = (state_30123[(2)]);
var state_30123__$1 = state_30123;
var statearr_30145_30169 = state_30123__$1;
(statearr_30145_30169[(2)] = inst_30105);

(statearr_30145_30169[(1)] = (5));


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
});})(c__22536__auto___30154,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__22474__auto__,c__22536__auto___30154,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30149 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30149[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30149[(1)] = (1));

return statearr_30149;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_30123){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30123);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30150){if((e30150 instanceof Object)){
var ex__22478__auto__ = e30150;
var statearr_30151_30170 = state_30123;
(statearr_30151_30170[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30123);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30150;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30171 = state_30123;
state_30123 = G__30171;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_30123){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_30123);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30154,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__22538__auto__ = (function (){var statearr_30152 = f__22537__auto__.call(null);
(statearr_30152[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30154);

return statearr_30152;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30154,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 * contains all values taken from them. The returned channel will be
 * unbuffered by default, or a buf-or-n can be supplied. The channel
 * will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(){
var G__30174 = arguments.length;
switch (G__30174) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__22536__auto___30229 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30229,out){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30229,out){
return (function (state_30204){
var state_val_30205 = (state_30204[(1)]);
if((state_val_30205 === (7))){
var inst_30184 = (state_30204[(7)]);
var inst_30183 = (state_30204[(8)]);
var inst_30183__$1 = (state_30204[(2)]);
var inst_30184__$1 = cljs.core.nth.call(null,inst_30183__$1,(0),null);
var inst_30185 = cljs.core.nth.call(null,inst_30183__$1,(1),null);
var inst_30186 = (inst_30184__$1 == null);
var state_30204__$1 = (function (){var statearr_30206 = state_30204;
(statearr_30206[(7)] = inst_30184__$1);

(statearr_30206[(8)] = inst_30183__$1);

(statearr_30206[(9)] = inst_30185);

return statearr_30206;
})();
if(cljs.core.truth_(inst_30186)){
var statearr_30207_30230 = state_30204__$1;
(statearr_30207_30230[(1)] = (8));

} else {
var statearr_30208_30231 = state_30204__$1;
(statearr_30208_30231[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30205 === (1))){
var inst_30175 = cljs.core.vec.call(null,chs);
var inst_30176 = inst_30175;
var state_30204__$1 = (function (){var statearr_30209 = state_30204;
(statearr_30209[(10)] = inst_30176);

return statearr_30209;
})();
var statearr_30210_30232 = state_30204__$1;
(statearr_30210_30232[(2)] = null);

(statearr_30210_30232[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30205 === (4))){
var inst_30176 = (state_30204[(10)]);
var state_30204__$1 = state_30204;
return cljs.core.async.ioc_alts_BANG_.call(null,state_30204__$1,(7),inst_30176);
} else {
if((state_val_30205 === (6))){
var inst_30200 = (state_30204[(2)]);
var state_30204__$1 = state_30204;
var statearr_30211_30233 = state_30204__$1;
(statearr_30211_30233[(2)] = inst_30200);

(statearr_30211_30233[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30205 === (3))){
var inst_30202 = (state_30204[(2)]);
var state_30204__$1 = state_30204;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30204__$1,inst_30202);
} else {
if((state_val_30205 === (2))){
var inst_30176 = (state_30204[(10)]);
var inst_30178 = cljs.core.count.call(null,inst_30176);
var inst_30179 = (inst_30178 > (0));
var state_30204__$1 = state_30204;
if(cljs.core.truth_(inst_30179)){
var statearr_30213_30234 = state_30204__$1;
(statearr_30213_30234[(1)] = (4));

} else {
var statearr_30214_30235 = state_30204__$1;
(statearr_30214_30235[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30205 === (11))){
var inst_30176 = (state_30204[(10)]);
var inst_30193 = (state_30204[(2)]);
var tmp30212 = inst_30176;
var inst_30176__$1 = tmp30212;
var state_30204__$1 = (function (){var statearr_30215 = state_30204;
(statearr_30215[(11)] = inst_30193);

(statearr_30215[(10)] = inst_30176__$1);

return statearr_30215;
})();
var statearr_30216_30236 = state_30204__$1;
(statearr_30216_30236[(2)] = null);

(statearr_30216_30236[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30205 === (9))){
var inst_30184 = (state_30204[(7)]);
var state_30204__$1 = state_30204;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30204__$1,(11),out,inst_30184);
} else {
if((state_val_30205 === (5))){
var inst_30198 = cljs.core.async.close_BANG_.call(null,out);
var state_30204__$1 = state_30204;
var statearr_30217_30237 = state_30204__$1;
(statearr_30217_30237[(2)] = inst_30198);

(statearr_30217_30237[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30205 === (10))){
var inst_30196 = (state_30204[(2)]);
var state_30204__$1 = state_30204;
var statearr_30218_30238 = state_30204__$1;
(statearr_30218_30238[(2)] = inst_30196);

(statearr_30218_30238[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30205 === (8))){
var inst_30184 = (state_30204[(7)]);
var inst_30176 = (state_30204[(10)]);
var inst_30183 = (state_30204[(8)]);
var inst_30185 = (state_30204[(9)]);
var inst_30188 = (function (){var c = inst_30185;
var v = inst_30184;
var vec__30181 = inst_30183;
var cs = inst_30176;
return ((function (c,v,vec__30181,cs,inst_30184,inst_30176,inst_30183,inst_30185,state_val_30205,c__22536__auto___30229,out){
return (function (p1__30172_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__30172_SHARP_);
});
;})(c,v,vec__30181,cs,inst_30184,inst_30176,inst_30183,inst_30185,state_val_30205,c__22536__auto___30229,out))
})();
var inst_30189 = cljs.core.filterv.call(null,inst_30188,inst_30176);
var inst_30176__$1 = inst_30189;
var state_30204__$1 = (function (){var statearr_30219 = state_30204;
(statearr_30219[(10)] = inst_30176__$1);

return statearr_30219;
})();
var statearr_30220_30239 = state_30204__$1;
(statearr_30220_30239[(2)] = null);

(statearr_30220_30239[(1)] = (2));


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
});})(c__22536__auto___30229,out))
;
return ((function (switch__22474__auto__,c__22536__auto___30229,out){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30224 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30224[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30224[(1)] = (1));

return statearr_30224;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_30204){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30204);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30225){if((e30225 instanceof Object)){
var ex__22478__auto__ = e30225;
var statearr_30226_30240 = state_30204;
(statearr_30226_30240[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30204);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30225;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30241 = state_30204;
state_30204 = G__30241;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_30204){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_30204);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30229,out))
})();
var state__22538__auto__ = (function (){var statearr_30227 = f__22537__auto__.call(null);
(statearr_30227[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30229);

return statearr_30227;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30229,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 * items taken from the channel conjoined to the supplied
 * collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 * The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(){
var G__30243 = arguments.length;
switch (G__30243) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__22536__auto___30291 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30291,out){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30291,out){
return (function (state_30267){
var state_val_30268 = (state_30267[(1)]);
if((state_val_30268 === (7))){
var inst_30249 = (state_30267[(7)]);
var inst_30249__$1 = (state_30267[(2)]);
var inst_30250 = (inst_30249__$1 == null);
var inst_30251 = cljs.core.not.call(null,inst_30250);
var state_30267__$1 = (function (){var statearr_30269 = state_30267;
(statearr_30269[(7)] = inst_30249__$1);

return statearr_30269;
})();
if(inst_30251){
var statearr_30270_30292 = state_30267__$1;
(statearr_30270_30292[(1)] = (8));

} else {
var statearr_30271_30293 = state_30267__$1;
(statearr_30271_30293[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (1))){
var inst_30244 = (0);
var state_30267__$1 = (function (){var statearr_30272 = state_30267;
(statearr_30272[(8)] = inst_30244);

return statearr_30272;
})();
var statearr_30273_30294 = state_30267__$1;
(statearr_30273_30294[(2)] = null);

(statearr_30273_30294[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (4))){
var state_30267__$1 = state_30267;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30267__$1,(7),ch);
} else {
if((state_val_30268 === (6))){
var inst_30262 = (state_30267[(2)]);
var state_30267__$1 = state_30267;
var statearr_30274_30295 = state_30267__$1;
(statearr_30274_30295[(2)] = inst_30262);

(statearr_30274_30295[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (3))){
var inst_30264 = (state_30267[(2)]);
var inst_30265 = cljs.core.async.close_BANG_.call(null,out);
var state_30267__$1 = (function (){var statearr_30275 = state_30267;
(statearr_30275[(9)] = inst_30264);

return statearr_30275;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30267__$1,inst_30265);
} else {
if((state_val_30268 === (2))){
var inst_30244 = (state_30267[(8)]);
var inst_30246 = (inst_30244 < n);
var state_30267__$1 = state_30267;
if(cljs.core.truth_(inst_30246)){
var statearr_30276_30296 = state_30267__$1;
(statearr_30276_30296[(1)] = (4));

} else {
var statearr_30277_30297 = state_30267__$1;
(statearr_30277_30297[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (11))){
var inst_30244 = (state_30267[(8)]);
var inst_30254 = (state_30267[(2)]);
var inst_30255 = (inst_30244 + (1));
var inst_30244__$1 = inst_30255;
var state_30267__$1 = (function (){var statearr_30278 = state_30267;
(statearr_30278[(8)] = inst_30244__$1);

(statearr_30278[(10)] = inst_30254);

return statearr_30278;
})();
var statearr_30279_30298 = state_30267__$1;
(statearr_30279_30298[(2)] = null);

(statearr_30279_30298[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (9))){
var state_30267__$1 = state_30267;
var statearr_30280_30299 = state_30267__$1;
(statearr_30280_30299[(2)] = null);

(statearr_30280_30299[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (5))){
var state_30267__$1 = state_30267;
var statearr_30281_30300 = state_30267__$1;
(statearr_30281_30300[(2)] = null);

(statearr_30281_30300[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (10))){
var inst_30259 = (state_30267[(2)]);
var state_30267__$1 = state_30267;
var statearr_30282_30301 = state_30267__$1;
(statearr_30282_30301[(2)] = inst_30259);

(statearr_30282_30301[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30268 === (8))){
var inst_30249 = (state_30267[(7)]);
var state_30267__$1 = state_30267;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30267__$1,(11),out,inst_30249);
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
});})(c__22536__auto___30291,out))
;
return ((function (switch__22474__auto__,c__22536__auto___30291,out){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30286 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_30286[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30286[(1)] = (1));

return statearr_30286;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_30267){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30267);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30287){if((e30287 instanceof Object)){
var ex__22478__auto__ = e30287;
var statearr_30288_30302 = state_30267;
(statearr_30288_30302[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30267);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30287;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30303 = state_30267;
state_30267 = G__30303;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_30267){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_30267);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30291,out))
})();
var state__22538__auto__ = (function (){var statearr_30289 = f__22537__auto__.call(null);
(statearr_30289[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30291);

return statearr_30289;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30291,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t30311 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t30311 = (function (ch,f,map_LT_,meta30312){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta30312 = meta30312;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t30311.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t30311.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t30311.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t30311.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t30314 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t30314 = (function (fn1,_,meta30312,map_LT_,f,ch,meta30315){
this.fn1 = fn1;
this._ = _;
this.meta30312 = meta30312;
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta30315 = meta30315;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t30314.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t30314.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t30314.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__30304_SHARP_){
return f1.call(null,(((p1__30304_SHARP_ == null))?null:self__.f.call(null,p1__30304_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t30314.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_30316){
var self__ = this;
var _30316__$1 = this;
return self__.meta30315;
});})(___$1))
;

cljs.core.async.t30314.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_30316,meta30315__$1){
var self__ = this;
var _30316__$1 = this;
return (new cljs.core.async.t30314(self__.fn1,self__._,self__.meta30312,self__.map_LT_,self__.f,self__.ch,meta30315__$1));
});})(___$1))
;

cljs.core.async.t30314.cljs$lang$type = true;

cljs.core.async.t30314.cljs$lang$ctorStr = "cljs.core.async/t30314";

cljs.core.async.t30314.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t30314");
});})(___$1))
;

cljs.core.async.__GT_t30314 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t30314(fn1__$1,___$2,meta30312__$1,map_LT___$1,f__$1,ch__$1,meta30315){
return (new cljs.core.async.t30314(fn1__$1,___$2,meta30312__$1,map_LT___$1,f__$1,ch__$1,meta30315));
});})(___$1))
;

}

return (new cljs.core.async.t30314(fn1,___$1,self__.meta30312,self__.map_LT_,self__.f,self__.ch,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__20013__auto__ = ret;
if(cljs.core.truth_(and__20013__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__20013__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t30311.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t30311.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t30311.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t30311.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_30313){
var self__ = this;
var _30313__$1 = this;
return self__.meta30312;
});

cljs.core.async.t30311.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_30313,meta30312__$1){
var self__ = this;
var _30313__$1 = this;
return (new cljs.core.async.t30311(self__.ch,self__.f,self__.map_LT_,meta30312__$1));
});

cljs.core.async.t30311.cljs$lang$type = true;

cljs.core.async.t30311.cljs$lang$ctorStr = "cljs.core.async/t30311";

cljs.core.async.t30311.cljs$lang$ctorPrWriter = (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t30311");
});

cljs.core.async.__GT_t30311 = (function cljs$core$async$map_LT__$___GT_t30311(ch__$1,f__$1,map_LT___$1,meta30312){
return (new cljs.core.async.t30311(ch__$1,f__$1,map_LT___$1,meta30312));
});

}

return (new cljs.core.async.t30311(ch,f,cljs$core$async$map_LT_,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t30320 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t30320 = (function (ch,f,map_GT_,meta30321){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta30321 = meta30321;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t30320.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t30320.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t30320.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t30320.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t30320.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t30320.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t30320.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_30322){
var self__ = this;
var _30322__$1 = this;
return self__.meta30321;
});

cljs.core.async.t30320.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_30322,meta30321__$1){
var self__ = this;
var _30322__$1 = this;
return (new cljs.core.async.t30320(self__.ch,self__.f,self__.map_GT_,meta30321__$1));
});

cljs.core.async.t30320.cljs$lang$type = true;

cljs.core.async.t30320.cljs$lang$ctorStr = "cljs.core.async/t30320";

cljs.core.async.t30320.cljs$lang$ctorPrWriter = (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t30320");
});

cljs.core.async.__GT_t30320 = (function cljs$core$async$map_GT__$___GT_t30320(ch__$1,f__$1,map_GT___$1,meta30321){
return (new cljs.core.async.t30320(ch__$1,f__$1,map_GT___$1,meta30321));
});

}

return (new cljs.core.async.t30320(ch,f,cljs$core$async$map_GT_,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t30326 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t30326 = (function (ch,p,filter_GT_,meta30327){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta30327 = meta30327;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t30326.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t30326.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t30326.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t30326.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t30326.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t30326.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t30326.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t30326.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_30328){
var self__ = this;
var _30328__$1 = this;
return self__.meta30327;
});

cljs.core.async.t30326.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_30328,meta30327__$1){
var self__ = this;
var _30328__$1 = this;
return (new cljs.core.async.t30326(self__.ch,self__.p,self__.filter_GT_,meta30327__$1));
});

cljs.core.async.t30326.cljs$lang$type = true;

cljs.core.async.t30326.cljs$lang$ctorStr = "cljs.core.async/t30326";

cljs.core.async.t30326.cljs$lang$ctorPrWriter = (function (this__20604__auto__,writer__20605__auto__,opt__20606__auto__){
return cljs.core._write.call(null,writer__20605__auto__,"cljs.core.async/t30326");
});

cljs.core.async.__GT_t30326 = (function cljs$core$async$filter_GT__$___GT_t30326(ch__$1,p__$1,filter_GT___$1,meta30327){
return (new cljs.core.async.t30326(ch__$1,p__$1,filter_GT___$1,meta30327));
});

}

return (new cljs.core.async.t30326(ch,p,cljs$core$async$filter_GT_,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(){
var G__30330 = arguments.length;
switch (G__30330) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__22536__auto___30373 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30373,out){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30373,out){
return (function (state_30351){
var state_val_30352 = (state_30351[(1)]);
if((state_val_30352 === (7))){
var inst_30347 = (state_30351[(2)]);
var state_30351__$1 = state_30351;
var statearr_30353_30374 = state_30351__$1;
(statearr_30353_30374[(2)] = inst_30347);

(statearr_30353_30374[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (1))){
var state_30351__$1 = state_30351;
var statearr_30354_30375 = state_30351__$1;
(statearr_30354_30375[(2)] = null);

(statearr_30354_30375[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (4))){
var inst_30333 = (state_30351[(7)]);
var inst_30333__$1 = (state_30351[(2)]);
var inst_30334 = (inst_30333__$1 == null);
var state_30351__$1 = (function (){var statearr_30355 = state_30351;
(statearr_30355[(7)] = inst_30333__$1);

return statearr_30355;
})();
if(cljs.core.truth_(inst_30334)){
var statearr_30356_30376 = state_30351__$1;
(statearr_30356_30376[(1)] = (5));

} else {
var statearr_30357_30377 = state_30351__$1;
(statearr_30357_30377[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (6))){
var inst_30333 = (state_30351[(7)]);
var inst_30338 = p.call(null,inst_30333);
var state_30351__$1 = state_30351;
if(cljs.core.truth_(inst_30338)){
var statearr_30358_30378 = state_30351__$1;
(statearr_30358_30378[(1)] = (8));

} else {
var statearr_30359_30379 = state_30351__$1;
(statearr_30359_30379[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (3))){
var inst_30349 = (state_30351[(2)]);
var state_30351__$1 = state_30351;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30351__$1,inst_30349);
} else {
if((state_val_30352 === (2))){
var state_30351__$1 = state_30351;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30351__$1,(4),ch);
} else {
if((state_val_30352 === (11))){
var inst_30341 = (state_30351[(2)]);
var state_30351__$1 = state_30351;
var statearr_30360_30380 = state_30351__$1;
(statearr_30360_30380[(2)] = inst_30341);

(statearr_30360_30380[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (9))){
var state_30351__$1 = state_30351;
var statearr_30361_30381 = state_30351__$1;
(statearr_30361_30381[(2)] = null);

(statearr_30361_30381[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (5))){
var inst_30336 = cljs.core.async.close_BANG_.call(null,out);
var state_30351__$1 = state_30351;
var statearr_30362_30382 = state_30351__$1;
(statearr_30362_30382[(2)] = inst_30336);

(statearr_30362_30382[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (10))){
var inst_30344 = (state_30351[(2)]);
var state_30351__$1 = (function (){var statearr_30363 = state_30351;
(statearr_30363[(8)] = inst_30344);

return statearr_30363;
})();
var statearr_30364_30383 = state_30351__$1;
(statearr_30364_30383[(2)] = null);

(statearr_30364_30383[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30352 === (8))){
var inst_30333 = (state_30351[(7)]);
var state_30351__$1 = state_30351;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30351__$1,(11),out,inst_30333);
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
});})(c__22536__auto___30373,out))
;
return ((function (switch__22474__auto__,c__22536__auto___30373,out){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30368 = [null,null,null,null,null,null,null,null,null];
(statearr_30368[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30368[(1)] = (1));

return statearr_30368;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_30351){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30351);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30369){if((e30369 instanceof Object)){
var ex__22478__auto__ = e30369;
var statearr_30370_30384 = state_30351;
(statearr_30370_30384[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30351);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30369;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30385 = state_30351;
state_30351 = G__30385;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_30351){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_30351);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30373,out))
})();
var state__22538__auto__ = (function (){var statearr_30371 = f__22537__auto__.call(null);
(statearr_30371[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30373);

return statearr_30371;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30373,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(){
var G__30387 = arguments.length;
switch (G__30387) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__22536__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto__){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto__){
return (function (state_30554){
var state_val_30555 = (state_30554[(1)]);
if((state_val_30555 === (7))){
var inst_30550 = (state_30554[(2)]);
var state_30554__$1 = state_30554;
var statearr_30556_30597 = state_30554__$1;
(statearr_30556_30597[(2)] = inst_30550);

(statearr_30556_30597[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (20))){
var inst_30520 = (state_30554[(7)]);
var inst_30531 = (state_30554[(2)]);
var inst_30532 = cljs.core.next.call(null,inst_30520);
var inst_30506 = inst_30532;
var inst_30507 = null;
var inst_30508 = (0);
var inst_30509 = (0);
var state_30554__$1 = (function (){var statearr_30557 = state_30554;
(statearr_30557[(8)] = inst_30508);

(statearr_30557[(9)] = inst_30509);

(statearr_30557[(10)] = inst_30507);

(statearr_30557[(11)] = inst_30506);

(statearr_30557[(12)] = inst_30531);

return statearr_30557;
})();
var statearr_30558_30598 = state_30554__$1;
(statearr_30558_30598[(2)] = null);

(statearr_30558_30598[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (1))){
var state_30554__$1 = state_30554;
var statearr_30559_30599 = state_30554__$1;
(statearr_30559_30599[(2)] = null);

(statearr_30559_30599[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (4))){
var inst_30495 = (state_30554[(13)]);
var inst_30495__$1 = (state_30554[(2)]);
var inst_30496 = (inst_30495__$1 == null);
var state_30554__$1 = (function (){var statearr_30560 = state_30554;
(statearr_30560[(13)] = inst_30495__$1);

return statearr_30560;
})();
if(cljs.core.truth_(inst_30496)){
var statearr_30561_30600 = state_30554__$1;
(statearr_30561_30600[(1)] = (5));

} else {
var statearr_30562_30601 = state_30554__$1;
(statearr_30562_30601[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (15))){
var state_30554__$1 = state_30554;
var statearr_30566_30602 = state_30554__$1;
(statearr_30566_30602[(2)] = null);

(statearr_30566_30602[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (21))){
var state_30554__$1 = state_30554;
var statearr_30567_30603 = state_30554__$1;
(statearr_30567_30603[(2)] = null);

(statearr_30567_30603[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (13))){
var inst_30508 = (state_30554[(8)]);
var inst_30509 = (state_30554[(9)]);
var inst_30507 = (state_30554[(10)]);
var inst_30506 = (state_30554[(11)]);
var inst_30516 = (state_30554[(2)]);
var inst_30517 = (inst_30509 + (1));
var tmp30563 = inst_30508;
var tmp30564 = inst_30507;
var tmp30565 = inst_30506;
var inst_30506__$1 = tmp30565;
var inst_30507__$1 = tmp30564;
var inst_30508__$1 = tmp30563;
var inst_30509__$1 = inst_30517;
var state_30554__$1 = (function (){var statearr_30568 = state_30554;
(statearr_30568[(8)] = inst_30508__$1);

(statearr_30568[(14)] = inst_30516);

(statearr_30568[(9)] = inst_30509__$1);

(statearr_30568[(10)] = inst_30507__$1);

(statearr_30568[(11)] = inst_30506__$1);

return statearr_30568;
})();
var statearr_30569_30604 = state_30554__$1;
(statearr_30569_30604[(2)] = null);

(statearr_30569_30604[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (22))){
var state_30554__$1 = state_30554;
var statearr_30570_30605 = state_30554__$1;
(statearr_30570_30605[(2)] = null);

(statearr_30570_30605[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (6))){
var inst_30495 = (state_30554[(13)]);
var inst_30504 = f.call(null,inst_30495);
var inst_30505 = cljs.core.seq.call(null,inst_30504);
var inst_30506 = inst_30505;
var inst_30507 = null;
var inst_30508 = (0);
var inst_30509 = (0);
var state_30554__$1 = (function (){var statearr_30571 = state_30554;
(statearr_30571[(8)] = inst_30508);

(statearr_30571[(9)] = inst_30509);

(statearr_30571[(10)] = inst_30507);

(statearr_30571[(11)] = inst_30506);

return statearr_30571;
})();
var statearr_30572_30606 = state_30554__$1;
(statearr_30572_30606[(2)] = null);

(statearr_30572_30606[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (17))){
var inst_30520 = (state_30554[(7)]);
var inst_30524 = cljs.core.chunk_first.call(null,inst_30520);
var inst_30525 = cljs.core.chunk_rest.call(null,inst_30520);
var inst_30526 = cljs.core.count.call(null,inst_30524);
var inst_30506 = inst_30525;
var inst_30507 = inst_30524;
var inst_30508 = inst_30526;
var inst_30509 = (0);
var state_30554__$1 = (function (){var statearr_30573 = state_30554;
(statearr_30573[(8)] = inst_30508);

(statearr_30573[(9)] = inst_30509);

(statearr_30573[(10)] = inst_30507);

(statearr_30573[(11)] = inst_30506);

return statearr_30573;
})();
var statearr_30574_30607 = state_30554__$1;
(statearr_30574_30607[(2)] = null);

(statearr_30574_30607[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (3))){
var inst_30552 = (state_30554[(2)]);
var state_30554__$1 = state_30554;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30554__$1,inst_30552);
} else {
if((state_val_30555 === (12))){
var inst_30540 = (state_30554[(2)]);
var state_30554__$1 = state_30554;
var statearr_30575_30608 = state_30554__$1;
(statearr_30575_30608[(2)] = inst_30540);

(statearr_30575_30608[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (2))){
var state_30554__$1 = state_30554;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30554__$1,(4),in$);
} else {
if((state_val_30555 === (23))){
var inst_30548 = (state_30554[(2)]);
var state_30554__$1 = state_30554;
var statearr_30576_30609 = state_30554__$1;
(statearr_30576_30609[(2)] = inst_30548);

(statearr_30576_30609[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (19))){
var inst_30535 = (state_30554[(2)]);
var state_30554__$1 = state_30554;
var statearr_30577_30610 = state_30554__$1;
(statearr_30577_30610[(2)] = inst_30535);

(statearr_30577_30610[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (11))){
var inst_30520 = (state_30554[(7)]);
var inst_30506 = (state_30554[(11)]);
var inst_30520__$1 = cljs.core.seq.call(null,inst_30506);
var state_30554__$1 = (function (){var statearr_30578 = state_30554;
(statearr_30578[(7)] = inst_30520__$1);

return statearr_30578;
})();
if(inst_30520__$1){
var statearr_30579_30611 = state_30554__$1;
(statearr_30579_30611[(1)] = (14));

} else {
var statearr_30580_30612 = state_30554__$1;
(statearr_30580_30612[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (9))){
var inst_30542 = (state_30554[(2)]);
var inst_30543 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_30554__$1 = (function (){var statearr_30581 = state_30554;
(statearr_30581[(15)] = inst_30542);

return statearr_30581;
})();
if(cljs.core.truth_(inst_30543)){
var statearr_30582_30613 = state_30554__$1;
(statearr_30582_30613[(1)] = (21));

} else {
var statearr_30583_30614 = state_30554__$1;
(statearr_30583_30614[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (5))){
var inst_30498 = cljs.core.async.close_BANG_.call(null,out);
var state_30554__$1 = state_30554;
var statearr_30584_30615 = state_30554__$1;
(statearr_30584_30615[(2)] = inst_30498);

(statearr_30584_30615[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (14))){
var inst_30520 = (state_30554[(7)]);
var inst_30522 = cljs.core.chunked_seq_QMARK_.call(null,inst_30520);
var state_30554__$1 = state_30554;
if(inst_30522){
var statearr_30585_30616 = state_30554__$1;
(statearr_30585_30616[(1)] = (17));

} else {
var statearr_30586_30617 = state_30554__$1;
(statearr_30586_30617[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (16))){
var inst_30538 = (state_30554[(2)]);
var state_30554__$1 = state_30554;
var statearr_30587_30618 = state_30554__$1;
(statearr_30587_30618[(2)] = inst_30538);

(statearr_30587_30618[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30555 === (10))){
var inst_30509 = (state_30554[(9)]);
var inst_30507 = (state_30554[(10)]);
var inst_30514 = cljs.core._nth.call(null,inst_30507,inst_30509);
var state_30554__$1 = state_30554;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30554__$1,(13),out,inst_30514);
} else {
if((state_val_30555 === (18))){
var inst_30520 = (state_30554[(7)]);
var inst_30529 = cljs.core.first.call(null,inst_30520);
var state_30554__$1 = state_30554;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30554__$1,(20),out,inst_30529);
} else {
if((state_val_30555 === (8))){
var inst_30508 = (state_30554[(8)]);
var inst_30509 = (state_30554[(9)]);
var inst_30511 = (inst_30509 < inst_30508);
var inst_30512 = inst_30511;
var state_30554__$1 = state_30554;
if(cljs.core.truth_(inst_30512)){
var statearr_30588_30619 = state_30554__$1;
(statearr_30588_30619[(1)] = (10));

} else {
var statearr_30589_30620 = state_30554__$1;
(statearr_30589_30620[(1)] = (11));

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
});})(c__22536__auto__))
;
return ((function (switch__22474__auto__,c__22536__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__22475__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__22475__auto____0 = (function (){
var statearr_30593 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30593[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__22475__auto__);

(statearr_30593[(1)] = (1));

return statearr_30593;
});
var cljs$core$async$mapcat_STAR__$_state_machine__22475__auto____1 = (function (state_30554){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30554);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30594){if((e30594 instanceof Object)){
var ex__22478__auto__ = e30594;
var statearr_30595_30621 = state_30554;
(statearr_30595_30621[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30554);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30594;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30622 = state_30554;
state_30554 = G__30622;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__22475__auto__ = function(state_30554){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__22475__auto____1.call(this,state_30554);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__22475__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__22475__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto__))
})();
var state__22538__auto__ = (function (){var statearr_30596 = f__22537__auto__.call(null);
(statearr_30596[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto__);

return statearr_30596;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto__))
);

return c__22536__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(){
var G__30624 = arguments.length;
switch (G__30624) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(){
var G__30627 = arguments.length;
switch (G__30627) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(){
var G__30630 = arguments.length;
switch (G__30630) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__22536__auto___30680 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30680,out){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30680,out){
return (function (state_30654){
var state_val_30655 = (state_30654[(1)]);
if((state_val_30655 === (7))){
var inst_30649 = (state_30654[(2)]);
var state_30654__$1 = state_30654;
var statearr_30656_30681 = state_30654__$1;
(statearr_30656_30681[(2)] = inst_30649);

(statearr_30656_30681[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30655 === (1))){
var inst_30631 = null;
var state_30654__$1 = (function (){var statearr_30657 = state_30654;
(statearr_30657[(7)] = inst_30631);

return statearr_30657;
})();
var statearr_30658_30682 = state_30654__$1;
(statearr_30658_30682[(2)] = null);

(statearr_30658_30682[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30655 === (4))){
var inst_30634 = (state_30654[(8)]);
var inst_30634__$1 = (state_30654[(2)]);
var inst_30635 = (inst_30634__$1 == null);
var inst_30636 = cljs.core.not.call(null,inst_30635);
var state_30654__$1 = (function (){var statearr_30659 = state_30654;
(statearr_30659[(8)] = inst_30634__$1);

return statearr_30659;
})();
if(inst_30636){
var statearr_30660_30683 = state_30654__$1;
(statearr_30660_30683[(1)] = (5));

} else {
var statearr_30661_30684 = state_30654__$1;
(statearr_30661_30684[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30655 === (6))){
var state_30654__$1 = state_30654;
var statearr_30662_30685 = state_30654__$1;
(statearr_30662_30685[(2)] = null);

(statearr_30662_30685[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30655 === (3))){
var inst_30651 = (state_30654[(2)]);
var inst_30652 = cljs.core.async.close_BANG_.call(null,out);
var state_30654__$1 = (function (){var statearr_30663 = state_30654;
(statearr_30663[(9)] = inst_30651);

return statearr_30663;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30654__$1,inst_30652);
} else {
if((state_val_30655 === (2))){
var state_30654__$1 = state_30654;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30654__$1,(4),ch);
} else {
if((state_val_30655 === (11))){
var inst_30634 = (state_30654[(8)]);
var inst_30643 = (state_30654[(2)]);
var inst_30631 = inst_30634;
var state_30654__$1 = (function (){var statearr_30664 = state_30654;
(statearr_30664[(10)] = inst_30643);

(statearr_30664[(7)] = inst_30631);

return statearr_30664;
})();
var statearr_30665_30686 = state_30654__$1;
(statearr_30665_30686[(2)] = null);

(statearr_30665_30686[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30655 === (9))){
var inst_30634 = (state_30654[(8)]);
var state_30654__$1 = state_30654;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30654__$1,(11),out,inst_30634);
} else {
if((state_val_30655 === (5))){
var inst_30631 = (state_30654[(7)]);
var inst_30634 = (state_30654[(8)]);
var inst_30638 = cljs.core._EQ_.call(null,inst_30634,inst_30631);
var state_30654__$1 = state_30654;
if(inst_30638){
var statearr_30667_30687 = state_30654__$1;
(statearr_30667_30687[(1)] = (8));

} else {
var statearr_30668_30688 = state_30654__$1;
(statearr_30668_30688[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30655 === (10))){
var inst_30646 = (state_30654[(2)]);
var state_30654__$1 = state_30654;
var statearr_30669_30689 = state_30654__$1;
(statearr_30669_30689[(2)] = inst_30646);

(statearr_30669_30689[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30655 === (8))){
var inst_30631 = (state_30654[(7)]);
var tmp30666 = inst_30631;
var inst_30631__$1 = tmp30666;
var state_30654__$1 = (function (){var statearr_30670 = state_30654;
(statearr_30670[(7)] = inst_30631__$1);

return statearr_30670;
})();
var statearr_30671_30690 = state_30654__$1;
(statearr_30671_30690[(2)] = null);

(statearr_30671_30690[(1)] = (2));


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
});})(c__22536__auto___30680,out))
;
return ((function (switch__22474__auto__,c__22536__auto___30680,out){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30675 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_30675[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30675[(1)] = (1));

return statearr_30675;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_30654){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30654);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30676){if((e30676 instanceof Object)){
var ex__22478__auto__ = e30676;
var statearr_30677_30691 = state_30654;
(statearr_30677_30691[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30654);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30676;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30692 = state_30654;
state_30654 = G__30692;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_30654){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_30654);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30680,out))
})();
var state__22538__auto__ = (function (){var statearr_30678 = f__22537__auto__.call(null);
(statearr_30678[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30680);

return statearr_30678;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30680,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(){
var G__30694 = arguments.length;
switch (G__30694) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__22536__auto___30763 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30763,out){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30763,out){
return (function (state_30732){
var state_val_30733 = (state_30732[(1)]);
if((state_val_30733 === (7))){
var inst_30728 = (state_30732[(2)]);
var state_30732__$1 = state_30732;
var statearr_30734_30764 = state_30732__$1;
(statearr_30734_30764[(2)] = inst_30728);

(statearr_30734_30764[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (1))){
var inst_30695 = (new Array(n));
var inst_30696 = inst_30695;
var inst_30697 = (0);
var state_30732__$1 = (function (){var statearr_30735 = state_30732;
(statearr_30735[(7)] = inst_30697);

(statearr_30735[(8)] = inst_30696);

return statearr_30735;
})();
var statearr_30736_30765 = state_30732__$1;
(statearr_30736_30765[(2)] = null);

(statearr_30736_30765[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (4))){
var inst_30700 = (state_30732[(9)]);
var inst_30700__$1 = (state_30732[(2)]);
var inst_30701 = (inst_30700__$1 == null);
var inst_30702 = cljs.core.not.call(null,inst_30701);
var state_30732__$1 = (function (){var statearr_30737 = state_30732;
(statearr_30737[(9)] = inst_30700__$1);

return statearr_30737;
})();
if(inst_30702){
var statearr_30738_30766 = state_30732__$1;
(statearr_30738_30766[(1)] = (5));

} else {
var statearr_30739_30767 = state_30732__$1;
(statearr_30739_30767[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (15))){
var inst_30722 = (state_30732[(2)]);
var state_30732__$1 = state_30732;
var statearr_30740_30768 = state_30732__$1;
(statearr_30740_30768[(2)] = inst_30722);

(statearr_30740_30768[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (13))){
var state_30732__$1 = state_30732;
var statearr_30741_30769 = state_30732__$1;
(statearr_30741_30769[(2)] = null);

(statearr_30741_30769[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (6))){
var inst_30697 = (state_30732[(7)]);
var inst_30718 = (inst_30697 > (0));
var state_30732__$1 = state_30732;
if(cljs.core.truth_(inst_30718)){
var statearr_30742_30770 = state_30732__$1;
(statearr_30742_30770[(1)] = (12));

} else {
var statearr_30743_30771 = state_30732__$1;
(statearr_30743_30771[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (3))){
var inst_30730 = (state_30732[(2)]);
var state_30732__$1 = state_30732;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30732__$1,inst_30730);
} else {
if((state_val_30733 === (12))){
var inst_30696 = (state_30732[(8)]);
var inst_30720 = cljs.core.vec.call(null,inst_30696);
var state_30732__$1 = state_30732;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30732__$1,(15),out,inst_30720);
} else {
if((state_val_30733 === (2))){
var state_30732__$1 = state_30732;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30732__$1,(4),ch);
} else {
if((state_val_30733 === (11))){
var inst_30712 = (state_30732[(2)]);
var inst_30713 = (new Array(n));
var inst_30696 = inst_30713;
var inst_30697 = (0);
var state_30732__$1 = (function (){var statearr_30744 = state_30732;
(statearr_30744[(7)] = inst_30697);

(statearr_30744[(10)] = inst_30712);

(statearr_30744[(8)] = inst_30696);

return statearr_30744;
})();
var statearr_30745_30772 = state_30732__$1;
(statearr_30745_30772[(2)] = null);

(statearr_30745_30772[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (9))){
var inst_30696 = (state_30732[(8)]);
var inst_30710 = cljs.core.vec.call(null,inst_30696);
var state_30732__$1 = state_30732;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30732__$1,(11),out,inst_30710);
} else {
if((state_val_30733 === (5))){
var inst_30697 = (state_30732[(7)]);
var inst_30700 = (state_30732[(9)]);
var inst_30696 = (state_30732[(8)]);
var inst_30705 = (state_30732[(11)]);
var inst_30704 = (inst_30696[inst_30697] = inst_30700);
var inst_30705__$1 = (inst_30697 + (1));
var inst_30706 = (inst_30705__$1 < n);
var state_30732__$1 = (function (){var statearr_30746 = state_30732;
(statearr_30746[(12)] = inst_30704);

(statearr_30746[(11)] = inst_30705__$1);

return statearr_30746;
})();
if(cljs.core.truth_(inst_30706)){
var statearr_30747_30773 = state_30732__$1;
(statearr_30747_30773[(1)] = (8));

} else {
var statearr_30748_30774 = state_30732__$1;
(statearr_30748_30774[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (14))){
var inst_30725 = (state_30732[(2)]);
var inst_30726 = cljs.core.async.close_BANG_.call(null,out);
var state_30732__$1 = (function (){var statearr_30750 = state_30732;
(statearr_30750[(13)] = inst_30725);

return statearr_30750;
})();
var statearr_30751_30775 = state_30732__$1;
(statearr_30751_30775[(2)] = inst_30726);

(statearr_30751_30775[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (10))){
var inst_30716 = (state_30732[(2)]);
var state_30732__$1 = state_30732;
var statearr_30752_30776 = state_30732__$1;
(statearr_30752_30776[(2)] = inst_30716);

(statearr_30752_30776[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30733 === (8))){
var inst_30696 = (state_30732[(8)]);
var inst_30705 = (state_30732[(11)]);
var tmp30749 = inst_30696;
var inst_30696__$1 = tmp30749;
var inst_30697 = inst_30705;
var state_30732__$1 = (function (){var statearr_30753 = state_30732;
(statearr_30753[(7)] = inst_30697);

(statearr_30753[(8)] = inst_30696__$1);

return statearr_30753;
})();
var statearr_30754_30777 = state_30732__$1;
(statearr_30754_30777[(2)] = null);

(statearr_30754_30777[(1)] = (2));


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
});})(c__22536__auto___30763,out))
;
return ((function (switch__22474__auto__,c__22536__auto___30763,out){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30758 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30758[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30758[(1)] = (1));

return statearr_30758;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_30732){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30732);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30759){if((e30759 instanceof Object)){
var ex__22478__auto__ = e30759;
var statearr_30760_30778 = state_30732;
(statearr_30760_30778[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30732);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30759;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30779 = state_30732;
state_30732 = G__30779;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_30732){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_30732);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30763,out))
})();
var state__22538__auto__ = (function (){var statearr_30761 = f__22537__auto__.call(null);
(statearr_30761[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30763);

return statearr_30761;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30763,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(){
var G__30781 = arguments.length;
switch (G__30781) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__22536__auto___30854 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__22536__auto___30854,out){
return (function (){
var f__22537__auto__ = (function (){var switch__22474__auto__ = ((function (c__22536__auto___30854,out){
return (function (state_30823){
var state_val_30824 = (state_30823[(1)]);
if((state_val_30824 === (7))){
var inst_30819 = (state_30823[(2)]);
var state_30823__$1 = state_30823;
var statearr_30825_30855 = state_30823__$1;
(statearr_30825_30855[(2)] = inst_30819);

(statearr_30825_30855[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (1))){
var inst_30782 = [];
var inst_30783 = inst_30782;
var inst_30784 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_30823__$1 = (function (){var statearr_30826 = state_30823;
(statearr_30826[(7)] = inst_30784);

(statearr_30826[(8)] = inst_30783);

return statearr_30826;
})();
var statearr_30827_30856 = state_30823__$1;
(statearr_30827_30856[(2)] = null);

(statearr_30827_30856[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (4))){
var inst_30787 = (state_30823[(9)]);
var inst_30787__$1 = (state_30823[(2)]);
var inst_30788 = (inst_30787__$1 == null);
var inst_30789 = cljs.core.not.call(null,inst_30788);
var state_30823__$1 = (function (){var statearr_30828 = state_30823;
(statearr_30828[(9)] = inst_30787__$1);

return statearr_30828;
})();
if(inst_30789){
var statearr_30829_30857 = state_30823__$1;
(statearr_30829_30857[(1)] = (5));

} else {
var statearr_30830_30858 = state_30823__$1;
(statearr_30830_30858[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (15))){
var inst_30813 = (state_30823[(2)]);
var state_30823__$1 = state_30823;
var statearr_30831_30859 = state_30823__$1;
(statearr_30831_30859[(2)] = inst_30813);

(statearr_30831_30859[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (13))){
var state_30823__$1 = state_30823;
var statearr_30832_30860 = state_30823__$1;
(statearr_30832_30860[(2)] = null);

(statearr_30832_30860[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (6))){
var inst_30783 = (state_30823[(8)]);
var inst_30808 = inst_30783.length;
var inst_30809 = (inst_30808 > (0));
var state_30823__$1 = state_30823;
if(cljs.core.truth_(inst_30809)){
var statearr_30833_30861 = state_30823__$1;
(statearr_30833_30861[(1)] = (12));

} else {
var statearr_30834_30862 = state_30823__$1;
(statearr_30834_30862[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (3))){
var inst_30821 = (state_30823[(2)]);
var state_30823__$1 = state_30823;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30823__$1,inst_30821);
} else {
if((state_val_30824 === (12))){
var inst_30783 = (state_30823[(8)]);
var inst_30811 = cljs.core.vec.call(null,inst_30783);
var state_30823__$1 = state_30823;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30823__$1,(15),out,inst_30811);
} else {
if((state_val_30824 === (2))){
var state_30823__$1 = state_30823;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30823__$1,(4),ch);
} else {
if((state_val_30824 === (11))){
var inst_30787 = (state_30823[(9)]);
var inst_30791 = (state_30823[(10)]);
var inst_30801 = (state_30823[(2)]);
var inst_30802 = [];
var inst_30803 = inst_30802.push(inst_30787);
var inst_30783 = inst_30802;
var inst_30784 = inst_30791;
var state_30823__$1 = (function (){var statearr_30835 = state_30823;
(statearr_30835[(11)] = inst_30803);

(statearr_30835[(7)] = inst_30784);

(statearr_30835[(8)] = inst_30783);

(statearr_30835[(12)] = inst_30801);

return statearr_30835;
})();
var statearr_30836_30863 = state_30823__$1;
(statearr_30836_30863[(2)] = null);

(statearr_30836_30863[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (9))){
var inst_30783 = (state_30823[(8)]);
var inst_30799 = cljs.core.vec.call(null,inst_30783);
var state_30823__$1 = state_30823;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30823__$1,(11),out,inst_30799);
} else {
if((state_val_30824 === (5))){
var inst_30787 = (state_30823[(9)]);
var inst_30784 = (state_30823[(7)]);
var inst_30791 = (state_30823[(10)]);
var inst_30791__$1 = f.call(null,inst_30787);
var inst_30792 = cljs.core._EQ_.call(null,inst_30791__$1,inst_30784);
var inst_30793 = cljs.core.keyword_identical_QMARK_.call(null,inst_30784,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_30794 = (inst_30792) || (inst_30793);
var state_30823__$1 = (function (){var statearr_30837 = state_30823;
(statearr_30837[(10)] = inst_30791__$1);

return statearr_30837;
})();
if(cljs.core.truth_(inst_30794)){
var statearr_30838_30864 = state_30823__$1;
(statearr_30838_30864[(1)] = (8));

} else {
var statearr_30839_30865 = state_30823__$1;
(statearr_30839_30865[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (14))){
var inst_30816 = (state_30823[(2)]);
var inst_30817 = cljs.core.async.close_BANG_.call(null,out);
var state_30823__$1 = (function (){var statearr_30841 = state_30823;
(statearr_30841[(13)] = inst_30816);

return statearr_30841;
})();
var statearr_30842_30866 = state_30823__$1;
(statearr_30842_30866[(2)] = inst_30817);

(statearr_30842_30866[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (10))){
var inst_30806 = (state_30823[(2)]);
var state_30823__$1 = state_30823;
var statearr_30843_30867 = state_30823__$1;
(statearr_30843_30867[(2)] = inst_30806);

(statearr_30843_30867[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30824 === (8))){
var inst_30787 = (state_30823[(9)]);
var inst_30783 = (state_30823[(8)]);
var inst_30791 = (state_30823[(10)]);
var inst_30796 = inst_30783.push(inst_30787);
var tmp30840 = inst_30783;
var inst_30783__$1 = tmp30840;
var inst_30784 = inst_30791;
var state_30823__$1 = (function (){var statearr_30844 = state_30823;
(statearr_30844[(7)] = inst_30784);

(statearr_30844[(8)] = inst_30783__$1);

(statearr_30844[(14)] = inst_30796);

return statearr_30844;
})();
var statearr_30845_30868 = state_30823__$1;
(statearr_30845_30868[(2)] = null);

(statearr_30845_30868[(1)] = (2));


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
});})(c__22536__auto___30854,out))
;
return ((function (switch__22474__auto__,c__22536__auto___30854,out){
return (function() {
var cljs$core$async$state_machine__22475__auto__ = null;
var cljs$core$async$state_machine__22475__auto____0 = (function (){
var statearr_30849 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30849[(0)] = cljs$core$async$state_machine__22475__auto__);

(statearr_30849[(1)] = (1));

return statearr_30849;
});
var cljs$core$async$state_machine__22475__auto____1 = (function (state_30823){
while(true){
var ret_value__22476__auto__ = (function (){try{while(true){
var result__22477__auto__ = switch__22474__auto__.call(null,state_30823);
if(cljs.core.keyword_identical_QMARK_.call(null,result__22477__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__22477__auto__;
}
break;
}
}catch (e30850){if((e30850 instanceof Object)){
var ex__22478__auto__ = e30850;
var statearr_30851_30869 = state_30823;
(statearr_30851_30869[(5)] = ex__22478__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30823);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30850;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__22476__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30870 = state_30823;
state_30823 = G__30870;
continue;
} else {
return ret_value__22476__auto__;
}
break;
}
});
cljs$core$async$state_machine__22475__auto__ = function(state_30823){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__22475__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__22475__auto____1.call(this,state_30823);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__22475__auto____0;
cljs$core$async$state_machine__22475__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__22475__auto____1;
return cljs$core$async$state_machine__22475__auto__;
})()
;})(switch__22474__auto__,c__22536__auto___30854,out))
})();
var state__22538__auto__ = (function (){var statearr_30852 = f__22537__auto__.call(null);
(statearr_30852[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__22536__auto___30854);

return statearr_30852;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__22538__auto__);
});})(c__22536__auto___30854,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map