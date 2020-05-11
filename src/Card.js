import React from 'react';
import PropTypes from 'prop-types';
import FavButton from './FavButton.js';
import SlideIn from './SlideIn.js'
import './Card.css';

const Card = ({ study, index }) => {
    const NCTId = study.ProtocolSection.IdentificationModule.NCTId
    const protocolTitle = study.ProtocolSection.IdentificationModule.OfficialTitle;
    const studyType = study.ProtocolSection.DesignModule.StudyType;
    const healthyVolunteer = study.ProtocolSection.EligibilityModule.HealthyVolunteers;
    let conditions = study.ProtocolSection.ConditionsModule.ConditionList.Condition;
    if (conditions.length > 3) {
        conditions = conditions.slice(0, 2);
        conditions.push('...');
    }
    const enrollmentCount = ('EnrollmentInfo' in study.ProtocolSection.DesignModule) ? study.ProtocolSection.DesignModule.EnrollmentInfo.EnrollmentCount : 'Not Specified';
    let locations = ('ContactsLocationsModule' in study.ProtocolSection && 'LocationList' in study.ProtocolSection.ContactsLocationsModule) ? study.ProtocolSection.ContactsLocationsModule.LocationList.Location : 'No Data';
    if (locations !== 'No Data' && locations.length > 3) {
        locations = locations.slice(0, 2);
        locations.push({LocationFacility: '...'});
    }

    let status = study.ProtocolSection.StatusModule.OverallStatus;
    status = status === 'Recruiting' ? 'Recruiting' : status === 'Completed' ? 'Completed' : 'Not Recruiting';

    const handleFavClick = (favourite, NCTId) => {
        if (favourite) {
            let fav = JSON.parse(localStorage.getItem('favourite')) || [];
            if (fav.indexOf(NCTId) < 0) fav.push(NCTId);
            localStorage.setItem('favourite', JSON.stringify(fav));
        } else {
            let fav = JSON.parse(localStorage.getItem('favourite')) || [];
            if (fav.indexOf(NCTId) >= 0) fav.splice(fav.indexOf(NCTId), 1);
            localStorage.setItem('favourite', JSON.stringify(fav));
        }
    }

    return (
        <tr className="table-card" key={NCTId}>
            <td className="table-serial">
                <span>{index + 1}.</span>
            </td>
            <td className="table-content">
            <span><a data-toggle="modal" href={`#slide-in-${NCTId}`}>{protocolTitle}</a></span>
            <br/>
            <div className="table-content-info">
                <table className="table table-borderless table-sm">
                    <tbody>
                        <tr>
                            <td>Study Type:</td>
                            <td>{studyType}</td>
                        </tr>
                        <tr>
                            <td>{conditions.length > 1 ? 'Target Conditions:' : 'Target Condition:'}</td>
                            <td>{conditions.map(condition => <p>{condition}</p>)}</td>
                        </tr>
                        <tr>
                            <td>Healthy Volunteers:</td>
                            <td>{healthyVolunteer === 'No' ? 'No' : 'Yes'}</td>
                        </tr>
                        <tr>
                            <td>Target Enrolment:</td>
                            <td>{enrollmentCount !== 'Not Specified' ? `${enrollmentCount} participants` : `${enrollmentCount}`}</td>
                        </tr>
                        <tr>
                            <td>{locations.length > 1 ? 'Locations:' : 'Location:'}</td>
                            <td>{locations !== 'No Data' ? locations.map(location => <p>{location.LocationFacility}{location.LocationFacility !== '...' && ','} {location.LocationCountry}</p>) : <p>No Data</p>}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* bottom row */}
            <div className="table-content-more">
                <FavButton handleClick={handleFavClick} NCTId={NCTId} />
                <ButtonStatus status={status}/>
            </div>
            </td>

            <SlideIn study={study}/>
        </tr>
    )
}
Card.propTypes = {
    study: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

const ButtonStatus = ({ status }) => {
    return <span className={`status-badge ${status === 'Recruiting' ? 'status-active' : status === 'Completed' ? 'status-completed' : 'status-inactive'}`}>{status}</span>
}

export { Card, ButtonStatus };