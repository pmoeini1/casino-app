import { State, Action, StateContext } from '@ngxs/store';
import { Increment, Decrement } from './counter.actions'; 

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
  @Action(Increment)
  increment(ctx: StateContext<CounterStateModel>, action: Increment) {
    const state = ctx.getState();
    ctx.setState({ count: state.count + action.payload });
  }

  @Action(Decrement)
  decrement(ctx: StateContext<CounterStateModel>, action: Decrement) {
    const state = ctx.getState();
    ctx.setState({ count: state.count - action.payload });
  }
}