function Signaling(){
    this.candidate=[];
    this.onAnswerSDP;
    this.sdpOffer;
}
Signaling.prototype = new EventEmitter();
Signaling.prototype.onMessage = function(e,fn){

    this.on(e,fn);
    console.log("on--->"+JSON.stringify(e));
}
Signaling.prototype.emitMessage = function(e,v){
    this.emit(e,v);

    if(e=="candidate"){
        this.candidate.push(v)
    }else if(e=="sdpAnswer"){
        this.onAnswerSDP = v
    }else if(e=="sdpOffer"){
        this.sdpOffer = v
    }
    console.log(JSON.stringify(e)+"---emit--->"+JSON.stringify(v));
}