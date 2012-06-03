
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
//	rotateX: '+='+(0.5*Math.PI),
	height:"0px",marginTop:"50%"
      },300,function(){
	var cnt=cellContent();
	cdiv.html(cnt);
	cdiv.removeClass(state);
	cdiv.addClass(newState);
	cdiv.animate({
	//  rotateX: '-='+(0.5*Math.PI)
	  height:"100%",marginTop:"0px"
	},300);
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

  function setCorrectPosition(cell,x,y) {
    var padding=$(window).width()/100;

    var maxHeight,maxWidth;
    maxWidth=el.width();
    maxHeight=$(window).height()-el.offset().top;

    var cellWidth=maxWidth/model.w;
    var cellHeight=maxHeight/model.h;

    if(cellWidth>cellHeight)
      cellWidth=cellHeight;
    else
      cellHeight=cellWidth;

    var xdelta=(maxWidth-(cellWidth*model.w))/2.0;

    cell.css({width:""+(cellWidth-padding)+"px",height:cellHeight-padding,top:y*cellHeight,left:xdelta+x*cellWidth,position:'absolute'});


  }

  function createHtml() {
    var html=$("<div></div>");
    var x,y;
    for(y=0;y<model.h;y++) {
      for(x=0;x<model.w;x++) {
	var cell=$("<div class='cellParent'></td>");
	var cellView=new PlayfieldCellView(model.get(x,y),cell,self);
	cells.push(cellView);

	setCorrectPosition(cell,x,y);
	var f=function(px,py,pcell) {
	  $(window).resize(function() {
	    setCorrectPosition(pcell,px,py);
	  });
	};
	f(x,y,cell);
	html.append(cell);
      }
    }
    return html;
  }



  function createHtmlOld() {
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


