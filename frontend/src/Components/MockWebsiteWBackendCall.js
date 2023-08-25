import React from "react";
import api from "../services/api";
import { useState } from "react";

import PresenterImg from "../Images/presenter.jpg";
import NoNoseImg from "../Images/noNose.jpeg";
import SelfieImg from "../Images/selfie.jpg";

import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ImageBox = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Container = styled("div")({
  display: "block",
  width: "100%",
  height: "100%",
  maxHeight: "500px",
});

const MockWebsite = () => {
  const imageClick = async (event) => {
    console.log(event)
    await api
      .post("/api/isNose", {
        originalWidth: event.target.naturalWidth,
        originalHeight: event.target.naturalHeight,
        resizedHeight: event.target.offsetHeight,
        resizedWidth: event.target.offsetWidth,

        xCoord: event.nativeEvent.offsetX,
        yCoord: event.nativeEvent.offsetY,
      })
      .then((response) => {
        console.log(response);
        alert("BOOP!");
      })
      .catch(function (error) {
        console.log(error);
        alert("Backend Error, check console for more details!");
      });
  };

  return (
    <Grid container spacing={3} sx={{ padding: "1rem" }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h1" gutterBottom>
          Future Of Engagement
        </Typography>
      </Grid>
      <Grid item xs={5} sm={5} md={5} lg={5}>
        <Container>
          <ImageBox
            src={SelfieImg}
            alt="selfie"
            onClick={(e) => imageClick(e)}
          />
        </Container>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <Container>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dui neque, venenatis eget ipsum non, blandit porta risus. Curabitur
          sodales, tellus vel laoreet mattis, quam nisl varius nisi, ut commodo
          augue nisl sit amet arcu. Aliquam pulvinar quis quam id blandit.
          Pellentesque eget bibendum velit, et posuere ligula. Mauris volutpat
          tristique augue, sit amet feugiat turpis pellentesque viverra.
          Curabitur porttitor ac purus sed vulputate. Pellentesque tincidunt
          dolor vitae est tempor eleifend. Donec dignissim suscipit nisl. Fusce
          vulputate interdum rhoncus. Nunc ut imperdiet orci, ut aliquet erat.
        </Container>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Container>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dui neque, venenatis eget ipsum non, blandit porta risus. Curabitur
          sodales, tellus vel laoreet mattis, quam nisl varius nisi, ut commodo
          augue nisl sit amet arcu. Aliquam pulvinar quis quam id blandit.
          Pellentesque eget bibendum velit, et posuere ligula. Mauris volutpat
          tristique augue, sit amet feugiat turpis pellentesque viverra.
          Curabitur porttitor ac purus sed vulputate. Pellentesque tincidunt
          dolor vitae est tempor eleifend. Donec dignissim suscipit nisl. Fusce
          vulputate interdum rhoncus. Nunc ut imperdiet orci, ut aliquet erat.
        </Container>
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={8}>
        <Container>
          <ImageBox
            src={NoNoseImg}
            alt="no nose"
            onClick={(e) => imageClick(e)}
          />
        </Container>
      </Grid>

      <Grid item xs={5} sm={5} md={5} lg={5}>
        <Container>
          <ImageBox
            src={PresenterImg}
            alt="presenter"
            onClick={(e) => imageClick(e)}
          />
        </Container>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <Container>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dui neque, venenatis eget ipsum non, blandit porta risus. Curabitur
          sodales, tellus vel laoreet mattis, quam nisl varius nisi, ut commodo
          augue nisl sit amet arcu. Aliquam pulvinar quis quam id blandit.
          Pellentesque eget bibendum velit, et posuere ligula. Mauris volutpat
          tristique augue, sit amet feugiat turpis pellentesque viverra.
          Curabitur porttitor ac purus sed vulputate. Pellentesque tincidunt
          dolor vitae est tempor eleifend. Donec dignissim suscipit nisl. Fusce
          vulputate interdum rhoncus. Nunc ut imperdiet orci, ut aliquet erat.
        </Container>
      </Grid>
    </Grid>
  );
};

export default MockWebsite;
