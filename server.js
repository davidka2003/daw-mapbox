const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.static(path.join(__dirname, "./dist/build")))


app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "./dist/build/index.html"))
})
app.listen(PORT, () => console.log("server started,", PORT))