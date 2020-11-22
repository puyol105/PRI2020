var http = require('http')
var axios = require('axios')
var static = require('./static.js')

var {parse} = require('querystring')


// Funções auxilidares
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( tarefa, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-indigo">
                <h1>Tarefa ${tarefa.id} inserido</h1>
            </header>

            <div class="w3-container">
                <p><a href="/tarefas/${tarefa.id}">Aceda aqui à sua página."</a></p>
            </div>

            <footer class="w3-container w3-indigo">
                <address>Gerado por A75310::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

// Template para a página com a lista de tarefas ------------------
function geraPagTarefas( tarefas, d){
  let pagHTML = `
    <html>
        <head>
            <title>Lista de tarefas</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container w3-indigo">
                <h2>Lista de Tarefas</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Tarefa</th>
                    <th>Responsável</th>
                    <th>Data Final</th>
                </tr>
  `
  tarefas.forEach(t => {
      pagHTML += `
      <tr>
        <td><a href="/tarefas/${t.id}">${t.descricao}</td>
        <td>${t.responsavel}</td>
        <td>${t.deadline}</td>
      </tr>
      `
  })
  pagHTML += `
        </table>
        <div class="w3-container ">
            <a href="/tarefas/registar"><button class="w3-button w3-circle">➕</button></a>
        </div>
        <div class="w3-container w3-indigo">
            <address>Gerado por A75310::PRI2020 em ${d} --------------</address>
        </div>
    </body>
    </html>
  `
  return pagHTML
}

// Template para a página de tarefa -------------------------------------
function geraPagTarefa( tarefa, d ){
    let pagHTML = `
    <html>
    <head>
        <title>Tarefa_${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-indigo">
                <h1>Tarefa ${tarefa.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Descricao: </b> ${tarefa.descricao}</li>
                    <li><b>Responsável: </b> ${tarefa.responsavel}</li>
                    <li><b>Data Final: </b> ${tarefa.deadline}</li>
                    <li><b>Estado: </b> ${tarefa.status}</li>
                </ul>`

    if(tarefa.status === 'em andamento'){
        pagHTML += `<button class="w3-button w3-circle"">✅</button><button class="w3-button w3-circle">❌</button>`
    }
    pagHTML += `</div>
            <footer class="w3-container w3-indigo">
                <address>Gerado por A75310::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}
// Template para o formulário de tarefa ------------------
function geraFormTarefa( d ){
    return `
    <html>
        <head>
            <title>Registo de uma tarefa</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="../w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-indigo">
                <h2>Registar Tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">
                <label class="w3-text-teal"><b>ID</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id">

                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">

                <label class="w3-text-teal"><b>Responsável</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                <label class="w3-text-teal"><b>Data de Conclusão</b></label>
                <input class="w3-input w3-border w3-light-grey" placeholder="DD-MM-AAAA" type="text" name="deadline">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-indigo">
                <address>Gerado por A75310::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </body>
    </html>
    `
}

// Criação do servidor

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    //Testa se é um recurso estatico
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /tarefas --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tarefas")){
                    axios.get("http://localhost:3000/tarefas")
                        .then(response => {
                            var tarefas = response.data

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraPagTarefas(tarefas, d))
                            res.end()

                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas...")
                            res.end()
                        })
                }
                // GET /tarefas/:id --------------------------------------------------------------------
                else if(/\/tarefas\/[0-9]+$/.test(req.url)){
                    var idTarefa = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tarefas/" + idTarefa)
                        .then( response => {
                            let t = response.data
                            
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraPagTarefa(t, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a tarefa")
                            res.end()
                        })
                }
                // GET /tarefas/registar --------------------------------------------------------------------
                else if(req.url == "/tarefas/registar"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(geraFormTarefa(d))
                    res.end()
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/tarefas'){
                    recuperaInfo(req, info => {
                        console.log('POST de tarefa' + JSON.stringify(info))
                        axios.post('http://localhost:3000/tarefas', info)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraPostConfirm(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p> ERRO no POST " + erro + "</p>")
                                res.end()
                            })
                    })


                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Recebi um POST duma tarefa</p>')
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})

galunoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')
console.log('http://localhost:7777')