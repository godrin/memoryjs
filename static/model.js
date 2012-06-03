var PlayfieldCellModel=function(pos,name,img) {
  this.pos=pos;
  this.name=name;
  this.img=img;
  this.state="closed";

  this.changed=new Signal();

  this.begin=function() {
    this.created.call();
  };
  this.open=function() {
    if(this.state=="closed") {
      this.state="opened";
      this.changed.call();
      return true;
    }
    return false;
  };
  this.close=function() {
    if(this.state=="opened") {
      this.state="closed";
      this.changed.call();
      return true;
    }
    return false;
  };
  this.hide=function() {
    if(this.state=="opened") {
      this.state="hidden";
      this.changed.call();
      return true;
    }
    return false;
  };
};

var PlayfieldWorldModel=function(w,h) {
  this.cells=[];
  var cards=[];
  var x,y,i;
  var fields;

  for(i=0;i<w*h/2;i++) {
    cards.push({name:i,img:i});
  }
  fields=cards.shallowCopy();
  fields.pushAll(cards);
  fields.shuffle();
  for(x=0;x<w;x++) {
    for(y=0;y<h;y++) {
      var field=fields[y*w+x];
      this.cells.push(new PlayfieldCellModel(new Position(x,y),field.name,field.img));
    }
  }
  this.w=w;
  this.h=h;
  this.withState=function(state,equal) {
    if(equal===null)
      equal=true;
    return $.grep(this.cells,function(v,k) { return (v.state==state)===equal; });
  };

  this.finished=function() {
    return this.withState("finished",false).length==0;
  };
  this.opened=function() {
    return this.withState("opened");
  };
  this.begin=function() {
    $.each(this.cells,function(k,v) {v.begin();});
  }
  this.get=function(x,y) {
    return this.cells[x+y*w];
  };
};

