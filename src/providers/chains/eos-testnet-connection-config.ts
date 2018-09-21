// Singleton pattern
export class EosTestnetConnectionConfig {

    private static instance: EosTestnetConnectionConfig;
    chainName: string;
    chainId: any;
    httpEndpoint: any;
    expireInSeconds: any;
    broadcast: any;
    verbose: any;
    sign: any;
    tokensList: any;
    keyProvider: any;
    chainExplorerTxnUrl: any;
    pKeyPrefix: string;
    systemTokenName: string;
    mainContractName: string;

    constructor() {
        this.pKeyPrefix = 'EOS';
        this.systemTokenName = 'VIN';
        this.mainContractName = 'pietropietro';
        this.chainName = "Jungle Testnet";
        this.chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'; // 32 byte (64 char) hex string
        this.httpEndpoint = 'http://jungle.cryptolions.io:38888';
        this.expireInSeconds = 60;
        this.broadcast = true;
        this.verbose = true; // API activity
        this.sign = true;
        this.chainExplorerTxnUrl = "http://jungle.cryptolions.io/#tx:";
        this.tokensList = [
            {symbol:'VIN', contract:'pietropietro'}                                
          ];
    }

    setKeyProvider(pk: any)
    {
        this.keyProvider = [pk];
    }

    setEndpoint(httpEndpoint: string)
    {
        this.httpEndpoint = httpEndpoint;
    }

    getTokensList()
    {
        return this.tokensList;
    }

    setTokensList(_tokensList)
    {
        this.tokensList = _tokensList;
    }

    static getInstance() {
        if (!EosTestnetConnectionConfig.instance) {
            EosTestnetConnectionConfig.instance = new EosTestnetConnectionConfig();
        }
        return EosTestnetConnectionConfig.instance;
    }
}
