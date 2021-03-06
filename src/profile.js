import React from "react";
import "./styleSheets/profile.css";
import "./styleSheets/generalStyles.css";
import {
  Card,
  Button,
  Pagination,
  Container,
  Row,
  Dropdown,
  ButtonGroup,
  Form,
  Col,
  Image,
  Nav,
} from "react-bootstrap";
/** 6745662 */
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import UserIcon from "./icons/user.png";
import DisplayImages from "./displayImages";

/* Plaeholder images */
import FeaturedImage1 from "./featuredImages/pic1.png";
import FeaturedImage2 from "./featuredImages/pic2.png";
import FeaturedImage3 from "./featuredImages/pic3.png";
import FeaturedImage4 from "./featuredImages/pic4.png";
import {
  AiOutlinePicture,
  AiOutlineStar,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsEnvelope } from "react-icons/bs";
import { GiAchievement } from "react-icons/gi";
import { GrAchievement } from "react-icons/gr";

export default function Profile() {
  return (
    <div>
      <Container>
        <h1> Profile </h1>
      </Container>
      <Container style={{ marginTop: "3vh", marginBottom: "3vh" }}>
        <FirstPart />
      </Container>

      <ProfileNav />
    </div>
  );
}

function FirstPart() {
  return (
    <Container style={{ width: "90%" }}>
      <Row style={{ justifyContent: "flex-start" }}>
        {" "}
        <BsEnvelope size={28} /> <AiOutlineSetting size={28} />
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <Container style={{ width: "30%", justifyContent: "center" }}>
          <Image src={UserIcon} roundedCircle />
          <Nav.Link eventKey="link-1">Change</Nav.Link>
        </Container>

        {/** User informations + icon bar*/}

        <Container style={{ width: "50%", alignItems: "center" }}>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Name
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue="Shrek"
                />
              </Col>
              <Col sm="1">
                <Nav.Link eventKey="link-1">Change</Nav.Link>
              </Col>

              <Form.Label column sm="4">
                Username
              </Form.Label>
              <Col sm="7">
                <Form.Control plaintext readOnly defaultValue="@citassy" />
              </Col>
              <Col sm="1">
                <Nav.Link eventKey="link-1">Change</Nav.Link>
              </Col>

              <Form.Label column sm="4">
                Member since
              </Form.Label>

              <Col sm="6">
                <Form.Control plaintext readOnly defaultValue="June, 2020" />
              </Col>

              <Form.Label column sm="4">
                Bio
              </Form.Label>

              <Col sm="7">
                <Form.Control as="textarea" rows="3" />
              </Col>
              <Col sm="1">
                <Nav.Link eventKey="link-1">Change</Nav.Link>
              </Col>
            </Form.Group>
          </Form>
          <hr />
          <IconsBar />
          <hr />
        </Container>
      </Row>
    </Container>
  );
}

function IconsBar() {
  const icons = [
    { iconName: <AiOutlinePicture size={28} />, num: 8, category: "images" },
    { iconName: <AiOutlineStar size={28} />, num: 2, category: "likes" },
    { iconName: <GiAchievement size={28} />, num: 4, category: "badges" },
    { iconName: <GrAchievement size={28} />, num: 6, category: "challenges" },
  ];
  return (
    <Row>
      {icons.map((iconBlock, idx) => (
        <Col key={idx}>
          <Container style={{ textAlign: "center" }}>
            {iconBlock.iconName}
          </Container>
          <Container style={{ textAlign: "center" }}>
            {" "}
            {iconBlock.num} <br />
            {iconBlock.category}{" "}
          </Container>
        </Col>
      ))}
    </Row>
  );
}

function ProfileNav() {
  return (
    <Container>
      <Nav fill variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link eventKey="link-1" style={{ color: "black" }}>
            Images
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" style={{ color: "black" }}>
            Albums
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4" style={{ color: "black" }}>
            Badges
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" style={{ color: "black" }}>
            Challenges
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-5" style={{ color: "black" }}>
            Saved
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
