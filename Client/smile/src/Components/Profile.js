import React, {useState, useEffect} from 'react';
import { Redirect } from'react-router-dom';
import SignOut from './SignOut'

const Profile = () => {
    const [ data, setData ] = useState([]);
    const [ uid, setUid ] = useState(window.localStorage.getItem('uid'));

    const sendToken = async(id) => {
        await fetch(`http://localhost:3000/data/${id}`)
            .then((res) =>res.json())
            .then(data => setData( data[0] ))
    }
    useEffect(() => {
        sendToken(uid)
    },[])
    return(
        <div>
            {uid === null ? <Redirect to="/Login"/>
            :
            <div className="profile-wrapper">
                <SignOut />
                {data.length !== 0 ? data.map((item, i )=> <p key={i}>{item.name}</p>): null}
            </div>
            }
        </div>
    )
}

export default Profile;