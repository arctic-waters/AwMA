export class User {
  public latestProcesses: string[] = []
  public latestFile: Express.Multer.File | undefined
  
  constructor(
    public id: string,
    public name: string
  ) {}
}