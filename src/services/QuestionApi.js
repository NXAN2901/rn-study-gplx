import Api from "./NetworkService";

async function getQuestions() {
  return new Api()
    .send({ method: "GET", url: "b/5d708b5ede27e46cb7dc647e" })
    .then(data => {
      return Promise.resolve(data);
    });
}

export { getQuestions };
