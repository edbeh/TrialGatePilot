import React from 'react';
import { ButtonInfo } from './SlideIn.js';
import SearchStudy from './SearchStudy.js';
import SearchLocation from './SearchLocation.js';
import CheckBoxFilters from './CheckBoxFilters';
// import TextFilters from './TextFilters.js';

const Filters = ({ handleStudySearch, handleLocationSearch, handleRecruitingClick, handleTypeClick, handleVolunteersClick, handleGenderClick, handleAgeGroupClick }) => {
    return (
        <div className="modal fade" key="filters" id="filters" tabIndex="-1" role="dialog" aria-labelledby="filters" aria-hidden="true">
            <div className="modal-dialog modal-dialog-slideout" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Filters</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="">
                            <div>
                                <h6>Study Keyword <ButtonInfo content={'Narrow down your search by providing part of the study name or protocol title.'}/> :</h6>
                                <SearchStudy handleStudySearch={handleStudySearch} />
                            </div>
                            <br/>
                            <div>
                                <h6>Location Keyword <ButtonInfo content={'Narrow down your search by providing desired location of study (e.g. Singapore General Hospital).'} /> :</h6>
                                <SearchLocation handleLocationSearch={handleLocationSearch} />
                            </div>
                            <br/>
                            <div>
                                <h6>Recruitment Status:</h6>
                                <CheckBoxFilters handleClick={handleRecruitingClick} id={'status-recruiting'} name={'Recruiting'} />
                                <CheckBoxFilters handleClick={handleRecruitingClick} id={'status-not-recruiting'} name={'Not Recruiting'} />
                            </div>
                            <br/>
                            <div>
                                <h6>Study Type:</h6>
                                <CheckBoxFilters handleClick={handleTypeClick} id={'type-interventional'} name={'Interventional'} tooltip={'Also known as clinical trials. Participants are assigned to groups that receive one or more intervention/treatment (or no intervention) so that researchers can evaluate the effects of the interventions on biomedical or health-related outcomes.'}/>
                                <CheckBoxFilters handleClick={handleTypeClick} id={'type-observational'} name={'Observational'} tooltip={'A type of clinical study in which participants are identified as belonging to study groups and are assessed for biomedical or health outcomes. A patient registry is a kind of observational study.'} />
                            </div>
                            <br/>
                            <div>
                                <h6>Accepts Healthy Volunteers:</h6>
                                <CheckBoxFilters handleClick={handleVolunteersClick} id={'healthy-volunteers-yes'} name={'Yes'} />
                                <CheckBoxFilters handleClick={handleVolunteersClick} id={'healthy-volunteers-no'} name={'No'} />
                            </div>
                            <br/>
                            <div>
                                <h6>Gender:</h6>
                                <CheckBoxFilters handleClick={handleGenderClick} id={'gender-male'} name={'Male Only'} />
                                <CheckBoxFilters handleClick={handleGenderClick} id={'gender-female'} name={'Female Only'} />
                            </div>
                            <br/>
                            <div>
                                <h6>Age Groups:</h6>
                                <CheckBoxFilters handleClick={handleAgeGroupClick} id={'age-child'} name={'Child (Birth-17)'} />
                                <CheckBoxFilters handleClick={handleAgeGroupClick} id={'age-adult'} name={'Adult (18-64)'}/>
                                <CheckBoxFilters handleClick={handleAgeGroupClick} id={'age-old-adult'} name={'Older Adult (65+)'} />
                            </div>
                            <br/>
                            <div>
                                <h6>Country:</h6>
                                <input type="text" className="form-control" value='Singapore' disabled />
                            </div>
                        </form>
                                           
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={() => window.location.reload()} className="btn btn-primary">Clear Filters</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters;