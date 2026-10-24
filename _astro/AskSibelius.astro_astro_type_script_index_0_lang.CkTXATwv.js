import{i as e,n as t,r as n,t as r}from"./retrieve.Co4IUNcQ.js";var i=document.querySelector(`[data-ask-ai]`);if(i){let a=i.querySelector(`[data-ask-form]`),o=i.querySelector(`[data-ask-input]`),s=i.querySelector(`[data-ask-answer]`),c,l={note:`Note`,answer:`Answer`,writing:`Post`,reading:`Reading`},u=e=>e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),d=e=>`
      <li class="ask-ai-result">
        <p class="ask-ai-meta">${l[e.kind]??``}${e.heading?` · ${u(e.heading)}`:``}</p>
        <a class="ask-ai-link" href="${u(e.url)}">${u(e.title)}</a>
        ${e.kind===`writing`?``:`<p class="ask-ai-snippet">${u(e.snippet)}</p>`}
      </li>`,f=(e,n,r,i)=>`<p class="ask-ai-send"><a class="button ${i?`button-primary`:`button-ghost`}" href="${u(t(e,n))}" target="_blank" rel="noopener">${r}</a></p>`;async function p(a){s.hidden=!1,s.innerHTML=`<p class="ask-ai-lead">Looking through my notes…</p>`;try{c??=r((await(await fetch(i.dataset.index)).json()).passages)}catch{s.innerHTML=`<p class="ask-ai-lead">Could not load my notes right now</p>${f(a,[],`Send it to me on GitHub`,!0)}`;return}let o=e(c,a);o.status===`needs_clarification`?s.innerHTML=`<p class="ask-ai-lead">Ask with a few more words</p><p>What do you want to learn, build or decide?</p>`:o.status===`ready`?s.innerHTML=`
          <p class="ask-ai-lead">I wrote about this</p>
          <p>Start here:</p>
          <ol class="ask-ai-results" role="list">${o.results.map(d).join(``)}</ol>
          ${o.reading.length?`<p>Links I shared on it:</p><ol class="ask-ai-results" role="list">${o.reading.map(d).join(``)}</ol>`:``}
          <p>Not what you needed? What else?</p>
          ${f(a,o.results,`Send the question to me`,!1)}`:s.innerHTML=`
          <p class="ask-ai-lead">I have not written about this yet</p>
          <p>Send it to me and I answer it in public, right here on this page</p>
          <p class="ask-ai-send ask-ai-buttons">
            <a class="button button-primary" href="${u(t(a,[]))}" target="_blank" rel="noopener">Send the question to me</a>
            <a class="button button-ghost" href="${u(n(a,`Ask Sibelius on /ask`))}" target="_blank" rel="noopener">Ask me to write about it</a>
          </p>
          ${o.results.length?`<p>The closest I have:</p><ol class="ask-ai-results" role="list">${o.results.map(d).join(``)}</ol>`:``}`}a.addEventListener(`submit`,e=>{e.preventDefault();let t=o.value.trim();t&&(history.replaceState(null,``,`?q=${encodeURIComponent(t)}#ask-ai-title`),p(t))});let m=new URLSearchParams(location.search).get(`q`);m&&(o.value=m,p(m))}