import React from 'react';

export default class AddStory extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: 'Set Story Description'};
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});

    }

    onClick(e){
        if (this.state.value==='Set Story Description') {
            this.setState({value: ''})
        }
    }

    onAddClick(){
        this.props.onbtnClick(this.state.value);
        this.setState({value: ''})
    }

    render() {
        return (
            <div>
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                onClick={this.onClick}
            />
            <button className="btn btn-primary btn-lg" onClick={this.onAddClick}
                    type="button">Add</button>
            </div>
        );
    }
}