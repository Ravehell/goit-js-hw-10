import"./assets/styles-385c42ef.js";import{i as o}from"./assets/vendor-651d7991.js";const l=document.querySelector(".form");function n(s){s.preventDefault();const t=document.getElementsByName("delay")[0].value,m=document.querySelectorAll('input[name="state"]');let i;Array.from(m).forEach(e=>{e.checked&&(i=e.value)}),new Promise((e,r)=>{(isNaN(t)||t>=0)&&setTimeout(()=>{i==="fulfilled"?e(t):r(t)},t)}).then(e=>{o.show({title:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{o.show({title:`❌ Rejected promise in ${e}ms`,position:"topRight"})})}l.addEventListener("submit",n);
//# sourceMappingURL=commonHelpers2.js.map
