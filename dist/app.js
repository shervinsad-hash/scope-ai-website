const CONFIG=Object.freeze({brand:'Scope AI',productionUrl:'https://scopeai.ca',contactEmail:'info@scopeai.ca'});
const parts=[
{title:'Model',purpose:'Interprets information, reasons and proposes actions. Choose reasoning only where it improves the work.',example:'Suggest missing acceptance criteria using a story and its supporting requirements.',question:'What decision needs reasoning—and what should remain deterministic?'},
{title:'Harness & orchestration',purpose:'Coordinates the workflow or agent loop: context, state, tool calls, retries and continuation.',example:'Gather a Jira story, request analysis, pause for BA approval, then resume the approved update.',question:'What happens when the agent is uncertain or a tool fails?'},
{title:'Secure runtime',purpose:'Provides controlled execution, isolation and enforceable access boundaries for the solution.',example:'Run an agent with scoped credentials and restrict the systems and records it can access.',question:'Which boundaries must be enforced outside the model?'},
{title:'Knowledge & context',purpose:'Supplies enterprise data, business rules, procedures, instructions and relevant memory.',example:'Retrieve current policy and approved case records with traceable sources.',question:'What information can be trusted, and how do we know it is current?'},
{title:'Tools & actions',purpose:'Connects the agent to systems to retrieve information or perform authorized work.',example:'Read a record, prepare a change and publish an update only after the required approval.',question:'What action is permitted, and what requires a person’s approval?'}];
function partHTML(p,i){return `<span class="tag">COMPONENT 0${i+1} / 05</span><h3>${p.title}</h3><p>${p.purpose}</p><h4>AN ENTERPRISE EXAMPLE</h4><p>${p.example}</p><h4>THE DESIGN QUESTION</h4><p class="design-q">${p.question}</p>`}
function selectPart(i){document.getElementById('arch-detail').innerHTML=partHTML(parts[i],i);document.querySelectorAll('[data-part]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.part)===i)))}
selectPart(0);document.querySelectorAll('[data-part]').forEach(b=>b.addEventListener('click',()=>selectPart(Number(b.dataset.part))));document.getElementById('all-descriptions').innerHTML=parts.map(p=>`<h3>${p.title}</h3><p>${p.purpose} ${p.example}</p><p><b>Design question:</b> ${p.question}</p>`).join('');
const faqs=[['How do the two services differ?','Agentic Workflow Design & Delivery improves a business process using AI agents. AI-Enabled Software Delivery Transformation helps your team change how it builds and maintains software with AI. You can choose either service independently.'],['Does delivery transformation require building an AI application?','No. Your team can use AI to build conventional software. We assess the current delivery process, pilot an adapted method, and coach your team to sustain useful improvements.'],['What does a transformation pilot measure?','We compare accepted delivery time, total effort including review and correction, rework, defects and cost against an agreed baseline. We also examine role clarity, workload and whether the team can maintain the new practices.'],['Do we need to build from scratch?','No. Scope AI owns the business and technical architecture method, governance requirements and evaluation evidence. We compare your existing platforms with specialist products and build only what the requirements justify.'],['Can you work with our existing systems?','The starting point is your current applications, knowledge sources and access model. Discovery establishes which APIs, connectors or other approved integration paths are available and what constraints apply.'],['Where do humans remain involved?','People define the goals, validate the specification and review important outputs. Approval checkpoints depend on the impact of each action. Release decisions and sensitive business judgments remain with accountable owners.'],['How is success measured?','We agree on a baseline and measures before the pilot: handling effort, factual accuracy, rework, acceptance rate, exception frequency, cost or response time. Outcomes are evaluated against that baseline, not assumed.'],['Are you tied to a particular AI platform?','No. We start with your approved environment and compare client-native capabilities with suitable options, including Microsoft Foundry, AWS Bedrock, agent tool-governance gateways and runtime containment where needed. Vendor references do not imply partnerships.'],['Can we start with a small pilot?','Yes. Start with one workflow, a limited set of integrations, clear acceptance criteria and a defined review point. Discovery tests whether the opportunity is ready for a pilot.'],['How do you approach enterprise data access?','We identify necessary sources, classify information and work with your control owners to define least-privilege access, human decision rights, server-side authorization, retention and audit. We test denied actions rather than relying on model instructions alone.']];
document.getElementById('faqs').innerHTML=faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
const menu=document.querySelector('.menu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menu.click();menu.focus()}});function buildEnquiryBody(form){
 return new URLSearchParams(new FormData(form)).toString();
}
function postEnquiry(body,signal){
 return fetch('/',{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body,
  signal
 });
}
const enquiryForm=document.getElementById('enquiry-form');
const enquiryStatus=document.getElementById('enquiry-status');
if(enquiryForm&&enquiryStatus&&typeof fetch==='function'&&typeof AbortController==='function'&&typeof FormData==='function'&&typeof URLSearchParams==='function'){
 const submitButton=enquiryForm.querySelector('button[type="submit"]');
 let pending=false;
 function showEnquiryStatus(message,isError=false){
  enquiryStatus.textContent=message;
  if(isError) enquiryStatus.focus();
 }
 enquiryForm.addEventListener('submit',async e=>{
  e.preventDefault();
  if(pending) return;
  if(!enquiryForm.reportValidity()) return;
  const wasDisabled=submitButton.disabled;
  const previousBusy=enquiryForm.getAttribute('aria-busy');
  let timer;
  pending=true;
  submitButton.disabled=true;
  enquiryForm.setAttribute('aria-busy','true');
  showEnquiryStatus('Submitting your enquiry...');
  try{
   const body=buildEnquiryBody(enquiryForm);
   const controller=new AbortController();
   timer=setTimeout(()=>controller.abort(),30000);
   const response=await postEnquiry(body,controller.signal);
   if(response.ok){
    showEnquiryStatus('Your enquiry has been submitted.');
   }else{
    showEnquiryStatus('We could not confirm your submission. Please keep your details and try again. If your enquiry was already saved, retrying may create a duplicate.',true);
   }
  }catch{
   showEnquiryStatus('We could not confirm whether your enquiry was saved. Your details are still here. Please keep this page open. Trying again may create a duplicate.',true);
  }finally{
   clearTimeout(timer);
   pending=false;
   submitButton.disabled=wasDisabled;
   if(previousBusy===null) enquiryForm.removeAttribute('aria-busy');
   else enquiryForm.setAttribute('aria-busy',previousBusy);
  }
 });
}
