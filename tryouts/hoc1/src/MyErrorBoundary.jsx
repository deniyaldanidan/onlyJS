import React, { Component } from 'react'

export class MyErrorBoundary extends Component {

    constructor (props){
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error){
        console.log(error);
        return {hasError: true}
    }


    render() {
        if (this.state.hasError) {
            return <h1>An Error Have Occured</h1>
        }
        return this.props.children
    }
}

export default MyErrorBoundary