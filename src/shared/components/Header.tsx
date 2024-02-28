import styleds from "styled-components";
import logo from "../../assets/images/kaldiLogoWhite.png";
import Button from "./Button.style";
import { Link } from "react-router-dom";
import Wallets from "../popups/wallets";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useConnectWallet } from "../../wallets/hooks/useConnectWallet";
import React from "react";
import Modal from "../../shared/components/Modal";
import { connectorsObject } from "../../wallets/helpers/connectors";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import logout from "../../assets/images/logoOut.png";
const label = { inputProps: { "aria-label": "Switch demo" } };

interface HeaderProps {
  onSwitchChange: (isChecked: boolean) => void;
}

type Anchor = "top" | "left" | "bottom" | "right";

const Header: React.FC<HeaderProps> = ({ onSwitchChange }) => {
  const [state, setState] = React.useState({
    left: false,
  });
  const { account, deactivate, balance } = useConnectWallet();
  const address = localStorage.getItem("wallet");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortAddress, setAddress] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const open = Boolean(anchorEl);
  const [isCheckedOrNot, setChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#00000"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#ffff" : "#ffff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#ffff" : "#ffff",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#00000"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#ffff" : "#ffff",
      borderRadius: 20 / 2,
    },
  }));

  const switchButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    onSwitchChange(isChecked); // Call the function passed from App.tsx
    setChecked(isChecked);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addressShort = () => {
    if (account) {
      const firstHalf = account[0]?.slice(0, 6);
      const lastHalf = account[0]?.slice(-6);
      const shortenedAddress = `${firstHalf}...${lastHalf}`;
      setAddress(shortenedAddress);
    }
  };

  useEffect(() => {
    closeModal();
    addressShort();
  }, [account]);

  // xs = - 600
  // sm = 600 - 900
  // md = 900 - 1200
  // lg = 1200 +

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <img
        src={logout}
        className="cursor-pointer mt-15 pl-100"
        alt=""
        style={{ height: "20px" }}
        onClick={() => deactivate(connectorsObject.metamask.connector)}
      />
      <Divider />
      <List>
        {account && address ? (
          <>
            <Grid item xs={8} sm={12} md={2} lg={2} className="mb-10">
              <React.Fragment>
                <Button
                  id="basic-button"
                  width="100%"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {account ? shortAddress : "Connect Wallet"}
                </Button>
              </React.Fragment>
              <Modal
                onClose={closeModal}
                showModal={isModalOpen}
                heading={address ? "Connected" : "Wallet Connect"}
                isFooter={false}
                width="30%"
                height="50%"
              >
                <Wallets closeModal={closeModal} />
              </Modal>
            </Grid>
          </>
        ) : (
          <Grid item xs={2} sm={2} md={2} lg={2} className="mb-10">
            <Button width="100%" onClick={openModal}>
              {account ? shortAddress : "Connect Wallet"}
            </Button>
            <Modal
              onClose={closeModal}
              showModal={isModalOpen}
              heading={address ? "Connected" : "Wallet Connect"}
              isFooter={false}
              width="30%"
              height="50%"
            >
              <Wallets closeModal={closeModal} />
            </Modal>
          </Grid>
        )}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }} className="mt-12">
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={5}
        justifyContent="center"
        style={{ backgroundColor: "#11142d" }}
      >
        {account && address ? (
          <>
            <Grid item xs={8} sm={12} md={2} lg={2} className="mb-10">
              <React.Fragment>
                <Button
                  id="basic-button"
                  variant="outlined"
                  className="gradient-text"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {account ? shortAddress : "Connect Wallet"}
                </Button>
              </React.Fragment>
              <Modal
                onClose={closeModal}
                showModal={isModalOpen}
                heading={address && account ? "Connected" : "Wallet Connect"}
                isFooter={false}
                width="30%"
                height="50%"
              >
                <Wallets closeModal={closeModal} />
              </Modal>
            </Grid>
          </>
        ) : (
          <Grid item xs={2} sm={2} md={2} lg={2} className="mb-10">
            <Button width="100%" onClick={openModal}>
              {account ? shortAddress : "Connect Wallet"}
            </Button>
            <Modal
              onClose={closeModal}
              showModal={isModalOpen}
              heading={address && account ? "Connected" : "Wallet Connect"}
              isFooter={false}
              width="30%"
              height="50%"
            >
              <Wallets closeModal={closeModal} />
            </Modal>
          </Grid>
        )}

        <Grid item xs={8} sm={12} md={2} lg={1} className="mb-10">
          {account && address ? (
            <div style={{display: 'flex', gap: '10px', alignItems:'center', justifyContent: 'center'}}>
              <Button
                id="basic-button"
                variant="outlined"
                className="gradient-text"
              >
                Balance: {balance}
              </Button>

              <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <img
                  src={logout}
                  className="cursor-pointer"
                  alt="disconnect"
                  style={{ height: "30px", color: "white" }}
                  onClick={() =>
                    deactivate(connectorsObject.metamask.connector)
                  }
                />
                {showTooltip && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      padding: "0px 0px",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    Disconnect
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;

const MenuWrapper = styleds.div`
  align-self: center;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: auto 0;
  background-color: #11142d;
`;

const Menus = styleds.div`
  color: var(--primary, #11142d);
  white-space: nowrap;
  font: 500 14px/24px Neue Haas Grotesk Display Pro, -apple-system, Roboto, Helvetica, sans-serif;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
  }
  background-color: #11142d;
`;

const CustomLink = styleds(Link)`
  text-decoration: none;
  color: white;
  background-color: #11142d;
`;

const CustomLinkMobile = styleds(Link)`
  text-decoration: none;
  color: black;
`;
