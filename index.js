// code away!

const server = require("./server");

const port = process.env.PORT || 4444;

server.listen(port, () => {
    console.log(`\n* Server running on ${port}`)
});
