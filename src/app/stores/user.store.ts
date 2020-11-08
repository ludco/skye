
import { State, Action, StateContext } from '@ngxs/store';
import { finalize, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../models/User';


export interface UserStateModel {
  connected?: boolean;
  user?: any;
}


// *****************************
// Actions
// *****************************
export class UserLoad {
  static readonly type = '[User] get a user';
  constructor(public payload: User) {}
}

export class UserUnLoad {
  static readonly type = '[User] delete a user';
  constructor() {}
}

// *****************************
// Store implementation
// *****************************

@State<UserStateModel>({
  name: 'user',
  defaults: {
    connected: false,
    user: null,
  },
})


@Injectable()
export class UserStore {
  constructor() {}

  // Load user in store
  @Action(UserLoad)
  UserLoad(ctx: StateContext<UserStateModel>,  action: any) {
    console.log('in strore');
    console.log('action', action);
          // stock user in the store.
    ctx.patchState({
            user : action, connected: true
    });
  }

  // Delete user from store
  @Action(UserUnLoad)
  UserUnLoad(ctx: StateContext<UserStateModel>) {
    console.log('delete user from store');
    ctx.patchState({ user: null , connected : false});
  }
}
