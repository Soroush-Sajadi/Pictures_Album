import React, {useState, useEffect} from 'react';
import { Redirect } from'react-router-dom';
import ProfileHeader from '../Components/ProfileHeader';


const Profile = () => {
    const [ data, setData ] = useState([]);
    const [ uid, setUid ] = useState(window.localStorage.getItem('uid'));
    const [ refetch, setRefetch ] = useState(false);

    const dataIsUpDated = (childData) => {
        setRefetch(childData);
    }

    const getData = async(id) => {
        await fetch(`http://localhost:3000/data/${id}`)
            .then((res) =>res.json())
            .then(data => setData( data ))
    }

    useEffect(() => {
        if (refetch) {
            setRefetch(false)
            getData(uid)
        }
    })

    useEffect(() => {
        getData(uid)
    },[])
    return(
        <div>
            { data.length !== 0 ? <ProfileHeader profileInfo={ data[0].map(item => [item.profileImage,item.name] )} dataIsUpDated={dataIsUpDated}/>: null}
            {uid === null ? <Redirect to="/Login"/>
            :
            <div className="profile-wrapper">
                {data.length !== 0 ? data[0].map((item, i )=> <p key={i}>{item.name}</p>): null}
            </div>
            }
        </div>
    )
}

export default Profile;