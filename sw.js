var __wpo = {"assets":{"main":["/budgeter/assets/fonts/MaterialIcons-Regular.eot","/budgeter/assets/fonts/MaterialIcons-Regular.woff2","/budgeter/assets/fonts/MaterialIcons-Regular.woff","/budgeter/assets/fonts/MaterialIcons-Regular.ttf","/budgeter/assets/fonts/Roboto-Regular.ttf","/budgeter/assets/images/logo.a6e31312.png","/budgeter/bundle.js","/budgeter/","/budgeter/browserconfig.xml","/budgeter/favicon.ico","/budgeter/icons/android-chrome-144x144.png","/budgeter/icons/android-chrome-192x192.png","/budgeter/icons/android-chrome-256x256.png","/budgeter/icons/android-chrome-36x36.png","/budgeter/icons/android-chrome-384x384.png","/budgeter/icons/android-chrome-48x48.png","/budgeter/icons/android-chrome-512x512.png","/budgeter/icons/android-chrome-72x72.png","/budgeter/icons/android-chrome-96x96.png","/budgeter/icons/apple-touch-icon.png","/budgeter/icons/favicon-16x16.png","/budgeter/icons/favicon-32x32.png","/budgeter/icons/mstile-150x150.png","/budgeter/icons/safari-pinned-tab.svg","/budgeter/manifest.json"],"additional":[],"optional":[]},"externals":[],"hashesMap":{"26fb8cecb5512223277b4d290a24492a0f09ede1":"/budgeter/assets/fonts/MaterialIcons-Regular.eot","09963592e8c953cc7e14e3fb0a5b05d5042e8435":"/budgeter/assets/fonts/MaterialIcons-Regular.woff2","c6c953c2ccb2ca9abb21db8dbf473b5a435f0082":"/budgeter/assets/fonts/MaterialIcons-Regular.woff","fc05de31234e0090f7ddc28ce1b23af4026cb1da":"/budgeter/assets/fonts/MaterialIcons-Regular.ttf","dd1b1db13ff1f72138c134c62f38fef83749f36a":"/budgeter/assets/fonts/Roboto-Regular.ttf","ca323df6641293e872c34bec3ac60962f3ad7e7c":"/budgeter/icons/android-chrome-144x144.png","4594c8b5f0c32e4e0e0526291a85e2136f500b2e":"/budgeter/bundle.js","a24ca4c2638cc57ba3dae1fe297566b7ea42070e":"/budgeter/","2537cc5630b6706bbabe458538c8a1500aadfd24":"/budgeter/browserconfig.xml","098034b395e1c1d1ec85722ae8d3c67d2ec00614":"/budgeter/favicon.ico","b2024ba9243a3ad0f07d86e4bdec5faf3172597c":"/budgeter/icons/android-chrome-192x192.png","59a2e88e81311a9d4d753ac2952aa2357c310548":"/budgeter/icons/android-chrome-256x256.png","dd47c825735da4610b80d98268d6dadefeff5144":"/budgeter/icons/android-chrome-36x36.png","c14638cb08aa1ccbc9b33770187240c8cf8a759e":"/budgeter/icons/android-chrome-384x384.png","b1a2d9ed03d064939a1302b109ba79cf9d5ae097":"/budgeter/icons/android-chrome-48x48.png","c16c5f7b7f9b03c0577939aedeaa8ff8c9a7d773":"/budgeter/icons/android-chrome-512x512.png","42091f28adbdc54b24e041026378396853640edf":"/budgeter/icons/android-chrome-72x72.png","8954ac8f9427348bf56827c36ec2a49f5c14e63d":"/budgeter/icons/android-chrome-96x96.png","33c4267eefdaaa30deff88dc8df56ae4ca1286d2":"/budgeter/icons/apple-touch-icon.png","bcd6e094f66fb546156f7385700e6bcb0443d636":"/budgeter/icons/favicon-16x16.png","6649bb743e3bbb0633bd7dfb6328f4432fd8055b":"/budgeter/icons/favicon-32x32.png","0387f19bff2536e087b85d895ded19fead75ae79":"/budgeter/icons/mstile-150x150.png","0fcc011d73ed876e6941327a0e38245c8feeed95":"/budgeter/icons/safari-pinned-tab.svg","d824eacd6d00c9a4c8824313061972e6e5601de8":"/budgeter/manifest.json"},"strategy":"changed","responseStrategy":"cache-first","version":"5/13/2017, 3:27:36 PM","name":"webpack-offline","pluginVersion":"4.7.0","relativePaths":false};

