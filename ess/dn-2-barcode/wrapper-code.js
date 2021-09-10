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
