// let body = window.document.getElementsByTagName('body');

class options {
  constructor( height = "10px", width = "10px", bg = 'red', fontSize = "5px;", textAlign = 'center' ){
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;

  }


  createDiv ( text, fontSize) {
    let div = document.createElement('div');
    div.className = "test";
    div.innerHTML = text;
    console.log(this);
    div.style.cssText = "font-size" +  ":" + this.fontSize;
    div.style.cssText += "background-color" +  ":" + this.bg;
    document.body.appendChild(div);
  }
}

let qwe = new options();