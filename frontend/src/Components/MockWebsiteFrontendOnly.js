import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import "../App.css";

import PresenterImg from "../Images/presenter.jpg";
import NoNoseImg from "../Images/noNose.jpeg";
import SelfieImg from "../Images/selfie.jpg";

import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Container = styled("div")({
  display: "block",
  width: "100%",
  height: "100%",
  minHeight: "500px",
});

const ImageWrapper = styled("div")({
  width: "100%",
  height: "100%",
  position: "relative",
});

const Image = ({ srcImage, altDescription }) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const imageClick = async (event) => {
    console.log(event);

    const xCoord = event.nativeEvent.offsetX;
    const yCoord = event.nativeEvent.offsetY;
    const resizedHeight = event.target.offsetHeight;
    const resizedWidth = event.target.offsetWidth;

    const detections = await faceapi
      .detectAllFaces(imageRef.current)
      .withFaceLandmarks()
      .withFaceDescriptors()

      .then((res) => {
        // resize the overlay canvas to the input dimensions

        //res gives array of detected faces
        console.log(res);
        console.log(xCoord, yCoord);

        res.forEach((face) => {

          const nose = face.landmarks.getNose();

          console.log(nose);
          nose.forEach((point) => {
            if (
              xCoord >= point.x - 5 &&
              xCoord <= point.x + 5 &&
              yCoord >= point.y - 5 &&
              yCoord <= point.y + 5
            ) {
              alert(alert("BOOP!"));
              return;
            }
          });
        });
        return res;
      })
      .catch(function (error) {
        console.log(error);
        alert("Error with nose prediction, open the console for more details!");
      });

    const displaySize = { width: resizedWidth, height: resizedHeight };

    const canvas = canvasRef.current;
    faceapi.matchDimensions(canvas, displaySize);
    const resizedResults = faceapi.resizeResults(detections, displaySize);
    // draw detections into the canvas
    faceapi.draw.drawDetections(canvas, resizedResults);
    // draw the landmarks into the canvas
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
  };

  return (
    <>
      <ImageWrapper>
        <img
          src={srcImage}
          alt={altDescription}
          ref={imageRef}
          onClick={(e) => {
            imageClick(e);
          }}
        />
        <canvas ref={canvasRef} />
      </ImageWrapper>
    </>
  );
};
const MockWebsiteFrontendOnly = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ])
        .then((res) => {
          console.log(res);
          setLoading(false);
        })

        .catch((err) => {
          console.log(err);
          setError(true);
        });
    };

    loadModels();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <Typography className="loadingText" style={{ color: "grey", marginTop: "2rem" }} variant="h6">
            Loading Page ...
          </Typography>
        </div>
      ) : error ? (
        <div className="errorLayout">
          <div style={{ margin: "2rem" }}>
            <Typography variant="h4">Sorry Page Can't Be Loaded</Typography>
          </div>
        </div>
      ) : (
        <>
          <Grid container spacing={3} sx={{ padding: "1rem" }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h1" gutterBottom>
                Future Of Engagement
              </Typography>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <Container>
                <Image srcImage={SelfieImg} altDescription="selfie" />
              </Container>
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7}>
              <Container>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse dui neque, venenatis eget ipsum non, blandit porta
                risus. Curabitur sodales, tellus vel laoreet mattis, quam nisl
                varius nisi, ut commodo augue nisl sit amet arcu. Aliquam
                pulvinar quis quam id blandit. Pellentesque eget bibendum velit,
                et posuere ligula. Mauris volutpat tristique augue, sit amet
                feugiat turpis pellentesque viverra. Curabitur porttitor ac
                purus sed vulputate. Pellentesque tincidunt dolor vitae est
                tempor eleifend. Donec dignissim suscipit nisl. Fusce vulputate
                interdum rhoncus. Nunc ut imperdiet orci, ut aliquet erat.
              </Container>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Container>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse dui neque, venenatis eget ipsum non, blandit porta
                risus. Curabitur sodales, tellus vel laoreet mattis, quam nisl
                varius nisi, ut commodo augue nisl sit amet arcu. Aliquam
                pulvinar quis quam id blandit. Pellentesque eget bibendum velit,
                et posuere ligula. Mauris volutpat tristique augue, sit amet
                feugiat turpis pellentesque viverra. Curabitur porttitor ac
                purus sed vulputate. Pellentesque tincidunt dolor vitae est
                tempor eleifend. Donec dignissim suscipit nisl. Fusce vulputate
                interdum rhoncus. Nunc ut imperdiet orci, ut aliquet erat.
              </Container>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8}>
              <Container>
                <Image srcImage={NoNoseImg} altDescription="no nose" />
              </Container>
            </Grid>

            <Grid item xs={5} sm={5} md={5} lg={5}>
              <Container>
                <Image srcImage={PresenterImg} altDescription="presenter" />
              </Container>
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7}>
              <Container>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse dui neque, venenatis eget ipsum non, blandit porta
                risus. Curabitur sodales, tellus vel laoreet mattis, quam nisl
                varius nisi, ut commodo augue nisl sit amet arcu. Aliquam
                pulvinar quis quam id blandit. Pellentesque eget bibendum velit,
                et posuere ligula. Mauris volutpat tristique augue, sit amet
                feugiat turpis pellentesque viverra. Curabitur porttitor ac
                purus sed vulputate. Pellentesque tincidunt dolor vitae est
                tempor eleifend. Donec dignissim suscipit nisl. Fusce vulputate
                interdum rhoncus. Nunc ut imperdiet orci, ut aliquet erat.
              </Container>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default MockWebsiteFrontendOnly;
