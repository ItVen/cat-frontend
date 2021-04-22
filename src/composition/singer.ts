import {
  DefaultSigner,
  Keccak256Hasher,
  Message,
  Provider,
  Transaction
} from '@lay2/pw-core';
import { normalizers, Reader } from 'ckb-js-toolkit';
import {
  SerializeWitnessArgs,
  SerializeRawTransaction
} from '@ckb-lumos/types/lib/core';

export class BattleSigner extends DefaultSigner {
  constructor(public readonly provider: Provider) {
    super(provider);
  }
  async sign(tx: Transaction): Promise<Transaction> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const messages = this.toMessages(tx) as Message[];
    const witnesses = await this.signMessages(messages);
    for (let i = 0; i < messages.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const msg = messages[i];
      if (witnesses[i] == '0x') {
      } else {
        witnesses[i] = new Reader(
          SerializeWitnessArgs(
            normalizers.NormalizeWitnessArgs({
              ...tx.witnessArgs[i],
              lock: witnesses[i]
            })
          )
        ).serializeJson();
      }
    }

    tx = FillSignedWitnesses(tx, messages, witnesses);

    return tx;
  }
}
function FillSignedWitnesses(
  tx: Transaction,
  messages: Message[],
  witnesses: string[]
) {
  if (messages.length !== witnesses.length) {
    throw new Error('Invalid number of witnesses!');
  }
  for (let i = 0; i < messages.length; i++) {
    tx.witnesses[messages[i].index] = witnesses[i];
  }
  return tx;
}
