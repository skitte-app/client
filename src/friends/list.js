import React from 'react';
import { UserPicture, UserImage } from '../profiles/components';


export function Friend(props) {
    const {user, accept_rqbtn, ignore_rqbtn, handleReq, requests, requestLoading, setRequestLoading, setRequestLoading2, requestLoading2} = props;
    const friendsList = user.friends_list.friends.map(friend => {
        return (
                <div className="border p-4 rounded m-2" key={friend[2]}>
                {friend[1] ? <UserImage friend={friend} />
                 : 
                 <UserPicture friend={friend[0]} />
                 }
                 <br />
                <li>{friend[0]}</li>
            </div>
        )
    })
    const friendRequestList = user.received_request.requests.map(friend => {
        const handleAcceptRequest = (event) => {
            event.preventDefault();
            if (handleReq && !requestLoading2) {
                handleReq(friend[0], accept_rqbtn);
                setRequestLoading(true);
                var id = user.received_request.requests.indexOf(friend);
                user.received_request.requests.shift(id);
            }
          };
          
      const handleIgnoreRequest = (event) => {
        event.preventDefault();
        if (handleReq && !requestLoading) {
            handleReq(friend[0], ignore_rqbtn);
            setRequestLoading(false);
            setRequestLoading2(true);
            var id = user.received_request.requests.indexOf(friend);
            user.received_request.requests.shift(id);
        }
      };
        return (
                <div className="border p-4 rounded m-2" key={user.received_request.requests.indexOf(friend)}>
                {friend[1] ? <UserImage friend={friend} />
                 : 
                 <UserPicture friend={friend[0]} />
                 }
                 <em>{friend[0]}</em>
                 <br />
                 <button className="btn m-2" onClick={handleAcceptRequest} data-name={friend[0]}>
                    {accept_rqbtn}
                </button>
                <button className="btn btn-secondary m-2" onClick={handleIgnoreRequest} data-name={friend[0]}>
                    {ignore_rqbtn}
                </button>
            </div>
        )
    })
    return (
    <React.Fragment>
        {!user.received_request.count || user.received_request.count === 0 || !user.is_user || !requests ? 
        null :
            <div className="requests-list">
            <h3>Friend Request [{requests}]</h3>
            {friendRequestList}
            <hr />
            </div>}
        {!user.friends_list.friends || user.friends_list.friends[0][0] === null || user.friends_list.count === 0 ? "Your Friends List Is Empty!":
        <div className="friends-list">
            <h3>Friends [{user.friends_list.count}]</h3>
        {friendsList}
        </div>
        }
    </React.Fragment>
    )
}
