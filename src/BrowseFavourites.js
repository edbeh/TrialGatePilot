import React from "react";
import "./BrowseTrials.css";
import Navbar from "./Navbar.js";
import Jumbotron from "./Jumbotron.js";
import Spinner from "./Spinner.js";
import LoadMoreBtn from "./LoadMoreBtn.js";
import ScrollUpButton from "react-scroll-up-button";
import { Card } from "./Card.js";
import { record_size } from "./configuration.js";

class BrowseFavourites extends React.Component {
  state = {
    loading: true,
    min_rnk: 1,
    max_rnk: record_size,
    ConditionSearch: "",
    OfficialTitle: "",
    LocationSearch: "",
    OverallStatus: "",
    StudyType: "",
    HealthyVolunteers: "",
    Gender: "",
    StdAge: "",
    LocationCountry: "Singapore",
    NCTId: "",
    studiesFound: 0,
    trials: [],
  };

  apiGenerator() {
    const api_base_url = "https://clinicaltrials.gov/api/query/full_studies?";
    const keyPrefix = "AREA%5B";
    const keySuffix = "%5D";
    const exprPrefix = "%28";
    const exprSuffix = "%29";
    let expr = "";
    for (let key in this.state) {
      if (key[0] === key[0].toUpperCase() && this.state[key] !== "") {
        if (key === "OverallStatus") {
          expr += `${keyPrefix}${key}${keySuffix}COVERAGE%5BFullMatch%5D${exprPrefix}${this.state[key]}${exprSuffix}+AND+`; // special handling to filter out terms like 'not yet recruiting'
        } else if (key === "NCTId") {
          let NCTIds = this.state[key].join("+OR+");
          expr += `${keyPrefix}${key}${keySuffix}${exprPrefix}${NCTIds}${exprSuffix}+AND+`; // handle favourite studies
        } else {
          expr += `${keyPrefix}${key}${keySuffix}${exprPrefix}${this.state[key]}${exprSuffix}+AND+`;
        }
      }
    }
    if (expr.length > 0) expr = expr.substr(0, expr.length - 5); //remove final '+AND+'
    return `${api_base_url}&expr=${expr}&min_rnk=${this.state.min_rnk}&max_rnk=${this.state.max_rnk}&fmt=json`;
  }

