import React, { Component } from 'react'

const style = {
    textAlign: 'center',
    color: 'red'
}

export class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error){
        console.log(error);
        return {hasError: true}
    }

  
    render() {
        if(this.state.hasError) return <h1 style={style} className='error-info'>An Error Happened</h1>;
        return this.props.children;
    }
}

export default ErrorBoundary