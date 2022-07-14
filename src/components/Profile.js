import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Profile.css'
import Card from './Card'

function Profile(props) {
  const [clickedUser, setClickedUser] = useState([]);
  const [companyInfo, setCompany] = useState([]);
  const [addressInfo, setAddressInfo] = useState([]);
  const [showFriends, setShowFriends] = useState(false);
  const loading = true;
  const [finalFriends, setFinalFriends] = useState([]);
  const [page, setPage] = useState(1);
  const {idNum} = useParams();
  const filteredVisitors = JSON.parse(sessionStorage.getItem('visitedProfiles'));

  const getClickedProfile = async (id) => {
    const api = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/'+id;
    const fetchProfile = await fetch(api);
    const fetchedProfile = await fetchProfile.json();
    setClickedUser(fetchedProfile);
    setCompany(fetchedProfile.company);
    setAddressInfo(fetchedProfile.address);
    props.setVisitedProfiles(oldArr => [...oldArr, fetchedProfile.name]);
}

const getFriends = async (page, id) => {
    const friendsApi = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/'+id+'/friends/'+page+'/24';
    const fetchFriends = await fetch(friendsApi);
    const fetchedFriends = await fetchFriends.json();
    const friendsReady = fetchedFriends.list;
    setFinalFriends(finalFriends.concat(friendsReady));
    setShowFriends(true);
}

const finalFilteredVisitors = filteredVisitors.filter((item, pos) => {
  return filteredVisitors.indexOf(item) === pos;
})


  useEffect(() =>{
    getClickedProfile(idNum);
  }, [idNum]);

  const onScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    
    if (windowBottom >= docHeight-1) {
        setPage(page + 1);
    }
    }

    useEffect(() =>{
      window.addEventListener('scroll', onScroll);
      getFriends(page, idNum);
  }, [page, idNum]);


  const navigate = useNavigate();

    return (
    <div className="profilePage">
      <div className="ProfilecontentPage">
          <div className="profileContent">
              <div className="profile-img">
                <img src={clickedUser.imageUrl + '?v=' + clickedUser.id} alt={clickedUser.name} className="img"/>
              </div>

              <div className="profile-info">
                  <p className="info-p">info</p>
                  <div className="info-name-title"> 
                      <div className="info-name-prefix">
                        <h3 className="info-prefix">{clickedUser.prefix}</h3>
                        <h3 className="info-name">{clickedUser.name}</h3>
                      </div>
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
          <div className="friendsContent">
                <div className="visitedFriendsList">
                    {finalFilteredVisitors.map((item) => 
                    <div className="visitedFriend">
                          <h4>{item}</h4>
                    </div>
                      )}
                </div>
                <h2 className="friends-text">Friends:</h2>
                <div className="friends-list">
                    {showFriends ? 
                    finalFriends.map((item) => 
                      <div className='friends' onClick={() => { navigate(`/user/${item.id}`) }}>
                          <Card name={item.name} prefix={item.prefix} title={item.title} image={item.imageUrl} id={item.id}/>
                      </div>
                    ):''}
                </div>
                <div className='loading'>
                  {loading ? <div id='spinner'></div> : ''}
                </div>
          </div>
        </div>
    </div>
  )
}

export default Profile