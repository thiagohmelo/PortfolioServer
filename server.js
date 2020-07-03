const express = require('express')
const nunjucks = require('nunjucks')
const { response } = require('express')


const server = express()

const videos = require("./data")

server.use(express.static("public"))

server.set( "view engine", "njk")


nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true 
})

server.get('/', function(req,res) {
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/63268899?s=460&v=4",
        name: "Thiago Henrique De Melo",
        role: "Estudante JavaScript/css/html",
        description: 'Pós-graduado em Processo e Direito Civil <a href="http://oabpr.org.br" target="_blank">OAB/PR 69.107</a>',
        links: [
            {name: "twitter", url: "http://twitter.com"},
            {name: "Facebook", url: "https://www.facebook.com/thiagohenrique.melo.7?ef=bookmarks"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/thiago-henrique-melo-a2bab710a/"}
        ]
    }
    return res.render("about", {about})
})

server.get("/portfolio", function(req,res) {
    return res.render('portfolio', {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        if (video.id == id) {
            return true
        }
    })

    if (!video) {
        return res.send('Video not found')
    }

    return res.render('video', {item: video})
})

server.listen(5000, function() {
    console.log('server is RUNNING!')
})