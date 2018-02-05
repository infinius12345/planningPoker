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
                <div class="form-group">
                    <label for="usr">Story Name:</label>
                    <input type="text" class="form-control" id="usr" value={this.state.value}
                           onChange={this.handleChange}
                           onClick={this.onClick}

                    />
                    <button className="btn btn-primary btn-sm" onClick={this.onAddClick}
                        type="button">Add
                    </button>
                </div>
            </div>
        );
    }
}