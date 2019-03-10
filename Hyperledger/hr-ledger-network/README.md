# org.hrledger.cv


## pokretanje
1. pokrenje fabrica
````
    cd fabric-tools/ 
    ./startFabric.sh
````

2. install
````
    cd hr-ledger-network/ 
    composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName hr-ledger-network
````

3. definisanje admina
````
    composer network start --cardPeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile hr-ledger-network@0.0.1.bna --file networkadmin.card
````

4. pokretanje rest api-a
````
    composer-rest-server -c admin@hr-ledger-network -n never -w true
````
