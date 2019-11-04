import { OrderedMap } from 'immutable';
import _ from 'lodash';
import Service from './service';
import Realtime from './realtime';

export default class Store {
  constructor(appComponent) {
    this.app = appComponent;
    this.service = new Service();
    this.messages = new OrderedMap();
    this.channels = new OrderedMap();
    this.activeChannelId = null;

    this.token = this.getTokenFromLocalStore();
    this.user = this.getUserFromLocalStorage();
    this.users = new OrderedMap();

    this.search = {
      users: new OrderedMap()
    };

    this.realtime = new Realtime(this);

    this.fetchUserChannels();
  }

  isConnected() {
    return this.realtime.isConnected;
  }

  getUserTokenId() {
    return _.get(this.token, '_id', null);
  }

  loadUserAvatar() {
    return `https://api.adorable.io/avatars/100/${user._id}.png`;
  }

  setUserToken(accessToken) {
    if (!accessToken) {
      this.localStorage.removeItem('token');
      this.token = null;

      return;
    }

    this.token = accessToken;
    localStorage.setItem('token', JSON.stringify(accessToken));
  }

  setCurrentUser() {
    user.avatar = this.loadUserAvatar(user);
    this.user = user;

    if (user) {
      localStorage.setItem('me', JSON.stringify(user));

      const userId = `${user._id}`;
      this.users = this.users.set(userId, user);
    }
    this.update();
  }

  getUserFromLocalStorage() {
    let user = null;
    const data = localStorage.getItem('me');

    try {
      user = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }

    if (user) {
      const token = this.getTokenFromLocalStore();
      const tokenId = _.get(token, '_id');

      const options = {
        headers: {
          authorization: tokenId
        }
      };

      this.service
        .get('api/users/me', options)
        .then((response) => {
          const accessToken = response.data;
          const user = _.get(accessToken, 'user');

          this.setCurrentUser(user);
          this.setUserToken(accessToken);
        })
        .catch((err) => {
          this.signOut();
        });
    }
    return user;
  }
}
