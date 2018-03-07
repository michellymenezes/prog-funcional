// Martha Michelly, Samir Silva

const fetch = require('node-fetch');

module.exports = busca_e_filtra = (url_base) => {
  return fetch(url_base + '/data')
          .then(response => response.json())
          .then(body => {
            return fetch(url_base + '/' + body.recurso)
                    .then(response => response.json())
                    .then(data => {
                      data = data.filter((value) => {
                        return (value <= body.maximo & value >= body.minimo);
                      });

                      let promise = new Promise((resolve, reject) => {
                        resolve(data);
                      });
                      return promise;
                    })

          })
          .catch(() => new Promise((resolve, reject) => reject()));
}
