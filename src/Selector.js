import React from "react";
import {MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from "mdbreact";

class Selector extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <MDBDropdown>
                    <MDBDropdownToggle caret color="primary">
                        Time Frame
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem value="short_term" onClick={this.handleClick}>Short
                            Term (4 Weeks)</MDBDropdownItem>
                        <MDBDropdownItem value="medium_term" onClick={this.handleClick}>Medium
                            Term (6 Months)</MDBDropdownItem>
                        <MDBDropdownItem value="long_term" onClick={this.handleClick}>Long
                            Term (Several Years)</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

                <MDBDropdown>
                    <MDBDropdownToggle caret color="primary">
                        Number of Songs
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem value="10" onClick={this.handleClick2}>10</MDBDropdownItem>
                        <MDBDropdownItem value="25" onClick={this.handleClick2}>25</MDBDropdownItem>
                        <MDBDropdownItem value="50" onClick={this.handleClick2}>50</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </div>

        );
    }

    handleClick = (e) => {
        this.props.onSelectorChange(e.target.value);
    }
    handleClick2 = (e) => {
        this.props.onSelectorChange2(e.target.value);
    }

}

export default Selector;