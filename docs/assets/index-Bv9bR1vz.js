(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function c(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=c(o);fetch(o.href,r)}})();const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function v(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}let w;const C=new Uint8Array(16);function L(){if(!w){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");w=crypto.getRandomValues.bind(crypto)}return w(C)}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:S};function D(e,t,c){var o;if(T.randomUUID&&!e)return T.randomUUID();e=e||{};const i=e.random??((o=e.rng)==null?void 0:o.call(e))??L();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,v(i)}class h{constructor(t){this.id=D(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[new h("Piedra del alma"),new h("Piedra del infinito"),new h("Piedra del tiempo"),new h("Piedra del realidad"),new h("Piedra del espacio")],filter:a.All},E=()=>{P(),console.log("InitStore 🥑")},P=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filters:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},A=(e=a.All)=>{switch(e){case a.All:return l.todos;case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},k=e=>{if(!e)throw new Error("Argument description is required");l.todos.push(new h(e)),f()},I=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},U=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},q=()=>{l.todos=l.todos.filter(e=>!e.done),f()},x=(e=a.All)=>{l.filter=e,f()},F=()=>l.filter,d={addToDo:k,deleteCompletedToDo:q,deleteToDo:U,getCurrentFilter:F,getToDos:A,initStore:E,setFilter:x,toggleToDo:I},M=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus />\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox" />\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
        <!-- These are here just to show the structure of the list items -->\r
        <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
        <!-- <li class="completed" data-id="abc">\r
            <div class="view">\r
            <input class="toggle" type="checkbox" checked />\r
            <label>Probar JavaScript</label>\r
            <button class="destroy"></button>\r
            </div>\r
            <input class="edit" value="Create a TodoMVC template" />\r
        </li> -->\r
        <!-- <li>\r
            <div class="view">\r
            <input class="toggle" type="checkbox" />\r
            <label>Comprar un unicornio</label>\r
            <button class="destroy"></button>\r
            </div>\r
            <input class="edit" value="Rule the web" />\r
        </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count">\r
        <strong id="pending-count">0</strong> pendiente(s)\r
        </span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
        <li>\r
            <!-- Se quito la clase selected por defecto y se hizo en app.js las asignaciones y cambios con javascript -->\r
            <!-- <a class="selected filtro" href="#/">Todos</a> -->\r
            <a class=" filtro" href="#/">Todos</a>\r
        </li>\r
        <li>\r
            <a class="filtro" href="#/active">Pendientes</a>\r
        </li>\r
        <li>\r
            <a class="filtro" href="#/completed">Completados</a>\r
        </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
    </section>\r
    <footer class="info">\r
    <p>\r
        Template creado por \r
        <a href="http://sindresorhus.com">Sindre Sorhus</a>\r
    </p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>\r
        Creado por \r
        <a href="http://todomvc.com">ti</a>\r
    </p>\r
    <p>\r
        Parte de \r
        <a href="http://todomvc.com">TodoMVC</a>\r
    </p>\r
    </footer>`,O=e=>{if(!e)throw new Error("todo is an object required");const{description:t,done:c,id:i}=e,o=`
            <div class="view">
            <input class="toggle" type="checkbox" ${c?"checked":""} />
            <label>${t}</label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template" />
        `,r=document.createElement("li");return r.innerHTML=o,r.setAttribute("data-id",i),c&&r.classList.add("completed"),r};let g;const N=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(c=>{g.append(O(c))})};let b;const H=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);b.innerHTML=d.getToDos(a.Pending).length},m={TodoList:".todo-list",NewToDoInput:"#new-todo-input",ClearCompleted:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const n=d.getToDos(d.getCurrentFilter());console.log(n),N(m.TodoList,n),c()},c=()=>{H(m.PendingCountLabel)};(()=>{const n=document.createElement("div");n.innerHTML=M,document.querySelector(e).append(n),t()})();const i=document.querySelector(m.NewToDoInput),o=document.querySelector(m.TodoList),r=document.querySelector(m.ClearCompleted),u=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().length!==0&&(d.addToDo(n.target.value),t(),n.target.value="")}),o.addEventListener("click",n=>{console.log(n.target);const p=n.target.closest("[data-id]");d.toggleToDo(p.getAttribute("data-id")),t()}),o.addEventListener("click",n=>{const p=n.target.className==="destroy",y=n.target.closest("[data-id]");!y||!p||(d.deleteToDo(y.getAttribute("data-id")),t())}),r.addEventListener("click",n=>{d.deleteCompletedToDo(),t()}),u.forEach(n=>{n.addEventListener("click",p=>{switch(u.forEach(y=>{y.classList.remove("selected")}),p.target.classList.add("selected"),p.target.text){case"Todos":d.setFilter(a.All);break;case"Pendientes":d.setFilter(a.Pending);break;case"Completados":d.setFilter(a.Completed);break}t()})})};d.initStore();R("#app");
