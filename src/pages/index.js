import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
  color: white;
  font-family: 'Poppins', sans-serif;
  flex-direction: column;
`;

const Name = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
`;

const Role = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 10px 0;
`;

const SocialLinks = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: 0.3s;
  &:hover {
    color: #ff7f50;
  }
`;

const IndexPage = () => {
  return (
    <Container>
      <Name 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}>
        Manan Patel
      </Name>
      <Role 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5, duration: 1 }}>
        Software Engineer | AI & ML Enthusiast
      </Role>
      <SocialLinks>
        <SocialIcon href="https://github.com/mananpatel" target="_blank">🔗 GitHub</SocialIcon>
        <SocialIcon href="https://linkedin.com/in/mananpatel" target="_blank">🔗 LinkedIn</SocialIcon>
        <SocialIcon href="mailto:manan@example.com">📧 Email</SocialIcon>
      </SocialLinks>
    </Container>
  );
};

export default IndexPage;
