import { ERC20, ERC721 } from "../client/constants";

export class EthereumAddress {
  static readonly ETHEREUM_ADDRESS_LENGTH = 40;
  static readonly pattern = new RegExp(
    `^0x[a-fA-F0-9]{${EthereumAddress.ETHEREUM_ADDRESS_LENGTH}}$`,
  );

  private readonly _value: string;
  public erc20List: ERC20[];
  public erc721List: ERC721[];

  constructor(public address: string) {
    if (!EthereumAddress.pattern.test(address)) {
      throw new Error(`Invalid Ethereum address: ${address}`);
    }

    this.erc20List = [];
    this.erc721List = [];
    this._value = address.toLowerCase();
  }

  toString() {
    return this._value;
  }

  equals(otherAddress: EthereumAddress | undefined | null) {
    if (otherAddress === undefined || otherAddress === null) return false;

    let isEqual = false;
    try {
      isEqual = this._value === otherAddress._value;
    } finally {
      return isEqual;
    }
  }

  getEllipsedAddress() {
    return this._value.slice(0, 6) + "..." + this._value.slice(-4);
  }

  setERC20List(erc20List: ERC20[]) {
    this.erc20List = erc20List;
  }

  setERC721List(erc20List: ERC20[]) {
    this.erc20List = erc20List;
  }
}
