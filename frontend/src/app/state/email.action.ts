export class SetEmail {
  static readonly type = '[Email] Set Email';
  constructor(public payload: string) {}
}