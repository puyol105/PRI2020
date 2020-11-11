const http = require('http')
const axios = require('axios')
const PORTA = 3001

var servidor = http.createServer(function (req, res) {
    if(req.method == 'GET') {
        if(req.url == '/'){
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write('<h2>Escolinha de musiquinha</h2>')
            res.write('<ul>')
            res.write(`<li> <a href=\"http://localhost:${PORTA}/alunos\">Lista de alunos</a> </li>`)
            res.write(`<li> <a href=\"http://localhost:${PORTA}/instrumentos\">Lista de instrumentos</a> </li>`)
            res.write(`<li> <a href=\"http://localhost:${PORTA}/cursos\">Lista de cursos</a> </li>`)
            res.write('</ul>')
            res.end()
        }
        else if(req.url == '/alunos' || req.url == '/alunos/'){
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get('http://localhost:3000/alunos')
                .then((resp) => {
                    alunos = resp.data
                    res.write('<h2>Listinha de aluninhos</h2>')
                    res.write('<ul>')
                    alunos.forEach(a => {
                        res.write(`<li>
                                   <a href=\"http://localhost:${PORTA}/alunos/${a.id}\" id=\"Aluno\">
                                        ${a.id}, ${a.nome}, ${a.instrumento}
                                   </a>
                                   </li>`)
                    })
                    res.write('</ul>')
                    res.write(`<a href=\"http://localhost:${PORTA}/\"> Voltar ao Indice </a>`)
                    res.end()
                })
                .catch((err) => {
                    console.log('ERRO: ' + err)
                    res.write('<p>Não consegui obter a lista de aluninhos:</p>')
                    res.end()
                })
        }
        else if(req.url == '/instrumentos' || req.url == '/instrumentos/'){
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get('http://localhost:3000/instrumentos')
                .then((resp) => {
                    instrumentos = resp.data
                    res.write('<h2>Listinha de instrumentinhos</h2>')
                    res.write('<ul>')
                    instrumentos.forEach(a => {
                        res.write(`<li><a href=\"http://localhost:${PORTA}/instrumentos/${a.id}\">${a.id}, ${a['#text']}</a></li>`)
                    })
                    res.write('</ul>')
                    res.write(`<a href=\"http://localhost:${PORTA}/\"> Voltar ao Indice </a>`)
                    res.end()
                })
                .catch((err) => {
                    console.log('ERRO: ' + err)
                    res.write('<p>Não consegui obter a lista de instrumentinhos:</p>')
                    res.end()
                })
        }
        else if(req.url == '/cursos' || req.url == '/cursos/'){
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get('http://localhost:3000/cursos')
                .then((resp) => {
                    cursos = resp.data
                    res.write('<h2>Listinha de cursinhos</h2>')
                    res.write('<ul>')
                    cursos.forEach(a => {
                        res.write(`<li><a href=\"http://localhost:${PORTA}/cursos/${a.id}\">${a.id} - ${a.designacao}, ${a.duracao}</a></li>`)
                    })
                    res.write('</ul>')
                    res.write(`<a href=\"http://localhost:${PORTA}/\"> Voltar ao Indice </a>`)
                    res.end()
                })
                .catch((err) => {
                    console.log('ERRO: ' + err)
                    res.write('<p>Não consegui obter a lista de cursinhos:</p>')
                    res.end()
                })
        }
        else{
            var url = req.url
            var splits = url.split('/', 3)
            if(splits[2] && splits[2].charAt(0) == 'A'){
                var alunoID = splits[2]
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                axios.get(`http://localhost:3000/alunos/${alunoID}`)
                    .then((resp) => {
                        aluno = resp.data
                        res.write(
                            `<h2>${aluno.nome}</h2>
                            <p> ID: ${aluno.id}</p>
                            <p> Data de nascimento: ${aluno.dataNasc}</p>
                            <p> Frequenta o ${aluno.anoCurso}º ano do curso ${aluno.curso} de ${aluno.instrumento} </p>
                        `)
                        res.write(`<p><a href=\"http://localhost:${PORTA}/alunos\"> Voltar aos Alunos </a></p>`)
                        res.write(`<p><a href=\"http://localhost:${PORTA}/\"> Voltar ao Indice </a></p>`)
                        res.end()
                    })
                    .catch((err) => {
                        console.log('ERRO: ' + err)
                        res.write(`<p>Não consegui obter o ${alunoID}</p>`)
                        res.end()
                    })
            }
            else if(splits[2] && splits[2].charAt(0) == 'I'){
                var instrumentoID = splits[2]
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                axios.get(`http://localhost:3000/instrumentos/${instrumentoID}`)
                    .then((resp) => {
                        instrumento = resp.data
                        res.write(`<h2>${instrumento.id} - ${instrumento['#text']}</h2>`)
                        res.write(`<p><a href=\"http://localhost:${PORTA}/instrumentos\"> Voltar aos Instrumentos </a></p>`)
                        res.write(`<p><a href=\"http://localhost:${PORTA}/\"> Voltar ao Indice </a></p>`)
                        res.end()
                    })
                    .catch((err) => {
                        console.log('ERRO: ' + err)
                        res.write(`<p>Não consegui obter o ${instrumentoID}</p>`)
                        res.end()
                    })
            }
            else if(splits[2] && splits[2].charAt(0) == 'C'){
                var cursoID = splits[2]
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                axios.get(`http://localhost:3000/cursos/${cursoID}`)
                    .then((resp) => {
                        curso = resp.data
                        res.write(`
                            <h2>${curso.designacao}</h2>
                            <p>${curso.id} - Este curso de ${curso.instrumento['#text']} tem a duração de ${curso.duracao} anos.
                            
                        `)
                        res.write(`<p><a href=\"http://localhost:${PORTA}/cursos\"> Voltar aos Cursos </a></p>`)
                        res.write(`<p><a href=\"http://localhost:${PORTA}/\"> Voltar ao Indice </a></p>`)
                        res.end()
                    })
                    .catch((err) => {
                        console.log('ERRO: ' + err)
                        res.write(`<p>Não consegui obter o ${cursoID}</p>`)
                        res.end()
                    })
            }
        }
        
    }
    else{
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.write('<p>Pedido não suportado: ' + req.method + '</p>')
        res.end()
    }

})

servidor.listen(PORTA)
console.log("Servidor à escuta na porta " + PORTA)
console.log("http://localhost:" + PORTA)