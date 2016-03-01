function Wrapper(el){
    this.el = el;
    this.isArray = el.length > 1 ? true : false
    //verkorte if/else
}

Wrapper.prototype.on = function(event, callback){
    if(this.isArray){
      for( var i=0; i<this.el.length; i++){
        this.el[i].addEventListener(event, callback);
      }
    }
    else{
      this.el[0].addEventListener(event, callback);
    }
}

Wrapper.prototype.css = function(prop, val){
    if (this.isArray){
      for( var i = 0; i<this.el.length; i++){
        this.el[i].style[prop] = val;
      }
    }
    else{
      this.el[0].style[prop] = val;
    }
    return this;
}

var $ = function(sel){
  // #todo1 .todo1 li

    console.log (typeof(sel));
    var elements = document.querySelectorAll(sel);
    return new Wrapper( elements );
}
