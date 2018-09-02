import styles from "../../sass/components/_users.scss";
import React from 'react';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            html: "",
            url: "http://jsonplaceholder.typicode.com/users",
        };
    }

    componentDidMount() {

        this.getUsers(this.state.url).then(data => {
            let lis = data.map(user => (
                <li className={styles.user} key={user.id}>
                    <span className={styles.user__name}>{user.name}</span>
                    <span className={styles.user__email}>{user.email}</span>
                    <span className={styles.user__website}><a href="http://{user.website}">{user.website}</a></span>
                </li>
            ));

            this.setState({ html: lis });
        });

    }

    getUsers(url) {

        return fetch(url)
            .then(resp => resp.json());

    }

    render() {
        return (
            <ul className={styles.users}>{this.state.html}</ul>
        )
    }

}

export default Users;