!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="/budgeter/",n(0)}([function(e,n,t){"use strict";function r(e,n){function t(){if(!R.additional.length)return Promise.resolve();var e=void 0;return e="changed"===q?c("additional"):r("additional"),e.catch(function(e){console.error("[SW]:","Cache section `additional` failed to load")})}function r(n){var t=R[n];return caches.open(E).then(function(n){return x(n,t,{bust:e.version,request:e.prefetchRequest})}).then(function(){f("Cached assets: "+n,t)}).catch(function(e){throw console.error(e),e})}function c(n){return l().then(function(t){if(!t)return r(n);var o=t[0],i=t[1],a=t[2],c=a.hashmap,u=a.version;if(!a.hashmap||u===e.version)return r(n);var s=Object.keys(c).map(function(e){return c[e]}),h=i.map(function(e){var n=new URL(e.url);return n.search="",n.toString()}),l=R[n],d=[],v=l.filter(function(e){return h.indexOf(e)===-1||s.indexOf(e)===-1});Object.keys(S).forEach(function(e){var n=S[e];if(l.indexOf(n)!==-1&&v.indexOf(n)===-1&&d.indexOf(n)===-1){var t=c[e];t&&h.indexOf(t)!==-1?d.push([t,n]):v.push(n)}}),f("Changed assets: "+n,v),f("Moved assets: "+n,d);var p=Promise.all(d.map(function(e){return o.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(E).then(function(n){var t=p.then(function(e){return Promise.all(e.map(function(e){return n.put(e[0],e[1])}))});return Promise.all([t,x(n,v,{bust:e.version,request:e.prefetchRequest})])})})}function h(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(U)&&0!==e.indexOf(E))return console.log("[SW]:","Delete cache:",e),caches.delete(e)});return Promise.all(n)})}function l(){return caches.keys().then(function(e){for(var n=e.length,t=void 0;n--&&(t=e[n],0!==t.indexOf(U)););if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(j,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}})}function d(){return caches.open(E).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:S}));return n.put(new URL(j,location).toString(),t)})}function v(e,n,t){return o(t,E).then(function(r){if(r)return r;var o=fetch(e.request).then(function(e){return e.ok?(t===n&&!function(){var t=e.clone();caches.open(E).then(function(e){return e.put(n,t)}).then(function(){console.log("[SW]:","Cache asset: "+n)})}(),e):e});return o})}function p(e,n,t){return fetch(e.request).then(function(e){if(e.ok)return e;throw new Error("Response is not ok")}).catch(function(){return o(t,E)})}function m(e){return e.catch(function(){}).then(function(e){var n=e&&e.ok,t=e&&"opaqueredirect"===e.type;return n||t&&!A?e:o(C,E)})}function g(){Object.keys(R).forEach(function(e){R[e]=R[e].map(function(e){var n=new URL(e,location);return P.indexOf(e)===-1?n.search="":n.hash="",n.toString()})}),Object.keys(L).forEach(function(e){L[e]=L[e].map(function(e){var n=new URL(e,location);return P.indexOf(e)===-1?n.search="":n.hash="",n.toString()})}),S=Object.keys(S).reduce(function(e,n){var t=new URL(S[n],location);return t.search="",e[n]=t.toString(),e},{}),P=P.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()})}function x(e,n,t){var r=t.allowLoaders!==!1,o=t&&t.bust,a=t.request||{credentials:"omit",mode:"cors"};return Promise.all(n.map(function(e){return o&&(e=i(e,o)),fetch(e,a).then(u)})).then(function(o){if(o.some(function(e){return!e.ok}))return Promise.reject(new Error("Wrong response status"));var i=[],a=o.map(function(t,o){return r&&i.push(O(n[o],t)),e.put(n[o],t)});return i.length?!function(){var r=s(t);r.allowLoaders=!1;var o=a;a=Promise.all(i).then(function(t){var i=[].concat.apply([],t);return n.length&&(o=o.concat(x(e,i,r))),Promise.all(o)})}():a=Promise.all(a),a})}function O(e,n){var t=Object.keys(L).map(function(t){var r=L[t];if(r.indexOf(e)!==-1&&w[t])return w[t](n.clone())}).filter(function(e){return!!e});return Promise.all(t).then(function(e){return[].concat.apply([],e)})}function k(e){var n=e.url,t=new URL(n),r=void 0;r="navigate"===e.mode?"navigate":t.origin===location.origin?"same-origin":"cross-origin";for(var o=0;o<y.length;o++){var i=y[o];if(i&&(!i.requestTypes||i.requestTypes.indexOf(r)!==-1)){var a=void 0;if(a="function"==typeof i.match?i.match(t,e):n.replace(i.match,i.to),a&&a!==n)return a}}}var w=n.loaders,y=n.cacheMaps,q=e.strategy,b=e.responseStrategy,R=e.assets,L=e.loaders||{},S=e.hashesMap,P=e.externals,U=e.name,W=e.version,E=U+":"+W,j="__offline_webpack__data";g();var _=[].concat(R.main,R.additional,R.optional),C=e.navigateFallbackURL,A=e.navigateFallbackForRedirects;self.addEventListener("install",function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===q?c("main"):r("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){console.log("[SW]:","Activate event");var n=t();n=n.then(d),n=n.then(h),n=n.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),e.waitUntil(n)}),self.addEventListener("fetch",function(e){var n=e.request.url,t=new URL(n),r=void 0;P.indexOf(n)!==-1?r=n:(t.search="",r=t.toString());var o="GET"===e.request.method,i=_.indexOf(r)!==-1,c=r;if(!i){var u=k(e.request);u&&(c=u,i=!0)}if(!i&&o&&C&&a(e.request))return void e.respondWith(m(fetch(e.request)));if(!i||!o)return void(t.origin!==location.origin&&navigator.userAgent.indexOf("Firefox/44.")!==-1&&e.respondWith(fetch(e.request)));var s=void 0;s="network-first"===b?p(e,r,c):v(e,r,c),C&&a(e.request)&&(s=m(s)),e.respondWith(s)}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}function o(e,n){return caches.match(e,{cacheName:n}).then(function(t){return c()?t:u(t).then(function(t){return caches.open(n).then(function(n){return n.put(e,t)}).then(function(){return t})})}).catch(function(){})}function i(e,n){var t=e.indexOf("?")!==-1;return e+(t?"&":"?")+"__uncache="+encodeURIComponent(n)}function a(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||(e.headers.get("Accept")||"").indexOf("text/html")!==-1}function c(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function u(e){if(c(e))return Promise.resolve(e);var n="body"in e?Promise.resolve(e.body):e.blob();return n.then(function(n){return new Response(n,{headers:e.headers,status:e.status})})}function s(e){return Object.keys(e).reduce(function(n,t){return n[t]=e[t],n},{})}function f(e,n){console.groupCollapsed("[SW]:",e),n.forEach(function(e){console.log("Asset:",e)}),console.groupEnd()}r(__wpo,{loaders:{},cacheMaps:[]}),e.exports=t(1)},function(e,n){}]);