import React, {useState,useEffect} from 'react'
import './Home.css'
import Card from './Card.js'

function Home() {

    const [profiles, setProfiles] = useState([]);
    const [showList, setShowList] = useState(false);

    useEffect(() =>{
        const getProfile = async () => {
            const api = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/24';
            const fetchProfile = await fetch(api);
            const fetchedProfile = await fetchProfile.json();
            setProfiles(fetchedProfile.list);
            setShowList(true);
        }

        getProfile();
    })


  return (
    <div className='home'>
        <div className='profileList'>
            {showList ?
            profiles.map((item) =>
                <div className='cardList'>
                    <Card name={item.name} title={item.title} image={item.imageUrl} id={item.id}/>
                </div>
                    )
            : ''}
        </div>
    </div>
  )
}

export default Home