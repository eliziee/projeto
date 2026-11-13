import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const avaliacoes = [
  {
    id: 1,
    exemplo: true,
    nome: 'Helena Diaz',
    nota: 5,
    comentario: 'Foi fácil encontrar um médico e marcar a consulta.'
  },
  {
    id: 2,
    exemplo: true,
    nome: 'Arthur Jorge',
    nota: 4,
    comentario: 'Gostei de ver os horários dos médicos antes de agendar.'
  },
  {
    id: 3,
    exemplo: true,
    nome: 'Ricardo Martins',
    nota: 5,
    comentario: 'Consegui agendar pelo celular sem dificuldade.'
  },
  {
    id: 4,
    exemplo: true,
    nome: 'Antonia Macedo',
    nota: 5,
    comentario: 'Encontrei a data e o horário da minha consulta com facilidade.'
  }
]

const medicos = [
  {
    nome: 'Dra. Ana Souza',
    especialidade: 'Cardiologia',
    horario: 'Seg e Qua, 8h às 12h',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKBZ4VgqT3NRLpmumCa_4zV4zh_e-Odv-hzvyFmdDTQGuY0TevUaQtvM&s=10',
    telefone: '(91) 90000-0101'
  },
  {
    nome: 'Dr. João Lima',
    especialidade: 'Pediatria',
    horario: 'Ter e Qui, 14h às 18h',
    foto: 'https://img.magnific.com/premium-vector/male-doctor-illustration-with-simple-design-style_1120163-217.jpg?semt=ais_hybrid&w=740&q=80',
    telefone: '(91) 90000-0102'
  },
  {
    nome: 'Dra. Carla Mendes',
    especialidade: 'Dermatologia',
    horario: 'Sex, 8h às 12h',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJjYJN0_BMqx-HYO5y6HIQQoRfsl_OO3j5yUxYqF46S6Ifdw2rEcNzmo&s=10',
    telefone: '(91) 90000-0103'
  },
  {
    nome: 'Dr. Pedro Alves',
    especialidade: 'Ortopedia',
    horario: 'Seg a Qui, 14h às 17h',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq62Qs4QWNZGMf4RpqENAsXfhcBF89ZbgutomXkJv-3d2gruhzms4e0RFX&s=10',
    telefone: '(91) 90000-0104'
  }
]

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'mock-api',
      configureServer(server) {
        // GET /api/medicos
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' || req.url !== '/api/medicos') {
            return next()
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(medicos))
        })

        // GET /api/avaliacoes
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' || req.url !== '/api/avaliacoes') {
            return next()
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(avaliacoes))
        })

        // POST /api/avaliacoes
        server.middlewares.use(async (req, res, next) => {
          if (req.method !== 'POST' || req.url !== '/api/avaliacoes') {
            return next()
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8')

          let dados

          try {
            let corpo = ''
            req.setEncoding('utf8')

            for await (const parte of req) {
              corpo += parte
            }

            dados = JSON.parse(corpo)
          } catch {
            res.statusCode = 400
            return res.end(JSON.stringify({ erro: 'Dados inválidos.' }))
          }

          const nome = typeof dados?.nome === 'string' ? dados.nome.trim() : ''
          const comentario = typeof dados?.comentario === 'string'
            ? dados.comentario.trim()
            : ''
          const nota = dados?.nota

          if (!comentario || !Number.isInteger(nota) || nota < 1 || nota > 5) {
            res.statusCode = 400
            return res.end(JSON.stringify({
              erro: 'Informe uma nota de 1 a 5 e um comentário.'
            }))
          }

          const avaliacao = {
            id: avaliacoes.length + 1,
            nome: nome || 'Anônimo',
            nota,
            comentario
          }

          avaliacoes.push(avaliacao)
          res.statusCode = 201
          res.end(JSON.stringify(avaliacao))
        })
      }
    }
  ]
})