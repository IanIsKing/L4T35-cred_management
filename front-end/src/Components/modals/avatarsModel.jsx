// Avatars Modal Component - This component is used to display the avatars modal and select an avatar from the list of avatars.
// It also fetches the avatars from the server and displays them in the modal.
// It also sets the selected avatar in the parent component's state.
// This componet is used in the Profile component to select an avatar for the user and also sign up component to select an avatar for the new user.
import React, { useEffect, useState } from "react";
import { getAvatars } from "../../api";
import "../../App.css";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

// This component takes the following props - avatar, setAvatar, setHasSelectedAvatar, triggerFlashEffect.
// The avatar prop is the current avatar of the user.
// The setAvatar prop is a function to set the avatar in the parent component's state.
// The setHasSelectedAvatar prop is a function to set the hasSelectedAvatar state in the parent component's state.
// The triggerFlashEffect prop is a boolean to trigger the flash effect on the avatar when the user selects an avatar.
export default function AvatarsModal({
  avatar,
  setAvatar,
  setHasSelectedAvatar,
  triggerFlashEffect = false,
}) {
  const [basicModal, setBasicModal] = useState(false);
  const [avatarsArray, setAvatarsArray] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(
    // If no avatar is selected, use the default avatar
    avatar ||
      "https://img.freepik.com/free-psd/girl-avatar-emoji-3d-icon_23-2150579870.jpg?w=740&t=st=1708887402~exp=1708888002~hmac=f5a36f3b3018b855f559f33271d0ae06f6e5a9049df0e33a6be0ccd2c823fc0a"
  );

  const toggleOpen = () => setBasicModal(!basicModal);

  useEffect(() => {
    setAvatar(selectedAvatar);
  }, [selectedAvatar, setAvatar]);

  // Fetch avatars from the server
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const avatars = await getAvatars();
        const formattedAvatarsArray = Object.entries(avatars).map(
          ([name, url]) => ({
            name,
            url,
          })
        );
        setAvatarsArray(formattedAvatarsArray);
      } catch (error) {
        console.error("Failed to fetch avatars:", error);
      }
    };
    fetchAvatars();
  }, []);

  return (
    <>
      <div onClick={toggleOpen}>
        <img
          src={avatar}
          alt="avatar"
          className={`avatarSelector rounded-circle ${
            triggerFlashEffect ? "flashEffect" : ""
          }`}
        />
      </div>

      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Select your Avatar</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {avatarsArray.map((avatar, index) => (
                <img
                  className="avatarSelector rounded-circle"
                  key={index}
                  src={avatar.url}
                  alt={avatar.name}
                  onClick={() => {
                    // Set the selected avatar on click of an image
                    setSelectedAvatar(avatar.url);
                    if (typeof setHasSelectedAvatar === "function") {
                      setHasSelectedAvatar(true);
                    }
                    toggleOpen();
                  }}
                />
              ))}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
