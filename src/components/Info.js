import React, { Component } from 'react'

import '../stylesheets/info.css'

import alertData from '../tempData/alerts.json'
import articleData from '../tempData/articles.json'
import campgroundData from '../tempData/campgrounds.json'
import eventsData from '../tempData/events.json'
import lessonData from '../tempData/lessonplans.json'
import newsData from '../tempData/newsreleases.json'
import pplData from '../tempData/people.json'
import placesData from '../tempData/places.json'
import vcenterData from '../tempData/visitorcenters.json'

const API = 'https://developer.nps.gov/api/v1/';
const KEY = 'kTXawZC8Up8xkPa8gocEoJ9ZRAeXGZnKzx5PxtcS';

function splitInfo(info) {
    var temp = info.split("\n").map((item, key) => (
        <span key={key}>{item}<br /></span>
    ));
    return temp;
}

function eventHtml(e) {
    return { __html: e.description };
}

function isEmptyObj(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

class Info extends Component {

    constructor(props) {
        super(props);

        this.state = {
            parkInfo: {},
            alerts: {},
            articles: {},
            campgrounds: {},
            events: {},
            lessonplans: {},
            newsreleases: {},
            people: {},
            places: {},
            visitorcenters: {},

            // alerts: alertData,
            // articles: articleData,
            // campgrounds: campgroundData,
            // events: eventsData,
            // lessonplans: lessonData,
            // newsreleases: newsData,
            // people: pplData,
            // places: placesData,
            // visitorcenters: vcenterData,
        }

        //parkInfo.images[0].url

        this.state.parkInfo = this.props.parks.data.find(function (element) {
            return element.parkCode === props.id;
        });

        fetch(API + 'alerts?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ alerts: data }))
            .catch(console.log);

        fetch(API + 'articles?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ articles: data }))
            .catch(console.log);

        fetch(API + 'campgrounds?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ campgrounds: data }))
            .catch(console.log);

        fetch(API + 'events?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ events: data }))
            .catch(console.log);

        fetch(API + 'lessonplans?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ lessonplans: data }))
            .catch(console.log);

        fetch(API + 'newsreleases?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ newsreleases: data }))
            .catch(console.log);

        fetch(API + 'people?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ people: data }))
            .catch(console.log);

        fetch(API + 'places?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ places: data }))
            .catch(console.log);

        fetch(API + 'visitorcenters?parkCode=' + this.props.id + '&api_key=' + KEY)
            .then(response => response.json())
            .then(data => this.setState({ visitorcenters: data }))
            .catch(console.log);
    }

    render() {
        console.log("Specific Park Info");
        console.log(this.state.parkInfo);
        // console.log("Alerts");
        // console.log(this.state.alerts);
        // console.log("Articles");
        // console.log(this.state.articles);
        // console.log("Campgrounds");
        // console.log(this.state.campgrounds);
        console.log("Events");
        console.log(this.state.events);
        // console.log("Lesson Plans");
        // console.log(this.state.lessonplans);
        // console.log("News Relesases");
        // console.log(this.state.newsreleases);
        // console.log("People");
        // console.log(this.state.people);
        // console.log("Places");
        // console.log(this.state.places);
        // console.log("Visitor Centers");
        // console.log(this.state.visitorcenters);

        var states = [this.state.alerts, this.state.articles, this.state.campgrounds, this.state.events, this.state.lessonplans,
        this.state.newsreleases, this.state.people, this.state.places, this.state.visitorcenters];
        var apiLoaded = states.every((st) => {
            return !isEmptyObj(st);
        });

        let stateStr = this.state.parkInfo.states.split(",").join(" ");

        // carousel html
        let carousel = this.state.parkInfo.images.map((img, i) => {
            if (i === 0)
                return (<div className="carousel-item active">
                    <img className="d-block w-100" src={img.url}></img>
                </div>);
            else
                return (<div className="carousel-item">
                    <img className="d-block w-100" src={img.url}></img>
                </div>);
        });

        // carousel indicators html
        let carIndi = this.state.parkInfo.images.map((_, i) => {
            if (i === 0)
                return (<li data-target="#carouselExampleIndicators" data-slide-to={i} className="active"></li>);
            else
                return (<li data-target="#carouselExampleIndicators" data-slide-to={i}></li>);
        });

        // content in alert modal html
        let alertModalDisp;
        if (this.state.alerts && this.state.alerts.total > 0) {
            alertModalDisp = this.state.alerts.data.map((a) => (
                <div className="alerts-text">
                    <h6>{a.title}</h6>
                    <p>{a.description}</p>
                </div>
            ));
        }

        // parkInfo description html
        var descriptionDisp = splitInfo(this.state.parkInfo.description);

        // parkInfo directions info html
        var directionInfoDisp = splitInfo(this.state.parkInfo.directionsInfo);

        // visitor center html
        let vcenterDisp;
        if (this.state.visitorcenters && this.state.visitorcenters.total > 0) {
            vcenterDisp = this.state.visitorcenters.data.map((center) => (
                <div className="visitor-center">
                    <h5>{center.name}</h5>
                    <p>{center.description}</p>
                    {center.directionsInfo !== "" &&
                        <div className="vcenter-dir">
                            <h6>Directions</h6>
                            <p>{center.directionsInfo}</p>
                        </div>
                    }
                    <p className="a-link"><a href={center.url}>More information...</a></p>
                </div>
            ));
        }

        // campgrounds html
        let campgroundDisp;
        if (this.state.campgrounds && this.state.campgrounds.total > 0) {
            campgroundDisp = this.state.campgrounds.data.map((camp) => (
                <div className="campground">
                    <h5>{camp.name}</h5>
                    <p>{camp.description}</p>
                    {camp.directionsoverview !== "" &&
                        <div className="campground-dir">
                            <h6>Directions</h6>
                            <p>{camp.directionsoverview}</p>
                        </div>
                    }
                    {camp.weatheroverview !== "" &&
                        <div className="campground-dir">
                            <h6>Weather</h6>
                            <p>{camp.weatheroverview}</p>
                        </div>
                    }
                    <h6>Regulations</h6>
                    <p>{camp.regulationsoverview}</p>
                    <p className="a-link"><a href={camp.regulationsurl}>More information on regulations...</a></p>
                </div>
            ));
        }

        // places/attractions html
        let placeDisp;
        if (this.state.places && this.state.places.total > 0) {
            placeDisp = this.state.places.data.map((place) => (
                <div className="places">
                    <h5>{place.title}</h5>
                    <p>{place.listingdescription}</p>
                    <p className="a-link"><a href={place.url}>More information...</a></p>
                </div>
            ));
        }

        let pplDisp;
        if (this.state.people && this.state.people.total > 0) {
            pplDisp = this.state.people.data.map((ppl) => (
                <div className="people">
                    <h5>{ppl.title}</h5>
                    <p>{ppl.listingdescription}</p>
                    <p className="a-link"><a href={ppl.url}>More information...</a></p>
                </div>
            ));
        }

        // address html
        let physAddy = this.state.parkInfo.addresses.map((add) => {
            if (add.type === "Physical") {
                return (
                    <p className="p-right-info">
                        {add.line1}<br />
                        {add.line2.length !== 0 && <div>{add.line2} < br /></div>}
                        {add.line3.length !== 0 && <div>{add.line3} < br /></div>}
                        {add.city + ", " + add.stateCode + " " + add.postalCode}
                    </p>
                );
            }
        });

        // contact info html
        let emailDisp = this.state.parkInfo.contacts.emailAddresses[0].emailAddress;
        let contactDisp = this.state.parkInfo.contacts.phoneNumbers.map((num) => {
            if (num.type === "Voice") {
                let numStr = num.phoneNumber;
                return (
                    <div className="contact-info-text">
                        {isNaN(numStr) &&
                            <div className="phone-number">
                                <p className="p-right-info">{numStr}</p>
                            </div>
                        }
                        {!isNaN(numStr) &&
                            <div className="phone-number">
                                <p className="p-right-info">{"(" + numStr.substr(0, 3) + ") " + numStr.substr(3, 3) + "-" + numStr.substr(6, 4)}</p>
                            </div>
                        }
                    </div>
                );
            }
        });

        let articleDisp;
        if (this.state.articles && this.state.articles.total > 0) {
            articleDisp = this.state.articles.data.map((art) => (
                <div className="article">
                    <h6>{art.title}</h6>
                    <p>{art.listingdescription}</p>
                    <p className="a-link"><a href={art.url}>View full article...</a></p>
                </div>
            ));
        }

        let eventsDisp;
        if (this.state.events && this.state.events.total > 0) {
            eventsDisp = this.state.events.data.map((e) => (
                <div className="event">
                    <h6>{e.title}</h6>
                    {e.description.includes("<") && <div dangerouslySetInnerHTML={eventHtml(e)}></div>}
                    {!e.description.includes("<") && <p>{e.description}</p>}
                </div >
            ));
        }

        let newsDisp;
        if (this.state.newsreleases && this.state.newsreleases.total > 0) {
            newsDisp = this.state.newsreleases.data.map((news) => (
                <div className="news-release">
                    <h6>{news.title}</h6>
                    <p>{news.abstract}</p>
                    <p className="a-link"><a href={news.url}>View full news release...</a></p>
                </div>
            ));
        }

        let lessonDisp;
        if (this.state.lessonplans && this.state.lessonplans.total > 0) {
            lessonDisp = this.state.lessonplans.data.map((lesson) => (
                <div className="lesson">
                    <h6>{lesson.title}</h6>
                    <p>{lesson.questionobjective}</p>
                    <p className="a-link"><a href={lesson.url}>View full lesson plan...</a></p>
                </div>
            ));
        }

        if (!apiLoaded) {
            return (
                <div className="container">
                    {/* carousel with pictures */}
                    <div className="row">
                        <div className="card carousel-card">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <div>
                                    <div className="park-header">
                                        <h3 className="park-title">{this.state.parkInfo.fullName}</h3>
                                        <p className="park-desig-state">
                                            {this.state.parkInfo.designation + " "}
                                            <small>{stateStr}</small>
                                        </p>
                                    </div>
                                    <div className="gradient">
                                    </div>
                                </div>
                                <ol className="carousel-indicators">
                                    {carIndi}
                                </ol>
                                <div className="carousel-inner">
                                    {carousel}
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="container loading-container d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            )
        }

        var content = (
            <div className="container">

                {/* carousel with pictures */}
                <div className="row">
                    <div className="card carousel-card">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <div>
                                <div className="park-header">
                                    <h3 className="park-title">{this.state.parkInfo.fullName}</h3>
                                    <p className="park-desig-state">
                                        {this.state.parkInfo.designation + " "}
                                        <small>{stateStr}</small>
                                    </p>
                                </div>
                                <div className="gradient">
                                </div>
                            </div>
                            <ol className="carousel-indicators">
                                {carIndi}
                            </ol>
                            <div className="carousel-inner">
                                {carousel}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Alert Container */}
                <div className="row">
                    {this.state.alerts.total > 0 &&
                        <div className="alert alert-danger row-alert" role="alert" data-toggle="modal" data-target="#exampleModal">
                            <div className="alert-message d-flex align-items-center">
                                <span class="badge badge-light">{this.state.alerts.total}</span>
                                <div className="alert-text">
                                    View Alerts in Effect
                                </div>
                            </div>

                            {/* Alert Modal */}
                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria- labelledby="exampleModalLabel" aria-hidden="true" >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title alert-modal-title" id="exampleModalLabel">Alerts in Effect</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {alertModalDisp}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>

                {/* container with all specific park info */}
                <div className="row row-info">

                    <div className="col-8">

                        <div className="card content-pane">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs overflow-hidden" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="pills-overview-tab" data-toggle="pill" href="#pills-overview" role="tab" aria-controls="pills-overview" aria-selected="true">Overview</a>
                                    </li>
                                    {this.state.visitorcenters.total > 0 &&
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-vcenters-tab" data-toggle="pill" href="#pills-vcenters" role="tab" aria-controls="pills-vcenters" aria-selected="false">Visitor Centers</a>
                                        </li>
                                    }
                                    {this.state.campgrounds.total > 0 &&
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-campgrounds-tab" data-toggle="pill" href="#pills-campgrounds" role="tab" aria-controls="pills-campgrounds" aria-selected="false">Campgrounds</a>
                                        </li>
                                    }
                                    {this.state.places.total > 0 &&
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-places-tab" data-toggle="pill" href="#pills-places" role="tab" aria-controls="pills-places" aria-selected="false">Attractions</a>
                                        </li>
                                    }
                                    {this.state.people.total > 0 &&
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-people-tab" data-toggle="pill" href="#pills-people" role="tab" aria-controls="pills-people" aria-selected="false">Related People</a>
                                        </li>
                                    }
                                </ul>
                            </div>
                            <div className="card-body card-info-pane">
                                <div className="tab-content pane-scroll" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab">
                                        {/* Overview Text */}
                                        <p className="card-text">{descriptionDisp}</p>
                                        <h6>Directions</h6>
                                        <p className="card-text">{directionInfoDisp}</p>
                                        <a href={this.state.parkInfo.directionsUrl} target="_blank">More information on directions...</a>
                                    </div>
                                    <div className="tab-pane fade" id="pills-vcenters" role="tabpanel" aria-labelledby="pills-vcenters-tab">
                                        {vcenterDisp}
                                    </div>
                                    <div className="tab-pane fade" id="pills-campgrounds" role="tabpanel" aria-labelledby="pills-campgrounds-tab">
                                        {campgroundDisp}
                                    </div>
                                    <div className="tab-pane fade" id="pills-places" role="tabpanel" aria-labelledby="pills-places-tab">
                                        {placeDisp}
                                    </div>
                                    <div className="tab-pane fade" id="pills-people" role="tabpanel" aria-labelledby="pills-people-tab">
                                        {pplDisp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right column with contact information */}
                    <div className="col-4">

                        <div className="row row-info-button">
                            <a href={this.state.parkInfo.url} target="_blank" className="btn btn-success btn-more-info d-flex align-items-center justify-content-center">View more info</a>
                        </div>
                        <div className="row">
                            <div className="col-5 col-left-info">
                                <p className="p-left-info">Address</p>
                            </div>
                            <div className="col-7 col-right-info">
                                {physAddy}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-5 col-left-info">
                                <p className="p-left-info">Phone</p>
                            </div>
                            <div className="col-7 col-right-info">
                                {contactDisp}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-5 col-left-info">
                                <p className="p-left-info">Email</p>
                            </div>
                            <div className="col-7 col-right-info">
                                <p className="p-right-info">{emailDisp}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-5 col-left-info">
                                <p className="p-left-info">
                                    Monday<br />
                                    Tuesday<br />
                                    Wednesday<br />
                                    Thursday<br />
                                    Friday<br />
                                    Saturday<br />
                                    Sunday<br />
                                </p>
                            </div>
                            <div className="col-7 col-right-info">
                                <p className="p-right-info">
                                    {this.state.parkInfo.operatingHours[0].standardHours.monday}<br />
                                    {this.state.parkInfo.operatingHours[0].standardHours.tuesday}<br />
                                    {this.state.parkInfo.operatingHours[0].standardHours.wednesday}<br />
                                    {this.state.parkInfo.operatingHours[0].standardHours.thursday}<br />
                                    {this.state.parkInfo.operatingHours[0].standardHours.friday}<br />
                                    {this.state.parkInfo.operatingHours[0].standardHours.saturday}<br />
                                    {this.state.parkInfo.operatingHours[0].standardHours.sunday}<br />
                                </p>
                            </div>
                        </div>

                        <div className="row extra-info-row">
                            <div className="col col-left-info">
                                {this.state.articles.total > 0 && <p className="extra-info" data-toggle="modal" data-target="#articleModalLong">Articles</p>}
                                {this.state.events.total > 0 && <p className="extra-info" data-toggle="modal" data-target="#eventsModalLong">Events</p>}
                                {this.state.newsreleases.total > 0 && <p className="extra-info" data-toggle="modal" data-target="#newsModalLong">News Releases</p>}
                                {this.state.lessonplans.total > 0 && <p className="extra-info" data-toggle="modal" data-target="#lessonModalLong">Lesson Plans</p>}
                            </div>
                            {/* Article Modal */}
                            <div className="modal fade" id="articleModalLong" tabindex="-1" role="dialog" aria- labelledby="articleModalLongTitle" aria-hidden="true" >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="articleModalTitle">Articles</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {articleDisp}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event Modal */}
                            <div className="modal fade" id="eventsModalLong" tabindex="-1" role="dialog" aria- labelledby="eventsModalLongTitle" aria-hidden="true" >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="eventsModalTitle">Events</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {eventsDisp}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* News Releases Modal */}
                            <div className="modal fade" id="newsModalLong" tabindex="-1" role="dialog" aria- labelledby="newsModalLongTitle" aria-hidden="true" >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="newsModalTitle">News Releases</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {newsDisp}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lesson Plans */}
                            <div className="modal fade" id="lessonModalLong" tabindex="-1" role="dialog" aria- labelledby="lessonModalLongTitle" aria-hidden="true" >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="lessonModalTitle">Lesson Plans</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {lessonDisp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );

        return (content);
    }
}

export default Info;