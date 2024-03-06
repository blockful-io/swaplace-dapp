export type Token = ERC20 | ERC721;

export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
}

export interface ERC721 {
  tokenType: TokenType;
  id?: string;
  name?: string;
  contract?: string;
  metadata?: Record<string, any>;
  contractMetadata?: Record<string, any>;
}

export interface ERC20 {
  tokenType: TokenType;
  id?: string;
  name?: string;
  logo?: string;
  symbol?: string;
  contract?: string;
  rawBalance: number;
}

export interface ERC20WithTokenAmountSelection extends ERC20 {
  tokenAmount: number;
}

export class EthereumAddress {
  static readonly ETHEREUM_ADDRESS_LENGTH = 40;
  static readonly pattern = new RegExp(
    `^0x[a-fA-F0-9]{${EthereumAddress.ETHEREUM_ADDRESS_LENGTH}}$`,
  );

  public address: `0x${string}`;
  public erc20List: ERC20[];
  public erc721List: ERC721[];

  constructor(private add: string) {
    if (!EthereumAddress.pattern.test(add)) {
      throw new Error(`Invalid Ethereum address: ${add}`);
    }

    this.erc20List = [];
    this.erc721List = [];
    this.address = add.toLowerCase() as `0x${string}`;
  }

  toString() {
    return this.address;
  }

  equals(otherAddress: EthereumAddress | undefined | null) {
    if (otherAddress === undefined || otherAddress === null) return false;

    let isEqual = false;
    try {
      isEqual = this.address === otherAddress.address;
    } finally {
      return isEqual;
    }
  }

  getEllipsedAddress() {
    return this.address.slice(0, 6) + "..." + this.address.slice(-4);
  }

  setERC20List(erc20List: ERC20[]) {
    this.erc20List = erc20List;
  }

  setERC721List(erc20List: ERC20[]) {
    this.erc20List = erc20List;
  }
}
