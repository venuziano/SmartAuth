#!/bin/sh

geth --allow-insecure-unlock --rinkeby --rpc --rpcapi="admin,eth,net,web3,personal, txpool" --syncmode=light
