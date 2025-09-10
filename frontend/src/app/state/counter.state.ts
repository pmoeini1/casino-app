import { State, Action, StateContext } from '@ngxs/store';

export interface CounterStateModel {
  count: number;
}

@State<CounterStateModel>({
  name: 'counter',
  defaults: {
    count: 100
  }
})
export class CounterState {
  @Action({ type: 'increment' })
  increment(ctx: StateContext<CounterStateModel>) {
    const state = ctx.getState();
    ctx.setState({ count: state.count + 1 });
  }
}