"use strict";

// estas variáveis capturam os controles existentes na view
// obs: literalmente não são necessárias, já que o browser sempre
// cria properties em window com os ids declarados na view; contudo,
// usar tais properties é considerado má prática, dado que é origem
// de muito problema;
const listagem = document.getElementById('listagem');
const edit_box = document.getElementById('edit_box');
const edit_titulo = document.getElementById('edit_titulo');
const edit_prioridade = document.getElementById('edit_prioridade');
const edit_estimativa = document.getElementById('edit_estimativa');
const filtro = document.getElementById('filtro');
const num_tarefas = document.getElementById('num_tarefas');
const horas_estimadas = document.getElementById('horas_estimadas');

// editing_tarefa referencia o modelo da tarefa sendo editada
// se for uma tarefa nova, então editing_tarefa.index é undefined;
// se for uma tarefa existente, então editing_tarefa.index é o 
// índice da tarefa no modelo lista de tarefas;
let editing_tarefa;

// o protótipo da tarefa: o objeto pleno de tarefa; neste caso, trata-se de um
// objeto bastante simples; na prática, contudo, é comum que acumule mais
// funcionalidade; em particular, toda a "lógica de negógio" do objeto em si;
// observe ainda que se trata de modelo de view (view-model), no sentido em que
// parte da funcionalidade provida é relativa ao mapeamento entre o modelo e a
// view e não exclusivamente da lógica de negócio; em algumas aplicações é
// preferível manter esses dois conjuntos de funcionalidades separadas;
const proto_tarefa = {
    titulo: "",
    prioridade: "5",
    estimativa: "60",
    index: undefined,
    write: function () {
        edit_titulo.value = this.titulo;
        edit_prioridade.value = '' + this.prioridade;
        edit_estimativa.value = '' + this.estimativa;
        edit_box.hidden = false;
    },
    read: function () {
        this.titulo = edit_titulo.value;
        this.prioridade = Number(edit_prioridade.value);
        this.estimativa = Number(edit_estimativa.value);
    }
};

// tarefa(data) é um construtor; ele parte de um objeto bruto (apenas dados) e
// cria a partir dele um objeto pleno com proto_tarefa como protótipo;
function tarefa(data) {
    const nova = Object.create(proto_tarefa);
    Object.assign(nova, data);
    return nova;
}

// dados brutos que, tipicamente, seriam recebidos do servidor
const dados_servidor = [
    {titulo: 'escrever questões da prova de prog3', prioridade: 3, estimativa: 60},
    {titulo: 'escrever questões do miniteste de prog1', prioridade: 3, estimativa: 30},
    {titulo: 'concluir e publicar material de prog3 sobre prog assíncrona', prioridade: 2, estimativa: 120},
    {titulo: 'revisar artigo de fulano', prioridade: 1, estimativa: 240},
    {titulo: 'despachar processo de dispensa disciplina', prioridade: 1, estimativa: 30}
];

// a variável tarefas, abaixo, é nosso modelo da listagem; inicialmente, é
// definida a partir de dados recebidos do servidor, mas de forma que cada
// tarefa seja um objeto pleno criado pelo construtor tarefa(); a partir daí é
// manipulada pelo usuário, através da interface;
const tarefas = dados_servidor.map(d => tarefa(d));

