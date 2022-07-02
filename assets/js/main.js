function addTarefa(novaTarefa){
    
    const li = criaLi();
    tarefas.appendChild(li);
    const span = criaSpan();
    span.innerText += novaTarefa;
    li.appendChild(span);
    criaCheckbox(li, span);
    criaBotaoApagar(li);
    
    
    salvarTarefa();
    
    limpaInput();
}

function criaSpan(){
    const span = document.createElement("span");
    return span
}

function criaLi(){
    const li = document.createElement("li");
    return li;
}

function limpaInput(){
    input.value = '';
    input.focus();
}

function criaBotaoApagar(li){

    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute("class", "apagar");
    botaoApagar.innerText = "Apagar";
    li.appendChild(botaoApagar);
}

function criaCheckbox(li, span){
    const pai = document.querySelector('.tarefas');
    const checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "check");
    li.insertBefore(checkbox, span);
}

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll("li");
    const listaTarefas = []; 
    for(let dale of liTarefas){
        listaTarefas.push(dale.innerText.replace('Apagar', '').trim());
    }

    const tarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefaSalva(){
    const tarefa = localStorage.getItem('tarefas');

    const listaTarefas = JSON.parse(tarefa);

    for(let tarefa of listaTarefas){
        const li = criaLi();
        addTarefa(tarefa, li);
        criaBotaoApagar(li);
        criaCheckbox(li);
    }
}



const input = document.querySelector(".input-add-tarefa");
const botao = document.querySelector(".btn-add-tarefa");
const tarefas = document.querySelector(".tarefas");

input.addEventListener("keypress", function(e){ //adiciona uma tarefa apertando enter
    if(!input.value) return;
    
    if(e.keyCode === 13){
    
        addTarefa(input.value);
   
    }  
});

document.addEventListener("click", function(e){
    const evento = e.target;
    if(evento.classList.contains("apagar")){ //apaga uma tarefa
        evento.parentElement.remove();
        salvarTarefa();
    }

    if(evento.classList.contains("btn-add-tarefa")){ //adiciona uma tarefa clicando no botão;
        if(!input.value) return;
        
        addTarefa(input.value);
        
    }

    if(evento.classList.contains("check")){
        const check = document.querySelector(".check");
        check.classList.toggle('checado');
    }
});



adicionaTarefaSalva();

//###################################3

