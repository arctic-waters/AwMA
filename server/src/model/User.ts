const banned = [
  'minecraft',
  'steam',
  'epic',
  'game',
  'chrome'
]

export class User {
  public latestProcesses: string[] = []
  public latestFile: Express.Multer.File | undefined
  
  constructor(
    public id: string,
    public name: string
  ) {}

  get dangerousProcesses() {
    return this.latestProcesses.filter(i => banned.some(b => i.toLowerCase().includes(b)))
  }
}