import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system"
import {
  Typography,
  Grid,
  Card,
  FormControlLabel,
  Button,
  Switch,
  makeStyles
} from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
import { useAuthHeader } from "../../authentication";
import { serverURL } from "../../constants/config";

const StyledApplicantCard = styled(Card)({
    display: "flex",
    margin: "10px 10px",
    padding: "10px 10px",
    alignItems: "center",
    height: "75px",
    justifyContent: "space-between",
})

const StyledApplicationCard = styled(Card)({
    display: "flex",
    margin: "10px 10px",
    padding: "10px 10px",
    alignItems: "center",
    height: "75px",
    justifyContent: "space-between",
})

const DenyBtn = styled(Button)({
    background: "#FFBBBB",
})

const AcceptBtn = styled(Button)({
    background: "#BBFFBB",
})

export const Application = ({ members, isAdmin, refetchMembers }) => {
  const { clubID } = useParams();
  const authHeader = useAuthHeader();
  const [acceptAll, setAcceptAll] = useState(false);
  const applicants = useMemo(
    () => members?.filter((member) => member.role === "pending") || [],
    [members]
  ); // const applicants = [{ name: "George", role: "pending" }];

  const acceptUser = async (user) => {
    const data = {
      user,
      clubID,
    };
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    };
    const URL = serverURL + "/api/acceptUser"; // Fetch accept user api

    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response?.status === 200) {
      refetchMembers();
    } else {
      console.error("Could not accept user. ERROR:", await response.text());
    }
  };

  const denyUser = async (user) => {
    const data = {
      user,
      clubID,
    };
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    };
    const URL = serverURL + "/api/denyUser"; // Fetch deny user api

    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response?.status === 200) {
      refetchMembers();
    } else {
      console.error("Could not deny user. ERROR:", await response.text());
    }
  };

  const getApplicationType = async () => {
    const request = {
      method: "GET",
      headers: { ...authHeader(), Accept: "*/*" },
    };
    const URL = serverURL + "/api/getApplicationType/" + clubID;
    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response.status === 200) {
      const data = await response.json();
      return data["acceptAll"];
    } else {
      console.error("Could not accept user. ERROR:", await response.text());
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      setAcceptAll(await getApplicationType());
    })();
  }, []);

  const changeApplicationType = async () => {
    const applicationType = !acceptAll;
    setAcceptAll(applicationType);
    const data = {
      clubID,
      applicationType,
    };
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    };
    const URL = serverURL + "/api/changeApplicationType";
    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response.status === 200) {
      setAcceptAll(applicationType);
    } else {
      console.error("Could not accept user. ERROR:", await response.text());
      setAcceptAll((cur) => !cur);
    }
  };

  return (
    <Grid xs={3} item>
      <Grid container direction="column">
        {isAdmin &&
        (<StyledApplicationCard>
          <Typography>
            Application Type: {acceptAll ? "Accept All" : "Approval Required"}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={!!acceptAll}
                disabled={!!applicants?.length}
                onChange={changeApplicationType}
              />
            }
            label={
              !!applicants?.length ? "Empty List to change type" : "Accept All"
            }
          />
        </StyledApplicationCard>)}
        {isAdmin &&
          applicants?.map((app) => (
            <StyledApplicantCard xs={3} key={app.name}>
              <Typography>{app.name}</Typography>
              <DenyBtn onClick={() => denyUser(app)}>
                Deny
              </DenyBtn>
              <AcceptBtn
                onClick={() => acceptUser(app)}
              >
                Accept
              </AcceptBtn>
            </StyledApplicantCard>
          ))}
      </Grid>
    </Grid>
  );
};
