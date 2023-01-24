import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
  const HomeRightbar = () => {
    return(
        <>
            <div className="birthdayContainer">
                <img src={`${PF}/gift.png`} alt="" className="birthdayImg" />
                <span className="birthdayText">
                    <b>Dami Oluseun</b> and <b>3 other friends</b> have their birthday today
                </span>
            </div>
            <img src={`${PF}/ad.png`} alt="" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map((u) => (
                    <Online key={u.id} user={u} />
                ))}
            </ul>
        </>
    )
  }

  const ProfileRightbar = () => {
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    const handleFollow = async () => {
        try{
            if(followed){
                await axios.put(`/users/${user._id}/unfollow`, {
                    userID: currentUser._id,
                });
                dispatch({type: "UNFOLLOW", payload: user._id});
            }
            else{
                await axios.put(`/users/${user._id}/follow`, {
                    userID: currentUser._id,
                });
                dispatch({type: "FOLLOW", payload: user._id});
            }
            setFollowed(!followed);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
                console.log(currentUser.followings.includes(user?._id))
            }
            catch(err){
                console.log(err);
            }
        }
        getFriends();
    }, [user])

    //check if you're following the person on the right bar
    // useEffect(() => {
    //     setFollowed(currentUser.followings.includes(user?._id))
    // }, [currentUser, user]);

    return(
        <>
            {user.username !== currentUser.username  && (
                <button className="rightbarFollowButton" onClick={handleFollow}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add /> }
                </button>
            )}
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoKey">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoKey">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoKey">
                        {user.relationship === 1 
                        ? "Single" 
                        : user.relationship === 2 
                        ? "Married"
                        : "It's Complicated"}
                    </span>
                </div>
            </div>
            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
                {friends.map((friend, key) => (
                    <Link 
                        key={key} 
                        style={{textDecoration: "none"}} 
                        to={"/profile/" + friend.username}
                    >
                        <div className="rightbarFollowing">
                            <img 
                                src={friend.profilePicture 
                                    ? PF+friend.profilePicture 
                                    : PF+"person/noAvatar.png"
                                }
                                alt="" 
                                className="rightbarFollowingImg" 
                            />
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
  }
  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
            {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
    </div>
  )
}
