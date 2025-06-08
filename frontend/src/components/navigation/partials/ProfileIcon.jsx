import { useContext } from "react";
import { AuthorsContext } from "../../../contexts/AuthorsContext.jsx";

const ProfileIcon = () => {
    const { data, status } = useContext(AuthorsContext)

    return (
        <div className="profile-picture">
            {status === 'ready' &&
                <img
                    src={data.avatar}
                    className="img-fluid"
                    alt="Author profile picture"
                />}
        </div>
    );
};

export default ProfileIcon;