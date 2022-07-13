import React, {useState, useEffect} from 'react'
import './Profile.css'

function Profile() {
  const Id = sessionStorage.getItem('id');
  const [clickedUser, setClickedUser] = useState([]);
  const [companyInfo, setCompany] = useState([]);
  const [addressInfo, setAddressInfo] = useState([]);

  const getClickedProfile = async (id) => {
    const api = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/'+id;
    const fetchProfile = await fetch(api);
    const fetchedProfile = await fetchProfile.json();
    setClickedUser(fetchedProfile);
    setCompany(fetchedProfile.company);
    setAddressInfo(fetchedProfile.address);
}



  useEffect(() =>{
    getClickedProfile(Id);
  }, [Id]);

    return (
    <div className="profilePage">
        <div className="profilePageContent">
            <div className="profile-img">
              <img src={clickedUser.imageUrl + '?v=' + clickedUser.id} alt={clickedUser.name} className="img"/>
            </div>

            <div className="profile-info">
                <p className="info-p">info</p>
                <div className="info-name-title"> 
                    <h3 className="info-name">{clickedUser.name}</h3>
                    <p className="info-title">{clickedUser.title}</p>
                </div>
                <div className="info-emails">
                    <p className="info-email"><u>Email:</u> {clickedUser.email}</p>
                    <p className="info-ip "><u>Ip Address:</u> {clickedUser.ip}</p>
                    <p className="info-ip"><u>Ip Address:</u> {clickedUser.ip}</p>
                    <p className="info-area"><u>Job Area:</u> {clickedUser.jobArea}</p>
                    <p className="info-type"><u>Job Type:</u> {clickedUser.jobType}</p>
                </div>
            </div>
            <div className="profile-address">
                <p className="address-p">Address</p>
                <div className="profile-company-info">
                    <h3 className="address-name">{companyInfo.name}</h3>
                    <h3 className="address-suffix">{companyInfo.suffix}</h3>
                </div>
                <div className="profile-address-info">
                    <p className="address-city"><u>city:</u> {addressInfo.city}</p>
                    <p className="address-country"><u>country:</u> {addressInfo.country}</p>
                    <p className="address-state"><u>state:</u> {addressInfo.state}</p>
                    <p className="address-streetAddress"><u>streetAddress:</u> {addressInfo.streetAddress}</p>
                    <p className="address-zipCode"><u>zipCode:</u> {addressInfo.zipCode}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile