/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import type { Wallet } from 'types/account';
import { writable } from 'svelte/store';

export default writable<Wallet>({
  selectedAddress: 0,
  identities: []
});
