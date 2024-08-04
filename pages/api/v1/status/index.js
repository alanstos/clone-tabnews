function status(request, response) {
  response.status(200).json({ chave: "isso aqui é bom demais. tá maluco!" });
}

export default status;
