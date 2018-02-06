import React from 'react';

export default class AddStory extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    };

    handleKeyUp(event) {
        // If the user hits the Enter key and supplied a user name
        // continue to the planning poker layout.
        if (event.keyCode === 13 && this.state.value !== "") {
            this.onAddClick();
        }
    }

    componentDidMount(){
        this.nameInput.focus(); // autoFocus does NOT work so this is a workaround.
        window.addEventListener('keyup', this.handleKeyUp, false);
    }

    // Need to unbind the user name input event listener here otherwise
    // it will keep adding more users when the enter key is pressed when
    // adding stories (and we don't want that).
    componentWillUnmount(){
        window.removeEventListener('keyup', this.handleKeyUp, false);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    onAddClick(){
        this.props.onbtnClick(this.state.value);
        this.setState({value: ''})
    }

    render() {
        let btncaption = "Add Story";
        let placeholdertext = "Enter a story name here";

        if (this.props.title === "Enter Your Name:"){
            btncaption = "Join";
            placeholdertext = "Type your name here then select '" + btncaption + "' to enter the planning poker";
        }
        return (
            <div>
                <div className="form-group">
                    <label for="usr">{this.props.title}</label>
                    <input type="text" className="form-control" id="usr" value={this.state.value}
                           onChange={this.handleChange}
                           placeholder={placeholdertext}
                           ref={(input) => { this.nameInput = input; }}
                    />
                    <button className="btn btn-primary btn-sm" onClick={this.onAddClick}
                        type="button">{btncaption}
                    </button>
                </div>
            </div>
        );
    }
}