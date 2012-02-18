
var PlayFieldController=function(model,view)  {
};
$(function() {
  var el=$("#playfield");
  console.log("EL",el);
  var model=new PlayfieldWorldModel(4,5);
  var view=new PlayfieldView(el,model);
  var cntrl=new PlayFieldController(model,view);

  $.each(view.getCells(),function(k,cell) {
    cell.clicked.add(this,function(self){
      if(cell.model.state=="closed") {
	cell.model.open();
	var ws=model.withState("opened",true);
	console.log("ws",ws);
	if(ws.length==2) {
	  view.block(true);
	  setTimeout(function() {
	    console.log("TIM",ws);
	    if(ws[0].name==ws[1].name) {
	      console.log("HIde");
	      ws[0].hide();
	      ws[1].hide();
	    } else {
	      console.log("clsoe");
	      ws[0].close();
	      ws[1].close();
	    }
	    view.block(false);
	  },500);
	}
      }
    });
  }); 
});


