import React from 'react';
import {MDBBtn} from "mdbreact";
import authenticate from "./Authenticate";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import Selector from "./Selector"

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "Filler body",
            authed: false,
            changed: false,
            items: [{
                name: "testerino",
                album: {
                    images: ["", "", ""]
                },
                artists: [{name: ""}]
            },],
            songUrls: [],
            timeRange: "short_term",
            numSongs: "10"
        };
        this.getItems = this.getItems.bind(this)
        this.itemCallback = this.itemCallback.bind(this)
        this.populateArrays = this.populateArrays.bind(this)
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.handleSelectorChange2 = this.handleSelectorChange2.bind(this);

    }

    componentDidMount() {
        let audio = document.getElementsByClassName("myAudio");
        audio.volume = 0.4;
    }

    render() {
        var {authed, items, songUrls} = this.state;
        //console.log("Render: " + items[0].name);
        if (!authed) {
            return (
                <div className="buttonDiv">
                    <MDBBtn onClick={this.getItems} gradient="aqua">
                        Authenticate here!
                    </MDBBtn>
                </div>

            )
        }
        return (
            <div>
                {/*<div className="buttonDiv">*/}
                {/*    <MDBBtn color="secondary" block>*/}
                {/*        Refresh Auth (not working)*/}
                {/*    </MDBBtn>*/}
                {/*</div>*/}
                <div className="buttonDiv">
                    <Selector onSelectorChange={this.handleSelectorChange}
                              onSelectorChange2={this.handleSelectorChange2}></Selector>
                    <MDBBtn onClick={this.getItems} gradient="aqua">
                        Go!
                    </MDBBtn>
                </div>


                {items.map((item, index) => (
                    <div>
                        <div className="albumName">
                            {index + 1}. {this.checkName(item.name)}
                        </div>

                        <div className="view overlay">
                            <img
                                className="albumImage"
                                src={songUrls[index]}
                                alt="Album"
                            />
                            <div className="mask rgba-grey-light">
                                <p className="overlayText">
                                    Artist: {item.artists[0].name}
                                    <br></br>
                                    Album: {item.album.name}
                                    <br></br>
                                    Release Date: {item.album.release_date}
                                    <br></br>
                                    Open in Spotify: &nbsp;
                                    <a href={item.uri}>
                                        Link to Spotify
                                    </a>
                                </p>
                                <div className="myAudio">
                                    <audio controls
                                           src={item.preview_url}
                                    />
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                    </div>

                ))
                }
            </div>
        );
    }

    checkName(name) {
        let len = name.length;
        if (len > 30) {
            return name.substring(0, 27) + "...";
        } else {
            return name;
        }
    }

    handleSelectorChange(val) {
        this.setState({
            timeRange: val,
            changed: true
        });
        //console.log("handle selector: " + val);
    }

    handleSelectorChange2(val) {
        this.setState({
            numSongs: val,
            changed: true
        });
        //console.log("handle selector: " + val);
    }

    getItems() {
        if (this.state.authed === false || this.state.changed) {
            var accessToken = authenticate();
            var request = require('request');
            var headers = {
                'Authorization': 'Bearer ' + accessToken
            };
            var options = {
                url: 'https://api.spotify.com/v1/me/top/tracks?time_range=' + this.state.timeRange + '&limit=' + this.state.numSongs, //max limit 50
                headers: headers,
                json: true
            };
            console.log(options.url);
            request(options, this.itemCallback);
        }
    }

    itemCallback(error, response, body) {
        if (!error && response.statusCode === 200) {
            this.populateArrays(body);
        }
    }

    populateArrays(JsonObject) {
        //console.log(JSON.stringify(JsonObject));
        let items = JsonObject.items;
        this.setState({
            items: items,
            authed: true,
            songUrls: "",
            changed: false,
        })
        for (let i of items) {
            this.setState({
                    songUrls: [...this.state.songUrls, i.album.images[1].url]
                }
            )
        }
    }
}


export default Track;