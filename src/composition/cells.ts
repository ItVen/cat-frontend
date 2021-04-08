export interface Account {
  email: string;
  address: string;
  lock_arg: string;
  lock_hash: string;
}

export interface Cell {
  capacity: string;
  lock: string;
  data: {
    name: string;
    hash: string;
    fishes: number;
  };
}
