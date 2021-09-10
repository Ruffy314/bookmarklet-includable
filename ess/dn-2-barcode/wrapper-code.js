const md5 = "343429107d7cd7a41d679b0a0da46fcf";
const namespace = "bookmarklet_"+md5;
if (window[namespace] !== undefined) { 
  console.log(namespace+" already loaded");
  return;
}

function callback() {
    console.log("ESS D/N to barcode script loaded")
  }
var s = document.createElement("script");
var antiCache = new Date();
s.src = "https://cdn.jsdelivr.net/gh/Ruffy314/bookmarklet-includable/ess/dn-2-barcode/order_numbers_as_barcode.min.js?ts=" + antiCache.getTime();
if (s.addEventListener) {
  s.addEventListener("load", callback, false)
} else if (s.readyState) {
  s.onreadystatechange = callback
}
document.head.appendChild(s);
