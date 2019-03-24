import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            days: 0,
            hours: 0,
            minuites: 0,
            seconds: 0,
        });
        console.log(this.state.userDate);
        // this.startTimer();
    }

    componentWillMount() {
        this.startTimer(this.props.date);
    }

    componentDidMount() {
        setInterval(() => this.startTimer(this.props.date), 1000)
    }

    startTimer(userDate) {
        userDate = new Date(userDate);
        userDate = userDate.getTime();
        let TimeLeft = userDate - Date.parse(new Date());
        console.log('this is TimeLeft', TimeLeft)
        console.log(TimeLeft + ' hey');
        this.setState({
            days: (TimeLeft / (60 * 60 * 24 * 1000)).toFixed(0),
            hours: (TimeLeft / (60 * 60 * 1000)).toFixed(0) % 24,
            minuites: (TimeLeft / (60 * 1000)).toFixed(0) % 60,
            seconds: (TimeLeft / (1000)).toFixed(0) % 60
        })
    }

    leadingZero(num){
        if(num<10){
           return '0'+num;
        }
        else{
            return num
        }
    }

    render() {
        return <div>
            <div id='timeCounter'>{this.state.days} days</div>
            <div id='timeCounter'>{this.leadingZero(this.state.hours)} hours</div>
            <div id='timeCounter'>{this.leadingZero(this.state.minuites)} minuites</div>
            <div id='timeCounter'>{this.leadingZero(this.state.seconds)} seconds</div>
        </div>
    }
}

export default Counter;