import React from 'react'

export default class extends React.Component {
    static getInitialProps({ query: { word } }) {
        return { word }
    }

    render() {
        return (
            <div>
                Some description here: {this.props.word}
            </div>
        )
    }
}