import Users from "./Users.jsx";
import Button from "./Button.jsx";
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showUsers: false };
        this.showUsers = this.showUsers.bind(this);
    };

    showUsers() {
        this.setState({ showUsers: true });
    };

    render() {
        return (
            <div>
                <Button text="Pobierz dane" clickHandler={this.showUsers} />
                {this.state.showUsers ? <Users /> : null}
            </div>
        )
    };

}

export default App;