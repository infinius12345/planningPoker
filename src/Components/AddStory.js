import React from 'react';

export default class AddStory extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: 'Your input is required'};
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
    }

    handleChange(event){
        if (event.key=="Enter"){
            this.onAddClick();
        }else {
            let keyvalue = this.state.value + event.key;
            this.setState({value: keyvalue});
        }
    }

    onClick(e){
        if (this.state.value==='Your input is required') {
            this.setState({value: ''})
        }
    }

    onAddClick(){
        this.props.onbtnClick(this.state.value);
        this.setState({value: ''})
    }

    render() {
        let btncaption = "Add";
        if (this.props.title === "Enter Your Name:"){
            btncaption = "Join";
        }
        return (
            <div>
                <div class="form-group">
                    <label for="usr">{this.props.title}</label>
                    <input type="text" class="form-control" id="usr" value={this.state.value}
                           onKeyPress={this.handleChange}
                           onClick={this.onClick}

                    />
                    <button className="btn btn-primary btn-sm" onClick={this.onAddClick}
                        type="button">{btncaption}
                    </button>
                </div>
            </div>
        );
    }
}