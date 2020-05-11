import React from 'react';
import PropTypes from 'prop-types';
import Filters from './Filters.js';

const Jumbotron = ({ studiesFound, loading, handleStudySearch, handleLocationSearch, handleRecruitingClick, handleTypeClick, handleVolunteersClick, handleGenderClick, handleAgeGroupClick }) => {
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <div className="breadcrumbs">{loading ? 'Connecting to ClinicalTrials.gov database...' : 'Data Sourced from ClinicalTrials.gov'}</div>
                <h1 className="title">{loading ? 'Searching for Studies...' : `${studiesFound.toLocaleString()} ${studiesFound > 1 ? 'Studies' : 'Study'} Found`}</h1>
                <div>
                    <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#filters"><i className="fa fa-filter"></i> Filters</button>
                </div>
                <Filters 
                    handleStudySearch={handleStudySearch}
                    handleLocationSearch={handleLocationSearch}
                    handleRecruitingClick={handleRecruitingClick}
                    handleTypeClick={handleTypeClick}
                    handleVolunteersClick={handleVolunteersClick}
                    handleGenderClick={handleGenderClick}
                    handleAgeGroupClick={handleAgeGroupClick}
                />
            </div>
      </div>
    )
}
Jumbotron.propTypes = {
    studiesFound: PropTypes.number.isRequired
}

export default Jumbotron;