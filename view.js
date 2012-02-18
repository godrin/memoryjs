
var PlayfieldCellView=function(cellModel,parentEl,parentView) {
  var self=this;
  var state=cellModel.state;

  this.model=cellModel;

  function cellContent() {
    if(cellModel.state=="closed")
      return "&nbsp;";
    else
      return "<img src='pics/img"+cellModel.img+".png'/>";
  }

  function setMode(newState) {
    var cdiv=$(self.el);
    if(newState!=state)
    {
      cdiv.animate({
	rotateX: '+='+(0.5*Math.PI),
      },300,function(){
	var cnt=cellContent();
	cdiv.html(cnt);
	cdiv.removeClass(state);
	cdiv.addClass(newState);
	cdiv.animate({rotateX: '-='+(0.5*Math.PI)},300);
	state=newState
      });
    }
  }

  cellModel.changed.add(this,function(pself) {
    setMode(cellModel.state);
  });

  this.cellId=function() {
    return "cell_"+cellModel.x+"_"+cellModel.y;
  };

  this.clicked=new Signal();

  function createHtml() {
    self.el=$("<div class='cell' id='"+this.cellId+"'>");
    self.el.append(cellContent());
    self.el.click(function(){
      if(parentView.blocked()){
	return false;
      }
      self.clicked.call();
      return false;
    }); 
  };

  createHtml();
  $(parentEl).append(self.el);
};

var PlayfieldView=function(el,model) {
  var self=this;
  var cells=[];
  var blocked=false;

  function createHtml() {
    var x,y;
    var html=$("<table></table>");
    for(y=0;y<model.h;y++) {
      var tr=$("<tr></tr>");
      tr.append($("<td></td>"));
      for(x=0;x<model.w;x++) {
	var td=$("<td class='cellParent'></td>");

	var cellView=new PlayfieldCellView(model.get(x,y),td,self);
	cells.push(cellView);
	tr.append(td);
      }
      tr.append($("<td></td>"));

      html.append(tr);
    }
    return html;
  }
  var x=createHtml();
  $(el).append(x);
  this.getCells=function() {
    return cells;
  };
  this.block=function(flag) {
    blocked=flag;
  };
  this.blocked=function() {
    return blocked;
  };
};


