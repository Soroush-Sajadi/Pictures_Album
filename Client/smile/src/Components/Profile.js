import React, {useState, useEffect} from 'react';
import { Redirect } from'react-router-dom';
import ReactLoading from 'react-loading';
import ProfileHeader from '../Components/ProfileHeader';
import AddImage from '../Components/AddImage';
import '../Style/Profile.css'


const Profile = () => {
    const [ data, setData ] = useState([]);
    const [ uid, setUid ] = useState(window.localStorage.getItem('uid'));
    const [ refetch, setRefetch ] = useState(false);
    const [ loading, setLoading ] = useState(false)

    const dataIsUpDated = (childData) => {
        setRefetch(childData);
    }

    const loadingState = (childData) => {
        setLoading(childData);
    }

    const getData = async(id) => {
        await fetch(`http://localhost:3000/data/${id}`)
            .then((res) =>res.json())
            .then(data => setData( data ) || setLoading(false))
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
            { data.length !== 0 ? <ProfileHeader profileInfo={ data[0].map(item => [item.profileImage,item.name] )} dataIsUpDated={dataIsUpDated} loadingState={loadingState}/>: null}
            {uid === null ? <Redirect to="/Login"/>
            :
            <div className="profile-wrapper">
                {loading ?
                <div className="profile-loading">
                     <ReactLoading type="bubbles" color="#146db1" height={'20%'} width={'7%'} />
                </div>
                : null}
                {/* {data.length !== 0 ? data[0].map((item, i )=> <p key={i}>{item.name}</p>): null} */}
                <AddImage />
            </div>
            }
        </div>
    )
}

export default Profile;