import styles from"../../sass/components/_buttons.scss";
import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <button className={styles.button} onClick={this.props.clickHandler}>{this.props.text}</button>
        )
    }
}

export default Button;