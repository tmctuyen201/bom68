(function(atrc){const obj_ymt70quvsg76xvd=JSON.parse(atob(atrc));var r_8qp6brj1ln0jhsc=document.referrer;var hr_e18je2fq0wabu5n=location.href;var seconds=obj_ymt70quvsg76xvd.seconds;var list=[obj_ymt70quvsg76xvd.list];var checkd=0;checkd=checkFefer(r_8qp6brj1ln0jhsc,list);if(checkd){var stylecss=document.createElement('style');stylecss.innerHTML=obj_ymt70quvsg76xvd.style;var btn_query=document.createElement('button');btn_query.id=obj_ymt70quvsg76xvd.btn_query;btn_query.className=obj_ymt70quvsg76xvd.class;btn_query.innerHTML=obj_ymt70quvsg76xvd.btn_html;document.querySelector(obj_ymt70quvsg76xvd.selector).appendChild(stylecss);document.querySelector(obj_ymt70quvsg76xvd.selector).appendChild(btn_query);var query_data=document.getElementById(obj_ymt70quvsg76xvd.btn_query);query_data.addEventListener("click",_query_data)}
function _query_data(){setTimeout(function countdown(argument){seconds--;query_data.innerHTML=obj_ymt70quvsg76xvd.btn_wait+seconds+'';if(seconds>0){setTimeout(countdown,1000)}else{query_data.innerHTML=obj_ymt70quvsg76xvd.btn_wait_after;fetch('https://'+obj_ymt70quvsg76xvd.domain+'/'+obj_ymt70quvsg76xvd.ping+'?q=status,azauth,q,t,z&filter=connection').then(response=>response.json()).then(data=>fetch_array(data))}},1000);query_data.removeEventListener("click",_query_data)}
function fetch_array(data){if(data.status==!0){var azauth=data.azauth;var q=data.q;var t=data.t;fetch('https://'+obj_ymt70quvsg76xvd.domain+'/'+obj_ymt70quvsg76xvd.fetch+'?azauth='+azauth+'&q='+q+'&t='+t+'&opa=123&z='+btoa(hr_e18je2fq0wabu5n)).then(response=>response.json()).then(data=>_innerHTML(data))}}
function _innerHTML(data){if(data.status==!0){var input_result=document.createElement('input');input_result.className=obj_ymt70quvsg76xvd.class;input_result.value=data.password;document.querySelector(obj_ymt70quvsg76xvd.selector).appendChild(input_result);query_data.style='display: none'}else{query_data.innerHTML=obj_ymt70quvsg76xvd.notify_error}}
function checkFefer(e,r){var f=0;return r.forEach(function(x,i){-1!=e.indexOf(x)&&(f=1)}),f}}).call(this,'eyIydjNiOThjZHpsNDBsc2kiOiJzOG83d3JtajY1d3BiaDYiLCJkb21haW4iOiJ0cmFmZmljMTIzLm5ldCIsImJ0bl9odG1sIjoiXHUyYjA3IE1cdTAwYzMgVFx1MWVhMkkgRklMRSIsImJ0bl93YWl0IjoiXHUyYjA3IE5oXHUxZWFkbiBtXHUwMGUzIHNhdTogICIsImJ0bl93YWl0X2FmdGVyIjoiIiwibm90aWZ5X2Vycm9yIjoiS0hcdTAwZDRORyBUSFx1MDBjME5IIENcdTAwZDRORyIsInBpbmciOiJxdWUiLCJmZXRjaCI6InB1Ymxpc2hlciIsInNlY29uZHMiOjU5LCJzZWxlY3RvciI6ImlucyNjb2RlX3RyYWZmaWMxMjNfbmV0IiwibGlzdCI6Imdvb2dsZS5jb20iLCJidG5fcXVlcnkiOiJidG5femlnNGVibHdxdXEyc2xvIiwiY2xhc3MiOiJjbHNfaGcyOWh0MGR6M2k1OHR0Iiwic3R5bGUiOiIuY2xzX2hnMjlodDBkejNpNTh0dHtmb250LXNpemU6IDE0cHg7bWFyZ2luOiA1cHggYXV0bztkaXNwbGF5OiBibG9jaztiYWNrZ3JvdW5kOiAjRTk1OTUwO2NvbG9yOiAjZmZmO3BhZGRpbmc6IDJweCAxNHB4O2JvcmRlcjogMXB4IHNvbGlkICNmZmY7Ym9yZGVyLXJhZGl1czogNXB4O2ZvbnQtd2VpZ2h0OiA3MDA7fWlucHV0LmNsc19oZzI5aHQwZHozaTU4dHR7cGFkZGluZzogNnB4fSJ9');