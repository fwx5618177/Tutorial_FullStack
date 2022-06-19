import React from 'react';
import { Result, Button } from 'antd';

class ErrorBoundary extends React.Component {
    state: {
        hasError: Boolean
        info: string
    }

    props: {
        children: any,
    }
    
    constructor(props) {
        super(props)
        this.state = { 
            hasError: false, 
            info: '' 
        }
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.setState({
            info: String(error),
        });

        // @ts-ignore
        console.log(error, info)
    }
  
    render() {
        if (this.state.hasError) {
            //You can render any custom degraded UI
            return (
                <Result
                    status="500"
                    subTitle={this.state.info}
                    extra={<Button type="primary">Report feedback</Button>}
                />
            );
        }
  
        return this.props.children; 
    }
}

export default ErrorBoundary;