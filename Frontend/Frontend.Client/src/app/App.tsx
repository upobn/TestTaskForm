import React, { Component } from 'react';
import { pageRoutes } from './routes';
import Workspace from "./Workspace";

class App extends Component {
  render() {
    return (
      <div>
        <div>Тест</div>
        <div className="container-fluid">
          <div className="row">
            <Workspace routes={pageRoutes} />
          </div>
        </div>
      </div >
    );
  }
}

export default App;
