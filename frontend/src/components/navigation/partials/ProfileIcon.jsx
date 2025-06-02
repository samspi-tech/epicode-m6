const ProfileIcon = ({ author }) => {

    return (
        <div className="profile-picture">
            <img
                className="img-fluid"
                src={author?.author?.avatar}
                alt="Author profile picture"
            />
        </div>
    );
};

export default ProfileIcon;