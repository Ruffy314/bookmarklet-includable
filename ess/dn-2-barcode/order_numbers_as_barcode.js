(function(){
  /*create global state if necessary, 343429107d7cd7a41d679b0a0da46fcf is MD5 of "order_numbers_as_barcode.js"*/
  const md5 = "343429107d7cd7a41d679b0a0da46fcf";
  const namespace = "bookmarklet_"+md5;
  const classname = 
  {
    barcode: "barcode-"+md5,
    invisible: "invisible-"+md5,
    button:"bc-button-"+md5,
    overlay: "bc-overlay-"+md5
  };
  if (window[namespace] === undefined) { window[namespace] = {};}
  const state = window[namespace];

  mainCode();
  addButtonToPage();

  function mainCode(){
    const orders = getOrdersFromSelection();
    addBcStyle();
    if (orders.length > 0) {
      writeOrdersToClipboard(orders);
      displayOverlay(orders);
    }
  }

  function writeOrdersToClipboard(orders) {
    const txt = orders.join("\n");
    if (txt) {
      navigator.clipboard.writeText(txt).then(
        () => console.log("copy to clipboard success"),
        o => alert("copy to clipboard fail\n" + o)
      );
    }
  }

  function getOrdersFromSelection() {
    const sel = window.getSelection().toString();
    if (sel.match(/(?:13|49|50|51|52)\d{5}/)) {
      const m = sel.matchAll(/(?:13|49|50|51|52)\d{5}/g);
      return ([...m]).map(r => r[0]);
    } else if (sel.match(/0*7\d{8}/)) {
      const m = sel.matchAll(/0*(7\d{8})/g);
      return ([...m]).map(r => r[1]);
    } else {
      return [];
    }
  }

  function displayOverlay(orders) {
    const over = document.createElement("div");
    over.classList.add(classname.overlay);
    over.addEventListener("mousedown", e=>e.preventDefault());
    const closer = document.createElement("div");
    closer.addEventListener("mousedown", e=>{e.preventDefault(); overlayTimeout(100)});
    closer.innerHTML = `<p class='${classname.button}' style='font-size:2em; color:red;'><b>&times;</b></p>`;
    over.appendChild(closer);
    document.body.appendChild(over);
    for (const orderNum of orders) {
      const row = document.createElement("row");
      over.appendChild(row);
      const overtxt = document.createElement("cel");
      row.appendChild(overtxt);
      overtxt.style="color: violet";
      overtxt.innerText = orderNum + " ";
      overtxt.addEventListener("mousedown", hideOtherCodes);
      const code = document.createElement("cel");
      row.appendChild(code);
      code.innerText = text2code128(orderNum);
      code.classList.add(classname.barcode);
    }
    /*overlayTimeout(15000);*/
    state.overlayNode = over;
  }

  function hideOtherCodes(ev) {
    /*hide all code exept clicked. on ctrl-click toggle that codes visibility. on shift-click show all*/
    ev.preventDefault();
    const node = ev.target;
    const codeCell = node.nextSibling;
    if (ev.ctrlKey) {
      codeCell.classList.toggle(classname.invisible);
    } else {
      const allCodes = document.getElementsByClassName(classname.barcode);
      for (const el of allCodes) {
        if (ev.shiftKey) {
          el.classList.remove(classname.invisible);
        } else {
          el.classList.add(classname.invisible);
        }
      }
      codeCell.classList.remove(classname.invisible);
    }
  }

  function overlayTimeout(ms = 1000) {
    const delay = state.timeoutDelay || ms;
    state.timeoutDelay = delay;
    if (state.overlayTimer) {
      clearTimeout(state.overlayTimer);
    }
    state.overlayTimer = setTimeout(()=>{state.overlayNode.remove();}, delay);
  }

  function addBcStyle() {
    if (!state.barcodeStyleAdded) {
      const barcodeFont = document.createElement("style");
      barcodeFont.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');";
      barcodeFont.id = "barcodeFont-"+md5;
      document.body.appendChild(barcodeFont);
      state.barcodeFont = barcodeFont;
      updateBarcodeStyle();
      state.barcodeStyleAdded = true;
    } /*else {updateBarcodeStyle();}*/
    
    function updateBarcodeStyle(){
      const oldNode = state.barcodeStyle;
      if (oldNode) {oldNode.remove();}
      const barcodeStyle = document.createElement("style");
      barcodeStyle.innerHTML = 
      `.${classname.barcode} {font-family: 'Libre Barcode 128 Text', cursive; color: black; background-color: white; padding: 0.1em; font-size: 4em} \n 
      row{border:1px solid black} \n 
      .${classname.invisible} {display: none;} \n
      .${classname.button} {height: 60px; width: 60px; font-size: 1em; font-weight: bold; border-radius: 33%; background-color: #4a6bd4b3; color: white; text-align: center; cursor: pointer; position: fixed; top: 250px; right: 60px;}
      .${classname.overlay} {color: white; position: fixed; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 2; cursor: pointer;}
      `;
      barcodeStyle.id = "barcodeStyle-"+md5;
      document.body.appendChild(barcodeStyle);
      state.barcodeStyle = barcodeStyle;
    }
  }

  function text2code128(str) {
    /*
    * Generate and return code128 string.
    */
    const codeBStart = String.fromCharCode(104+100); /* 104 = Type B start → Ì*/
    const codeEnd = String.fromCharCode(106+100); /* → Î*/
    let total = 104;
    /*weighted sum, position*charVal */
    for(let i=0, len=str.length;i<len;i++){
      total += ((i+1) * (str.charCodeAt(i)-32)); 
    }
    
    let modVal = total % 103;
    if ((modVal+32)>126) {modVal +=68}; /*deal with 95→105*/
    const checkChar   = String.fromCharCode(modVal+32);
    return codeBStart + str + checkChar + codeEnd;
  }

  function addButtonToPage() {
    if (!state.buttonAdded) {
      const btn = document.createElement("div");
      btn.innerText = "D/N Barcode";
      btn.classList.add(classname.button);
      /*activate when clicked with left mouse button, keep selection from unselecting*/
      btn.addEventListener("mousedown", e=>{if (e.button===0){e.preventDefault(); mainCode();}});
      document.body.appendChild(btn);
      state.buttonAdded = true;
    }
  }
})();