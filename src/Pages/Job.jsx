import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import "../Styles/Job.scss";
import { fetchSingleJob } from "../Utils/fetches";
import BusinessIcon from "@material-ui/icons/Business";
import WorkIcon from "@material-ui/icons/Work";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const Job = ({ match, history }) => {
  const [job, setJob] = useState("");
  const getJobPosting = async () => {
    try {
      const resJob = await fetchSingleJob(match.params.id);
      setJob(resJob);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getJobPosting();
    console.log(job);
  }, []);
  return (
    <div className="job">
      <ArrowBackIosIcon onClick={() => history.goBack()} />
      <Row className="flex-column">
        <h3>{job.title}</h3>
        <div className="job__details d-flex">
          <h6>
            <BusinessIcon /> {job.company}
          </h6>{" "}
          <h6>
            <WorkIcon /> {job.type}
          </h6>
          <h6>
            <LocationOnIcon /> {job.location}
          </h6>
        </div>
      </Row>
      <Row className="mt-4">
        {
          <div
            dangerouslySetInnerHTML={{
              __html: job.description,
            }}
          />
        }
      </Row>
      <Row>
        <a
          target="_blank"
          href={
            job.how_to_apply &&
            job.how_to_apply
              .replace('<p><a href="', "")
              .replace("</a></p>\n", "")
          }
        >
          <span className="job__cta-btn ">Apply Now</span>
        </a>
      </Row>
    </div>
  );
};

export default Job;
