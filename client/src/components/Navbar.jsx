import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"; // Profile icon
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
import Profile from "./Profile";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const IconButton = styled.div`
  cursor: pointer;
`;

const StyledSearchIcon = styled(SearchOutlinedIcon)`
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const isVideoPage = location.pathname.includes("/video/");

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${q}`)}
            />
            <StyledSearchIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              {!isVideoPage && (
                <IconButton onClick={() => setIsUploadOpen(true)}>
                  <VideoCallOutlinedIcon />
                </IconButton>
              )}
              {!isVideoPage && (
                <IconButton onClick={() => setIsProfileOpen(true)}>
                  <PersonOutlineIcon />
                </IconButton>
              )}
              <Avatar src={currentUser.img} />
              {currentUser.name}
              <Button onClick={handleSignOut}>
                <ExitToAppOutlinedIcon />
                Sign Out
              </Button>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {isUploadOpen && <Upload setOpen={setIsUploadOpen} />}
      {isProfileOpen && <Profile setOpen={setIsProfileOpen} />}
    </>
  );
};

export default Navbar;
