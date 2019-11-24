import { User } from './User'

export class Room {
  public refreshRate: number = 2
  public processRefreshRate: number = 5

  public clients: User[] = []

  constructor(
    public id: string,
    public call: string
  ) {}
}