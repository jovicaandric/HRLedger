#!/bin/bash


composer archive create -t dir -n .

composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName hr-ledger-network

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile hr-ledger-network@0.0.1.bna --file networkadmin.card


composer card import --file networkadmin.card
