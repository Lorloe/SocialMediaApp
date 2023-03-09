import React from 'react';
import "./profile.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
//import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
      <div className="images">
        <img src={"/upload/"+data.coverPic} alt="" className="cover" />
        <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />
        {/* <img src="https://images.pexels.com/photos/14430248/pexels-photo-14430248.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" className="cover"/>
        <img src="https://images.pexels.com/photos/13539516/pexels-photo-13539516.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" className="profilePic"/> */}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="https://www.facebook.com">
              <FacebookIcon fontSize="small"/>
            </a>
            <a href="https://www.linkedin.com">
              <LinkedInIcon fontSize="small"/>
            </a>
            {/* <a href="https://www.linkedin.com">
              <InstagramIcon fontSize="small"/>
            </a> */}
            {/* <a href="https://www.pinterest.com">
              <PinterestIcon fontSize="small"/>
            </a> */}
            <a href="https://twitter.com">
              <TwitterIcon fontSize="small"/>
            </a>
            <a href="https://github.com">
              <GitHubIcon fontSize="small"/>
            </a>
          </div>
          <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? ("loading") : userId === currentUser.id ? 
                  (<button onClick={() => setOpenUpdate(true)}>update</button>) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;