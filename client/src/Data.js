// get url variable
import config from './config';

export default class Data {
  // this function structures all the parameters for the HTTP requests
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // include and encode credentials if required
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // authenticates user for signing in
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // creates a new user in the database
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else if (response.status === 500) {
      return response.status;
    }
    else {
      throw new Error();
    }
  }

  // writes new courses, updates courses, or deletes courses depending on parameters
  async createCourse (path, method, body, username, password) {
    const response = await this.api(path, method, body, true, { username, password });
    if (response.status === 201 || response.status === 204) {
      if (method === 'POST') {
        console.log('Course created!');
      }
      else if (method === 'PUT') {
        console.log('Course updated!')
      }
      return [];
    }
    else if (response.status === 500) {
      return response.status;
    }
    else if (response.status !== 201 || response.status !== 204) {
      console.log('there seems to be an issue');
      return response.json().then(data => {
        return data.message;
      });
    } 
    else {
      throw new Error();
    }
  }

}
