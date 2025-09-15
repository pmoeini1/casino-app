import { State, Action, StateContext } from '@ngxs/store';
import { SetEmail } from './email.action';

export interface EmailStateModel {
  email: string;
}

@State<EmailStateModel>({
  name: 'email',
  defaults: {
    email: ''
  }
})
export class EmailState {
  @Action(SetEmail)
  setEmail(ctx: StateContext<EmailStateModel>, action: SetEmail) {
    ctx.setState({ email: action.payload });
  }
}