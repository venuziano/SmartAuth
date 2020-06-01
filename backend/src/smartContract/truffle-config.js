module.exports = {

  networks: {

    ropsten: {
      host: "localhost",
      port: 8545,
      gas: 5000000,
      network_id: 3,
      from: "0x4bbcc0309e49a8a00eb9b2fd9209e6ab99079f29",
      gas: 3000000
    },

    rinkeby: {
      host: "localhost",
      port: 8545,
      gas: 9985086,
      network_id: 4,
      from: "0x181857a9eafdf6412ba38e74e9cabf13d8d8dbdc",
      gas: 3000000
    },

    live: {
      network_id: 1,
      host: "localhost",
      port: 8545,
      gas: 472580,
      gasPrice: 21000000000,
      from: "0x067a41146aeda69fd9628f93d9e3add14b3fa1aa",
    }

  },

}