  fetchItems = (api_url) => {
    fetch(api_url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          studiesFound: res.FullStudiesResponse.NStudiesFound,
          trials: res.FullStudiesResponse.FullStudies,
        });
      });
  };

  componentDidMount() {
    let fav = JSON.parse(localStorage.getItem("favourite")) || [];
    if (fav.length > 0) {
        this.setState({
            NCTId: fav,
          });
      
          this.timeout = setTimeout(() => {
            let api_url = this.apiGenerator();
            this.fetchItems(api_url);
          }, 100);
    } else {
        this.setState({
            loading: false,
        })
    }
  }
  
  handleConditionSearch = (searchTerm) => {
    this.setState({
      loading: true,
      ConditionSearch: searchTerm,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  handleStudySearch = (searchTerm) => {
    this.setState({
      loading: true,
      OfficialTitle: searchTerm,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  handleLocationSearch = (searchTerm) => {
    this.setState({
      loading: true,
      LocationSearch: searchTerm,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  getOverallStatus = () => {
    const recruitingStatus = document.getElementById("status-recruiting");
    const notRecruitingStatus = document.getElementById(
      "status-not-recruiting"
    );
    let result = [];
    recruitingStatus.checked && result.push("Recruiting");
    notRecruitingStatus.checked && result.push("NOT Recruiting");
    return result.join("+OR+");
  };

  handleRecruitingClick = () => {
    const overallStatus = this.getOverallStatus();
    this.setState({
      loading: true,
      OverallStatus: overallStatus,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  getStudyType = () => {
    const interventionalType = document.getElementById("type-interventional");
    const observationalType = document.getElementById("type-observational");
    let result = [];
    interventionalType.checked && result.push("Interventional");
    observationalType.checked && result.push("Observational");
    if (result.length === 2) result = []; // include both types if both checkboxes are selected
    return result.join("+OR+");
  };

  handleTypeClick = () => {
    const studyType = this.getStudyType();
    this.setState({
      loading: true,
      StudyType: studyType,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  getHealthyVolunteers = () => {
    const volunteersYes = document.getElementById("healthy-volunteers-yes");
    const volunteersNo = document.getElementById("healthy-volunteers-no");
    let result = [];
    volunteersYes.checked && result.push("Accepts Healthy Volunteers");
    volunteersNo.checked && result.push("NOT Accept Healthy Volunteers");
    return result.join("+OR+");
  };

  handleVolunteersClick = () => {
    const healthyVolunteers = this.getHealthyVolunteers();
    this.setState({
      loading: true,
      HealthyVolunteers: healthyVolunteers,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  getGenders = () => {
    const genderMale = document.getElementById("gender-male");
    const genderFemale = document.getElementById("gender-female");
    let result = [];
    genderMale.checked && result.push("Male");
    genderFemale.checked && result.push("Female");
    if (result.length === 2) result = []; // include both genders if both checkboxes are selected
    return result.join("+OR+");
  };

  handleGenderClick = () => {
    const gender = this.getGenders();
    this.setState({
      loading: true,
      Gender: gender,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  getAgeGroups = () => {
    const ageChild = document.getElementById("age-child");
    const ageAdult = document.getElementById("age-adult");
    const ageOldAdult = document.getElementById("age-old-adult");
    let result = [];
    ageChild.checked && result.push("Child");
    ageAdult.checked && result.push("Adult");
    ageOldAdult.checked && result.push("Older Adult");
    if (result.length === 3) result = []; // include all age groups if all checkboxes are selected
    return result.join("+OR+");
  };

  handleAgeGroupClick = () => {
    const ageGroup = this.getAgeGroups();
    this.setState({
      loading: true,
      StdAge: ageGroup,
      min_rnk: 1,
      max_rnk: record_size,
      trials: [],
    });
    let api_url = this.apiGenerator();
    this.fetchItems(api_url);
  };

  loadMoreItems = () => {
    this.setState({
      loading: true,
      min_rnk: this.state.min_rnk + record_size,
      max_rnk: this.state.max_rnk + record_size,
    });

    this.timeout = setTimeout(() => {
      if (this.state.min_rnk <= this.state.studiesFound) {
        let api_url = this.apiGenerator();
        fetch(api_url)
          .then((res) => res.json())
          .then((res) => {
            this.setState((state) => ({
              loading: false,
              trials: [...state.trials, ...res.FullStudiesResponse.FullStudies],
            }));
          });
      } else {
        this.setState({
          loading: false,
        });
        alert("All records shown");
      }
    }, 750);
  };

  render() {
    return (
      <div className="container-fluid p-0">
        <ScrollUpButton
          ContainerClassName="AnyClassForContainer"
          TransitionClassName="AnyClassForTransition"
        />
        <Navbar handleConditionSearch={this.handleConditionSearch} favCount={this.state.NCTId.length} />
        <Jumbotron
          studiesFound={this.state.studiesFound}
          loading={this.state.loading}
          handleConditionSearch={this.handleConditionSearch}
          handleStudySearch={this.handleStudySearch}
          handleLocationSearch={this.handleLocationSearch}
          handleRecruitingClick={this.handleRecruitingClick}
          handleTypeClick={this.handleTypeClick}
          handleVolunteersClick={this.handleVolunteersClick}
          handleGenderClick={this.handleGenderClick}
          handleAgeGroupClick={this.handleAgeGroupClick}
        />
        {this.state.trials !== undefined && this.state.NCTId.length > 0 ? (
          <div className="container">
            <div className="row">
              <div
                className={`border content ${
                  this.state.loading &&
                  this.state.min_rnk === 1 &&
                  "content-loading"
                }`}
              >
                <table className="table">
                  <tbody>
                    {this.state.trials
                      .filter(
                        (trial) =>
                          trial.Study.ProtocolSection.StatusModule
                            .OverallStatus !== "Withheld"
                      )
                      .map((trial, i) => (
                        <Card study={trial.Study} index={i} />
                      ))}
                  </tbody>
                </table>
              </div>

              {/* sidebar */}
              <div>{/* to render sidebar here */}</div>
            </div>
            {this.state.loading ? (
              <Spinner />
            ) : this.state.studiesFound > this.state.max_rnk ? (
              <LoadMoreBtn handleClick={this.loadMoreItems} />
            ) : (
              <div className="container text-center mt-4 mb-5">
                <span>All records shown</span>
              </div>
            )}
          </div>
        ) 
        :  
        (
          <div className="container text-center not-found">
            <img src={require(`./not-found.jpg`)} alt="not-found" />
            <br />
            <span>No data found</span>
          </div>
        )}
      </div>
    );
  }
}

export default BrowseFavourites;
