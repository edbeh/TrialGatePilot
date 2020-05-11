import React from 'react';
import { ButtonStatus } from './Card.js'
import Tooltip from '@material-ui/core/Tooltip';

const SlideIn = ({ study }) => {
    const NCTId = study.ProtocolSection.IdentificationModule.NCTId
    const lastUpdate = study.ProtocolSection.StatusModule.LastUpdateSubmitDate;
    const protocolTitle = study.ProtocolSection.IdentificationModule.OfficialTitle;
    const briefSummary = study.ProtocolSection.DescriptionModule.BriefSummary;
    const primaryPurpose = ('DesignInfo' in study.ProtocolSection.DesignModule && 'DesignPrimaryPurpose' in study.ProtocolSection.DesignModule.DesignInfo) ? study.ProtocolSection.DesignModule.DesignInfo.DesignPrimaryPurpose : 'No Data';
    const studyType = study.ProtocolSection.DesignModule.StudyType;
    const interventionDetails = studyType === 'Interventional' ? study.ProtocolSection.ArmsInterventionsModule.InterventionList.Intervention : 'Not Applicable';
    const phase = studyType === 'Interventional' ? study.ProtocolSection.DesignModule.PhaseList.Phase : 'Not Applicable';
    const biospec = ('BioSpec' in study.ProtocolSection.DesignModule) ? study.ProtocolSection.DesignModule.BioSpec.BioSpecDescription : 'Not Applicable';
    const conditions = study.ProtocolSection.ConditionsModule.ConditionList.Condition;
    const enrollmentCount = ('EnrollmentInfo' in study.ProtocolSection.DesignModule) ? study.ProtocolSection.DesignModule.EnrollmentInfo.EnrollmentCount : 'Not Specified';
    const locations = ('ContactsLocationsModule' in study.ProtocolSection && 'LocationList' in study.ProtocolSection.ContactsLocationsModule) ? study.ProtocolSection.ContactsLocationsModule.LocationList.Location : 'No Data';
    let status = study.ProtocolSection.StatusModule.OverallStatus;
    status = status === 'Recruiting' ? 'Recruiting' : status === 'Completed' ? 'Completed' : 'Not Recruiting';
    const healthyVolunteer = study.ProtocolSection.EligibilityModule.HealthyVolunteers;
    const gender = study.ProtocolSection.EligibilityModule.Gender;
    const minAge = study.ProtocolSection.EligibilityModule.MinimumAge;
    const maxAge = ('MaximumAge' in study.ProtocolSection.EligibilityModule) ? study.ProtocolSection.EligibilityModule.MaximumAge : 'No Data';
    const criteria = study.ProtocolSection.EligibilityModule.EligibilityCriteria.split('\n').filter(item => item !== '');
    
    let recipientList = [];
    if ('ContactsLocationsModule' in study.ProtocolSection) {
        if ('CentralContactList' in study.ProtocolSection.ContactsLocationsModule) {
            study.ProtocolSection.ContactsLocationsModule.CentralContactList.CentralContact.forEach(item => {
                item.CentralContactRole === 'Contact' && recipientList.push([item.CentralContactName, item.CentralContactEMail]);
            })
        } else if ('LocationList' in study.ProtocolSection.ContactsLocationsModule) {
            study.ProtocolSection.ContactsLocationsModule.LocationList.Location.forEach(item => {
                ('LocationContactList' in item) && item.LocationContactList.LocationContact.forEach(item => {
                    item.LocationContactRole === 'Contact' && recipientList.push([item.LocationContactName, item.LocationContactEMail]);
                })
            })
        }
    }
    // if (recipientList.length === 0) {recipientList.push(['No Data', 'No Data'])};
    

    return (
        <div className="modal fade" key={NCTId} id={`slide-in-${NCTId}`} tabIndex="-1" role="dialog" aria-labelledby={`slide-in-${NCTId}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-slideout modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <h5 className="modal-title">Study ID: {NCTId}</h5>
                            {/* <h5 classname="modal-title">Last Updated on {lastUpdate}</h5> */}
                            <div className="modal-title-status">
                                <ButtonStatus status={status}/>
                                &nbsp;
                                <span>Last Update: {lastUpdate}</span>
                            </div>
                            
                        </div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <h6 className="font-weight-bold">Protocol Title:</h6>
                            <span>{protocolTitle}</span>
                        </div>
                        <br/>
                        <div>
                            <h6 className="font-weight-bold">Study Summary:</h6>
                            <span>{briefSummary}</span>
                        </div>
                        <br/>
                        <div>
    <h6 className="font-weight-bold">Study Type {studyType === 'Interventional' && <ButtonInfo content={'An interventional trial is a type of clinical study in which participants are assigned to groups that receive one or more intervention/treatment (or no intervention) so that researchers can evaluate the effects of the interventions on biomedical or health-related outcomes.'} />}{studyType === 'Observational' && <ButtonInfo content={'An observational trial is a type of clinical study in which participants are identified as belonging to study groups and are assessed for biomedical or health outcomes. A patient registry is a type of observational study.'} />} :</h6>
                            <span>{studyType} trial</span>
                        </div>
                        <br/>
                        {studyType === 'Interventional' && 
                        (
                            <div>
                                <div>
                                    <h6 className="font-weight-bold">Intervention Arms Involved <ButtonInfo content={'A group or subgroup of participants in a clinical trial that receives a specific intervention/treatment, or no intervention, according to the trial\'s protocol.'} /> :</h6>
                                    <table className="table table-borderless table-sm">
                                    {interventionDetails.map((intervention, index) => {
                                        return (
                                            <div>
                                                <tr>
                                                    <td className="modal-intervention-top">{index + 1}.</td>
                                                    <td className="modal-intervention-top">{intervention.InterventionName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="modal-intervention-bottom"></td>
                                                    <td className="modal-intervention-bottom">{intervention.InterventionDescription}</td>
                                                </tr>
                                            </div>
                                        )      
                                    })}
                                    </table>
                                    
                                </div>
                                <br/>
                                {primaryPurpose !== 'No Data' &&
                                    (
                                        <div>
                                            <div>
                                                <h6 className="font-weight-bold">Primary Purpose <ButtonInfo content={'The main reason for the clinical trial. The types of primary purpose are: treatment, prevention, diagnostic, supportive care, screening, health services research, basic science, and other.'} /> :</h6>
                                                <span>{primaryPurpose}</span>
                                            </div>
                                            <br/>
                                        </div>
                                    )
                                }
                                
                                <div>
                                    <h6 className="font-weight-bold">Study Phase <ButtonInfo content={'The stage of a clinical trial studying a drug or biological product, based on definitions developed by the U.S. Food and Drug Administration (FDA). The phase is based on the study\'s objective, the number of participants, and other characteristics. There are five phases: Early Phase 1 (formerly listed as Phase 0), Phase 1, Phase 2, Phase 3, and Phase 4. Not Applicable is used to describe trials without FDA-defined phases, including trials of devices or behavioral interventions.'} /> :</h6>
                                    <span>{phase}</span>
                                </div>
                                <br/>
                            </div>
                        )}
                        {biospec !== 'Not Applicable' && 
                        (
                            <div>
                                <div>
                                    <h6 className="font-weight-bold">Biospecimens Involved:</h6>
                                    <span>{biospec}</span>
                                </div>
                                <br/>
                            </div>
                        )} 
                        <div>
                        <h6 className="font-weight-bold">{conditions.length > 1 ? 'Target Conditions' : 'Target Condition'} <ButtonInfo content="The disease, disorder, syndrome, illness, or injury that is being studied." /> :</h6>
                            {conditions.map(condition => <p>{condition}</p>)}
                        </div>
                        <br/>
                        <div>
                            <h6 className="font-weight-bold">Target Enrolment <ButtonInfo content="Number of participants that the researchers need for this study."/> :</h6>
                            <span>{enrollmentCount !== 'Not Specified' ? `${enrollmentCount} participants` : `${enrollmentCount}`}</span>
                        </div>
                        <br/>
                        <div>
                            <h6 className="font-weight-bold">Study Locations <ButtonInfo content={'Locations that are currently conducting this study. You may specify your preferred location during your application.'}/> :</h6>
                            {locations !== 'No Data' ? locations.map(location => <p>{location.LocationFacility}, {location.LocationCountry}</p>) : <p>No Data</p>}
                        </div>
                        <br/>

                        <div>
                            <hr/>
                                <h6 className="font-weight-bold">Eligibility Criteria:</h6>
                            <hr/>
                            <div>
                                <h6 className="font-weight-bold">Gender:</h6>
                                <span>{gender}</span>
                            </div>
                            <br/>
                            <div>
                                {maxAge !== 'No Data' ? <h6 className="font-weight-bold">Age Group:</h6> : <h6 className="font-weight-bold">Minimum Age:</h6>}
                                {/* <h6 className="font-weight-bold">Age Group:</h6> */}
                                {maxAge !== 'No Data' ?
                                    <span>{minAge} to {maxAge}</span> :
                                    <span>{minAge}</span>
                                }
                            </div>
                            <br/>
                            <div>
                                <h6 className="font-weight-bold">Accepts Healthy Volunteer:</h6>
                                <span>{healthyVolunteer === 'No' ? 'No' : 'Yes'}</span>
                            </div>
                            <br/>
                            <table className="table table-borderless table-sm">
                                {criteria.map((item) => {
                                    return (
                                        (item.toLowerCase() === 'inclusion criteria:') ?
                                        <tr>
                                            <td colspan="2" className="font-weight-bold modal-inclusion-criteria">Inclusion Criteria <ButtonInfo content={'A type of eligibility criteria. These are the reasons that a person is ALLOWED to participate in a clinical study.'} /> :</td>
                                        </tr> :
                                        (item.toLowerCase() === 'exclusion criteria:') ?
                                        <tr>
                                            <td colspan="2" className="font-weight-bold modal-exclusion-criteria">Exclusion Criteria <ButtonInfo content={'A type of eligibility criteria. These are reasons that a person is NOT ALLOWED to participate in a clinical study.'} /> :</td>
                                        </tr> :
                                        <tr>
                                            <td>&bull;</td>
                                            <td>{item[0] !== item[0].toUpperCase() ? item.replace(item[0], item[0].toUpperCase()) : item}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        <br/>
                        
                        <form className="border p-3">
                            <div className="form-check" data-toggle="collapse" data-target={`#form-${NCTId}`}>
                                <label className="form-check-label">
                                    <input type="checkbox" class="form-check-input" value="" />I have read the information above and acknowledge that I fulfill all eligibility criteria to the best of my knowledge. I agree to be contacted by the study team for further screening and participation in this study.
                                </label>
                            </div>
                            <div id={`form-${NCTId}`} className="collapse text-center">
                                <input required type="text" className="form-control form-control mt-3" placeholder="Name" name="name"/>
                                <input required type="email" className="form-control form-control mt-3" placeholder="Email" name="email"/>
                                <input required type="tel" className="form-control form-control mt-3" placeholder="Contact No." name="contactNo"/>
                                <textarea className="form-control" placeholder="Remarks" rows="3"></textarea>
                                <hr/>
                                {recipientList.map((item, index) => {
                                    return (
                                    <div>
                                        <h6 className="font-weight-bold text-left">Recipient {index + 1}:</h6>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={item[0]} disabled/>
                                        </div>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={item[1]} disabled/>
                                        </div>
                                        <br/>
                                    </div>
                                    )
                                })}
                                <button type="button" className="btn btn-primary">Send to Study Team</button>
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {/* <button type="button" className="btn btn-primary">Apply</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ButtonInfo = ({ content }) => {
    return (
        <Tooltip title={content} arrow>
            <i className="fa fa-info-circle"></i>
        </Tooltip>
    )
}

export default SlideIn;