// update_listagem() é a função de atualização da view; ela deve ser invocada
// sempre que for preciso sincronizar mudanças feitas no model para a view;
// escreva-a de forma que o html produzido para cada tarefa siga o exemplo
// abaixo:
//
// <div class="tarefa">
//   <div class="btn-trash" onclick="delete_tarefa(<<tarefa.index>>)">remover tarefa</div>
//   <span class="titulo" onclick="edit_tarefa(<<tarefa.index>>)"> <<tarefa.titulo>> </span><br>
//   <span class="prioridade">prioridade: <<tarefa.prioridade>> </span><br>
//   <span class="estimativa">estimativa: <<tarefa.estimativa>> </span><br>
// </div>
//
// use innerHTML ao invés de manipulação direta da DOM
function update_listagem() {
  const pattern = filtro.value;
  const tarefas_filtradas = tarefas
                            .map((t, i) => { t.index = i; return t; })
                            .reverse()
                            .filter(t => t.titulo.includes(pattern) || t.prioridade === Number(pattern));
  listagem.innerHTML = tarefas_filtradas
                       .map(t => `<div class="tarefa">
                                    <div class="btn-trash" onclick="delete_tarefa(${t.index})">remover tarefa</div>
                                    <span class="titulo" onclick="edit_tarefa(${t.index})">${t.titulo}</span><br>
                                    <span class="prioridade">prioridade: ${t.prioridade}</span><br>
                                    <span class="estimativa">estimativa: ${t.estimativa}</span><br>
                                  </div>`)
                       .join('\n');
  num_tarefas.innerHTML = '' + tarefas_filtradas.length;
  horas_estimadas.innerHTML = '' + tarefas_filtradas
                                   .map(t => t.estimativa)
                                   .reduce((a, e) => a + e, 0);
}

// create_tarefa() é um controle disponibilizado na view para que o usuário
// inicie a criação de uma nova tarefa; ela cria uma nova tarefa, a sincroniza
// com a view e posiciona o foco da view no input do título;
function create_tarefa() {
  editing_tarefa = tarefa();
  editing_tarefa.write();
  edit_titulo.focus();
}

// edit_tarefa é um controle disponibilizado na view para que o usuário inicie
// a edição de uma tarefa existente; ela busca uma tarefa no modelo, a
// sincroniza com a view, ajusta texto e background da área de edição e
// posiciona o foco da view no input do título;
function edit_tarefa(i) {
  editing_tarefa = tarefas[i];
  editing_tarefa.write();
  edit_header.innerHTML = `Editando tarefa ${i}`;
  edit_area.style.background = "lightgreen";
  edit_titulo.focus();
}

// cancel_edit_tarefa() é um controle disponibilizado na view para que o
// usuário cancele a edição de uma tarefa; ela ajusta o texto e o background da
// área de edição e esconde o edit_box;
function cancel_edit_tarefa() {
  edit_header.innerHTML = `Criar nova tarefa`;
  edit_area.style.background = "";
  edit_box.hidden = true;
}

// delete_tarefa(i) é um controle disponibilizado na view para que o usuário
// elimine uma tarefa da listagem; ela elimina a tarefa indicada pelo índice
// recebido como argumento, elimina o index da tarefa e sincroniza a view com o
// modelo;
function delete_tarefa(i) {
  tarefas[i].index = undefined;
  tarefas.splice(i, 1);
  update_listagem();
}

// save_tarefa() é um controle disponibilizado na view para que o usuário salve
// a tarefa que está sendo editada na lista de tarefas (caso seja uma nova
// tarefa); ela sincroniza o conteúdo da view com o modelo; se a tarefa é nova
// (indicado pelo fato de tarefa.index ser undefined), é adicionada à listagem;
// além disso, reconfigura e esconde a área de edição;
function save_tarefa() {
  editing_tarefa.read();
  if (editing_tarefa.titulo === '') return;
  if (typeof editing_tarefa.index === 'undefined') {
    editing_tarefa.index = tarefas.length;
    tarefas.push(editing_tarefa);
  }

  update_listagem();
  edit_header.innerHTML = `Criar nova tarefa`;
  edit_area.style.background = "";
  edit_box.hidden = true;
}

// key_pressed() é um controle disponibilizado na view; é invocado a cada tecla
// digitada pelo usuário; neste caso, está sendo usado para eliminar caracteres
// não numéricos das entradas que devem ser numéricas; além disso, está sendo
// usado para invocar, indiretamente, o controle save_tarefa() quando o usuário
// dgitar <Enter>, evitando que precise usar o mouse;
function key_pressed() {
  if (event.key === 'Enter') save_tarefa();
  edit_prioridade.value = edit_prioridade.value.replace(/\D/g, '')
  edit_estimativa.value = edit_estimativa.value.replace(/\D/g, '')
}

// logo na execução inicial do script, é preciso iniciar sincronizando o
// modelo de dados e a view;
update_listagem();
