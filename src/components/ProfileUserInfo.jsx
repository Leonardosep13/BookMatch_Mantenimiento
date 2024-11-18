import { useEffect, useState } from "react";
import UserProfilePic from "./UserProfilePic";
import UserTagProfileInfo from "./UserTagProfileInfo";

function ProfileUserInfo() {
    const [profileName, setProfileName] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getProfileName();
    }, []);

    useEffect(() => {
        getTags();
    }, []);

    async function getTags() {
        try {
            const userId = localStorage.getItem("id propietario");
            const response = await fetch(`/api/getUserTags/${userId}`, {
                method: 'GET',
            });
            const data = await response.json();
            setTags(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getProfileName() {
        try {
            const userId = localStorage.getItem("id propietario");
            const response = await fetch(`/api/getUserName/${userId}`, {
                method: 'GET',
            });
            const data = await response.json();
            setProfileName(data.fullName);
        } catch (err) {
            console.error(err);
        }
    }

    function reportUser() {
        const idReportedUser = localStorage.getItem("id propietario");
        localStorage.setItem('id reportado', idReportedUser);
        window.location.href = "/reportarUsuario.html";
    }

    return (
        <div className="profile-info-horizontal">
            <div className="profile-pic-container">
                <UserProfilePic className="Profile-Pic" />
            </div>
            <div className="profile-details">
                <p className="profile-name">{profileName}</p>
                <div className="tag-container">
                    {tags.map((tag, index) => (
                        <UserTagProfileInfo
                            className='tag-entry'
                            key={index}
                            tagname={tag.tagname}
                        />
                    ))}
                </div>
                <button className="upload-button" onClick={reportUser}>Reportar usuario</button>
            </div>
        </div>
    );
}

export default ProfileUserInfo;
