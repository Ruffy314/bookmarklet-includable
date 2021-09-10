# OM-Auftragsnummern als Barcodes
1. Beim Erstellen eines neuen Lesezeichens den Namen in etwas aussagekräftiges ändern.
2. Die URL durch folgenden Code ersetzen.
```
javascript:(function()%7Bconst md5 %3D "343429107d7cd7a41d679b0a0da46fcf"%3Bconst namespace %3D "bookmarklet_"%2Bmd5%3Bif (window%5Bnamespace%5D !%3D%3D undefined) %7Bconsole.log(namespace%2B" already loaded")%3Breturn%3B%7Dfunction callback() %7Bconsole.log("ESS D%2FN to barcode script loaded")%7Dvar s %3D document.createElement("script")%3Bvar antiCache %3D new Date()%3Bs.src %3D "https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FRuffy314%2Fbookmarklet-includable%2Fess%2Fdn-2-barcode%2Forder_numbers_as_barcode.min.js%3Fts%3D" %2B antiCache.getTime()%3Bif (s.addEventListener) %7Bs.addEventListener("load"%2C callback%2C false)%7D else if (s.readyState) %7Bs.onreadystatechange %3D callback%7Ddocument.head.appendChild(s)%7D)()
```
3. Das Lesezeichen in der Lesezeichenleiste speichern, oder später dorthin verschieben.

Falls die Lesezeichenleiste nicht angezeigt wird, `Strg + Umschalt + B`
